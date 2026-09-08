"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { PalmBotanical } from "@/components/palm/frond";

const DRUM = { src: "/images/website/product-palm.png", w: 827, h: 1027 };

/**
 * PalmCta — the closing beat, composed as a mirror of the theatre: the Palm drum
 * enters from the LEFT edge, a gold canopy frames the RIGHT, and the copy sits
 * between. Restrained magnetic primary button (drifts a few px toward the
 * pointer, arrow nudges) that stays fully clickable.
 */
export function PalmCta({
  title, body, primaryLabel, primaryHref,
}: { title: string; body: string; primaryLabel: string; primaryHref: string }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 14, mass: 0.4 });
  const y = useSpring(my, { stiffness: 200, damping: 14, mass: 0.4 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(Math.max(-6, Math.min(6, (e.clientX - (r.left + r.width / 2)) * 0.3)));
    my.set(Math.max(-5, Math.min(5, (e.clientY - (r.top + r.height / 2)) * 0.3)));
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <section className="section">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-16 ring-1 ring-gold-500/15 sm:px-12 sm:py-20">
          {/* canopy framing the right */}
          <div className="palm-canopy pointer-events-none absolute -right-32 -top-24 h-[520px] w-[520px] opacity-[0.16]" style={{ ["--unfurl" as string]: 1 }}>
            <PalmBotanical className="h-full w-full" />
          </div>
          {/* drum entering from the left edge */}
          <div className="pointer-events-none absolute -bottom-12 -left-6 hidden w-[220px] opacity-90 lg:block">
            <Image src={DRUM.src} alt="" width={DRUM.w} height={DRUM.h} sizes="220px" className="h-auto w-full select-none [filter:drop-shadow(0_30px_34px_rgb(0_0_0/0.4))]" draggable={false} aria-hidden />
          </div>

          <div className="relative ml-auto max-w-2xl text-right lg:pr-4">
            <h2 className="text-display font-bold leading-[1.05] text-paper">
              <MaskUp as="span">Ready to order</MaskUp>
              <br />
              <MaskUp as="span" delay={0.08}>{title}</MaskUp>
            </h2>
            <p className="ml-auto mt-5 max-w-lg text-base leading-relaxed text-brand-100">{body}</p>
            <div className="mt-8 flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:justify-end">
              <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={reset} className="relative">
                <motion.div style={reduce ? undefined : { x, y }}>
                  <Link
                    href={primaryHref}
                    className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold tracking-tight text-ink shadow-soft transition-colors duration-200 hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
              <Button href={whatsappUrl(whatsappPrefill.supply)} variant="onDark" size="lg" external>{cta.whatsapp}</Button>
              <Button href={telUrl} variant="ghost" size="lg" className="text-paper hover:bg-white/10"><Phone className="h-4 w-4" /> {cta.call}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
