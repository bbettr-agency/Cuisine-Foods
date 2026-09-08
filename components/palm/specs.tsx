"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { PalmBotanical } from "@/components/palm/frond";
import { cn } from "@/lib/utils";

const DRUM = { src: "/images/website/product-palm.png", w: 827, h: 1027 };
type Spec = { label: string; value: string };

/**
 * PalmSpecs — the datasheet as a structured, architectural panel: drum offset
 * right, a vertical specification stack on the left. Hovering/focusing a spec
 * expands a gold rule, promotes its value, nudges the product, and reveals a
 * faint palm leaflet behind the product. Keyboard-navigable; stacked on mobile.
 */
export function PalmSpecs({ specs, title }: { specs: Spec[]; title: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-surface-2">
      <Container>
        <p className="eyebrow mb-3">Specifications</p>
        <h2 className="text-h2 text-ink"><MaskUp as="span">{title}</MaskUp></h2>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Spec stack */}
          <ol className="order-1">
            {specs.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.label} className="border-b border-line last:border-0">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={on}
                    className={cn("group flex w-full items-baseline gap-5 py-4 pl-4 pr-2 text-left transition-colors duration-300", on ? "bg-surface/70" : "hover:bg-surface/40")}
                  >
                    <span aria-hidden className={cn("mt-2 h-[2px] shrink-0 origin-left rounded-full bg-gold-500 transition-all duration-300 ease-out-expo", on ? "w-10" : "w-4 opacity-50")} />
                    <span className={cn("w-40 shrink-0 text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-300", on ? "text-gold-700" : "text-ink-faint")}>{s.label}</span>
                    <span className={cn("text-lg leading-snug transition-colors duration-300", on ? "text-ink" : "text-ink-soft")}>{s.value}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Product anchor with a faint leaflet motif */}
          <div className="relative order-2 flex justify-center">
            <div className="palm-canopy pointer-events-none absolute inset-0 -z-0 opacity-[0.4]" style={{ ["--unfurl" as string]: 1 }}>
              <PalmBotanical className="h-full w-full" />
            </div>
            <div aria-hidden className="pointer-events-none absolute bottom-[10%] left-1/2 h-8 w-[44%] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-2xl" />
            <motion.div
              className="relative w-[52%] max-w-[230px] lg:w-[72%]"
              animate={reduce ? undefined : { x: (active % 2 === 0 ? -1 : 1) * 3, rotate: active % 2 === 0 ? -0.6 : 0.6 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <Image src={DRUM.src} alt="Cuisine Foods 100% pure palm olein — bulk pail" width={DRUM.w} height={DRUM.h} sizes="(max-width:1024px) 45vw, 230px" className="h-auto w-full select-none [filter:drop-shadow(0_24px_28px_rgb(16_22_24/0.22))]" draggable={false} />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
