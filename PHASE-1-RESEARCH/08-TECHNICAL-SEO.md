# TECHNICAL SEO RECOMMENDATIONS

Targets (OS hard gates): Lighthouse mobile ≥95 (all 4), SEO 100; LCP <2.5s · CLS <0.1 · INP <200ms; first-load JS <150KB gz. Stack: Next.js 14 App Router (static-first) + TS + Tailwind + Framer Motion, config-driven, GHL webhook forms.

## 1. Fix what's broken on the current site (must-do)
- **robots.txt** empty/missing → add `app/robots.ts` (allow all, link sitemap).
- **www vs non-www** inconsistency (schema uses www, site non-www) → pick one canonical host (recommend non-www `cuisinefoods.co.za`), 301 the other, self-referencing canonical on every page.
- **Schema typo** "Barlolong" → "Barolong"; **Cape Town branch missing from schema** → add.
- **No canonical** on home → canonical on every page.
- **Only LocalBusiness schema** → add Organization, Product, Service, FAQPage, Breadcrumb.
- **Orphaned 404s** (`/used-cooking-oil-uco/`, `/vegetable-oils/`) → 301 to nearest live page (recover indexed URLs).
- **H1 misuse** (title-tag strings / ALL-CAPS as H1) → one natural H1 per page.
- **Redesign URL map + 301s** for all ranking pages (see `09-…` §5) — launch gate.

## 2. Metadata (per page, from `config/seo-config.ts`)
- Unique `<title>` <60 chars, unique meta description <155, exactly one H1, no skipped heading levels.
- Canonical URL every page. Open Graph + Twitter Card tags; a real `og-image` per template that exists in `/public`.
- `app/layout.tsx` = default metadata + Organization JSON-LD; per-route `generateMetadata()` overrides.
- `sitemap.ts` (all indexable routes, lastmod) + `robots.ts`. Consider `llms.txt` for AI-search.

## 3. Structured data (JSON-LD) plan
| Schema | Where |
|---|---|
| **Organization** | site-wide (layout) — name, logo, sameAs (FB/IG/LinkedIn/GBP), contactPoint |
| **LocalBusiness** (×2) | province pillars — real depot address, +27 phone, `areaServed`, geo, openingHours |
| **Service** | supply/UCO pillars + metro pages — serviceType, `areaServed`, provider=Org |
| **Product** | Sunflower / Palm Olein / Soya (no fake price/review; use offers=quote or omit) |
| **FAQPage** | home FAQ, service FAQs, resource articles (drives AI Overviews) |
| **BreadcrumbList** | every non-home page |
| **Article** | resource cluster posts (author/E-E-A-T) |
Validate all in Rich Results Test — zero errors (Gate 3). **Review/rating schema only from genuine consented reviews — no demo data in production.**

## 4. Performance (Core Web Vitals)
- Static rendering by default; client components only where interaction requires (nav toggle, forms, WhatsApp bar).
- `next/image` everywhere; `priority` on the LCP hero only; explicit width/height (CLS); lazy below fold. Hero <200KB AVIF/WebP; other images <120KB.
- Fonts via `next/font` (self-hosted, `display: swap`, subset), ≤2 families.
- Framer Motion imported per-component (tree-shakes); respect `prefers-reduced-motion`.
- **GHL/WhatsApp/GTM:** load `afterInteractive` or on-interaction (never block `<head>`); if a third-party script drags Lighthouse 90–95, document with/without numbers in PROJECT_STATUS.md.
- Watch redirect chains (TTFB <800ms on Vercel).

## 5. Config-driven image system (build now; client supplies photos later)
```
public/images/
  hero/            home, supply, uco, gauteng, western-cape
  products/        sunflower-oil-20l.jpg, palm-olein-20l.jpg, soya-oil-20l.jpg
  services/        uco-collection.jpg, grease-trap-cleaning.jpg
  fleet/           delivery-truck.jpg, drums-collection.jpg
  locations/       johannesburg.jpg, pretoria.jpg, cape-town.jpg …
  team/  logo/  og/
```
- SEO-descriptive filenames; alt text from `config/`. A `<Placeholder>` component reads a config-driven path + aspect ratio → renders a branded placeholder box until the real file lands, then swaps with **no code change**. **No `images.unsplash.com` (or any placeholder host) in the production `next.config.js`** (launch rule).

## 6. Accessibility (hard on critical — Gate 3)
axe: zero critical/serious; full keyboard nav + visible focus; contrast ≥4.5:1 body / ≥3:1 large; tap targets ≥44px; labelled form fields + announced errors; skip-to-content; `prefers-reduced-motion`.

## 7. Mobile & conversion plumbing
QA at 360/390/768px (no horizontal scroll); sticky mobile CTA bar (Call + WhatsApp); `inputMode` keyboards on forms; every path test-fired end-to-end (form → GHL webhook → notification; `tel:` dials; WhatsApp opens pre-filled); reachable tracked `/thank-you`; **POPIA consent on forms** (SA).

## 8. Launch (Gate 4)
Domain/DNS/SSL on production; 301 map live; Search Console verified + sitemap submitted; GBP linked; GA4/GTM events firing in production (form/call/WhatsApp); 404 page; no placeholder-host images; env vars in Vercel.
</content>
