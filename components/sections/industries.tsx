import { trust, hasTestimonials } from "@/config/trust";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { KineticStrip } from "@/components/shared/kinetic-strip";

/**
 * Industries — "Trusted across the trade". The homepage instance of the site-wide
 * KineticStrip motif (components/shared/kinetic-strip.tsx), plus progressive,
 * consent-gated client logos / testimonials that render only when real data
 * exists. The homepage represents Cuisine's broader customer base.
 */
const TRADE = ["Restaurants", "Hotels", "Caterers", "Franchises", "Food Manufacturers", "Commercial Kitchens"];

export function Industries() {
  return (
    <>
      <KineticStrip
        eyebrow="Trusted across the trade"
        title="The kitchens we keep running"
        intro="From independent restaurants to national franchise groups – we supply and collect across the food industry."
        items={TRADE}
        tone="surface-2"
        className="border-t border-line"
      />

      {(trust.clientLogos.length > 0 || hasTestimonials()) && (
        <Container className="pb-16 lg:pb-24">
          {trust.clientLogos.length > 0 && (
            <RevealGroup className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {trust.clientLogos.map((c) => (
                <Reveal as="div" key={c.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.name} className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
                </Reveal>
              ))}
            </RevealGroup>
          )}
          {hasTestimonials() && (
            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trust.testimonials.filter((t) => t.enabled).map((t) => (
                <Reveal as="div" key={t.author} className="card p-6">
                  <p className="text-sm leading-relaxed text-ink">“{t.quote}”</p>
                  <p className="mt-4 text-sm font-semibold text-ink">{t.author}</p>
                  <p className="text-xs text-ink-faint">{t.role}{t.location ? `, ${t.location}` : ""}</p>
                </Reveal>
              ))}
            </RevealGroup>
          )}
        </Container>
      )}
    </>
  );
}
