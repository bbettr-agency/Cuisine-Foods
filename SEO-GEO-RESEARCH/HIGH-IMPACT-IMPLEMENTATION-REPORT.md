# Cuisine Foods — Critical + High-Impact Implementation Report
### What shipped, expected impact, and what's left for Growth

**Date:** July 2026 · **Status:** 🔴 Critical + 🟠 High-Impact phases **complete, verified, committed and pushed** (auto-deployed to Vercel). Companion strategy: `SEO-GEO-STRATEGY-REPORT.md` + `SEO-GEO-ROADMAP-AND-PRIORITIES.md`.

No layout, imagery, or conversion-architecture was redesigned — every change is additive schema, content, structured data, and internal linking, consistent with the BBettr Website OS.

---

## 1. Everything that changed

### 🔴 Critical (pre-launch foundation) — 6 commits
| Change | Files |
|---|---|
| Removed **ROSE Foundation** as a UCO authority (it governs motor oil); replaced with **ISCC / SABA / IWMSA** + Waste Act/SAWIS framing | `config/trust.ts` |
| **Entity/Knowledge-Graph + schema `@graph`** — Organization (+`knowsAbout`, progressive `sameAs`) + 2× LocalBusiness with **geo**, image, priceRange; City-scoped `areaServed` on metros; Product images; Article `dateModified`; branch coords + entity config | `lib/schema.ts`, `config/site.ts`, `app/layout.tsx`, `views/*` |
| **AI-crawler policy** — explicit allow for OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot, Google-Extended, GPTBot, ClaudeBot, Applebot; **no llms.txt** | `app/robots.ts` |
| **Security headers** (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) | `next.config.js` |
| **301 redirects** for old GoHighLevel URLs (preserve ranking equity) | `next.config.js` |
| **Canonical-domain guard** — middleware `noindex`es any non-`cuisinefoods.co.za` host | `middleware.ts` |

### 🟠 High-Impact — 5 milestones, 5 commits
| Milestone | What shipped |
|---|---|
| **M1 · High-Impact SEO** | Product **spec sheets** (type, best-for, heat stability, ~smoke point, packaging) on Sunflower/Palm Olein/Soya; **"Which frying oil?" comparison table**; **6 high-intent sourced FAQs** (what is palm olein, best frying oil, UCO worth, UCO regulated/hazardous, SAWIS, restaurant volume) → FAQPage schema; new `SpecTable`/`ComparisonTableView` components |
| **M2 · Conversion** | **Interactive UCO value calculator** on `/get-paid` (slider → estimated monthly rebate, WhatsApp CTA pre-filled with volume) — a lead magnet no SA competitor has; config-driven rate range |
| **M3 · Content Architecture** | UCO **compliance page deepened** (Waste Act 59/2008 duty of care, SAWIS ~20 kg/day, municipal FOG by-laws + penalties, safe-disposal certificate); new **regulations article** ("the Waste Act, SAWIS & FOG by-laws") — answer-first, cited, current-dated |
| **M4 · AI/GEO** | **Editorial byline + config-driven `reviewedBy` Person schema** (renders only with a real reviewer — no fabrication); **GEO statistics** (SA UCO market US$295M→~$550M) injected; **answer-first** palm-olein intro (definition-led for the "what is palm olein" query) |
| **M5 · Internal Linking** | **content↔money reciprocity** (`resourceLinks`: money pages + pillars cite supporting guides); **location→pillar** contextual links (province + metro); descriptive anchors; no orphans |

**Result:** 43 static pages, sitemap 36 URLs, first-load JS unchanged (~144 KB). Build + lint + typecheck clean at every milestone.

---

## 2. Expected SEO impact

- **Schema/rich-result supremacy the market lacks:** we now emit a full `@graph` (Organization + 2× LocalBusiness w/ geo + FAQPage + Service + Product + Breadcrumb + Article) — **no bulk-oil competitor has Product/FAQ schema; only Scope Oils (UCO) has rich schema.** This drives rich results, local-pack eligibility, and disambiguation.
- **Entity establishment** (`knowsAbout` + progressive `sameAs` + geo + consistent NAP) sets up the Knowledge-Graph presence that feeds both Google and AI — the highest-leverage signal (branded mentions correlate **0.664** with AI citations vs 0.218 for links). *(Completes when the client adds Wikidata/GBP/LinkedIn URLs — one config edit.)*
- **Information-gain content** (product specs, comparison table, UCO pricing, SA compliance framework) — unique value competitors don't publish, which Google's helpful-content/core systems reward and consensus content is suppressed for.
- **Ranking-equity preservation** via 301s from the old site; **canonical-domain guard** prevents the Vercel alias diluting the real domain.
- **FAQ + comparison coverage** targets People-Also-Ask and featured snippets across product and UCO queries the field ignores.

## 3. Conversion improvements

- **UCO value calculator** — turns the abstract "we pay for your oil" into a personalised rand estimate with a one-tap WhatsApp CTA carrying the volume; a qualification + lead-magnet asset unique in the market.
- **Pricing transparency framing** ("range + ask for today's rate") on the get-paid page — out-positions the opaque field (only Bargain Oil publishes a rate, and not in our provinces).
- **Product spec sheets + comparison table** — reduce buyer uncertainty (chef + procurement), speeding the "which oil / is this right for me" decision toward a quote.
- **Deeper compliance content** answers the highest-converting UCO objection (legal/inspection risk) before the visitor has to ask.

## 4. AI-search (GEO) improvements

- **AI crawlers explicitly welcomed** (search + user + training) — we're in the fastest-growing discovery channel that competitors haven't contested; several rivals are literally uncrawlable (ONE OIL, OilDrop).
- **Answer-first, passage-shaped content** + **question FAQs** + **comparison/spec tables** — the exact formats AI Overviews/ChatGPT/Perplexity cite (tables win commercial citations; answers in the first 30% of the page).
- **GEO tactics applied** (Princeton study): **statistics** (+41%) and **cited authorities** (Waste Act, SAWIS, ISCC — up to +115% for lower-ranked pages) in UCO/compliance content; **`reviewedBy`** scaffolding (~3.7× AIO-citation correlation) ready for a named reviewer.
- **Freshness** signals (real `dateModified`, current-dated regulations article) — content <3 months old is ~3× more likely to be cited.
- **Entity clarity** (`knowsAbout`, geo, `@graph`) helps LLMs attribute the right topics/locations to the brand.

## 5. Verification

Every milestone: `npm run build` (43 pages) + `npm run lint` + `npx tsc --noEmit` clean, plus targeted checks on a local production server (schema, robots, redirects, headers, host-noindex, calculator, tables, FAQs, byline, statistics, resource links). Critical + High-Impact both re-verified live on `cuisine-foods.vercel.app` (the alias correctly serves `noindex` until DNS is pointed).

---

## 6. Remaining — 🟢 Growth + client/ops actions

**Client/ops (unblock the entity + local layer — mostly no code):**
1. **Point `cuisinefoods.co.za` DNS** to this Vercel project (site becomes the live, indexable one; 301s already handle old URLs).
2. **Create Wikidata item + two Google Business Profiles + LinkedIn**, then paste URLs into `config/site.ts` → `entity.links` / `branch.gbpUrl` (auto-populates `sameAs`). GBP categories: **Food products supplier** (primary) + Wholesaler / Recycling center / Waste management service.
3. **Confirm trust facts** (years, ISCC/HACCP/B-BBEE, testimonials, exact UCO rate, a named content reviewer) → enable in `config/trust.ts`, `config/site.ts` (`uco`, `editorial.reviewer`) — all progressive, no code changes.
4. **Verify both branches in Bing Webmaster Tools**; set up GA4 AI channel + GSC + call/form tracking.
5. **Reviews + citations engines** — WhatsApp→Google/HelloPeter (3–5/month); list on Bing, Apple, Brabys, saYellow, etc.

**🟢 Growth (code, data-driven):**
- Tier-2/3 **location pages** (Sandton, Midrand, East Rand, Southern Suburbs, Atlantic Seaboard…) as GSC demand appears — unique local + municipal-bylaw content.
- **Franchise/group reporting**, **biodiesel/ESG**, **grease-trap** pages already exist — expand depth.
- **Content-cluster cadence** (1–2 quality pieces/week): more UCO-compliance and product-decision guides; defend the informational rankings we already hold.
- **Local authority** — FEDHASA / chambers / RASA / IWMSA / SABA memberships; client approved-supplier links (B-BBEE-amplified); digital PR (sustainability/biodiesel/food-safety); a genuine Reddit/trade presence for AI citation.
- Optional: **URL-slug evaluation** (service-led location slugs) — only if we accept 301s.

**Bottom line:** the Critical + High-Impact phases put Cuisine Foods ahead of every SA competitor on the things that actually move Google *and* AI-search rankings — schema, entity signals, answer-first content, spec/comparison depth, transparent UCO pricing, correct compliance authority, and clean internal linking — with the layout, imagery, premium theme and conversion architecture fully intact. The remaining wins are the client-side entity/local actions (DNS, Wikidata, GBPs, reviews) and the Growth content/authority cadence that compounds over 6–12 months.
