"use client";

import { useEffect, useState } from "react";
import type { QuoteService } from "@/config/quote-form";
import { QuoteForm } from "@/components/funnel/quote-form";
import { GhlQuoteEmbed } from "@/components/funnel/ghl-quote-embed";

/**
 * FunnelForm — decides which form a funnel shows.
 *
 *  - "custom": the premium three-step form (QuoteForm).
 *  - "ghl":    the official GoHighLevel embed, kept as the immediate fallback.
 *
 * Fallback routes, fastest first:
 *  1. Change `FORM_MODE` below to "ghl" – every funnel is back on the embed.
 *  2. Add ?form=ghl to any funnel URL – that visit uses the embed.
 *  3. If a submission fails, the visitor is offered the embed on the spot
 *     (buy funnel only – the official form has no collection questions yet).
 */
const FORM_MODE: "custom" | "ghl" = "custom";

export function FunnelForm({ service, embedTitle }: { service: QuoteService; embedTitle: string }) {
  const [mode, setMode] = useState<"custom" | "ghl">(FORM_MODE);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("form") === "ghl") setMode("ghl");
  }, []);

  if (mode === "ghl") return <GhlQuoteEmbed title={embedTitle} />;
  return <QuoteForm service={service} onUseStandardForm={service === "buy" ? () => setMode("ghl") : undefined} />;
}
