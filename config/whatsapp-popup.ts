/**
 * WHATSAPP LEAD POPUP – copy and options. The popup opens whenever a visitor
 * clicks any WhatsApp link on the site; it captures five details, sends them to
 * GHL through our own server route, then continues to the ORIGINAL WhatsApp link.
 *
 * The province list is all nine provinces because this is an enquiry capture, not
 * a statement of where Cuisine Foods delivers or collects. It is deliberately
 * separate from the quote form's province question (config/ghl-fields.ts).
 */
export const WHATSAPP_PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
] as const;

export const WHATSAPP_LEAD_SOURCE = "Website WhatsApp Popup";

export const whatsappPopupCopy = {
  eyebrow: "WhatsApp Cuisine Foods",
  title: "Before we open WhatsApp",
  body: "Tell us who you are so the right person can pick up your chat.",
  submit: "Submit & Continue to WhatsApp",
  sending: "Sending…",
  privacy: "We use these details to respond to your enquiry. You are not added to a marketing list.",
  skip: "Continue to WhatsApp without submitting",
  successTitle: "Thanks – your details were sent.",
  successBody: "WhatsApp should open now. If it doesn't, use the button below.",
  open: "Open WhatsApp",
  failureTitle: "We couldn't send your details.",
  failureBody: "Nothing was submitted. You can try again, or continue to WhatsApp without submitting.",
  retry: "Try again",
} as const;
