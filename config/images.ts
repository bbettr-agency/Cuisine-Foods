/**
 * IMAGE MANIFEST — real Cuisine Foods photography.
 *
 * All website photography lives in one flat folder: public/images/website/.
 * <Placeholder> renders the `src` image if set, else a branded placeholder box.
 * Every image below is a real shoot asset; ratios match the source files (all
 * 4:3) so there is no distortion and no bad cropping. Unused shoot images remain
 * in the folder as Untitled-*.jpg for future sections.
 */

export type ImageSlot = {
  id: string;
  file: string;
  src?: string;
  alt: string;
  ratio: "16/9" | "4/3" | "3/2" | "1/1" | "21/9" | "3/4";
  priority?: boolean; // true only for the LCP hero image
  page: string;
  shot: string;
};

const W = "/images/website";

export const images: Record<string, ImageSlot> = {
  "hero-home": {
    id: "hero-home",
    file: "hero-branded-delivery-truck.jpg",
    src: `${W}/hero-branded-delivery-truck.jpg`,
    alt: "Cuisine Foods branded delivery truck — bulk cooking oil delivered across Gauteng and the Western Cape",
    ratio: "4/3",
    priority: true,
    page: "Home",
    shot: "Branded delivery truck — communicates scale, logistics and professionalism.",
  },
  "supply-pillar": {
    id: "supply-pillar",
    file: "bulk-cooking-oil-range.jpg",
    src: `${W}/bulk-cooking-oil-range.jpg`,
    alt: "Cuisine Foods bulk cooking oil range — sunflower, palm olein and cooking oil in 20L containers",
    ratio: "4/3",
    page: "Bulk Cooking Oil Supply",
    shot: "The 20L product range on a counter.",
  },
  "uco-pillar": {
    id: "uco-pillar",
    file: "used-cooking-oil-collection-drum.jpg",
    src: `${W}/used-cooking-oil-collection-drum.jpg`,
    alt: "Cuisine Foods branded used cooking oil collection drum with sealed storage containers",
    ratio: "4/3",
    page: "Used Cooking Oil Collection",
    shot: "Branded UCO collection drum + sealed containers.",
  },
  "product-sunflower-oil": {
    id: "product-sunflower-oil",
    file: "sunflower-oil-20l.jpg",
    src: `${W}/sunflower-oil-20l.jpg`,
    alt: "Cuisine Oil 100% pure sunflower oil in a 20L container",
    ratio: "4/3",
    page: "Sunflower Oil",
    shot: "20L sunflower oil container, moody premium lighting.",
  },
  "product-palm-olein": {
    id: "product-palm-olein",
    file: "palm-olein-20l.jpg",
    src: `${W}/palm-olein-20l.jpg`,
    alt: "Cuisine Oil 100% pure palm olein in a 20L container",
    ratio: "4/3",
    page: "Palm Olein",
    shot: "20L palm olein container.",
  },
  "product-soya-oil": {
    id: "product-soya-oil",
    file: "cooking-oil-20l.jpg",
    src: `${W}/cooking-oil-20l.jpg`,
    alt: "Cuisine Foods 100% pure cooking oil in a 20L container",
    ratio: "4/3",
    page: "Soya Oil",
    shot: "20L cooking oil container.",
  },
  "trust-operations": {
    id: "trust-operations",
    file: "team-loading-delivery-truck.jpg",
    src: `${W}/team-loading-delivery-truck.jpg`,
    alt: "Cuisine Foods team loading the branded delivery truck — reliable bulk oil delivery across Gauteng and the Western Cape",
    ratio: "4/3",
    page: "Commercial pages (trust band)",
    shot: "Branded team + branded truck loading — reliability proof.",
  },
  "why-fleet": {
    id: "why-fleet",
    file: "cuisine-foods-team-branded-oil.jpg",
    src: `${W}/cuisine-foods-team-branded-oil.jpg`,
    alt: "A Cuisine Foods team member in branded uniform with bulk cooking oil containers",
    ratio: "4/3",
    page: "Home / About",
    shot: "Branded-uniform staff with product — reliability + people + brand.",
  },
  "social-kitchen": {
    id: "social-kitchen",
    file: "commercial-kitchen-chef.jpg",
    src: `${W}/commercial-kitchen-chef.jpg`,
    alt: "A chef in a commercial kitchen with Cuisine Foods cooking oil",
    ratio: "4/3",
    page: "Home",
    shot: "Chef in-kitchen with product.",
  },
  "about-team": {
    id: "about-team",
    file: "cuisine-foods-chef-oil-range.jpg",
    src: `${W}/cuisine-foods-chef-oil-range.jpg`,
    alt: "A chef presenting the Cuisine Foods cooking oil range",
    ratio: "4/3",
    page: "About",
    shot: "Chef with the product range — humanises the brand.",
  },
  "location-gauteng": {
    id: "location-gauteng",
    file: "gauteng-oil-delivery-loading.jpg",
    src: `${W}/gauteng-oil-delivery-loading.jpg`,
    alt: "Cuisine Foods loading bulk cooking oil for delivery across Gauteng",
    ratio: "4/3",
    page: "Gauteng",
    shot: "Loading/delivery operations (Gauteng).",
  },
  "location-western-cape": {
    id: "location-western-cape",
    file: "western-cape-oil-delivery.jpg",
    src: `${W}/western-cape-oil-delivery.jpg`,
    alt: "Cuisine Foods delivering bulk cooking oil across the Western Cape",
    ratio: "4/3",
    page: "Western Cape",
    shot: "Delivery in action (Western Cape).",
  },

  /* ---- Per-page imagery: every commercial page gets its own visual story ---- */

  // Buyer segments
  "buyer-hotels": { id: "buyer-hotels", file: "hotel-hospitality-kitchen.jpg", src: `${W}/hotel-hospitality-kitchen.jpg`, alt: "Hotel kitchen service plated with oil supplied by Cuisine Foods", ratio: "4/3", page: "Cooking Oil for Hotels", shot: "Hospitality plating — premium hotel food service." },
  "buyer-caterers": { id: "buyer-caterers", file: "catering-plated-dishes.jpg", src: `${W}/catering-plated-dishes.jpg`, alt: "Catering dishes fried in Cuisine Foods cooking oil", ratio: "4/3", page: "Cooking Oil for Caterers", shot: "Plated catering dishes — event food presentation." },
  "buyer-manufacturers": { id: "buyer-manufacturers", file: "bulk-oil-volume-supply.jpg", src: `${W}/bulk-oil-volume-supply.jpg`, alt: "Bulk Cuisine Foods cooking oil supplied at volume for food production", ratio: "4/3", page: "Cooking Oil for Food Manufacturers", shot: "Volume/scale — production-line supply." },
  "buyer-franchises": { id: "buyer-franchises", file: "franchise-branded-oil-supply.jpg", src: `${W}/franchise-branded-oil-supply.jpg`, alt: "Cuisine Foods branded staff with the bulk oil range for franchise groups", ratio: "4/3", page: "Cooking Oil for Franchises", shot: "Branded team + full range — multi-site consistency." },

  // UCO services
  "uco-get-paid": { id: "uco-get-paid", file: "uco-collection-drums.jpg", src: `${W}/uco-collection-drums.jpg`, alt: "Cuisine Foods used cooking oil collection drum and sealed containers ready for pickup", ratio: "3/4", page: "Get Paid for Used Oil", shot: "Collection drums — what we pay for." },
  "uco-compliance": { id: "uco-compliance", file: "uco-collection-documentation.jpg", src: `${W}/uco-collection-documentation.jpg`, alt: "Signing collection documentation at a Cuisine Foods branded vehicle", ratio: "4/3", page: "UCO Compliance", shot: "Documentation handover — the compliance paper trail." },
  "uco-grease-trap": { id: "uco-grease-trap", file: "onsite-oil-collection.jpg", src: `${W}/onsite-oil-collection.jpg`, alt: "On-site oil collection at a commercial kitchen by Cuisine Foods", ratio: "3/4", page: "Grease-Trap Cleaning", shot: "On-site collection in action." },
  "uco-reporting": { id: "uco-reporting", file: "uco-reporting-paperwork.jpg", src: `${W}/uco-reporting-paperwork.jpg`, alt: "Collection paperwork recorded against a Cuisine Foods vehicle for store-level reporting", ratio: "3/4", page: "UCO Compliance Reporting", shot: "Paperwork/record-keeping — store-level reporting." },
  "uco-recycling": { id: "uco-recycling", file: "uco-recycling-loading.jpg", src: `${W}/uco-recycling-loading.jpg`, alt: "Used cooking oil loaded for recycling into renewable biodiesel", ratio: "3/4", page: "Cooking Oil Recycling", shot: "Loading collected oil — the recycling journey begins." },

  // Product decision page
  "product-frying-oil": { id: "product-frying-oil", file: "frying-oil-pouring.jpg", src: `${W}/frying-oil-pouring.jpg`, alt: "Fresh Cuisine Foods frying oil being poured for a commercial fryer", ratio: "4/3", page: "Frying Oil", shot: "Pouring fresh oil — the frying moment." },

  // Metro location pages
  "metro-johannesburg": { id: "metro-johannesburg", file: "johannesburg-delivery-team.jpg", src: `${W}/johannesburg-delivery-team.jpg`, alt: "Cuisine Foods delivery team on the branded truck serving Johannesburg", ratio: "4/3", page: "Johannesburg", shot: "Delivery team + livery — local presence." },
  "metro-pretoria": { id: "metro-pretoria", file: "pretoria-delivery-crew.jpg", src: `${W}/pretoria-delivery-crew.jpg`, alt: "Cuisine Foods delivery crew serving Pretoria and Centurion from the Centurion branch", ratio: "4/3", page: "Pretoria & Centurion", shot: "Crew in the cab — the home-branch team." },
  "metro-cape-town": { id: "metro-cape-town", file: "cape-town-oil-loading.jpg", src: `${W}/cape-town-oil-loading.jpg`, alt: "Loading bulk cooking oil for delivery across Cape Town", ratio: "3/4", page: "Cape Town", shot: "Loading for the Cape Town run." },
  "metro-northern-suburbs": { id: "metro-northern-suburbs", file: "northern-suburbs-delivery.jpg", src: `${W}/northern-suburbs-delivery.jpg`, alt: "Cuisine Foods delivery to Cape Town's Northern Suburbs", ratio: "3/4", page: "Northern Suburbs", shot: "Delivery run — Bellville/Durbanville area." },
};

export function getImage(id: string): ImageSlot {
  return images[id] ?? { id, file: "", alt: "", ratio: "4/3", page: "", shot: "" };
}
