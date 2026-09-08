import type { MoneyPage } from "@/config/types";
import { getFaqs } from "@/config/faqs";
import { getImage } from "@/config/images";
import { hrefFor, resolveRelated } from "@/lib/registry";
import { faqPageSchema, breadcrumbSchema, productSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section, Container } from "@/components/ui/container";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { TrustBand } from "@/components/sections/trust-band";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";

import { SunflowerHero } from "@/components/sunflower/hero";
import { SunflowerTheatre, type TheatreState } from "@/components/sunflower/theatre";
import { SunflowerSpecs } from "@/components/sunflower/specs";
import { KineticStrip } from "@/components/sunflower/kinetic-strip";
import { SunflowerCta } from "@/components/sunflower/cta";
import { MaskUp, DrawLine, RevealStagger } from "@/components/sunflower/motion-kit";

/**
 * SunflowerView — the bespoke, motion-forward /sunflower-oil experience.
 * Built ONLY from the existing Sunflower config content; reuses the approved
 * TrustBand / CrossSell / RelatedLinks / FAQ, and adds the signature
 * "Sunflower Bloom" product theatre plus a Cuisine motion vocabulary.
 */
export function SunflowerView({ page }: { page: MoneyPage }) {
  const path = hrefFor(page);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Bulk Cooking Oil Supply", path: "/bulk-cooking-oil-supply" },
    { name: page.h1, path },
  ];
  const faqs = getFaqs(page.faqIds);
  const related = resolveRelated(page.relatedSlugs);
  const allRelated = [...related, ...(page.resourceLinks ?? [])];

  const schema: object[] = [breadcrumbSchema(crumbs)];
  if (faqs.length) schema.push(faqPageSchema(faqs));
  schema.push(productSchema({ name: page.h1, description: page.metaDescription, path, image: getImage(page.imageId).src }));

  // Four theatre states — every word drawn from the page's own config.
  const states: TheatreState[] = [
    { n: "01", label: "PURE", title: "100% pure sunflower oil", body: page.keyPoints[0]?.body ?? page.subhead },
    { n: "02", label: "CONSISTENT", title: page.sections[0]?.heading ?? "Consistent quality", body: page.sections[0]?.body ?? "" },
    {
      n: "03",
      label: "COMMERCIAL",
      title: "Built for commercial kitchens",
      body: "A high smoke point that stands up to everyday frying, baking and cooking — service after service.",
      chips: ["Restaurants", "Caterers", "Food manufacturers", "Commercial kitchens"],
    },
    { n: "04", label: "BULK SUPPLY", title: "Reliable bulk supply", body: page.keyPoints[2]?.body ?? page.subhead },
  ];

  const kineticItems = ["Restaurants", "Caterers", "Food Manufacturers", "Commercial Kitchens"];

  return (
    <>
      <JsonLd data={schema} />

      <SunflowerHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        subhead={page.subhead}
        crumbs={crumbs}
        intent={page.intent}
        primaryLabel={page.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${page.intent}`}
      />

      {/* Breathing intro — value first, then the key points */}
      <Section>
        <MaskUp as="p" className="max-w-prose text-xl leading-relaxed text-ink-soft">
          {page.intro}
        </MaskUp>
        <div className="mt-10">
          <FeatureGrid points={page.keyPoints} />
        </div>
      </Section>

      {/* THE SIGNATURE — Sunflower Product Theatre */}
      <SunflowerTheatre states={states} />

      {/* Interactive specifications */}
      <SunflowerSpecs specs={page.specs ?? []} title={`${page.h1} at a glance`} />

      {/* Mid-page trust band (approved, kept) */}
      <TrustBand intent={page.intent} ctaLabel={page.primaryCtaLabel} />

      {/* Story content — varied motion vocabulary */}
      <Section alt>
        <div className="mx-auto max-w-3xl space-y-16">
          {page.sections.map((s, i) => (
            <div key={s.heading}>
              <h2 className="text-h2 text-ink">
                <MaskUp as="span">{s.heading}</MaskUp>
              </h2>
              <DrawLine className="mt-4 max-w-[120px]" />
              {s.body && (
                <RevealStagger className="mt-4">
                  {[<p key="b" className="max-w-prose text-lg leading-relaxed text-ink-soft">{s.body}</p>]}
                </RevealStagger>
              )}
              {i === 0 && <div className="mt-6"><FeatureGrid points={page.keyPoints} columns={3} /></div>}
            </div>
          ))}
        </div>
      </Section>

      {/* Kinetic commercial-use strip */}
      <KineticStrip items={kineticItems} />

      {/* Closed-loop cross-sell (approved, kept) */}
      <Section>
        <CrossSell label={page.crossSell.label} href={page.crossSell.href} blurb={page.crossSell.blurb} />
      </Section>

      {allRelated.length > 0 && <RelatedLinks title="Related pages & guides" items={allRelated} />}

      <FaqSection ids={page.faqIds} alt />

      <SunflowerCta
        title={`${page.h1.toLowerCase()}?`}
        body="Tell us your monthly volume and delivery area — we'll come back quickly with pricing and a delivery schedule that fits your kitchen."
        primaryLabel={page.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${page.intent}`}
      />
    </>
  );
}
