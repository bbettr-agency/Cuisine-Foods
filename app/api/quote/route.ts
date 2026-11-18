import { NextResponse } from "next/server";
import { GHL_LOCATION_ID } from "@/config/ghl-fields";
import { ATTRIBUTION_KEYS, DEFAULT_TRIGGER_TAG, ucoVolume } from "@/config/quote-form";
import { normalisePhone, parsePayload, toGhlCustomFields, validate } from "@/lib/quote-validate";

/**
 * POST /api/quote — the custom multi-step form's server side.
 *
 * It first asks GHL whether the email or phone already belongs to a contact.
 *
 *  - NEW contact: saved with the Contacts API, then the trigger tag is applied,
 *    which starts the existing lead workflow. No opportunity is created here –
 *    the workflow does that, as it does for the official form.
 *  - RETURNING contact: handling is DISABLED. Nothing at all is written to GHL
 *    (no field, tag, note or task). The route answers with the same generic
 *    failure it gives for any upstream problem, and the form offers the
 *    official GHL form, which behaves exactly as it does today. No message
 *    says whether a contact exists. See docs/CUSTOM-FORM-GHL.md.
 *
 * Rules this route keeps:
 *  - The API token lives only in server environment variables (GHL_API_TOKEN).
 *  - It answers ok:true ONLY when the contact was saved AND the tag was applied.
 *  - It never writes anything to an existing contact.
 *  - It never logs customer details – only step names and HTTP status codes.
 *  - Without a token (previews, before go-live) it refuses honestly (503).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API = "https://services.leadconnectorhq.com";
const MIN_FILL_MS = 4000; // a human cannot complete three steps faster than this
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

/** GHL matches duplicates on email, then phone – so we look up both. null = lookup failed. */
async function contactExists(token: string, email: string, phone: string): Promise<boolean | null> {
  for (const query of [`email=${encodeURIComponent(email)}`, `number=${encodeURIComponent(phone)}`]) {
    const res = await ghl(token, "GET", `/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&${query}`);
    if (!res.ok) {
      console.error("[quote] duplicate lookup failed", res.status);
      return null;
    }
    const data = (await res.json()) as { contact?: { id?: string } | null };
    if (data.contact?.id) return true;
  }
  return false;
}

/** Keeps only the allow-listed attribution keys, as short plain strings. */
function cleanAttribution(input: unknown): Record<string, string> {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = src[key];
    if (typeof value === "string" && value.trim()) out[key] = value.trim().slice(0, 200);
  }
  return out;
}

const fail = (status: number, code: string, extra?: object) => NextResponse.json({ ok: false, code, ...extra }, { status });

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

async function ghl(token: string, method: "GET" | "POST", path: string, body?: unknown) {
  return fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", "Content-Type": "application/json", Accept: "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
}

/**
 * GET /api/quote — configuration self-check. Creates nothing and returns no secret:
 * only whether a token is configured here and whether GHL accepts it, using one
 * read-only lookup of an address that cannot exist (.invalid is a reserved domain).
 */
export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`check:${ip}`)) return fail(429, "rate_limited");
  const token = process.env.GHL_API_TOKEN;
  if (!token) return NextResponse.json({ configured: false, ghl: "not_checked" });
  try {
    const res = await ghl(token, "GET", `/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent("config-check@cuisinefoods.invalid")}`);
    return NextResponse.json({ configured: true, ghl: res.ok ? "ok" : `rejected_${res.status}` });
  } catch {
    return NextResponse.json({ configured: true, ghl: "unreachable" });
  }
}

export async function POST(request: Request) {
  // Same-origin only: the form posts from this site, nothing else should.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return fail(403, "forbidden");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "rate_limited");

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return fail(400, "invalid");
  }

  // Spam traps: a hidden field people never see, and a minimum time on the form.
  if (typeof raw.website === "string" && raw.website.length > 0) return fail(400, "rejected");
  if (typeof raw.elapsedMs !== "number" || raw.elapsedMs < MIN_FILL_MS) return fail(400, "rejected");

  const payload = parsePayload(raw);
  const errors = validate(payload);
  if (Object.keys(errors).length > 0) return fail(400, "invalid", { errors });

  const token = process.env.GHL_API_TOKEN;
  const tag = process.env.GHL_TRIGGER_TAG || DEFAULT_TRIGGER_TAG;
  const ucoFieldId = process.env.GHL_FIELD_UCO_VOLUME || ucoVolume.id;
  // Not connected yet: say so – never pretend.
  if (!token) return fail(503, "not_configured");

  const phone = normalisePhone(payload.phone);
  // Optional: ONE text field for campaign attribution, only if it has been approved and created.
  const attributionFieldId = process.env.GHL_FIELD_ATTRIBUTION;
  const attribution = cleanAttribution(raw.attribution);

  try {
    // 1) Returning contact, or the lookup failed: write nothing and answer with the SAME generic
    //    failure in both cases. The form then offers the official GHL form.
    const exists = await contactExists(token, payload.email, phone);
    if (exists !== false) return fail(502, "upstream");

    // 2) Save the new contact WITH all custom fields in one call, so every answer is on the
    //    contact before the workflows start. "Business Name" goes to last name, as the official form does.
    const customFields = toGhlCustomFields(payload, ucoFieldId);
    if (attributionFieldId && Object.keys(attribution).length > 0) {
      customFields.push({ id: attributionFieldId, field_value: new URLSearchParams(attribution).toString().slice(0, 1500) });
    }
    const saved = await ghl(token, "POST", "/contacts/upsert", {
      locationId: GHL_LOCATION_ID,
      firstName: payload.firstName,
      lastName: payload.businessName,
      email: payload.email,
      phone,
      source: payload.service === "collect" ? "Website form – used oil collection" : "Website form – bulk oil quote",
      customFields,
    });
    if (!saved.ok) {
      console.error("[quote] contact save failed", saved.status);
      return fail(502, "upstream");
    }
    const data = (await saved.json()) as { contact?: { id?: string } };
    const id = data.contact?.id;
    if (!id) {
      console.error("[quote] contact save returned no id");
      return fail(502, "upstream");
    }

    // 3) Only now – after the save succeeded – apply the trigger tag. This starts both entry
    //    workflows, whose routing conditions read the fields saved in step 2.
    const tagged = await ghl(token, "POST", `/contacts/${id}/tags`, { tags: [tag] });
    if (!tagged.ok) {
      console.error("[quote] tag apply failed", tagged.status);
      return fail(502, "upstream");
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("[quote] request to GHL failed or timed out");
    return fail(502, "upstream");
  }
}
