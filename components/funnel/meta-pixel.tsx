"use client";

import { useEffect, useState } from "react";
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
 *  - Mount it at most once per page.
 *
 * It is mounted only where the custom form (or the selection page) is shown. The
 * official GHL embed fires this same pixel itself, so the two never run together.
 */
export function MetaPixel({ aboveStickyCta = false, side = "right" }: { aboveStickyCta?: boolean; side?: "left" | "right" }) {
  const [consent, setConsent] = useState<Consent | null>(null); // null until read in the browser

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  // One PageView per mounted page. The pixel code is injected once per browser tab; arriving
  // on another page of the site (full load or in-site navigation) sends that page's PageView.
  useEffect(() => {
    if (!metaPixel.enabled || consent !== "granted") return;
    if (!window.fbq) {
      type Queue = Fbq & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; push: unknown; loaded: boolean; version: string };
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      } as Queue;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      window.fbq = fbq;
      (window as unknown as { _fbq?: Fbq })._fbq = fbq;
      const el = document.createElement("script");
      el.async = true;
      el.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(el);
      fbq("init", metaPixel.id);
    }
    window.fbq?.("track", "PageView");
  }, [consent]);

  if (!metaPixel.enabled || consent === null || consent !== "unknown") return null;

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
        "fixed inset-x-3 z-[60] mx-auto max-w-md rounded-2xl border border-line bg-surface p-4 shadow-lift sm:inset-x-auto",
        side === "left" ? "sm:left-4" : "sm:right-4",
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
