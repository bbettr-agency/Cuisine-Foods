import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/funnel/logo";

/**
 * FunnelHeader — a thin, sticky nav for an ads landing page (/quote, /collect).
 * Deliberately minimal (no full site menu, no distractions): just the logo, a
 * clear way back to the main website, and a persistent CTA, so visitors never
 * feel trapped on the funnel. CTA defaults to the quote funnel.
 */
export function FunnelHeader({
  ctaHref = "#quote-form",
  ctaLabel = "Get my quote",
  ctaLabelShort = "Get quote",
}: {
  ctaHref?: string;
  ctaLabel?: string;
  ctaLabelShort?: string;
} = {}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-2.5 sm:px-8 sm:py-3">
        <Logo tone="dark" imgClassName="h-7 w-auto sm:h-8" />
        <div className="flex items-center gap-1.5 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Main website</span>
            <span className="sm:hidden">Website</span>
          </Link>
          <a
            href={ctaHref}
            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gold-500 px-4 text-sm font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 sm:px-5"
          >
            <span className="hidden sm:inline">{ctaLabel}</span>
            <span className="sm:hidden">{ctaLabelShort}</span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </header>
  );
}
