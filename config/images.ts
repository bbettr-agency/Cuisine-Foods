/**
 * IMAGE MANIFEST — placeholder system (OS pattern P10).
 *
 * All website photography lives in ONE flat folder: public/images/website/.
 * Each slot below has a recommended `file`. Until a real photo is uploaded,
 * <Placeholder> renders a clean branded box. To activate a slot once the photo
 * lands, set its `src` to `/images/website/<file>` — the image then simply
 * appears (crop/aspect already reserved, no layout shift).
 *
 * See public/images/website/README.md for filenames, dimensions & formats.
 */

export type ImageSlot = {
  id: string;
  file: string; // recommended filename inside public/images/website/
  src?: string; // set to `/images/website/<file>` once uploaded
  alt: string;
  ratio: "16/9" | "4/3" | "3/2" | "1/1" | "21/9" | "3/4";
  priority?: boolean; // true only for the LCP hero image
  page: string;
  shot: string; // photographer direction
};

export const images: Record<string, ImageSlot> = {
  "hero-home": {
    id: "hero-home",
    file: "hero-delivery.webp",
    alt: "Cuisine Foods delivery of bulk cooking oil to a South African commercial kitchen",
    ratio: "4/3",
    priority: true,
    page: "Home",
    shot: "Branded delivery vehicle or stacked 20L oil drums at a real restaurant back-door — shows both sides of the loop. Warm, natural light.",
  },
  "supply-pillar": {
    id: "supply-pillar",
    file: "bulk-oil-supply.webp",
    alt: "Bulk cooking oil supply — 20L containers ready for delivery",
    ratio: "3/2",
    page: "Bulk Cooking Oil Supply",
    shot: "Pallet of branded 20L oil containers in the warehouse.",
  },
  "uco-pillar": {
    id: "uco-pillar",
    file: "uco-collection.webp",
    alt: "Used cooking oil collection from a commercial kitchen",
    ratio: "3/2",
    page: "Used Cooking Oil Collection",
    shot: "Sealed UCO drum being collected at a restaurant; branded collection vehicle in frame.",
  },
  "product-sunflower-oil": { id: "product-sunflower-oil", file: "sunflower-oil-20l.webp", alt: "Bulk sunflower cooking oil in a 20L container", ratio: "3/2", page: "Sunflower Oil", shot: "20L sunflower oil container, clean studio or warehouse setting." },
  "product-palm-olein": { id: "product-palm-olein", file: "palm-olein-20l.webp", alt: "Bulk palm olein frying oil in a 20L container", ratio: "3/2", page: "Palm Olein", shot: "20L palm olein container; hint of a commercial fryer behind." },
  "product-soya-oil": { id: "product-soya-oil", file: "soya-oil-20l.webp", alt: "Bulk soya cooking oil in a 20L container", ratio: "3/2", page: "Soya Oil", shot: "20L soya oil container." },
  "why-fleet": { id: "why-fleet", file: "delivery-fleet.webp", alt: "Cuisine Foods own delivery fleet", ratio: "3/2", page: "Home / About", shot: "Branded delivery vehicle(s) — reliability proof." },
  "social-kitchen": { id: "social-kitchen", file: "commercial-kitchen.webp", alt: "A busy South African commercial kitchen served by Cuisine Foods", ratio: "16/9", page: "Home", shot: "Real professional kitchen mid-service (with permission)." },
  "about-team": { id: "about-team", file: "team.webp", alt: "The family-owned Cuisine Foods team", ratio: "16/9", page: "About", shot: "Team / founders at the depot or warehouse — humanises the brand." },
  "location-gauteng": { id: "location-gauteng", file: "gauteng-operations.webp", alt: "Cuisine Foods serving Gauteng food businesses", ratio: "16/9", page: "Gauteng", shot: "Delivery or warehouse operations (Gauteng branch)." },
  "location-western-cape": { id: "location-western-cape", file: "western-cape-operations.webp", alt: "Cuisine Foods serving Western Cape food businesses", ratio: "16/9", page: "Western Cape", shot: "Delivery or warehouse operations (Western Cape branch)." },
};

export function getImage(id: string): ImageSlot {
  return images[id] ?? { id, file: "", alt: "", ratio: "3/2", page: "", shot: "" };
}
