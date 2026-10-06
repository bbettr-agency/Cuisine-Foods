/**
 * COVERAGE — the single canonical source of truth for Cuisine Foods' national
 * footprint and regional hubs (V2). Business/geographic FACTS live here only;
 * SEO/editorial page content stays in config/locations.ts and references the
 * same hub ids. config/site.ts derives its `branches` + `provincesServed` from
 * this module, and lib/schema.ts derives areaServed / LocalBusiness nodes from
 * it, so geography is never maintained in two places again.
 *
 * NATIONAL-FIRST: Cuisine supplies commercial cooking oil and collects used
 * cooking oil across South Africa, supported by three regional hubs. A hub's
 * `status` ("planned" | "coming-soon" | "open") is the ONE switch that controls
 * all transitional wording and schema emission — flipping KZN to "open" later is
 * a single-line change, not a site-wide find-and-replace.
 *
 * FACTUAL INTEGRITY: unknown facts (e.g. KZN address / geo / contact) are left
 * UNDEFINED, never guessed. Downstream code must gate on their presence. No
 * fabricated LocalBusiness data is ever emitted for a hub without verified facts.
 */

export type HubStatus = "planned" | "coming-soon" | "open";

/** Per-hub service capabilities. National supply + UCO collection are confirmed;
 *  other services may have a narrower operational footprint — do not assume. */
export type HubServices = {
  supply: boolean;
  ucoCollection: boolean;
  greaseTrap: boolean;
  complianceReporting: boolean;
};

export type HubAddress = {
  street: string;
  suburb: string;
  city: string;
  postalCode: string;
  region: string; // ISO 3166-2 subdivision code (ZA-GP / ZA-WC / ZA-KZN) — short form used in schema
};

export type Hub = {
  id: "gauteng" | "western-cape" | "kwazulu-natal";
  name: string; // short label, e.g. "Gauteng"
  province: string; // full province name, e.g. "KwaZulu-Natal"
  provinceSlug: string; // route slug, e.g. "kwazulu-natal"
  status: HubStatus;
  terminology: string; // how we refer to it, e.g. "regional hub"
  services: HubServices;
  metros: string[]; // metro slugs this hub services (page content lives in config/locations.ts)
  // --- Physical facts: present ONLY when verified. Left undefined otherwise. ---
  address?: HubAddress;
  geo?: { lat: number; lng: number };
  map?: { embed: string; link: string };
  contact?: { phone?: string; email?: string }; // falls back to site.contact when absent
  gbpUrl?: string; // Google Business Profile URL (add once the profile is live)
  opening?: string; // short note shown while planned / coming-soon
};

const gauteng: Hub = {
  id: "gauteng",
  name: "Gauteng",
  province: "Gauteng",
  provinceSlug: "gauteng",
  status: "open",
  terminology: "regional hub",
  services: { supply: true, ucoCollection: true, greaseTrap: true, complianceReporting: true },
  metros: ["johannesburg", "pretoria"],
  address: {
    street: "591 Barolong Street, Icon Park, Sunderland Ridge",
    suburb: "Sunderland Ridge",
    city: "Centurion",
    postalCode: "0157",
    region: "GP",
  },
  geo: { lat: -25.8665, lng: 28.1466 },
  map: {
    embed: "https://www.google.com/maps?q=591+Barolong+Street,+Sunderland+Ridge,+Centurion&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=591+Barolong+Street+Sunderland+Ridge+Centurion",
  },
};

const westernCape: Hub = {
  id: "western-cape",
  name: "Western Cape",
  province: "Western Cape",
  provinceSlug: "western-cape",
  status: "open",
  terminology: "regional hub",
  services: { supply: true, ucoCollection: true, greaseTrap: true, complianceReporting: true },
  metros: ["cape-town", "northern-suburbs"],
  address: {
    street: "34B Station Road, Montague Gardens",
    suburb: "Montague Gardens",
    city: "Cape Town",
    postalCode: "7441",
    region: "WC",
  },
  geo: { lat: -33.8741, lng: 18.5169 },
  map: {
    embed: "https://www.google.com/maps?q=34B+Station+Road,+Montague+Gardens,+Cape+Town&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=34B+Station+Road+Montague+Gardens+Cape+Town",
  },
};

/**
 * KwaZulu-Natal — confirmed third regional hub, under development.
 * Status is "coming-soon" during the V2 build. All physical facts (city,
 * address, geo, contact, GBP, metros) are UNKNOWN and deliberately omitted —
 * they must come from the client before any KZN LocalBusiness/metro content is
 * emitted. `services` reflects the confirmed national model (supply + UCO);
 * grease-trap / compliance-reporting footprint for KZN is unconfirmed → false.
 */
const kwaZuluNatal: Hub = {
  id: "kwazulu-natal",
  name: "KwaZulu-Natal",
  province: "KwaZulu-Natal",
  provinceSlug: "kwazulu-natal",
  status: "coming-soon",
  terminology: "regional hub",
  services: { supply: true, ucoCollection: true, greaseTrap: false, complianceReporting: false },
  metros: [], // PENDING client — do not assume Durban / Pietermaritzburg
  opening: "Opening soon — Cuisine Foods' national coverage is expanding into KwaZulu-Natal.",
  // address / geo / map / contact / gbpUrl intentionally omitted until verified.
};

export const coverage = {
  national: true,
  country: "South Africa",
  countryCode: "ZA",
  hubs: [gauteng, westernCape, kwaZuluNatal] as Hub[],
};

/* ---------------------------------------------------------------- derivations */

/** All hubs (any status), in display order. */
export const allHubs = (): Hub[] => coverage.hubs;

/** Hub by id. */
export const getHub = (id: string): Hub | undefined => coverage.hubs.find((h) => h.id === id);

/** Hubs that are live/open. */
export const openHubs = (): Hub[] => coverage.hubs.filter((h) => h.status === "open");

/** Hubs eligible for a LocalBusiness node / branch card — open AND with verified
 *  physical facts. KZN (coming-soon, no address) is excluded until facts exist. */
export const physicalHubs = (): Hub[] => coverage.hubs.filter((h) => h.status === "open" && !!h.address && !!h.geo && !!h.map);

/** Province names of open hubs (regional areaServed / legacy provincesServed). */
export const openProvinceNames = (): string[] => openHubs().map((h) => h.province);

/** All hub province names (for regional service areaServed once KZN opens). */
export const hubProvinceNames = (): string[] => coverage.hubs.map((h) => h.province);

/** Region options for the lead form (all hubs + a fallback). Consumed in a later phase. */
export const formRegions = (): { value: string; label: string }[] => [
  ...coverage.hubs.map((h) => ({ value: h.id, label: h.province })),
  { value: "other", label: "Other / Not sure" },
];
