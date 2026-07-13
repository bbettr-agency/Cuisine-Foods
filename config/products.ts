/** PRODUCT MONEY PAGES — one product = one page = one keyword cluster. */
import type { MoneyPage } from "@/config/types";
import { cta } from "@/config/conversion";

const ucoCrossSell = {
  label: "You fry it — we collect it, and pay you for it",
  href: "/used-cooking-oil-collection",
  blurb:
    "Frying at volume? We collect your used cooking oil for free, on your schedule — and pay you per litre. See your real cost per litre after buy-back.",
};

export const products: MoneyPage[] = [
  {
    slug: "sunflower-oil",
    kind: "product",
    intent: "supply",
    imageId: "product-sunflower-oil",
    eyebrow: "Bulk Cooking Oil Supply",
    h1: "Sunflower Oil",
    subhead: "100% pure sunflower oil, supplied in bulk to South African kitchens.",
    metaTitle: "Bulk Sunflower Oil Supplier | 20L | Cuisine Foods",
    metaDescription:
      "100% pure bulk sunflower oil for restaurants, caterers & food manufacturers. Reliable delivery across Gauteng & the Western Cape. Get a bulk quote.",
    intro:
      "High-quality, 100% pure sunflower oil supplied in bulk to restaurants, caterers, food manufacturers and commercial kitchens. Bright in colour, clean in flavour, with a high smoke point that stands up to everyday frying, baking and cooking.",
    keyPoints: [
      { icon: "droplet", title: "100% pure", body: "Clean, bright, versatile — for frying, baking, dressings and everyday cooking." },
      { icon: "thermometer", title: "High smoke point", body: "Holds up to deep frying and long cooking cycles in commercial equipment." },
      { icon: "truck", title: "Reliable bulk delivery", body: "Daily, weekly or monthly — your kitchen never runs out. From 20L, no strict minimum." },
    ],
    sections: [
      {
        heading: "Consistent quality, every delivery",
        body:
          "The same clean, pure sunflower oil in every batch, so your food tastes the same every service. Handled and stored to strict food-safety standards.",
        answers: "objection: consistent quality & volume",
      },
      {
        heading: "Best pricing for bulk buyers",
        body:
          "Quote-based bulk pricing with no hidden costs. Tell us your monthly volume and we'll give you a competitive, written quote — fast.",
        answers: "objection: price / hidden costs",
      },
    ],
    faqIds: ["min-order", "delivery-areas", "bulk-pricing", "product-packaging"],
    relatedSlugs: ["palm-olein", "soya-oil", "frying-oil"],
    crossSell: ucoCrossSell,
    primaryCtaLabel: cta.supplyQuote,
    ppcReady: true,
  },
  {
    slug: "palm-olein",
    kind: "product",
    intent: "supply",
    imageId: "product-palm-olein",
    eyebrow: "Bulk Cooking Oil Supply",
    h1: "Palm Olein",
    subhead: "Heat-stable RBD palm olein for high-volume commercial frying.",
    metaTitle: "Bulk Palm Olein Supplier | Heat-Stable Frying Oil | Cuisine Foods",
    metaDescription:
      "Premium RBD palm olein delivered in bulk. Exceptional heat stability and long fry-life for commercial fryers. Serving Gauteng & the Western Cape. Get a quote.",
    intro:
      "Premium RBD palm olein delivered in bulk to restaurants, food manufacturers, caterers and high-volume frying operations. Engineered for heat stability and long fry-life — because it lasts longer in the fryer, palm olein lowers your total oil usage.",
    keyPoints: [
      { icon: "flame", title: "Exceptional heat stability", body: "Built for repeated high-temperature frying without rapid breakdown." },
      { icon: "clock", title: "Longer fry-life", body: "Lasts longer in the fryer — fewer oil changes, lower total cost." },
      { icon: "factory", title: "Ideal for commercial fryers", body: "The workhorse frying oil for QSR, takeaways and high-volume kitchens." },
    ],
    sections: [
      {
        heading: "Fry at scale for less",
        body:
          "Because palm olein lasts longer in the fryer, you change oil less often and use less over a month. Combined with our used-oil buy-back, your real cost per litre drops further.",
        answers: "objection: price / total cost",
      },
      {
        heading: "Always-on-time delivery",
        body:
          "Reliable bulk supply on your schedule so a busy fryer never stops. From 20L, with no strict minimum.",
        answers: "objection: reliable delivery",
      },
    ],
    faqIds: ["min-order", "delivery-areas", "bulk-pricing", "palm-vs-sunflower"],
    relatedSlugs: ["sunflower-oil", "soya-oil", "frying-oil"],
    crossSell: ucoCrossSell,
    primaryCtaLabel: cta.supplyQuote,
    ppcReady: true,
  },
  {
    slug: "soya-oil",
    kind: "product",
    intent: "supply",
    imageId: "product-soya-oil",
    eyebrow: "Bulk Cooking Oil Supply",
    h1: "Soya Oil",
    subhead: "Reliable, cost-effective soya oil for the food industry.",
    metaTitle: "Bulk Soya Oil Supplier | Food Industry | Cuisine Foods",
    metaDescription:
      "Cost-effective bulk soya oil for food manufacturers, caterers & high-volume kitchens. Neutral flavour, consistent quality. Gauteng & Western Cape. Get a quote.",
    intro:
      "Widely used across the food industry — for frying, baking, sauces, dressings and processed foods. A versatile, cost-effective, neutral-flavoured oil supplied in bulk with consistent quality.",
    keyPoints: [
      { icon: "droplet", title: "Versatile & multi-purpose", body: "Frying, baking, sauces, dressings and processed foods." },
      { icon: "scale", title: "Cost-effective at volume", body: "A dependable choice for high-volume kitchens and manufacturers." },
      { icon: "sparkles", title: "Neutral flavour", body: "Lets the natural flavour of your food come through." },
    ],
    sections: [
      {
        heading: "Consistent quality standards",
        body: "The same reliable spec every delivery, handled to strict food-safety standards — so your production stays predictable.",
        answers: "objection: consistent quality",
      },
      {
        heading: "Built for manufacturers & caterers",
        body: "Need a spec sheet or larger formats for a production line? Tell us your requirement and we'll quote for it.",
        answers: "objection: volume / spec",
      },
    ],
    faqIds: ["min-order", "delivery-areas", "bulk-pricing", "product-packaging"],
    relatedSlugs: ["sunflower-oil", "palm-olein", "frying-oil"],
    crossSell: ucoCrossSell,
    primaryCtaLabel: cta.supplyQuote,
    ppcReady: true,
  },
  {
    slug: "frying-oil",
    kind: "product",
    intent: "supply",
    imageId: "product-palm-olein",
    eyebrow: "Bulk Cooking Oil Supply",
    h1: "Frying Oil for Commercial Kitchens",
    subhead: "Which frying oil is right for your fryer — and how to make it last.",
    metaTitle: "Frying Oil Supplier | Long-Life Commercial Frying Oil | Cuisine Foods",
    metaDescription:
      "The right frying oil for your kitchen — palm olein for heat stability, sunflower for versatility. Bulk supply across Gauteng & the Western Cape. Get a quote.",
    intro:
      "Not sure which frying oil to order? It depends on how you fry. Here's how to choose between palm olein and sunflower for a commercial fryer — and how to get the longest, cleanest fry-life from whichever you pick.",
    keyPoints: [
      { icon: "flame", title: "Palm olein — for high-volume frying", body: "Best heat stability and the longest fry-life. Ideal for QSR and busy fryers." },
      { icon: "droplet", title: "Sunflower — for versatility", body: "Clean flavour and a high smoke point when you fry, bake and cook on one oil." },
      { icon: "clock", title: "Longer fry-life, lower cost", body: "The right oil plus good fryer practice cuts your cost per litre." },
    ],
    sections: [
      {
        heading: "Make your frying oil last longer",
        body:
          "Keep the fryer clean, filter daily, avoid overheating (160–190°C), and skim often. Our frying guide covers the full routine — and we collect and pay for your used oil when it's spent.",
        answers: "question: how to choose / extend fry-life",
      },
    ],
    faqIds: ["palm-vs-sunflower", "when-change-oil", "min-order", "delivery-areas"],
    relatedSlugs: ["palm-olein", "sunflower-oil", "soya-oil"],
    crossSell: ucoCrossSell,
    primaryCtaLabel: cta.supplyQuote,
    ppcReady: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
