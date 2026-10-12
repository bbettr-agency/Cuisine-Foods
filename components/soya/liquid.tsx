"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * SoyaLiquid – THE POUR, rebuilt as one continuous liquid-gold stream.
 *
 * Instead of four unrelated morphing blobs, this is a SINGLE elegant stream that
 * DEVELOPS as the theatre's local scroll progress (0 → 1) advances: the stream
 * draws itself along a fixed, graceful curve (scroll-linked pathLength), thickens
 * from a narrow first-flow into a fuller body, carries a soft specular highlight
 * and a faint under-glow for dimensionality, and finally settles into a flowing
 * pool at the base that hands off to the next section.
 *
 * It is one evolving composition, continuous and fully reversible (pathLength is
 * scroll-bound), with no per-frame React work. At progress = 1 (reduced-motion /
 * static) it renders the finished, polished stream. Lightweight SVG strokes +
 * gradients only — no blobs, canvas, WebGL or heavy filters. The stream flows
 * behind/around the product and never pours from the sealed lid.
 */
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
  // The stream draws in across the whole scroll; it never fully retracts so the
  // first flow is already present at the start.
  const draw = useTransform(progress, [0, 1], [0.06, 1]);
  // A gentle lead so the highlight trails just behind the body edge.
  const drawHi = useTransform(progress, [0, 1], [0.02, 0.97]);
  // Volume: narrow first-flow → fuller body → settled.
  const bodyW = useTransform(progress, [0, 0.5, 1], [9, 30, 40]);
  const glowW = useTransform(progress, [0, 0.5, 1], [26, 66, 86]);
  const hiW = useTransform(progress, [0, 0.5, 1], [3, 8, 11]);
  // The pool resolves in over the final stage.
  const poolOpacity = useTransform(progress, [0.6, 0.92], [0, 0.9]);
  const poolScale = useTransform(progress, [0.6, 1], [0.6, 1]);
  const poolRing = useTransform(progress, [0.66, 1], [0, 0.55]);

  // One fixed, graceful falling S-curve: top (behind the bucket) → pooling base.
  const STREAM = "M 338 26 C 262 150 404 300 326 440 C 268 548 372 628 316 744";
  const gid = `soyaGold-${id}`;
  const ggid = `soyaGlow-${id}`;

  return (
    <svg viewBox="0 0 600 900" className={className} fill="none" aria-hidden role="presentation" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gid} x1="0.3" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="rgb(var(--gold-300))" />
          <stop offset="0.5" stopColor="rgb(var(--gold-500))" />
          <stop offset="1" stopColor="rgb(var(--gold-600))" />
        </linearGradient>
        <radialGradient id={ggid} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgb(var(--gold-400))" stopOpacity="0.5" />
          <stop offset="1" stopColor="rgb(var(--gold-400))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.g style={px && py ? { x: px, y: py } : undefined}>
        {/* soft under-glow for dimensionality */}
        <motion.path
          d={STREAM}
          stroke={`url(#${ggid})`}
          style={{ pathLength: draw, strokeWidth: glowW }}
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
        />
        {/* the liquid body */}
        <motion.path
          d={STREAM}
          stroke={`url(#${gid})`}
          style={{ pathLength: draw, strokeWidth: bodyW }}
          strokeLinecap="round"
          fill="none"
          opacity={0.92}
        />
        {/* specular highlight riding just inside the body */}
        <motion.path
          d={STREAM}
          stroke="rgb(var(--gold-100))"
          style={{ pathLength: drawHi, strokeWidth: hiW, x: -4, y: -3 }}
          strokeLinecap="round"
          fill="none"
          opacity={0.55}
        />

        {/* the flow settles into a pool at the base */}
        <motion.g style={{ opacity: poolOpacity }}>
          <motion.ellipse cx={312} cy={792} rx={132} ry={30} fill={`url(#${gid})`} style={{ scale: poolScale, transformOrigin: "312px 792px" }} opacity={0.85} />
          <motion.ellipse cx={312} cy={788} rx={150} ry={34} fill="none" stroke="rgb(var(--gold-500))" strokeWidth={1.4} style={{ opacity: poolRing }} />
        </motion.g>
      </motion.g>
    </svg>
  );
}
