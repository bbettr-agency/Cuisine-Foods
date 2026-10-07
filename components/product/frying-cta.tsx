"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { SunflowerBotanical } from "@/components/sunflower/botanical";

export type FryingCtaChoice = { name: string; tag: string; href: string };

/**
 * FryingCta – the closing beat for /frying-oil. /frying-oil is NOT a SKU, so this
 * keeps the dark/gold campaign language of the product CTAs but presents the three
 * REAL oils as the composition (an honest selection) instead of a fabricated
 * "frying oil" packshot. Primary action stays the quote; the oil cards route on.
 */
export function FryingCta({
  title,
  body,
  primaryLabel,
  primaryHref,
  choices,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  choices: FryingCtaChoice[];
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
          <div aria-hidden className="sf-botanical pointer-events-none absolute -right-20 -top-24 h-[460px] w-[460px] opacity-[0.14]">
            <SunflowerBotanical className="h-full w-full" />
          </div>

          <div className="relative grid gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-20 lg:pr-12">
            {/* COPY */}
            <div>
              <h2 className="text-display font-bold leading-[1.05] text-paper">
                <MaskUp as="span">{title}</MaskUp>
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

            {/* THREE REAL OILS — the honest selection */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold-400">Or go straight to the oil</p>
              <ul className="flex flex-col gap-2.5">
                {choices.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors duration-200 hover:border-gold-500/50 hover:bg-white/[0.06]"
                    >
                      <span className="flex-1">
                        <span className="font-display text-base font-bold text-paper">{c.name}</span>
                        <span className="ml-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold-400">{c.tag}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gold-400 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
