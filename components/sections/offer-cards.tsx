import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { home } from "@/config/home";
import { whatsappPrefill } from "@/config/conversion";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/** Two offer cards under the closed-loop header — clean split of the two journeys. */
export function OfferCards() {
  const { offersHeading, offers } = home;
  return (
    <Section>
      <SectionHeading eyebrow={offersHeading.eyebrow} title={offersHeading.title} intro={offersHeading.body} align="center" />
      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
        {offers.map((o) => (
          <Reveal as="div" key={o.intent} className="card flex flex-col p-7 transition-shadow duration-200 hover:shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-bold text-ink">{o.title}</h3>
            <p className="mt-2 text-ink-soft">{o.body}</p>
            <ul className="mt-5 space-y-2.5">
              {o.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {o.productLinks.map((pl) => (
                <Link
                  key={pl.href}
                  href={pl.href}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {pl.label}
                </Link>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-4 pt-1">
              <Button href={o.href} variant={o.intent === "uco" ? "gold" : "primary"}>
                {o.cta}
              </Button>
              <Link href={o.href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2">
                Details <ArrowRight className="h-4 w-4 transition-all" />
              </Link>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
