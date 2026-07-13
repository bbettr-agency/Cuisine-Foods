# Cuisine Foods

Marketing + lead-generation website for **Cuisine Foods** — bulk cooking oil supply (sunflower, palm olein, soya) and used cooking oil (UCO) collection across **Gauteng & the Western Cape**.

**Built with the BBettr Website OS v2.0** (research-first pipeline). This is the OS's first B2B-industrial flagship build.

## Stack
- Next.js 14 (App Router, static-first) · React 18 · TypeScript (strict)
- Tailwind CSS (design tokens in `app/globals.css`) · Framer Motion (restrained motion) · lucide-react
- Forms → GoHighLevel webhook (`/api/lead` → `GHL_WEBHOOK_URL`)
- Deploy: Vercel, auto-deploy from `main`

## Architecture (config-driven)
Everything content lives in `config/`; components never hardcode copy.
```
app/            routes, layout (metadata + JSON-LD), sitemap.ts, robots.ts, api/lead
views/          page templates (money-page, pillar, location, article)
components/     ui · funnel (header/footer/forms/CTAs) · sections · shared · seo
config/         site · navigation · products · services · buyers · pillars · locations
                resources · faqs · home · trust · images · seo · conversion · types
lib/            metadata · schema (JSON-LD) · motion · registry · utils
```

## Key systems
- **Two-pillar architecture:** Bulk Cooking Oil Supply + Used Cooking Oil Collection, cross-linked (the "closed loop").
- **Progressive trust system** (`config/trust.ts`): trust elements render only when real data exists — no fabrication; lights up as the client confirms facts.
- **Config-driven image system** (`config/images.ts`): branded placeholders until real photography is dropped in; see `PHOTOGRAPHY-SHOT-LIST.md`.
- **Local SEO:** province pillars (Gauteng, Western Cape) → metro pages with municipality-specific compliance content (anti-doorway).
- **Schema:** Organization, LocalBusiness ×2, Service, Product, FAQPage, Breadcrumb, Article.

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint (next/core-web-vitals)
npx tsc --noEmit   # typecheck
```

## Environment
Copy `.env.example` → `.env.local` (dev) and set in Vercel (prod):
- `GHL_WEBHOOK_URL` — GoHighLevel inbound webhook for enquiries
- `NEXT_PUBLIC_SITE_URL` — canonical origin (default `https://cuisinefoods.co.za`)

## Project docs
- `PROJECT_STATUS.md` · `SESSION-HANDOVER.md` — mandatory OS handover docs
- `PHASE-1-RESEARCH/` · `PHASE-2-STRATEGY/` — the research & strategy this build is based on
- `PHOTOGRAPHY-SHOT-LIST.md` — exact shots the client provides to replace placeholders

Built by [Bbettr Agency](https://www.bbettragency.com).
