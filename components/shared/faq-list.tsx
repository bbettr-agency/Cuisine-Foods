import { Plus } from "lucide-react";
import type { Faq } from "@/config/faqs";
import { Reveal } from "@/components/ui/reveal";

/** FAQ accordion using native <details> — accessible, zero JS. Emit FAQPage schema alongside. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line">
      {faqs.map((f) => (
        <Reveal key={f.id}>
          <details className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
              <span className="font-display text-base font-semibold text-ink sm:text-lg">{f.q}</span>
              <Plus className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-45" aria-hidden />
            </summary>
            <p className="mt-3 pr-8 text-sm leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
