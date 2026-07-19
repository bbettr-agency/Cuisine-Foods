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
};

export function getImage(id: string): ImageSlot {
  return images[id] ?? { id, file: "", alt: "", ratio: "4/3", page: "", shot: "" };
}
