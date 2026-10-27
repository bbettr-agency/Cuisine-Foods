# Cuisine Foods — Project Checkpoint

**Paused:** 2026-10-27 · **Resume cue:** say _"Continue Cuisine Foods"_ → read this file and resume from **Next Steps**.

---

## 1. Current Website Status

- **Latest `main` commit:** `6904394` (local == origin/main; working tree clean).
- **Visual hierarchy refinements:** completed, merged to `main`, and deployed to Vercel production.
- **CTA consistency fixes:** completed (light-hero secondary CTAs + TrustBand WhatsApp now use the `outlineInk` variant; gold quote button is the dominant primary).
- **Vercel production:** working / healthy. Verified live on https://cuisine-foods.vercel.app (homepage + `/palm-olein` 200; secondary buttons render `border-ink/30` not `bg-ink`; production CSS serves `--ink-faint:112 104 90`; navbar WhatsApp correctly still `bg-ink`).
- **Public domain:** `cuisinefoods.co.za` **remains on the existing GoHighLevel (GHL) website.** No public-domain migration has occurred.
- **`GHL_WEBHOOK_URL`:** **NOT configured on Vercel** (still the #1 pre-cutover blocker).
- **DNS / GHL / forms / environment variables:** untouched. All work to date is code-only, not a domain launch.

---

## 2. Completed Work (this session)

1. **Visual hierarchy + CTA-contrast refinements** — merged to `main` (`6904394`) and deployed. New `outlineInk` Button variant replaces solid-black secondary CTAs on all light-hero surfaces + the mid-page TrustBand WhatsApp; `--ink-faint` darkened `138 130 116` → `112 104 90` (#70685A) for WCAG AA. Navbar WhatsApp, dark final-CTA sections, typography, packshots, hero layouts, animations, National Footprint and Closed Loop were all protected and untouched. `tsc` / `eslint` / `build` were clean.
2. **Document & SEO opportunity audit** — audited all six files in `docs/` (research/recommendations only; no code changes). See findings below.

---

## 3. SEO Audit Findings (docs/ folder)

**Files audited:** `Cuisine_Foods_Choosing-Oil-eBook_2022.pdf` (21pp), `Cuisine_Foods_Oil-Life-eBook_2022.pdf` (11pp), `Cuisine_Foods_Testing-Oil-Article_2022.pdf` (6pp), `Cuisine_Foods_French_Fry_Infographic_2022.pdf` (1pp image), `3M-Cooking-Oil-Monitor-Chart-scaled-Cuisine Foods.psd` (image), `MIGRATION-REDIRECTS.md` (our own dev note).

**Key findings:**
- **Copyright / permission concern:** the three eBook/article PDFs are **Restaurant Technologies** (US) publications — only the covers/filenames were rebranded; the body text still says *"contact a Restaurant Technologies representative."* The French-fry infographic is RT content under a Cuisine logo. **Do NOT republish any of these verbatim** (third-party copyright + duplicate content + US-centric: Fahrenheit, FDA, US oils).
- **Useful commercial-frying information:** the documents cover genuinely valuable topics — oil **testing** (sensory + strip), oil **life / management** (filter, skim, "enemies of oil"), and oil **selection**. These are mineable as **original, SA-localised** content — never copied.
- **Cuisine-owned asset:** the **3M™ Shortening Monitor** chart (#5) is genuinely Cuisine-branded and carries correct NAP (591 Barolong Street, Sunderland Ridge, Centurion; 34B Station Road, Montague Gardens; 010 312 5275; admin@cuisinefoods.co.za — all match the site). It implies Cuisine supplies/promotes 3M oil **test strips** — a value-add **absent from the entire site** (`3M` / `test strip` / `shortening monitor` = 0 files). **Requires client confirmation** that Cuisine stocks 3M and has rights to the co-branded assets.
- **Site gap:** resources are UCO-heavy (5 of 7 articles) vs only 2 frying articles. The frying / oil-management side is comparatively thin — exactly where these documents help.
- **Existing resources can be improved:** deepen `commercial-frying-guide` ("keep it clean" / "when to change") and the `when-change-oil` FAQ with localised signals (quick wins, no new pages, no rights dependency).
- **Two new SEO articles recommended** (see Next Steps).

Full audit (14 sections: inventory, gaps, product-page opportunities, keyword themes, internal linking, trust/E-E-A-T, claims to verify, unsuitable content, roadmap) is in the session transcript.

---

## 4. Outstanding Tasks

- **[Tomorrow]** Draft two original SA-focused articles (A + B below) — DRAFTS ONLY.
- Quick wins: expand `when-change-oil` FAQ + `commercial-frying-guide` depth (localised, original).
- Confirm with client: does Cuisine stock the 3M Shortening Monitor, and are the 3M / Restaurant Technologies co-branded assets licensed?
- Pre-cutover (separate track, client-gated): set `GHL_WEBHOOK_URL` on Vercel; controlled lead test; then domain migration.

---

## 5. NEXT STEPS (for tomorrow)

**NEXT TASK: prepare two original, SEO-focused article DRAFTS for South African commercial kitchens.**

- **Article A — "When Should You Change Your Fryer Oil?"**
  - SA commercial-kitchen focus; sensory signs + structured testing; bridge supply → UCO collection.
- **Article B — "How to Make Commercial Frying Oil Last Longer"**
  - SA focus; filtering/skimming cadence, temperature discipline, the "enemies of oil", cost-over-time.

**Rules for the drafts:**
- **DRAFTS ONLY** — do not publish or implement without approval.
- **Do NOT copy third-party (Restaurant Technologies / 3M) copyrighted material** — original writing, SA-localised (Celsius, SA context), use documents only as topic inspiration.
- **Do NOT claim Cuisine Foods sells 3M products** without client confirmation.
- Preserve all approved product-page designs and animations.

---

## 6. Important Restrictions (standing)

- No website code changes, no branch merges, no deploys, no DNS changes, no integration/env config — unless explicitly approved.
- `cuisinefoods.co.za` stays on GHL until an explicit, client-approved cutover.
- Truth integrity: every published claim must trace to a verified source; do not reintroduce unverified smoke points, nutrition figures, or US product claims from the documents.
- SA/British copy uses en dash "–", never em dash "—".
