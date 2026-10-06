"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCw } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { home } from "@/config/home";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/**
 * ClosedLoop (V2B) — the supply + recovery story told as an actual LOOP, not a
 * process strip. Creative direction: OIL ITSELF. A single continuous gold oil
 * stream (the same gold-liquid language as the product pages) runs as a closed
 * ring; the five stages sit around it as editorial labels, and the stream
 * literally returns to its start — fresh oil in, used oil out, recovered, and
 * round again. The payoff lives in the middle of the loop. Below it, the two
 * commercial pathways remain the primary conversion, untouched in intent.
 *
 * No icon-in-circle → arrow → icon-in-circle strip. No timeline. No workflow UI.
 *
 * Motion is restrained: the loop draws once on scroll (scrubbed, so a fast scroll
 * still lands on the finished ring, never a half-drawn one), a faint oil-flow
 * drift suggests movement, and labels settle in. Reduced-motion / SSR render the
 * completed loop statically via a mounted-gate.
 */

// Five stages placed around the loop (percentages of the 900 × 520 SVG box),
// following the direction of flow from the top, clockwise, back to the top.
const STAGES: { label: string; x: number; y: number; side: "up" | "right" | "left" }[] = [
  { label: "Fresh oil delivered", x: 50, y: 14.4, side: "up" },
  { label: "You cook", x: 84.9, y: 37.7, side: "right" },
  { label: "Used oil out", x: 71.6, y: 75.3, side: "right" },
  { label: "We collect & pay", x: 28.4, y: 75.3, side: "left" },
  { label: "Recovered to biodiesel", x: 15.1, y: 37.7, side: "left" },
];

// A full ellipse (cx 450, cy 250, rx 330, ry 175) drawn as two arcs from the top,
// clockwise — so pathLength draws it the way the oil flows.
const LOOP_PATH = "M 450 75 A 330 175 0 1 1 450 425 A 330 175 0 1 1 450 75";

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

  return (
    <Section className="relative border-t border-line">
      <SectionHeading eyebrow={offersHeading.eyebrow} title={offersHeading.title} intro={offersHeading.body} align="center" />

      {/* ---- The loop ---- */}
      <div ref={ref} className="relative mx-auto mt-14 max-w-[760px]">
        {/* Desktop: the gold oil ring (needs room for the labels around it) */}
        <div className="relative hidden lg:block" style={{ aspectRatio: "900 / 520" }}>
          <svg viewBox="0 0 900 520" fill="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="loop-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgb(var(--gold-300))" />
                <stop offset="0.5" stopColor="rgb(var(--gold-500))" />
                <stop offset="1" stopColor="rgb(var(--gold-600))" />
              </linearGradient>
            </defs>
            {/* faint full ring behind (so the composition never looks broken) */}
            <path d={LOOP_PATH} stroke="rgb(var(--gold-500))" strokeOpacity={0.14} strokeWidth={2} />
            {/* the drawn oil stream */}
            <motion.path
              d={LOOP_PATH}
              stroke="url(#loop-gold)"
              strokeWidth={2.5}
              strokeLinecap="round"
              style={live ? { pathLength: draw } : { pathLength: 1 }}
            />
            {/* flowing oil droplets along the stream */}
            <path d={LOOP_PATH} className="oil-flow" stroke="rgb(var(--gold-300))" strokeOpacity={0.9} strokeWidth={3.5} />
          </svg>

          {/* center payoff */}
          <div className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="font-display text-2xl font-bold leading-tight text-ink">One account for both</p>
            <p className="mt-1.5 text-sm leading-snug text-ink-soft">the oil going in, and the oil coming out</p>
          </div>

          {/* stage labels on the ring */}
          {STAGES.map((s, i) => (
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
                    : s.side === "right"
                      ? "left-6 top-1/2 -translate-y-1/2"
                      : "right-6 top-1/2 -translate-y-1/2 text-right"
                }`}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tablet + mobile: a vertical oil stream that closes back on itself */}
        <ol className="relative mx-auto max-w-sm space-y-7 border-l-2 border-gold-500/40 pl-7 lg:hidden">
          {STAGES.map((s) => (
            <li key={s.label} className="relative">
              <span className="absolute -left-[37px] top-0.5 h-3.5 w-3.5 rounded-full bg-gold-500 ring-4 ring-paper" aria-hidden />
              <span className="font-display text-base font-semibold text-ink">{s.label}</span>
            </li>
          ))}
          <li className="relative pt-1">
            <span className="absolute -left-[41px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/15" aria-hidden>
              <RotateCw className="h-3 w-3 text-gold-700" />
            </span>
            <span className="text-sm font-medium text-ink-soft">and the cycle begins again</span>
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
