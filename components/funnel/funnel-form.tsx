"use client";

import { useEffect, useState } from "react";
import type { QuoteService } from "@/config/quote-form";
import { QuoteForm } from "@/components/funnel/quote-form";
import { GhlQuoteEmbed } from "@/components/funnel/ghl-quote-embed";
import { MetaPixel } from "@/components/funnel/meta-pixel";

/**
 * FunnelForm — decides which form a funnel shows.
 *
 *  - "custom": the premium three-step form (QuoteForm).
 *  - "ghl":    the official GoHighLevel embed, kept as the immediate fallback.
 *
 * Fallback routes, fastest first:
 *  1. Set NEXT_PUBLIC_QUOTE_FORM_MODE=ghl and redeploy – every funnel is back on the embed.
 *  2. Add ?form=ghl to any funnel URL – that visit uses the embed.
 *  3. If a submission fails – including a returning contact, which the custom form does
 *     not handle yet – the visitor is offered the official form on the spot. On the
 *     collect journey it opens with "Used Oil Collection" preselected.
 */
// Set NEXT_PUBLIC_QUOTE_FORM_MODE=ghl in Vercel and redeploy to put every funnel back on the
// official embed without a code change (the rollback switch).
const FORM_MODE: "custom" | "ghl" = process.env.NEXT_PUBLIC_QUOTE_FORM_MODE === "ghl" ? "ghl" : "custom";

export function FunnelForm({
  service,
  embedTitle,
  pixelSide = "right",
}: {
  service: QuoteService;
  embedTitle: string;
  /** Which corner the consent banner uses on desktop (site pages keep the right corner for WhatsApp). */
  pixelSide?: "left" | "right";
}) {
  // null until we know which form this visit gets, so the pixel never loads next to the embed.
  const [mode, setMode] = useState<"custom" | "ghl" | null>(null);

  useEffect(() => {
    setMode(new URLSearchParams(window.location.search).get("form") === "ghl" ? "ghl" : FORM_MODE);
  }, []);

  // The official embed fires the same Meta pixel itself – ours is mounted only with the custom form.
  // On the collect journey the official form opens with its "Used Oil Collection" option preselected.
  if (mode === "ghl") return <GhlQuoteEmbed title={embedTitle} prefill={service === "collect" ? { multi_dropdown_4m53: "Used Oil Collection" } : undefined} />;
  return (
    <>
      {mode === "custom" && <MetaPixel aboveStickyCta side={pixelSide} />}
      <QuoteForm service={service} onUseStandardForm={() => setMode("ghl")} />
    </>
  );
}
