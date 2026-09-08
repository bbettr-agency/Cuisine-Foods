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
import { SoyaLiquid } from "@/components/soya/liquid";

export type SoyaState = { n: string; label: string; title: string; body: string; chips?: string[] };

const DRUM = { src: "/images/website/product-cooking.png", w: 869, h: 1046 };

/**
 * SoyaTheatre — the signature interaction of /soya-oil: THE POUR.
 * Shares the engineering of the Sunflower/Palm theatres (sticky stage, one
 * bounded scroll-progress → four states, mobile recompose, reduced-motion) but
 * a completely different visual world: a morphing liquid-gold form that goes
 * droplet → stretch → ribbon → flow, and finally flattens into a gold divider
 * that hands off to the next section. Composition is flipped too — text left,
 * product centre-right — so it surprises after Sunflower and Palm.
 */
export function SoyaTheatre({ states }: { states: SoyaState[] }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;
  return (
    <section aria-label="Soya Oil story" className="relative bg-paper">
      <div className="hidden lg:block">
        {live ? <SoyaPinned states={states} /> : <SoyaStatic states={states} />}
      </div>
      <div className="lg:hidden">
        {live ? <SoyaMobile states={states} /> : <SoyaStatic states={states} mobile />}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- desktop */

function SoyaPinned({ states }: { states: SoyaState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const flow = useTransform(scrollYProgress, [0.03, 0.97], [0, 1]);

  // pointer easter egg — separate depth per layer
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const bx = useSpring(useTransform(rawX, (v) => v * 3), { stiffness: 60, damping: 18 });
  const by = useSpring(useTransform(rawY, (v) => v * 3), { stiffness: 60, damping: 18 });
  const drumTiltY = useSpring(useTransform(rawX, (v) => v * 3), { stiffness: 90, damping: 16 });
  const drumTiltX = useSpring(useTransform(rawY, (v) => v * -2.4), { stiffness: 90, damping: 16 });
  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  // Product motion per state — restrained, product stays the hero.
  const drumScale = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], [1, 1.01, 1.04, 1.02]);
  const drumRotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-4, 3, 5, -3, 0]);
  const drumX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 8, -4]);
  const drumY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -6, 2]);

  // The gold divider that the flow resolves into.
  const dividerDraw = useTransform(scrollYProgress, [0.72, 0.98], [0, 1]);
  const dividerOpacity = useTransform(scrollYProgress, [0.66, 0.82], [0, 1]);

  return (
    <div ref={ref} style={{ height: "360vh" }} className="relative">
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="sticky top-0 flex h-screen items-center overflow-hidden [perspective:1400px]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(56% 60% at 60% 46%, rgb(var(--gold-100) / 0.45) 0%, transparent 60%)" }} />

        {/* LIQUID — morphs droplet → stretch → ribbon → flow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[56%] top-[46%] h-[132vh] w-[132vh] -translate-x-1/2 -translate-y-1/2 opacity-90"
          style={{
            WebkitMaskImage: "linear-gradient(78deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.4) 26%, #000 48%, #000 100%)",
            maskImage: "linear-gradient(78deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.4) 26%, #000 48%, #000 100%)",
          }}
        >
          <SoyaLiquid progress={flow} px={bx} py={by} className="h-full w-full" id="theatre" />
        </motion.div>

        <div className="container-x relative grid w-full grid-cols-[1.02fr_0.98fr] items-center gap-8">
          {/* CONTENT — text left */}
          <div className="relative min-h-[340px]">
            <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-10" style={{ background: "radial-gradient(120% 82% at 40% 50%, rgb(var(--paper)) 0%, rgb(var(--paper) / 0.72) 46%, rgb(var(--paper) / 0) 82%)" }} />
            {states.map((s, i) => (
              <SoyaStateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} />
            ))}
          </div>

          {/* PRODUCT — centre-right */}
          <div className="relative flex justify-center">
            <motion.div
              className="relative w-[72%] max-w-[350px] will-change-transform [transform-style:preserve-3d]"
              style={{ x: drumX, y: drumY, scale: drumScale, rotateY: drumRotateY, rotateX: drumTiltX }}
            >
              <motion.div style={{ rotateY: drumTiltY }} className="[transform-style:preserve-3d]">
                <Image src={DRUM.src} alt="Cuisine Foods soya oil — bulk pail" width={DRUM.w} height={DRUM.h} priority sizes="350px" className="h-auto w-full select-none [filter:drop-shadow(0_34px_40px_rgb(16_22_24/0.30))]" draggable={false} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* THE LIQUID BECOMES THE UI — a gold divider the flow resolves into */}
        <motion.svg style={{ opacity: dividerOpacity }} className="pointer-events-none absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" aria-hidden>
          <motion.path style={{ pathLength: dividerDraw }} d="M0 42 C 320 18, 620 18, 760 30 C 980 48, 1180 20, 1440 34" stroke="rgb(var(--gold-500))" strokeWidth={2} strokeLinecap="round" />
        </motion.svg>

        <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
          {states.map((s, i) => (<SoyaDrop key={s.n} progress={scrollYProgress} index={i} total={states.length} />))}
        </div>
      </div>
    </div>
  );
}

function SoyaStateBlock({
  progress, index, total, state, compact,
}: { progress: MotionValue<number>; index: number; total: number; state: SoyaState; compact?: boolean }) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total;
  const opacity = useTransform(progress, [center - w - 0.02, center - w * 0.5, center + w * 0.5, center + w + 0.02], [0, 1, 1, 0]);
  const y = useTransform(progress, [center - w, center, center + w], [compact ? 20 : 30, 0, compact ? -20 : -30]);
  const titleY = useTransform(progress, [center - w, center - w * 0.4], ["105%", "0%"]);

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
      <div className="sf-mask mt-5"><motion.h2 style={{ y: titleY }} className="text-h2 text-ink">{state.title}</motion.h2></div>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{state.body}</p>
      {state.chips && <ul className="mt-6 flex flex-wrap gap-2.5">{state.chips.map((c) => (<li key={c} className="rounded-full border border-gold-300/70 bg-surface/60 px-3.5 py-1.5 text-sm font-medium text-ink-soft">{c}</li>))}</ul>}
    </motion.div>
  );
}

function SoyaDrop({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total;
  const opacity = useTransform(progress, [center - w, center, center + w], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [center - w, center, center + w], [1, 1.7, 1]);
  return <motion.span style={{ opacity, scale }} className="h-2 w-2 rounded-full bg-gold-500" />;
}

/* ------------------------------------------------------------- mobile pour */

function SoyaMobile({ states }: { states: SoyaState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const flow = useTransform(scrollYProgress, [0.04, 0.94], [0, 1]);
  const mask = "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, #000 22%, #000 56%, rgba(0,0,0,0.24) 82%, rgba(0,0,0,0) 100%)";
  const dividerOpacity = useTransform(scrollYProgress, [0.66, 0.84], [0, 1]);
  const dividerDraw = useTransform(scrollYProgress, [0.72, 0.98], [0, 1]);

  return (
    <div ref={ref} style={{ height: "240vh" }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(74% 42% at 50% 32%, rgb(var(--gold-100) / 0.5) 0%, transparent 66%)" }} />
        <div className="relative flex h-[54svh] items-center justify-center">
          <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-[42%] h-[128svh] w-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-90" style={{ WebkitMaskImage: mask, maskImage: mask }}>
            <SoyaLiquid progress={flow} className="h-full w-full" id="mobile" />
          </motion.div>
          <div className="relative h-[40svh]">
            <Image src={DRUM.src} alt="Cuisine Foods soya oil — bulk pail" width={DRUM.w} height={DRUM.h} priority sizes="70vw" className="h-full w-auto select-none [filter:drop-shadow(0_24px_28px_rgb(16_22_24/0.26))]" draggable={false} />
          </div>
        </div>
        <div className="container-x relative flex-1 pb-14 pt-2">
          <div className="relative h-full">
            {states.map((s, i) => (<SoyaStateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} compact />))}
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            {states.map((s, i) => (<SoyaDrop key={s.n} progress={scrollYProgress} index={i} total={states.length} />))}
          </div>
        </div>
        <motion.svg style={{ opacity: dividerOpacity }} className="pointer-events-none absolute bottom-0 left-0 w-full" viewBox="0 0 390 40" fill="none" preserveAspectRatio="none" aria-hidden>
          <motion.path style={{ pathLength: dividerDraw }} d="M0 26 C 90 12, 180 12, 230 20 C 300 30, 340 14, 390 22" stroke="rgb(var(--gold-500))" strokeWidth={1.6} strokeLinecap="round" />
        </motion.svg>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- reduced-motion / fallback */

function SoyaStatic({ states, mobile }: { states: SoyaState[]; mobile?: boolean }) {
  const full = useMotionValue(1);
  return (
    <div className="section overflow-hidden">
      <div className="container-x">
        <div className="relative mx-auto max-w-md">
          <div className="pointer-events-none absolute inset-x-[-10%] bottom-0 -z-0 h-[420px] opacity-90">
            <SoyaLiquid progress={full} className="h-full w-full" id="static" />
          </div>
          <div className="relative mx-auto w-[62%] max-w-[270px]">
            <Image src={DRUM.src} alt="Cuisine Foods soya oil — bulk pail" width={DRUM.w} height={DRUM.h} sizes="(max-width:1024px) 62vw, 270px" className="h-auto w-full select-none [filter:drop-shadow(0_26px_30px_rgb(16_22_24/0.26))]" draggable={false} />
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
