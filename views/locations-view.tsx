import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/funnel/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { CoverageMap } from "@/components/locations/coverage-map";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { allHubs, type Hub } from "@/config/coverage";

/**
 * LocationsView — the national network / coverage hub. Expands the homepage
 * footprint into a usable page: the coverage map, a regional chapter per hub
 * (status + services, all derived from config/coverage.ts), and how businesses
 * outside the hub cities are served. It is NOT a keyword doorway and must not
 * compete with the homepage for "cooking oil supplier South Africa".
 */

const SERVICE_LABELS: { key: keyof Hub["services"]; label: string; href: string }[] = [
  { key: "supply", label: "Bulk cooking oil supply", href: "/bulk-cooking-oil-supply" },
  { key: "ucoCollection", label: "Used cooking oil collection", href: "/used-cooking-oil-collection" },
  { key: "greaseTrap", label: "Grease-trap cleaning", href: "/grease-trap-cleaning" },
  { key: "complianceReporting", label: "UCO compliance reporting", href: "/uco-compliance-reporting" },
];

function hubHref(h: Hub): string {
  return `/${h.provinceSlug}`;
}

export function LocationsView() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }];
  const hubs = allHubs();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: "Cuisine Foods coverage – commercial cooking oil supply & used-oil collection",
            description: "Where Cuisine Foods operates: regional hubs in Gauteng and the Western Cape, with KwaZulu-Natal opening soon, serving commercial kitchens across South Africa.",
            path: "/locations",
            national: true,
          }),
        ]}
      />

      {/* Text hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(55% 60% at 85% 0%, rgb(var(--gold-100) / 0.6) 0%, transparent 60%)" }}
        />
        <Container className="py-12 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-3">Nationwide coverage</p>
            <h1 className="max-w-3xl text-display text-ink">Where Cuisine Foods operates</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              We're a national commercial cooking-oil supplier and used-oil recovery partner, run from regional hubs.
              Gauteng and the Western Cape are operating today, with KwaZulu-Natal opening soon – and we supply and
              collect well beyond our hub cities.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/request-a-quote?intent=supply" size="lg">Get a Quote</Button>
              <Button href="/used-cooking-oil-collection" variant="outline" size="lg">Arrange a Collection</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CoverageMap />

      {/* Regional chapters — all facts from coverage */}
      <Section>
        <SectionHeading eyebrow="By region" title="Our regional hubs" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {hubs.map((h) => {
            const open = h.status === "open";
            const services = SERVICE_LABELS.filter((s) => h.services[s.key]);
            return (
              <Reveal as="div" key={h.id} className="card flex flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-ink">{h.province}</h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      open ? "bg-brand-50 text-brand-800" : "border border-dashed border-gold-500/50 text-gold-700"
                    }`}
                  >
                    {open ? "Operating" : "Opening soon"}
                  </span>
                </div>
                {open && h.address?.city && (
                  <p className="mt-1 text-sm text-ink-faint">Hub in {h.address.city}</p>
                )}
                <ul className="mt-5 space-y-2">
                  {services.map((s) => (
                    <li key={s.key} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {s.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-1">
                  {open ? (
                    <Link href={hubHref(h)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2">
                      {h.province} supply & collection <ArrowRight className="h-4 w-4 transition-all" />
                    </Link>
                  ) : (
                    <Link href="/kwazulu-natal" className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:gap-2">
                      About the KwaZulu-Natal expansion <ArrowRight className="h-4 w-4 transition-all" />
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Beyond the hub cities */}
      <Section alt className="border-t border-line">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Outside the hub cities?" title="We still want to hear from you" align="center" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
            Our hubs anchor the network, but we supply bulk cooking oil and arrange used-oil collection well beyond
            their home cities. Tell us where you are and what you need, and we'll tell you honestly what we can do for
            your area – and when.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/request-a-quote?intent=supply" size="lg">Tell us where you are</Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title="One partner for the oil in and the oil out"
        body="Wherever you are, get a bulk oil quote or arrange a used-oil collection – we'll confirm what we can do for your area."
        primaryLabel="Get a Quote"
        primaryHref="/request-a-quote?intent=supply"
      />
    </>
  );
}
