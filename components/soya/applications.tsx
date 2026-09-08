"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { MaskUp } from "@/components/sunflower/motion-kit";

type App = { title: string; body: string };

/**
 * SoyaApplications — where Soya works (supported copy only), as cards connected
 * by a gold flow line that draws through them as the section enters: card,
 * flow, card, flow… It resolves quickly on view — a fast scroll simply lands
 * everything. Reduced-motion: all shown, static.
 */
export function SoyaApplications({ heading, items }: { heading: string; items: App[] }) {
  const reduce = useReducedMotion();
  return (
    <section className="section" aria-label="Where Soya Oil is used">
      <Container>
        <p className="eyebrow mb-3">Where it's used</p>
        <h2 className="text-h2 text-ink"><MaskUp as="span">{heading}</MaskUp></h2>

        <div className="relative mt-12">
          {/* the gold flow line that draws through the cards */}
          <motion.div
            aria-hidden
            className="absolute left-0 top-[26px] hidden h-[2px] origin-left rounded-full bg-gradient-to-r from-gold-500 via-gold-500 to-gold-500/0 lg:block"
            style={{ width: "100%" }}
            initial={reduce ? undefined : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: easeOutExpo }}
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {items.map((a, i) => (
              <motion.li
                key={a.title}
                className="relative rounded-[var(--radius)] border border-line bg-surface p-6 lg:pt-9"
                initial={reduce ? undefined : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: reduce ? 0 : 0.18 + i * 0.16 }}
              >
                <span aria-hidden className="absolute -top-[7px] left-6 hidden h-3.5 w-3.5 rounded-full bg-gold-500 ring-4 ring-surface-2 lg:block" />
                <h3 className="font-display text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
