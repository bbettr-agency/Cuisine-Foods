# Cuisine Foods — SEO/GEO Roadmap & Priorities
### Companion to `SEO-GEO-STRATEGY-REPORT.md` · §17–19 + the master prioritisation

**Nothing here is built yet — this is for approval.** Items are tagged by bucket:
**🔴 CRITICAL** (before the new site goes live on the real domain) · **🟠 HIGH-IMPACT** (first month) · **🟢 GROWTH** (following months).
Effort: S (hours) · M (1–3 days) · L (week+, often ongoing). Owner: **Dev** (code), **Ops** (client/off-site), **Both**.

---

## 17. Recommended Website Changes — ranked by impact

Ranked by expected effect on rankings + AI-citation + conversion, highest first. (The "why" and evidence are in the report §s noted.)

| # | Change | Bucket | Effort | Owner | Report § |
|---|---|---|---|---|---|
| 1 | **Canonical domain fix** — launch on `cuisinefoods.co.za`; 301/`noindex` the vercel host; every canonical + schema `@id` + citation uses `.co.za` | 🔴 | M | Both | 1, 12 |
| 2 | **Correct all UCO compliance content** — remove "ROSE Foundation" as a UCO authority (it's motor-oil only); replace with **ISCC, SABA, IWMSA, Waste Act 59/2008, SAWIS registration, municipal FOG by-laws**. Truth/E-E-A-T fix in `config/services.ts`, resources, strategy docs | 🔴 | S | Dev | 1, 10, 13 |
| 3 | **Entity/Knowledge-Graph foundation** — `Organization.knowsAbout` + rich `sameAs` (both GBPs, LinkedIn, Facebook, HelloPeter, Brabys/saYellow, **Wikidata**); create the **Wikidata item** | 🔴/🟠 | M | Both | 5, 16 |
| 4 | **Two Google Business Profiles** (Centurion 012 + Montague Gardens 021), service-area, verified categories (**Food products supplier** + Wholesaler/Recycling center/Waste management service), Products + Services filled | 🟠 | M | Ops | 9 |
| 5 | **Answer-first / passage restructuring + 8 high-intent FAQs** on money + resource pages (150-word self-contained sections, question H2s, comparison tables, answer in first 30%) | 🟠 | L | Dev | 5, 6, 14 |
| 6 | **UCO pricing page ("what we pay per litre") + value calculator + "who buys near me"** — the biggest open UCO gap; only Bargain Oil publishes a rate, not in our metros | 🟠 | M | Both | 7, 10, 11 |
| 7 | **UCO compliance & legal hub** (Waste Act, SAWIS, municipal FOG by-laws, safe-disposal certificate) — deepest-in-market; wins Intent B + AI citations | 🟠 | L | Dev | 7, 10 |
| 8 | **Schema upgrades** — `@graph` Org + 2× LocalBusiness (on /contact) + `Service`+`areaServed` on location pages; `geo`/`priceRange`/`image`; `dateModified`; UCO `Service category:"Waste Management"`/`RecyclingCenter`; `reviewedBy` on compliance content | 🟠 | M | Dev | 6, 9, 12 |
| 9 | **Surface trust proof** (progressive-trust: enable **verified** items only) — years, ISCC/HACCP/B-BBEE, volumes, client types/logos, testimonials, safe-disposal-certificate promise | 🟠 | M | Both | 11, 13 |
| 10 | **Comparison / "which oil" decision pages** (Sunflower vs Palm Olein vs Soya; best oil for deep frying) — green-field, nobody has them; table = AIO/snippet bait | 🟠/🟢 | M | Dev | 7, 14 |
| 11 | **Explicit AI-crawler allow + security headers** in `robots.ts`/`next.config` (allow OAI-SearchBot/PerplexityBot/Claude-SearchBot/Googlebot/Google-Extended; add X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy). **No llms.txt.** | 🔴/🟠 | S | Dev | 6, 12 |
| 12 | **Named author/reviewer bylines** on resources (real person + credentials; `reviewedBy`) | 🟠 | S | Both | 13 |
| 13 | **Keyword/city-qualified title tags + one-H1 audit** across all pages | 🟠 | S | Dev | 8 |
| 14 | **Product spec/COA content** (smoke point, frying temp, shelf life, pack sizes 20L/drum/IBC/tanker) | 🟠/🟢 | M | Both | 7, 8 |
| 15 | **Review engine** — WhatsApp → Google/HelloPeter, 3–5 steady/month | 🟠 | L | Ops | 9, 11 |
| 16 | **Citations** — GBP×2, Bing, Apple, HelloPeter, FB/LinkedIn, Brabys, saYellow/yellowpages, Cylex/Hotfrog/Nichemarket, Foursquare (skip Snupit, skip ROSE) | 🟠/🟢 | L | Ops | 9, 16 |
| 17 | **Measurement** — GA4 custom AI channel; verify both branches in **Bing Webmaster Tools**; GSC; call/form tracking | 🟠 | S | Both | 5, 16 |
| 18 | **Franchise/group reporting page**, **recycling→biodiesel/ESG page**, **grease-trap add-on** | 🟢 | M | Dev | 7, 10 |
| 19 | **Tier-2/3 location pages** (Sandton, Midrand, East Rand, Southern Suburbs, Atlantic Seaboard…) — **data-driven** on GSC demand, 40–60% unique | 🟢 | L | Dev | 9 |
| 20 | **Content cluster cadence** — 1–2 quality pieces/week, defend informational wins, add info-gain assets | 🟢 | L | Both | 14 |
| 21 | **Local authority** — FEDHASA/chamber/RASA/IWMSA/SABA memberships; client approved-supplier links (B-BBEE); digital PR | 🟢 | L | Ops | 9, 16 |
| 22 | **URL-slug evaluation (optional)** — service-led location slugs (`/cape-town-cooking-oil-supplier/`) vs current nested `/western-cape/cape-town/`. Titles already carry keywords; only change if we accept 301s. Evaluate, don't rush | 🟢 | M | Dev | 9 |

---

## Master prioritisation

### 🔴 CRITICAL — must implement before the site goes live on the real domain
*Rationale: these protect indexation, truth/E-E-A-T, and the entity foundation everything else compounds on.*
1. **Canonical domain** → `cuisinefoods.co.za`; kill Vercel indexing; fix all `@id`/canonical/citation URLs. **Also plan 301s from the old GoHighLevel URLs** (preserve `/used-cooking-oil`, `/sunflower-oil`, `/soya-oil`, `/palm-oil`, `/services`, `/frying-guide`, `/uco-report` equity).
2. **Correct ROSE→ISCC/SABA/IWMSA/Waste Act/SAWIS** everywhere UCO compliance is claimed (truth + EEAT; avoid a wrong authority claim going live).
3. **Entity/schema foundation** — `knowsAbout`, rich `sameAs`, `@graph` Org + 2× LocalBusiness, `Service`+`areaServed` on location pages, `dateModified`, `geo`. Create the Wikidata item.
4. **Explicit AI-crawler allow + security headers**; confirm no CDN block; **no llms.txt**.
5. **Title-tag + one-H1 audit** (keyword/city-qualified) and confirm no thin/near-duplicate pages ship.

### 🟠 HIGH-IMPACT — first month after launch
1. **Two GBPs** live + verified categories + Products/Services + NAP consistency across web/GBP/citations.
2. **Answer-first passage restructuring + the 8 high-intent FAQs** (esp. *UCO price per litre* and *how to legally dispose of UCO in SA* — these stack statistics + citations + quotation GEO tactics).
3. **UCO pricing page + value calculator + "who buys near me"** and **UCO compliance/legal hub** (correct framework).
4. **Surface verified trust proof** (progressive-trust) + **named author/reviewer bylines**.
5. **Comparison "which oil" pages** (green-field).
6. **Measurement live** (GA4 AI channel, Bing WMT ×2, GSC, call/form tracking) — so we can prove and steer.
7. **Start the review engine + first citation wave**.

### 🟢 GROWTH — following months (compounding)
1. **Tier-2/3 location pages** as GSC demand justifies (unique content; East Rand/Kempton Park is a B2B food-mfg volume play).
2. **Product spec/COA content**; franchise-reporting, biodiesel/ESG, grease-trap pages.
3. **Content-cluster cadence** (1–2/week) — defend informational wins, add info-gain assets (pricing data, SA compliance guidance, closed-loop cost math).
4. **Local authority** — memberships (FEDHASA, chambers, RASA, IWMSA, SABA), client approved-supplier links (B-BBEE-amplified), digital PR (sustainability/biodiesel/food-safety), Reddit/trade mentions for AI.
5. **Optional URL-slug evaluation**; ongoing schema/freshness upkeep.

---

## 18. 90-Day SEO Roadmap

### Days 0–14 — Launch-critical foundation (🔴)
- Point `cuisinefoods.co.za` to the new site; 301 old URLs; `noindex`/redirect vercel host; verify canonicals.
- Correct all ROSE→ISCC/SABA/IWMSA/Waste-Act/SAWIS content; truth pass on every claim.
- Ship entity/schema foundation (`knowsAbout`, `sameAs`, `@graph`, `Service`+`areaServed`, `dateModified`, `geo`); create Wikidata item.
- Explicit AI-crawler allow + security headers; title/H1 audit.
- Submit sitemap in GSC; verify both branches in Bing WMT; set up GA4 AI channel + call/form tracking.

### Days 15–45 — High-impact build & local (🟠)
- Create/verify **two GBPs** (categories, service areas, Products/Services, first photos); begin WhatsApp review flow.
- Restructure money + resource pages to answer-first passages; add the 8 high-intent FAQs (+FAQPage schema).
- Build **UCO pricing page + value calculator + "who buys near me"** and the **UCO compliance/legal hub**.
- Surface verified trust proof; add author/reviewer bylines.
- Fire the first citation wave (Bing, Apple, HelloPeter, Brabys, saYellow/yellowpages, FB/LinkedIn).

### Days 46–90 — Depth, comparison & authority (🟠→🟢)
- Publish **comparison/"which oil" pages** + product spec/COA content.
- Deepen Tier-1 location pages (Pretoria/Centurion, Johannesburg, Cape Town, Northern Suburbs) with municipal-bylaw content.
- Start the content-cluster cadence (2 pieces/week: 1 UCO-compliance, 1 frying/product); defend the informational rankings we hold.
- Begin memberships (FEDHASA/chamber) + first client approved-supplier links.
- **First review checkpoint (Day 90):** GSC rankings/impressions/indexation, GA4 AI-referral + lead volume, Bing WMT AI citations, GBP insights → decide Tier-2 location pages by data.

---

## 19. 12-Month SEO Growth Strategy

**Q1 (M1–3):** foundation + local + core UCO/compliance content live; measurement running; reviews and citations started. *Target: consolidate top-3 on the commercial terms we already rank for; UCO pages indexed and gaining impressions; first AI-Overview/Perplexity citations for compliance/pricing questions.*

**Q2 (M4–6):** scale content cadence; roll out Tier-2 location pages on GSC demand (Sandton, Midrand, East Rand, Southern Suburbs, Atlantic Seaboard); franchise-reporting + biodiesel/ESG pages; review velocity to ~15–20/branch; client approved-supplier links compounding. *Target: UCO page-1 in Gauteng (Pretoria/Centurion, Johannesburg); climbing in Western Cape; expanding AI-citation share.*

**Q3 (M7–9):** authority phase — IWMSA/SABA/RASA memberships; digital PR (sustainability/biodiesel/food-safety) for entity mentions ChatGPT/Perplexity trust; optimise GSC position-6–20 pages (refresh titles/FAQs/freshness); Wikidata/entity enrichment; consider Tier-3 metros on proven demand. *Target: UCO page-1 in Western Cape metros; top-3 nationally on core supply terms; recognised entity (Knowledge Panel eligibility).*

**Q4 (M10–12):** dominance & moat — comprehensive topical coverage across both clusters; steady review engine; broad citation + backlink profile; measurable AI-search share-of-voice; expand comparison/decision content; evaluate Google Ads scaling on the PPC-ready pages. *Target: the default cited source for SA cooking-oil + UCO questions across Google AI Overviews, ChatGPT, Gemini, Claude, Perplexity, Copilot; top-3 on the majority of priority commercial + local terms in both provinces.*

**What compounds across the year (protect these):** entity signals (Wikidata + sameAs + mentions), approved-supplier links (grow with the client base, B-BBEE-amplified), association-directory authority, compliance/case-study content (rarely stale), and steady review velocity (decays if stopped — systematise into every delivery/collection run).

**Guardrails:** measure on **rankings + qualified leads + AI-citation share**, not impressions (B2B, low-volume, 9–12-month attribution); every new page must clear the helpful-content/information-gain and 40–60%-unique bars (no scaled thin pages); never fabricate trust claims (progressive-trust enforces this); keep click depth ≤3 and the closed-loop internal linking intact.

---

### One-paragraph bottom line
The SA cooking-oil and UCO market is fragmented and technically primitive — no competitor combines certification authority, pricing transparency, per-city pages, full schema, content depth and AI-readiness, and several page-1 rivals are literally uncrawlable (ONE OIL, OilDrop) or missing title tags (Rein, Oil Man KZN). Cuisine Foods already ranks and already has the technical foundation the market lacks. Execute the Critical foundation (real domain, correct compliance authorities, entity/schema, AI-crawler policy), then the High-Impact layer (two GBPs, answer-first content, UCO pricing + compliance authority, trust proof, comparison pages, measurement), then compound with Growth (location depth, content cadence, local authority) — and Cuisine Foods can become the strongest, most-cited cooking-oil and used-cooking-oil website in South Africa across both Google and AI search within 6–18 months.
