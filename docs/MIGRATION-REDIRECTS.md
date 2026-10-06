# Legacy → V2 Redirect Migration Inventory

**Status: PREPARED, NOT EXECUTED.** The public domain `cuisinefoods.co.za` currently
serves the **old GoHighLevel (LeadConnector) funnel**. The Next.js V2 site must only
take over the domain after V2 is complete, QA'd and approved. These 301s live in
`next.config.js` so they are ready the moment the domain is cut over to Vercel.

## How the current live (old) site was observed
- Live fetch of `https://cuisinefoods.co.za/` on 2026-10-06 confirmed the GoHighLevel
  funnel (LeadConnector CDN assets, `© 2025 Cuisine Foods`, no Next.js, no 3-branch/KZN).
- Old nav/URLs observed on the live old site: `/home`, `/about`, `/services`,
  `/contact`, `/frying-guide`, `/sunflower-oil`, `/palm-oil`, `/soya-oil`,
  `/used-cooking-oil`.

## Verified redirect map (in `next.config.js`, 301 permanent)
| OLD URL | → NEW URL | Status | Reason / evidence |
|---|---|---|---|
| `/home` | `/` | 301 | Old GHL home page; new site root (added this phase) |
| `/services` | `/bulk-cooking-oil-supply` | 301 | Old services hub → supply pillar |
| `/palm-oil` | `/palm-olein` | 301 | Product renamed to the correct commercial term |
| `/used-cooking-oil` | `/used-cooking-oil-collection` | 301 | UCO page → collection pillar |
| `/used-cooking-oil-uco` | `/used-cooking-oil-collection` | 301 | Legacy UCO variant |
| `/frying-guide` | `/resources/commercial-frying-guide` | 301 | Guide moved into resources |
| `/vegetable-oils` | `/bulk-cooking-oil-supply` | 301 | Legacy category → supply pillar |
| `/uco-report` | `/uco-compliance-reporting` | 301 | Legacy reporting slug |

## Same-slug (no redirect needed — equity preserved)
`/about`, `/contact`, `/sunflower-oil`, `/soya-oil` exist at the same paths on V2.

## OUTSTANDING — needs authoritative old-URL inventory before cutover
The list above is derived from the live old-site nav + existing redirects. It is
**not guaranteed complete**. Before cutover, enumerate the authoritative old URL set:
1. **Google Search Console** (old property) → Pages / Indexed URLs export. *(No access this phase.)*
2. The **old GoHighLevel sitemap** (e.g. `cuisinefoods.co.za/sitemap.xml` on the old site).
3. Any GHL funnel step / booking / thank-you URLs, blog/article URLs, and query-string funnels.
4. Confirm `NEXT_PUBLIC_SITE_URL` + `GHL_WEBHOOK_URL` are set in Vercel at cutover.

Add any additional verified old URLs here with evidence before go-live. Do **not** add
speculative redirects for URLs with no evidence of having existed.

## Cutover gate (do NOT execute yet)
Domain cutover only after: V2 complete · SEO QA · forms verified (GHL webhook set) ·
redirects verified · client approval · production QA.
