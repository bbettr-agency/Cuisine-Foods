import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/funnel/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { getHub } from "@/config/coverage";

/**
 * KwaZuluNatalView — the coming-soon province page. While the hub status is
 * "coming-soon" it must NOT pose as an operating branch: no address, city,
 * phone, depot, schedule, LocalBusiness or operating claim. It states the
 * confirmed intent (supply + UCO collection are the confirmed national
 * capabilities), says "opening soon", and captures interest. The route itself
 * is noindex until status flips to "open" (see the page file). Everything here
 * derives from config/coverage.ts, so the page upgrades itself when KZN opens.
 */
export function KwaZuluNatalView() {
  const hub = getHub("kwazulu-natal");
  const crumbs = [{ name: "Home", path: "/" }, { name: "KwaZulu-Natal", path: "/kwazulu-natal" }];

  const confirmed = [
    hub?.services.supply ? "Bulk commercial cooking oil supply" : null,
    hub?.services.ucoCollection ? "Used cooking oil collection" : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs)]} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(55% 60% at 85% 0%, rgb(var(--gold-100) / 0.6) 0%, transparent 60%)" }}
        />
        <Container className="py-12 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-3 inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-600" /> KwaZulu-Natal · Opening soon
            </p>
            <h1 className="max-w-3xl text-display text-ink">Cuisine Foods is expanding into KwaZulu-Natal</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {hub?.opening ??
                "Our national coverage is expanding into KwaZulu-Natal."}{" "}
              We're establishing a regional presence to bring the same commercial oil supply and used-oil recovery
              KwaZulu-Natal kitchens already ask us for.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/request-a-quote?intent=supply&region=KwaZulu-Natal" size="lg">Register your interest</Button>
              <Button href="/locations" variant="outline" size="lg">See our national network</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="What's coming" title="What we'll bring to KwaZulu-Natal" />
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            KwaZulu-Natal will join Gauteng and the Western Cape as a regional hub in our national network. The
            confirmed services for the region are:
          </p>
          <ul className="mt-6 space-y-3">
            {confirmed.map((s) => (
              <li key={s} className="flex items-start gap-3 text-ink">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /> <span className="text-lg">{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-[var(--radius)] border border-gold-500/30 bg-gold-100/40 p-5 text-sm leading-relaxed text-ink-soft">
            We're being upfront: we haven't opened the KwaZulu-Natal hub yet, so we're not publishing a depot address,
            local phone number or collection schedule we can't stand behind. Register your interest and we'll be in
            touch as the region goes live.
          </p>
        </div>
      </Section>

      <Section alt className="border-t border-line">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-ink-soft">
            Already operating in Gauteng or the Western Cape? Explore our{" "}
            <Link href="/gauteng" className="font-semibold text-brand-700 hover:underline">Gauteng</Link> and{" "}
            <Link href="/western-cape" className="font-semibold text-brand-700 hover:underline">Western Cape</Link>{" "}
            coverage, or see the whole{" "}
            <Link href="/locations" className="font-semibold text-brand-700 hover:underline">national network</Link>.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Opening soon in KwaZulu-Natal"
        body="Register your interest now and we'll contact you as supply and collection go live in your area."
        primaryLabel="Register your interest"
        primaryHref="/request-a-quote?intent=supply&region=KwaZulu-Natal"
      />
    </>
  );
}
