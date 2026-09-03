/**
 * DRUM ASSETS — transparent cut-out renders of the three Cuisine Foods oil
 * drums, used by the Hero → Products scroll journey and the product lineup.
 * These are cut from the professional shoot (rembg). A higher-resolution
 * studio/transparent render from the client would sharpen them further.
 */
export type Drum = { id: string; src: string; alt: string; width: number; height: number };

export const drums: Record<string, Drum> = {
  sunflower: {
    id: "sunflower",
    src: "/images/website/drum-sunflower.png",
    alt: "Cuisine Foods 100% pure sunflower oil — 20L bulk drum",
    width: 331,
    height: 426,
  },
  "palm-olein": {
    id: "palm-olein",
    src: "/images/website/drum-palm-olein.png",
    alt: "Cuisine Foods 100% pure palm olein — 20L bulk drum",
    width: 383,
    height: 494,
  },
  soya: {
    id: "soya",
    src: "/images/website/drum-soya.png",
    alt: "Cuisine Foods 100% pure cooking (soya) oil — 20L bulk drum",
    width: 302,
    height: 382,
  },
};

/** The drum that travels from the hero into the lineup. */
export const HERO_DRUM = "sunflower";
export const HERO_ANCHOR_ID = "drum-hero-anchor";
export const SLOT_ANCHOR_ID = "drum-slot-anchor";
