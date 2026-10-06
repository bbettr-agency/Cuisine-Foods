/** HOMEPAGE CONTENT – the 9 sections locked in the Final Review. */
import type { FeaturePoint } from "@/config/types";

export const home = {
  hero: {
    eyebrow: "Family-owned · since 2009",
    h1: "Commercial cooking oil, supplied across South Africa.",
    subhead:
      "Bulk sunflower, palm olein and soya delivered to restaurants, hotels and food manufacturers nationwide – and we collect your used cooking oil when you're done. Supported by regional hubs across South Africa.",
    // Two-path fork (the most important conversion decision on the page)
    primary: { label: "Get a Bulk Oil Quote", href: "/request-a-quote?intent=supply", intent: "supply" as const },
    secondary: { label: "Arrange Used-Oil Collection", href: "/request-a-quote?intent=uco", intent: "uco" as const },
  },

  // Section 2 – the three-product lineup the hero products travel into.
  // Order = the on-screen landing order (left → right) and the hero journey legs.
  productLineup: {
    eyebrow: "Our cooking oils",
    title: "Three premium oils for professional kitchens",
    body: "Palm olein, cooking oil and sunflower – supplied in bulk and delivered on your schedule to commercial kitchens across South Africa.",
    products: [
      // `imageId` matches config/drums.ts; each card holds a landing slot for the
      // travelling hero product of the same id.
      { slug: "palm", imageId: "palm", name: "Palm Olein", tagline: "Heat-stable · long fry-life", body: "The most heat-stable frying oil, engineered for high-volume commercial fryers.", href: "/palm-olein" },
      { slug: "cooking", imageId: "cooking", name: "Cooking Oil", tagline: "All-purpose · dependable", body: "A pure, neutral cooking oil for general frying, baking, roasting and salads across high-volume kitchens.", href: "/bulk-cooking-oil-supply" },
      { slug: "sunflower", imageId: "sunflower", name: "Sunflower Oil", tagline: "100% pure · versatile", body: "Clean flavour and a high smoke point – the everyday all-rounder for frying, baking and cooking.", href: "/sunflower-oil" },
    ],
  },

  // Closed-loop framing that headers the two offer cards
  offersHeading: {
    eyebrow: "Supply + recovery",
    title: "Oil in. Used oil out. One commercial partner.",
    body: "New cooking oil delivered to your kitchen, and your used oil collected and recovered into biodiesel – one account for both, lowering your real cost per litre.",
  },
  offers: [
    {
      intent: "supply" as const,
      title: "Bulk Cooking Oil Supply",
      body: "Sunflower, palm olein & soya, delivered reliably in bulk. From 20L, no strict minimum.",
      href: "/bulk-cooking-oil-supply",
      points: ["Consistent quality, every delivery", "Daily, weekly or monthly", "Competitive bulk pricing"],
      productLinks: [
        { label: "Sunflower", href: "/sunflower-oil" },
        { label: "Palm Olein", href: "/palm-olein" },
        { label: "Soya", href: "/soya-oil" },
      ],
      cta: "Get a Bulk Oil Quote",
    },
    {
      intent: "uco" as const,
      title: "Used Cooking Oil Collection",
      body: "Free, compliant collection on your schedule – and we pay you per litre.",
      href: "/used-cooking-oil-collection",
      points: ["We pay per litre", "Free sealed drums & collection", "Safe-disposal documentation"],
      productLinks: [
        { label: "Get paid", href: "/used-cooking-oil-collection/get-paid" },
        { label: "Compliance", href: "/used-cooking-oil-collection/compliance" },
        { label: "Recycling", href: "/cooking-oil-recycling" },
      ],
      cta: "Arrange Free Collection",
    },
  ],

  // "Why Cuisine Foods" – two proof columns (reliable supply · compliant collection)
  why: {
    eyebrow: "Why Cuisine Foods",
    title: "The commercial oil partner for South African kitchens",
    columns: [
      {
        title: "Reliable supply, nationwide",
        points: [
          { icon: "truck", title: "You never run dry", body: "Scheduled delivery from regional hubs keeps every kitchen frying – one account across all your sites." },
          { icon: "droplet", title: "Consistent quality", body: "The same clean, pure oil in every batch, handled to strict food-safety standards." },
        ] as FeaturePoint[],
      },
      {
        title: "Collection & recovery",
        points: [
          { icon: "file-check", title: "Documented & compliant", body: "We collect your used oil and provide safe-disposal documentation for your records." },
          { icon: "banknote", title: "Paid for your used oil", body: "We buy back your used oil and recover it into biodiesel – lowering your real cost per litre." },
        ] as FeaturePoint[],
      },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "Up and running this week",
    tracks: [
      {
        title: "Bulk oil supply",
        steps: [
          "Tell us your oil, volume & area",
          "Get a fast, competitive quote",
          "We deliver on your schedule",
        ],
      },
      {
        title: "Used-oil collection",
        steps: [
          "We drop off free sealed drums",
          "You fill them between services",
          "We collect, pay you & document it",
        ],
      },
    ],
  },

  faqIds: ["oils-supplied", "supply-nationwide", "do-both", "who-supplied", "how-start"],

  closing: {
    title: "Order oil, or arrange a collection.",
    body: "Tell us your business, volumes and region and we'll come back quickly with bulk pricing or a collection schedule – nationwide, no obligation, no lock-in.",
  },
} as const;
