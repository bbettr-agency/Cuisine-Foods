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
import { SoyaLiquid } from "@/components/soya/liquid";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";

const DRUM = { src: "/images/website/product-cooking.png", w: 869, h: 1046 };

/**
 * SoyaHero — the approved interior hero with the Soya drum standing just above a
 * single elegant gold oil droplet (the first hint of the page's liquid language).
 * Restrained pointer depth on desktop (product and liquid at different depths).
 */
export function SoyaHero({
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
  const rotateY = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  const tx = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const ty = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  const liqX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const liqY = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const droplet = useMotionValue(0.05);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = zoneRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };
  const waMsg = intent === "uco" ? whatsappPrefill.uco : intent === "supply" ? whatsappPrefill.supply : whatsappPrefill.general;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(52% 60% at 14% 0%, rgb(var(--brand-50)) 0%, transparent 60%)" }} />
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
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

        <div ref={zoneRef} onMouseMove={onMove} onMouseLeave={reset} className="relative flex justify-center [perspective:1200px]">
          <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-80" style={reduce ? undefined : { x: liqX, y: liqY }}>
            <SoyaLiquid progress={droplet} className="h-full w-full" id="hero" />
          </motion.div>
          <motion.div className="relative w-[58%] max-w-[280px] [transform-style:preserve-3d] sm:w-[48%] lg:w-full lg:max-w-[330px]" style={reduce ? undefined : { rotateX, rotateY, x: tx, y: ty }}>
            <div className={reduce ? undefined : "drum-float"}>
              <Image src={DRUM.src} alt="Cuisine Foods soya oil — bulk pail" width={DRUM.w} height={DRUM.h} priority sizes="(max-width: 1024px) 50vw, 330px" className="h-auto w-full select-none [filter:drop-shadow(0_26px_30px_rgb(16_22_24/0.24))]" draggable={false} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
