import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Province } from "@/config/locations";
import { metrosFor } from "@/config/locations";
import { site } from "@/config/site";
import { getFaqs } from "@/config/faqs";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/funnel/cta-band";
import { FaqSection } from "@/components/sections/faq-section";

const localFaqs = ["delivery-areas", "uco-pay-rate", "uco-certificate", "min-order"];

export function LocationProvinceView({ province }: { province: Province }) {
  const path = `/${province.slug}`;
  const branch = site.branches.find((b) => b.id === province.branchId)!;
  const metros = metrosFor(province.slug);
  const crumbs = [{ name: "Home", path: "/" }, { name: province.name, path }];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: `Cooking oil supply & UCO collection in ${province.name}`, description: province.metaDescription, path, areaServed: [province.name] }),
          faqPageSchema(getFaqs(localFaqs)),
        ]}
      />
      <PageHero
        eyebrow={`${province.name} · Supply & Collection`}
        h1={province.h1}
        subhead={province.intro}
        imageId={province.imageId}
        crumbs={crumbs}
        intent="general"
        primaryLabel="Get a Quote"
      />

      {/* Both offers, locally framed */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="card p-7 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">Bulk cooking oil supply in {province.name}</h2>
            <p className="mt-2 text-ink-soft">Sunflower, palm olein & soya delivered across {province.name} on your schedule — reliable, consistent, competitively priced.</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Button href="/request-a-quote?intent=supply">Get a Bulk Oil Quote</Button>
              <Link href="/bulk-cooking-oil-supply" className="text-sm font-semibold text-brand-700 hover:underline">Explore bulk oil supply →</Link>
            </div>
          </Reveal>
          <Reveal className="card p-7 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">Used cooking oil collection in {province.name}</h2>
            <p className="mt-2 text-ink-soft">Free, compliant collection across {province.name} — we pay you per litre and provide safe-disposal documentation.</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Button href="/request-a-quote?intent=uco" variant="gold">Arrange Free Collection</Button>
              <Link href="/used-cooking-oil-collection" className="text-sm font-semibold text-brand-700 hover:underline">Explore UCO collection →</Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Metro children */}
      <Section alt>
        <SectionHeading eyebrow="Areas we cover" title={`Where we serve in ${province.name}`} align="center" />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
          {metros.map((m) => (
            <Reveal as="div" key={m.slug}>
              <Link href={`/${province.slug}/${m.slug}`} className="group flex items-center justify-between gap-3 rounded-[var(--radius)] border border-line bg-surface p-5 transition-all hover:border-brand-300 hover:shadow-soft">
                <div>
                  <p className="flex items-center gap-2 font-semibold text-ink"><MapPin className="h-4 w-4 text-brand-600" />{m.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{m.suburbs.slice(0, 4).join(" · ")}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Branch + map */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Our {province.name} branch</p>
            <h2 className="text-h2 text-ink">{site.name} — {branch.label}</h2>
            <p className="mt-4 text-ink-soft">{branch.street}, {branch.city}, {branch.postalCode}</p>
            <p className="mt-1 text-sm text-ink-faint">{site.contact.hours}</p>
            <div className="mt-6"><Button href={branch.mapLink} variant="outline" external>Open in Google Maps</Button></div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius)] border border-line">
            <iframe
              title={`${site.name} ${branch.label} branch map`}
              src={branch.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full"
            />
          </div>
        </div>
      </Section>

      <FaqSection ids={localFaqs} alt title={`${province.name} — common questions`} />
      <CtaBand
        title={`Supplying & collecting across ${province.name}`}
        body="Get a bulk oil quote or arrange a free used-oil collection today."
        primaryLabel="Get a Quote"
      />
    </>
  );
}
