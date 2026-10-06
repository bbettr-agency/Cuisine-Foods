/**
 * SITE CONFIG – single source of truth for identity, contact & branches.
 * Nothing here should be hardcoded in components. Values marked PENDING are
 * client-confirmable; where a value is unverified it is either omitted or
 * surfaced only through the progressive trust system (config/trust.ts).
 */

import { physicalHubs, openProvinceNames, type Hub } from "@/config/coverage";

/**
 * Branch = the presentation shape consumed by schema + branch cards. It is now
 * DERIVED from the canonical hubs in config/coverage.ts (see `branches` below) —
 * addresses/geo are no longer duplicated here.
 */
export type Branch = {
  id: Hub["id"];
  label: string;
  province: string;
  street: string;
  suburb: string;
  city: string;
  postalCode: string;
  region: string; // ISO-ish region for schema
  lat: number; // geo for LocalBusiness schema
  lng: number;
  gbpUrl?: string; // Google Business Profile URL – add once the profile is live
  mapEmbed: string; // Google Maps embed src
  mapLink: string;
};

/** Map a verified physical hub to the Branch shape the app/schema expect. */
function hubToBranch(h: Hub): Branch {
  return {
    id: h.id,
    label: h.name,
    province: h.province,
    street: h.address!.street,
    suburb: h.address!.suburb,
    city: h.address!.city,
    postalCode: h.address!.postalCode,
    region: h.address!.region,
    lat: h.geo!.lat,
    lng: h.geo!.lng,
    gbpUrl: h.gbpUrl,
    mapEmbed: h.map!.embed,
    mapLink: h.map!.link,
  };
}

export const site = {
  name: "Cuisine Foods",
  legalName: "Cuisine Foods", // PENDING: registered entity name
  // Verified positioning from research (client's own words).
  tagline: "Premium cooking oil in. Used cooking oil out. One trusted partner.",
  shortDescription:
    "Bulk sunflower, palm olein & soya delivered to South African kitchens – plus scheduled used cooking oil collection.",
  foundedYear: 2009, // PENDING reconciliation (site also says "15+ years")
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuisinefoods.co.za",
  locale: "en_ZA",
  ownership: "Family-owned, proudly South African",

  contact: {
    phone: { display: "010 312 5275", dial: "+27103125275" },
    whatsapp: { display: "+27 76 840 3263", number: "27768403263" },
    email: "admin@cuisinefoods.co.za",
    hours: "Mon–Fri, 08:00–17:00",
  },

  social: {
    facebook: "https://www.facebook.com/Cuisine.oilandAtchar",
    instagram: "https://www.instagram.com/cuisineoil",
    // linkedin: "", // PENDING
  },

  // Physical branches — DERIVED from the canonical, verified hubs in
  // config/coverage.ts (open hubs with confirmed address/geo). KZN is excluded
  // until its facts are confirmed, so no fabricated branch is ever emitted.
  branches: physicalHubs().map(hubToBranch) as Branch[],

  // Provinces with a live physical hub. Note: the national service area itself is
  // South Africa (see lib/schema.ts) — this is the open-hub province list.
  provincesServed: openProvinceNames(),

  /**
   * UCO buy-back rate range (R/litre) used by the value calculator. This is an
   * ESTIMATE range shown to visitors (labelled as such) – update to the client's
   * confirmed rates when available. Market context: SA collectors pay ~R4–R7/litre.
   */
  // UCO buy-back rate. `rateVerified` MUST stay false until the client confirms a
  // current rate — while false, no rand figure is published (the estimator captures
  // volume and routes to a quote instead). rateLow/rateHigh are indicative only and
  // are never rendered as a price while unverified.
  uco: { rateLow: 4, rateHigh: 7, rateVerified: false },

  /**
   * Editorial / E-E-A-T. `authorName` is the visible byline (truthful – the
   * company team). Add a real named `reviewer` (a person + credential) when the
   * client provides one – it renders a byline AND `reviewedBy` Person schema, a
   * strong AI-citation and E-E-A-T signal (~3.7× AIO citation correlation).
   */
  editorial: {
    authorName: "The Cuisine Foods Team",
    reviewer: { name: "", title: "" }, // e.g. { name: "Jane Doe", title: "Operations Manager" }
  },

  /**
   * Brand assets – uploaded to public/images/logo/.
   * `ready` flips to true once the real logo lands; until then the header/footer
   * use the text wordmark. Favicon, OG image and schema logo point here.
   */
  brand: {
    ready: true,
    logoPrimary: "/images/logo/logo-primary.webp",
    logoIcon: "/images/logo/logo-icon.png",
    favicon: "/images/logo/favicon.png",
    ogImage: "/images/logo/og-image.jpg",
  },

  /**
   * Entity / Knowledge-Graph signals (OS + GEO). `knowsAbout` declares topical
   * authority to Google/LLMs; `links` become Organization `sameAs`. Add the GBP,
   * LinkedIn and Wikidata URLs here as they go live – progressive, no fabrication.
   */
  entity: {
    knowsAbout: [
      "Bulk cooking oil supply",
      "Sunflower oil",
      "Palm olein",
      "Soya oil",
      "Frying oil",
      "Used cooking oil collection",
      "Used cooking oil recycling",
      "Biodiesel feedstock",
      "Grease trap cleaning",
      "Food-service oil compliance",
    ],
    // Add real URLs when available (rendered into Organization.sameAs):
    links: {
      linkedin: "", // e.g. "https://www.linkedin.com/company/cuisine-foods"
      wikidata: "", // e.g. "https://www.wikidata.org/wiki/Q..."
      gbpGauteng: "", // Google Business Profile (Centurion)
      gbpWesternCape: "", // Google Business Profile (Montague Gardens)
      helloPeter: "",
      brabys: "",
    },
  },
} as const;

export type Site = typeof site;
