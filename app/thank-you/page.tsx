import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Thank you | Cuisine Foods",
  description: "Thanks for your enquiry — we'll be in touch shortly.",
  path: "/thank-you",
  noindex: true,
});

/** Thank-you — confirmation + the closed-loop cross-sell (where the loop compounds). */
export default function ThankYouPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <CheckCircle2 className="h-9 w-9" />
          </span>
          <h1 className="mt-6 text-display text-ink">Thank you — we've got it</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Your enquiry is on its way to our team. We'll come back to you shortly, usually on WhatsApp,
            with pricing and next steps.
          </p>
          <div className="mt-8">
            <Button href="/" variant="outline">Back to home</Button>
          </div>
        </Reveal>

        {/* Cross-sell — the loop closing */}
        <Reveal className="mt-12">
          <div className="rounded-[var(--radius)] border border-brand-700/20 bg-brand-50/60 p-6 text-left">
            <p className="eyebrow mb-1.5">While you're here</p>
            <p className="font-display text-lg font-semibold text-ink">Did you know we do both sides of the oil?</p>
            <p className="mt-1 text-sm text-ink-soft">
              If you enquired about supply, we also collect your used oil — and pay you for it. If you enquired about
              collection, we also deliver your fresh oil. One partner, one account.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/bulk-cooking-oil-supply" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:gap-2">Bulk oil supply <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/used-cooking-oil-collection" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:gap-2">Used-oil collection <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
