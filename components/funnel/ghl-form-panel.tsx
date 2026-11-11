import { GhlQuoteEmbed } from "./ghl-quote-embed";
import { cn } from "@/lib/utils";

/**
 * GhlFormPanel — premium presentational wrapper for the official GoHighLevel
 * enquiry form, used on the MAIN website (contact page, request-a-quote page and
 * any enquiry section). It reuses the exact working embed from /quote
 * (GhlQuoteEmbed, form id 5qCMWMxLFGwkpxTkDvRg) — it does NOT recreate the form,
 * touch its fields/conditional logic, or add fake step UI.
 *
 * All this component owns is the FRAME: a centred, max-width column on the cream
 * page (no white box behind the dark GHL card), generous spacing and an optional
 * short reassurance line. GHL's form_embed.js (loaded by GhlQuoteEmbed) resizes
 * the iframe via postMessage as conditional questions appear, so there is no
 * internal scrollbar and no clipped field.
 */
export function GhlFormPanel({
  reassurance,
  className,
}: {
  reassurance?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)}>
      {reassurance ? (
        <p className="mb-5 text-center text-sm leading-relaxed text-ink-soft">{reassurance}</p>
      ) : null}
      <GhlQuoteEmbed />
    </div>
  );
}
