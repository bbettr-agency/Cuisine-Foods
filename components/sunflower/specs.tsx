"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { cn } from "@/lib/utils";

const DRUM = { src: "/images/website/product-sunflower.png", w: 837, h: 1024 };

type Spec = { label: string; value: string };

/**
 * SunflowerSpecs — the "at a glance" data, turned into a calm interactive panel.
 * The drum anchors the left; each spec is a focusable row. Hovering/focusing a
 * row makes it prominent (gold accent draws in, others recede) and nudges the
 * product a pixel or two. Fully keyboard-navigable. Mobile: a clean stacked list.
 */
export function SunflowerSpecs({ specs, title }: { specs: Spec[]; title: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-surface-2">
      <Container>
        <p className="eyebrow mb-3">Specifications</p>
        <h2 className="text-h2 text-ink">
          <MaskUp as="span">{title}</MaskUp>
        </h2>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Product anchor */}
          <div className="relative order-2 flex justify-center lg:order-1">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[10%] left-1/2 h-8 w-[46%] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-2xl"
            />
            <motion.div
              className="relative w-[52%] max-w-[240px] lg:w-[74%]"
              animate={reduce ? undefined : { x: (active % 2 === 0 ? -1 : 1) * 3, rotate: active % 2 === 0 ? -0.6 : 0.6 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <Image
                src={DRUM.src}
                alt="Cuisine Foods 100% pure sunflower oil — bulk pail"
                width={DRUM.w}
                height={DRUM.h}
                sizes="(max-width: 1024px) 45vw, 240px"
                className="h-auto w-full select-none [filter:drop-shadow(0_24px_28px_rgb(16_22_24/0.22))]"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Spec rows */}
          <ul className="order-1 divide-y divide-line lg:order-2">
            {specs.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={on}
                    className={cn(
                      "group relative flex w-full items-baseline gap-5 py-4 pl-5 pr-2 text-left transition-colors duration-300",
                      on ? "bg-surface/70" : "hover:bg-surface/40",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 rounded-full bg-gold-500 transition-all duration-300 ease-out-expo",
                        on && "h-[68%]",
                      )}
                    />
                    <span
                      className={cn(
                        "w-40 shrink-0 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                        on ? "text-gold-700" : "text-ink-faint",
                      )}
                    >
                      {s.label}
                    </span>
                    <span
                      className={cn(
                        "text-lg leading-snug transition-all duration-300",
                        on ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {s.value}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
