"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";
import { SunflowerBotanical } from "@/components/sunflower/botanical";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export type FryingRoute = { name: string; when: string; href: string; tag: string };

/**
 * FryingHero — a SELECTION hero, not a product hero. /frying-oil is not a single
 * SKU: it is the decision page that routes a buyer to the right oil. So instead of
 * a packshot it presents the three real oils as route cards (truthful qualitative
 * guidance), plus a quote fallback. Same editorial display type, gold motif and
 * CTA language as the product heroes, so it stays in the Cuisine family.
 */
export function FryingHero({
  eyebrow,
  h1,
  subhead,
  crumbs,
  primaryLabel,
  primaryHref,
  routes,
}: {
  eyebrow: string;
  h1: string;
  subhead: string;
  crumbs: Crumb[];
  primaryLabel: string;
  primaryHref: string;
  routes: FryingRoute[];
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: easeOutExpo, delay } };

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(56% 64% at 86% 0%, rgb(var(--gold-100) / 0.7) 0%, transparent 60%)" }}
      />
      <Container className="relative">
        <div className="grid items-center gap-8 pt-9 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:pt-16">
          {/* LEFT — editorial column */}
          <div className="relative z-10 lg:pb-14">
            <Breadcrumbs items={crumbs} />
            <motion.p className="eyebrow mb-4 mt-1 lg:mt-2" {...rise(0)}>{eyebrow}</motion.p>
            <motion.h1 className="font-display text-display-lg font-extrabold text-ink" {...rise(0.05)}>{h1}</motion.h1>
            <motion.p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl" {...rise(0.12)}>{subhead}</motion.p>
            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" {...rise(0.2)}>
              <Button href={primaryHref} variant="primary" size="lg">{primaryLabel}</Button>
              <Button href={whatsappUrl(whatsappPrefill.supply)} variant="whatsapp" size="lg" external>{cta.whatsapp}</Button>
              <a href={telUrl} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink">
                <Phone className="h-4 w-4 text-gold-500" /> {site.contact.phone.display}
              </a>
            </motion.div>
          </div>

          {/* RIGHT — the chooser: route to the right oil */}
          <div className="relative lg:pb-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-10 h-[70%] w-[70%] opacity-40 sm:opacity-50"
            >
              <div className="sf-botanical h-full w-full"><SunflowerBotanical className="h-full w-full" /></div>
            </div>
            <motion.p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-gold-700"
              {...(reduce ? {} : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: viewportOnce, transition: { duration: 0.5 } })}
            >
              Choose by how you fry
            </motion.p>
            <ul className="relative z-10 flex flex-col gap-3">
              {routes.map((r, i) => (
                <motion.li
                  key={r.href}
                  {...(reduce
                    ? {}
                    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: viewportOnce, transition: { duration: 0.5, ease: easeOutExpo, delay: i * 0.08 } })}
                >
                  <Link
                    href={r.href}
                    className="group flex items-center gap-4 rounded-[var(--radius)] border border-line bg-surface/80 p-5 backdrop-blur-sm transition-all duration-200 hover:border-gold-500/60 hover:shadow-soft"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="flex items-baseline gap-2">
                        <span className="font-display text-lg font-bold text-ink">{r.name}</span>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold-700">{r.tag}</span>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{r.when}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
