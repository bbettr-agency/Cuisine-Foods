"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { SunflowerBotanical } from "@/components/sunflower/botanical";

export type TheatreState = {
  n: string;
  label: string;
  title: string;
  body: string;
  chips?: string[];
};

const DRUM = { src: "/images/website/product-sunflower.png", w: 837, h: 1024 };

/**
 * SunflowerTheatre — the signature interaction of /sunflower-oil.
 * A tall section whose inner stage is `position: sticky` (no scroll hijacking).
 * The section's own scroll progress (0→1) drives FOUR bounded story states,
 * the gold botanical blooming behind the drum, and subtle product motion — all
 * from a single progress value, so fast / reverse / mid-refresh scrolling all
 * resolve to the correct state with no object chasing page coordinates.
 *
 * Desktop (≥lg, motion allowed) gets the pinned theatre; mobile and
 * reduced-motion get a calm stacked version with the flower fully bloomed.
 */
export function SunflowerTheatre({ states }: { states: TheatreState[] }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // SSR + first client render must match, so both render the calm static stage;
  // only after mount (and only when motion is allowed) does desktop upgrade to
  // the pinned theatre. The swap happens below the fold → no visible shift, and
  // reduced-motion simply keeps the static stage.
  const live = mounted && !reduce;
  return (
    <section aria-label="Sunflower Oil story" className="relative bg-paper">
      <div className="hidden lg:block">
        {live ? <TheatrePinned states={states} /> : <TheatreStatic states={states} />}
      </div>
      <div className="lg:hidden">
        {live ? <MobileTheatre states={states} /> : <TheatreStatic states={states} mobile />}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- desktop */

function TheatrePinned({ states }: { states: TheatreState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Bloom: seed head forms early, flower fully open near the end.
  const bloom = useTransform(scrollYProgress, [0.03, 0.86], [0.05, 1]);

  // Pointer parallax (easter egg) — tiny, spring-damped, scroll stays primary.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const pxVar = useMotionTemplate`${px}px`;
  const pyVar = useMotionTemplate`${py}px`;

  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  // Product motion across the four states — restrained "photography coming alive".
  const drumRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-3, -1.5, 5, 2.5, 0]);
  const drumScale = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], [1, 1.015, 1.05, 1.03]);
  const drumX = useTransform(scrollYProgress, [0, 0.5, 1], [0, -8, 6]);
  const drumRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [6, -3, 2]);
  // gentle pointer tilt on the drum, layered under scroll motion
  const drumTiltX = useTransform(px, (v) => v * 0.25);
  const drumTiltY = useTransform(py, (v) => v * -0.2);

  return (
    <div ref={ref} style={{ height: "340vh" }} className="relative">
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="sticky top-0 flex h-screen items-center overflow-hidden [perspective:1400px]"
      >
        {/* soft brand wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 55% at 42% 42%, rgb(var(--gold-100) / 0.5) 0%, transparent 62%)",
          }}
        />

        {/* BACKGROUND — the blooming botanical. Strongest around the product on
            the left; a feathered horizontal mask quiets it under the copy on the
            right so the words always win (no opaque boxes). */}
        <motion.div
          aria-hidden
          className="sf-botanical pointer-events-none absolute left-[36%] top-1/2 h-[116vh] w-[116vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.55]"
          style={{
            ["--bloom" as string]: bloom,
            ["--px" as string]: pxVar,
            ["--py" as string]: pyVar,
            WebkitMaskImage:
              "linear-gradient(90deg, #000 0%, #000 50%, rgba(0,0,0,0.32) 72%, rgba(0,0,0,0.16) 100%)",
            maskImage:
              "linear-gradient(90deg, #000 0%, #000 50%, rgba(0,0,0,0.32) 72%, rgba(0,0,0,0.16) 100%)",
          }}
        >
          <SunflowerBotanical className="h-full w-full" />
        </motion.div>

        <div className="container-x relative grid w-full grid-cols-[0.95fr_1.05fr] items-center gap-8">
          {/* FOREGROUND — the drum */}
          <div className="relative flex justify-center">
            <motion.div
              className="relative w-[74%] max-w-[380px] will-change-transform [transform-style:preserve-3d]"
              style={{
                x: drumX,
                scale: drumScale,
                rotateZ: drumRotate,
                rotateY: drumRotateY,
                rotateX: drumTiltY,
              }}
            >
              <motion.div style={{ rotateY: drumTiltX }} className="[transform-style:preserve-3d]">
                <Image
                  src={DRUM.src}
                  alt="Cuisine Foods 100% pure sunflower oil — bulk pail"
                  width={DRUM.w}
                  height={DRUM.h}
                  priority
                  sizes="380px"
                  className="h-auto w-full select-none [filter:drop-shadow(0_34px_40px_rgb(16_22_24/0.30))]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* CONTENT — the four states, stacked & cross-faded by progress.
              A feathered paper wash sits under the copy to hold readability. */}
          <div className="relative min-h-[340px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -inset-y-10"
              style={{
                background:
                  "radial-gradient(115% 82% at 34% 50%, rgb(var(--paper)) 0%, rgb(var(--paper) / 0.72) 42%, rgb(var(--paper) / 0) 78%)",
              }}
            />
            {states.map((s, i) => (
              <StateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} />
            ))}
          </div>
        </div>

        {/* progress rail */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2.5">
          {states.map((s, i) => (
            <ProgressDot key={s.n} progress={scrollYProgress} index={i} total={states.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StateBlock({
  progress,
  index,
  total,
  state,
  compact,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  state: TheatreState;
  compact?: boolean;
}) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total; // half-window
  const opacity = useTransform(
    progress,
    [center - w - 0.02, center - w * 0.5, center + w * 0.5, center + w + 0.02],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [center - w, center, center + w], [compact ? 22 : 34, 0, compact ? -22 : -34]);
  const titleY = useTransform(progress, [center - w, center - w * 0.4], ["105%", "0%"]);

  if (compact) {
    return (
      <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-start text-center">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-3xl font-bold leading-none text-gold-500/80 tabular-nums">{state.n}</span>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">{state.label}</span>
        </div>
        <div className="sf-mask mt-3">
          <motion.h2 style={{ y: titleY }} className="text-2xl font-bold text-ink">
            {state.title}
          </motion.h2>
        </div>
        <p className="mx-auto mt-3 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">{state.body}</p>
        {state.chips && (
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {state.chips.map((c) => (
              <li key={c} className="rounded-full border border-gold-300/70 bg-surface/70 px-3 py-1 text-[13px] font-medium text-ink-soft">
                {c}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-5xl font-bold leading-none text-gold-500/80 tabular-nums">
          {state.n}
        </span>
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-700">{state.label}</span>
      </div>
      <div className="sf-mask mt-5">
        <motion.h2 style={{ y: titleY }} className="text-h2 text-ink">
          {state.title}
        </motion.h2>
      </div>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{state.body}</p>
      {state.chips && (
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {state.chips.map((c) => (
            <li
              key={c}
              className="rounded-full border border-gold-300/70 bg-surface/60 px-3.5 py-1.5 text-sm font-medium text-ink-soft"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function ProgressDot({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total;
  const active = useTransform(progress, [center - w, center, center + w], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [center - w, center, center + w], [1, 1.6, 1]);
  return (
    <motion.span
      style={{ opacity: active, scale }}
      className="h-1.5 w-6 rounded-full bg-gold-500"
    />
  );
}

/* ------------------------------------------------------------- mobile bloom */

/**
 * MobileTheatre — the same Sunflower Bloom idea, recomposed for phones. A short,
 * tight pinned stage (~2.2vh) with the drum sticky in the upper half and the gold
 * botanical blooming behind/around it, petals expanding OUTWARD past the screen
 * edges (feather-masked away from the copy below). One scroll-progress source
 * drives the same four states + bloom. No pointer effects. Uses svh units so the
 * mobile address bar doesn't break the layout.
 */
function MobileTheatre({ states }: { states: TheatreState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bloom = useTransform(scrollYProgress, [0.05, 0.92], [0.03, 1]);
  const mask =
    "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, #000 26%, #000 52%, rgba(0,0,0,0.24) 78%, rgba(0,0,0,0) 100%)";

  return (
    <div ref={ref} style={{ height: "220vh" }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(70% 42% at 50% 32%, rgb(var(--gold-100) / 0.55) 0%, transparent 66%)" }}
        />

        {/* PRODUCT + BOTANICAL (upper half) */}
        <div className="relative flex h-[54svh] items-center justify-center">
          <motion.div
            aria-hidden
            className="sf-botanical pointer-events-none absolute left-1/2 top-[44%] h-[152vw] w-[152vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.6]"
            style={{ ["--bloom" as string]: bloom, WebkitMaskImage: mask, maskImage: mask }}
          >
            <SunflowerBotanical className="h-full w-full" />
          </motion.div>
          <div className="relative h-[40svh]">
            <Image
              src={DRUM.src}
              alt="Cuisine Foods 100% pure sunflower oil — bulk pail"
              width={DRUM.w}
              height={DRUM.h}
              priority
              sizes="70vw"
              className="h-full w-auto select-none [filter:drop-shadow(0_24px_28px_rgb(16_22_24/0.26))]"
              draggable={false}
            />
          </div>
        </div>

        {/* STORY (lower half) */}
        <div className="container-x relative flex-1 pb-14 pt-2">
          <div className="relative h-full">
            {states.map((s, i) => (
              <StateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} compact />
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {states.map((s, i) => (
              <ProgressDot key={s.n} progress={scrollYProgress} index={i} total={states.length} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- mobile / reduced-motion */

function TheatreStatic({ states, mobile }: { states: TheatreState[]; mobile?: boolean }) {
  return (
    <div className="section overflow-hidden">
      <div className="container-x">
        <div className="relative mx-auto max-w-md">
          <div className="sf-botanical pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[420px] -translate-x-1/2 opacity-[0.45]">
            <SunflowerBotanical className="h-full w-full" />
          </div>
          <div className="relative mx-auto w-[64%] max-w-[280px]">
            <Image
              src={DRUM.src}
              alt="Cuisine Foods 100% pure sunflower oil — bulk pail"
              width={DRUM.w}
              height={DRUM.h}
              sizes="(max-width: 1024px) 64vw, 280px"
              className="h-auto w-full select-none [filter:drop-shadow(0_26px_30px_rgb(16_22_24/0.26))]"
              draggable={false}
            />
          </div>
        </div>
        <ol className={mobile ? "mt-12 space-y-10" : "mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2"}>
          {states.map((s) => (
            <li key={s.n}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold leading-none text-gold-500/80 tabular-nums">{s.n}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">{s.label}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-ink">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              {s.chips && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <li key={c} className="rounded-full border border-gold-300/70 px-3 py-1 text-sm text-ink-soft">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
