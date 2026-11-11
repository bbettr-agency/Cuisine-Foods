"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * StickyQuoteCta — a mobile-only sticky CTA bar for an ads funnel (/quote,
 * /collect). It hides itself while the embedded form is on screen, so it never
 * covers the form or its controls, and reappears once the visitor scrolls past
 * it. Defaults to the quote funnel. Respects the iPhone safe-area inset.
 */
export function StickyQuoteCta({
  label = "Get my quote",
  targetId = "quote-form",
}: {
  label?: string;
  targetId?: string;
} = {}) {
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setAtForm(entry.isIntersecting), { threshold: 0.03 });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        atForm ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href={`#${targetId}`}
        className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 text-base font-semibold text-ink shadow-lift transition-colors hover:bg-gold-600"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
