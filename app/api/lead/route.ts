import { NextResponse } from "next/server";

/**
 * Lead intake – forwards the enquiry to the GoHighLevel webhook (GHL is the
 * backend per the OS; no custom DB). Configure GHL_WEBHOOK_URL in Vercel.
 *
 * Integrity rules:
 *  - A success ({ ok: true }) is returned ONLY when GHL has accepted the request.
 *    If the webhook is unset or returns non-2xx, we return an error so the UI
 *    never shows a false "sent".
 *  - A hidden honeypot field ("website") traps bots; tripped submissions are
 *    silently accepted and NOT forwarded.
 *  - Best-effort per-IP rate limiting throttles bursts.
 *  - No personal customer information is logged.
 */

// --- Best-effort in-memory rate limit (per warm serverless instance). A global
// limit across instances would need a KV/Upstash store (extra infra/env); this
// meaningfully throttles bursts without it. ---
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 6;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown").trim();
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const data = await request.json();

    // Honeypot: a hidden field real users never fill. If completed, treat as a
    // bot – accept silently (so it doesn't learn) but never forward.
    if (typeof data?.website === "string" && data.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Minimal server-side validation.
    if (!data?.name || !data?.phone || !data?.consent) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    // Drop the honeypot before forwarding.
    const { website: _hp, ...clean } = data;
    const payload = {
      ...clean,
      source: "cuisinefoods.co.za",
      submittedAt: new Date().toISOString(),
    };

    const webhook = process.env.GHL_WEBHOOK_URL;
    if (!webhook) {
      // Not connected yet – never report a success we can't guarantee. No PII logged.
      console.error("[lead] GHL_WEBHOOK_URL is not configured; enquiry not delivered.");
      return NextResponse.json(
        { ok: false, error: "Enquiries aren't connected yet. Please WhatsApp or call us." },
        { status: 503 },
      );
    }

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`[lead] webhook delivery failed with status ${res.status}.`);
      return NextResponse.json(
        { ok: false, error: "We couldn't submit your enquiry. Please try again, or WhatsApp us." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
