"use client";

import Script from "next/script";

/**
 * GhlQuoteEmbed — the official GoHighLevel quote form, embedded exactly as
 * supplied (form id 5qCMWMxLFGwkpxTkDvRg). The fields and submission are owned by
 * GHL; we do NOT recreate them or route them through /api/lead. GHL's
 * form_embed.js resizes the iframe via postMessage as the visitor moves through
 * the steps. The iframe starts at the form's declared height so no field is
 * clipped before the script runs.
 */
export function GhlQuoteEmbed() {
  return (
    <>
      <iframe
        src="https://link.bbettragency.com/widget/form/5qCMWMxLFGwkpxTkDvRg"
        id="inline-5qCMWMxLFGwkpxTkDvRg"
        title="Cuisine Foods — request a bulk cooking oil quote"
        className="block w-full"
        style={{ width: "100%", height: "1729px", border: "none", borderRadius: "25px" }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Cuisine Foods (Phase 2) - Copy"
        data-height="1729"
        data-layout-iframe-id="inline-5qCMWMxLFGwkpxTkDvRg"
        data-form-id="5qCMWMxLFGwkpxTkDvRg"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
      />
      <Script src="https://link.bbettragency.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
