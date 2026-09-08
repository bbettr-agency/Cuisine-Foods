"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PalmBotanical } from "@/components/palm/frond";

/**
 * PalmApplications — where Palm Olein works (supported page copy only). Large
 * words drift horizontally at two speeds as the visitor scrolls vertically,
 * while a single faint gold palm frond layer slowly crosses behind them. Clipped
 * (no horizontal scrollbar), not a ticker. Reduced-motion: still.
 */
export function PalmApplications({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["3%", "-16%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-16%", "3%"]);
  const frondX = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const frondRot = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  const Row = ({ x, filled }: { x: typeof x1; filled: boolean }) => (
    <motion.div style={reduce ? undefined : { x }} className="flex w-max flex-nowrap items-center gap-10 whitespace-nowrap">
      {[...items, ...items, ...items].map((label, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className={filled ? "font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl" : "font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl sf-outline"}>{label}</span>
          <span className="h-8 w-8 shrink-0 text-gold-500">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full"><path d="M12 21c0-6 0-10 6-14M12 21c0-6 0-10-6-14M12 21V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
          </span>
        </span>
      ))}
    </motion.div>
  );

  return (
    <section ref={ref} className="section relative overflow-hidden border-y border-line bg-paper" aria-label="Where Palm Olein is used">
      <motion.div
        aria-hidden
        className="palm-canopy pointer-events-none absolute -top-[30%] left-1/2 h-[150%] w-[120vw] -translate-x-1/2 opacity-[0.12]"
        style={reduce ? { ["--unfurl" as string]: 1 } : { ["--unfurl" as string]: 1, x: frondX, rotate: frondRot }}
      >
        <PalmBotanical className="h-full w-full" />
      </motion.div>
      <p className="container-x eyebrow relative mb-8">Where it's used</p>
      <div className="relative flex flex-col gap-3">
        <Row x={x1} filled />
        <Row x={x2} filled={false} />
      </div>
    </section>
  );
}
