# SITE ARCHITECTURE — Sitemap · Page Hierarchy · Internal Linking · Content Clusters

**Principle:** two co-equal pillars (Bulk Supply + UCO Collection) crossed with two provinces, wrapped in a topical-authority content layer, every page with one named purpose + one primary conversion. Every page must earn its place (OS Gate 2). URLs are lowercase, hyphenated, shallow.

---

## 1. Full sitemap (proposed)

### Tier 0 — core
| URL | Purpose | Primary conversion | Priority |
|---|---|---|---|
| `/` | Home — fork the two journeys, establish trust + closed-loop | Quote / WhatsApp | P0 |
| `/about/` | Trust: 15 yrs, family-owned, branches, compliance, scale | Quote | P0 |
| `/contact/` | NAP (both branches), maps, hours, form | Form / Call / WhatsApp | P0 |
| `/request-a-quote/` | Dedicated multi-step qualifying quote form | Form submit | P0 |
| `/thank-you/` | Confirmation + cross-sell the other pillar | secondary CTA | P0 |

### Tier 1 — PILLAR A: Bulk Cooking Oil Supply
| URL | Purpose | Targets | Priority |
|---|---|---|---|
| `/bulk-cooking-oil-supply/` | Supply pillar hub | bulk cooking oil supplier; cooking oil supplier SA; wholesale cooking oil | P0 |
| `/sunflower-oil/` | Product money page (301 existing) | sunflower oil bulk / 20L / wholesale | P0 |
| `/palm-olein/` | Product money page (301 `/palm-oil`) | palm olein supplier / 20L price | P0 |
| `/soya-oil/` | Product money page (301 existing) — competitive gap | soya oil bulk supplier | P0 |
| `/frying-oil/` | Differentiator: long-life frying performance | frying oil supplier; long-life frying oil | P1 |
| `/cooking-oil-for-restaurants/` | Buyer-segment landing | cooking oil for restaurants | P1 |
| `/cooking-oil-for-hotels/` | Buyer-segment landing | bulk cooking oil for hotels | P2 |
| `/cooking-oil-for-caterers/` | Buyer-segment landing | wholesale cooking oil for caterers | P2 |
| `/cooking-oil-for-food-manufacturers/` | Buyer-segment landing (COA/tanker) | bulk vegetable/soya oil manufacturer | P2 |
| `/cooking-oil-for-franchises/` | Multi-site / HQ procurement | frying oil for franchises | P2 |

### Tier 1 — PILLAR B: Used Cooking Oil Collection ★
| URL | Purpose | Targets | Priority |
|---|---|---|---|
| `/used-cooking-oil-collection/` | UCO pillar hub (301 `/used-cooking-oil`) | used cooking oil collection; UCO collection services | P0 |
| `/used-cooking-oil-collection/get-paid/` | Pricing transparency + "sell your used oil" | who buys / sell used cooking oil; price per litre | P0 |
| `/used-cooking-oil-collection/compliance/` | Safe-disposal certificate + by-laws + licensed | used cooking oil disposal; compliant UCO | P1 |
| `/grease-trap-cleaning/` | Adjacent service, own indexable page | grease trap cleaning [city] | P1 |
| `/uco-compliance-reporting/` | Franchise/group reporting (add real form) | UCO reporting; franchise oil compliance | P2 |
| `/cooking-oil-recycling/` | Biodiesel / ESG / sustainability story | cooking oil recycling South Africa | P1 |

### Tier 2 — LOCATIONS (province pillar → metro children)
| URL | Purpose | Priority |
|---|---|---|
| `/gauteng/` | Gauteng pillar (supply + UCO) | P0 |
| `/gauteng/johannesburg/` | metro | P0 |
| `/gauteng/pretoria/` | metro (Centurion branch) | P0 |
| `/gauteng/east-rand/` | Kempton Park + Boksburg + Benoni cluster | P1 |
| `/gauteng/midrand-centurion/` | corridor cluster | P1 |
| `/western-cape/` | Western Cape pillar (supply + UCO) | P0 |
| `/western-cape/cape-town/` | metro (Montague Gardens branch) | P0 |
| `/western-cape/northern-suburbs/` | Bellville/Durbanville/Brackenfell | P1 |
| `/western-cape/stellenbosch-paarl/` | Cape Winelands F&B | P2 |

*Phase-2 promotions once indexed & pulling impressions: `/gauteng/sandton/`, `/gauteng/soweto/`, `/gauteng/west-rand/`, `/western-cape/southern-suburbs/`, `/western-cape/somerset-west/`, `/western-cape/atlantic-seaboard/`. Do not launch thin doorway pages — build a metro page only where there's genuine service + unique local content.*

### Tier 3 — RESOURCES (content clusters)
`/resources/` hub + articles listed in §4. Plus `/sitemap.xml`, `/robots.txt`, `/404`, optional `/llms.txt`.

**Total launch pages ≈ 34** (5 core + 10 supply + 6 UCO + 9 location + resources hub + ~8 priority articles). Buyer-segment (P2) and Phase-2 metro pages phase in.

---

## 2. Page hierarchy (depth ≤ 3 clicks from home)
```
/ (Home)
├── /bulk-cooking-oil-supply/           [Pillar A]
│   ├── /sunflower-oil/  /palm-olein/  /soya-oil/  /frying-oil/
│   └── /cooking-oil-for-{restaurants,hotels,caterers,food-manufacturers,franchises}/
├── /used-cooking-oil-collection/       [Pillar B ★]
│   ├── /get-paid/  /compliance/
│   ├── /grease-trap-cleaning/  /uco-compliance-reporting/  /cooking-oil-recycling/
├── /gauteng/ ─► /johannesburg/ /pretoria/ /east-rand/ /midrand-centurion/
├── /western-cape/ ─► /cape-town/ /northern-suburbs/ /stellenbosch-paarl/
├── /resources/ ─► [Frying & Oil cluster] + [UCO & Compliance cluster]
└── /about/  /contact/  /request-a-quote/  /thank-you/
```

---

## 3. Internal linking strategy (hub-and-spoke + the closed loop)

**Rule 1 — Pillar/spoke:** each pillar hub links down to all its product/service/buyer spokes; every spoke links back up to its pillar and sideways to 2–3 sibling spokes. Contextual links use descriptive anchors ("bulk **palm olein** supply", not "click here").

**Rule 2 — The closed loop (the signature move):** every **Supply** page carries a contextual block linking to **UCO** ("Already frying at volume? We also **collect your used cooking oil** — and pay you for it"), and every **UCO** page links to **Supply** ("Need fresh oil too? See our **bulk cooking oil supply**"). This is the internal-link engine + the conversion cross-sell.

**Rule 3 — Location interlink:** province pillar ⇄ its metro children; each metro page links to the relevant supply + UCO pillars; supply/UCO pillars link out to `/gauteng/` and `/western-cape/`. Location pages are where topical + local relevance meet.

**Rule 4 — Content → money:** every Resources article links to the money page it supports (e.g. "How to dispose of used cooking oil" → `/used-cooking-oil-collection/`; "Best oil for commercial deep frying" → `/palm-olein/` + `/frying-oil/`). Money pages link to 1–2 supporting articles for depth/E-E-A-T, not the reverse-heavy.

**Rule 5 — Global:** header exposes both pillars + Locations + Resources; footer carries the full location list + key money pages + both branch NAPs (no orphan pages — Gate 3). Breadcrumbs on every non-home page (with Breadcrumb schema).

**Rule 6 — Conversion:** every page's primary + final CTA points to `/request-a-quote/` or WhatsApp with a **page-specific pre-filled intent** ("…quote on bulk palm olein" vs "…arrange used-oil collection in Cape Town").

---

## 4. Content clusters (topical authority)

### Cluster 1 — "Frying & Cooking Oil" (supports the Supply pillar)
Pillar target: *cooking oil supplier / bulk frying oil*. Articles (expand the existing Guide to Frying):
- Best oil for commercial deep frying in SA (sunflower vs palm olein vs soya) → links to product pages
- What is palm olein? (entity page) · Sunflower vs palm oil for frying
- Smoke points of cooking oils (reference)
- How long does frying oil last / when to change fryer oil
- How to cut your frying-oil cost per litre (total-cost angle)
- Fry smarter: the commercial frying best-practice guide (existing, expanded)

### Cluster 2 — "Used Cooking Oil & Compliance" ★ (supports the UCO pillar)
Pillar target: *used cooking oil collection / recycling*. Articles:
- How to dispose of used cooking oil in South Africa (legally)
- Is it legal to reuse cooking oil in a restaurant? (R1316 / Foodstuffs Act / grease-trap regs)
- Used cooking oil price per litre — what to expect in 2026
- How much used cooking oil does a restaurant produce?
- How used cooking oil becomes biodiesel (the recycling journey)
- Grease traps & FOG by-laws: what a health inspector checks
- Why to only use a licensed, certified UCO collector

Each article: 1 clear search intent, FAQ block (FAQPage schema → AI Overviews), author/E-E-A-T signal, internal links up to pillar + across to a money page, single CTA.

---

## 5. Mapping the redesign to existing URLs (preserve rankings — launch gate)
| Existing (ranking) | New | Action |
|---|---|---|
| `/used-cooking-oil` | `/used-cooking-oil-collection/` | 301 |
| `/palm-oil` | `/palm-olein/` | 301 |
| `/sunflower-oil` | `/sunflower-oil/` | keep/301 |
| `/soya-oil` | `/soya-oil/` | keep/301 |
| `/services` | `/bulk-cooking-oil-supply/` + `/used-cooking-oil-collection/` | 301 to supply hub; add links |
| `/frying-guide` | `/resources/commercial-frying-guide/` | 301 |
| `/uco-report` | `/uco-compliance-reporting/` | 301 (+ add form) |
| `/used-cooking-oil-uco/`, `/vegetable-oils/` (404) | nearest live page | 301 (recover orphaned index) |

Full URL map + 301 list is a Gate-4 launch artifact.
</content>
