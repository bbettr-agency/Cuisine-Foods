"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/**
 * CredibilityBand – the proof band under "Our Cooking Oils". Replaces the old
 * four-equal-column stat strip with a hierarchy: a large primary anchor
 * (SINCE 2009), a secondary presence figure (02 branches) and two supporting
 * credibility statements (family-owned · licensed). Facts mirror the enabled
 * items in config/trust.ts – history, presence, ownership, compliance. Existing
 * cream/white/gold visual system only (no colour-flow redesign in this pass).
 *
 * Motion: the (un-clipped) grid is the scroll trigger – its children animate via
 * inherited variants, so the masked figures never observe their own clipped box
 * (which would deadlock whileInView). A masked rise on the big figures, a gold
 * rule that draws, a small stagger on the supporting lines. Reduced-motion: static.
 */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const rise: Variants = {
  hidden: { y: 120 },
  show: { y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
};
const draw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: easeOutExpo } },
};

export function CredibilityBand() {
  const reduce = useReducedMotion();
  // Mounted-gate: SSR and the first client render are the static (visible) state,
  // so there is no hydration mismatch and reduced-motion never gets stuck in a
  // baked-in "hidden" variant. We upgrade to the animated reveal only after mount
  // when motion is allowed – and this section is below the fold, so no flash.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;
  const trigger = live ? { initial: "hidden" as const, whileInView: "show" as const, viewport: viewportOnce } : {};

  return (
    <section className="border-y border-line bg-surface" aria-label="Why Cuisine Foods can be trusted">
      <Container className="py-12 lg:py-16">
        <motion.div {...trigger} variants={container} className="grid gap-x-10 gap-y-10 lg:grid-cols-[1.25fr_0.85fr_1.1fr] lg:items-center">
          {/* PRIMARY – history */}
          <div>
            <p className="eyebrow mb-2">Since</p>
            <div className="overflow-hidden">
              <motion.div variants={live ? rise : undefined} className="font-display text-[68px] font-bold leading-[0.9] tracking-tight text-ink lg:text-[96px]">
                2009
              </motion.div>
            </div>
            <p className="mt-3 max-w-[22ch] text-sm leading-snug text-ink-soft">Serving South African kitchens for over 15 years.</p>
          </div>

          {/* SECONDARY – presence */}
          <div className="lg:border-l lg:border-line lg:pl-10">
            <p className="eyebrow mb-2">Branches</p>
            <div className="flex items-end gap-3">
              <div className="overflow-hidden">
                <motion.div variants={live ? rise : undefined} className="font-display text-[68px] font-bold leading-[0.9] tracking-tight text-gold-600 lg:text-[96px]">
                  02
                </motion.div>
              </div>
              <motion.span
                aria-hidden
                variants={live ? draw : undefined}
                className="mb-4 hidden h-[3px] w-14 origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-500/0 lg:block"
              />
            </div>
            <p className="mt-3 max-w-[22ch] text-sm leading-snug text-ink-soft">Gauteng &amp; the Western Cape – close to your kitchen.</p>
          </div>

          {/* SUPPORTING – ownership + compliance */}
          <div className="grid grid-cols-2 gap-6 lg:border-l lg:border-line lg:pl-10">
            {[
              { k: "Family-owned", v: "Proudly South African" },
              { k: "Licensed", v: "Compliant UCO collection" },
            ].map((item) => (
              <motion.div key={item.k} variants={live ? fade : undefined}>
                <span aria-hidden className="mb-3 block h-px w-8 bg-gold-500/70" />
                <p className="font-display text-lg font-bold leading-tight text-ink">{item.k}</p>
                <p className="mt-1 text-sm leading-snug text-ink-soft">{item.v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
