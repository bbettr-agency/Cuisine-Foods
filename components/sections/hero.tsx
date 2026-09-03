import { Phone } from "lucide-react";
import { home } from "@/config/home";
import { site } from "@/config/site";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { DrumImage } from "@/components/motion/drum-image";

/** Home hero — the 5-second decision: who/what/where/why-trust/next-action. */
export function Hero() {
  const { hero } = home;
  return (
    <section className="relative overflow-hidden">
      {/* soft brand wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgb(var(--brand-50)) 0%, transparent 60%), radial-gradient(50% 40% at 100% 10%, rgb(var(--gold-100) / 0.6) 0%, transparent 55%)",
        }}
      />
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">{hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-display-lg text-ink">{hero.h1}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.subhead}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={hero.primary.href} variant="primary" size="lg">
                {hero.primary.label}
              </Button>
              <Button href={hero.secondary.href} variant="dark" size="lg">
                {hero.secondary.label}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
              <a href={whatsappUrl(whatsappPrefill.general)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:text-ink">
                <span className="text-gold-600">◍</span> {cta.whatsapp}
              </a>
              <a href={telUrl} className="inline-flex items-center gap-2 font-medium hover:text-ink">
                <Phone className="h-4 w-4 text-brand-600" /> {site.contact.phone.display}
              </a>
              <span className="text-ink-faint">Gauteng &amp; Western Cape</span>
            </div>
          </Reveal>
        </div>

        {/* The three products are the hero object — physical pails on the page,
            intentionally composed with depth (cooking oil forward & centre,
            palm and sunflower set back to either side). Each is the rest anchor
            for the product that travels into the lineup below; the static renders
            here become the live travelling overlay once the journey hydrates.

            Desktop shows the full three-product composition; mobile keeps the
            original single-product hero (see below). */}
        <Reveal delay={0.1} className="lg:pl-2">
          {/* ---- Desktop composition (lg+) ----
              Each product's OUTER box is the positioned anchor the overlay
              measures; the idle float lives on an INNER wrapper so the float's
              transform never fights the positioning transform. */}
          <div className="relative mx-auto hidden h-[420px] w-full max-w-[520px] [perspective:1400px] lg:block xl:h-[460px]">
            {/* Palm — left, set back */}
            <div id="hero-palm" className="absolute bottom-6 left-0 z-10 w-[43%]">
              <div className="drum-float" style={{ animationDelay: "-1.2s" }}>
                <DrumImage id="palm" staticFor="hero" sizes="240px" />
              </div>
            </div>
            {/* Sunflower — right, set back */}
            <div id="hero-sunflower" className="absolute bottom-6 right-0 z-20 w-[43%]">
              <div className="drum-float" style={{ animationDelay: "-3.4s" }}>
                <DrumImage id="sunflower" staticFor="hero" sizes="240px" />
              </div>
            </div>
            {/* Cooking oil — centre, forward & larger */}
            <div id="hero-cooking" className="absolute bottom-0 left-1/2 z-30 w-[54%] -translate-x-1/2">
              <div className="drum-float">
                <DrumImage id="cooking" staticFor="hero" priority sizes="300px" />
              </div>
            </div>
          </div>

          {/* ---- Mobile hero (unchanged behaviour: a single travelling product
                 that falls into the top lineup card — palm) ---- */}
          <div
            id="hero-mobile"
            className="mx-auto w-[58%] max-w-[280px] [perspective:1200px] sm:w-[46%] lg:hidden"
          >
            <DrumImage id="palm" staticFor="hero-mobile" priority className="drum-float" sizes="(max-width: 1024px) 52vw, 280px" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
