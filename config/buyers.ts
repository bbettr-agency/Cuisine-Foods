/** BUYER-SEGMENT MONEY PAGES — segment-qualified intent; also PPC landing pages. */
import type { MoneyPage } from "@/config/types";
import { cta } from "@/config/conversion";

const ucoCrossSell = {
  label: "We also collect your used oil — and pay you for it",
  href: "/used-cooking-oil-collection",
  blurb: "One partner for the oil in and the oil out. Free, compliant collection with a rebate per litre.",
};

const base = {
  kind: "buyer" as const,
  intent: "supply" as const,
  imageId: "supply-pillar",
  eyebrow: "Bulk Cooking Oil Supply",
  crossSell: ucoCrossSell,
  primaryCtaLabel: cta.supplyQuote,
  ppcReady: true,
};

export const buyers: MoneyPage[] = [
  {
    ...base,
    // Its own visual story: a real commercial kitchen, not the generic product shot.
    imageId: "social-kitchen",
    slug: "cooking-oil-for-restaurants",
    h1: "Cooking Oil for Restaurants",
    subhead: "Reliable bulk oil supply that keeps your kitchen frying.",
    metaTitle: "Cooking Oil Supplier for Restaurants | Bulk Delivery | Cuisine Foods",
    metaDescription:
      "Bulk cooking oil for restaurants — sunflower, palm olein & soya, delivered reliably across Gauteng & the Western Cape. Plus free used-oil collection. Get a quote.",
    intro:
      "Your kitchen can't stop because the oil ran out. We keep restaurants supplied with consistent, quality bulk oil on a delivery schedule that fits your service — and we collect and pay for your used oil too.",
    keyPoints: [
      { icon: "truck", title: "Never run dry", body: "Daily, weekly or monthly delivery that matches how you fry." },
      { icon: "droplet", title: "Consistent quality", body: "The same clean oil every time, so your food tastes the same every service." },
      { icon: "banknote", title: "A rebate on used oil", body: "We buy back your used oil — lowering your real cost per litre." },
    ],
    sections: [
      { heading: "Switching is easy", body: "Get a quote today and we'll set up your first delivery this week. No lock-in.", answers: "objection: switching inertia" },
    ],
    faqIds: ["min-order", "delivery-areas", "bulk-pricing"],
    relatedSlugs: ["cooking-oil-for-caterers", "cooking-oil-for-franchises"],
  },
  {
    ...base,
    slug: "cooking-oil-for-hotels",
    h1: "Cooking Oil for Hotels",
    subhead: "Consistent bulk supply and compliant used-oil collection for hospitality.",
    metaTitle: "Cooking Oil Supplier for Hotels | Cuisine Foods",
    metaDescription:
      "Reliable bulk cooking oil supply and compliant used-oil collection for hotels across Gauteng & the Western Cape. Account terms and dependable delivery. Get a quote.",
    intro:
      "Hotels need one dependable supplier who can keep multiple outlets stocked and handle the used oil compliantly. We supply consistent bulk oil and collect the used oil with the documentation your standards require.",
    keyPoints: [
      { icon: "hotel", title: "Multi-outlet supply", body: "One account across restaurants, banqueting and staff canteens." },
      { icon: "shield-check", title: "Compliant collection", body: "Safe-disposal documentation for your compliance file." },
      { icon: "clock", title: "Dependable delivery", body: "Scheduled supply so no outlet runs short." },
    ],
    sections: [
      { heading: "Account terms & a dedicated contact", body: "Tell us your outlets and volumes — we'll structure supply, collection and a single point of contact.", answers: "objection: reliability / terms" },
    ],
    faqIds: ["min-order", "delivery-areas", "uco-certificate"],
    relatedSlugs: ["cooking-oil-for-caterers", "cooking-oil-for-restaurants"],
  },
  {
    ...base,
    slug: "cooking-oil-for-caterers",
    h1: "Cooking Oil for Caterers",
    subhead: "Flexible bulk oil supply for events and high-volume catering.",
    metaTitle: "Wholesale Cooking Oil for Caterers | Cuisine Foods",
    metaDescription:
      "Flexible bulk cooking oil for caterers — sunflower, palm olein & soya in 20L, no strict minimum. Reliable across Gauteng & the Western Cape. Get a quote.",
    intro:
      "Catering volumes swing with your calendar. We supply flexible bulk oil when you need it, in 20L with no strict minimum, and collect the used oil afterwards — for cash.",
    keyPoints: [
      { icon: "utensils", title: "Flexible volumes", body: "Scale up for a big event, back down after — no rigid minimums." },
      { icon: "truck", title: "Delivered on time", body: "Supply that lands before your prep does." },
      { icon: "banknote", title: "Paid for used oil", body: "We collect and pay for the oil once the event's done." },
    ],
    sections: [
      { heading: "Ad-hoc or recurring", body: "Whether it's a one-off function or weekly contracts, we'll quote to fit.", answers: "objection: flexibility" },
    ],
    faqIds: ["min-order", "delivery-areas", "bulk-pricing"],
    relatedSlugs: ["cooking-oil-for-restaurants", "cooking-oil-for-hotels"],
  },
  {
    ...base,
    slug: "cooking-oil-for-food-manufacturers",
    h1: "Cooking Oil for Food Manufacturers",
    subhead: "Consistent-spec bulk oil for production lines.",
    metaTitle: "Bulk Cooking Oil for Food Manufacturers | Cuisine Foods",
    metaDescription:
      "Consistent-spec bulk sunflower, soya & palm oil for food manufacturers. Larger formats and reliable supply across Gauteng & the Western Cape. Request a spec & quote.",
    intro:
      "Production can't tolerate a variable input. We supply consistent-spec bulk oil — sunflower, soya and palm olein — with the reliability and formats a manufacturing line needs.",
    keyPoints: [
      { icon: "factory", title: "Consistent spec", body: "The same oil, batch after batch, for predictable production." },
      { icon: "scale", title: "Volume & formats", body: "From 20L to larger formats — tell us your line's requirement." },
      { icon: "recycle", title: "Waste-oil offtake", body: "We collect and recycle your used and residue oil, compliantly." },
    ],
    sections: [
      { heading: "Need a spec sheet?", body: "Request a specification and a volume-based quote and we'll match your requirement.", answers: "objection: spec / traceability" },
    ],
    faqIds: ["product-packaging", "delivery-areas", "bulk-pricing"],
    relatedSlugs: ["soya-oil", "cooking-oil-for-franchises"],
  },
  {
    ...base,
    slug: "cooking-oil-for-franchises",
    h1: "Cooking Oil for Franchises",
    subhead: "Multi-site supply, collection and reporting under one account.",
    metaTitle: "Cooking Oil Supplier for Franchise Groups | Cuisine Foods",
    metaDescription:
      "Bulk oil supply, compliant used-oil collection and store-level reporting for franchise groups & fast-food chains across Gauteng & the Western Cape. Enquire.",
    intro:
      "Franchise groups need one partner who can supply every outlet, collect the used oil compliantly, and report it store-by-store. That's exactly the closed loop we run.",
    keyPoints: [
      { icon: "store", title: "Every outlet supplied", body: "Consistent bulk oil across all sites, centrally managed." },
      { icon: "file-check", title: "Audit-ready collection", body: "Compliant used-oil collection with documentation per store." },
      { icon: "scale", title: "Store-level reporting", body: "Cost, compliance and sustainability, visible across the group." },
    ],
    sections: [
      { heading: "Roll it out group-wide", body: "Talk to us about a group rollout — supply, collection and reporting under one agreement.", answers: "segment: franchise HQ" },
    ],
    faqIds: ["min-order", "delivery-areas", "uco-certificate"],
    relatedSlugs: ["uco-compliance-reporting", "cooking-oil-for-hotels"],
  },
];

export const getBuyer = (slug: string) => buyers.find((b) => b.slug === slug);
