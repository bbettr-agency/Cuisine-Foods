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
import { cn } from "@/lib/utils";

/**
 * ProductCta — the shared closing campaign section for every product page.
 *
 * Replaces the old pattern where a small packshot was shoved into a corner with
 * negative offsets (cropped, and hidden entirely on mobile). Here the real product
 * is a deliberate part of the dark/gold composition: a large, fully-visible,
 * grounded packshot on a product-specific gold motif (left), with the campaign
 * copy + CTA hierarchy dominant on the right. Mobile is composed separately —
 * copy + buttons first, then a grounded product display — so nothing is clipped
 * and the product never covers the headline or buttons. Engineering is shared;
 * the packshot + motif vary per page (Bloom / Unfurl / Pour / Living Label).
 */
export function ProductCta({
  title,
  body,
  primaryLabel,
  primaryHref,
  packshot,
  motif,
  motifClassName,
  packshotWidthClass = "w-[190px] sm:w-[230px] lg:w-[300px]",
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  packshot: { src: string; w: number; h: number; alt: string };
  motif: React.ReactNode;
  motifClassName?: string;
  packshotWidthClass?: string;
}) {
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
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink ring-1 ring-gold-500/15">
          <div className="relative grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-4">
            {/* PRODUCT — fully visible, grounded, motif behind */}
            <div className="relative order-2 flex items-end justify-center px-6 pb-10 pt-2 lg:order-1 lg:min-h-[420px] lg:justify-center lg:py-14">
              {/* product-specific gold motif */}
              <div aria-hidden className={cn("pointer-events-none absolute", motifClassName)}>{motif}</div>
              <div className={cn("relative", packshotWidthClass)}>
                <div aria-hidden className="absolute -bottom-3 left-1/2 h-8 w-[72%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl" />
                <Image
                  src={packshot.src}
                  alt={packshot.alt}
                  width={packshot.w}
                  height={packshot.h}
                  sizes="(max-width: 1024px) 230px, 300px"
                  className="relative h-auto w-full select-none [filter:drop-shadow(0_30px_36px_rgb(0_0_0/0.45))]"
                  draggable={false}
                />
              </div>
            </div>

            {/* COPY — dominant on the right */}
            <div className="relative order-1 px-6 pt-14 sm:px-10 lg:order-2 lg:py-20 lg:pl-0 lg:pr-12">
              <h2 className="text-display font-bold leading-[1.05] text-paper">
                <MaskUp as="span">Ready to order</MaskUp>{" "}
                <MaskUp as="span" delay={0.08}>{title}</MaskUp>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-100">{body}</p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
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
        </div>
      </Container>
    </section>
  );
}
