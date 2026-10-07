import { Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CrossSell } from "@/components/funnel/cross-sell";

/**
 * ClosedLoopBand — the connective "supply → recovery" moment on product pages.
 *
 * The closed-loop cross-sell card used to sit alone in a cream field with no
 * transition. This frames it with a short commercial bridge ("Oil in. Used oil
 * out.") on a warm surface, so the page reads logically: Cuisine supplies the
 * oil, the kitchen uses it, Cuisine can also collect eligible used oil. It wraps
 * the existing CrossSell (unchanged) — supply stays the primary intent.
 */
export function ClosedLoopBand({
  label,
  href,
  blurb,
  intro = "The same partner for both halves of your oil budget – the oil going in, and the used oil coming out.",
}: {
  label: string;
  href: string;
  blurb: string;
  intro?: string;
}) {
  return (
    <Section alt className="py-14 lg:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-3 justify-center">Supply + recovery</p>
        <h2 className="text-h2 text-ink">Oil in. Used oil out.</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-soft">{intro}</p>
      </Reveal>
      <div className="mx-auto mt-8 max-w-3xl">
        <CrossSell label={label} href={href} blurb={blurb} />
      </div>
    </Section>
  );
}
