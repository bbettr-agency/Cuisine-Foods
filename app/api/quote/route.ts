import { NextResponse } from "next/server";
import { GHL_LOCATION_ID } from "@/config/ghl-fields";
import { DEFAULT_TRIGGER_TAG } from "@/config/quote-form";
import { normalisePhone, parsePayload, toGhlCustomFields, validate } from "@/lib/quote-validate";

/**
 * POST /api/quote — the custom multi-step form's server side.
 *
 * Saves the enquiry to GoHighLevel with the Contacts API (upsert, so GHL's own
 * duplicate-contact rules apply), then applies the trigger tag that starts the
 * existing lead workflow. It creates NO opportunity itself – the workflow does,
 * exactly as it does for the official form – so nothing can be duplicated here.
 *
 * Rules this route keeps:
 *  - The API token lives only in server environment variables (GHL_API_TOKEN).
 *  - It answers ok:true ONLY when the contact was saved AND the tag was applied.
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

const fail = (status: number, code: string, extra?: object) => NextResponse.json({ ok: false, code, ...extra }, { status });

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

async function ghl(token: string, method: "POST" | "DELETE", path: string, body: unknown) {
  return fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
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
  const ucoFieldId = process.env.GHL_FIELD_UCO_VOLUME;
  // Not connected yet (or the collection field does not exist yet): say so – never pretend.
  if (!token || (payload.service === "collect" && !ucoFieldId)) return fail(503, "not_configured");

  try {
    // 1) Save the contact. "Business Name" goes to last name, as the official form does.
    const saved = await ghl(token, "POST", "/contacts/upsert", {
      locationId: GHL_LOCATION_ID,
      firstName: payload.firstName,
      lastName: payload.businessName,
      email: payload.email,
      phone: normalisePhone(payload.phone),
      source: payload.service === "collect" ? "Website form – used oil collection" : "Website form – bulk oil quote",
      customFields: toGhlCustomFields(payload, ucoFieldId),
    });
    if (!saved.ok) {
      console.error("[quote] contact save failed", saved.status);
      return fail(502, "upstream");
    }
    const data = (await saved.json()) as { contact?: { id?: string; tags?: string[] } };
    const id = data.contact?.id;
    if (!id) {
      console.error("[quote] contact save returned no id");
      return fail(502, "upstream");
    }

    // 2) A tag that is already on the contact does not fire "Tag Added" again, so a
    //    returning customer's tag is removed first, then applied fresh.
    if (data.contact?.tags?.includes(tag)) {
      const removed = await ghl(token, "DELETE", `/contacts/${id}/tags`, { tags: [tag] });
      if (!removed.ok) {
        console.error("[quote] tag reset failed", removed.status);
        return fail(502, "upstream");
      }
    }
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
