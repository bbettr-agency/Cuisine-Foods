import type { Metadata } from "next";
import { Check } from "lucide-react";
import type { CtaIntent } from "@/config/conversion";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GhlQuoteEmbed } from "@/components/funnel/ghl-quote-embed";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote | Bulk Oil or UCO Collection | Cuisine Foods",
  description: "Request a competitive quote for bulk cooking oil supply or arrange a used cooking oil collection – nationwide, from our regional hubs. No obligation, no lock-in.",
  path: "/request-a-quote",
});

const reasons = [
  "A competitive written quote, fast",
  "No obligation and no lock-in",
  "One partner for supply and collection",
  "Nationwide, from our regional hubs",
];

export default function QuotePage({ searchParams }: { searchParams: { intent?: string; topic?: string; region?: string } }) {
  const intent: CtaIntent = searchParams.intent === "uco" ? "uco" : "supply";
  const crumbs = [{ name: "Home", path: "/" }, { name: "Request a Quote", path: "/request-a-quote" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container className="pt-10 lg:pt-16"><Breadcrumbs items={crumbs} /></Container>
      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Request a quote"
            title={intent === "uco" ? "Arrange your used-oil collection" : "Get your bulk oil quote"}
            intro="Tell us a little about your kitchen and we'll come back quickly with pricing and next steps."
            as="h1"
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3 text-ink"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /> {r}</li>
            ))}
          </ul>
          {/* Full-width block (same width as the /quote funnel) so the GHL form lays out two fields per row. */}
          <Reveal>
            <div id="quote" className="mt-10">
              <GhlQuoteEmbed />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
