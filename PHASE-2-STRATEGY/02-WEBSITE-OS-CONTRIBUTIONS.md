# WEBSITE OS CONTRIBUTIONS — patterns this project should give back

Cuisine Foods is the OS's **first B2B industrial / supplier / service-area build**. These are the reusable patterns it surfaces. Per the OS anti-overbuild rule ("harvest, don't invent"), each is **proposed** here and only promoted into the OS *after this build proves it in production* — at the post-launch retro. Each note says where it would live in the OS.

---

## P1 — The Dual-Offer B2B Architecture *(→ PLAYBOOKS / niche: industrial supplier)*
**Pattern:** when a business runs two offers of **opposite polarity to the same buyer** (a cost the buyer minimises vs. a gain/relief the buyer maximises — here: buy oil vs. get paid to remove used oil), do NOT blend them. Fork at the hero, give each its own pillar + service pages + pre-filled CTA, and cross-sell only at the thank-you step.
**Why it generalises:** common in industrial/service B2B (supply + maintenance; install + service contract; product + takeback/recycling). Prevents the "muddled homepage" failure mode.
**OS artifact:** a niche playbook section + a "dual-offer homepage" section-order recipe.

## P2 — Closed-Loop Reciprocal Internal Linking *(→ SYSTEM/03-SEO + ENGINE)*
**Pattern:** when two pillars share a customer, every page in pillar A links to pillar B and vice-versa with descriptive anchors, binding them into one entity graph and creating an automatic cross-sell.
**Why it generalises:** any multi-service business benefits from making the *relationship* between services explicit to both Google and the user.
**OS artifact:** an internal-linking rule + a reusable "cross-sell teaser" component with config-driven target.

## P3 — Province-Pillar → Metro-Child Local System + the Anti-Doorway Content Contract *(→ SYSTEM/03-SEO local + PLAYBOOKS)*
**Pattern:** two-tier local architecture (province pillar → metro child), with a hard **content contract** every location page must satisfy to avoid doorway-page penalties: named local suburbs/nodes, local logistics (routes/lead times), local customer clusters, local FAQ, local proof, distinct H1/title/meta/intro. Build a metro page only where there's genuine service. Phase-2 metros promoted on impression data, not speculation.
**Why it generalises:** every SA service-area/multi-location client needs this; the contract is the guardrail that turns "location pages" from a risk into a moat.
**OS artifact:** a location-page checklist (gate item) + `seo-sitemap` template + a `LocationPage` component with required unique-content slots.

## P4 — WhatsApp-First SA Conversion Stack *(→ SYSTEM/05-CONVERSION)*
**Pattern:** for SA B2B, primary CTA = WhatsApp with **page-specific pre-filled intent messages**; secondary = click-to-call (distress); tertiary = multi-step qualifying form (procurement). Floating WhatsApp + sticky mobile CTA bar (Call+WhatsApp) as standard furniture.
**Why it generalises:** SA-wide behavioural reality (~94% WhatsApp penetration). Already proven partially on prior sites; this codifies the pre-filled-intent refinement.
**OS artifact:** a conversion-stack standard + `FloatingWhatsApp` / `StickyMobileCTA` / `pre-fill helper` components.

## P5 — Regulated-Service Trust Pattern (compliance as the conversion lever) *(→ SYSTEM/05 + PLAYBOOKS)*
**Pattern:** when a service intersects regulation (waste, food-safety, licensing), lead the highest-converting page section with the **compliance artifact the buyer needs** (here: the safe-disposal certificate framed as *their* protection at inspection), backed by licensed/certified status. Compliance out-converts price for the worried buyer.
**Why it generalises:** waste, environmental, health, financial, legal services all have a "certificate/compliance" lever competitors underuse.
**OS artifact:** an objection-mapping recipe + a "compliance/credential block" component.

## P6 — Multi-Step Qualifying Quote Form that Filters Quietly *(→ SYSTEM/05 + ENGINE form system)*
**Pattern:** Step 1 low-friction (intent fork + name + WhatsApp + business name) to maximise starts; Step 2 qualifiers (business type + volume + #sites + area) that surface high-value recurring accounts and deprioritise one-offs — *without* a scary "minimum order" wall. Wired to GHL webhook → thank-you.
**Why it generalises:** every quote-driven B2B lead-gen site wants qualification without killing conversion.
**OS artifact:** a canonical multi-step form recipe + field-strategy standard.

## P7 — SEO-Page-Doubles-as-PPC-Landing Component Discipline *(→ SYSTEM/03 + ENGINE)*
**Pattern:** build every page from shared, config-driven components so a **dedicated Google Ads landing variant** (nav stripped, one message, one CTA) can be composed from existing parts with zero new design. Campaign message-match edits live in `config/`, never in component code.
**Why it generalises:** most clients eventually run ads; designing for PPC-reuse from day one avoids a second build.
**OS artifact:** a "PPC-ready" clause in the build standard + a `LandingShell` layout variant.

## P8 — Pricing-Transparency Page as a Ranking + Conversion Wedge *(→ PLAYBOOKS)*
**Pattern:** in a market where everyone hides numbers ("quote on contact"), a transparent "what it costs / what it's worth" page (framed with ranges or a live-quote CTA) captures the pricing-intent query cluster *and* out-converts opaque competitors — while protecting margin by staying quote-anchored.
**Why it generalises:** applies wherever competitors are uniformly price-opaque (many trades/industrial niches).

---

## P9 — Progressive Config-Driven Trust System *(→ SYSTEM/05-CONVERSION + ENGINE)*
**Pattern:** every trust element (years, branches, certifications, guarantees, fleet, client industries, response time, volumes, compliance) is a component reading a single `config/trust.ts` ledger; a component with **no real data does not render** (never filler). The site ships with verified trust and **lights up as the client confirms more, with zero code changes** — same principle as the image system.
**Why it generalises:** every client has trust facts that arrive late or need verification; this turns that into a feature and structurally enforces the OS no-fabrication rule.
**OS artifact:** a trust-ledger config schema + a set of trust components that self-hide when empty.

## P10 — Image Manifest = Photography Shot List *(→ SYSTEM/08-IMAGES + ENGINE)*
**Pattern:** one `config/images.ts` manifest defines every image slot (SEO filename, alt, aspect ratio, priority, page); it drives the `<Placeholder>` components **and** exports a clean "shot list" the client uses to brief their photographer. One artifact serves code, swap-in, and client brief.
**Why it generalises:** every photography-first client build needs a placeholder system *and* a photo brief — this is both.
**OS artifact:** the manifest schema + a shot-list generator.

## P11 — Municipality-Differentiated Location Pages *(→ SYSTEM/03-SEO local + PLAYBOOKS)*
**Pattern:** for regulated services, each location page embeds **that locale's actual regulations** (e.g. Cape Town vs Johannesburg FOG by-laws genuinely differ), making pages substantively unique by construction — a structural cure for doorway-page risk, not just a content guideline.
**Why it generalises:** any regulated, multi-location service (waste, food, health, licensing, building) has locale-specific rules to make each page real.
**OS artifact:** a location-page content rule + a per-locale regulation data pattern.

## P12 — Closed-Loop Economic Narrative *(→ PLAYBOOKS)*
**Pattern:** a business that both sells a consumable and buys back its waste can frame value as **net cost after buy-back** ("your real cost per litre") — a price argument no single-sided competitor can make; expressible as copy now and a calculator lead-magnet later.
**Why it generalises:** takeback/recycling/circular-economy businesses (packaging, parts, oil, equipment) all have this un-copyable angle.

## Meta-learning for the OS
- **Research-first paid off concretely:** the two load-bearing strategic moves (closed-loop positioning, UCO pricing-transparency wedge) came directly from competitor + SERP research, not the brief. Reinforces OS Gate 1.
- **The niche seed:** this project can become the **"B2B industrial supplier"** entry in PLAYBOOKS (Phase 5) — the first niche playbook grounded in a real client, exactly as the OS intends.
- **Nested-agent caveat (process):** during research, delegating research agents that themselves spawned sub-agents stalled on synthesis; direct single-purpose research agents returned cleaner results. Minor OS process note for future multi-agent research runs.
</content>
