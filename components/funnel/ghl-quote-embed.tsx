"use client";

import Script from "next/script";

/**
 * GhlQuoteEmbed — the official GoHighLevel quote form, embedded exactly as
 * supplied (form id 5qCMWMxLFGwkpxTkDvRg). The fields and submission are owned by
 * GHL; this is the ONLY form on the site – we do NOT recreate its fields. GHL's
 * form_embed.js resizes the iframe via postMessage as the visitor moves through
 * the steps. The iframe starts at the form's declared height so no field is
 * clipped before the script runs. The script also hands the landing page's URL
 * parameters (UTMs, click ids) to the form, which is how GHL records attribution.
 */
const FORM_URL = "https://link.bbettragency.com/widget/form/5qCMWMxLFGwkpxTkDvRg";

export function GhlQuoteEmbed({
  prefill,
  title = "Cuisine Foods — request a bulk cooking oil quote",
}: {
  /**
   * Optional GHL field query keys → values, passed on the form URL so the official
   * form opens with that answer preselected (GHL's own prefill feature — the form,
   * its fields, logic and workflows are untouched and the visitor can change it).
   */
  prefill?: Record<string, string>;
  title?: string;
} = {}) {
  const query = prefill ? new URLSearchParams(prefill).toString() : "";
  const src = query ? `${FORM_URL}?${query}` : FORM_URL;
  return (
    <>
      <iframe
        src={src}
        id="inline-5qCMWMxLFGwkpxTkDvRg"
        title={title}
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
