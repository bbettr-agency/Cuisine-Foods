"use client";

import { Fragment } from "react";

/**
 * LivingBotanical — the gold packaging artwork that "escapes" the Cooking Oil
 * bucket and grows into the page. It is a single SVG of engraved sunflower
 * line-art (fine gold strokes, hatched petals, stippled seed-heads, curved
 * leaves) drawn to MATCH the artwork printed on the real Cuisine Foods bucket.
 *
 * The whole system reveals from one inherited CSS var, --grow (0 → 1): stems
 * draw along their length, branches follow, leaves open from their base and
 * sunflowers bloom last. Each part carries a --s start threshold so the growth
 * sequences (main stem → branch → leaf → flower) instead of appearing at once.
 *
 * The origin (~x 250 / y 560 in the viewBox) is positioned BEHIND the bucket's
 * right edge by the theatre, so the first drawn pixels emerge from behind the
 * packaging — the seam is never seen, and the printed art appears to continue.
 *
 * No JS animation lives here — the parent writes --grow; CSS does the rest.
 * Defaults to --grow:1 so no-JS / reduced-motion renders the finished art.
 */

const GOLD6 = "rgb(var(--gold-600))";
const GOLD7 = "rgb(var(--gold-700))";

type FlowerProps = { cx: number; cy: number; r: number; petals: number; s: number; rot?: number; seeds?: number };

/** One engraved sunflower: hatched petals radiating from a stippled seed-head. */
function Flower({ cx, cy, r, petals, s, rot = 0, seeds = 12 }: FlowerProps) {
  const petalLen = r;
  const petalWid = r * 0.26;
  // petal drawn pointing UP from base (0,0) → tip (0,-len); almond + centre vein
  const petalD = `M0 0 C ${petalWid} ${-petalLen * 0.34}, ${petalWid * 0.5} ${-petalLen * 0.9}, 0 ${-petalLen} C ${-petalWid * 0.5} ${-petalLen * 0.9}, ${-petalWid} ${-petalLen * 0.34}, 0 0 Z`;
  const veinD = `M0 ${-petalLen * 0.16} C ${petalWid * 0.28} ${-petalLen * 0.46}, ${petalWid * 0.16} ${-petalLen * 0.82}, 0 ${-petalLen * 0.95}`;

  const seedR = r * 0.28;
  const dots = Array.from({ length: seeds }, (_, k) => {
    const a = k * 137.508 * (Math.PI / 180);
    const rad = seedR * Math.sqrt((k + 0.5) / seeds);
    return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a), s: s + 0.05 + rad / seedR * 0.04 };
  });

  return (
    <g>
      {/* petals */}
      {Array.from({ length: petals }, (_, i) => {
        const a = rot + (i * 360) / petals;
        return (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${a})`}>
            <path
              className="living-petal"
              style={{ ["--s" as string]: (s + (i % 2) * 0.012).toFixed(3), ["--span" as string]: 0.14 }}
              d={petalD}
              fill="none"
              stroke={GOLD6}
              strokeWidth={1.6}
              strokeLinejoin="round"
            />
            <path
              className="living-petal"
              style={{ ["--s" as string]: (s + 0.02 + (i % 2) * 0.012).toFixed(3), ["--span" as string]: 0.14 }}
              d={veinD}
              fill="none"
              stroke={GOLD7}
              strokeWidth={0.9}
              strokeLinecap="round"
            />
          </g>
        );
      })}
      {/* seed-head ring + stipple */}
      <circle className="living-ring" style={{ ["--s" as string]: (s + 0.03).toFixed(3) }} cx={cx} cy={cy} r={seedR} fill="none" stroke={GOLD7} strokeWidth={1.1} />
      {dots.map((d, k) => (
        <circle key={k} className="living-seed" style={{ ["--s" as string]: d.s.toFixed(3) }} cx={d.x} cy={d.y} r={1.5} fill={GOLD6} />
      ))}
    </g>
  );
}

type LeafProps = { x: number; y: number; len: number; angle: number; s: number; flip?: boolean };

/** An engraved leaf: ovate outline + midrib + a couple of side veins. */
function Leaf({ x, y, len, angle, s, flip = false }: LeafProps) {
  const w = len * 0.42;
  const leafD = `M0 0 C ${w} ${-len * 0.28}, ${w * 0.7} ${-len * 0.82}, 0 ${-len} C ${-w * 0.7} ${-len * 0.82}, ${-w} ${-len * 0.28}, 0 0 Z`;
  const midrib = `M0 0 L0 ${-len}`;
  const veins = [0.32, 0.54, 0.74].map((t) => `M0 ${-len * t} C ${w * 0.4} ${-len * (t + 0.06)}, ${w * 0.55} ${-len * (t + 0.12)}, ${w * 0.62} ${-len * (t + 0.16)}`);
  const veinsL = [0.32, 0.54, 0.74].map((t) => `M0 ${-len * t} C ${-w * 0.4} ${-len * (t + 0.06)}, ${-w * 0.55} ${-len * (t + 0.12)}, ${-w * 0.62} ${-len * (t + 0.16)}`);
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) ${flip ? "scale(-1 1)" : ""}`}>
      <g className="living-leaf" style={{ ["--s" as string]: s.toFixed(3), ["--span" as string]: 0.16, ["--o" as string]: "50% 100%" }}>
        <path d={leafD} fill="none" stroke={GOLD6} strokeWidth={1.6} strokeLinejoin="round" />
        <path d={midrib} fill="none" stroke={GOLD6} strokeWidth={1.1} strokeLinecap="round" />
        {[...veins, ...veinsL].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={GOLD7} strokeWidth={0.8} strokeLinecap="round" />
        ))}
      </g>
    </g>
  );
}

type StemProps = { d: string; s: number; span?: number; w?: number; gold?: string };
function Stem({ d, s, span = 0.28, w = 2.2, gold = GOLD6 }: StemProps) {
  return (
    <path
      className="living-stem"
      style={{ ["--s" as string]: s.toFixed(3), ["--span" as string]: span }}
      d={d}
      pathLength={1}
      fill="none"
      stroke={gold}
      strokeWidth={w}
      strokeLinecap="round"
    />
  );
}

/**
 * The full escaped composition. viewBox 0 0 1000 760. The growth ORIGIN sits at
 * the left-centre (~150,430) — a region the bucket covers — and everything
 * travels RIGHT and UP (matching the big printed sunflowers on the bucket's
 * right edge). Nothing grows left into the story column. The first ~half of the
 * primary stem runs behind the bucket, so its visible pixels emerge from behind
 * the right edge and climb — the seam is never seen.
 */
export function LivingBotanical({ className, id = "living" }: { className?: string; id?: string }) {
  return (
    <svg
      viewBox="0 0 900 900"
      className={className}
      fill="none"
      aria-hidden
      role="presentation"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* PRIMARY STEM — origin (230,640) sits behind the bucket; runs behind it
          then emerges climbing into the upper-right, terminating top-right.
          Crown kept within the on-screen window (viewBox x≈230–720). */}
      <Stem d="M230 640 C 322 606, 392 552, 436 468 C 506 336, 566 250, 636 168" s={0.03} span={0.40} w={2.8} />
      {/* early leaf where it clears the right edge */}
      <Stem d="M448 444 C 478 428, 508 422, 536 422" s={0.22} span={0.10} w={1.9} />
      <Leaf x={540} y={422} len={90} angle={102} s={0.30} />
      {/* mid sunflower, just above the right edge — fully on screen */}
      <Stem d="M470 404 C 494 384, 508 372, 520 364" s={0.30} span={0.09} w={1.8} />
      <Flower cx={520} cy={356} r={102} petals={11} s={0.34} rot={8} seeds={12} />
      {/* branch down into the right margin → leaf */}
      <Stem d="M544 300 C 612 320, 676 352, 716 392" s={0.44} span={0.11} w={1.9} />
      <Leaf x={716} y={396} len={92} angle={144} s={0.52} />
      {/* terminal large sunflower, top (crops over the corner) */}
      <Stem d="M636 168 C 648 146, 660 132, 672 124" s={0.54} span={0.10} w={2.2} />
      <Flower cx={676} cy={118} r={120} petals={13} s={0.58} rot={-8} seeds={16} />

      {/* SECONDARY BRANCH — a smaller climb that widens the crown to the right */}
      <Stem d="M544 300 C 604 258, 664 240, 716 250" s={0.48} span={0.22} w={2.0} />
      <Leaf x={572} y={300} len={72} angle={30} s={0.64} />
      <Flower cx={720} cy={252} r={78} petals={9} s={0.70} rot={20} seeds={8} />

      {/* a couple of filler leaves to give the crown body (not vines) */}
      <Leaf x={628} y={244} len={70} angle={52} s={0.66} />
      <Leaf x={480} y={250} len={64} angle={-16} s={0.70} />

      {/* ENVIRONMENT flourish — a fine filament off the top edge (last) */}
      <Stem d="M676 118 C 700 88, 716 66, 724 44" s={0.82} span={0.12} w={1.5} gold={GOLD7} />
      <Leaf x={712} y={78} len={60} angle={48} s={0.88} />
    </svg>
  );
}

/**
 * The single foreground element — one leaf on a short stem that passes IN FRONT
 * of the bucket's outer-right edge (never over the logo or product name).
 * Rendered above the product; same --grow drives it. Its origin also sits behind
 * the bucket so it appears to peel off the right edge.
 */
export function LivingForeground({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 900" className={className} fill="none" aria-hidden role="presentation" preserveAspectRatio="xMidYMid meet">
      <Stem d="M470 588 C 552 620, 610 670, 646 724" s={0.5} span={0.12} w={2.6} />
      <Leaf x={648} y={728} len={122} angle={150} s={0.6} />
    </svg>
  );
}

/**
 * A tiny escaping stem for the HERO — a single fine gold line + one small leaf
 * that peeks a few pixels beyond the bucket edge, hinting at the trick. Driven
 * by the same --grow (the hero nudges it 0 → ~0.5 on hover).
 */
export function LivingHint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" className={className} fill="none" aria-hidden role="presentation" preserveAspectRatio="xMidYMid meet">
      <Stem d="M120 300 C 168 286, 214 262, 248 224" s={0.02} span={0.5} w={2.0} />
      <Leaf x={248} y={224} len={62} angle={-10} s={0.42} />
      <Fragment />
    </svg>
  );
}
