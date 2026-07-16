import { Check, ShieldCheck } from "lucide-react";
import { trustBand } from "@/config/commercial";
import { enabledCerts } from "@/config/trust";
import { cta, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import type { CtaIntent } from "@/config/conversion";
import { Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/**
 * Mid-page trust band — closed-loop differentiator + reliability/objection proof
 * points + progressive certifications + inline CTA. The conversion anchor on
 * commercial pages (answers the <30-second procurement question).
 */
export function TrustBand({
  intent = "general",
  ctaLabel = cta.quote,
}: {
  intent?: CtaIntent;
  ctaLabel?: string;
}) {
  const certs = enabledCerts();
  const waMsg = intent === "uco" ? whatsappPrefill.uco : intent === "supply" ? whatsappPrefill.supply : whatsappPrefill.general;

  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-3">{trustBand.eyebrow}</p>
          <h2 className="text-h2 text-ink">{trustBand.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{trustBand.differentiator}</p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {trustBand.reassurances.map((r) => (
              <li key={r} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                <Check className="h-4 w-4 text-brand-600" /> {r}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={`/request-a-quote?intent=${intent}`}>{ctaLabel}</Button>
            <Button href={whatsappUrl(waMsg)} variant="whatsapp" external>{cta.whatsapp}</Button>
          </div>

          {/* Progressive: renders only when real certifications are confirmed */}
          {certs.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {certs.map((c) => (
                <span key={c.id} className="inline-flex items-center gap-2 rounded-full border border-brand-700/20 bg-surface px-3 py-1.5 text-xs font-medium text-brand-800">
                  <ShieldCheck className="h-3.5 w-3.5" /> {c.label}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {trustBand.points.map((p) => (
            <Reveal as="div" key={p.title} className="card h-full p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
