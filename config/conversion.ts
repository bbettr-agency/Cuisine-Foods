/**
 * CONVERSION CONFIG — CTA labels, intents and WhatsApp pre-fills.
 * The site forks two journeys (buy oil vs. arrange collection); every CTA
 * carries a page-specific pre-filled intent so leads arrive pre-qualified.
 */
import { site } from "@/config/site";

export type CtaIntent = "supply" | "uco" | "general";

export const cta = {
  // Benefit-loaded labels only — never "Submit"/"Learn More"/"Contact Us".
  supplyQuote: "Get a Bulk Oil Quote",
  ucoArrange: "Arrange Used-Oil Collection",
  ucoGetPaid: "Get Paid for Your Used Oil",
  ucoFreeCollection: "Arrange Free Collection",
  call: "Call Now",
  whatsapp: "WhatsApp Us",
  quote: "Request a Quote",
} as const;

/** Build a WhatsApp click-to-chat URL with a pre-filled, page-specific message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappPrefill: Record<string, string> = {
  general: "Hi Cuisine Foods, I'd like to enquire about your services.",
  supply: "Hi Cuisine Foods, I'd like a quote on bulk cooking oil supply.",
  uco: "Hi Cuisine Foods, I'd like to arrange used cooking oil collection.",
  ucoGetPaid: "Hi Cuisine Foods, I'd like to get paid for my used cooking oil.",
};

/** tel: link for click-to-call. */
export const telUrl = `tel:${site.contact.phone.dial}`;

/** The four primary conversions the whole site drives toward. */
export const primaryConversions = [
  "Request a Quote",
  "Call Cuisine Foods",
  "Arrange UCO Collection",
  "Become a recurring oil customer",
] as const;
