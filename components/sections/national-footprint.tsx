"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { allHubs, type Hub } from "@/config/coverage";

/**
 * NationalFootprint (V2B) — the homepage's SECONDARY signature experience (the
 * three-drum journey remains #1). Creative direction: SOUTH AFRICA AS EDITORIAL
 * GOLD LINEWORK — the country itself is the primary object, drawn in the same
 * fine gold line language as the product botanicals, on ink. As the section
 * scrolls, the outline resolves, gold coverage spreads THROUGH the country
 * (not lines drawn between offices), the regional hubs establish as real places
 * (Western Cape → Gauteng → KwaZulu-Natal), and it resolves to "Nationwide".
 *
 * The idea is REGIONAL INFRASTRUCTURE → NATIONAL COVERAGE, never a node network.
 *
 * Engineering: a real low-resolution SA contour (outer coast + the Lesotho
 * enclave, which makes the shape unmistakable) as a single inline path — no map
 * library, no canvas, ~1.3KB of geometry. Driven by LOCAL scroll progress. A
 * mounted-gate renders the finished static composition on SSR / reduced-motion
 * (full outline, coverage, all hubs, resolve), so the content never depends on
 * motion and there is no hydration mismatch. The hub LEGEND is server-rendered
 * factual content with real province links — open hubs link to their page, the
 * coming-soon hub is shown honestly ("Opening soon") and not linked. Flipping a
 * hub's status to "open" in config/coverage.ts resolves this to its full state
 * with no redesign.
 */

// A real, low-res South Africa contour (equirectangular, cos-corrected) projected
// into a 1000 × 878.2 box. Two subpaths: the coastline + the Lesotho enclave hole.
const SA_VIEW = "0 0 1000 878.2";
const SA_PATH =
  "M 920.6 494.4 L 908.7 504.4 L 883.0 539.5 L 866.1 574.9 L 831.7 624.3 L 763.1 695.5 L 720.3 736.9 L 674.5 768.3 L 611.1 795.1 L 580.2 798.7 L 572.4 817.8 L 535.5 807.6 L 505.5 820.8 L 439.7 807.5 L 403.0 815.9 L 377.9 812.3 L 315.3 839.5 L 263.5 850.4 L 226.0 876.5 L 198.4 878.2 L 172.8 853.6 L 152.3 852.3 L 126.2 821.5 L 123.3 831.1 L 115.2 812.5 L 115.6 772.1 L 95.9 725.8 L 115.4 713.3 L 113.8 660.3 L 74.1 595.7 L 43.6 537.3 L 43.6 537.1 L 0.0 447.5 L 29.1 413.3 L 53.0 432.2 L 63.2 461.7 L 90.5 466.8 L 128.6 479.8 L 161.2 474.8 L 215.3 439.5 L 215.4 184.7 L 231.8 195.0 L 267.7 260.6 L 262.1 302.6 L 275.7 326.9 L 319.1 319.8 L 349.5 289.0 L 378.2 268.3 L 393.0 235.2 L 422.6 219.2 L 448.2 227.6 L 477.2 246.9 L 526.5 250.3 L 565.3 234.3 L 571.5 212.8 L 582.1 179.7 L 615.1 174.2 L 633.4 148.3 L 653.6 102.3 L 708.0 50.8 L 793.9 0.0 L 818.6 0.8 L 847.9 12.4 L 868.4 4.2 L 900.6 11.1 L 929.7 108.2 L 945.4 157.2 L 934.6 234.1 L 939.8 258.9 L 909.2 246.2 L 891.7 251.2 L 885.9 271.2 L 869.4 297.2 L 869.9 321.0 L 906.1 358.4 L 941.6 351.0 L 954.0 320.3 L 1000.0 320.9 L 984.8 371.1 L 977.7 428.4 L 962.0 459.6 L 920.6 494.4 Z M 766.3 473.6 L 739.9 452.4 L 711.5 466.4 L 678.6 493.4 L 646.3 537.1 L 691.8 590.2 L 713.5 583.3 L 724.7 561.3 L 758.5 550.5 L 768.8 528.0 L 787.4 494.4 L 766.3 473.6 Z";

// Hub marker positions, as a percentage of the SA box (geographically projected).
// `side` places the decorative on-map label so it never crosses the coastline.
const MAP: Record<Hub["id"], { x: number; y: number; side: "right" | "left" }> = {
  gauteng: { x: 71.85, y: 29.61, side: "right" },
  "kwazulu-natal": { x: 88.29, y: 54.28, side: "left" },
  "western-cape": { x: 12.59, y: 92.95, side: "right" },
};

// Scroll windows (fractions of local progress) for each hub's establishment.
const REVEAL: Record<Hub["id"], [number, number]> = {
  "western-cape": [0.3, 0.42],
  gauteng: [0.4, 0.52],
  "kwazulu-natal": [0.5, 0.62],
};

function hubCity(h: Hub): string {
  return h.status === "open" ? h.address?.city ?? "Regional hub" : "Opening soon";
}

export function NationalFootprint() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Country resolves from the ink, then gold coverage spreads through it.
  const outline = useTransform(scrollYProgress, [0.08, 0.4], [0, 1]);
  const fillOpacity = useTransform(scrollYProgress, [0.3, 0.64], [0, 0.14]);
  const glowOpacity = useTransform(scrollYProgress, [0.32, 0.7], [0, 0.5]);
  const glowScale = useTransform(scrollYProgress, [0.32, 0.72], [0.45, 1]);

  // Per-hub establishment (opacity + a small settle).
  const wcO = useTransform(scrollYProgress, REVEAL["western-cape"], [0, 1]);
  const gpO = useTransform(scrollYProgress, REVEAL.gauteng, [0, 1]);
  const kznO = useTransform(scrollYProgress, REVEAL["kwazulu-natal"], [0, 1]);
  const hubO: Record<Hub["id"], typeof wcO> = { "western-cape": wcO, gauteng: gpO, "kwazulu-natal": kznO };

  const resolveO = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);
  const resolveY = useTransform(scrollYProgress, [0.62, 0.82], [20, 0]);
  const legendO = useTransform(scrollYProgress, [0.2, 0.5], [0.25, 1]);

  const hubs = allHubs();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink text-paper"
      aria-label="Cuisine Foods across South Africa"
    >
      {/* Top edge: the credibility band's warm surface deepens into ink, so the
          move from commercial proof to national scale reads as one continuous
          descent rather than a hard cut. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface-2/90 to-transparent opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-500/40" />

      <Container className="relative py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow !text-gold-400">Our national network</p>
          <h2 className="mt-4 text-display font-bold text-paper">
            One supplier, the length of the country.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
            From the Cape to the Highveld to the KwaZulu-Natal coast, Cuisine Foods keeps commercial
            kitchens supplied with fresh oil and collected from — run from regional hubs, close to the
            ground.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14">
          {/* ---- Legend: server-rendered facts + links (the semantic content) ---- */}
          <motion.ol
            className="order-2 flex flex-col gap-5 lg:order-1"
            style={live ? { opacity: legendO } : undefined}
          >
            {hubs.map((h) => {
              const open = h.status === "open";
              const Row = (
                <>
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      open ? "bg-gold-500" : "border border-dashed border-gold-400/70"
                    }`}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="font-display text-lg font-bold text-paper">{h.name}</span>
                      {open && (
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </span>
                    <span className={`mt-0.5 block text-sm ${open ? "text-brand-100/80" : "text-gold-300/90"}`}>
                      {open ? h.address?.city ?? "Regional hub" : "Opening soon"}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={h.id} className="border-t border-paper/10 pt-5 first:border-t-0 first:pt-0">
                  {open ? (
                    <Link href={`/${h.provinceSlug}`} className="group flex gap-3 outline-none">
                      {Row}
                    </Link>
                  ) : (
                    <div className="flex gap-3">{Row}</div>
                  )}
                </li>
              );
            })}
          </motion.ol>

          {/* ---- The country, in gold linework ---- */}
          <figure className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:max-w-[600px]">
            <div className="relative" style={{ aspectRatio: "1000 / 878.2" }}>
              <svg viewBox={SA_VIEW} fill="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <defs>
                  <radialGradient id="sa-coverage" gradientUnits="userSpaceOnUse" cx="620" cy="300" r="620">
                    <stop offset="0" stopColor="rgb(var(--gold-400))" stopOpacity="0.9" />
                    <stop offset="0.55" stopColor="rgb(var(--gold-600))" stopOpacity="0.4" />
                    <stop offset="1" stopColor="rgb(var(--gold-700))" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="sa-clip">
                    <path d={SA_PATH} clipRule="evenodd" />
                  </clipPath>
                </defs>

                {/* base country fill — a faint warm presence */}
                <motion.path
                  d={SA_PATH}
                  fillRule="evenodd"
                  fill="rgb(var(--gold-500))"
                  style={live ? { opacity: fillOpacity } : { opacity: 0.14 }}
                />

                {/* coverage spreading through the country (clipped to the shape) */}
                <g clipPath="url(#sa-clip)">
                  <motion.circle
                    cx="620"
                    cy="300"
                    r="620"
                    fill="url(#sa-coverage)"
                    style={{
                      transformOrigin: "620px 300px",
                      ...(live ? { opacity: glowOpacity, scale: glowScale } : { opacity: 0.5, scale: 1 }),
                    }}
                  />
                </g>

                {/* the coastline + Lesotho, drawn in fine gold line */}
                <motion.path
                  d={SA_PATH}
                  fillRule="evenodd"
                  stroke="rgb(var(--gold-400))"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={live ? { pathLength: outline } : { pathLength: 1 }}
                />
              </svg>

              {/* Hub markers + decorative on-map labels (aria-hidden; the legend
                  carries the real text). Positioned by geographic percentage. */}
              {hubs.map((h) => {
                const m = MAP[h.id];
                const open = h.status === "open";
                return (
                  <motion.div
                    key={h.id}
                    aria-hidden
                    className="absolute"
                    style={{ left: `${m.x}%`, top: `${m.y}%`, ...(live ? { opacity: hubO[h.id] } : undefined) }}
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      {open ? (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-gold-500" />
                          <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-gold-400/30" />
                        </span>
                      ) : (
                        <span className="block h-2.5 w-2.5 rounded-full border border-dashed border-gold-300/80" />
                      )}
                    </span>
                    {open && (
                      <span
                        className={`absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-display text-sm font-semibold text-paper/90 lg:block ${
                          m.side === "right" ? "left-4 text-left" : "right-4 text-right"
                        }`}
                      >
                        {h.name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </figure>
        </div>

        {/* ---- Resolve ---- */}
        <motion.div
          className="mt-14 flex flex-col gap-4 border-t border-gold-500/25 pt-8 sm:flex-row sm:items-end sm:justify-between"
          style={live ? { opacity: resolveO, y: resolveY } : undefined}
        >
          <p className="font-display text-5xl font-bold tracking-tight text-gold-400 sm:text-6xl">Nationwide.</p>
          <p className="max-w-md text-base leading-relaxed text-brand-100 sm:text-right">
            One commercial oil partner for the whole operation — the fresh oil in, and the used oil out.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
