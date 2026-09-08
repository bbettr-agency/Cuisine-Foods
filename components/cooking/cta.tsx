"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion, useInView } from "framer-motion";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { LivingBotanical } from "@/components/cooking/botanical";

const DRUM = { src: "/images/website/product-cooking.png", w: 869, h: 1046 };

/**
 * CookingCta — the payoff of the Living Label. The gold artwork that escaped the
 * bucket now frames the closing call, the bucket enters cropped from the right,
 * and a final branch draws toward the primary button before stopping just short
 * of it. The button keeps Cuisine's restrained magnetic/arrow microinteraction.
 */
export function CookingCta({
  title, body, primaryLabel, primaryHref,
}: { title: string; body: string; primaryLabel: string; primaryHref: string }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
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
  const grown = reduce || inView;

  return (
    <section className="section">
      <Container>
        <div ref={cardRef} className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-16 ring-1 ring-gold-500/15 sm:px-12 sm:py-20">
          {/* the escaped artwork, now framing the CTA (grows in on view) */}
          <div
            aria-hidden
            className="living-art pointer-events-none absolute -right-[12%] top-1/2 h-[220%] w-[70%] -translate-y-1/2 opacity-70 transition-[--grow] duration-[1400ms] ease-out"
            style={{ ["--grow" as string]: grown ? 1 : 0.05, transitionProperty: "--grow" }}
          >
            <LivingBotanical className="h-full w-full" id="cta" />
          </div>
          {/* cropped bucket entering from the right */}
          <div className="pointer-events-none absolute -bottom-16 right-4 hidden w-[240px] opacity-95 lg:block xl:right-16">
            <Image src={DRUM.src} alt="" width={DRUM.w} height={DRUM.h} sizes="240px" className="h-auto w-full select-none [filter:drop-shadow(0_30px_34px_rgb(0_0_0/0.45))]" draggable={false} aria-hidden />
          </div>

          <div className="relative max-w-2xl">
            <h2 className="text-display font-bold leading-[1.05] text-paper">
              <MaskUp as="span">Ready to order</MaskUp>{" "}
              <span className="relative inline-block">
                <MaskUp as="span">{title}</MaskUp>
                {/* the final branch draws toward the button (as an underline first) */}
                <motion.span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                  initial={reduce ? { width: "100%" } : { width: 12 }}
                  animate={grown ? { width: "100%" } : undefined}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                />
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-100">{body}</p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={reset} className="relative">
                <motion.div style={reduce ? undefined : { x, y }}>
                  <Link href={primaryHref} className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold tracking-tight text-ink shadow-soft transition-colors duration-200 hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
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
