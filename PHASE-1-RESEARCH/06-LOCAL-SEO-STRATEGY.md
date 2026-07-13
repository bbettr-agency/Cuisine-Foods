# LOCAL SEO STRATEGY — Gauteng + Western Cape

**Context:** B2B service-area business (delivers + collects) with two real branches. `[SERP-observed]` = confirmed by live searches · `[best-practice]`.

## 0. Is local winnable? Yes — highly.
SERPs for "cooking oil supplier Gauteng", "bulk cooking oil supplier Cape Town", "used cooking oil collection Johannesburg/Cape Town" are **organic websites + directories**, not a saturated branded map pack (this isn't a foot-traffic vertical). Competitor location pages are **thin** (Rein Oil's `/johannesburg.php` = contact + a history line). SA directories (saYellow, tradeindia, Gumtree) rank → citations carry value. Cuisine already has baseline domain traction. **Main risk is self-inflicted thin doorway pages.** `[SERP-observed]`

## 1. Google Business Profile
- **Setup:** Service-Area Business — real verified address on file, **address hidden**, define service areas. `[best-practice]`
- **Two profiles** (one per province, each at a real staffed premises):
  - *Cuisine Foods — Gauteng* (Centurion): service areas Johannesburg, Sandton, Midrand, Centurion, Pretoria, Kempton Park, Boksburg, Roodepoort, Soweto.
  - *Cuisine Foods — Western Cape* (Montague Gardens): Cape Town, Bellville/Durbanville, Southern Suburbs, Stellenbosch, Paarl, Somerset West.
  - **Do not fake a second address** (suspension risk). If only one is genuinely staffed, run one profile.
- **Categories:** primary = **Wholesale grocer / Wholesale food store** (supply is higher-value + less crowded than "recycling"); secondaries = Wholesaler, Recycling center / Recycling drop-off, Waste management service, and "Cooking oil supplier" **if it appears in the ZA dashboard** (verify live — some cited category names are unconfirmed). `[best-practice]`
- **Products/Services:** load Sunflower/Palm Olein/Soya (sizes, delivery cadence, "request a quote") + UCO Collection / Scheduled Fryer-Oil Collection / Grease removal; mirror the exact names used on the website location pages.
- **Reviews (B2B — velocity matters):** driver asks the decision-maker after a smooth delivery/first collection; WhatsApp review link; onboarding → 2-week check-in → review request; ask reviewers to mention their area; also target **HelloPeter**; respond to 100%.
- **Posts/Photos:** weekly area-rotating posts ("now delivering across the East Rand"); real fleet/drums/collection/depot/staff photos, geotagged.

## 2. Location-page architecture (province pillar → metro child)
**Anti-doorway rule (critical):** each page needs genuinely unique local content — named suburbs/industrial nodes served, local delivery/collection logistics (routes, days, lead times), local customer clusters (Sandton corporate caterers; Soweto shisanyama/takeaways; Stellenbosch wine-estate restaurants), a local mini-FAQ, local UCO rate note, an area testimonial if available, distinct H1/title/meta/intro. **No find-and-replace clones.** `[best-practice]`

**Build now:** `/gauteng/` + Johannesburg, Pretoria, East Rand, Midrand-Centurion · `/western-cape/` + Cape Town, Northern Suburbs, Stellenbosch-Paarl. (Full URLs in `09-…`.)
**Phase 2 (once indexed + pulling impressions):** Sandton, Soweto, West Rand / Southern Suburbs, Somerset West, Atlantic Seaboard.
Each **province pillar** covers both supply + UCO, links to its metro children, carries province `areaServed` schema, and is the strongest local internal-link hub.

## 3. NAP & citations
- Lock one canonical NAP per province; use **+27 international phone format** consistently everywhere (site footer = GBP = citations, byte-for-byte). Currently the site shows no physical address — establish real depot addresses to anchor this.
- **Tier 1:** GBP, Bing Places, Apple Business Connect, Facebook, LinkedIn, HelloPeter.
- **Tier 2 (SA directories that rank here):** saYellow (list under "Oils – Waste & Collectors in Gauteng/East Rand" — the exact category that ranks), Brabys, Cylex SA, Snupit, Nichemarket, Hotfrog SA, Yellow.Place SA.
- **Tier 3 (industry):** ROSE Foundation collectors listing (high-trust UCO citation), restaurant/hospitality supplier directories.

## 4. Local schema
- Site-wide **Organization**; **per-province LocalBusiness** node (two real premises = two legitimate nodes) with canonical +27 phone, real depot address, **`areaServed`** = that province's metros/suburbs, geo, openingHours, sameAs (FB/LinkedIn/GBP).
- **Metro child pages:** `Service` schema (`serviceType`, `areaServed: {City}`, `provider: {Organization}`) — **`areaServed`, never a fabricated per-city address.** Avoid one national LocalBusiness and avoid fake per-city nodes. (Generate/validate with the `claude-seo:seo-schema` skill once URLs are final.)

## 5. Local keyword patterns
Supply: `bulk cooking oil supplier {metro}`, `cooking oil supplier {province}`, `{product} supplier {metro}`, `cooking oil for restaurants {metro}`, `cooking oil delivery {metro}`.
UCO: `used cooking oil collection {metro}`, `UCO collection {metro}`, `sell used cooking oil {metro}`, `used cooking oil buyers {metro}`, `fryer oil collection restaurant {metro}`. Modifiers: near me, free collection, for restaurants/hotels, wholesale.

## 6. Local link/trust signals (SA B2B)
ROSE Foundation registration + collectors listing (UCO credibility); restaurant/hospitality associations & buying groups; ask key clients to list Cuisine as an approved supplier (partnership links); local chambers of commerce; biodiesel/renewable-fuel partner cross-links; local PR (SA loves used-oil "eco" stories — pitchable links).

## 7. Priority actions
1. Establish real depot addresses (GT+WC); canonical +27 NAP; add to footer.
2. Create/verify 2 GBP profiles (address hidden, service areas, categories, products, photos).
3. Build 2 province pillars + 6 metro pages with unique local content.
4. Add Organization + per-province LocalBusiness/Service schema with `areaServed`.
5. Fire Tier-1 + top SA directory citations; enforce identical NAP.
6. Stand up a WhatsApp review-request flow (Google + HelloPeter).
7. Register with ROSE Foundation; get listed.

Sources: reinoil.co.za/johannesburg.php · sayellow.com (Oils–Waste, Gauteng) · rosefoundation.org.za/collectors-and-processors · symaxx.com (SA directories/NAP) · nichemarket.co.za (SA directories) · mapranks.com (SAB Maps) · growthpulsemedia.co.za · daltonluka.com (GBP categories) · oneoil.co.za · oilsavers.co.za (Centurion).
</content>
