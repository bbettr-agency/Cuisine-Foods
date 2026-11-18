/**
 * CUSTOM QUOTE FORM – copy + the parts of the form that are NOT yet in GoHighLevel.
 * Everything that already exists in GHL lives in config/ghl-fields.ts (generated).
 */
import { ghlFields, UCO_OIL_TYPE } from "@/config/ghl-fields";

export type QuoteService = "buy" | "collect";

/** Oil types offered when buying (the existing GHL options minus the collection one). */
export const supplyOilTypes = ghlFields.oilType.options.filter((o) => o !== UCO_OIL_TYPE);

/**
 * PROPOSED – not in GHL yet. The one new field a collection enquiry needs, because
 * the existing volume field only has purchase amounts. The bands below are a
 * proposal for the client to confirm; the field ID is supplied server-side through
 * GHL_FIELD_UCO_VOLUME once the field has been created (with these exact options).
 * Until then the server refuses collection submissions rather than dropping the answer.
 */
export const ucoVolume = {
  label: "Estimated used oil per month",
  options: ["Under 100 litres", "100–500 litres", "500–1,000 litres", "More than 1,000 litres"],
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
    body: "Nothing was submitted. Please try again, or reach our team directly.",
    notConnected: "Our online form isn't connected yet. Nothing was submitted – please reach our team directly.",
  },
} as const;
