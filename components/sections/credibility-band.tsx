"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { openHubs, allHubs, coverage } from "@/config/coverage";

/**
 * CredibilityBand (V2) – national proof band under "Our Cooking Oils".
 * A hierarchy of verified signals: history (since 2009), regional-hub presence
 * (figure DERIVED from config/coverage.ts so it is never hard-coded and never
 * overstates open hubs while KZN is coming-soon), nationwide coverage, and
 * family ownership. No certification/licence claims (unverified). Cream/warm
 * visual system. Motion: mounted-gate + inherited variants (SSR/reduced = static).
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;
  const trigger = live ? { initial: "hidden" as const, whileInView: "show" as const, viewport: viewportOnce } : {};

  // Status-driven hub figure — honest while KZN is coming-soon, correct when open.
  const open = openHubs();
  const total = allHubs();
  const allOpen = open.length === total.length;
  const hubFigure = String(allOpen ? total.length : open.length).padStart(2, "0");
  const openNames = open.map((h) => h.name);
  const comingNames = coverage.hubs.filter((h) => h.status === "coming-soon").map((h) => h.name);
  const hubSub = allOpen
    ? total.map((h) => h.name).join(" · ")
    : `${openNames.join(" & ")}${comingNames.length ? ` – ${comingNames.join(", ")} opening soon` : ""}`;

  const supporting = [
    { k: "Nationwide", v: "Supply & collection across South Africa" },
    { k: "Family-owned", v: "Proudly South African since 2009" },
  ];

  return (
    <section className="border-y border-line bg-surface-2" aria-label="Why Cuisine Foods can be trusted">
      <Container className="py-12 lg:py-16">
        <motion.div {...trigger} variants={container} className="grid gap-x-10 gap-y-10 lg:grid-cols-[1.25fr_0.95fr_1.1fr] lg:items-center">
          {/* PRIMARY – history */}
          <div>
            <p className="eyebrow mb-2">Since</p>
            <div className="overflow-hidden">
              <motion.div variants={live ? rise : undefined} className="font-display text-[68px] font-bold leading-[0.9] tracking-tight text-ink lg:text-[96px]">
                2009
              </motion.div>
            </div>
            <p className="mt-3 max-w-[24ch] text-sm leading-snug text-ink-soft">Serving South African kitchens for over 15 years.</p>
          </div>

          {/* SECONDARY – regional hub presence (derived from coverage status) */}
          <div className="lg:border-l lg:border-line lg:pl-10">
            <p className="eyebrow mb-2">Regional hubs</p>
            <div className="flex items-end gap-3">
              <div className="overflow-hidden">
                <motion.div variants={live ? rise : undefined} className="font-display text-[68px] font-bold leading-[0.9] tracking-tight text-gold-600 lg:text-[96px]">
                  {hubFigure}
                </motion.div>
              </div>
              <motion.span
                aria-hidden
                variants={live ? draw : undefined}
                className="mb-4 hidden h-[3px] w-14 origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-500/0 lg:block"
              />
            </div>
            <p className="mt-3 max-w-[26ch] text-sm leading-snug text-ink-soft">{hubSub}</p>
          </div>

          {/* SUPPORTING – nationwide coverage + ownership */}
          <div className="grid grid-cols-2 gap-6 lg:border-l lg:border-line lg:pl-10">
            {supporting.map((item) => (
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
