import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { home } from "@/config/home";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import type { IconName } from "@/config/types";

/**
 * ClosedLoop (V2) — elevates the supply + recovery story. An editorial, almost-
 * read-free loop (fresh oil delivered → you cook → used oil out → we collect &
 * pay → recovered into biodiesel) sits above the two offer cards. Restrained
 * motion (Reveal only) to protect the homepage's motion hierarchy. No "only us /
 * nobody else" claims — the advantage is one commercial relationship for both.
 */

const LOOP: { icon: IconName; label: string }[] = [
  { icon: "truck", label: "Fresh oil delivered" },
  { icon: "flame", label: "You cook" },
  { icon: "droplet", label: "Used oil out" },
  { icon: "banknote", label: "We collect & pay" },
  { icon: "recycle", label: "Recovered to biodiesel" },
];

export function ClosedLoop() {
  const { offersHeading, offers } = home;
  return (
    <Section>
      <SectionHeading eyebrow={offersHeading.eyebrow} title={offersHeading.title} intro={offersHeading.body} align="center" />

      {/* The loop — horizontal on desktop, vertical rail on mobile */}
      <Reveal className="mx-auto mt-10 max-w-4xl">
        <ol className="flex flex-col gap-4 border-l border-gold-500/30 pl-6 sm:flex-row sm:items-start sm:justify-between sm:gap-2 sm:border-l-0 sm:pl-0">
          {LOOP.map((step, i) => (
            <li key={step.label} className="relative flex items-center gap-3 sm:flex-1 sm:flex-col sm:gap-2 sm:text-center">
              <span className="absolute -left-[31px] h-2.5 w-2.5 rounded-full bg-gold-500 sm:static sm:hidden" aria-hidden />
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-gold-500/20">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-snug text-ink sm:max-w-[12ch]">{step.label}</span>
              {/* connector between steps (desktop) */}
              {i < LOOP.length - 1 && (
                <ArrowRight aria-hidden className="absolute right-[-6px] top-5 hidden h-4 w-4 text-gold-500/60 sm:block" />
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-center text-sm text-ink-faint">One account for the oil in and the oil out – across South Africa.</p>
      </Reveal>

      {/* The two pathways */}
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
