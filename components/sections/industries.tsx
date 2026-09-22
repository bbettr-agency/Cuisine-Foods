"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { trust, hasTestimonials } from "@/config/trust";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/**
 * Industries – "Trusted across the trade". Rebuilt from passive pills into a
 * scroll-linked kinetic type moment, reusing the interaction DNA proven on the
 * Sunflower "Where it's used" strip (components/sunflower/kinetic-strip.tsx):
 * two rows of large display words drift horizontally in opposite directions,
 * driven by the section's LOCAL scroll progress (offset start-end → end-start).
 * Scroll down progresses it, scroll up reverses it, stopping stops it – no
 * ticker, no autoplay, no wheel-direction detection. Tighter/smaller than the
 * product-page version (it is an interaction moment, not a theatre) and it uses
 * NO product artwork. overflow-hidden keeps the drift off the document width.
 * Reduced-motion: the rows are perfectly still (all categories remain legible).
 */

// The homepage represents Cuisine's broader customer base (all real categories).
const TRADE = ["Restaurants", "Hotels", "Caterers", "Food Manufacturers", "Bakeries"];

function Row({ x, filled, live }: { x: MotionValue<string>; filled: boolean; live: boolean }) {
  return (
    <motion.div style={live ? { x } : undefined} className="flex w-max flex-nowrap items-center gap-6 whitespace-nowrap lg:gap-8">
      {[...TRADE, ...TRADE, ...TRADE].map((label, i) => (
        <span key={i} className="flex items-center gap-6 lg:gap-8">
          <span
            className={
              filled
                ? "font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
                : "font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl sf-outline"
            }
          >
            {label}
          </span>
          <span className="text-2xl text-gold-500 lg:text-3xl" aria-hidden>✦</span>
        </span>
      ))}
    </motion.div>
  );
}

export function Industries() {
  const reduce = useReducedMotion();
  // Mounted-gate: SSR / first client render / reduced-motion keep the rows in
  // their natural (x:0) static position – legible, no baked-in offset – and only
  // bind the scroll-linked drift once mounted with motion allowed.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["2%", "-16%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-16%", "2%"]);

  return (
    <section ref={ref} className="section overflow-hidden" aria-label="Trusted across the trade">
      <Container>
        <SectionHeading
          eyebrow="Trusted across the trade"
          title="The kitchens we keep running"
          intro="From independent restaurants to national franchise groups – we supply and collect across the food industry."
          align="center"
        />
      </Container>

      {/* Kinetic trade rows – full-bleed, scroll-linked, opposite directions */}
      <div className="mt-10 flex flex-col gap-2 lg:mt-12 lg:gap-3" aria-hidden>
        <Row x={x1} filled live={live} />
        <Row x={x2} filled={false} live={live} />
      </div>
      {/* Accessible, static list of the same categories for AT / no-motion parity */}
      <p className="sr-only">Industries served: {TRADE.join(", ")}.</p>

      {/* Progressive: real, consented client logos only – never placeholder brands */}
      {trust.clientLogos.length > 0 && (
        <Container>
          <RevealGroup className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {trust.clientLogos.map((c) => (
              <Reveal as="div" key={c.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.name} className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      )}

      {hasTestimonials() && (
        <Container>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trust.testimonials.filter((t) => t.enabled).map((t) => (
              <Reveal as="div" key={t.author} className="card p-6">
                <p className="text-sm leading-relaxed text-ink">“{t.quote}”</p>
                <p className="mt-4 text-sm font-semibold text-ink">{t.author}</p>
                <p className="text-xs text-ink-faint">{t.role}{t.location ? `, ${t.location}` : ""}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      )}
    </section>
  );
}
