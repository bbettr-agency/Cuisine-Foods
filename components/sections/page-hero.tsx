import { Phone } from "lucide-react";
import { telUrl, whatsappUrl, whatsappPrefill, cta } from "@/config/conversion";
import type { CtaIntent } from "@/config/conversion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";

/** Interior page hero — reused by product, buyer, UCO, pillar and location pages. */
export function PageHero({
  eyebrow,
  h1,
  subhead,
  imageId,
  crumbs,
  intent = "general",
  primaryLabel,
  primaryHref,
}: {
  eyebrow: string;
  h1: string;
  subhead: string;
  imageId?: string;
  crumbs: Crumb[];
  intent?: CtaIntent;
  primaryLabel: string;
  primaryHref?: string;
}) {
  const waMsg = intent === "uco" ? whatsappPrefill.uco : intent === "supply" ? whatsappPrefill.supply : whatsappPrefill.general;
  const href = primaryHref ?? `/request-a-quote?intent=${intent}`;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 60% at 10% 0%, rgb(var(--brand-50)) 0%, transparent 60%)" }}
      />
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
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
              <Button href={whatsappUrl(waMsg)} variant="whatsapp" size="lg" external>{cta.whatsapp}</Button>
              <a href={telUrl} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink">
                <Phone className="h-4 w-4 text-brand-600" /> {cta.call}
              </a>
            </div>
          </Reveal>
        </div>
        {imageId && (
          <Reveal delay={0.1}>
            <PlaceholderImage id={imageId} sizes="(max-width: 1024px) 100vw, 42vw" className="shadow-soft" />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
