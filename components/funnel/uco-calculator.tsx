"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { whatsappUrl } from "@/config/conversion";
import { Reveal } from "@/components/ui/reveal";

/**
 * UCO value estimator — a commercial lead magnet. The customer sets their weekly
 * used-oil volume and is routed to a quote with that volume pre-filled.
 *
 * TRUTH GUARD: a rand figure is shown ONLY when `site.uco.rateVerified` is true
 * (i.e. the client has confirmed a current rate). While unverified we never print
 * a fabricated price — the tool captures the volume and explains, honestly, the
 * variables that set the rate, then hands off to a real quote.
 */
export function UcoCalculator() {
  const [litres, setLitres] = useState(50);
  const { rateLow, rateHigh, rateVerified } = site.uco;
  const perMonth = Math.round(litres * 4.33);
  const fmt = (n: number) => "R" + n.toLocaleString("en-ZA");
  const low = Math.round((perMonth * rateLow) / 10) * 10;
  const high = Math.round((perMonth * rateHigh) / 10) * 10;

  const waMsg = `Hi Cuisine Foods, we produce about ${litres}L of used cooking oil per week – what rate can you offer and can you collect?`;

  return (
    <Reveal>
      <div className="rounded-[var(--radius)] border border-gold-500/30 bg-gold-100/40 p-6 sm:p-8">
        <p className="eyebrow mb-2">Estimate your collection</p>
        <h3 className="font-display text-xl font-bold text-ink">What could your used oil be worth?</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Set your weekly used-oil volume and we&apos;ll confirm a buy-back rate and a collection schedule for your kitchen.
        </p>

        <div className="mt-6">
          <label htmlFor="uco-litres" className="flex items-baseline justify-between text-sm font-medium text-ink">
            <span>Used oil produced per week</span>
            <span className="font-display text-lg font-bold text-brand-700">{litres} L</span>
          </label>
          <input
            id="uco-litres"
            type="range"
            min={10}
            max={500}
            step={10}
            value={litres}
            onChange={(e) => setLitres(Number(e.target.value))}
            className="mt-3 w-full accent-gold-600"
            aria-describedby="uco-estimate"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-faint"><span>10 L</span><span>500 L</span></div>
        </div>

        <div id="uco-estimate" className="mt-6 rounded-xl bg-surface p-5 text-center">
          {rateVerified ? (
            <>
              <p className="text-sm text-ink-soft">Estimated monthly rebate</p>
              <p className="mt-1 font-display text-3xl font-bold text-brand-700">{fmt(low)} – {fmt(high)}</p>
              <p className="mt-1 text-xs text-ink-faint">
                Estimate only (≈R{rateLow}–R{rateHigh}/litre). Your exact rate depends on volume, quality and area.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-ink-soft">That&apos;s roughly</p>
              <p className="mt-1 font-display text-3xl font-bold text-brand-700">{perMonth} L<span className="text-lg font-semibold text-ink-soft"> / month</span></p>
              <p className="mt-2 text-xs leading-relaxed text-ink-faint">
                Your rate per litre depends on volume, the oil&apos;s quality and your location. Send us your volume and
                we&apos;ll come back with today&apos;s rate for your kitchen.
              </p>
            </>
          )}
        </div>

        <div className="mt-5">
          <a
            href={whatsappUrl(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 font-semibold text-ink transition-colors hover:bg-gold-600"
          >
            Get my rate on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
