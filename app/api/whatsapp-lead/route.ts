import { NextResponse } from "next/server";
import { ATTRIBUTION_KEYS } from "@/config/quote-form";
import { WHATSAPP_LEAD_SOURCE, WHATSAPP_PROVINCES, WHATSAPP_PROVINCE_VALUE } from "@/config/whatsapp-popup";
import { normalisePhone } from "@/lib/quote-validate";

/**
 * POST /api/whatsapp-lead — receives the WhatsApp popup's five fields and forwards
 * them, server-side, to the GoHighLevel inbound webhook in GHL_WHATSAPP_WEBHOOK_URL.
 *
 *  - The webhook address lives only in that server environment variable. It is not
 *    in the source code and never reaches the browser.
 *  - Answers ok:true ONLY when the webhook accepted the request. (That proves
 *    delivery to GHL, not what the GHL workflow then does with it.)
 *  - Never logs what a visitor typed – only step names and HTTP status codes.
 *  - Independent of the quote forms and /api/quote; it creates nothing itself.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 2000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance
const delivered = new Map<string, number>(); // submission ids already forwarded (duplicate-click guard)

const fail = (status: number, code: string, extra?: object) => NextResponse.json({ ok: false, code, ...extra }, { status });
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "");

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  // Same-origin only.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return fail(403, "forbidden");

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return fail(400, "invalid");
  }

  // Duplicate click / retry of a submission that already went through: confirm, do not resend.
  const submissionId = clean(raw.submissionId, 64);
  const now = Date.now();
  for (const [id, t] of delivered) if (now - t > WINDOW_MS) delivered.delete(id);
  if (submissionId && delivered.has(submissionId)) return NextResponse.json({ ok: true, duplicate: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "rate_limited");

  // Spam traps: a hidden field people never see, and a minimum time with the popup open.
  if (typeof raw.website === "string" && raw.website.length > 0) return fail(400, "rejected");
  if (typeof raw.elapsedMs !== "number" || raw.elapsedMs < MIN_FILL_MS) return fail(400, "rejected");

  const firstName = clean(raw.firstName, 60);
  const lastName = clean(raw.lastName, 60);
  const email = clean(raw.email, 120).toLowerCase();
  const phone = normalisePhone(clean(raw.phone, 30));
  const province = clean(raw.province, 40);

  const errors: Record<string, string> = {};
  if (firstName.length < 2) errors.firstName = "Please enter your first name.";
  if (lastName.length < 2) errors.lastName = "Please enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email address.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) errors.phone = "Please enter a valid phone number.";
  if (!(WHATSAPP_PROVINCES as readonly string[]).includes(province)) errors.province = "Please choose your province.";
  if (Object.keys(errors).length > 0) return fail(400, "invalid", { errors });

  const webhook = process.env.GHL_WHATSAPP_WEBHOOK_URL;
  if (!webhook) return fail(503, "not_configured"); // say so – never pretend

  // Context: where the click happened and what the WhatsApp link would have said.
  const attributionIn = (raw.attribution && typeof raw.attribution === "object" ? raw.attribution : {}) as Record<string, unknown>;
  const attribution: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = clean(attributionIn[key], 200);
    if (value) attribution[key] = value;
  }

  const payload = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    province: WHATSAPP_PROVINCE_VALUE[province] ?? province, // spelled as GHL's "Location" option
    source: WHATSAPP_LEAD_SOURCE,
    page: clean(raw.page, 200), // path only, e.g. "/sunflower-oil"
    whatsapp_cta_message: clean(raw.whatsappMessage, 300), // the prefilled message of the button they clicked
    whatsapp_number: clean(raw.whatsappNumber, 20),
    marketing_opt_in: false, // this popup never opts anyone into marketing
    ...attribution,
    submitted_at: new Date().toISOString(),
    ...(raw.test === true ? { test: true } : {}),
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[whatsapp-lead] webhook rejected the request", res.status);
      return fail(502, "upstream");
    }
    if (submissionId) delivered.set(submissionId, now);
    return NextResponse.json({ ok: true });
  } catch {
    console.error("[whatsapp-lead] webhook request failed or timed out");
    return fail(502, "upstream");
  }
}
