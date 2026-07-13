import { NextResponse } from "next/server";

/**
 * Lead intake — forwards the enquiry to the GoHighLevel webhook (GHL is the
 * backend per the OS; no custom DB). Configure GHL_WEBHOOK_URL in Vercel.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Minimal server-side validation.
    if (!data?.name || !data?.phone || !data?.consent) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const payload = {
      ...data,
      source: "cuisinefoods.co.za",
      submittedAt: new Date().toISOString(),
    };

    const webhook = process.env.GHL_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "Upstream error." }, { status: 502 });
      }
    } else {
      // No webhook configured yet (pre-launch) — accept and log so the form is testable.
      console.info("[lead] GHL_WEBHOOK_URL not set; lead received:", payload);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
