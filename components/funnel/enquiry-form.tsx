"use client";

import { useState } from "react";
import type { QuoteService } from "@/config/quote-form";
import { FunnelForm } from "@/components/funnel/funnel-form";
import { cn } from "@/lib/utils";

/**
 * EnquiryForm — the site's enquiry form on ordinary pages (/contact, /request-a-quote).
 * It is the SAME custom three-step form the /quote funnels use (FunnelForm → QuoteForm →
 * /api/quote), with one extra control: the visitor picks which service the enquiry is for.
 * Nothing is duplicated here – no fields, no validation, no integration.
 */
const OPTIONS: { id: QuoteService; label: string; embedTitle: string }[] = [
  { id: "buy", label: "Buying Cooking Oil", embedTitle: "Cuisine Foods – request a bulk cooking oil quote" },
  { id: "collect", label: "Used Oil Collection", embedTitle: "Cuisine Foods – arrange a used cooking oil collection" },
];

export function EnquiryForm({ initial = "buy" }: { initial?: QuoteService }) {
  const [service, setService] = useState<QuoteService>(initial);
  const current = OPTIONS.find((o) => o.id === service) ?? OPTIONS[0];

  return (
    <div>
      <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">I&apos;m interested in:</span>
        <div role="group" aria-label="Choose a service" className="grid w-full max-w-sm grid-cols-2 gap-1 rounded-full border border-line bg-surface p-1 sm:w-auto sm:max-w-none">
          {OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={o.id === service}
              onClick={() => setService(o.id)}
              className={cn(
                "inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-full px-3 text-[13px] font-semibold transition-colors duration-200 sm:px-5 sm:text-sm",
                o.id === service ? "bg-ink text-paper shadow-soft" : "text-ink-soft hover:bg-gold-100/70 hover:text-ink",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      {/* key: switching service starts a fresh form for that journey */}
      <FunnelForm key={service} service={service} embedTitle={current.embedTitle} pixelSide="left" />
    </div>
  );
}
