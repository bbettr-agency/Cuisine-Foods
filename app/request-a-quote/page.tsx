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
import { LeadForm } from "@/components/funnel/lead-form";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote | Bulk Oil or UCO Collection | Cuisine Foods",
  description: "Request a fast, competitive quote for bulk cooking oil supply or arrange a free used cooking oil collection across Gauteng & the Western Cape.",
  path: "/request-a-quote",
});

const reasons = [
  "A competitive written quote, fast",
  "No obligation and no lock-in",
  "One partner for supply and collection",
  "Serving Gauteng & the Western Cape",
];

export default function QuotePage({ searchParams }: { searchParams: { intent?: string } }) {
  const intent: CtaIntent = searchParams.intent === "uco" ? "uco" : "supply";
  const crumbs = [{ name: "Home", path: "/" }, { name: "Request a Quote", path: "/request-a-quote" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container className="pt-8 lg:pt-12"><Breadcrumbs items={crumbs} /></Container>
      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Request a quote"
              title={intent === "uco" ? "Arrange your used-oil collection" : "Get your bulk oil quote"}
              intro="Tell us a little about your kitchen and we'll come back quickly with pricing and next steps."
              as="h1"
            />
            <ul className="mt-8 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-ink"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /> {r}</li>
              ))}
            </ul>
          </div>
          <Reveal>
            <LeadForm defaultIntent={intent} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
