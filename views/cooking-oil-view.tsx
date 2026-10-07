import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Pillar } from "@/config/pillars";
import { getFaqs } from "@/config/faqs";
import { openProvincesPhrase } from "@/config/coverage";
import { faqPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { CrossSell } from "@/components/funnel/cross-sell";
import { RelatedLinks } from "@/components/sections/related-links";
import { FaqSection } from "@/components/sections/faq-section";

import { ProductHero } from "@/components/product/product-hero";
import { ProductIntro } from "@/components/product/product-intro";
import { LivingBotanical } from "@/components/cooking/botanical";
import { CookingTheatre, type CookState } from "@/components/cooking/theatre";
import { CookingSpecs } from "@/components/cooking/specs";
import { CookingApplications } from "@/components/cooking/applications";
import { CookingCta } from "@/components/cooking/cta";

/**
 * CookingOilView – the bespoke, motion-forward Bulk Cooking Oil page ("The
 * Living Label"). Built on the supply pillar: it keeps the hub's job (the
 * spokes grid, cross-sell, resources, FAQ) but leads with the black-bucket hero
 * and the signature theatre where the packaging artwork escapes into the page.
 * Every theatre / spec / application beat is derived from the pillar's real copy.
 */
export function CookingOilView({ pillar }: { pillar: Pillar }) {
  const path = `/${pillar.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Bulk Cooking Oil Supply", path }];
  const faqs = getFaqs(pillar.faqIds);

  const states: CookState[] = [
    { n: "01", label: "PREMIUM", title: "A decade of premium supply", body: "Consistent quality, dependable delivery and competitive bulk pricing – from 20L, with no strict minimum." },
    { n: "02", label: "THE RANGE", title: pillar.keyPoints[0]?.title ?? "Three core oils", body: pillar.keyPoints[0]?.body ?? "Sunflower, palm olein and soya – the right oil for every kitchen and fryer." },
    {
      n: "03",
      label: "RELIABLE",
      title: pillar.keyPoints[1]?.title ?? "Reliable delivery",
      body: pillar.keyPoints[1]?.body ?? "Daily, weekly or monthly, so you never run out mid-service.",
      chips: ["Restaurants", "Caterers", "Manufacturers"],
    },
    { n: "04", label: "LOWER COST", title: pillar.keyPoints[2]?.title ?? "Lower real cost", body: pillar.keyPoints[2]?.body ?? "We buy back your used oil – dropping your true cost per litre." },
  ];

  const specs = [
    { label: "The range", value: "Sunflower · Palm olein · Soya" },
    { label: "Formats", value: "From 20L, no strict minimum" },
    { label: "Delivery", value: "Nationwide; daily, weekly or monthly" },
    { label: "Hubs", value: openProvincesPhrase() },
    { label: "Buy-back", value: "We collect & pay for used oil" },
  ];

  const quoteHref = `/request-a-quote?intent=${pillar.intent}&topic=bulk-cooking-oil`;

  // Use-case routing — helps a buyer choose the right conversation, no fake specs.
  const chooser = [
    { name: "Sunflower oil", href: "/sunflower-oil", when: "Your everyday all-rounder — one clean oil for frying, baking and cooking." },
    { name: "Palm olein", href: "/palm-olein", when: "The workhorse for high-volume deep frying — exceptional heat stability and a long fry-life." },
    { name: "Soya oil", href: "/soya-oil", when: "A cost-effective, neutral oil for manufacturers and high-volume kitchens." },
    { name: "Still deciding?", href: "/frying-oil", when: "Compare the oils for your fryer in the frying-oil guide." },
  ];

  const apps = [
    { title: "Restaurants", body: "Reliable supply, so you never run out mid-service." },
    { title: "Caterers", body: "Consistent oil for events at any scale." },
    { title: "Food manufacturers", body: "A dependable, consistent spec for production lines." },
    { title: "Franchises", body: "One standard across every site you run." },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema({ name: pillar.h1, description: pillar.metaDescription, path, national: true }), ...(faqs.length ? [faqPageSchema(faqs)] : [])]} />

      <ProductHero
        eyebrow={pillar.eyebrow}
        h1={pillar.h1}
        subhead={pillar.subhead}
        crumbs={crumbs}
        intent={pillar.intent}
        primaryLabel={pillar.primaryCtaLabel}
        primaryHref={quoteHref}
        packshot={{ src: "/images/website/product-cooking.png", w: 869, h: 1046, alt: "Cuisine Foods 100% pure cooking oil – 20L bucket" }}
        packshotWidthClass="w-[68%] max-w-[310px] lg:max-w-[400px]"
        motif={<div className="living-art h-full w-full"><LivingBotanical className="h-full w-full" /></div>}
        motifClassName="right-[-6%] top-[0%] h-[92%] w-[80%] opacity-55 lg:opacity-65"
        specs={specs}
        accent="gold"
      />

      {/* Why Cuisine Foods – editorial intro with the verified points */}
      <ProductIntro eyebrow="Why Cuisine Foods" lead={pillar.intro} points={pillar.keyPoints} />

      {/* THE SIGNATURE – the Living Label */}
      <CookingTheatre states={states} />

      {/* The grown botanical becomes the datasheet */}
      <CookingSpecs specs={specs} title="Bulk cooking oil at a glance" />

      {/* Where the oil goes */}
      <CookingApplications heading="Across professional kitchens" items={apps} />

      {/* Which oil? — use-case routing, not a spec comparison */}
      <Section>
        <SectionHeading
          eyebrow="Which oil?"
          title="Not sure which oil to order?"
          intro="It comes down to how your kitchen cooks. Here's the quickest way to point you at the right one – or we'll talk it through on your quote."
        />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
          {chooser.map((c) => (
            <Reveal as="div" key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-[var(--radius)] border border-line bg-surface p-6 transition-all duration-200 hover:border-gold-500/50 hover:shadow-soft"
              >
                <p className="flex items-center gap-1 font-display text-lg font-bold text-ink">
                  {c.name}
                  <ArrowRight className="h-4 w-4 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.when}</p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Spokes – the hub's job, kept intact */}
      <Section alt>
        <SectionHeading eyebrow="Explore" title="Everything under this service" align="center" />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillar.children.map((c) => (
            <Reveal as="div" key={c.href}>
              <Link href={c.href} className="group flex h-full items-start gap-4 rounded-[var(--radius)] border border-line bg-surface p-5 transition-all duration-200 hover:border-brand-300 hover:shadow-soft">
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

      {pillar.resourceLinks && pillar.resourceLinks.length > 0 && <RelatedLinks title="Guides & resources" items={pillar.resourceLinks} />}

      <FaqSection ids={pillar.faqIds} alt />

      <CookingCta
        title="cooking oil?"
        body="Tell us your monthly volume and delivery area – we'll come back quickly with bulk pricing and a reliable supply schedule for your kitchen or production line."
        primaryLabel={pillar.primaryCtaLabel}
        primaryHref={quoteHref}
      />
    </>
  );
}
