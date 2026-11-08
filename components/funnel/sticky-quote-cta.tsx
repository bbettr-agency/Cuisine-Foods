"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * StickyQuoteCta — a mobile-only sticky "Get my quote" bar for the ads funnel.
 * It hides itself once the embedded form is on screen, so it never covers the
 * form or its controls.
 */
export function StickyQuoteCta() {
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const el = document.getElementById("quote-form");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setAtForm(entry.isIntersecting), { threshold: 0.04 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        atForm ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href="#quote-form"
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600"
      >
        Get my quote <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
