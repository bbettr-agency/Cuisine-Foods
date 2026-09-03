/**
 * PRODUCT ASSETS — transparent cut-out renders of the three Cuisine Foods
 * products, used by the Hero → Products scroll journey and the product lineup.
 * Cut from the client's final approved studio renders (`*Final.png`, white
 * backgrounds removed via rembg object segmentation so the white lid/rim of
 * the cooking-oil pail is preserved). Dimensions are the trimmed pixel sizes.
 */
export type Product = { id: string; src: string; alt: string; width: number; height: number };

export const products: Record<string, Product> = {
  palm: {
    id: "palm",
    src: "/images/website/product-palm.png",
    alt: "Cuisine Foods 100% pure palm olein — bulk pail",
    width: 827,
    height: 1027,
  },
  cooking: {
    id: "cooking",
    src: "/images/website/product-cooking.png",
    alt: "Cuisine Foods 100% pure cooking oil — bulk pail",
    width: 869,
    height: 1046,
  },
  sunflower: {
    id: "sunflower",
    src: "/images/website/product-sunflower.png",
    alt: "Cuisine Foods 100% pure sunflower oil — bulk pail",
    width: 837,
    height: 1024,
  },
};

/** Backwards-compatible alias (DrumImage still reads `drums[id]`). */
export const drums = products;

/**
 * A leg of the scroll journey: one product that travels from its rest position
 * in the hero composition (`heroAnchorId`) into its lineup card (`slotAnchorId`).
 * `spin` is the peak twirl in degrees (signed: negative = counter-clockwise);
 * it eases out and back to 0 so every product lands upright with a readable
 * label. `tilt` is the peak 3D rotateY. `z` orders overlap (centre in front).
 */
export type JourneyLeg = {
  id: string;
  heroAnchorId: string;
  slotAnchorId: string;
  spin: number;
  tilt: number;
  z: number;
  floatPhase: number;
};

/** Desktop: all three products travel, in landing order (left → right). */
export const JOURNEY: JourneyLeg[] = [
  { id: "palm", heroAnchorId: "hero-palm", slotAnchorId: "slot-palm", spin: -24, tilt: 14, z: 10, floatPhase: 0 },
  { id: "cooking", heroAnchorId: "hero-cooking", slotAnchorId: "slot-cooking", spin: 10, tilt: 9, z: 30, floatPhase: 2.1 },
  { id: "sunflower", heroAnchorId: "hero-sunflower", slotAnchorId: "slot-sunflower", spin: 24, tilt: 14, z: 20, floatPhase: 4.2 },
];

/**
 * Mobile keeps the original single-drum experience: ONE product that falls a
 * short, clean distance from the hero into the TOP lineup card (no travelling
 * over other cards). The top card is the first product — palm — so the mobile
 * hero shows palm and it lands in the palm slot.
 */
export const MOBILE_LEG: JourneyLeg = {
  id: "palm",
  heroAnchorId: "hero-mobile",
  slotAnchorId: "slot-palm",
  spin: 16,
  tilt: 8,
  z: 40,
  floatPhase: 0,
};

/** Anchor pair that drives the shared scroll progress for each breakpoint. */
export const PROGRESS_REF = { heroAnchorId: "hero-cooking", slotAnchorId: "slot-cooking" };
export const MOBILE_PROGRESS_REF = { heroAnchorId: "hero-mobile", slotAnchorId: "slot-palm" };

/** Breakpoint at/above which the three-product desktop choreography runs. */
export const DESKTOP_MIN = 1024;
