/**
 * QUOTE FUNNELS – content for the unified paid-ads funnel system.
 *
 *   /quote          → service selection (two choices)
 *   /quote/buy      → bulk cooking oil funnel
 *   /quote/collect  → used cooking oil collection funnel
 *
 * Both funnels render through ONE shared layout (components/funnel/funnel-page.tsx).
 * Only the content below differs – never the structure or styling. Copy follows the
 * no-fabrication rule: no prices, minimum orders, payment amounts, collection
 * frequencies or guaranteed service areas are stated here.
 */
import { openProvincesAmp, openProvincesPhrase } from "@/config/coverage";
import { Banknote, CalendarCheck, ShieldCheck, Truck, UserRound, type LucideIcon } from "lucide-react";

export type FunnelId = "buy" | "collect";

export type FunnelContent = {
  id: FunnelId;
  path: string;
  /** Label used in the "I'm interested in" switcher. */
  switcherLabel: string;
  meta: { title: string; description: string };
  header: { cta: string; ctaShort: string };
  stickyCta: string;
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    body: string;
    cta: string;
    whatsappLabel: string;
    whatsappPrefill: "supply" | "uco";
    note: string;
    imageId: string;
  };
  trustPoints: string[];
  benefits: { icon: LucideIcon; title: string; body: string }[];
  form: {
    eyebrow: string;
    title: string;
    body: string;
    reassurance: string;
    /** GHL field query keys → values to preselect in the official form. */
    prefill?: Record<string, string>;
    iframeTitle: string;
  };
  showcase: {
    eyebrow: string;
    title: string;
    cards: { imageId: string; title: string; body: string; meta?: { label: string; value: string }[] }[];
    footnote?: string;
    audienceLabel: string;
    audience: string[];
  };
  steps: { title: string; items: { title: string; body: string }[] };
  faqs: { q: string; a: string }[];
  finalCta: { title: string; body: string; cta: string };
  /** Cross-service promotion shown at the bottom, pointing at the OTHER funnel. */
  crossService: { title: string; body: string; cta: string; to: FunnelId; imageId: string };
};

/** Official GoHighLevel form field key for "Oil type" (verified from the live form). */
const GHL_OIL_TYPE_KEY = "multi_dropdown_4m53";

export const funnels: Record<FunnelId, FunnelContent> = {
  buy: {
    id: "buy",
    path: "/quote/buy",
    switcherLabel: "Buying Cooking Oil",
    meta: {
      title: "Get a Bulk Cooking Oil Quote | Cuisine Foods",
      description:
        "Request a custom bulk cooking oil quote – premium Sunflower, Palm Olein and Soya, delivered nationwide. A regional rep calls you with pricing for your volume and area.",
    },
    header: { cta: "Get my quote", ctaShort: "Get quote" },
    stickyCta: "Get My Quote",
    hero: {
      badge: "Trusted by SA food businesses since 2009",
      title: "Bulk cooking oil. Quoted fast.",
      titleAccent: "Delivered nationwide.",
      body: "Premium Sunflower, Palm Olein & Soya, supplied in bulk to South African kitchens. Tell us what you need – a real rep calls you with a custom quote, usually within one business day.",
      cta: "Get My Cooking Oil Quote",
      whatsappLabel: "WhatsApp us",
      whatsappPrefill: "supply",
      note: "No spam. No price-shopping bots. Just a quote from a real human.",
      imageId: "supply-pillar",
    },
    trustPoints: [`Branches in ${openProvincesAmp()}`, "Family-owned, proudly South African", "No-obligation quote"],
    benefits: [
      { icon: Truck, title: "Nationwide delivery", body: "From our Centurion and Cape Town branches to every major metro – daily, weekly or monthly slots." },
      { icon: ShieldCheck, title: "Consistent quality", body: "Same oil, same spec, every delivery, so your food tastes the same to every customer." },
      { icon: UserRound, title: "A real rep, not a call centre", body: "One person who knows your kitchen, volumes and schedule. No automated systems, no queue." },
    ],
    form: {
      eyebrow: "Get your custom quote",
      title: "A few quick questions. One real quote.",
      body: "A regional rep will call you with pricing for your volume and delivery area – usually within one business day.",
      reassurance: "No obligation. Your details are only used to prepare your quote.",
      iframeTitle: "Cuisine Foods – request a bulk cooking oil quote",
    },
    showcase: {
      eyebrow: "What we supply",
      title: "Three premium cooking oils, supplied in bulk",
      cards: [
        { imageId: "product-sunflower-oil", title: "Sunflower Oil", body: "100% pure, light flavour. The all-rounder for frying, baking and salads.", meta: [{ label: "Best for", value: "Restaurants, bakeries, general use" }, { label: "Available in", value: "20L drums & bulk" }] },
        { imageId: "product-palm-olein", title: "Palm Olein", body: "Heat-stable and long-lasting – cuts oil costs in high-volume fryers.", meta: [{ label: "Best for", value: "Takeaways, fast-food, deep-frying" }, { label: "Available in", value: "20L drums & bulk" }] },
        { imageId: "product-soya-oil", title: "Soya Oil", body: "Neutral taste, versatile and cost-effective for high-volume production.", meta: [{ label: "Best for", value: "Food manufacturers, large catering" }, { label: "Available in", value: "20L drums & bulk" }] },
      ],
      footnote: "Two ways to order: 20L drums for foodservice and kitchens, or bulk supply for high-volume manufacturers and resellers.",
      audienceLabel: "Who we supply",
      audience: ["Restaurants & caterers", "Takeaways & fast-food", "Bakeries", "Food manufacturers", "Oil resellers & distributors", "Private-label buyers"],
    },
    steps: {
      title: "From form to first delivery – straightforward",
      items: [
        { title: "Tell us what you need", body: "Answer a few quick questions about your business, volume, oil type and delivery area. About a minute." },
        { title: "A rep calls you", body: "A regional rep reaches out with custom pricing for your volume and area – usually within one business day." },
        { title: "Confirm and we deliver", body: "Once you're happy with the quote, we schedule delivery to your kitchen on a rhythm that suits you." },
      ],
    },
    faqs: [
      { q: "Do you supply small businesses too?", a: "Yes. From a single-location takeaway to a national manufacturer – if you cook, sell or resell cooking oil, we'll supply you." },
      { q: "Why aren't prices listed online?", a: "Bulk oil pricing depends on your volume, oil type and delivery area, so we quote each business individually rather than posting a one-size price." },
      { q: "What if I'm just comparing prices?", a: "That's completely fine. Ask for a quote and compare – a real rep gives you a clear number for your volumes, with no obligation." },
      { q: "How quickly can you deliver?", a: "We run daily, weekly and monthly delivery slots from our Gauteng and Western Cape branches. Your rep sets a schedule that fits your kitchen." },
      { q: "Do you also collect used cooking oil?", a: "Yes – alongside supply, we help businesses arrange responsible used cooking oil collection. Use the switcher at the top of this page to see how it works." },
    ],
    finalCta: {
      title: "Ready for a quote built around your kitchen?",
      body: "A few quick questions and a regional rep calls you back – usually within one business day. No obligation.",
      cta: "Get My Cooking Oil Quote",
    },
    crossService: {
      title: "Also need your used cooking oil collected?",
      body: "Alongside fresh cooking oil supply, Cuisine Foods helps businesses arrange responsible used cooking oil collection.",
      cta: "Explore Used Oil Collection",
      to: "collect",
      imageId: "funnel-collect-drum",
    },
  },

  collect: {
    id: "collect",
    path: "/quote/collect",
    switcherLabel: "Used Oil Collection",
    meta: {
      title: "Arrange Used Cooking Oil Collection | Cuisine Foods",
      description:
        "Used cooking oil? Cuisine Foods collects it and pays for qualifying oil. Arrange professional, responsible used cooking oil collection for your business.",
    },
    header: { cta: "Arrange collection", ctaShort: "Arrange" },
    stickyCta: "Arrange Collection",
    hero: {
      badge: "Serving SA food businesses since 2009",
      title: "Used cooking oil?",
      titleAccent: "We collect and pay.",
      body: "Arrange professional used cooking oil collection for your business with Cuisine Foods. Tell us about your kitchen and our team contacts you to confirm the arrangements.",
      cta: "Arrange My Collection",
      whatsappLabel: "WhatsApp us",
      whatsappPrefill: "uco",
      note: "No obligation. Collection and payment terms are confirmed with you first.",
      imageId: "funnel-collect-drum",
    },
    trustPoints: [`Branches in ${openProvincesAmp()}`, "Family-owned, proudly South African", "Responsible handling"],
    benefits: [
      { icon: CalendarCheck, title: "Convenient collection", body: "Tell us about your kitchen and we arrange collection around how your business runs – confirmed with you directly." },
      { icon: Banknote, title: "Paid for qualifying oil", body: "Used cooking oil has value. Qualifying oil is paid for – our team confirms the terms for your oil when they contact you." },
      { icon: ShieldCheck, title: "Responsible handling", body: "Your used oil is collected by the Cuisine Foods team and handled responsibly once it leaves your kitchen." },
    ],
    form: {
      eyebrow: "Arrange your collection",
      title: "Tell us about your used oil.",
      body: "Our team takes your details and contacts you to confirm collection arrangements for your business.",
      reassurance: "No obligation. Your details are only used to arrange your collection enquiry.",
      prefill: { [GHL_OIL_TYPE_KEY]: "Used Oil Collection" },
      iframeTitle: "Cuisine Foods – arrange a used cooking oil collection",
    },
    showcase: {
      eyebrow: "What collection includes",
      title: "Used oil, handled properly from kitchen to recovery",
      cards: [
        { imageId: "funnel-collect-onsite", title: "Collected from your business", body: "Our team arranges collection of your used cooking oil directly from your premises." },
        { imageId: "funnel-collect-documentation", title: "Collection documentation", body: "Where applicable, collections are documented so you have a record of what left your kitchen." },
        { imageId: "funnel-collect-vehicle", title: "Recovered for biodiesel", body: "Collected oil moves onward into the biodiesel supply chain, giving your used oil a second use." },
      ],
      audienceLabel: "Who we work with",
      audience: ["Restaurants & takeaways", "Caterers", "Hotels", "Bakeries", "Food manufacturers", "Franchise groups"],
    },
    steps: {
      title: "From enquiry to collection – straightforward",
      items: [
        { title: "Tell us about your used oil", body: "Send us your business details." },
        { title: "We confirm collection arrangements", body: "Our team reviews your requirements and contacts you." },
        { title: "Your used oil is collected", body: "Collection and applicable payment are arranged according to confirmed terms." },
      ],
    },
    faqs: [
      { q: "Which businesses can arrange collection?", a: "Any business that produces used cooking oil can enquire – restaurants, takeaways, caterers, hotels, bakeries and food manufacturers. Tell us about yours and our team confirms what we can arrange." },
      { q: "Do you collect in my area?", a: `We operate from branches in ${openProvincesPhrase()}. Share your location on the form and our team confirms whether we can collect from you.` },
      { q: "How does payment work?", a: "Qualifying used oil is paid for. The terms depend on your oil and are confirmed by our team before collection – we don't publish a one-size rate." },
      { q: "How often will you collect?", a: "That is agreed with you. Our team confirms a collection arrangement once they understand how much used oil your kitchen produces." },
      { q: "What happens to the collected oil?", a: "It is handled responsibly and recovered into the biodiesel supply chain." },
      { q: "Do you also supply fresh cooking oil?", a: "Yes – we supply bulk Sunflower, Palm Olein and Soya oil. Use the switcher at the top of this page to request a quote." },
    ],
    finalCta: {
      title: "Ready to arrange your used oil collection?",
      body: "Send us your details and our team contacts you to confirm the arrangements. No obligation.",
      cta: "Arrange My Collection",
    },
    crossService: {
      title: "Need fresh cooking oil for your business?",
      body: "Cuisine Foods also supplies quality bulk cooking oil to commercial kitchens, caterers and food businesses.",
      cta: "Get a Bulk Cooking Oil Quote",
      to: "buy",
      imageId: "supply-pillar",
    },
  },
};

/** /quote – the service selection page. */
export const funnelSelect = {
  path: "/quote",
  meta: {
    title: "How Can We Help Your Business? | Cuisine Foods",
    description:
      "Choose what your business needs from Cuisine Foods – a bulk cooking oil quote, or used cooking oil collection.",
  },
  eyebrow: "Cuisine Foods",
  title: "What can we help your business with?",
  body: "Whether you need quality cooking oil supplied or used cooking oil collected, Cuisine Foods has a solution for your business.",
  choices: [
    {
      to: "buy" as FunnelId,
      imageId: "supply-pillar",
      eyebrow: "Fresh oil supply",
      title: "Buy Bulk Cooking Oil",
      body: "Reliable cooking oil supply for restaurants, caterers, manufacturers and commercial kitchens.",
      cta: "Get a Cooking Oil Quote",
    },
    {
      to: "collect" as FunnelId,
      imageId: "funnel-collect-drum",
      eyebrow: "Used oil collection",
      title: "Arrange Used Oil Collection",
      body: "Turn your business's used cooking oil into value with professional collection services.",
      cta: "Arrange My Collection",
    },
  ],
  footnote: "Need both? Start with either – you can switch at any time.",
};
