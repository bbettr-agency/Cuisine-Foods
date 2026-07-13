# Website photography

Upload **all** Cuisine Foods photography into this one folder (`public/images/website/`) — products, cooking-oil containers, bulk oil, UCO collection, warehouse, delivery/operations, team/business environment, and anything else from the shoot. No subfolders.

Until a photo is uploaded, each spot on the site shows a clean branded placeholder, so the site already looks complete.

## Preferred format & size
- **Format:** WebP preferred (best quality-to-size). JPG is fine too. (Images are auto-optimised to AVIF/WebP on build.)
- **Max file size:** hero image **< 400 KB**; all others **< 250 KB**.
- **Look:** real Cuisine Foods photography from the shoot — warm, natural, premium. No stock.

## Recommended filenames & dimensions
Use these filenames and each photo drops straight into the right spot. (Extra images are welcome — just give them clear, descriptive names.)

| Filename | Where it appears | Aspect | Recommended size |
|---|---|---|---|
| `hero-delivery.webp` | Homepage hero (most important) | 4:3 | 1600 × 1200 px |
| `bulk-oil-supply.webp` | Bulk supply pages | 3:2 | 1500 × 1000 px |
| `uco-collection.webp` | Used-oil collection pages | 3:2 | 1500 × 1000 px |
| `sunflower-oil-20l.webp` | Sunflower Oil page | 3:2 | 1500 × 1000 px |
| `palm-olein-20l.webp` | Palm Olein & Frying Oil pages | 3:2 | 1500 × 1000 px |
| `soya-oil-20l.webp` | Soya Oil page | 3:2 | 1500 × 1000 px |
| `delivery-fleet.webp` | Homepage "Why us" & About | 3:2 | 1500 × 1000 px |
| `commercial-kitchen.webp` | Homepage social proof | 16:9 | 1600 × 900 px |
| `team.webp` | About page | 16:9 | 1600 × 900 px |
| `gauteng-operations.webp` | Gauteng page | 16:9 | 1600 × 900 px |
| `western-cape-operations.webp` | Western Cape page | 16:9 | 1600 × 900 px |

## How images get placed (later)
1. Drop your photos into this folder.
2. Tell Claude they're uploaded.
3. Claude matches each file to its slot in `config/images.ts` (by filename above, or by looking at the image content for anything named differently) and sets that slot's `src` to `/images/website/<filename>`.
4. Placeholders are replaced automatically — the crop and aspect ratio are already reserved, so there's no layout shift and nothing to restructure.

Extra photos beyond the list can be added as new slots (e.g. an image gallery) — just mention what you'd like them used for.
