/**
 * SEARCH-INTENT REGISTRY — the approved V2 query/page ownership map.
 *
 * Purpose (not rendering): document which URL owns which primary intent so we
 * (a) prevent cannibalisation, (b) guide internal linking, and (c) guide future
 * content work. H1s/titles are authored per page for humans first — this file
 * does NOT generate copy. One primary intent → one owning URL.
 *
 * geoLevel: "national" (South Africa), "province", "metro", or "n/a".
 * role: the page's job in the architecture.
 */

export type TopicCluster = "brand" | "supply" | "uco" | "industry" | "location" | "resource" | "conversion" | "company";
export type GeoLevel = "national" | "province" | "metro" | "n/a";

export type SearchIntentEntry = {
  route: string;
  primaryIntent: string; // the single head query/intent this URL owns
  cluster: TopicCluster;
  geoLevel: GeoLevel;
  role: string;
  notes?: string;
};

export const searchIntent: SearchIntentEntry[] = [
  // --- Brand / national entity ---
  { route: "/", primaryIntent: "Cuisine Foods (brand) + national cooking-oil supplier & recovery", cluster: "brand", geoLevel: "national", role: "national-company-entity", notes: "Owns the broad national/company position. Do NOT create /cooking-oil-supplier-south-africa." },

  // --- Commercial supply ---
  { route: "/bulk-cooking-oil-supply", primaryIntent: "bulk / commercial cooking oil supplier (transactional)", cluster: "supply", geoLevel: "national", role: "supply-pillar", notes: "Transactional supply head term — differentiate from the homepage's brand/national intent." },
  { route: "/sunflower-oil", primaryIntent: "bulk / commercial sunflower oil supplier", cluster: "supply", geoLevel: "national", role: "product" },
  { route: "/palm-olein", primaryIntent: "bulk / commercial palm olein supplier", cluster: "supply", geoLevel: "national", role: "product", notes: "High-value, less contested. Legacy /palm-oil 301s here." },
  { route: "/soya-oil", primaryIntent: "bulk / commercial soya oil supplier", cluster: "supply", geoLevel: "national", role: "product" },
  { route: "/frying-oil", primaryIntent: "commercial / best frying oil (product)", cluster: "supply", geoLevel: "national", role: "product", notes: "Commercial intent; /resources/commercial-frying-guide owns the informational query." },

  // --- Industries ---
  { route: "/cooking-oil-for-restaurants", primaryIntent: "cooking oil supplier for restaurants", cluster: "industry", geoLevel: "national", role: "buyer-segment" },
  { route: "/cooking-oil-for-hotels", primaryIntent: "cooking oil supplier for hotels", cluster: "industry", geoLevel: "national", role: "buyer-segment" },
  { route: "/cooking-oil-for-caterers", primaryIntent: "wholesale cooking oil for caterers", cluster: "industry", geoLevel: "national", role: "buyer-segment" },
  { route: "/cooking-oil-for-food-manufacturers", primaryIntent: "bulk cooking oil for food manufacturers", cluster: "industry", geoLevel: "national", role: "buyer-segment" },
  { route: "/cooking-oil-for-franchises", primaryIntent: "cooking oil supplier for franchise groups", cluster: "industry", geoLevel: "national", role: "buyer-segment", notes: "Multi-site national angle; distinct from /uco-compliance-reporting (oil-out)." },

  // --- Used cooking oil / recovery ---
  { route: "/used-cooking-oil-collection", primaryIntent: "used cooking oil collection", cluster: "uco", geoLevel: "national", role: "uco-pillar" },
  { route: "/used-cooking-oil-collection/get-paid", primaryIntent: "sell used cooking oil / who buys used cooking oil / get paid", cluster: "uco", geoLevel: "national", role: "sell-used-oil", notes: "Target to outrank classifieds (Gumtree/Junkmail)." },
  { route: "/used-cooking-oil-collection/compliance", primaryIntent: "used cooking oil disposal / compliance / certificate", cluster: "uco", geoLevel: "national", role: "uco-compliance", notes: "Strong E-E-A-T/AI-citation asset (Waste Act, SAWIS, FOG)." },
  { route: "/cooking-oil-recycling", primaryIntent: "used cooking oil recycling / recovery (biodiesel)", cluster: "uco", geoLevel: "national", role: "uco-recycling" },
  { route: "/grease-trap-cleaning", primaryIntent: "grease trap cleaning (commercial kitchens)", cluster: "uco", geoLevel: "province", role: "service", notes: "REGIONAL footprint — do NOT present as nationwide; hub-serviced." },
  { route: "/uco-compliance-reporting", primaryIntent: "multi-site used-oil compliance reporting", cluster: "uco", geoLevel: "national", role: "service", notes: "Oil-out reporting for groups; distinct from /cooking-oil-for-franchises." },

  // --- Locations ---
  { route: "/gauteng", primaryIntent: "cooking oil supplier & UCO collection in Gauteng", cluster: "location", geoLevel: "province", role: "province", notes: "Province only — must NOT target 'South Africa'." },
  { route: "/gauteng/johannesburg", primaryIntent: "cooking oil supplier Johannesburg", cluster: "location", geoLevel: "metro", role: "metro" },
  { route: "/gauteng/pretoria", primaryIntent: "cooking oil supplier Pretoria & Centurion", cluster: "location", geoLevel: "metro", role: "metro" },
  { route: "/western-cape", primaryIntent: "cooking oil supplier & UCO collection in the Western Cape", cluster: "location", geoLevel: "province", role: "province", notes: "Province-wide — 'Cape Town' is reserved for the metro page." },
  { route: "/western-cape/cape-town", primaryIntent: "cooking oil supplier Cape Town", cluster: "location", geoLevel: "metro", role: "metro" },
  { route: "/western-cape/northern-suburbs", primaryIntent: "cooking oil supplier Cape Town Northern Suburbs", cluster: "location", geoLevel: "metro", role: "metro" },
  { route: "/kwazulu-natal", primaryIntent: "cooking oil supplier & UCO collection in KwaZulu-Natal", cluster: "location", geoLevel: "province", role: "province", notes: "PENDING hub facts; coming-soon. Metro pages (e.g. Durban) deferred until justified." },

  // --- Network / coverage (UX + internal-linking hub; NOT a national head-term target) ---
  { route: "/locations", primaryIntent: "Cuisine Foods coverage / branches / nationwide network", cluster: "location", geoLevel: "national", role: "coverage-hub", notes: "UX + internal-linking. Must NOT compete with the homepage for 'cooking oil supplier South Africa'. Planned (Phase 2/3)." },

  // --- Company / conversion / resources ---
  { route: "/about", primaryIntent: "about Cuisine Foods (company/entity)", cluster: "company", geoLevel: "n/a", role: "company" },
  { route: "/contact", primaryIntent: "contact Cuisine Foods", cluster: "conversion", geoLevel: "n/a", role: "conversion" },
  { route: "/request-a-quote", primaryIntent: "request a bulk oil quote / arrange collection", cluster: "conversion", geoLevel: "n/a", role: "conversion" },
  { route: "/resources", primaryIntent: "cooking oil & UCO guides (hub)", cluster: "resource", geoLevel: "n/a", role: "resource-index" },
];

export const intentForRoute = (route: string) => searchIntent.find((e) => e.route === route);
