import { Check, ShieldCheck } from "lucide-react";
import { trustBand } from "@/config/commercial";
import { enabledCerts } from "@/config/trust";
import { cta, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import type { CtaIntent } from "@/config/conversion";
import { Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

/**
 * Mid-page trust band — real operations photography + the closed-loop
 * differentiator + reliability/objection proof + progressive certifications +
 * an inline CTA. The conversion anchor on commercial pages: it answers the
 * "can I trust this supplier?" question in one screen.
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
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        {/* Real operations photography — proves the fleet, the team, the scale */}
        <Reveal className="order-2 lg:order-1">
          <PlaceholderImage id="trust-operations" sizes="(max-width: 1024px) 100vw, 46vw" className="shadow-soft" />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-3">{trustBand.eyebrow}</p>
            <h2 className="text-h2 text-ink">{trustBand.headline}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{trustBand.differentiator}</p>
          </Reveal>

          <RevealGroup className="mt-7 space-y-4">
            {trustBand.points.map((p) => (
              <Reveal as="div" key={p.title} className="flex gap-3.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon name={p.icon} className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{p.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
              {trustBand.reassurances.map((r) => (
                <li key={r} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  <Check className="h-4 w-4 text-brand-600" /> {r}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
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
        </div>
      </div>
    </Section>
  );
}
