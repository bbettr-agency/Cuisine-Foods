/**
 * GhlCollectEmbed — integration point for the DEDICATED GoHighLevel "used oil
 * collection" form. This funnel must use its OWN form (a new form id), NOT the
 * bulk-quote form (5qCMWMxLFGwkpxTkDvRg) and NOT /api/lead.
 *
 * The official embed code has not been provided yet, so this renders a clearly
 * labelled DEV PLACEHOLDER — not a fake working form. When the embed arrives,
 * replace the placeholder below with the official iframe + form_embed.js (mirror
 * components/funnel/ghl-quote-embed.tsx: full-width iframe, declared height,
 * afterInteractive script) so it resizes responsively without clipping or a
 * double scrollbar.
 */
export function GhlCollectEmbed() {
  return (
    <div
      role="note"
      aria-label="Collection form placeholder — official GoHighLevel embed pending"
      className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-[25px] border-2 border-dashed border-gold-500/45 bg-surface/70 px-6 py-12 text-center"
    >
      <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
        Form integration pending
      </span>
      <p className="font-display text-lg font-bold text-ink">Arrange a collection</p>
      <p className="mx-auto max-w-sm text-sm leading-relaxed text-ink-soft">
        The dedicated GoHighLevel collection form will be embedded here. It is a separate form from the bulk-quote funnel
        and will capture your collection enquiry directly.
      </p>
      <p className="text-xs text-ink-faint">Awaiting the official embed code.</p>
    </div>
  );
}
