import Link from "next/link";
import { Phone } from "lucide-react";
import { telUrl, whatsappUrl, whatsappPrefill, cta } from "@/config/conversion";
import type { CtaIntent } from "@/config/conversion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";

/**
 * UcoHero — the shared hero for the Used Cooking Oil ecosystem. Distinct from the
 * generic PageHero (which products/buyers use) so the UCO cluster reads as one
 * family: editorial type on paper, a gold-liquid "well" as the hero visual
 * (no photography exists yet), and an optional secondary pathway (e.g. "Sell your
 * used oil"). The gold well is the second-state oil idea in still form.
 */
export function UcoHero({
  eyebrow,
  h1,
  subhead,
  crumbs,
  intent = "uco",
  primaryLabel,
  primaryHref,
  secondary,
  note,
}: {
  eyebrow: string;
  h1: string;
  subhead: string;
  crumbs: Crumb[];
  intent?: CtaIntent;
  primaryLabel: string;
  primaryHref?: string;
  secondary?: { label: string; href: string };
  note?: string;
}) {
  const waMsg = intent === "uco" ? whatsappPrefill.uco : whatsappPrefill.general;
  const href = primaryHref ?? `/request-a-quote?intent=${intent}`;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(55% 60% at 88% 0%, rgb(var(--gold-100) / 0.7) 0%, transparent 60%)" }}
      />
      <Container className="grid items-center gap-10 pb-12 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:pb-16 lg:pt-20">
        <div>
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="text-display text-ink">{h1}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{subhead}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={href} variant="primary" size="lg">{primaryLabel}</Button>
              {secondary ? (
                <Button href={secondary.href} variant="dark" size="lg">{secondary.label}</Button>
              ) : (
                <Button href={whatsappUrl(waMsg)} variant="whatsapp" size="lg" external>{cta.whatsapp}</Button>
              )}
              <a href={telUrl} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink">
                <Phone className="h-4 w-4 text-brand-600" /> {cta.call}
              </a>
            </div>
          </Reveal>
          {note && (
            <Reveal delay={0.12}>
              <p className="mt-5 text-sm text-ink-faint">{note}</p>
            </Reveal>
          )}
          {secondary && (
            <Reveal delay={0.14}>
              <Link href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-medium text-brand-700 hover:text-brand-800">
                or message us on WhatsApp →
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1}>
          <GoldWell />
        </Reveal>
      </Container>
    </section>
  );
}

/** A still "well" of gold oil — the second-state liquid at rest. SVG only. */
function GoldWell() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <svg viewBox="0 0 400 300" fill="none" className="h-full w-full" aria-hidden role="presentation">
        <defs>
          <radialGradient id="uco-well" cx="0.5" cy="0.42" r="0.62">
            <stop offset="0" stopColor="rgb(var(--gold-300))" />
            <stop offset="0.55" stopColor="rgb(var(--gold-600))" />
            <stop offset="1" stopColor="rgb(var(--gold-800))" />
          </radialGradient>
          <linearGradient id="uco-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(var(--gold-200))" />
            <stop offset="1" stopColor="rgb(var(--gold-500))" />
          </linearGradient>
        </defs>
        {/* vessel rim */}
        <ellipse cx="200" cy="150" rx="150" ry="104" fill="none" stroke="url(#uco-rim)" strokeWidth="2" opacity="0.6" />
        {/* the oil surface */}
        <ellipse cx="200" cy="150" rx="138" ry="94" fill="url(#uco-well)" />
        {/* meniscus highlight (a soft reflection on the surface) */}
        <ellipse cx="162" cy="118" rx="52" ry="20" fill="rgb(var(--gold-100))" opacity="0.5" transform="rotate(-18 162 118)" />
        {/* fine concentric ripple */}
        <ellipse cx="200" cy="150" rx="96" ry="64" fill="none" stroke="rgb(var(--gold-300))" strokeWidth="1" opacity="0.35" />
      </svg>
    </div>
  );
}
