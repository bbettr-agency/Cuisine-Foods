/**
 * SITE CONFIG — single source of truth for identity, contact & branches.
 * Nothing here should be hardcoded in components. Values marked PENDING are
 * client-confirmable; where a value is unverified it is either omitted or
 * surfaced only through the progressive trust system (config/trust.ts).
 */

export type Branch = {
  id: "gauteng" | "western-cape";
  label: string;
  province: string;
  street: string;
  suburb: string;
  city: string;
  postalCode: string;
  region: string; // ISO-ish region for schema
  mapEmbed: string; // Google Maps embed src
  mapLink: string;
};

export const site = {
  name: "Cuisine Foods",
  legalName: "Cuisine Foods", // PENDING: registered entity name
  // Verified positioning from research (client's own words).
  tagline: "Premium cooking oil in. Used cooking oil out. One trusted partner.",
  shortDescription:
    "Bulk sunflower, palm olein & soya delivered to South African kitchens — plus free, compliant used cooking oil collection.",
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

  branches: [
    {
      id: "gauteng",
      label: "Gauteng",
      province: "Gauteng",
      street: "591 Barolong Street, Icon Park, Sunderland Ridge",
      suburb: "Sunderland Ridge",
      city: "Centurion",
      postalCode: "0157",
      region: "GP",
      mapEmbed:
        "https://www.google.com/maps?q=591+Barolong+Street,+Sunderland+Ridge,+Centurion&output=embed",
      mapLink: "https://www.google.com/maps/search/?api=1&query=591+Barolong+Street+Sunderland+Ridge+Centurion",
    },
    {
      id: "western-cape",
      label: "Western Cape",
      province: "Western Cape",
      street: "34B Station Road, Montague Gardens",
      suburb: "Montague Gardens",
      city: "Cape Town",
      postalCode: "7441",
      region: "WC",
      mapEmbed:
        "https://www.google.com/maps?q=34B+Station+Road,+Montague+Gardens,+Cape+Town&output=embed",
      mapLink: "https://www.google.com/maps/search/?api=1&query=34B+Station+Road+Montague+Gardens+Cape+Town",
    },
  ] as Branch[],

  // The two provinces we target as SEO pillars.
  provincesServed: ["Gauteng", "Western Cape"],

  /**
   * Brand assets — uploaded to public/images/logo/.
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
} as const;

export type Site = typeof site;
