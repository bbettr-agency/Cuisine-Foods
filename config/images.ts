/**
 * IMAGE MANIFEST — placeholder system + photography shot list (OS pattern P10).
 *
 * Every image slot is defined once here. The <Placeholder> component reads this:
 * if `src` is set (a real file in /public/images/...), it renders that image;
 * otherwise it renders a clean branded placeholder box. So when the client
 * uploads photography to the mapped path and we set `src`, the image simply
 * appears — no restructuring.
 *
 * `shot` doubles as the photographer brief (see /photography-shot-list, generated
 * from this manifest). Keep filenames SEO-descriptive.
 */

export type ImageSlot = {
  id: string;
  src?: string; // e.g. "/images/hero/home-delivery.jpg" — set when the real photo lands
  alt: string;
  ratio: "16/9" | "4/3" | "3/2" | "1/1" | "21/9" | "3/4";
  priority?: boolean; // true only for the LCP hero image
  page: string;
  shot: string; // photographer direction
};

export const images: Record<string, ImageSlot> = {
  "hero-home": {
    id: "hero-home",
    alt: "Cuisine Foods delivery of bulk cooking oil to a South African commercial kitchen",
    ratio: "4/3",
    priority: true,
    page: "Home",
    shot: "Branded delivery vehicle or stacked 20L oil drums at a real restaurant back-door — shows both sides of the loop. Warm, natural light.",
  },
  "supply-pillar": {
    id: "supply-pillar",
    alt: "Bulk cooking oil supply — 20L containers ready for delivery",
    ratio: "3/2",
    page: "Bulk Cooking Oil Supply",
    shot: "Pallet of branded 20L oil containers in the warehouse.",
  },
  "uco-pillar": {
    id: "uco-pillar",
    alt: "Used cooking oil collection from a commercial kitchen",
    ratio: "3/2",
    page: "Used Cooking Oil Collection",
    shot: "Sealed UCO drum being collected at a restaurant; branded collection vehicle in frame.",
  },
  "product-sunflower-oil": { id: "product-sunflower-oil", alt: "Bulk sunflower cooking oil in a 20L container", ratio: "3/2", page: "Sunflower Oil", shot: "20L sunflower oil container, clean studio or warehouse setting." },
  "product-palm-olein": { id: "product-palm-olein", alt: "Bulk palm olein frying oil in a 20L container", ratio: "3/2", page: "Palm Olein", shot: "20L palm olein container; hint of a commercial fryer behind." },
  "product-soya-oil": { id: "product-soya-oil", alt: "Bulk soya cooking oil in a 20L container", ratio: "3/2", page: "Soya Oil", shot: "20L soya oil container." },
  "why-fleet": { id: "why-fleet", alt: "Cuisine Foods own delivery fleet", ratio: "3/2", page: "Home / About", shot: "Branded delivery vehicle(s) — reliability proof." },
  "social-kitchen": { id: "social-kitchen", alt: "A busy South African commercial kitchen served by Cuisine Foods", ratio: "16/9", page: "Home", shot: "Real professional kitchen mid-service (with permission)." },
  "about-team": { id: "about-team", alt: "The family-owned Cuisine Foods team", ratio: "16/9", page: "About", shot: "Team / founders at the depot — humanises the brand." },
  "location-gauteng": { id: "location-gauteng", alt: "Cuisine Foods serving Gauteng food businesses", ratio: "16/9", page: "Gauteng", shot: "Gauteng branch / delivery in a recognisable Gauteng setting." },
  "location-western-cape": { id: "location-western-cape", alt: "Cuisine Foods serving Western Cape food businesses", ratio: "16/9", page: "Western Cape", shot: "Cape Town branch / delivery with a recognisable Cape backdrop." },
};

export function getImage(id: string): ImageSlot {
  return images[id] ?? { id, alt: "", ratio: "3/2", page: "", shot: "" };
}
