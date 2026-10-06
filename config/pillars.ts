/** PILLAR HUBS – the two head-term pages that anchor topical authority. */
import type { FeaturePoint, IconName, ResourceLink } from "@/config/types";

export type PillarChild = { label: string; href: string; blurb: string; icon: IconName };

export type Pillar = {
  slug: string;
  intent: "supply" | "uco";
  imageId: string;
  eyebrow: string;
  h1: string;
  subhead: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  keyPoints: FeaturePoint[];
  children: PillarChild[];
  faqIds: string[];
  crossSell: { label: string; href: string; blurb: string };
  primaryCtaLabel: string;
  resourceLinks?: ResourceLink[];
  /** Optional site-wide kinetic-strip motif (words must be supported by page content). */
  kinetic?: { eyebrow?: string; title: string; intro?: string; items: string[] };
  /** Commercial-depth Q&A: plain, answer-engine-friendly questions that each link
   *  deeper into the cluster rather than duplicating a spoke page. */
  depth?: { q: string; a: string; href?: string; linkLabel?: string }[];
};

export const pillars: Record<string, Pillar> = {
  supply: {
    slug: "bulk-cooking-oil-supply",
    intent: "supply",
    imageId: "supply-pillar",
    eyebrow: "Bulk Cooking Oil Supply",
    h1: "Bulk Cooking Oil Supplier for South African Kitchens",
    subhead: "Sunflower, palm olein & soya, delivered reliably to professional kitchens.",
    metaTitle: "Bulk Cooking Oil Supplier | Sunflower, Palm Olein & Soya | Cuisine Foods",
    metaDescription:
      "Reliable bulk cooking oil supply – sunflower, palm olein & soya – for restaurants, caterers & manufacturers, with nationwide delivery from our regional hubs. Get a bulk quote.",
    intro:
      "For more than a decade we've kept South African kitchens supplied with premium bulk cooking oil. Consistent quality, dependable delivery and competitive bulk pricing – from 20L, with no strict minimum.",
    keyPoints: [
      { icon: "droplet", title: "Three core oils", body: "Sunflower, palm olein and soya – the right oil for every kitchen and fryer." },
      { icon: "truck", title: "Reliable delivery", body: "Daily, weekly or monthly, so you never run out mid-service." },
      { icon: "banknote", title: "Lower real cost", body: "We buy back your used oil – dropping your true cost per litre." },
    ],
    children: [
      { label: "Sunflower Oil", href: "/sunflower-oil", blurb: "100% pure, versatile", icon: "droplet" },
      { label: "Palm Olein", href: "/palm-olein", blurb: "Heat-stable, long fry-life", icon: "flame" },
      { label: "Soya Oil", href: "/soya-oil", blurb: "Cost-effective, neutral", icon: "droplet" },
      { label: "Frying Oil Guide", href: "/frying-oil", blurb: "Which oil for your fryer", icon: "thermometer" },
      { label: "For Restaurants", href: "/cooking-oil-for-restaurants", blurb: "Reliable supply", icon: "utensils" },
      { label: "For Food Manufacturers", href: "/cooking-oil-for-food-manufacturers", blurb: "Consistent spec", icon: "factory" },
    ],
    faqIds: ["min-order", "delivery-areas", "bulk-pricing", "product-packaging", "do-both"],
    crossSell: {
      label: "We also collect your used oil – and pay you for it",
      href: "/used-cooking-oil-collection",
      blurb: "One partner for the oil in and the oil out. Scheduled collection with a rebate for eligible oil.",
    },
    resourceLinks: [
      { label: "Best oil for commercial deep frying", href: "/resources/best-oil-for-commercial-deep-frying" },
      { label: "The commercial frying best-practice guide", href: "/resources/commercial-frying-guide" },
    ],
    primaryCtaLabel: "Get a Bulk Oil Quote",
  },
  uco: {
    slug: "used-cooking-oil-collection",
    intent: "uco",
    imageId: "uco-pillar",
    eyebrow: "Used Cooking Oil",
    h1: "Used Cooking Oil Collection for Commercial Kitchens",
    subhead: "Documented collection on your schedule – and we pay you for it.",
    metaTitle: "Used Cooking Oil Collection | Commercial & Documented | Cuisine Foods",
    metaDescription:
      "Used cooking oil collection for South African commercial kitchens. We pay for the oil we collect, supply sealed drums and provide collection documentation. Arrange collection.",
    intro:
      "We collect your used cooking oil on a schedule that suits you and pay you for it – then send it for recovery into renewable biodiesel. Sealed drums supplied, collection documentation included, responsibly handled.",
    keyPoints: [
      { icon: "banknote", title: "We pay you", body: "Your used oil has value – we pay you for the oil we collect." },
      { icon: "droplet", title: "Free sealed drums", body: "Clean, sealed storage supplied so your oil stays safe between pickups." },
      { icon: "file-check", title: "Documented collection", body: "A record of each collection to keep on file for inspections." },
    ],
    children: [
      { label: "Get Paid for Your Used Oil", href: "/used-cooking-oil-collection/get-paid", blurb: "What your oil is worth", icon: "banknote" },
      { label: "Compliance & Certificates", href: "/used-cooking-oil-collection/compliance", blurb: "Protection at inspection", icon: "shield-check" },
      { label: "Grease-Trap Cleaning", href: "/grease-trap-cleaning", blurb: "Stay hygienic & compliant", icon: "sparkles" },
      { label: "UCO Compliance Reporting", href: "/uco-compliance-reporting", blurb: "For franchises & groups", icon: "scale" },
      { label: "Cooking Oil Recycling", href: "/cooking-oil-recycling", blurb: "Into renewable biodiesel", icon: "recycle" },
    ],
    faqIds: ["uco-worth", "uco-pay-rate", "uco-free-drums", "uco-schedule", "uco-certificate", "uco-legal", "uco-hazardous", "do-both"],
    crossSell: {
      label: "Need fresh oil too? We deliver that.",
      href: "/bulk-cooking-oil-supply",
      blurb: "One account for the oil in and the oil out – the advantage of a closed-loop partner.",
    },
    resourceLinks: [
      { label: "How to dispose of used cooking oil legally in SA", href: "/resources/how-to-dispose-of-used-cooking-oil" },
      { label: "Used cooking oil regulations in South Africa", href: "/resources/used-cooking-oil-regulations-south-africa" },
      { label: "What is used cooking oil worth per litre?", href: "/resources/used-cooking-oil-price-per-litre" },
    ],
    primaryCtaLabel: "Arrange Collection",
    kinetic: {
      eyebrow: "The closed loop",
      title: "From your fryer to renewable fuel",
      intro: "We collect it, pay you for it and document it – then it's recovered into biodiesel.",
      items: ["Documented Collection", "We Pay You", "Sealed Drums", "Responsible Handling", "Renewable Biodiesel"],
    },
    depth: [
      {
        q: "What qualifies as used cooking oil?",
        a: "Any used frying or cooking oil from a commercial kitchen – sunflower, palm olein, canola, soya or blends. We collect it whatever you fry with.",
      },
      {
        q: "Who can use the collection service?",
        a: "Restaurants, hotels, caterers, franchises, food manufacturers and other commercial kitchens – single-site or multi-site operators.",
      },
      {
        q: "How does collection work?",
        a: "We drop off clean sealed drums, you fill them between services, and we collect on a schedule that suits you – weekly, monthly or custom – and pay you for it.",
      },
      {
        q: "How should I store used oil before collection?",
        a: "In the sealed drums we supply, cooled and kept free of water and food waste. Cleaner oil is worth more, so keeping it uncontaminated pays off.",
      },
      {
        q: "Can my business be paid for its used oil?",
        a: "Yes. Eligible used oil earns a rebate – the rate depends on your volume, the oil's quality and your location.",
        href: "/used-cooking-oil-collection/get-paid",
        linkLabel: "See how getting paid works",
      },
      {
        q: "How does documentation and compliance work?",
        a: "Each collection comes with a record of how your oil was handled, for your duty-of-care file. Requirements vary by municipality and business.",
        href: "/used-cooking-oil-collection/compliance",
        linkLabel: "Compliance & documentation",
      },
      {
        q: "Can multi-site businesses use one account?",
        a: "Yes – one collection relationship across every site, with the documentation from each store brought together for head office.",
        href: "/uco-compliance-reporting",
        linkLabel: "Reporting for groups",
      },
      {
        q: "What happens to the oil you collect?",
        a: "It's aggregated, cleaned and sent for recovery into renewable biodiesel – never routed back into the food chain.",
        href: "/cooking-oil-recycling",
        linkLabel: "What happens to used oil",
      },
    ],
  },
};
