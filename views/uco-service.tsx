import type { MoneyPage } from "@/config/types";
import { getFaqs } from "@/config/faqs";
import { serviceAreaNames, openProvincesPhrase } from "@/config/coverage";
import { hrefFor, resolveRelated } from "@/lib/registry";
import { faqPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { ContentSections } from "@/components/sections/content-sections";
import { CrossSell } from "@/components/funnel/cross-sell";
import { UcoCalculator } from "@/components/funnel/uco-calculator";
import { TrustBand } from "@/components/sections/trust-band";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/funnel/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { UcoHero } from "@/components/uco/uco-hero";
import { OilStates } from "@/components/uco/oil-states";

/**
 * UcoServiceView — the five Used Cooking Oil spoke pages. Shares the cluster DNA
 * (UcoHero, paper/ink/gold, editorial sections) and differentiates by intent:
 * the get-paid page carries the value estimator; recycling carries the full
 * OilStates motif (its core story); the rest stay lean so no two read as clones.
 * Schema service-area follows real capability (national vs hub-scoped).
 */
export function UcoServiceView({ page }: { page: MoneyPage }) {
  const path = hrefFor(page);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Used Cooking Oil Collection", path: "/used-cooking-oil-collection" },
    { name: page.h1, path },
  ];
  const faqs = getFaqs(page.faqIds);
  const related = resolveRelated(page.relatedSlugs);
  const allRelated = [...related, ...(page.resourceLinks ?? [])];

  const areaNames = page.serviceAreaKey ? serviceAreaNames(page.serviceAreaKey) : [];
  const note = page.national
    ? "Collecting from commercial kitchens across South Africa, supported by regional hubs."
    : areaNames.length
      ? `Available from our ${areaNames.length > 1 ? areaNames.slice(0, -1).join(", ") + " and " + areaNames.slice(-1) : areaNames[0]} operations.`
      : undefined;

  const schema: object[] = [breadcrumbSchema(crumbs)];
  if (faqs.length) schema.push(faqPageSchema(faqs));
  schema.push(
    page.national
      ? serviceSchema({ name: page.h1, description: page.metaDescription, path, national: true })
      : serviceSchema({ name: page.h1, description: page.metaDescription, path, areaServed: areaNames.length ? areaNames : undefined }),
  );

  const isRecycling = page.slug === "cooking-oil-recycling";
  const isGetPaid = !!page.calculator;
  const closing = closingFor(page);

  return (
    <>
      <JsonLd data={schema} />

      <UcoHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        subhead={page.subhead}
        crumbs={crumbs}
        intent="uco"
        primaryLabel={page.primaryCtaLabel}
        secondary={isGetPaid ? { label: "Arrange a collection", href: "/used-cooking-oil-collection" } : undefined}
        note={note}
      />

      <Section>
        <Reveal className="max-w-prose">
          <p className="text-xl leading-relaxed text-ink-soft">{page.intro}</p>
        </Reveal>
        <div className="mt-10">
          <FeatureGrid points={page.keyPoints} />
        </div>
      </Section>

      {/* Get-paid: the value estimator (honest — no fabricated rate) */}
      {isGetPaid && (
        <Section alt className="border-t border-line">
          <div className="mx-auto max-w-2xl">
            <UcoCalculator />
          </div>
        </Section>
      )}

      {/* Recycling: the full oil-states motif is the core story here */}
      {isRecycling && (
        <Section alt className="border-t border-line">
          <SectionHeading
            eyebrow="The journey"
            title="The same gold, a second state"
            intro="From the fryer to recovery — your used oil doesn't end at the drain."
          />
          <div className="mt-12">
            <OilStates />
          </div>
        </Section>
      )}

      <TrustBand intent={page.intent} ctaLabel={page.primaryCtaLabel} />

      <ContentSections sections={page.sections} />

      <Section>
        <CrossSell label={page.crossSell.label} href={page.crossSell.href} blurb={page.crossSell.blurb} />
      </Section>

      {allRelated.length > 0 && <RelatedLinks title="Related pages & guides" items={allRelated} />}

      <FaqSection ids={page.faqIds} alt className="border-t border-line" />

      <CtaBand
        intent={page.intent}
        title={closing.title}
        body={closing.body}
        primaryLabel={page.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${page.intent}`}
      />
    </>
  );
}

/** Intent-matched closing copy per UCO spoke (no generic repetition). */
function closingFor(page: MoneyPage): { title: string; body: string } {
  if (page.closing) return page.closing;
  switch (page.slug) {
    case "get-paid":
      return {
        title: "Turn your used oil into a rebate",
        body: "Send us your rough weekly volume and area. We'll confirm a buy-back rate and a free collection schedule for your kitchen.",
      };
    case "compliance":
      return {
        title: "Keep your kitchen covered",
        body: "Arrange scheduled collection and we'll handle your used oil responsibly, with documentation for your duty-of-care file.",
      };
    case "cooking-oil-recycling":
      return {
        title: "Divert your used oil to recovery",
        body: "Arrange a collection and your used cooking oil becomes feedstock for renewable biodiesel — not a drain blockage.",
      };
    case "uco-compliance-reporting":
      return {
        title: "One collection relationship across every site",
        body: "Tell us your sites and volumes and we'll set up collection with documentation consolidated for head office.",
      };
    case "grease-trap-cleaning":
      return {
        title: "Book a grease-trap service",
        body: "Tell us your kitchen and how hard it works, and we'll match a servicing schedule that keeps you flowing and compliant.",
      };
    default:
      return {
        title: "Ready to arrange a collection?",
        body: "Free sealed drums, collection on your schedule, paid per litre — with documentation that keeps your kitchen covered.",
      };
  }
}
