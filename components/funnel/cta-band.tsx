import { Phone } from "lucide-react";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { trust } from "@/config/trust";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { CtaIntent } from "@/config/conversion";

/** Closing CTA band — repeats the primary conversion with a response-time promise. */
export function CtaBand({
  title = "Ready for a supplier that does both?",
  body = "Get a bulk oil quote or arrange a free used-oil collection today. No obligation, no lock-in.",
  intent = "general",
  primaryLabel,
  primaryHref = "/request-a-quote",
}: {
  title?: string;
  body?: string;
  intent?: CtaIntent;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  const waMsg = intent === "uco" ? whatsappPrefill.uco : intent === "supply" ? whatsappPrefill.supply : whatsappPrefill.general;
  const label = primaryLabel ?? (intent === "uco" ? cta.ucoArrange : cta.quote);

  return (
    <section className="section">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[1.5rem] bg-brand-800 px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 20%, rgb(var(--gold-500) / 0.25), transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-h2 text-paper">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-100">{body}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primaryHref} variant="gold" size="lg">
                {label}
              </Button>
              <Button href={whatsappUrl(waMsg)} variant="whatsapp" size="lg" external>
                {cta.whatsapp}
              </Button>
              <Button href={telUrl} variant="ghost" size="lg" className="text-paper hover:bg-white/10">
                <Phone className="h-4 w-4" /> {cta.call}
              </Button>
            </div>
            {trust.responseTime.enabled && trust.responseTime.text && (
              <p className="mt-5 text-sm text-brand-100/80">{trust.responseTime.text}</p>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
