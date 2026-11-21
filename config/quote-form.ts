/**
 * CUSTOM QUOTE FORM – copy + the parts of the form that are NOT yet in GoHighLevel.
 * Everything that already exists in GHL lives in config/ghl-fields.ts (generated).
 */
import { ghlFields, UCO_OIL_TYPE } from "@/config/ghl-fields";

export type QuoteService = "buy" | "collect";

/** Oil types offered when buying (the existing GHL options minus the collection one). */
export const supplyOilTypes = ghlFields.oilType.options.filter((o) => o !== UCO_OIL_TYPE);

/**
 * The one field a collection enquiry adds, because the existing volume field only
 * has purchase amounts. Created in GHL as a single dropdown with EXACTLY these
 * client-approved options (field key contact.estimated_used_oil_per_month).
 * The ID is not secret; GHL_FIELD_UCO_VOLUME can override it server-side.
 */
export const ucoVolume = {
  id: "4Sw8vyql0mfm3bJZOHZE",
  label: "Estimated used oil per month",
  options: ["Less than 20 L", "20–50 L", "51–100 L", "101–200 L", "201–500 L", "More than 500 L", "Not sure"],
};

/** Tag the server applies after a successful save (GHL tag ID ehaX4cL4kyPhX2dLwNfT) – both entry workflows listen for it. */
export const DEFAULT_TRIGGER_TAG = "cuisine-custom-form-submitted";

export const quoteFormCopy = {
  steps: ["Business & location", "Your requirements", "Contact details"],
  consent: {
    buy: "I consent to Cuisine Foods collecting and processing my information to provide a bulk supply quotation and related communication.",
    collect: "I consent to Cuisine Foods collecting and processing my information to arrange used cooking oil collection and related communication.",
  },
  submit: { buy: "Send Quote Request", collect: "Send Collection Request" },
  success: {
    buy: { title: "Thank you – your request has been received.", body: "A regional rep will contact you with pricing for your volume and delivery area." },
    collect: { title: "Thank you – your request has been received.", body: "Our team will contact you to confirm collection arrangements for your business." },
  },
  failure: {
    title: "We couldn't send your request.",
    body: "Nothing was submitted. Please use our standard form, or reach our team directly.",
    notConnected: "Our online form isn't connected yet. Nothing was submitted – please reach our team directly.",
  },
} as const;

/**
 * META PIXEL – the pixel the official GHL form already uses, so reporting stays in
 * one place. Whether it is on is decided per build in next.config.js (preview of
 * feat/custom-form only, until production is approved). Even when on, nothing from
 * Meta loads until the visitor allows it (components/funnel/meta-pixel.tsx).
 */
export const metaPixel = {
  id: "2662434760785009",
  enabled: process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true",
};

/**
 * Attribution captured with an enquiry (allow-list; nothing else is read), in the
 * order it is written to the "Website attribution" field – one "key: value" per line.
 * landing_page is the path the visitor first arrived on (no domain, no query string).
 */
export const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "fbc", "fbp", "landing_page"] as const;
