import type { Metadata } from "next";
import { Building2, HeartHandshake, Recycle, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { trust, enabledCerts } from "@/config/trust";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { TrustBar } from "@/components/funnel/trust-bar";
import { Industries } from "@/components/sections/industries";
import { CtaBand } from "@/components/funnel/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "About Cuisine Foods | Family-Owned SA Cooking Oil Partner",
  description: "A family-owned South African cooking oil partner since 2009 — supplying bulk oil and collecting used cooking oil across Gauteng & the Western Cape.",
  path: "/about",
});

const values = [
  { icon: "shield-check" as const, title: "Reliability first", body: "Consistent quality and dependable delivery — the two things a professional kitchen can't do without." },
  { icon: "hand" as const, title: "A true partnership", body: "We don't just supply oil — we partner with your kitchen for the long term." },
  { icon: "recycle" as const, title: "Responsible by design", body: "Every litre of used oil we collect is recycled into biodiesel, never back into the food chain." },
];

const iconFor = { "shield-check": ShieldCheck, hand: HeartHandshake, recycle: Recycle } as const;

export default function AboutPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  const certs = enabledCerts();
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow={site.ownership}
        h1="One partner for the oil in and the oil out"
        subhead="Cuisine Foods is a family-owned South African business supplying bulk cooking oil and collecting used cooking oil across Gauteng and the Western Cape — a genuine closed loop for professional kitchens."
        imageId="about-team"
        crumbs={crumbs}
        primaryLabel="Get a Quote"
      />

      <TrustBar bordered={false} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Supplying South Africa's kitchens since 2009" />
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>For more than a decade, our focus has stayed simple: deliver exceptional oil quality, reliable service and consistent bulk supply that keeps professional kitchens running smoothly.</p>
              <p>From branches in Centurion and Cape Town, we supply sunflower, palm olein and soya to restaurants, caterers, hotels and food manufacturers — and we collect their used cooking oil, paying per litre and recycling it into renewable biodiesel.</p>
              <p>It's a rare model in South Africa: one trusted partner for the oil going into your kitchen and the used oil coming back out.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <PlaceholderImage id="why-fleet" sizes="(max-width: 1024px) 100vw, 45vw" />
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <SectionHeading eyebrow="What we stand for" title="Values our customers can feel" align="center" />
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
          {values.map((v) => {
            const Ico = iconFor[v.icon];
            return (
              <Reveal as="div" key={v.title} className="card p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Ico className="h-5 w-5" strokeWidth={1.75} /></span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
              </Reveal>
            );
          })}
        </RevealGroup>

        {/* Certifications — progressive: renders only when the client confirms them */}
        {certs.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {certs.map((c) => (
              <span key={c.id} className="inline-flex items-center gap-2 rounded-full border border-brand-700/20 bg-surface px-4 py-2 text-sm font-medium text-brand-800">
                <ShieldCheck className="h-4 w-4" /> {c.label}
              </span>
            ))}
          </div>
        )}
      </Section>

      {/* Branches */}
      <Section>
        <SectionHeading eyebrow="Where to find us" title="Two branches, two provinces" align="center" />
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {site.branches.map((b) => (
            <div key={b.id} className="card p-6">
              <p className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Building2 className="h-5 w-5 text-brand-600" /> {b.label}</p>
              <p className="mt-2 text-sm text-ink-soft">{b.street}, {b.city}, {b.postalCode}</p>
              <p className="mt-1 text-xs text-ink-faint">{site.contact.hours}</p>
            </div>
          ))}
        </div>
      </Section>

      <Industries />
      <CtaBand />
    </>
  );
}
