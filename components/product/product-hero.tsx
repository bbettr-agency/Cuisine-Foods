"use client";

import { useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import type { CtaIntent } from "@/config/conversion";
import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type HeroSpec = { label: string; value: string };

/**
 * ProductHero — the recomposed interior hero shared by every product page.
 *
 * It replaces the old sparse "small text left / floating packshot right / empty
 * cream" layout with an intentional composition: large editorial display type,
 * a product-specific gold motif anchoring a tonal STAGE (so the packshot sits in
 * a designed space rather than a void), a large physical packshot with grounding
 * shadow + restrained pointer parallax, a clear CTA hierarchy, and a full-width
 * editorial SPEC RAIL that integrates the verified facts (no boxed card grid).
 *
 * Engineering is shared; composition varies by the props each view passes — the
 * motif, the stage tone (light / dark for the bulk bucket), the packshot size
 * and the curated rail facts. The protected signature theatres are untouched;
 * this is only the hero that precedes them.
 */
export function ProductHero({
  eyebrow,
  h1,
  subhead,
  crumbs,
  intent,
  primaryLabel,
  primaryHref,
  packshot,
  motif,
  motifClassName,
  specs,
  stage = "light",
  accent = "gold",
  waMessage,
  packshotWidthClass = "w-[66%] max-w-[300px] lg:max-w-[380px]",
}: {
  eyebrow: string;
  h1: string;
  subhead: string;
  crumbs: Crumb[];
  intent: CtaIntent;
  primaryLabel: string;
  primaryHref: string;
  packshot: { src: string; w: number; h: number; alt: string };
  motif: React.ReactNode;
  motifClassName?: string;
  specs: HeroSpec[];
  stage?: "light" | "dark";
  accent?: "gold" | "brand";
  waMessage?: string;
  packshotWidthClass?: string;
}) {
  const reduce = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 90, damping: 16, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [7, -7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  const tx = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const ty = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  const shadowX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  // the motif counter-parallaxes a touch behind the product for depth
  const motifX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const motifY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = zoneRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  const dark = stage === "dark";
  const railSpecs = specs.slice(0, 4);
  const waMsg = waMessage ?? (intent === "uco" ? whatsappPrefill.uco : intent === "supply" ? whatsappPrefill.supply : whatsappPrefill.general);

  // Mount entrance — plays on load and always resolves to visible (no whileInView
  // race above the fold, no mask that can leave content hidden).
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: easeOutExpo, delay } };

  const washColor = accent === "brand" ? "rgb(var(--brand-50))" : "rgb(var(--gold-100) / 0.7)";

  return (
    <section className={cn("relative overflow-hidden border-b", dark ? "border-white/10 bg-ink text-paper" : "border-line")}>
      {/* ambient wash — anchors the composition toward the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: dark
          ? "radial-gradient(60% 70% at 82% 2%, rgb(var(--gold-500) / 0.14) 0%, transparent 62%)"
          : `radial-gradient(56% 64% at 84% 0%, ${washColor} 0%, transparent 60%)` }}
      />

      <Container className="relative">
        {/* Breadcrumb — normal flow on mobile (never over the packshot) */}
        <div className="pt-6 lg:hidden"><Breadcrumbs items={crumbs} /></div>

        <div className="grid items-center gap-6 pt-4 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pt-16">
          {/* LEFT — editorial column */}
          <div className="relative z-10 order-2 lg:order-1 lg:pb-14">
            <div className="hidden lg:block"><Breadcrumbs items={crumbs} /></div>
            <motion.p className={`eyebrow mb-4 mt-1 lg:mt-2 ${dark ? "text-gold-400" : ""}`} {...rise(0)}>{eyebrow}</motion.p>
            <motion.h1
              className={`font-display text-display-lg font-extrabold ${dark ? "text-paper" : "text-ink"}`}
              {...rise(0.05)}
            >
              {h1}
            </motion.h1>
            <motion.p
              className={`mt-5 max-w-xl text-lg leading-relaxed sm:text-xl ${dark ? "text-paper/75" : "text-ink-soft"}`}
              {...rise(0.12)}
            >
              {subhead}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              {...rise(0.2)}
            >
              <Button href={primaryHref} variant="primary" size="lg">{primaryLabel}</Button>
              <Button href={whatsappUrl(waMsg)} variant="whatsapp" size="lg" external>{cta.whatsapp}</Button>
              <a
                href={telUrl}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${dark ? "text-paper/70 hover:text-paper" : "text-ink-soft hover:text-ink"}`}
              >
                <Phone className="h-4 w-4 text-gold-500" /> {site.contact.phone.display}
              </a>
            </motion.div>
          </div>

          {/* RIGHT — the stage: motif + physical packshot */}
          <div
            ref={zoneRef}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className="relative order-1 flex min-h-[300px] items-end justify-center [perspective:1200px] lg:order-2 lg:min-h-[500px]"
          >
            {/* tonal stage panel — fills the former empty canvas with a designed surface */}
            <div
              aria-hidden
              className={cn(
                "absolute inset-x-0 bottom-0 top-10 rounded-t-[2.25rem] lg:top-8",
                dark
                  ? "bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent ring-1 ring-inset ring-white/5"
                  : "bg-gradient-to-b from-[rgb(var(--surface-2))] via-[rgb(var(--surface-2)/0.55)] to-transparent",
              )}
            />

            {/* product-specific gold motif */}
            <motion.div
              aria-hidden
              className={cn("pointer-events-none absolute", motifClassName)}
              style={reduce ? undefined : { x: motifX, y: motifY }}
            >
              {motif}
            </motion.div>

            {/* grounding shadow */}
            <motion.div
              aria-hidden
              className={cn("absolute bottom-[7%] left-1/2 h-10 w-[46%] -translate-x-1/2 rounded-[50%] blur-2xl", dark ? "bg-black/55" : "bg-ink/25")}
              style={reduce ? undefined : { x: shadowX }}
            />

            {/* packshot — entrance (outer) separated from pointer transforms (inner) */}
            <motion.div
              className={cn("relative mb-[6%]", packshotWidthClass)}
              {...(reduce ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: easeOutExpo, delay: 0.1 } })}
            >
              <motion.div
                className="[transform-style:preserve-3d]"
                style={reduce ? undefined : { rotateX, rotateY, x: tx, y: ty }}
              >
                <div className={reduce ? undefined : "drum-float"}>
                  <Image
                    src={packshot.src}
                    alt={packshot.alt}
                    width={packshot.w}
                    height={packshot.h}
                    priority
                    sizes="(max-width: 1024px) 66vw, 400px"
                    className="h-auto w-full select-none [filter:drop-shadow(0_30px_38px_rgb(16_22_24/0.3))]"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* SPEC RAIL — verified facts, integrated as editorial type (no card grid) */}
        {railSpecs.length > 0 && (
          <motion.dl
            className={cn(
              "relative z-10 mt-2 flex flex-wrap gap-x-10 gap-y-6 border-t pb-10 pt-6 lg:mt-0",
              dark ? "border-white/10" : "border-line",
            )}
            {...rise(0.3)}
          >
            {railSpecs.map((s) => (
              <div key={s.label} className="flex min-w-[150px] max-w-[260px] items-start gap-3">
                <span aria-hidden className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />
                <div>
                  <dt className={`text-[0.68rem] font-semibold uppercase tracking-[0.15em] ${dark ? "text-gold-400" : "text-gold-700"}`}>{s.label}</dt>
                  <dd className={`mt-1 text-sm leading-snug ${dark ? "text-paper/85" : "text-ink"}`}>{s.value}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        )}
      </Container>
    </section>
  );
}
