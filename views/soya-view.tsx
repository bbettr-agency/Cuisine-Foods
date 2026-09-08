import type { MoneyPage } from "@/config/types";
import { getFaqs } from "@/config/faqs";
import { getImage } from "@/config/images";
import { hrefFor, resolveRelated } from "@/lib/registry";
import { faqPageSchema, breadcrumbSchema, productSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { TrustBand } from "@/components/sections/trust-band";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";

import { SoyaHero } from "@/components/soya/hero";
import { SoyaTheatre, type SoyaState } from "@/components/soya/theatre";
import { SoyaSpecs } from "@/components/soya/specs";
import { SoyaApplications } from "@/components/soya/applications";
import { SoyaCta } from "@/components/soya/cta";
import { MaskUp, DrawLine, RevealStagger } from "@/components/sunflower/motion-kit";

/**
 * SoyaView — the bespoke, motion-forward /soya-oil experience ("The Pour").
 * Shares the Sunflower/Palm ENGINEERING but a distinct liquid-gold visual world.
 * Built only from the existing Soya config content.
 */
export function SoyaView({ page }: { page: MoneyPage }) {
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

  const states: SoyaState[] = [
    { n: "01", label: "VERSATILE", title: "One oil, many uses", body: page.keyPoints[0]?.body ?? page.subhead },
    { n: "02", label: "CONSISTENT", title: page.sections[0]?.heading ?? "Consistent quality", body: page.sections[0]?.body ?? "" },
    {
      n: "03",
      label: "COMMERCIAL",
      title: page.sections[1]?.heading ?? "Built for manufacturers & caterers",
      body: page.sections[1]?.body ?? "",
      chips: ["Food manufacturers", "Caterers", "High-volume kitchens", "Processed foods"],
    },
    { n: "04", label: "BULK SUPPLY", title: "Reliable bulk supply", body: "Supplied in bulk with consistent quality — from 20L, no strict minimum, larger formats on request." },
  ];

  const apps: { title: string; body: string }[] = [
    { title: "Food manufacturers", body: "A dependable, consistent spec for production lines." },
    { title: "Caterers & kitchens", body: "Versatile for frying, baking, sauces and dressings." },
    { title: "Processed foods", body: "Neutral flavour that lets natural flavours through." },
    { title: "High-volume use", body: "Cost-effective at volume, supplied on your schedule." },
  ];

  return (
    <>
      <JsonLd data={schema} />

      <SoyaHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        subhead={page.subhead}
        crumbs={crumbs}
        intent={page.intent}
        primaryLabel={page.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${page.intent}`}
      />

      <Section>
        <MaskUp as="p" className="max-w-prose text-xl leading-relaxed text-ink-soft">{page.intro}</MaskUp>
        <div className="mt-10"><FeatureGrid points={page.keyPoints} /></div>
      </Section>

      {/* THE SIGNATURE — Soya Pour */}
      <SoyaTheatre states={states} />

      {/* Liquid data specifications */}
      <SoyaSpecs specs={page.specs ?? []} title={`${page.h1} at a glance`} />

      <TrustBand intent={page.intent} ctaLabel={page.primaryCtaLabel} />

      {/* Story content — varied motion vocabulary */}
      <Section alt>
        <div className="mx-auto max-w-3xl space-y-16">
          {page.sections.map((s, i) => (
            <div key={s.heading}>
              <h2 className="text-h2 text-ink"><MaskUp as="span">{s.heading}</MaskUp></h2>
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

      {/* Flowing applications */}
      <SoyaApplications heading="Across the food industry" items={apps} />

      <Section>
        <CrossSell label={page.crossSell.label} href={page.crossSell.href} blurb={page.crossSell.blurb} />
      </Section>

      {allRelated.length > 0 && <RelatedLinks title="Related pages & guides" items={allRelated} />}

      <FaqSection ids={page.faqIds} alt />

      <SoyaCta
        title={`${page.h1.toLowerCase()}?`}
        body="Tell us your monthly volume and delivery area — we'll come back quickly with pricing and a consistent supply schedule for your kitchen or production line."
        primaryLabel={page.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${page.intent}`}
      />
    </>
  );
}
