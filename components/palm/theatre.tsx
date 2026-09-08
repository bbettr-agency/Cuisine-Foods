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
import { PalmBotanical } from "@/components/palm/frond";

export type PalmState = { n: string; label: string; title: string; body: string; chips?: string[] };

const DRUM = { src: "/images/website/product-palm.png", w: 827, h: 1027 };

/**
 * PalmTheatre — the signature interaction of /palm-olein: THE UNFURL.
 * Architectural sibling to the Sunflower theatre (shared engineering: a sticky
 * stage driven by its own bounded scroll progress → four states + a canopy that
 * unfurls behind the drum) but a deliberately different visual world — a broad,
 * structured gold palm canopy rather than a radial flower. Desktop = pinned
 * stage; mobile = a tighter recomposed unfurl; reduced-motion = the finished
 * static canopy.
 */
export function PalmTheatre({ states }: { states: PalmState[] }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;
  return (
    <section aria-label="Palm Olein story" className="relative bg-paper">
      <div className="hidden lg:block">
        {live ? <PalmPinned states={states} /> : <PalmStatic states={states} />}
      </div>
      <div className="lg:hidden">
        {live ? <PalmMobile states={states} /> : <PalmStatic states={states} mobile />}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- desktop */

function PalmPinned({ states }: { states: PalmState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const unfurl = useTransform(scrollYProgress, [0.02, 0.88], [0.04, 1]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.6 });
  const pxVar = useMotionTemplate`${px}px`;
  const pyVar = useMotionTemplate`${py}px`;
  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  // Product motion — deliberate, architectural (not floral).
  const drumRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-2, 3, 6, 4, 0]);
  const drumScale = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], [1, 1.02, 1.05, 1.04]);
  const drumX = useTransform(scrollYProgress, [0, 0.5, 1], [4, -6, 4]);
  const drumRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 3, -1]);
  const drumTiltX = useTransform(py, (v) => v * -0.18);
  const drumTiltY = useTransform(px, (v) => v * 0.22);

  return (
    <div ref={ref} style={{ height: "360vh" }} className="relative">
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="sticky top-0 flex h-screen items-center overflow-hidden [perspective:1500px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(58% 60% at 34% 46%, rgb(var(--gold-100) / 0.5) 0%, transparent 60%)" }}
        />

        {/* BACKGROUND — the unfurling canopy (strong around the product, feather-
            masked away from the copy on the right). */}
        <motion.div
          aria-hidden
          className="palm-canopy pointer-events-none absolute bottom-[3%] left-[37%] h-[150vh] w-[150vh] -translate-x-1/2 opacity-[0.55]"
          style={{
            ["--unfurl" as string]: unfurl,
            ["--px" as string]: pxVar,
            ["--py" as string]: pyVar,
            WebkitMaskImage: "linear-gradient(92deg, #000 0%, #000 48%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.14) 100%)",
            maskImage: "linear-gradient(92deg, #000 0%, #000 48%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.14) 100%)",
          }}
        >
          <PalmBotanical className="h-full w-full" />
        </motion.div>

        <div className="container-x relative grid w-full grid-cols-[0.95fr_1.05fr] items-center gap-8">
          <div className="relative flex justify-center">
            <motion.div
              className="relative w-[74%] max-w-[360px] will-change-transform [transform-style:preserve-3d]"
              style={{ x: drumX, scale: drumScale, rotateZ: drumRotate, rotateY: drumRotateY, rotateX: drumTiltX }}
            >
              <motion.div style={{ rotateY: drumTiltY }} className="[transform-style:preserve-3d]">
                <Image
                  src={DRUM.src}
                  alt="Cuisine Foods 100% pure palm olein — bulk pail"
                  width={DRUM.w}
                  height={DRUM.h}
                  priority
                  sizes="360px"
                  className="h-auto w-full select-none [filter:drop-shadow(0_34px_40px_rgb(16_22_24/0.32))]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="relative min-h-[340px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -inset-y-10"
              style={{ background: "radial-gradient(112% 80% at 32% 50%, rgb(var(--paper)) 0%, rgb(var(--paper) / 0.7) 44%, rgb(var(--paper) / 0) 80%)" }}
            />
            {states.map((s, i) => (
              <PalmStateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} />
            ))}
          </div>
        </div>

        {/* progress — an architectural segmented rule */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {states.map((s, i) => (
            <PalmTick key={s.n} progress={scrollYProgress} index={i} total={states.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PalmStateBlock({
  progress, index, total, state, compact,
}: { progress: MotionValue<number>; index: number; total: number; state: PalmState; compact?: boolean }) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total;
  const opacity = useTransform(progress, [center - w - 0.02, center - w * 0.5, center + w * 0.5, center + w + 0.02], [0, 1, 1, 0]);
  const y = useTransform(progress, [center - w, center, center + w], [compact ? 20 : 30, 0, compact ? -20 : -30]);
  const titleY = useTransform(progress, [center - w, center - w * 0.4], ["105%", "0%"]);

  if (compact) {
    return (
      <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-start text-center">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-3xl font-bold leading-none text-gold-600 tabular-nums">{state.n}</span>
          <span className="h-4 w-px bg-gold-500/50" />
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-700">{state.label}</span>
        </div>
        <div className="sf-mask mt-3"><motion.h2 style={{ y: titleY }} className="text-2xl font-bold text-ink">{state.title}</motion.h2></div>
        <p className="mx-auto mt-3 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">{state.body}</p>
        {state.chips && (
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {state.chips.map((c) => (<li key={c} className="rounded-sm border border-gold-300/70 bg-surface/70 px-3 py-1 text-[13px] font-medium text-ink-soft">{c}</li>))}
          </ul>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <span className="font-display text-5xl font-bold leading-none text-gold-600 tabular-nums">{state.n}</span>
        <span className="h-6 w-px bg-gold-500/50" />
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-700">{state.label}</span>
      </div>
      <div className="sf-mask mt-5"><motion.h2 style={{ y: titleY }} className="text-h2 text-ink">{state.title}</motion.h2></div>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{state.body}</p>
      {state.chips && (
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {state.chips.map((c) => (
            <li key={c} className="rounded-sm border border-gold-300/70 bg-surface/60 px-3.5 py-1.5 text-sm font-medium text-ink-soft">{c}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function PalmTick({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const center = (index + 0.5) / total;
  const w = 0.5 / total;
  const scaleX = useTransform(progress, [center - w, center, center + w], [1, 2.4, 1]);
  const opacity = useTransform(progress, [center - w, center, center + w], [0.35, 1, 0.35]);
  return <motion.span style={{ opacity, scaleX }} className="h-[2px] w-7 origin-center rounded-full bg-gold-600" />;
}

/* ------------------------------------------------------------- mobile unfurl */

function PalmMobile({ states }: { states: PalmState[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const unfurl = useTransform(scrollYProgress, [0.05, 0.9], [0.03, 1]);
  const mask = "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, #000 24%, #000 54%, rgba(0,0,0,0.22) 80%, rgba(0,0,0,0) 100%)";

  return (
    <div ref={ref} style={{ height: "230vh" }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(72% 42% at 50% 30%, rgb(var(--gold-100) / 0.55) 0%, transparent 66%)" }}
        />
        <div className="relative flex h-[54svh] items-end justify-center">
          <motion.div
            aria-hidden
            className="palm-canopy pointer-events-none absolute bottom-[6%] left-1/2 h-[128svh] w-[172vw] -translate-x-1/2 opacity-[0.6]"
            style={{ ["--unfurl" as string]: unfurl, WebkitMaskImage: mask, maskImage: mask }}
          >
            <PalmBotanical className="h-full w-full" />
          </motion.div>
          <div className="relative mb-[3svh] h-[40svh]">
            <Image
              src={DRUM.src}
              alt="Cuisine Foods 100% pure palm olein — bulk pail"
              width={DRUM.w}
              height={DRUM.h}
              priority
              sizes="70vw"
              className="h-full w-auto select-none [filter:drop-shadow(0_24px_28px_rgb(16_22_24/0.28))]"
              draggable={false}
            />
          </div>
        </div>
        <div className="container-x relative flex-1 pb-14 pt-2">
          <div className="relative h-full">
            {states.map((s, i) => (
              <PalmStateBlock key={s.n} progress={scrollYProgress} index={i} total={states.length} state={s} compact />
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {states.map((s, i) => (<PalmTick key={s.n} progress={scrollYProgress} index={i} total={states.length} />))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- reduced-motion / fallback */

function PalmStatic({ states, mobile }: { states: PalmState[]; mobile?: boolean }) {
  return (
    <div className="section overflow-hidden">
      <div className="container-x">
        <div className="relative mx-auto max-w-md">
          <div className="palm-canopy pointer-events-none absolute -left-[20%] bottom-0 -z-0 h-[440px] w-[140%] opacity-[0.5]">
            <PalmBotanical className="h-full w-full" />
          </div>
          <div className="relative mx-auto w-[62%] max-w-[270px]">
            <Image src={DRUM.src} alt="Cuisine Foods 100% pure palm olein — bulk pail" width={DRUM.w} height={DRUM.h} sizes="(max-width:1024px) 62vw, 270px" className="h-auto w-full select-none [filter:drop-shadow(0_26px_30px_rgb(16_22_24/0.26))]" draggable={false} />
          </div>
        </div>
        <ol className={mobile ? "mt-12 space-y-10" : "mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2"}>
          {states.map((s) => (
            <li key={s.n}>
              <div className="flex items-center gap-2.5">
                <span className="font-display text-3xl font-bold leading-none text-gold-600 tabular-nums">{s.n}</span>
                <span className="h-4 w-px bg-gold-500/50" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">{s.label}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-ink">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              {s.chips && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.chips.map((c) => (<li key={c} className="rounded-sm border border-gold-300/70 px-3 py-1 text-sm text-ink-soft">{c}</li>))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
