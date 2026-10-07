import type { MoneyPage } from "@/config/types";
import { getFaqs } from "@/config/faqs";
import { getImage } from "@/config/images";
import { hrefFor, resolveRelated } from "@/lib/registry";
import { faqPageSchema, breadcrumbSchema, productSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { TrustBand } from "@/components/sections/trust-band";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";

import { ProductHero } from "@/components/product/product-hero";
import { ProductIntro } from "@/components/product/product-intro";
import { PalmBotanical } from "@/components/palm/frond";
import { PalmTheatre, type PalmState } from "@/components/palm/theatre";
import { PalmSpecs } from "@/components/palm/specs";
import { PalmApplications } from "@/components/palm/applications";
import { PalmCta } from "@/components/palm/cta";
import { MaskUp, DrawLine, RevealStagger } from "@/components/sunflower/motion-kit";

/**
 * PalmView – the bespoke, motion-forward /palm-olein experience ("The Unfurl").
 * Shares the Sunflower ENGINEERING (product theatre, motion vocabulary, reduced
 * motion) but a distinct visual world: an architectural gold palm canopy.
 * Built only from the existing Palm Olein config content.
 */
export function PalmView({ page }: { page: MoneyPage }) {
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

  // Four states – every word from the Palm config.
  const states: PalmState[] = [
    { n: "01", label: "HEAT-STABLE", title: "The most heat-stable frying oil", body: page.keyPoints[0]?.body ?? page.subhead },
    { n: "02", label: "FRY-LIFE", title: "Longest fry-life", body: page.keyPoints[1]?.body ?? "" },
    {
      n: "03",
      label: "COMMERCIAL",
      title: "Built for commercial fryers",
      body: page.keyPoints[2]?.body ?? "",
      chips: ["Restaurants", "Takeaways", "QSR", "Caterers", "Food manufacturers"],
    },
    { n: "04", label: "BULK SUPPLY", title: "Reliable bulk supply", body: page.sections[1]?.body ?? page.subhead },
  ];

  const appItems = ["Restaurants", "Takeaways", "QSR", "Caterers", "Food Manufacturers"];

  const heroSpecs = [
    { label: "Type", value: "RBD palm olein" },
    { label: "Best for", value: "High-volume deep frying" },
    { label: "Heat stability", value: "Excellent – the most heat-stable" },
    { label: "Fry-life", value: "Longest of the three" },
  ];

  return (
    <>
      <JsonLd data={schema} />

      <ProductHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        subhead={page.subhead}
        crumbs={crumbs}
        intent={page.intent}
        primaryLabel={page.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${page.intent}&topic=${page.quoteTopic ?? ""}`}
        packshot={{ src: "/images/website/product-palm.png", w: 827, h: 1027, alt: "Cuisine Foods 100% pure palm olein – bulk pail" }}
        packshotWidthClass="w-[64%] max-w-[290px] lg:max-w-[370px]"
        motif={<div className="palm-canopy h-full w-full"><PalmBotanical className="h-full w-full" /></div>}
        motifClassName="right-[-10%] top-[-2%] h-[86%] w-[92%] opacity-45 lg:opacity-55"
        specs={heroSpecs}
        accent="gold"
      />

      {/* Breathing intro – value first, then the verified points as editorial content */}
      <ProductIntro lead={page.intro} points={page.keyPoints} />

      {/* THE SIGNATURE – Palm Unfurl */}
      <PalmTheatre states={states} />

      {/* Interactive specifications */}
      <PalmSpecs specs={page.specs ?? []} title={`${page.h1} at a glance`} />

      <TrustBand intent={page.intent} ctaLabel={page.primaryCtaLabel} />

      {/* Story content – varied motion vocabulary */}
      <Section alt>
        <div className="mx-auto max-w-3xl space-y-16">
          {page.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-h2 text-ink"><MaskUp as="span">{s.heading}</MaskUp></h2>
              <DrawLine className="mt-4 max-w-[120px]" />
              {s.body && (
                <RevealStagger className="mt-4">
                  {[<p key="b" className="max-w-prose text-lg leading-relaxed text-ink-soft">{s.body}</p>]}
                </RevealStagger>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Kinetic applications */}
      <PalmApplications items={appItems} />

      <Section>
        <CrossSell label={page.crossSell.label} href={page.crossSell.href} blurb={page.crossSell.blurb} />
      </Section>

      {allRelated.length > 0 && <RelatedLinks title="Related pages & guides" items={allRelated} />}

      <FaqSection ids={page.faqIds} alt />

      <PalmCta
        title={`${page.h1.toLowerCase()}?`}
        body="Tell us your monthly volume and delivery area – we'll come back quickly with pricing and a delivery schedule that keeps a busy fryer running."
        primaryLabel={page.primaryCtaLabel}
        primaryHref={`/request-a-quote?intent=${page.intent}&topic=${page.quoteTopic ?? ""}`}
      />
    </>
  );
}
