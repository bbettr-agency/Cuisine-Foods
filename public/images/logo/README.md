# Logo & brand assets

Upload these four files here (`public/images/logo/`). They power the header, footer, favicon, schema and social share previews.

| Filename | Used for | Format | Recommended size |
|---|---|---|---|
| `logo-primary.png` | Header & footer logo, Organization schema | PNG (transparent) | ~336 × 80 px (2× for retina); any width, ~40–48 px tall as displayed |
| `logo-icon.png` | Apple touch icon, small square uses | PNG (transparent, square) | 512 × 512 px |
| `favicon.ico` | Browser tab icon | ICO (multi-size 16/32/48) | 48 × 48 px |
| `og-image.jpg` | Social share preview (WhatsApp, Facebook, LinkedIn) | JPG | **1200 × 630 px** |

## After you upload
Set **`brand.ready: true`** in `config/site.ts`. That switches the header/footer from the text wordmark to `logo-primary.png`. The favicon, apple icon, OG image and schema logo already point to these paths — they light up automatically once the files exist.

Keep the filenames exactly as above.
