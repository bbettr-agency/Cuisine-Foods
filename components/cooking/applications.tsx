"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { MaskUp } from "@/components/sunflower/motion-kit";

type App = { title: string; body: string };

/**
 * CookingApplications — the escaped botanical points to where the oil goes. A
 * gold branch draws across the top and a small leaf node terminates over each
 * card as it reveals: branch → card → branch → card. Resolves immediately on a
 * fast scroll (whileInView, no scroll choreography). Reduced-motion: all shown.
 */
export function CookingApplications({ heading, items }: { heading: string; items: App[] }) {
  const reduce = useReducedMotion();
  return (
    <section className="section" aria-label="Where our cooking oil goes">
      <Container>
        <p className="eyebrow mb-3">Where it goes</p>
        <h2 className="text-h2 text-ink"><MaskUp as="span">{heading}</MaskUp></h2>

        <div className="relative mt-12">
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
                {/* the leaf node where the branch reaches this card */}
                <span aria-hidden className="absolute -top-[11px] left-6 hidden lg:block">
                  <svg viewBox="-14 -20 28 28" className="h-5 w-5 rounded-full bg-surface-2">
                    <path d="M0 6 C 9 -4, 6 -16, 0 -20 C -6 -16, -9 -4, 0 6 Z" fill="none" stroke="rgb(var(--gold-600))" strokeWidth={1.4} strokeLinejoin="round" />
                    <path d="M0 6 L0 -18" stroke="rgb(var(--gold-600))" strokeWidth={1} strokeLinecap="round" />
                  </svg>
                </span>
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
