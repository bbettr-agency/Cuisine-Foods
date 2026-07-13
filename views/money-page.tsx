import type { MoneyPage } from "@/config/types";
import { getFaqs } from "@/config/faqs";
import { site } from "@/config/site";
import { hrefFor, resolveRelated } from "@/lib/registry";
import { faqPageSchema, breadcrumbSchema, productSchema, serviceSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { ContentSections } from "@/components/sections/content-sections";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/funnel/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** MoneyPageView — the single template behind products, buyer segments & UCO services. */
export function MoneyPageView({ page }: { page: MoneyPage }) {
  const path = hrefFor(page);
  const crumbs = buildCrumbs(page);
  const faqs = getFaqs(page.faqIds);
  const related = resolveRelated(page.relatedSlugs);

  const schema: object[] = [breadcrumbSchema(crumbs)];
  if (faqs.length) schema.push(faqPageSchema(faqs));
  if (page.kind === "product") {
    schema.push(productSchema({ name: page.h1, description: page.metaDescription, path }));
  } else {
    schema.push(serviceSchema({ name: page.h1, description: page.metaDescription, path }));
  }

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        subhead={page.subhead}
        imageId={page.imageId}
        crumbs={crumbs}
        intent={page.intent}
        primaryLabel={page.primaryCtaLabel}
      />

      {/* Intro + key points */}
      <Section>
        <SectionHeading eyebrow={page.eyebrow} title={page.h1} intro={page.intro} />
        <div className="mt-10">
          <FeatureGrid points={page.keyPoints} />
        </div>
      </Section>

      <ContentSections sections={page.sections} />

      {/* Closed-loop cross-sell */}
      <Section>
        <CrossSell label={page.crossSell.label} href={page.crossSell.href} blurb={page.crossSell.blurb} />
      </Section>

      {related.length > 0 && <RelatedLinks title="Related pages" items={related} />}

      <FaqSection ids={page.faqIds} alt />

      <CtaBand intent={page.intent} primaryLabel={page.primaryCtaLabel} primaryHref={`/request-a-quote?intent=${page.intent}`} />
    </>
  );
}

function buildCrumbs(page: MoneyPage) {
  const home = { name: "Home", path: "/" };
  if (page.kind === "product") {
    return [home, { name: "Bulk Cooking Oil Supply", path: "/bulk-cooking-oil-supply" }, { name: page.h1, path: hrefFor(page) }];
  }
  if (page.kind === "buyer") {
    return [home, { name: "Bulk Cooking Oil Supply", path: "/bulk-cooking-oil-supply" }, { name: page.h1, path: hrefFor(page) }];
  }
  // uco-service
  return [home, { name: "Used Cooking Oil Collection", path: "/used-cooking-oil-collection" }, { name: page.h1, path: hrefFor(page) }];
}

/** Shared metadata source referenced by each route. */
export function moneyPageMeta(page: MoneyPage) {
  return { title: page.metaTitle, description: page.metaDescription, path: hrefFor(page), image: undefined as string | undefined, siteName: site.name };
}
