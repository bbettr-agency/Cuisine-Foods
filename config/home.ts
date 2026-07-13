/** HOMEPAGE CONTENT — the 9 sections locked in the Final Review. */
import type { FeaturePoint } from "@/config/types";

export const home = {
  hero: {
    eyebrow: "Family-owned & South African · since 2009",
    h1: "Premium cooking oil in. Used cooking oil out. One trusted partner.",
    subhead:
      "Bulk sunflower, palm olein & soya delivered to restaurants, hotels and food manufacturers across Gauteng & the Western Cape — plus free, compliant collection of your used cooking oil.",
    // Two-path fork (the most important conversion decision on the page)
    primary: { label: "Get a Bulk Oil Quote", href: "/request-a-quote?intent=supply", intent: "supply" as const },
    secondary: { label: "Arrange Used-Oil Collection", href: "/request-a-quote?intent=uco", intent: "uco" as const },
  },

  // Closed-loop framing that headers the two offer cards
  offersHeading: {
    eyebrow: "The closed loop",
    title: "One partner for the oil going in — and the oil coming out",
    body: "Almost no supplier does both. We do, which means one account, one delivery route, and a lower real cost per litre.",
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
      body: "Free, compliant collection on your schedule — and we pay you per litre.",
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

  // "Why Cuisine Foods" — two proof columns (reliable supply · compliant collection)
  why: {
    eyebrow: "Why Cuisine Foods",
    title: "The obvious choice for South Africa's kitchens",
    columns: [
      {
        title: "Reliable supply",
        points: [
          { icon: "truck", title: "You never run dry", body: "Dependable delivery on your schedule keeps the fryer going." },
          { icon: "droplet", title: "Consistent quality", body: "The same clean, pure oil in every batch, handled to strict food-safety standards." },
        ] as FeaturePoint[],
      },
      {
        title: "Compliant collection",
        points: [
          { icon: "shield-check", title: "Licensed & documented", body: "Safe-disposal documentation that protects you at inspection." },
          { icon: "banknote", title: "Paid for your waste", body: "We buy back your used oil — lowering your real cost per litre." },
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

  faqIds: ["do-both", "delivery-areas", "uco-pay-rate", "uco-certificate", "min-order", "how-start"],

  closing: {
    title: "Ready for a supplier that does both?",
    body: "Get a bulk oil quote or arrange a free used-oil collection today. No obligation, no lock-in.",
  },
} as const;
