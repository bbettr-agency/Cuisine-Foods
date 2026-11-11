import type { Metadata } from "next";
import { Check } from "lucide-react";
import type { CtaIntent } from "@/config/conversion";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { GhlFormPanel } from "@/components/funnel/ghl-form-panel";

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

const copy = {
  supply: {
    eyebrow: "Request a quote",
    title: "Get your bulk oil quote",
    intro:
      "Tell us a little about your kitchen and a regional rep will come back with pricing for your volume and delivery area – usually within one business day.",
  },
  uco: {
    eyebrow: "Arrange a collection",
    title: "Arrange your used-oil collection",
    intro:
      "Tell us a little about your site and we'll arrange a used cooking oil collection from your nearest regional hub.",
  },
} as const;

export default function QuotePage({ searchParams }: { searchParams: { intent?: string } }) {
  const intent: CtaIntent = searchParams.intent === "uco" ? "uco" : "supply";
  const c = copy[intent];
  const crumbs = [{ name: "Home", path: "/" }, { name: "Request a Quote", path: "/request-a-quote" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container className="pt-10 lg:pt-16"><Breadcrumbs items={crumbs} /></Container>
      <Section className="pt-4">
        {/* Intent-aware header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">{c.eyebrow}</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{c.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">{c.intro}</p>
        </div>

        {/* Reassurance points */}
        <ul className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          {reasons.map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /> {r}
            </li>
          ))}
        </ul>

        {/* Official GHL enquiry form */}
        <GhlFormPanel
          className="mt-10 sm:mt-12"
          reassurance="No obligation. Your details are only used to prepare your quote."
        />
      </Section>
    </>
  );
}
