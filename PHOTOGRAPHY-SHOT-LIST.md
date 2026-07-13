# Photography Shot List — Cuisine Foods

Generated from the image manifest (`config/images.ts`). Provide these shots and they drop straight into the site — **no code changes needed**.

## How to supply images
1. Save each photo with the exact **filename** below into the matching folder under `public/images/`.
2. In `config/images.ts`, set the slot's `src` to that path (e.g. `src: "/images/hero/home-delivery.jpg"`).
3. The branded placeholder is automatically replaced by your photo (correct crop/aspect ratio already reserved — no layout shift).

**Format:** high-res JPG or WebP. Hero < 400KB, others < 250KB (they're auto-optimised to AVIF/WebP). Warm, natural light; premium but real (not stock-looking).

| Slot / filename | Where it appears | Aspect | The shot |
|---|---|---|---|
| `hero/home-delivery.jpg` | Homepage hero (most important) | 4:3 | Branded delivery vehicle **or** stacked 20L oil drums at a real restaurant back-door — shows both sides of the loop. |
| `supply/supply-pillar.jpg` | Bulk supply pages | 3:2 | A pallet of branded 20L oil containers in the warehouse. |
| `uco/uco-pillar.jpg` | UCO collection pages | 3:2 | A sealed UCO drum being collected at a restaurant; branded collection vehicle in frame. |
| `products/sunflower-oil-20l.jpg` | Sunflower Oil page | 3:2 | 20L sunflower oil container, clean studio/warehouse. |
| `products/palm-olein-20l.jpg` | Palm Olein & Frying Oil pages | 3:2 | 20L palm olein container; hint of a commercial fryer behind. |
| `products/soya-oil-20l.jpg` | Soya Oil page | 3:2 | 20L soya oil container. |
| `fleet/delivery-fleet.jpg` | Homepage "Why us" & About | 3:2 | Branded delivery vehicle(s) — reliability proof. |
| `social/commercial-kitchen.jpg` | Homepage social proof | 16:9 | A real professional kitchen mid-service (with permission). |
| `about/team.jpg` | About page | 16:9 | Team / founders at the depot — humanises the family-owned brand. |
| `locations/gauteng.jpg` | Gauteng page | 16:9 | Gauteng branch / delivery in a recognisable Gauteng setting. |
| `locations/western-cape.jpg` | Western Cape page | 16:9 | Cape Town branch / delivery with a recognisable Cape backdrop. |

## Also needed
- `public/images/logo/cuisine-foods-logo.png` — logo (used in Organization schema; the header wordmark can also be swapped for it).
- `public/images/og/cuisine-foods-og.jpg` — **1200×630** social-share image (shown when the site is shared on WhatsApp/Facebook/LinkedIn).
- `public/favicon.ico` + app icons.
