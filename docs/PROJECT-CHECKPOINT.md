# Cuisine Foods — Project Checkpoint

**Paused:** 2026-11-02 · **Resume cue:** say _"Continue Cuisine Foods"_ → read this file and resume from **Next Steps**.

---

## 1. Current Website Status

- **Latest `main` commit:** `bcf2c29` (local == origin/main).
- **Live production:** https://cuisine-foods.vercel.app — Ready, HTTP 200, serving current `main`.
- **Public domain:** `cuisinefoods.co.za` **remains on the existing GoHighLevel (GHL) website.** No public-domain migration has occurred.
- **`GHL_WEBHOOK_URL`:** **NOT configured on Vercel** (still the #1 pre-cutover blocker).
- **DNS / GHL / forms / environment variables:** untouched. All work is code-only, not a domain launch.

---

## 2. Completed Work (recent)

1. **Visual hierarchy + CTA-contrast refinements** — merged & deployed (earlier; `outlineInk` variant, `--ink-faint` WCAG AA fix).
2. **`docs/` document & SEO audit** — done (findings in §4 below).
3. **Homepage Closed Loop (Supply + Recovery) — one-way fix** — **MERGED to main (`bcf2c29`) and LIVE.**
   - Was a factually-misleading **closed ellipse** (biodiesel looped back to fresh oil). Now a **one-way open 270° arc** (top → right → bottom → left; top-left quadrant open, never reconnects).
   - Four stages: Fresh oil delivered · You cook · We collect & pay · Recovered for biodiesel (dropped the separate "Used oil out" stage).
   - Onward exit = a single **left-pointing** caption "← Onward into the biodiesel supply chain" (desktop; ArrowDown on mobile). No "biodiesel → edible" or export/country claims.
   - Draw changed from scroll-**scrubbed** (arrived half-drawn) to **time-based, scroll-triggered** (`whileInView` once + `pathLength` variant, ~0.6s pause then ~1.8s travel). Reduced-motion/SSR show the completed arc immediately.
   - Scope: homepage section only (`components/sections/closed-loop.tsx`). Verified desktop 1440 + mobile 390, slow/fast/scroll-back, reduced-motion, no overflow; tsc/eslint/build clean.
   - Branch `fix/closed-loop-one-way-flow` is merged (can be deleted).

---

## 3. Outstanding Tasks

- **[Next]** Two original SEO article DRAFTS still awaiting approval — see Next Steps.
- Confirm with client: does Cuisine stock the 3M Shortening Monitor, and are the 3M / Restaurant Technologies co-branded assets licensed? (Unlocks Article A §2 upgrade and any downloadable use of the 3M/French-fry assets.)
- Pre-cutover (separate track, client-gated): set `GHL_WEBHOOK_URL` on Vercel; controlled lead test; then domain migration.

---

## 4. SEO Audit Findings (docs/ folder) — summary

- The three eBook/article PDFs + the French-fry infographic are **Restaurant Technologies (US) copyrighted** material (rebranded covers only) — **do NOT republish verbatim** (copyright + duplicate content + US-centric).
- The **3M Shortening Monitor** chart is genuinely Cuisine-branded with correct NAP; implies Cuisine supplies 3M oil **test strips** (absent from the site) — **needs client confirmation** of stock + rights.
- Frying / oil-management resource cluster is thin vs UCO — the documents' topics support original, SA-localised content.

---

## 5. NEXT STEPS (for tomorrow)

**TASK: finalise the two original SEO article DRAFTS (already written, in `docs/drafts/`) — still DRAFTS ONLY, awaiting approval.**

- **Article A — `docs/drafts/article-A_when-to-change-fryer-oil.md`**
  - "When should you change your fryer oil?" — diagnostic: sensory signs + testing + replacement + safe handling → UCO collection.
- **Article B — `docs/drafts/article-B_reduce-cooking-oil-costs.md`**
  - "How to reduce commercial cooking-oil costs" — economics: cost over time, replacement frequency, waste, purchasing, paid collection.

Both already refined per approved Option A (no RT/3M copy, no TPM number, no "enemies of oil" / "roughly double" claims, SA-localised, distinct search intents). **Awaiting the user's go-ahead to publish** (i.e., add to `config/resources.ts`). Do not implement without approval.

Other options if the user prefers: the two "quick win" improvements (expand the `when-change-oil` FAQ + deepen `commercial-frying-guide`).

---

## 6. Important Restrictions (standing)

- No website code changes, no branch merges, no deploys, no DNS changes, no integration/env config — unless explicitly approved.
- `cuisinefoods.co.za` stays on GHL until an explicit, client-approved cutover.
- Truth integrity: every published claim must trace to a verified source; do not reintroduce unverified smoke points, nutrition figures, or US product claims from the documents.
- SA/British copy uses en dash "–", never em dash "—".
