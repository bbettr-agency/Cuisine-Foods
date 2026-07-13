# PROJECT STATUS — Cuisine Foods

**OS version:** BBettr Website OS v2.0
**Stage:** Phase 3 (Build) complete — verified locally, pending production deploy verification.
**Repo:** github.com/bbettr-agency/Cuisine-Foods · **Deploy:** Vercel (auto from `main`)

## Gate results (Gate 3 — VERIFY)
| Check | Result |
|---|---|
| `npm run build` | ✅ pass — 42 pages, first-load JS 144 KB (< 150 KB budget) |
| `npx tsc --noEmit` | ✅ clean |
| `npm run lint` | ✅ clean |
| One H1 / unique title & meta per page | ✅ |
| Canonical, sitemap.ts, robots.ts | ✅ (35 URLs in sitemap) |
| JSON-LD (Org, LocalBusiness ×2, Service, Product, FAQ, Breadcrumb, Article) | ✅ present |
| Lead form → `/api/lead` → webhook | ✅ (200 valid / 400 missing fields); redirects to `/thank-you` |
| Responsive 375 / 768 / 1280 | ✅ verified in preview |
| Accessibility (skip link, focus rings, labelled fields, tap targets ≥44px, reduced-motion) | ✅ built in |
| Sticky mobile CTA + floating WhatsApp | ✅ |

## Config-driven / no-fabrication compliance
- All copy in `config/`; no hardcoded strings in components.
- **Progressive trust system:** only verified trust items render. Disabled until confirmed: certifications (HACCP/ISO/ISCC/ROSE/B-BBEE), named testimonials, quantified volumes ("thousands of kitchens"), service guarantees, exact response time.
- **Images:** all branded placeholders; real photography drops in via `config/images.ts` (see `PHOTOGRAPHY-SHOT-LIST.md`).

## Dependencies beyond the OS baseline (justified)
- `clsx` + `tailwind-merge` — class merging for the component library. Tiny, standard, no runtime cost of note.

## Outstanding — needs client input (see PHASE-1-RESEARCH/01-CLIENT-BRIEF.md §11)
1. Founding year (2009 vs "15+ years") — reconcile.
2. Substantiate / rephrase "two biggest UCO players in SA".
3. UCO commercials — pay rate per litre, free drums, safe-disposal certificate specifics.
4. Credentials — B-BBEE level, HACCP/ISO, ISCC/ROSE registration, licensed-handler proof → enable in `config/trust.ts`.
5. Real depot addresses to publish (GBP + citations) + confirm both branches staffed (→ 2 GBP profiles).
6. Testimonials + client names (with consent) → `config/trust.ts`.
7. `GHL_WEBHOOK_URL` for live lead delivery (set in Vercel).
8. Professional photography → replace placeholders.

## Post-launch (Gate 4 / GROW)
- Set `GHL_WEBHOOK_URL` + verify a live lead lands in GHL.
- Submit sitemap in Search Console; set up 2× Google Business Profiles; fire SA citations.
- 301 map from the old GoHighLevel site (preserve `/used-cooking-oil`, `/sunflower-oil`, `/soya-oil`, `/palm-oil`, `/services`, `/frying-guide`, `/uco-report`) → see PHASE-1-RESEARCH/09 §5.
- Lighthouse on production URL; confirm CWV field data in ~28 days.
