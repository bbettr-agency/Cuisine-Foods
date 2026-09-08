"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * SoyaLiquid — the bespoke "liquid gold" form of the Soya page: a single closed
 * SVG shape that genuinely MORPHS between four topology-compatible keyframes
 * (droplet → stretch → ribbon → flow) as the theatre's local scroll progress
 * (0 → 1) advances. Smoothed with a Catmull-Rom pass so it reads as fluid, not
 * geometric. Editorial gold gradient + restrained opacity (no blobs / neon /
 * heavy blur). Two depth layers (+ a specular streak) that a pointer can nudge
 * a pixel or two. The path `d` is written imperatively on scroll change only —
 * no per-frame React state, no rAF loop.
 */

type Pt = [number, number];

// Eight points around each shape; index i morphs to the same index next frame.
const DROPLET: Pt[] = [[300, 296], [398, 360], [438, 470], [372, 558], [300, 592], [228, 558], [162, 470], [202, 360]];
const STRETCH: Pt[] = [[332, 176], [420, 320], [432, 486], [374, 612], [316, 664], [248, 592], [214, 430], [262, 286]];
const RIBBON: Pt[] = [[138, 250], [300, 360], [442, 540], [548, 694], [496, 744], [392, 566], [250, 392], [92, 300]];
const FLOW: Pt[] = [[36, 604], [220, 560], [400, 560], [564, 604], [566, 772], [400, 814], [220, 814], [34, 772]];
const KEYS = [DROPLET, STRETCH, RIBBON, FLOW];

// A soft inner specular streak per key (position + radius) for dimensionality.
const HILITE = [
  { x: 268, y: 402, rx: 40, ry: 66, rot: -18 },
  { x: 296, y: 360, rx: 34, ry: 92, rot: -14 },
  { x: 300, y: 430, rx: 120, ry: 30, rot: 34 },
  { x: 300, y: 626, rx: 210, ry: 26, rot: 4 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function shapeAt(p: number): Pt[] {
  const x = Math.min(0.9999, Math.max(0, p)) * (KEYS.length - 1);
  const i = Math.floor(x);
  const t = ease(x - i);
  const a = KEYS[i];
  const b = KEYS[Math.min(i + 1, KEYS.length - 1)];
  return a.map((pt, k) => [lerp(pt[0], b[k][0], t), lerp(pt[1], b[k][1], t)] as Pt);
}

function hiliteAt(p: number) {
  const x = Math.min(0.9999, Math.max(0, p)) * (HILITE.length - 1);
  const i = Math.floor(x);
  const t = ease(x - i);
  const a = HILITE[i];
  const b = HILITE[Math.min(i + 1, HILITE.length - 1)];
  return {
    x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t),
    rx: lerp(a.rx, b.rx, t), ry: lerp(a.ry, b.ry, t), rot: lerp(a.rot, b.rot, t),
  };
}

function catmullClosed(pts: Pt[]): string {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
}

const pathAt = (p: number) => catmullClosed(shapeAt(p));

export function SoyaLiquid({
  progress,
  px,
  py,
  className,
  id = "soya",
}: {
  progress: MotionValue<number>;
  px?: MotionValue<number>;
  py?: MotionValue<number>;
  className?: string;
  id?: string;
}) {
  const bodyRef = useRef<SVGPathElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);
  const hiRef = useRef<SVGEllipseElement>(null);

  const apply = (v: number) => {
    const d = pathAt(v);
    bodyRef.current?.setAttribute("d", d);
    edgeRef.current?.setAttribute("d", d);
    const h = hiliteAt(v);
    const e = hiRef.current;
    if (e) {
      e.setAttribute("cx", h.x.toFixed(1));
      e.setAttribute("cy", h.y.toFixed(1));
      e.setAttribute("rx", h.rx.toFixed(1));
      e.setAttribute("ry", h.ry.toFixed(1));
      e.setAttribute("transform", `rotate(${h.rot.toFixed(1)} ${h.x.toFixed(1)} ${h.y.toFixed(1)})`);
    }
  };
  useEffect(() => { apply(progress.get()); }, [progress]);
  useMotionValueEvent(progress, "change", apply);

  const gid = `soyaGold-${id}`;

  return (
    <svg viewBox="0 0 600 900" className={className} fill="none" aria-hidden role="presentation" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gid} x1="0.1" y1="0.05" x2="0.85" y2="0.95">
          <stop offset="0" stopColor="rgb(var(--gold-300))" />
          <stop offset="0.5" stopColor="rgb(var(--gold-500))" />
          <stop offset="1" stopColor="rgb(var(--gold-700))" />
        </linearGradient>
      </defs>

      {/* BACK — translucent liquid body (tiny pointer parallax) */}
      <motion.g style={px && py ? { x: px, y: py } : undefined}>
        <path ref={bodyRef} d={pathAt(0)} fill={`url(#${gid})`} opacity={0.5} />
        <ellipse ref={hiRef} cx={268} cy={402} rx={40} ry={66} fill="rgb(var(--gold-100))" opacity={0.4} />
        <path ref={edgeRef} d={pathAt(0)} fill="none" stroke="rgb(var(--gold-600))" strokeWidth={1.1} opacity={0.4} />
      </motion.g>
    </svg>
  );
}
