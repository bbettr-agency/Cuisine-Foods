# Cuisine Foods — SEO · GEO · AI-Search · CRO Strategy Report
### The plan to become South Africa's highest-ranking cooking-oil & used-cooking-oil website (Google + AI search), 2026 → 2029

**Prepared:** July 2026 · **Status:** research & strategy — **awaiting approval before any code changes**
**Scope:** bulk cooking oil supply (Sunflower, Palm Olein, Soya) + used cooking oil (UCO) collection · Gauteng + Western Cape
**Evidence base:** direct teardown of 25+ SA competitor sites; live SA SERP analysis; current Google Search Central / spam-policy docs; the Princeton *GEO: Generative Engine Optimization* study (KDD 2024) and 2025-26 AI-search citation research; a direct audit of the live Cuisine Foods build. Companion action plan: `SEO-GEO-ROADMAP-AND-PRIORITIES.md`.

> **Reading note.** Sections 1–16 are the findings and strategy. Section 17 (ranked changes), 18 (90-day roadmap) and 19 (12-month strategy), plus the **Critical / High-Impact / Growth** prioritisation, are in the companion roadmap file so the "what to do" is separable from the "why".

---

## 1. Executive Summary

**The opportunity is unusually large and the window is open now.** Across 25+ South African competitor sites we tore down, the entire market — both bulk-oil supply and UCO collection — ranks on **age + brand + a keyword-matched title tag**, and almost nothing else. The field is technically primitive:

- **Structured data is virtually absent.** Of every direct competitor, only **Scope Oils** (UCO) runs entity-rich schema (RecyclingCenter/Organization/Article). **No bulk-oil supplier has Product, FAQPage, or (beyond us) LocalBusiness schema.** This is the single biggest uncontested lever for both Google rich results *and* AI-search citation.
- **Nobody has real location pages.** Multi-province operators (SAVENZA, Old Oil Boys, AJ Oils, Scope) claim wide coverage but funnel everyone to one contact page. Only Rein Oil has a lone Cape Town page. **No certified, content-rich, schema-driven player owns Gauteng.**
- **Nobody combines the winning ingredients.** The market splits into single-angle players: *certified-but-Cape-based* (Scope, Coastal, Rein — ISCC), *cash-hook-but-uncertified* (AJ, Bargain, HD), and *Gauteng-native-but-thin* (ONE OIL, Old Oil Boys). **No one owns the intersection of: certification authority + pricing transparency + per-city pages + full schema + content depth + AI-readiness.** That intersection is the winning position, and it is empty.
- **AI-search readiness is near-zero market-wide.** OilDrop is a JavaScript SPA invisible to crawlers; Coastal Oils is missing title tags; none use FAQ/answer-structured content or schema. Whoever ships **server-rendered, schema-rich, answer-first content wins AI Overviews, ChatGPT, Perplexity and Copilot citations** — a channel that competitors are not even contesting.

**Cuisine Foods already starts ahead.** We rank page-1 for several commercial terms today (bulk cooking oil, palm olein supplier, frying oil supplier, "cooking oil supplier for restaurants" #1–2, UCO Cape Town, and — valuably — informational wins like "how to dispose of used cooking oil SA" and "is it legal to reuse cooking oil"). Our new build already has the technical foundation the whole market lacks: fast static Next.js, honest quote-based Product schema (no fake prices/ratings), LocalBusiness ×2, FAQPage, Service, Breadcrumb, Article, and a two-pillar closed-loop architecture.

**So the strategy is not to rebuild — it is to press three advantages hard:**
1. **Technical & schema supremacy + AI-search formatting** the market can't match (entity/Knowledge-Graph work is the highest-leverage: branded web mentions correlate **0.664** with AI-Overview citations vs **0.218** for backlinks).
2. **The dual closed-loop model + genuine two-province depth** (Gauteng + Western Cape city pages) — a defensible position no single competitor cleanly holds.
3. **Own the content nobody has:** UCO compliance authority (Waste Act, SAWIS, municipal FOG by-laws), transparent UCO pricing, and product-decision content — high-intent, low-competition topics that stack the proven GEO tactics (statistics, citations, quotations) at once.

**Realistic outcome:** consolidate top-3 on core commercial terms and reach UCO page-1 in **Gauteng in ~3–6 months** and **Western Cape in ~4–8 months**, while becoming the default *cited source* for cooking-oil and UCO questions across Google AI Overviews, ChatGPT, Gemini, Claude, Perplexity and Copilot over 6–18 months.

**Three corrections this report bakes in (previously wrong assumptions):**
- ⚠️ **ROSE Foundation is for used *motor/lubricating* oil, not cooking oil.** Do not claim ROSE for UCO. Correct SA cooking-oil bodies/framework: **ISCC** (biodiesel feedstock cert), **SABA** (SA Biodiesel Association), **IWMSA**, the **Waste Act 59 of 2008 + SAWIS registration** (generators >20 kg/day register & report quarterly), and **municipal wastewater/FOG by-laws**.
- ⚠️ **"Cooking oil supplier" is not a real Google Business Profile category.** Use **Food products supplier** (primary) + **Wholesaler / Recycling center / Waste management service**.
- ⚠️ **Canonical-domain risk.** The build is live on `cuisine-foods.vercel.app` while the indexed brand domain is `cuisinefoods.co.za`. Before launch: point the real domain, 301/`noindex` the Vercel host, and make every canonical/schema `@id`/citation use `https://cuisinefoods.co.za`.

---

## 2. Competitor Research

Full per-competitor teardowns are in `raw/`. Headlines:

### Bulk / wholesale cooking-oil supply (who ranks + verdict)
| Competitor | Model | Trust | On-page / schema | The gap we exploit |
|---|---|---|---|---|
| **SAVENZA** (Gauteng+NW) | Closest **dual model** (supply+UCO) | Strong numbers: 20 yrs · 10M L supplied · 20k L/mo recycled · 3 testimonials | **Single page**, title "SAVENZA \| SAVENZA", no schema, no WC | Beat on structure, schema, location depth, WC coverage — match their trust numbers |
| **Golden Fry** (JHB+KZN) | Manufacturer + UCO arm | "over a decade", broad product range | **Lorem-ipsum testimonials**, title just "Golden Fry Oil", **no schema**, no WhatsApp/quote form | Trust proof, schema, conversion, WC coverage |
| **Nature's Best / IJ Oils** | Manufacturer, broad catalogue | Very weak (no years/certs/reviews) | **Best title** ("Cooking Oil Supplier South Africa \| Bulk Oil Products"), Yoast Org/Breadcrumb only | Trust, Product/FAQ/Local schema, oil-specific depth |
| **Rein Oil** (Cape) | Supply + UCO, **has a Cape Town page** | ISCC, Halaal, est. 1999 | **Dated 2000s HTML**, broken robots.txt, thin, no schema | Modern tech + content + schema; no Gauteng page |
| **SOILL / B-well** | Canola manufacturer, retail | **Strong**: est.1995, Heart&Stroke+CANSA, B-BBEE, Woolworths | Brand/agriculture focus, thin product pages | Not frying-oil intent; beat on commercial intent + specs |
| **Willowton / Sunfoil** | SA's largest crusher | Huge authority, **best specs** | **Consumer page — no B2B quote/wholesale path** | "Authority without conversion" — we pair specs + quote flow |
| **Supa Oils** | Supplier | — | **JS-only SPA, empty raw HTML** (crawl/AI liability) | Out-structure with server-rendered content |
| Relianz, Africa Sunoil, Brackenfell, Amanah | distributor/mfr | mixed (Africa Sunoil: Halaal+Kosher+HNS) | thin, no oil-specific schema/specs | depth, schema, conversion |
| Makro/BulkMart/Red Star | marketplaces | — | own "buy 20L" transactional terms | **don't fight price terms** — win relationship/B2B/local terms |

### Used cooking oil (two intents)
| Competitor | Base | Certs | Standout | The gap |
|---|---|---|---|---|
| **Scope Oils** ⭐ | Gqeberha | ISCC, DEKRA | **Only competitor with rich schema + a real FAQ + 4.8★ reviews** | Not in Gauteng/WC on-page; no city pages; no pricing |
| **Coastal Oils** | Eastern Cape | ISCC | 9-step process, blog+FAQ | **Missing title tags**, typos, placeholder US phone, EC-only, no schema |
| **AJ Oils** | Cape Town | none (UCO) | **Best cash hook** ("turn used oil into cash"), since 1995 | No services/FAQ page, no certs, no schema, thin |
| **Bargain Oil** | Limpopo/Mpuma | none | **Publishes rate: R5–R7/litre** (rare) | Not our provinces; no schema/FAQ |
| **Old Oil Boys** | Pretoria+CT+more | DFFE + ROSE (motor-oil) | **Widest branch network incl. our metros** | No city pages/schema/FAQ; motor-oil framing |
| **HD Oils** | Cape Town | ROSE (motor-oil) | good local title | **Broken nav**, 2-page duplicate, indexed lorem-ipsum demo posts |
| **OilDrop** | Cape Town | — | — | **JS SPA — invisible to crawlers/AI** (biggest liability) |
| **ONE OIL** | Pretoria | none shown | pure Gauteng buyer | thin, no certs/pricing/schema |
| **Oil Man KZN** | KZN | "awaiting ISO" | **only one with named blue-chips** (Pick n Pay, SPAR) | KZN-only; no schema |
| **Apex** | KZN | none shown | publishes UCO **specs** (FFA<5% etc.), 25,000 L min | export tier, not local-restaurant intent |
| Directories (Gumtree, saYellow, infoisinfo, Cylex, ThinkLocal) | — | — | rank on freshness + city/category structure | **list on them for citations**, then out-rank with real pages |

### How we build something significantly better (the composite competitor gaps)
Every rival is missing **most** of: FAQ/schema, location pages, pricing transparency, spec/COA content, deep compliance content, AI-readable structure, real trust proof, and a proper quote flow. **We build the site that has all of them.** No competitor can copy the full stack quickly, and none holds the certification + pricing + city-pages + schema + depth + AI-readiness intersection.

---

## 3. Keyword Research

Full table in `raw/`. Strategic shape:

- **Don't fight price SERPs.** "20L cooking oil price / buy online" head terms are owned by Makro, PriceCheck, Direct Wholesale, Shoprite. Product pages target these with **quote capture**, not price ranking.
- **Win B2B relationship + local + product-supplier terms** (we already rank p1–4 on several): *bulk cooking oil supplier · cooking oil supplier for restaurants (#1–2) · commercial cooking oil supplier · palm olein supplier · sunflower oil supplier · frying oil supplier · long-life frying oil · cooking oil distributor Gauteng/Pretoria/Cape Town*.
- **UCO is the winnable moat:** *used cooking oil collection Johannesburg/Cape Town/Gauteng/Pretoria · who buys used cooking oil · sell used cooking oil · used cooking oil buyers · cooking oil recycling SA · used cooking oil price per litre SA (open content gap) · waste cooking oil collection · grease trap collection*.
- **Defend the informational wins** we already hold ("how to dispose of used cooking oil SA", "is it legal to reuse cooking oil") — these are AI-Overview feeders that raise domain-wide E-E-A-T.

**Top-25 commercial keywords → page-type map** and **30+ question keywords for FAQ/AI capture** are carried verbatim in `raw/keyword-intent-map.md` and drive §8, §10, §14.

**Semantic entity sets** to embed for topical authority — Supply: palm olein, palm stearin, RBD, soya, canola, smoke point, oxidative stability, FFA, high-oleic, 20L/IBC/tanker, HORECA, HACCP. UCO: yellow/brown grease, FOG, grease trap, transesterification, biodiesel, SAF, feedstock, ISCC, RED II/III, SAWIS, Waste Act, safe-disposal certificate, closed-loop/circular economy.

---

## 4. Search Intent Analysis

Four intents, mapped to page types (evidence: Semrush/Backlinko 2025; B2B nuance from Growth Syndicate 2026):
- **Informational (~70% of all queries):** how-to / legal / "what is" → **Resource articles + FAQ** (feeds AI Overviews). E.g. "how to dispose of used cooking oil SA", "what is palm olein", "sunflower vs palm for frying".
- **Commercial-investigation** ("supplier", "best", "vs", "for restaurants") → **pillar, product, buyer-segment, and comparison pages**. This is our core.
- **Transactional** ("buy 20L", "price", "near me", "get a quote", "sell used cooking oil") → **product money pages (quote-capture), UCO "get paid"/"who buys near me", location pages**.
- **Local** ("[service] Johannesburg/Cape Town/Gauteng") → **province + metro location pages + GBP**.

**B2B reality (design consequence):** low volume, high value; ~84-day average cycles; buying committees; SEO→pipeline attribution takes 9–12 months. **Measure on rankings + qualified leads, not impressions.** Every commercial page needs a WhatsApp-first quote CTA.

---

## 5. AI Search Research (the priority)

How the answer engines actually work in 2026, and why it changes what we build:

- **Scale:** Google AI Mode ~1B MAU, AI Overviews ~2.5B MAU (Google I/O, May 2026). This is now a primary discovery surface, not a fringe.
- **Retrieval, not ranking.** AI Overviews narrow ~200–500 candidate docs → an E-E-A-T authority gate → **passage-level** re-ranking → a fused answer with inline citations. **Only 38% of AIO citations rank in the classic top-10** (down from ~76%). *A page at position 8 with a clean, self-contained answer can be cited ahead of #1.* Formatting and passages now matter as much as ranking.
- **Query fan-out.** Google splits a query into sub-queries; pages appearing across those sub-SERPs get cited. **You must cover a topic from multiple angles, not optimise one keyword.**
- **What wins citations:** answer-first (≈44% of LLM citations come from the first 30% of the page); **self-contained ~150-word passages**; question-shaped H2/H3; ~18-word sentences; **tables for comparisons** (commercial queries cite listicles/tables at 40%+); **high entity density** (~15+ Knowledge-Graph entities per 1,000 words); **freshness** (content <3 months old is 3× more likely to be cited).
- **Platform mechanics (where to be present beyond your own site):**
  - **ChatGPT (search)** → **Bing index** via OAI-SearchBot; leans heavily on **Wikipedia (~48%)**.
  - **Perplexity** → own crawler + Bing hybrid; **most citations per answer (~22)**; very freshness-sensitive; leans on **Reddit (~47%)**.
  - **Gemini** → Google index (same as Google SEO/entity work).
  - **Claude** → training + web search; rewards precise, verifiable, structured content.
  - **Copilot** → Bing index; **Bing Webmaster Tools now shows which pages Copilot cited** (first-party AI-citation data).
- **Entity signals now outweigh links for AI:** branded web mentions correlate **0.664** with AIO citations vs **0.218** for backlinks; **Wikidata-verified brands are 3.2× more Knowledge-Panel-eligible and 2.7× more likely to appear in AIO citations.**

**Implication:** the highest-leverage AI work is (a) **entity/Knowledge-Graph** (Wikidata + rich `sameAs` + `knowsAbout` + two Google Business Profiles + consistent NAP), (b) **passage/format engineering** on money pages, and (c) **being cited on third-party surfaces** (SA directories, a genuine Reddit answer or two, trade listings) that ChatGPT/Perplexity trust.

---

## 6. GEO Recommendations (Generative Engine Optimization)

From the Princeton *GEO* study (KDD 2024, ~10k queries) + 2025-26 practitioner data — the tactics with measured lift, applied to Cuisine Foods:

| GEO tactic | Measured lift | How we apply it |
|---|---|---|
| **Add statistics** | **+41% visibility** | Put real numbers in copy: SA UCO market ~US$295M (2025)→~$550M (2035); SAWIS 20 kg/day threshold; 90-day reporting; frying 160–190°C; "we pay R__/litre"; "restaurant uses ~X L/month". |
| **Cite authoritative sources** | **up to +115%** (lower-ranked pages) | Link the **Waste Act / NEM:WA**, **SAWIS**, **ISCC**, City of Joburg/Tshwane/Cape Town FOG by-laws, DFFE in resource + compliance content. |
| **Add quotations** | **+28%** | One credible quote per pillar (ops lead / industry body / a named client once approved). |
| **Fluency + authoritative voice** | top-tier | Clear, confident, well-structured prose; define terms ("Palm olein is…"). |
| Keyword stuffing | **no lift / can hurt** | Avoid. |

**The CITABLE page shape** to roll out on money + resource pages: *2–3 sentence answer-first opening → question-shaped H2s → self-contained ~150-word sections → a comparison table → verifiable, sourced claims → FAQPage + Article schema → real `dateModified`.*

**Technical GEO decisions (evidence-backed):**
- **llms.txt = NO.** Ahrefs (137k sites): 97% of llms.txt files got zero traffic; Google (Gary Illyes/Mueller, 2026) explicitly says you don't need AI text files. Skip it.
- **AI crawlers = ALLOW (make it explicit).** Add explicit allow for `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`, `Claude-User`, `Googlebot`, `Google-Extended`; verify no CDN silently blocks them. (Blocking `OAI-SearchBot` is a top AI-visibility error.) Optionally block *training-only* bots (GPTBot/ClaudeBot/Google-Extended) only if the client objects to model training — a philosophical, not visibility, choice; **recommendation: allow all** (we want citations).
- **Schema for AI:** enrich `Organization` with `knowsAbout` + rich `sameAs`; add `dateModified`; consider `reviewedBy` on compliance articles (only ~4% of articles use it, yet they appear in AIO citations ~3.7× more).

---

## 7. Website Structure Review (challenging our own build)

Our built architecture (two pillars, product pages, buyer pages, province+metro location pages, resources cluster, FAQ blocks) is **strategically sound and already ahead of the market**. But the competitor + intent research says we are **missing several high-value page types** and carrying a few risks. Honest verdict:

**Keep (validated by research):** two-pillar closed-loop model; province→metro location hierarchy (competitors prove city pages rank; ours already have unique municipal content = the anti-doorway moat); product money pages; resources clusters; FAQ blocks; WhatsApp-first conversion.

**Add (missing page types competitors/intent demand):**
1. **UCO pricing / "what we pay per litre" page** — only Bargain Oil publishes a rate, and not in our metros. Highest-intent UCO query, open gap, AIO-capturable. **(Critical.)**
2. **"Who buys used cooking oil near me" / sell-your-oil conversion page** — maps to high-volume seller intent + a **UCO value calculator** (litres/week → monthly earnings) — a lead magnet **no competitor has**.
3. **UCO compliance & legal hub** — Waste Act, SAWIS registration, municipal FOG by-laws, safe-disposal certificate explainer. Deepest-in-market = wins Intent B + AI citations. **(High impact.)**
4. **Certifications / credentials page** — ISCC (+ HACCP/B-BBEE once confirmed) with cert images/numbers. Trust + entity signal.
5. **Comparison / "which oil" decision pages** (Sunflower vs Palm Olein vs Soya; best oil for deep frying) — **green-field: nobody has these**; strong commercial-investigation + AIO/table capture.
6. **Industry/buyer landing pages** — we have buyer pages; ensure dedicated, indexable pages for restaurants, QSR/franchises, caterers, food manufacturers, hotels, bakeries, institutional (competitors only list these as words).
7. **Spec/COA content per product** — refined grade, smoke point, frying-temp, shelf life, pack sizes (20L/drum/IBC/tanker). Only Willowton has specs and it has no quote flow.
8. **Recycling → biodiesel / ESG page** (closed-loop + carbon story) for corporate/franchise buyers.
9. **Grease-trap / FOG add-on page** — adjacent demand; cross-sell with UCO.
10. **Blog/resources depth + cadence** — sustained 1–2 pieces/week beats bursts for topical authority (6–12 months to consolidate).

**Risks to fix:** canonical-domain (vercel vs .co.za); ensure no thin/near-duplicate location or buyer pages (40–60% unique content rule; build-vs-wait on Tier-2/3 metros using GSC demand); article author is Organization-only (EEAT gap, §13).

---

## 8. SEO Improvements (Google organic)

Grounded in current Google guidance:
- **Helpful content is now core (since Mar 2024)** — no separate signal; "people-first", first-hand experience, original information. Our advantage: real photography, a real operation, honest quote-based data. **Avoid scaled/near-duplicate pages** (scaled-content-abuse policy is method-agnostic).
- **Information gain** (Google patent, granted 2024): reward pages adding **novel** info beyond what's already indexed — *not* "more words". Our **pricing transparency, SA-specific compliance guidance, and closed-loop cost math** are genuine information-gain assets no competitor offers.
- **Title tags & H1s:** ship keyword-matched, city-qualified titles (the market's biggest easy miss — cf. "SAVENZA | SAVENZA"). One H1 per page (Golden Fry's UCO page has 7 H1s — don't repeat that error).
- **Crawlability/indexation (small-site reality):** we don't need crawl-budget management, but we must avoid orphan/thin pages, keep internal links crawlable `<a href>`, link every important page from ≥1 place, canonical to the real domain, keep `sitemap.ts`/`robots.ts` correct, and monitor GSC "Crawled/Discovered — not indexed" as location pages scale.
- **Product SEO:** keep quote-based `Product`/`Offer` (no fabricated price/rating); add specs; interlink products ↔ buyers ↔ locations.

---

## 9. Local SEO Strategy

**Winnability (live SERPs):** B2B "restaurant" modifiers = our sweet spot (already #2–4). **Pretoria/Centurion is the softest field** (mostly national/directory noise) — our Centurion branch should own it. Directories rank p1 in SA → citations carry weight → list on them *and* out-rank them.

**Location hierarchy (two hubs → two clusters), build-vs-wait:**
- **Tier 1 now (deep, unique):** Pretoria/Centurion, Johannesburg, Cape Town, Northern Suburbs (Bellville/Durbanville).
- **Tier 2 as GSC demand appears:** Sandton, Midrand, **East Rand/Kempton Park (industrial food-mfg cluster — B2B volume)**, Southern Suburbs, Atlantic Seaboard.
- **Tier 3 on proven demand:** Roodepoort, Somerset West, Stellenbosch/Paarl.
- **Anti-doorway moat:** per-metro **municipal UCO/FOG by-laws + SAWIS** content — impossible to templatise. ≥500 unique words, 30–40% varying, 3+ local FAQs, servicing branch, map, own schema per page.

**Google Business Profile:** **two profiles** (Centurion 012, Montague Gardens 021), service-area/address-hidden, **verified-real categories**: primary **Food products supplier** + secondaries **Wholesaler / Recycling center / Waste management service** (⚠ "Cooking oil supplier" isn't a real category). Populate Products (Sunflower/Palm Olein/Soya) + Services (bulk delivery, UCO collection). **WhatsApp review engine: 3–5 steady reviews/month** (velocity > total); claim **HelloPeter**.

**Citations (quality > volume, ~15–20):** GBP ×2 · Bing Places · Apple Business Connect · HelloPeter · Facebook + LinkedIn · Brabys · yellowpages.co.za + saYellow · Cylex/Hotfrog/Nichemarket · Foursquare. **Skip Snupit** (consumer lead marketplace, poor B2B fit). **Skip ROSE for UCO.** NAP: one canonical **local 0-format** (`012…`/`021…`) displayed everywhere, `+27` reserved for schema; each branch keeps its own NAP.

**Local schema:** Organization + **two LocalBusiness nodes (only on /contact, real addresses)**; province/metro pages use **`Service` + `areaServed`** (AdministrativeArea/City) with `provider` → branch `@id`. **Never fabricate a per-city LocalBusiness address.**

**Local authority (compounds 6–12 mo):** FEDHASA (has a Suppliers/Service-Providers segment), Cape Chamber, JCCI, RASA memberships; **client approved-supplier links amplified by B-BBEE Enterprise & Supplier Development** (clients earn procurement points buying from a compliant supplier → they list us); IWMSA + SABA (UCO side); digital PR on sustainability/biodiesel/food-safety.

---

## 10. UCO Strategy

UCO is a **co-equal SEO pillar** (not overpowering supply — supply keeps its own pillar, products, buyer pages, and cluster). It is our clearest path to fast page-1 wins because the field is fragmented and thin.

**Position to own (the empty intersection):** *certification authority (ISCC) + pricing transparency + per-city pages + full schema + content depth + AI-readiness*, told through the **closed-loop spine** ("we deliver your fresh oil, we collect your used oil, we keep you compliant, we pay you").

**Two intents, both served:**
- **"Sell / cash for oil"** → lead with the money: *we pay per litre* (a range + "ask for today's rate" — statistics tactic), free sealed drums, WhatsApp booking, the **value calculator**, a transparent **pricing page**. (AJ owns the hook, Bargain owns the rate — we own both, in our metros.)
- **"Compliant collection / recycling"** → lead with compliance: **safe-disposal certificate**, ISCC, Waste Act/SAWIS, monthly store-level **franchise reporting** (a B2B wedge no competitor addresses on-page), biodiesel/ESG story.

**UCO page set to add:** pricing/"what we pay" + calculator · "who buys UCO near me" · compliance & legal hub · certifications · recycling→biodiesel/ESG · franchise/group reporting · grease-trap add-on · UCO FAQ (FAQPage schema) · per-metro UCO collection pages. **Correct authorities/framework only:** ISCC, SABA, IWMSA, Waste Act 59/2008, SAWIS, municipal FOG by-laws — **not ROSE**.

---

## 11. Conversion Optimisation Review

The build's conversion stack (two-path hero fork, WhatsApp-first, sticky mobile Call/WhatsApp, multi-step qualifying quote form, objection-mapped sections, black/gold/cream premium theme) is **strong and ahead of competitors** (most rivals are phone/email-only; several have broken CTAs). Research-driven refinements:

- **Add transparent pricing signals where it converts** — a UCO "what we pay" range and a supply "request today's price" framing. Transparency out-converts the whole opaque field (only Bargain publishes a rate).
- **Trust proof is the biggest conversion gap** — we currently surface little. Add (as confirmed): years, ISCC/HACCP/B-BBEE, volumes handled, named client *types*/logos, real testimonials, safe-disposal-certificate promise. SAVENZA wins on numbers alone — match them. (Ties to the progressive-trust system already built.)
- **Reviews:** stand up the WhatsApp → Google/HelloPeter review flow (velocity matters for both conversion and local rank).
- **Calculators/tools** (UCO value; cost-per-litre after buy-back) — interactive lead magnets no competitor has.
- **Google Ads landing readiness:** product, buyer-segment, UCO get-paid and location pages already have single-intent/single-CTA anatomy; keep the componentised `LandingShell` path so paid variants are config, not rebuild.
- **Section order / mobile:** validated; keep. Ensure every new page (pricing, compliance, calculators) carries the WhatsApp-first CTA and sticky mobile bar.

---

## 12. Technical SEO Review

Live-site audit vs best practice:
- ✅ Fast static Next.js; HSTS; clean sitemap/robots; honest schema stack; one H1/page; canonical present.
- ⚠️ **Canonical domain** — move to `cuisinefoods.co.za`; 301/`noindex` the vercel host (Local-SEO-critical).
- ⚠️ **Security/best-practice headers missing** (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) — add a `headers()` block (Lighthouse Best-Practices + security).
- ⚠️ **AI-crawler policy** — make allowance explicit (§6); confirm no CDN block.
- ⚠️ **`Article.dateModified` == datePublished** — wire a real modified date (freshness = AI citations).
- ⚠️ **No llms.txt** — correct; keep it that way.
- **Scaling watch-items:** as location/buyer/product pages grow, monitor GSC index coverage, keep every page internally linked (no orphans), enforce the 40–60% unique-content rule, and keep anchors descriptive `<a href>`. Small-site crawl budget is a non-issue; **content quality/uniqueness is the real indexation lever.**
- **Schema upgrades:** `Organization.knowsAbout` + richer `sameAs`; `LocalBusiness` `geo`/`priceRange`/`image`; consider `RecyclingCenter`/`Service category:"Waste Management"` on UCO (match Scope Oils); `reviewedBy` on compliance content; keep Product offers quote-based.

---

## 13. EEAT Review

Google: **Trust is the most important E-E-A-T component**; Experience/Expertise/Authoritativeness feed Trust. Current gaps and fixes:
- **Author/entity:** articles are authored by "Organization" only. Add **named author/reviewer bylines** with real credentials; `reviewedBy` a named person (compliance content especially) — ~3.7× AIO-citation correlation.
- **About depth:** raters check the About page first — ensure real people, real story, real addresses, no stock-only team (we have real photography — use it).
- **First-hand experience:** original photography (done), original data (pricing, cost-per-litre math, "how collection actually works" from our operation), case studies — all Experience signals competitors lack.
- **Trust artifacts:** certifications (ISCC etc.), safe-disposal certificate, policies (POPIA on forms — done), consistent NAP across web/GBP/citations.
- **Off-site authority:** founder/company bylines on SA trade/industry publications (2–3/quarter) build author authority more than same-site bylines.
- **No fabrication** (OS rule + Trust): only verified claims in copy; progressive-trust system already enforces this.

---

## 14. Content Cluster Strategy

Two authority clusters (pillar + spokes, **bidirectional** internal links — required for Google to read a cluster), each engineered for topical authority **and** AI citation:

**Cluster A — Cooking Oil & Frying (supports Supply pillar):** what is palm olein · sunflower vs palm vs soya for frying · best oil for commercial deep frying (SA) · smoke points (table = snippet bait) · when to change fryer oil / fry-life · cost-per-litre after UCO buy-back · long-life frying oil. Each: definition-first, table where relevant, links down to the product money page.

**Cluster B — Used Cooking Oil & Compliance ★ (supports UCO pillar):** how to dispose of UCO legally in SA (defend our p1) · is it legal to reuse cooking oil (defend #1) · **how much is UCO worth per litre in SA (open gap)** · who buys UCO near me · how UCO becomes biodiesel · grease traps & FOG by-laws · SAWIS registration guide · why use a licensed collector. Each: answer-first ~150-word passages, statistics + cited authorities (+41%/+115% GEO), FAQPage schema.

**Cadence:** 1–2 pieces/week, sustained (topical authority consolidates in 6–12 months; freshness <3 months = 3× AI citations). Quality/information-gain over volume (scaled-content policy).

---

## 15. Internal Linking Strategy

Evidence-based rules (Google + reasonable-surfer):
- **Every important page linked from ≥1 place**; no orphans; crawlable `<a href>`; **descriptive anchors** (Google explicitly discourages "click here"/"read more").
- **Hub-and-spoke, bidirectional** pillar↔cluster (one-way kills the cluster benefit).
- **The closed-loop reciprocal links** (supply↔UCO) — our signature move — doubles as cross-sell and entity-graph binding.
- **Location interlink:** province⇄metro; metro→relevant supply+UCO pillars; pillars→both provinces (fuses topical + local relevance).
- **Content→money:** every resource article links to the money page it supports (descriptive anchor); money pages cite 1–2 supporting articles (info-gain/E-E-A-T).
- **Click depth ≤3 from home** for important pages (Mueller: depth matters more than URL structure); **contextual in-body links > footer/menu** (reasonable-surfer). Keep total links sane (~100–150/page max).

---

## 16. Authority Building Strategy

Because **entity signals now outweigh backlinks for AI** and feed Google's Knowledge Graph, authority work is split:

**Entity / Knowledge Graph (highest leverage):**
- Create a **Wikidata item** for Cuisine Foods (SA cooking-oil supplier & UCO collector) — strongest ChatGPT/Gemini entity signal.
- Enrich `Organization.sameAs`: both **Google Business Profiles**, LinkedIn, Facebook, HelloPeter, Brabys/saYellow, Wikidata.
- Add `knowsAbout` (bulk cooking oil, sunflower/palm olein/soya, UCO collection, UCO recycling, grease-trap, food-service oil compliance).
- **Consistent NAP** everywhere (web = GBP = citations).

**Off-site mentions & links (for AI + Google):**
- SA business directories (also citations); a **genuine Reddit answer or two** (Perplexity leans on Reddit); trade/industry listings.
- **Client approved-supplier links** (B-BBEE-amplified, compounding).
- Association memberships (FEDHASA, chambers, IWMSA, SABA) — permanent authority links.
- Digital PR (Featured/Qwoted/Source of Sources + SA trade press) on sustainability/biodiesel/food-safety.
- Wikipedia/Wikidata presence raises citation odds across ChatGPT (leans Wikipedia ~48%).

**Measurement:** GA4 custom AI channel (regex on chatgpt/perplexity/claude/gemini/copilot sources; note ~35–70% of AI referrals hide in Direct); **verify both branches in Bing Webmaster Tools** for its AI-citation dashboard; optional Otterly/Peec/Profound for citation share-of-voice; GSC for rankings/indexation; call/form tracking for leads.

---

*Continue to `SEO-GEO-ROADMAP-AND-PRIORITIES.md` for §17 Recommended Website Changes (ranked by impact), §18 the 90-Day Roadmap, §19 the 12-Month Growth Strategy, and the full Critical / High-Impact / Growth prioritisation.*
