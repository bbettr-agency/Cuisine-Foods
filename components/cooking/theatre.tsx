"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { LivingBotanical, LivingForeground } from "@/components/cooking/botanical";

export type CookState = { n: string; label: string; title: string; body: string; chips?: string[] };

const DRUM = { src: "/images/website/product-cooking.png", w: 869, h: 1046 };

/**
 * CookingTheatre — the signature interaction of the Cooking Oil page:
 * THE LIVING LABEL. The gold sunflower artwork printed on the bucket appears to
 * grow beyond the packaging and become the page itself:
 *   CONTAINED → ESCAPE → GROW → ENVIRONMENT.
 *
 * Shares the proven engineering of the Sunflower/Palm/Soya theatres (sticky
 * stage, one bounded scroll-progress, mobile recompose, reduced-motion static)
 * but a unique choreography: a single inherited --grow drives an SVG that draws
 * itself out from behind the bucket's edge. Composition is text-left / product
 * centre-right; the black bucket is the strong foreground and the gold passes
 * behind it, with one leaf crossing in front of its outer edge.
 */
export function CookingTheatre({ states }: { states: CookState[] }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;
  return (
    <section aria-label="Cooking Oil story — the living label" className="relative bg-paper">
      <div className="hidden lg:block">{live ? <CookingPinned states={states} /> : <CookingStatic states={states} />}</div>
      <div className="lg:hidden">{live ? <CookingMobile states={states} /> : <CookingStatic states={states} mobile />}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- desktop */

function CookingPinned({ states }: { states: CookState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The single growth driver. Springed so fast scrolls resolve smoothly and
  // reverse cleanly. Reaches full bloom a little before the end so STATE 04 is
  // fully grown while the divider hands off.
  const growRaw = useTransform(scrollYProgress, [0.03, 0.86], [0, 1]);
  const grow = useSpring(growRaw, { stiffness: 120, damping: 26, mass: 0.4 });

  // pointer easter egg — the black bucket answers by a sub-degree tilt.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const drumTiltY = useSpring(useTransform(rawX, (v) => v * 3), { stiffness: 90, damping: 16 });
  const drumTiltX = useSpring(useTransform(rawY, (v) => v * -2), { stiffness: 90, damping: 16 });
  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  // Product motion per state — the black bucket has weight; keep it restrained.
  const drumScale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1.02, 1.05, 1.03]);
  const drumRotateY = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 5, 4, 0]);
  const drumRotateZ = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -1.6, -1, 0]);
  const drumX = useTransform(scrollYProgress, [0, 0.5, 1], [0, -6, 2]);

  // The escaped branch that continues into the next section (the handoff).
  const dividerOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const dividerDraw = useTransform(scrollYProgress, [0.76, 0.99], [0, 1]);

  return (
    <div ref={ref} style={{ height: "380vh" }} className="relative">
      <motion.div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="sticky top-0 flex h-screen items-center overflow-hidden [perspective:1500px]"
        style={{ ["--grow" as string]: grow }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 60% at 66% 40%, rgb(var(--gold-100) / 0.5) 0%, transparent 62%)" }} />

        <div className="container-x relative grid w-full grid-cols-[1.04fr_0.96fr] items-center gap-8">
          {/* CONTENT — text left, on a soft paper wash */}
          <div className="relative z-[3] min-h-[360px]">
            <div aria-hidden className="pointer-events-none absolute -inset-x-8 -inset-y-12" style={{ background: "radial-gradient(120% 78% at 38% 50%, rgb(var(--paper)) 0%, rgb(var(--paper) / 0.7) 44%, rgb(var(--paper) / 0) 80%)" }} />
            {states.map((s, i) => (
              <CookStateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} />
            ))}
          </div>

          {/* PRODUCT — the strong black foreground; gold grows from behind it */}
          <div className="relative flex justify-center">
            {/* BACK BOTANICAL — the SVG's growth origin (230,640 → 25.6%,71.1%)
                is pinned to the bucket centre, so its first pixels are always
                masked by the bucket; growth climbs up-and-right, cropping over
                the top-right corner. Scale (vh) sets how far it reaches. */}
            <div
              aria-hidden
              className="living-art pointer-events-none absolute left-1/2 top-1/2 z-0 h-[84vh] w-[84vh]"
              style={{ transform: "translate(-25.6%, -71.1%)", WebkitMaskImage: "linear-gradient(84deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 24%, #000 44%, #000 100%)", maskImage: "linear-gradient(84deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 24%, #000 44%, #000 100%)" }}
            >
              <LivingBotanical className="h-full w-full" id="theatre" />
            </div>

            <motion.div
              className="relative z-[1] w-[74%] max-w-[360px] will-change-transform [transform-style:preserve-3d]"
              style={{ x: drumX, scale: drumScale, rotateY: drumRotateY, rotateZ: drumRotateZ, rotateX: drumTiltX }}
            >
              <motion.div style={{ rotateY: drumTiltY }} className="[transform-style:preserve-3d]">
                <Image src={DRUM.src} alt="Cuisine Foods 100% pure cooking oil — 20L bucket" width={DRUM.w} height={DRUM.h} priority sizes="360px" className="h-auto w-full select-none [filter:drop-shadow(0_40px_44px_rgb(16_22_24/0.34))]" draggable={false} />
              </motion.div>
            </motion.div>

            {/* FOREGROUND — same coordinate space (same origin pin + size), one
                leaf crossing in front of the bucket's outer-right edge */}
            <div
              aria-hidden
              className="living-art pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[84vh] w-[84vh]"
              style={{ transform: "translate(-25.6%, -71.1%)" }}
            >
              <LivingForeground className="h-full w-full" />
            </div>
          </div>
        </div>

        {/* THE ESCAPE CONTINUES — a drawn branch that hands off to the next section */}
        <motion.svg style={{ opacity: dividerOpacity }} className="living-art pointer-events-none absolute bottom-0 left-0 w-full" viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" aria-hidden>
          <motion.path style={{ pathLength: dividerDraw }} d="M0 48 C 300 26, 560 30, 760 40 C 1000 52, 1220 30, 1440 40" stroke="rgb(var(--gold-500))" strokeWidth={2} strokeLinecap="round" />
        </motion.svg>

        <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
          {states.map((s, i) => (<CookDot key={s.n} progress={scrollYProgress} index={i} total={states.length} />))}
        </div>
      </motion.div>
    </div>
  );
}

function CookStateBlock({
  progress, index, total, state, compact,
}: { progress: MotionValue<number>; index: number; total: number; state: CookState; compact?: boolean }) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total;
  const opacity = useTransform(progress, [center - w - 0.02, center - w * 0.5, center + w * 0.5, center + w + 0.02], [0, 1, 1, 0]);
  const y = useTransform(progress, [center - w, center, center + w], [compact ? 20 : 30, 0, compact ? -20 : -30]);
  const titleY = useTransform(progress, [center - w, center - w * 0.4], ["105%", "0%"]);
  const underline = useTransform(progress, [center - w * 0.4, center + w * 0.3], [0, 1]);

  const Num = (
    <span className="flex items-center gap-2.5">
      <span className={`font-display ${compact ? "text-3xl" : "text-5xl"} font-bold leading-none text-gold-500 tabular-nums`}>{state.n}</span>
      <span aria-hidden className={`${compact ? "h-4" : "h-6"} w-3 rounded-full bg-gradient-to-b from-gold-400 to-gold-600`} />
      <span className={`${compact ? "text-xs tracking-[0.24em]" : "text-sm tracking-[0.3em]"} font-semibold uppercase text-gold-700`}>{state.label}</span>
    </span>
  );

  if (compact) {
    return (
      <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-start text-center">
        {Num}
        <div className="sf-mask mt-3"><motion.h2 style={{ y: titleY }} className="text-2xl font-bold text-ink">{state.title}</motion.h2></div>
        <p className="mx-auto mt-3 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">{state.body}</p>
        {state.chips && <ul className="mt-4 flex flex-wrap justify-center gap-2">{state.chips.map((c) => (<li key={c} className="rounded-full border border-gold-300/70 bg-surface/70 px-3 py-1 text-[13px] font-medium text-ink-soft">{c}</li>))}</ul>}
      </motion.div>
    );
  }

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      {Num}
      <div className="relative mt-5 inline-block self-start">
        <div className="sf-mask"><motion.h2 style={{ y: titleY }} className="text-h2 text-ink">{state.title}</motion.h2></div>
        {/* a branch-like gold underline draws under the active heading */}
        <motion.span aria-hidden className="absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-500/0" style={{ scaleX: underline }} />
      </div>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{state.body}</p>
      {state.chips && <ul className="mt-6 flex flex-wrap gap-2.5">{state.chips.map((c) => (<li key={c} className="rounded-full border border-gold-300/70 bg-surface/60 px-3.5 py-1.5 text-sm font-medium text-ink-soft">{c}</li>))}</ul>}
    </motion.div>
  );
}

function CookDot({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total;
  const opacity = useTransform(progress, [center - w, center, center + w], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [center - w, center, center + w], [1, 1.7, 1]);
  return <motion.span style={{ opacity, scale }} className="h-2 w-2 rounded-full bg-gold-500" />;
}

/* ------------------------------------------------------------ mobile grow */

function CookingMobile({ states }: { states: CookState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const growRaw = useTransform(scrollYProgress, [0.04, 0.84], [0, 1]);
  const grow = useSpring(growRaw, { stiffness: 120, damping: 26, mass: 0.4 });
  const mask = "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, #000 20%, #000 52%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 100%)";
  const dividerOpacity = useTransform(scrollYProgress, [0.72, 0.9], [0, 1]);
  const dividerDraw = useTransform(scrollYProgress, [0.76, 0.99], [0, 1]);

  return (
    <div ref={ref} style={{ height: "240vh" }} className="relative">
      <motion.div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden" style={{ ["--grow" as string]: grow }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(76% 40% at 54% 30%, rgb(var(--gold-100) / 0.5) 0%, transparent 66%)" }} />
        <div className="relative flex h-[56svh] items-center justify-center">
          {/* origin (25.6%,71.1%) pinned to the bucket centre — same as desktop */}
          <div aria-hidden className="living-art pointer-events-none absolute left-1/2 top-1/2 z-0 h-[178vw] w-[178vw]" style={{ transform: "translate(-25.6%, -71.1%)", WebkitMaskImage: mask, maskImage: mask }}>
            <LivingBotanical className="h-full w-full" id="mobile" />
          </div>
          <div className="relative z-[1] h-[42svh]">
            <Image src={DRUM.src} alt="Cuisine Foods 100% pure cooking oil — 20L bucket" width={DRUM.w} height={DRUM.h} priority sizes="72vw" className="h-full w-auto select-none [filter:drop-shadow(0_28px_30px_rgb(16_22_24/0.3))]" draggable={false} />
          </div>
          <div aria-hidden className="living-art pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[178vw] w-[178vw]" style={{ transform: "translate(-25.6%, -71.1%)" }}>
            <LivingForeground className="h-full w-full" />
          </div>
        </div>
        <div className="container-x relative flex-1 pb-14 pt-2">
          <div className="relative h-full">
            {states.map((s, i) => (<CookStateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} compact />))}
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            {states.map((s, i) => (<CookDot key={s.n} progress={scrollYProgress} index={i} total={states.length} />))}
          </div>
        </div>
        <motion.svg style={{ opacity: dividerOpacity }} className="pointer-events-none absolute bottom-0 left-0 w-full" viewBox="0 0 390 44" fill="none" preserveAspectRatio="none" aria-hidden>
          <motion.path style={{ pathLength: dividerDraw }} d="M0 28 C 90 14, 190 16, 250 24 C 310 32, 350 16, 390 24" stroke="rgb(var(--gold-500))" strokeWidth={1.6} strokeLinecap="round" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------- reduced-motion / static */

function CookingStatic({ states, mobile }: { states: CookState[]; mobile?: boolean }) {
  return (
    <div className="section overflow-hidden">
      <div className="container-x">
        <div className="relative mx-auto max-w-xl">
          {/* fully-grown botanical (var(--grow) falls back to 1) behind the drum */}
          <div aria-hidden className="living-art pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-90">
            <LivingBotanical className="h-full w-full" id="static" />
          </div>
          <div className="relative mx-auto w-[60%] max-w-[280px]">
            <Image src={DRUM.src} alt="Cuisine Foods 100% pure cooking oil — 20L bucket" width={DRUM.w} height={DRUM.h} sizes="(max-width:1024px) 60vw, 280px" className="h-auto w-full select-none [filter:drop-shadow(0_30px_34px_rgb(16_22_24/0.3))]" draggable={false} />
          </div>
        </div>
        <ol className={mobile ? "mt-12 space-y-10" : "mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2"}>
          {states.map((s) => (
            <li key={s.n}>
              <div className="flex items-center gap-2.5">
                <span className="font-display text-3xl font-bold leading-none text-gold-500 tabular-nums">{s.n}</span>
                <span className="h-4 w-3 rounded-full bg-gradient-to-b from-gold-400 to-gold-600" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">{s.label}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-ink">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              {s.chips && <ul className="mt-3 flex flex-wrap gap-2">{s.chips.map((c) => (<li key={c} className="rounded-full border border-gold-300/70 px-3 py-1 text-sm text-ink-soft">{c}</li>))}</ul>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
