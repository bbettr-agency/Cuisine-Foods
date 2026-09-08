"use client";

import { useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import type { CtaIntent } from "@/config/conversion";
import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";

const DRUM = { src: "/images/website/product-sunflower.png", w: 837, h: 1024 };

/**
 * SunflowerHero — the approved interior hero layout, but the product is now a
 * physical, pointer-responsive object (transparent drum with a grounding
 * shadow, subtle idle float, and restrained tilt/parallax on desktop pointer
 * movement, spring-returning to neutral). Mobile / reduced-motion: no pointer
 * effects, no float — a calm static hero.
 */
export function SunflowerHero({
  eyebrow,
  h1,
  subhead,
  crumbs,
  intent,
  primaryLabel,
  primaryHref,
}: {
  eyebrow: string;
  h1: string;
  subhead: string;
  crumbs: Crumb[];
  intent: CtaIntent;
  primaryLabel: string;
  primaryHref: string;
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
  const shadowX = useTransform(sx, [-0.5, 0.5], [26, -26]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = zoneRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const waMsg = intent === "uco" ? whatsappPrefill.uco : intent === "supply" ? whatsappPrefill.supply : whatsappPrefill.general;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 60% at 12% 0%, rgb(var(--brand-50)) 0%, transparent 60%)" }}
      />
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-3 mt-1">{eyebrow}</p>
          <h1 className="text-display text-ink">
            <MaskUp as="span" mode="mount">{h1}</MaskUp>
          </h1>
          <MaskUp as="p" mode="mount" className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft" delay={0.1}>
            {subhead}
          </MaskUp>
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            <Button href={primaryHref} variant="primary" size="lg">{primaryLabel}</Button>
            <Button href={whatsappUrl(waMsg)} variant="whatsapp" size="lg" external>{cta.whatsapp}</Button>
            <a href={telUrl} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink">
              <Phone className="h-4 w-4 text-brand-600" /> {site.contact.phone.display}
            </a>
          </motion.div>
        </div>

        {/* Physical product */}
        <div ref={zoneRef} onMouseMove={onMove} onMouseLeave={reset} className="relative flex justify-center [perspective:1200px]">
          {/* moving grounding shadow */}
          <motion.div
            aria-hidden
            className="absolute bottom-[8%] left-1/2 -z-0 h-10 w-[52%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-2xl"
            style={reduce ? undefined : { x: shadowX }}
          />
          <motion.div
            className="relative w-[62%] max-w-[300px] [transform-style:preserve-3d] sm:w-[52%] lg:w-full lg:max-w-[360px]"
            style={reduce ? undefined : { rotateX, rotateY, x: tx, y: ty }}
          >
            <div className={reduce ? undefined : "drum-float"}>
              <Image
                src={DRUM.src}
                alt="Cuisine Foods 100% pure sunflower oil — bulk pail"
                width={DRUM.w}
                height={DRUM.h}
                priority
                sizes="(max-width: 1024px) 55vw, 360px"
                className="h-auto w-full select-none [filter:drop-shadow(0_26px_30px_rgb(16_22_24/0.24))]"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
