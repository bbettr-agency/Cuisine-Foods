import { ArrowRight } from "lucide-react";
import { funnels, funnelSelect } from "@/config/funnels";
import { whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { FunnelHeader } from "@/components/funnel/funnel-header";
import { FunnelFooter } from "@/components/funnel/funnel-footer";
import { FunnelLink } from "@/components/funnel/funnel-link";
import { MetaPixel } from "@/components/funnel/meta-pixel";

/**
 * FunnelSelect — /quote, the single entry point of the funnel system. Two equal,
 * fully clickable choice cards; each leads to its dedicated funnel with the ad's
 * attribution parameters preserved. No site navigation, nothing else to do.
 */
export function FunnelSelect() {
  const s = funnelSelect;
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      {/* One PageView for the selection page (inert unless the pixel is enabled). No GHL embed here, so no double count. */}
      <MetaPixel />
      <FunnelHeader />

      <section className="relative flex-1 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 45% at 50% 0%, rgb(var(--gold-100) / 0.85) 0%, transparent 65%)" }} />
        <div className="mx-auto w-full max-w-5xl px-5 pb-12 pt-8 sm:px-8 sm:pb-20 sm:pt-14">
          <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">{s.eyebrow}</p>
            <h1 className="mt-3 font-display text-[28px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">{s.title}</h1>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">{s.body}</p>
          </div>

          <div className="mt-7 grid gap-5 sm:mt-12 md:grid-cols-2 md:gap-7">
            {s.choices.map((choice, i) => (
              <FunnelLink
                key={choice.to}
                href={funnels[choice.to].path}
                style={{ animationDelay: `${120 + i * 90}ms` }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft outline-none transition-all duration-300 ease-out hover:border-gold-500/70 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-safe:animate-fade-up motion-safe:hover:-translate-y-1.5"
              >
                <div className="relative overflow-hidden">
                  <PlaceholderImage
                    id={choice.imageId}
                    priority
                    rounded={false}
                    aspectClass="aspect-[16/9] md:aspect-[4/3]"
                    className="border-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-paper/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink sm:bottom-4 sm:left-5">
                    {choice.eyebrow}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-[26px] sm:leading-tight">{choice.title}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft sm:text-base">{choice.body}</p>
                  <span className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 text-base font-semibold text-ink shadow-soft transition-colors duration-200 group-hover:bg-gold-600">
                    {choice.cta}
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </FunnelLink>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-ink-faint sm:mt-9">
            {s.footnote}{" "}
            <a href={whatsappUrl(whatsappPrefill.general)} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-gold-700">
              Or WhatsApp us
            </a>
          </p>
        </div>
      </section>

      <FunnelFooter />
    </div>
  );
}
