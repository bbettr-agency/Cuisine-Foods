"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/container";
import type { IconName } from "@/config/types";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type IntroPoint = { icon?: IconName; title: string; body: string };

/**
 * ProductIntro — the editorial opening beat that replaces the old generic
 * "three boxed cards" row. The lead paragraph carries the value; the verified
 * key points sit beside it as a typographic list with a drawn gold rule and a
 * gold index — facts integrated as editorial content, not a startup-dashboard
 * card grid. Asymmetric by design, calm reveal, honours reduced motion.
 */
export function ProductIntro({
  lead,
  points,
  eyebrow,
  className,
}: {
  lead: string;
  points: IntroPoint[];
  eyebrow?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: viewportOnce,
          transition: { duration: 0.55, ease: easeOutExpo, delay: i * 0.08 },
        };

  return (
    <Section className={className}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Lead — large editorial statement */}
        <div className="max-w-xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <motion.p
            className="font-display text-2xl font-semibold leading-[1.3] tracking-tight text-ink sm:text-[1.7rem]"
            {...(reduce ? {} : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: viewportOnce, transition: { duration: 0.6, ease: easeOutExpo } })}
          >
            {lead}
          </motion.p>
          <motion.span
            aria-hidden
            className="mt-7 block h-px w-24 origin-left bg-gradient-to-r from-gold-500 to-gold-500/0"
            {...(reduce ? {} : { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: viewportOnce, transition: { duration: 0.9, ease: easeOutExpo, delay: 0.15 } })}
          />
        </div>

        {/* Points — editorial list, gold index, no boxes */}
        <ul className="flex flex-col">
          {points.map((p, i) => (
            <motion.li
              key={p.title}
              className={cn("flex gap-5 py-6", i > 0 && "border-t border-line")}
              {...item(i)}
            >
              <span className="flex shrink-0 items-start gap-3">
                <span className="font-display text-sm font-semibold tabular-nums text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                {p.icon && (
                  <span className="mt-0.5 text-gold-600">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                )}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
