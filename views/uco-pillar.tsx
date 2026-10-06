import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Pillar } from "@/config/pillars";
import { getFaqs } from "@/config/faqs";
import { coverage, openProvincesPhrase } from "@/config/coverage";
import { faqPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/funnel/cta-band";
import { UcoHero } from "@/components/uco/uco-hero";
import { OilStates } from "@/components/uco/oil-states";

/**
 * UcoPillarView — the definitive commercial Used Cooking Oil page. Shares the
 * Cuisine V2 language (paper/ink/gold, editorial type) and the UCO OilStates motif
 * with the rest of the cluster, but is the only page that carries the full motif +
 * the commercial-depth Q&A that routes into every spoke. Service-area = national
 * (UCO collection is a confirmed national capability).
 */
export function UcoPillarView({ pillar }: { pillar: Pillar }) {
  const path = `/${pillar.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Used Cooking Oil Collection", path }];
  const faqs = getFaqs(pillar.faqIds);
  const comingSoon = coverage.hubs.filter((h) => h.status === "coming-soon").map((h) => h.name);
  const note = `Operating from regional hubs in ${openProvincesPhrase()}${comingSoon.length ? `, with ${comingSoon.join(" and ")} opening soon` : ""}.`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: pillar.h1, description: pillar.metaDescription, path, national: true }),
          ...(faqs.length ? [faqPageSchema(faqs)] : []),
        ]}
      />

      <UcoHero
        eyebrow={pillar.eyebrow}
        h1={pillar.h1}
        subhead={pillar.subhead}
        crumbs={crumbs}
        intent="uco"
        primaryLabel={pillar.primaryCtaLabel}
        secondary={{ label: "Sell your used oil", href: "/used-cooking-oil-collection/get-paid" }}
        note={note}
      />

      {/* Lead value + the three commercial proof points */}
      <Section>
        <Reveal className="max-w-prose">
          <p className="text-xl leading-relaxed text-ink-soft">{pillar.intro}</p>
        </Reveal>
        <div className="mt-10">
          <FeatureGrid points={pillar.keyPoints} />
        </div>
      </Section>

      {/* The signature UCO motif: oil as a second state of the same gold liquid */}
      <Section alt className="border-t border-line">
        <SectionHeading
          eyebrow="The closed loop"
          title="From your fryer to renewable fuel"
          intro="Used cooking oil is the same gold oil in a second state. We collect it, pay you for it and send it on for recovery — so it leaves your kitchen as a by-product and returns to the economy as clean fuel."
        />
        <div className="mt-12">
          <OilStates />
        </div>
      </Section>

      {/* Commercial depth — plain answers that route into the cluster */}
      {pillar.depth && pillar.depth.length > 0 && (
        <Section>
          <SectionHeading eyebrow="How it works" title="Used-oil collection, answered" />
          <div className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {pillar.depth.map((d) => (
              <Reveal as="div" key={d.q} className="border-t border-line pt-5">
                <h3 className="font-display text-lg font-bold text-ink">{d.q}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{d.a}</p>
                {d.href && (
                  <Link
                    href={d.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
                  >
                    {d.linkLabel ?? "Learn more"} <ArrowRight className="h-4 w-4 transition-all" />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* The cluster — explore every part of the service */}
      <Section alt className="border-t border-line">
        <SectionHeading eyebrow="Explore" title="Everything under used-oil collection" align="center" />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillar.children.map((c) => (
            <Reveal as="div" key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full items-start gap-4 rounded-[var(--radius)] border border-line bg-surface p-5 transition-all duration-200 hover:border-gold-500/50 hover:shadow-soft"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100/70 text-gold-700 ring-1 ring-gold-500/20">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="flex items-center gap-1 font-semibold text-ink">
                    {c.label}
                    <ArrowUpRight className="h-4 w-4 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" />
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

      {pillar.resourceLinks && pillar.resourceLinks.length > 0 && (
        <RelatedLinks title="Guides & resources" items={pillar.resourceLinks} />
      )}

      <FaqSection ids={pillar.faqIds} alt className="border-t border-line" />
      <CtaBand
        intent={pillar.intent}
        title="Ready to arrange a collection?"
        body="Tell us your kitchen, rough weekly volume and area. We'll confirm a buy-back rate and a collection schedule that fits how you work."
        primaryLabel={pillar.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${pillar.intent}`}
      />
    </>
  );
}
