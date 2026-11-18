"use client";

import Script from "next/script";
import { metaPixel } from "@/config/quote-form";

type Fbq = (...args: unknown[]) => void;
declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/**
 * MetaPixel — loads the existing Cuisine Foods pixel on a funnel page and sends
 * ONE PageView. Renders nothing unless NEXT_PUBLIC_META_PIXEL_ENABLED is "true",
 * so it is inert until tracking is approved. It is only mounted where the custom
 * form is shown: the official GHL embed fires this same pixel itself, and running
 * both would double-count.
 */
export function MetaPixel() {
  if (!metaPixel.enabled) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel.id}');fbq('track','PageView');`}
    </Script>
  );
}

/**
 * Sends the Lead event – call ONLY after the server confirmed the enquiry was
 * saved. `eventId` makes the event idempotent: the same id is never sent twice
 * from this tab, and Meta de-duplicates on it if a server-side event is added later.
 */
export function trackLead(eventId: string, service: string) {
  if (!metaPixel.enabled || typeof window === "undefined" || !window.fbq) return;
  const key = `cf_lead_${eventId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {}
  window.fbq("track", "Lead", { content_name: service }, { eventID: eventId });
}
