import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Pillar } from "@/config/pillars";
import { getFaqs } from "@/config/faqs";
import { faqPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { CrossSell } from "@/components/funnel/cross-sell";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/funnel/cta-band";

/** PillarView — the two head-term hubs (supply / UCO). Routes to their spokes. */
export function PillarView({ pillar }: { pillar: Pillar }) {
  const path = `/${pillar.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: pillar.h1, path }];
  const faqs = getFaqs(pillar.faqIds);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: pillar.h1, description: pillar.metaDescription, path }),
          ...(faqs.length ? [faqPageSchema(faqs)] : []),
        ]}
      />
      <PageHero
        eyebrow={pillar.eyebrow}
        h1={pillar.h1}
        subhead={pillar.subhead}
        imageId={pillar.imageId}
        crumbs={crumbs}
        intent={pillar.intent}
        primaryLabel={pillar.primaryCtaLabel}
      />

      <Section>
        <SectionHeading eyebrow={pillar.eyebrow} title="Why Cuisine Foods" intro={pillar.intro} />
        <div className="mt-10">
          <FeatureGrid points={pillar.keyPoints} />
        </div>
      </Section>

      {/* Spokes */}
      <Section alt>
        <SectionHeading eyebrow="Explore" title="Everything under this service" align="center" />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillar.children.map((c) => (
            <Reveal as="div" key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full items-start gap-4 rounded-[var(--radius)] border border-line bg-surface p-5 transition-all duration-200 hover:border-brand-300 hover:shadow-soft"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="flex items-center gap-1 font-semibold text-ink">
                    {c.label}
                    <ArrowRight className="h-4 w-4 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{c.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <CrossSell label={pillar.crossSell.label} href={pillar.crossSell.href} blurb={pillar.crossSell.blurb} />
      </Section>

      <FaqSection ids={pillar.faqIds} alt />
      <CtaBand intent={pillar.intent} primaryLabel={pillar.primaryCtaLabel} primaryHref={`/request-a-quote?intent=${pillar.intent}`} />
    </>
  );
}
