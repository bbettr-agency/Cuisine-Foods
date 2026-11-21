"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { metaPixel } from "@/config/quote-form";
import { cn } from "@/lib/utils";

type Fbq = (...args: unknown[]) => void;
declare global {
  interface Window {
    fbq?: Fbq;
  }
}

const CONSENT_KEY = "cf_ad_consent";
type Consent = "granted" | "denied" | "unknown";

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * MetaPixel — the existing Cuisine Foods pixel on a funnel page, with consent.
 *
 *  - Renders nothing unless the pixel is enabled for this build (see next.config.js).
 *  - Until the visitor allows advertising measurement, NOTHING from Meta is loaded:
 *    no script, no cookie, no event. A small banner asks once and remembers the answer.
 *  - On "Allow" it loads the pixel and sends ONE PageView for the page.
 *
 * It is mounted only where the custom form (or the selection page) is shown. The
 * official GHL embed fires this same pixel itself, so the two never run together.
 */
export function MetaPixel({ aboveStickyCta = false }: { aboveStickyCta?: boolean }) {
  const [consent, setConsent] = useState<Consent | null>(null); // null until read in the browser

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  if (!metaPixel.enabled || consent === null || consent === "denied") return null;

  if (consent === "granted") {
    return (
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel.id}');fbq('track','PageView');`}
      </Script>
    );
  }

  const choose = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setConsent(value);
  };

  return (
    <div
      role="dialog"
      aria-label="Advertising measurement"
      className={cn(
        "fixed inset-x-3 z-[60] mx-auto max-w-md rounded-2xl border border-line bg-surface p-4 shadow-lift sm:inset-x-auto sm:right-4",
        aboveStickyCta ? "bottom-[96px] lg:bottom-4" : "bottom-4",
      )}
    >
      <p className="text-sm leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Help us measure our adverts?</span> With your permission we use the Meta Pixel to see which adverts lead to enquiries. Your choice does not affect your request.
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose("granted")} className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-ink px-4 text-sm font-semibold text-paper transition-colors hover:bg-ink/85">
          Allow
        </button>
        <button type="button" onClick={() => choose("denied")} className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-ink/25 px-4 text-sm font-semibold text-ink transition-colors hover:border-ink/55">
          No thanks
        </button>
      </div>
    </div>
  );
}

/**
 * Sends the Lead event – call ONLY after the server confirmed the contact was
 * saved AND the trigger tag applied. Does nothing unless the visitor allowed
 * measurement (the pixel only exists then). `eventId` makes it idempotent: the
 * same id is never sent twice from this tab, and Meta de-duplicates on it too.
 */
export function trackLead(eventId: string, service: string) {
  if (!metaPixel.enabled || typeof window === "undefined" || !window.fbq || readConsent() !== "granted") return;
  const key = `cf_lead_${eventId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {}
  window.fbq("track", "Lead", { content_name: service }, { eventID: eventId });
}
