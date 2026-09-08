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
import { MaskUp } from "@/components/sunflower/motion-kit";
import { LivingHint } from "@/components/cooking/botanical";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";

const DRUM = { src: "/images/website/product-cooking.png", w: 869, h: 1046 };

/**
 * CookingHero — the approved interior hero, kept fundamentally intact, but the
 * black bucket is the dominant object and the black/white/gold/cream contrast
 * is pushed. One secret detail: a single fine gold stem sits just past the
 * bucket edge and, on hover, grows a few pixels and settles — the first hint of
 * the Living Label. Nothing else happens; the theatre later delivers the trick.
 */
export function CookingHero({
  eyebrow, h1, subhead, crumbs, intent, primaryLabel, primaryHref,
}: {
  eyebrow: string; h1: string; subhead: string; crumbs: Crumb[]; intent: CtaIntent; primaryLabel: string; primaryHref: string;
}) {
  const reduce = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 90, damping: 16, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [6, -6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-4, 4]);
  const tx = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const ty = useTransform(sy, [-0.5, 0.5], [-4, 4]);
  // the external hint sits at a shallower depth and answers by only a few px
  const hintX = useTransform(sx, [-0.5, 0.5], [4, -4]);
  const hintY = useTransform(sy, [-0.5, 0.5], [3, -3]);

  // the escaping-stem easter egg: at rest an almost-imperceptible peek; on hover
  // it grows and settles. Reduced-motion shows a small static hint.
  const hint = useMotionValue(reduce ? 0.32 : 0.06);
  const hintGrow = useSpring(hint, { stiffness: 70, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = zoneRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onEnter = () => { if (!reduce) hint.set(0.5); };
  const reset = () => { mx.set(0); my.set(0); if (!reduce) hint.set(0.06); };
  const waMsg = intent === "uco" ? whatsappPrefill.uco : intent === "supply" ? whatsappPrefill.supply : whatsappPrefill.general;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(54% 62% at 84% 4%, rgb(var(--gold-100) / 0.7) 0%, transparent 60%)" }} />
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-3 mt-1">{eyebrow}</p>
          <h1 className="text-display text-ink"><MaskUp as="span" mode="mount">{h1}</MaskUp></h1>
          <MaskUp as="p" mode="mount" className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft" delay={0.1}>{subhead}</MaskUp>
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            <Button href={primaryHref} variant="primary" size="lg">{primaryLabel}</Button>
            <Button href={whatsappUrl(waMsg)} variant="whatsapp" size="lg" external>{cta.whatsapp}</Button>
            <a href={telUrl} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"><Phone className="h-4 w-4 text-brand-600" /> {site.contact.phone.display}</a>
          </motion.div>
        </div>

        <div ref={zoneRef} onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={reset} className="relative flex justify-center [perspective:1200px]">
          {/* the secret hint — a single gold stem just past the bucket's right edge */}
          <motion.div
            aria-hidden
            className="living-art pointer-events-none absolute left-[58%] top-[38%] h-[62%] w-[62%]"
            style={reduce ? { ["--grow" as string]: hintGrow } : { ["--grow" as string]: hintGrow, x: hintX, y: hintY }}
          >
            <LivingHint className="h-full w-full" />
          </motion.div>
          <motion.div className="relative w-[62%] max-w-[300px] [transform-style:preserve-3d] sm:w-[52%] lg:w-full lg:max-w-[350px]" style={reduce ? undefined : { rotateX, rotateY, x: tx, y: ty }}>
            <div className={reduce ? undefined : "drum-float"}>
              <Image src={DRUM.src} alt="Cuisine Foods 100% pure cooking oil — 20L bucket" width={DRUM.w} height={DRUM.h} priority sizes="(max-width: 1024px) 55vw, 350px" className="h-auto w-full select-none [filter:drop-shadow(0_30px_36px_rgb(16_22_24/0.3))]" draggable={false} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
