import type { MoneyPage } from "@/config/types";
import { getFaqs } from "@/config/faqs";
import { hrefFor, resolveRelated } from "@/lib/registry";
import { faqPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComparisonTableView } from "@/components/shared/data-tables";
import { ContentSections } from "@/components/sections/content-sections";
import { TrustBand } from "@/components/sections/trust-band";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal } from "@/components/ui/reveal";
import { FryingHero, type FryingRoute } from "@/components/product/frying-hero";
import { FryingCta } from "@/components/product/frying-cta";

/**
 * FryingView — the /frying-oil decision page. Not a SKU: it routes a buyer to the
 * right oil (Sunflower / Palm olein / Soya) and gives truthful, qualitative
 * guidance on choosing and extending fry-life. Built only from the frying config
 * (comparison table, key points, sections) + verified cross-links. Schema is a
 * Service (set in config via schemaKind), never a Product.
 */
export function FryingView({ page }: { page: MoneyPage }) {
  const path = hrefFor(page);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Bulk Cooking Oil Supply", path: "/bulk-cooking-oil-supply" },
    { name: page.h1, path },
  ];
  const faqs = getFaqs(page.faqIds);
  const related = resolveRelated(page.relatedSlugs);
  const allRelated = [...related, ...(page.resourceLinks ?? [])];
  const quoteHref = `/request-a-quote?intent=${page.intent}${page.quoteTopic ? `&topic=${page.quoteTopic}` : ""}`;

  const schema: object[] = [breadcrumbSchema(crumbs)];
  if (faqs.length) schema.push(faqPageSchema(faqs));
  schema.push(serviceSchema({ name: page.h1, description: page.metaDescription, path }));

  // Route cards — truthful qualitative guidance, drawn from the verified comparison.
  const routes: FryingRoute[] = [
    { name: "Palm olein", tag: "High-volume", when: "Highest heat stability and the longest fry-life – the workhorse for busy, high-volume deep frying.", href: "/palm-olein" },
    { name: "Sunflower oil", tag: "Versatile", when: "Clean, neutral and high smoke point – one oil to fry, bake and cook across the menu.", href: "/sunflower-oil" },
    { name: "Soya oil", tag: "Cost-effective", when: "A neutral, cost-effective oil for manufacturers and high-volume kitchens.", href: "/soya-oil" },
  ];

  return (
    <>
      <JsonLd data={schema} />

      <FryingHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        subhead={page.subhead}
        crumbs={crumbs}
        primaryLabel={page.primaryCtaLabel}
        primaryHref={quoteHref}
        routes={routes}
      />

      {/* Lead + the decision table — the core of the page */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xl leading-relaxed text-ink-soft">{page.intro}</p>
          </Reveal>
        </div>
        {page.comparison && (
          <div className="mx-auto mt-12 max-w-4xl">
            <SectionHeading eyebrow="Compare" title={page.comparison.caption} />
            <div className="mt-6"><ComparisonTableView table={page.comparison} /></div>
          </div>
        )}
      </Section>

      {/* Mid-page trust band — proof + inline CTA */}
      <TrustBand intent={page.intent} ctaLabel={page.primaryCtaLabel} />

      {/* How to choose / extend fry-life — the guidance content */}
      <ContentSections sections={page.sections} />

      <Section>
        <CrossSell label={page.crossSell.label} href={page.crossSell.href} blurb={page.crossSell.blurb} />
      </Section>

      {allRelated.length > 0 && <RelatedLinks title="Related pages & guides" items={allRelated} />}

      <FaqSection ids={page.faqIds} alt />

      <FryingCta
        title="Not sure which frying oil to order?"
        body="Tell us how your kitchen fries and your monthly volume – we'll recommend the right oil and come back with bulk pricing and a delivery schedule."
        primaryLabel={page.primaryCtaLabel}
        primaryHref={quoteHref}
        choices={[
          { name: "Palm olein", tag: "High-volume", href: "/palm-olein" },
          { name: "Sunflower oil", tag: "Versatile", href: "/sunflower-oil" },
          { name: "Soya oil", tag: "Cost-effective", href: "/soya-oil" },
        ]}
      />
    </>
  );
}
