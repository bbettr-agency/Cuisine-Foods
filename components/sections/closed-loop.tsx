"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowDownRight, Check } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { home } from "@/config/home";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/**
 * ClosedLoop (V3) — the supply + recovery story told as a single continuous gold
 * oil stream (the same gold-liquid language as the product pages). Creative
 * direction: OIL ITSELF.
 *
 * ONE-WAY FLOW (corrected): the stream has a clear beginning (fresh oil in) and a
 * clear end (recovered for biodiesel). It is deliberately NOT a closed ring —
 * used cooking oil recovered for biodiesel does not become fresh edible oil
 * again, so the stream must never visually reconnect the biodiesel stage back to
 * the fresh-oil stage. The arc is drawn 270° (top → right → bottom → left),
 * leaving the top-left quadrant open, and a subtle outward arrow at the final
 * stage signals that the recovered oil moves onward into the biodiesel supply
 * chain — it exits, it doesn't loop. "One account for both" (supply + collection)
 * is the payoff in the middle. Below, the two commercial pathways are unchanged.
 *
 * Motion is restrained: the stream draws once on scroll (scrubbed, so a fast
 * scroll still lands on the finished arc, never a half-drawn one), the onward
 * arrow settles in at the end, a faint oil-flow drift suggests one-way movement,
 * and labels fade in. Reduced-motion / SSR render the completed arc statically
 * via a mounted-gate. No workflow UI, no timeline, no reset.
 */

// The four stages placed along the open arc (percentages of the 900 × 520 SVG
// box), following the direction of flow from the top, clockwise, to the left —
// where the stream ends and moves onward into the biodiesel supply chain.
const STAGES: { label: string; x: number; y: number; side: "up" | "right" | "down" | "left"; onward?: boolean }[] = [
  { label: "Fresh oil delivered", x: 50, y: 14.4, side: "up" },
  { label: "You cook", x: 86.7, y: 48.1, side: "right" },
  { label: "We collect & pay", x: 50, y: 81.7, side: "down" },
  { label: "Recovered for biodiesel", x: 13.3, y: 48.1, side: "left", onward: true },
];

// An OPEN arc: three quarter-arcs of the ellipse (cx 450, cy 250, rx 330, ry 175),
// from the top (450 75) clockwise to the left (120 250). The top-left quadrant is
// intentionally left undrawn so the flow never returns to its start.
const FLOW_PATH = "M 450 75 A 330 175 0 0 1 780 250 A 330 175 0 0 1 450 425 A 330 175 0 0 1 120 250";

// A short tangential wisp that continues PAST the final stage and exits outward
// (left / slightly down — away from the fresh-oil stage), with an arrowhead:
// "onward into the biodiesel supply chain", not back round.
const ONWARD_SHAFT = "M 120 250 L 46 263";
const ONWARD_HEAD = "M 57 267 L 46 263 L 55 256";

export function ClosedLoop() {
  const { offersHeading, offers } = home;

  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center center"] });
  const draw = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const labelsO = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);
  const exitO = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);

  return (
    <Section className="relative border-t border-line">
      <SectionHeading eyebrow={offersHeading.eyebrow} title={offersHeading.title} intro={offersHeading.body} align="center" />

      {/* ---- The one-way oil stream ---- */}
      <div ref={ref} className="relative mx-auto mt-14 max-w-[760px]">
        {/* Desktop: the gold oil stream (needs room for the labels around it) */}
        <div className="relative hidden lg:block" style={{ aspectRatio: "900 / 520" }}>
          <svg viewBox="0 0 900 520" fill="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="loop-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgb(var(--gold-300))" />
                <stop offset="0.5" stopColor="rgb(var(--gold-500))" />
                <stop offset="1" stopColor="rgb(var(--gold-600))" />
              </linearGradient>
            </defs>
            {/* faint open arc behind (so the composition reads intentionally open, never broken) */}
            <path d={FLOW_PATH} stroke="rgb(var(--gold-500))" strokeOpacity={0.14} strokeWidth={2} />
            {/* the drawn oil stream */}
            <motion.path
              d={FLOW_PATH}
              stroke="url(#loop-gold)"
              strokeWidth={2.5}
              strokeLinecap="round"
              style={live ? { pathLength: draw } : { pathLength: 1 }}
            />
            {/* flowing oil droplets along the stream (one-way) */}
            <path d={FLOW_PATH} className="oil-flow" stroke="rgb(var(--gold-300))" strokeOpacity={0.9} strokeWidth={3.5} />
            {/* onward wisp + arrowhead: the recovered oil exits toward the biodiesel supply chain */}
            <motion.g
              stroke="rgb(var(--gold-600))"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={live ? { opacity: exitO } : { opacity: 1 }}
            >
              <path d={ONWARD_SHAFT} />
              <path d={ONWARD_HEAD} fill="none" />
            </motion.g>
          </svg>

          {/* center payoff */}
          <div className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="font-display text-2xl font-bold leading-tight text-ink">One account for both</p>
            <p className="mt-1.5 text-sm leading-snug text-ink-soft">the oil going in, and the oil coming out</p>
          </div>

          {/* stage labels on the stream */}
          {STAGES.map((s) => (
            <motion.div
              key={s.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%`, ...(live ? { opacity: labelsO } : undefined) }}
            >
              <span className="relative flex items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-gold-500 ring-4 ring-paper" />
              </span>
              <span
                className={`absolute whitespace-nowrap font-display text-[15px] font-semibold text-ink ${
                  s.side === "up"
                    ? "bottom-5 left-1/2 -translate-x-1/2"
                    : s.side === "down"
                      ? "top-5 left-1/2 -translate-x-1/2"
                      : s.side === "right"
                        ? "left-6 top-1/2 -translate-y-1/2"
                        : "right-6 top-1/2 -translate-y-1/2 text-right"
                }`}
              >
                {s.label}
                {s.onward && (
                  <span className="mt-1 flex items-center justify-end gap-1 text-[11px] font-medium text-ink-faint">
                    onward to the biodiesel supply chain <ArrowDownRight className="h-3 w-3 shrink-0" aria-hidden />
                  </span>
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tablet + mobile: a vertical oil stream with a clear start and a one-way exit */}
        <ol className="relative mx-auto max-w-sm space-y-7 border-l-2 border-gold-500/40 pl-7 lg:hidden">
          {STAGES.map((s) => (
            <li key={s.label} className="relative">
              <span className="absolute -left-[37px] top-0.5 h-3.5 w-3.5 rounded-full bg-gold-500 ring-4 ring-paper" aria-hidden />
              <span className="font-display text-base font-semibold text-ink">{s.label}</span>
            </li>
          ))}
          <li className="relative pt-1">
            <span className="absolute -left-[41px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/15" aria-hidden>
              <ArrowDownRight className="h-3 w-3 text-gold-700" />
            </span>
            <span className="text-sm font-medium text-ink-soft">onward into the biodiesel supply chain</span>
          </li>
        </ol>
      </div>

      {/* ---- The two commercial pathways (primary conversion) ---- */}
      <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
        {offers.map((o) => (
          <Reveal as="div" key={o.intent} className="card flex flex-col p-7 transition-shadow duration-200 hover:shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-bold text-ink">{o.title}</h3>
            <p className="mt-2 text-ink-soft">{o.body}</p>
            <ul className="mt-5 space-y-2.5">
              {o.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {o.productLinks.map((pl) => (
                <Link
                  key={pl.href}
                  href={pl.href}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {pl.label}
                </Link>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-4 pt-1">
              <Button href={o.href} variant={o.intent === "uco" ? "gold" : "primary"}>
                {o.cta}
              </Button>
              <Link href={o.href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2">
                Details <ArrowRight className="h-4 w-4 transition-all" />
              </Link>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
