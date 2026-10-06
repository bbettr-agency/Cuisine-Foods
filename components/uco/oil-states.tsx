"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * OilStates — the ownable UCO motif. Used cooking oil is the SAME gold liquid in a
 * second state: fresh gold oil → darkened after the fryer → collected → recovered
 * back toward clean gold (biodiesel). It is rendered as one continuous oil band
 * whose gradient changes state along its length — connecting to the homepage
 * gold-liquid language without repeating the Closed Loop ring.
 *
 * Restrained motion: the band's fill-clip wipes in on scroll (so the colour
 * "travels" through the states) and the stage labels settle. Mounted-gate renders
 * the finished band on SSR / reduced motion. Horizontal on sm+, a vertical gold
 * rail on mobile.
 */

const STAGES = [
  { label: "Fresh gold oil", sub: "delivered to your kitchen" },
  { label: "Used after the fryer", sub: "darker, but not waste" },
  { label: "We collect it", sub: "sealed drums, on schedule" },
  { label: "Recovered to biodiesel", sub: "a second life, not the drain" },
];

// Gold → deep amber (used) → back toward gold (recovered). Token-based.
const GRAD_STOPS = (
  <>
    <stop offset="0%" stopColor="rgb(var(--gold-300))" />
    <stop offset="34%" stopColor="rgb(var(--gold-800))" />
    <stop offset="62%" stopColor="rgb(var(--gold-600))" />
    <stop offset="100%" stopColor="rgb(var(--gold-400))" />
  </>
);

export function OilStates({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.6"] });
  const bandWidth = useTransform(scrollYProgress, [0, 0.9], [40, 1000]);
  const labelsO = useTransform(scrollYProgress, [0.3, 0.85], [0, 1]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Horizontal band (sm+) */}
      <div className="relative hidden sm:block">
        <svg viewBox="0 0 1000 120" fill="none" className="w-full" preserveAspectRatio="none" aria-hidden style={{ height: "clamp(72px, 10vw, 120px)" }}>
          <defs>
            <linearGradient id="uco-oil-grad" x1="0" y1="0" x2="1" y2="0">{GRAD_STOPS}</linearGradient>
            <clipPath id="uco-oil-reveal">
              <motion.rect x="0" y="0" height="120" style={live ? { width: bandWidth } : { width: 1000 }} />
            </clipPath>
          </defs>
          {/* faint full band so it's never empty */}
          <path d="M0 60 Q 250 36 500 60 T 1000 60 L1000 120 L0 120 Z" fill="rgb(var(--gold-500))" opacity={0.08} />
          {/* the oil, changing state, revealed left→right */}
          <g clipPath="url(#uco-oil-reveal)">
            <path d="M0 60 Q 250 36 500 60 T 1000 60 L1000 120 L0 120 Z" fill="url(#uco-oil-grad)" opacity={0.9} />
            <path d="M0 60 Q 250 36 500 60 T 1000 60" fill="none" stroke="rgb(var(--gold-200))" strokeWidth={1.5} opacity={0.5} />
          </g>
        </svg>

        <motion.ol className="mt-5 grid grid-cols-4 gap-4" style={live ? { opacity: labelsO } : undefined}>
          {STAGES.map((s, i) => (
            <li key={s.label} className="relative pl-4">
              <span
                className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: ["rgb(var(--gold-300))", "rgb(var(--gold-800))", "rgb(var(--gold-600))", "rgb(var(--gold-400))"][i] }}
                aria-hidden
              />
              <p className="font-display text-sm font-bold leading-tight text-ink">{s.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-faint">{s.sub}</p>
            </li>
          ))}
        </motion.ol>
      </div>

      {/* Vertical gold rail (mobile) */}
      <ol className="relative space-y-6 sm:hidden">
        <span
          aria-hidden
          className="absolute left-[5px] top-2 bottom-2 w-1 rounded-full"
          style={{ background: "linear-gradient(to bottom, rgb(var(--gold-300)), rgb(var(--gold-800)) 34%, rgb(var(--gold-600)) 62%, rgb(var(--gold-400)))" }}
        />
        {STAGES.map((s, i) => (
          <li key={s.label} className="relative pl-7">
            <span
              className="absolute left-0 top-1 h-3 w-3 rounded-full ring-4 ring-paper"
              style={{ backgroundColor: ["rgb(var(--gold-300))", "rgb(var(--gold-800))", "rgb(var(--gold-600))", "rgb(var(--gold-400))"][i] }}
              aria-hidden
            />
            <p className="font-display text-base font-bold leading-tight text-ink">{s.label}</p>
            <p className="mt-0.5 text-sm leading-snug text-ink-faint">{s.sub}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
