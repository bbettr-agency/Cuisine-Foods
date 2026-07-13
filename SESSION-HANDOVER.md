# SESSION HANDOVER — Cuisine Foods

**Status:** Phase 3 build complete and verified locally. Ready for GitHub push + Vercel deploy + production verification.

## What was done this session
- Full Phase 1 research (`PHASE-1-RESEARCH/`) and Phase 2 strategy + adversarial final review (`PHASE-2-STRATEGY/`) — approved by client.
- Built the complete Next.js 14 site (BBettr Website OS v2.0): ~35 pages, config-driven, component-driven.
  - Two co-equal pillars (Bulk Supply + UCO Collection), product/buyer/UCO service pages, province + metro location pages, resources (2 clusters, 6 articles), about/contact/quote/thank-you.
  - Progressive trust system, config-driven placeholder image system, WhatsApp-first conversion stack, multi-step qualifying lead form → GHL webhook.
  - Full technical SEO: per-page metadata/canonical, sitemap, robots, JSON-LD (Org/LocalBusiness×2/Service/Product/FAQ/Breadcrumb/Article).
- Verified: build ✅, lint ✅, typecheck ✅, responsive ✅, form + API ✅, schema ✅.

## Next steps
1. **Push** to `bbettr-agency/Cuisine-Foods` (`main`).
2. **Deploy** to Vercel (link repo → project; set `GHL_WEBHOOK_URL`, `NEXT_PUBLIC_SITE_URL`).
3. **Verify production:** load key routes, confirm no build errors, test a live lead into GHL, run Lighthouse on the production URL, submit sitemap to Search Console.
4. Work through the client-input list in `PROJECT_STATUS.md` — enabling trust items and dropping in photography require **no code changes**.

## Do NOT
- Hardcode copy in components (config-driven rule).
- Enable any trust item / stat / testimonial in `config/trust.ts` that isn't verified with the client (no-fabrication rule).
- Ship placeholder-host images in production (there are none — keep it that way).

## Where things live
- Content/config: `config/` · Templates: `views/` · UI/sections: `components/`
- SEO/schema: `lib/metadata.ts`, `lib/schema.ts`, `app/sitemap.ts`, `app/robots.ts`
- Image manifest + shot list: `config/images.ts` + `PHOTOGRAPHY-SHOT-LIST.md`
- OS patterns harvested this build: `PHASE-2-STRATEGY/02-WEBSITE-OS-CONTRIBUTIONS.md`
