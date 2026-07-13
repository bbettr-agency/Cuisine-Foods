/** PILLAR HUBS — the two head-term pages that anchor topical authority. */
import type { FeaturePoint, IconName } from "@/config/types";

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
};

export const pillars: Record<string, Pillar> = {
  supply: {
    slug: "bulk-cooking-oil-supply",
    intent: "supply",
    imageId: "supply-pillar",
    eyebrow: "Bulk Cooking Oil Supply",
    h1: "Bulk Cooking Oil Supplier — Gauteng & Western Cape",
    subhead: "Sunflower, palm olein & soya, delivered reliably to professional kitchens.",
    metaTitle: "Bulk Cooking Oil Supplier | Sunflower, Palm Olein & Soya | Cuisine Foods",
    metaDescription:
      "Reliable bulk cooking oil supply — sunflower, palm olein & soya — for restaurants, caterers & manufacturers across Gauteng & the Western Cape. Get a bulk quote.",
    intro:
      "For more than a decade we've kept South African kitchens supplied with premium bulk cooking oil. Consistent quality, dependable delivery and competitive bulk pricing — from 20L, with no strict minimum.",
    keyPoints: [
      { icon: "droplet", title: "Three core oils", body: "Sunflower, palm olein and soya — the right oil for every kitchen and fryer." },
      { icon: "truck", title: "Reliable delivery", body: "Daily, weekly or monthly, so you never run out mid-service." },
      { icon: "banknote", title: "Lower real cost", body: "We buy back your used oil — dropping your true cost per litre." },
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
      label: "We also collect your used oil — and pay you for it",
      href: "/used-cooking-oil-collection",
      blurb: "One partner for the oil in and the oil out. Free, compliant collection with a rebate per litre.",
    },
    primaryCtaLabel: "Get a Bulk Oil Quote",
  },
  uco: {
    slug: "used-cooking-oil-collection",
    intent: "uco",
    imageId: "uco-pillar",
    eyebrow: "Used Cooking Oil",
    h1: "Used Cooking Oil Collection — Gauteng & Western Cape",
    subhead: "Free, compliant collection on your schedule — and we pay you per litre.",
    metaTitle: "Used Cooking Oil Collection | Free & Compliant | Cuisine Foods",
    metaDescription:
      "Free used cooking oil collection across Gauteng & the Western Cape. We pay per litre, provide sealed drums and safe-disposal documentation. Arrange collection.",
    intro:
      "We collect your used cooking oil for free, on a schedule that suits you, and pay you per litre — then recycle it into renewable biodiesel. Sealed drums provided, safe-disposal documentation included, fully compliant.",
    keyPoints: [
      { icon: "banknote", title: "We pay per litre", body: "Your used oil has value — we pay you for every litre we collect." },
      { icon: "droplet", title: "Free sealed drums", body: "Clean, sealed storage supplied so your oil stays safe between pickups." },
      { icon: "file-check", title: "Compliant + documented", body: "Licensed collection with safe-disposal documentation for inspections." },
    ],
    children: [
      { label: "Get Paid for Your Used Oil", href: "/used-cooking-oil-collection/get-paid", blurb: "What your oil is worth", icon: "banknote" },
      { label: "Compliance & Certificates", href: "/used-cooking-oil-collection/compliance", blurb: "Protection at inspection", icon: "shield-check" },
      { label: "Grease-Trap Cleaning", href: "/grease-trap-cleaning", blurb: "Stay hygienic & compliant", icon: "sparkles" },
      { label: "UCO Compliance Reporting", href: "/uco-compliance-reporting", blurb: "For franchises & groups", icon: "scale" },
      { label: "Cooking Oil Recycling", href: "/cooking-oil-recycling", blurb: "Into renewable biodiesel", icon: "recycle" },
    ],
    faqIds: ["uco-pay-rate", "uco-free-drums", "uco-schedule", "uco-certificate", "uco-legal", "do-both"],
    crossSell: {
      label: "Need fresh oil too? We deliver that.",
      href: "/bulk-cooking-oil-supply",
      blurb: "One account for the oil in and the oil out — the advantage of a closed-loop partner.",
    },
    primaryCtaLabel: "Arrange Free Collection",
  },
};
