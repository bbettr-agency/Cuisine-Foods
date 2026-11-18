/**
 * CUSTOM QUOTE FORM – copy + the parts of the form that are NOT yet in GoHighLevel.
 * Everything that already exists in GHL lives in config/ghl-fields.ts (generated).
 */
import { ghlFields, UCO_OIL_TYPE } from "@/config/ghl-fields";

export type QuoteService = "buy" | "collect";

/** Oil types offered when buying (the existing GHL options minus the collection one). */
export const supplyOilTypes = ghlFields.oilType.options.filter((o) => o !== UCO_OIL_TYPE);

/**
 * APPROVED, not yet created in GHL – the one new field a collection enquiry needs
 * (the existing volume field only has purchase amounts). Label and options are the
 * client-approved wording; create the GHL dropdown with EXACTLY these values. Its
 * field ID is supplied server-side through GHL_FIELD_UCO_VOLUME once it exists;
 * until then the server refuses collection submissions rather than dropping the answer.
 */
export const ucoVolume = {
  label: "Estimated used oil per month",
  options: ["Less than 20 L", "20–50 L", "51–100 L", "101–200 L", "201–500 L", "More than 500 L", "Not sure"],
};

/** Tag the server applies after a successful save – the proposed workflow trigger. */
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
 * META PIXEL – prepared, OFF by default. The ID is the pixel the official GHL form
 * already uses, so reporting stays in the same pixel. It only loads when
 * NEXT_PUBLIC_META_PIXEL_ENABLED is "true" (set per Vercel environment, after approval).
 */
export const metaPixel = {
  id: "2662434760785009",
  enabled: process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true",
};

/** Attribution parameters captured with an enquiry (allow-list; nothing else is read). */
export const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "fbc", "fbp"] as const;
