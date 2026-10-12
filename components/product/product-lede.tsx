"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/container";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * ProductLede — the compact editorial introduction that bridges the hero into the
 * signature product theatre on the SKU pages. A small label, a controlled headline
 * (prominent but subordinate to the hero H1), a concise supporting paragraph that
 * keeps the product's SEO definition, and a subtle gold rule. No cards, no numbered
 * benefits, no second packshot, no full-height sizing — it reads as an editorial
 * introduction, not another hero, and leads naturally into the theatre below.
 */
export function ProductLede({
  eyebrow,
  headline,
  body,
}: {
  eyebrow: string;
  headline: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: viewportOnce, transition: { duration: 0.55, ease: easeOutExpo, delay } };

  return (
    <Section className="py-14 lg:py-20">
      <div className="max-w-3xl">
        <motion.p className="eyebrow mb-4" {...rise(0)}>{eyebrow}</motion.p>
        <motion.h2 className="font-display text-h2 font-bold text-ink" {...rise(0.05)}>{headline}</motion.h2>
        <motion.span
          aria-hidden
          className="mt-5 block h-px w-20 origin-left bg-gradient-to-r from-gold-500 to-gold-500/0"
          {...(reduce ? {} : { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: viewportOnce, transition: { duration: 0.8, ease: easeOutExpo, delay: 0.12 } })}
        />
        <motion.p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft" {...rise(0.12)}>{body}</motion.p>
      </div>
    </Section>
  );
}
