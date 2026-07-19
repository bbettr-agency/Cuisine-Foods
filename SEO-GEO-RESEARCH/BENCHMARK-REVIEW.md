# Benchmark Review — Cuisine Foods
**Live:** https://cuisine-foods.vercel.app · **Repo:** bbettr-agency/Cuisine-Foods (`main`) · Verified on production.

Goal: not just a high-converting site, but **the benchmark website for the SA cooking oil & used cooking oil industry.**

---

## 1. Every page is now its own landing page

Judged as if Google Ads sent R100k/month to each page individually.

| Page | Own story | Own imagery | Own CTA |
|---|---|---|---|
| Sunflower / Palm Olein / Soya | product spec + use-case | own 20L product shot | "Ready to order sunflower oil?" |
| Frying Oil | which-oil decision page + comparison table | **pouring fresh oil** (no longer shared) | product-specific |
| Restaurants | never run dry | **real commercial kitchen** | "Cooking Oil for Restaurants — get your pricing" |
| Hotels | multi-outlet supply | **hospitality plating** | segment-specific |
| Caterers | flexible volumes | **plated catering dishes** | segment-specific |
| Food manufacturers | consistent spec | **volume/scale supply** | segment-specific |
| Franchises | multi-site + reporting | **branded team + full range** | segment-specific |
| UCO — Get paid | what your oil is worth + calculator | **collection drums** | "turn your used oil into cash" |
| UCO — Compliance | Waste Act / SAWIS / FOG | **documentation handover** | compliance-led |
| Grease-trap | adjacent service | **on-site collection** | booking-led |
| UCO reporting | franchise/group | **record-keeping** | group-led |
| Recycling | biodiesel/ESG | **loading for recycling** | ESG-led |
| Johannesburg / Pretoria / Cape Town / Northern Suburbs | municipality-specific bylaws, suburbs, local logistics | **4 distinct local delivery/loading crews** (previously **no imagery at all**) | local |

**Verified on production: 18 commercial pages → 18 distinct images, zero repeats.**

## 2. Photography — 12 → 26 placed

All 85 unused frames were reviewed on contact sheets and 14 placed deliberately, matched to the story each page tells: delivery, loading, logistics, crews in the cab, customer documentation handover, on-site collection, UCO drums, product range, hospitality plating, catering dishes, and the pouring shot. Ratios match each source (4:3 or 3:4) so **there are no forced crops**, and the portrait/landscape mix creates rhythm instead of a uniform grid. No decorative images were added — every placement reinforces its section.

## 3. Conversion architecture (earlier milestones, now sitewide)

- **Mid-page trust band** on every commercial page — real operations photo (branded team loading the branded truck) + closed-loop differentiator + 4 reliability proofs + objection reassurances + **inline CTA**, so a convinced buyer never has to scroll to top or bottom.
- **Page-specific closing CTAs** — the identical "Ready for a supplier that does both?" is gone.
- **Hierarchy fixed** — no more H1/H2 stutter; pages lead with value.
- **Clutter removed** — two stacked link-lists merged into one.
- **Progressive proof** — testimonials, client logos, certifications, guarantees, response time all wired and hidden until real data arrives. **Nothing fabricated.**

## 4. Verification

Clean production build each milestone: `build` ✅ 43 pages · `lint` ✅ · `tsc` ✅ · responsive ✅ (390 / 768 / 1280 — one-column stacking, **no horizontal overflow**, 44px tap targets, content-before-image on mobile) · production re-verified after every push.

*Note on tooling:* an intermittent HTTP 500 during local testing was traced to the Browser-pane dev server sharing `.next` with `npm start` (clobbered vendor chunks) — a harness artifact, not a code defect. Confirmed by a clean rebuild: all pages 200 with correct imagery.

---

## 5. Self-audit — what I could still meaningfully improve (honest)

I was asked to keep challenging until no meaningful improvement remained. These are the ones I can still see:

1. **Unique objections & FAQs per page.** The trust-band reassurances ("no strict minimum", "first delivery this week", "no lock-in") are currently **identical on every commercial page**, and buyer pages share an FAQ set. A hotel's objections (multi-outlet consistency, account terms) differ from a manufacturer's (spec/COA, tanker volumes) and a franchise HQ's (audit trail, rollout). **This is the biggest remaining page-uniqueness gap.**
2. **~71 photos still unplaced.** One deliberate image per page was the right call over decoration, but longer pages (products, UCO pillar) could carry a *second* earned image inside the content sections — which would also break up the remaining text runs.
3. **Alternating content-section layouts.** Content sections are still text-only; an optional image + alternating left/right rhythm would lift them further from "wall of text".
4. **Location pages** could carry more local proof (branch map is on province pages only; metro pages could show a local delivery-day/route note or an area testimonial once data exists).
5. **Typography/spacing** is consistent and premium, but I have not done the page-by-page rhythm audit at the granularity described — it's a systematic pass, not a defect.

## 6. Blocked on client data (the largest remaining conversion gain)

The architecture is built and waiting; each lights up in `config/trust.ts` with **no code change**:
**testimonials** (+consent) · **client names/logos** · **certifications** (ISCC/HACCP/B-BBEE) · **a scale number** (litres/month) · **service guarantee** · **real WhatsApp response time** · **founding-year confirmation** (2009 vs "15+ years" — currently inconsistent in source material).

Also client-side: **two Google Business Profiles**, pointing **cuisinefoods.co.za** at the new site (with the 301 map already prepared), and **`GHL_WEBHOOK_URL`** for live lead delivery.

---

### Bottom line
Against the six landing-page questions: a first-time visitor understands the offer in under 5 seconds (hero fork), the next action is obvious without scrolling (dual CTA + WhatsApp/call in the same eyeline), proof now appears **before** the ask on every commercial page (trust band), and each page tells its own story with its own photography. Versus the companies ranking #1–#5 — several of whom are uncrawlable, missing title tags, or running lorem-ipsum testimonials — this site already outperforms on structure, proof architecture, schema and AI-readiness. **The gap between "outperforms competitors" and "undeniable industry benchmark" is now mostly the client trust data plus the per-page objection/FAQ differentiation in §5.1.**
