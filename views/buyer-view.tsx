import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { MoneyPage } from "@/config/types";
import { getFaqs } from "@/config/faqs";
import { hrefFor, resolveRelated } from "@/lib/registry";
import { telUrl, whatsappUrl, whatsappPrefill, cta } from "@/config/conversion";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/funnel/cta-band";

/**
 * BuyerView — the industry/segment pages. Dedicated (not the shared MoneyPageView
 * used by products/frying), so the buyer pages can be structurally differentiated:
 * each leads with its own operational reality, routes to the oils that actually
 * fit that kitchen, and shows a multi-site / UCO block only where it genuinely
 * applies. Owns "who is buying" intent — not product or geography intent.
 */
export function BuyerView({ page }: { page: MoneyPage }) {
  const path = hrefFor(page);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Bulk Cooking Oil Supply", path: "/bulk-cooking-oil-supply" },
    { name: page.h1, path },
  ];
  const faqs = getFaqs(page.faqIds);
  const related = resolveRelated(page.relatedSlugs);
  const allRelated = [...related, ...(page.resourceLinks ?? [])];
  const quoteHref = `/request-a-quote?intent=supply${page.quoteTopic ? `&topic=${page.quoteTopic}` : ""}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: page.h1, description: page.metaDescription, path, national: true }),
          ...(faqs.length ? [faqPageSchema(faqs)] : []),
        ]}
      />

      {/* Buyer hero — image + the operational reality, not a generic product hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(50% 60% at 12% 0%, rgb(var(--brand-50)) 0%, transparent 60%)" }} />
        <Container className="grid items-center gap-10 pb-12 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 lg:pt-20">
          <div>
            <Breadcrumbs items={crumbs} />
            <Reveal>
              <p className="eyebrow mb-3">{page.eyebrow}</p>
              <h1 className="text-display text-ink">{page.h1}</h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{page.subhead}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button href={quoteHref} variant="primary" size="lg">{page.primaryCtaLabel}</Button>
                <Button href={whatsappUrl(whatsappPrefill.supply)} variant="whatsapp" size="lg" external>{cta.whatsapp}</Button>
                <a href={telUrl} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink">
                  <Phone className="h-4 w-4 text-brand-600" /> {cta.call}
                </a>
              </div>
            </Reveal>
          </div>
          {page.imageId && (
            <Reveal delay={0.1}>
              <PlaceholderImage id={page.imageId} sizes="(max-width: 1024px) 100vw, 42vw" className="shadow-soft" />
            </Reveal>
          )}
        </Container>
      </section>

      {/* The operational reality — the business problem, in the buyer's words */}
      {page.operational && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <p className="eyebrow mb-3">The reality</p>
              <p className="text-xl font-medium leading-relaxed text-ink">{page.operational}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lg leading-relaxed text-ink-soft">{page.intro}</p>
              <div className="mt-8"><FeatureGrid points={page.keyPoints} /></div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Oil selection routing — which oils fit this kitchen (use-case, no specs) */}
      {page.oilGuidance && page.oilGuidance.length > 0 && (
        <Section alt className="border-t border-line">
          <SectionHeading eyebrow="Which oil?" title="The oils that fit your kitchen" />
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.oilGuidance.map((o) => (
              <Reveal as="div" key={o.href}>
                <Link href={o.href} className="group flex h-full flex-col rounded-[var(--radius)] border border-line bg-surface p-6 transition-all duration-200 hover:border-gold-500/50 hover:shadow-soft">
                  <p className="flex items-center gap-1 font-display text-lg font-bold text-ink">
                    {o.label} <ArrowRight className="h-4 w-4 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.when}</p>
                </Link>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Editorial value sections */}
      {page.sections.length > 0 && (
        <Section>
          <div className="mx-auto max-w-3xl space-y-12">
            {page.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="text-h2 text-ink">{s.heading}</h2>
                {s.body && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{s.body}</p>}
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Multi-site band — only where it genuinely applies */}
      {page.multiSite && (
        <Section alt className="border-t border-line">
          <Reveal className="mx-auto max-w-3xl rounded-[var(--radius)] border border-gold-500/25 bg-gold-100/40 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-ink">{page.multiSite.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">{page.multiSite.body}</p>
            {page.multiSite.href && (
              <Link href={page.multiSite.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2">
                {page.multiSite.linkLabel ?? "Learn more"} <ArrowRight className="h-4 w-4 transition-all" />
              </Link>
            )}
          </Reveal>
        </Section>
      )}

      {/* UCO angle — industry-specific framing (not the same block everywhere) */}
      {page.ucoAngle && (
        <Section>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-3">The closed loop</p>
              <h2 className="text-h2 text-ink">{page.ucoAngle.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{page.ucoAngle.body}</p>
              <Link href="/used-cooking-oil-collection" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2">
                Explore used-oil collection <ArrowRight className="h-4 w-4 transition-all" />
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <PlaceholderImage id="trust-operations" sizes="(max-width: 1024px) 100vw, 46vw" className="shadow-soft" />
            </Reveal>
          </div>
        </Section>
      )}

      <Section alt className="border-t border-line">
        <CrossSell label={page.crossSell.label} href={page.crossSell.href} blurb={page.crossSell.blurb} />
      </Section>

      {allRelated.length > 0 && <RelatedLinks title="Related pages & guides" items={allRelated} />}

      <FaqSection ids={page.faqIds} alt title={`${page.h1} – common questions`} className="border-t border-line" />

      <CtaBand
        intent="supply"
        title={`${page.h1} – get your pricing`}
        body="Tell us your volumes, sites and area, and we'll put together pricing and a supply schedule built around how you actually operate."
        primaryLabel={page.primaryCtaLabel}
        primaryHref={quoteHref}
      />
    </>
  );
}
