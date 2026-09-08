"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * KineticStrip — large kinetic typography of where Sunflower Oil is used
 * (from supported page copy only). As the visitor scrolls VERTICALLY, two rows
 * drift horizontally in opposite directions at a restrained rate. No horizontal
 * scrollbar, not a ticker. Reduced-motion: perfectly still.
 */
export function KineticStrip({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["2%", "-14%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-14%", "2%"]);

  const Row = ({ x, filled }: { x: typeof x1; filled: boolean }) => (
    <motion.div
      style={reduce ? undefined : { x }}
      className="flex w-max flex-nowrap items-center gap-8 whitespace-nowrap"
    >
      {[...items, ...items, ...items].map((label, i) => (
        <span key={i} className="flex items-center gap-8">
          <span
            className={
              filled
                ? "font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
                : "font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl sf-outline"
            }
          >
            {label}
          </span>
          <span className="text-3xl text-gold-500">✦</span>
        </span>
      ))}
    </motion.div>
  );

  return (
    <section ref={ref} className="section overflow-hidden border-y border-line bg-paper" aria-label="Where Sunflower Oil is used">
      <p className="container-x eyebrow mb-8">Where it's used</p>
      <div className="flex flex-col gap-3">
        <Row x={x1} filled />
        <Row x={x2} filled={false} />
      </div>
    </section>
  );
}
