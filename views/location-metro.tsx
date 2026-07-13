import { MapPin, ShieldCheck, Truck } from "lucide-react";
import type { Metro } from "@/config/locations";
import { getProvince } from "@/config/locations";
import { site } from "@/config/site";
import { getFaqs } from "@/config/faqs";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/funnel/cta-band";
import { FaqSection } from "@/components/sections/faq-section";

/**
 * LocationMetroView — hyper-local & unique (anti-doorway, OS P11).
 * Carries real suburbs, local logistics, customer clusters and that
 * municipality's actual FOG regulation note — unique by construction.
 */
export function LocationMetroView({ metro }: { metro: Metro }) {
  const province = getProvince(metro.provinceSlug)!;
  const path = `/${province.slug}/${metro.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: province.name, path: `/${province.slug}` },
    { name: metro.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: `Cooking oil supply & UCO collection in ${metro.name}`, description: metro.metaDescription, path, areaServed: [metro.name] }),
          faqPageSchema(getFaqs(metro.faqIds)),
        ]}
      />
      <PageHero
        eyebrow={`${province.name} · ${metro.name}`}
        h1={metro.h1}
        subhead={metro.intro}
        crumbs={crumbs}
        intent="general"
        primaryLabel="Get a Quote"
      />

      {/* Unique local content */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          <Reveal>
            <h2 className="text-h2 text-ink">Areas we serve in {metro.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{metro.localLogistics}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {metro.suburbs.map((s) => (
                <span key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-soft">{s}</span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-h2 text-ink">The kitchens we work with here</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{metro.customerClusters}</p>
          </Reveal>

          <Reveal>
            <div className="rounded-[var(--radius)] border border-brand-700/20 bg-brand-50/60 p-6">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                <ShieldCheck className="h-5 w-5 text-brand-700" /> Staying compliant in {metro.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{metro.complianceNote}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Two offers */}
      <Section alt>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-7">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Truck className="h-5 w-5 text-brand-600" /> Bulk oil supply</p>
            <p className="mt-2 text-sm text-ink-soft">Sunflower, palm olein & soya delivered across {metro.name}.</p>
            <div className="mt-4"><Button href="/request-a-quote?intent=supply">Get a Bulk Oil Quote</Button></div>
          </div>
          <div className="card p-7">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-ink"><MapPin className="h-5 w-5 text-brand-600" /> Used-oil collection</p>
            <p className="mt-2 text-sm text-ink-soft">Free, compliant collection in {metro.name} — paid per litre.</p>
            <div className="mt-4"><Button href="/request-a-quote?intent=uco" variant="gold">Arrange Free Collection</Button></div>
          </div>
        </div>
      </Section>

      <FaqSection ids={metro.faqIds} title={`${metro.name} — common questions`} />
      <CtaBand
        title={`Your local partner in ${metro.name}`}
        body={`Bulk oil delivered and used oil collected across ${metro.name} and surrounds. Get a quote today.`}
        primaryLabel="Get a Quote"
      />
    </>
  );
}
