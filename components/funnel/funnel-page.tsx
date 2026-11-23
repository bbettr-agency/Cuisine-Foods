import { ArrowRight, Check, Phone } from "lucide-react";
import { site } from "@/config/site";
import { funnels, type FunnelContent } from "@/config/funnels";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { FunnelForm } from "@/components/funnel/funnel-form";
import { FunnelHeader } from "@/components/funnel/funnel-header";
import { FunnelFooter } from "@/components/funnel/funnel-footer";
import { FunnelLink } from "@/components/funnel/funnel-link";
import { ServiceSwitcher } from "@/components/funnel/service-switcher";
import { StickyQuoteCta } from "@/components/funnel/sticky-quote-cta";

/**
 * FunnelPage — the ONE shared layout for both paid-ads funnels (/quote/buy and
 * /quote/collect). Header, switcher, hero, trust strip, benefit cards, form
 * presentation, showcase cards, steps, FAQs, final CTA, cross-service block,
 * footer and mobile sticky CTA are identical; only `content` (config/funnels.ts)
 * changes. Distraction-free: no site header/footer (see ChromeGate).
 *
 * Conversion order (form early, especially on mobile): hero + CTA → trust →
 * benefits → FORM → showcase → how it works + FAQs → final CTA → cross-service.
 */

const FORM_ID = "quote-form";
const FORM_HREF = `#${FORM_ID}`;

/** Shared primary CTA — identical gold styling everywhere; full-width on mobile. */
const ctaCls =
  "inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 sm:w-auto";

const shell = "mx-auto w-full max-w-5xl px-5 sm:px-8";
const eyebrowCls = "text-xs font-semibold uppercase tracking-wide text-gold-700";

export function FunnelPage({ content: c }: { content: FunnelContent }) {
  const other = funnels[c.crossService.to];

  return (
    <div className="bg-paper pb-[84px] text-ink lg:pb-0">
      <FunnelHeader cta={{ href: FORM_HREF, label: c.header.cta, labelShort: c.header.ctaShort }} />
      <ServiceSwitcher current={c.id} />

      {/* ---- Hero (mobile-first: CTA above the fold) ---- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 50% at 15% 0%, rgb(var(--gold-100) / 0.8) 0%, transparent 60%)" }} />
        <div className={`${shell} pb-8 pt-6 sm:pb-14 sm:pt-10`}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-surface px-3 py-1 text-xs font-semibold text-brand-800">
            <Check className="h-3.5 w-3.5 shrink-0 text-gold-600" /> {c.hero.badge}
          </span>
          <div className="mt-4 grid gap-6 sm:mt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div>
              <h1 className="font-display text-[30px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {c.hero.title} <span className="text-gold-700">{c.hero.titleAccent}</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">{c.hero.body}</p>
              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
                <a href={FORM_HREF} className={ctaCls}>{c.hero.cta} <ArrowRight className="h-4 w-4 shrink-0" /></a>
                <a href={whatsappUrl(whatsappPrefill[c.hero.whatsappPrefill])} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-base font-semibold text-ink transition-colors hover:border-ink/55 hover:bg-ink/[0.04] sm:w-auto">
                  {c.hero.whatsappLabel}
                </a>
              </div>
              <p className="mt-3 text-sm text-ink-faint">{c.hero.note}</p>
            </div>
            <div className="relative">
              <PlaceholderImage id={c.hero.imageId} priority aspectClass="aspect-[16/10] sm:aspect-[4/3]" className="shadow-soft" sizes="(max-width: 1024px) 100vw, 44vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Trust indicators ---- */}
      <section aria-label="Why businesses trust Cuisine Foods" className="border-t border-line bg-surface">
        <ul className={`${shell} flex flex-col gap-2 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:py-5`}>
          {c.trustPoints.map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Check className="h-4 w-4 shrink-0 text-gold-600" /> {t}
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Benefits (compact, keeps the form near the top) ---- */}
      <section className="border-t border-line bg-surface-2/50">
        <div className={`${shell} py-10 sm:py-12`}>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {c.benefits.map((b) => (
              <div key={b.title} className="flex gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-col sm:p-6">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><b.icon className="h-5 w-5" /></span>
                <div>
                  <h2 className="font-display text-base font-bold text-ink sm:mt-1 sm:text-lg">{b.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- The form (appears early): custom three-step form, official GHL embed as fallback. ---- */}
      <section id={FORM_ID} className="scroll-mt-20 border-t border-line bg-paper">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="text-center">
            <p className={eyebrowCls}>{c.form.eyebrow}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">{c.form.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">{c.form.body}</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-faint">{c.form.reassurance}</p>
          </div>
          <div className="mt-6 sm:mt-8">
            <FunnelForm service={c.id} embedTitle={c.form.iframeTitle} />
          </div>
        </div>
      </section>

      {/* ---- Showcase (products / what the service includes) ---- */}
      <section className="border-t border-line bg-surface-2/50">
        <div className={`${shell} py-10 sm:py-14`}>
          <p className={eyebrowCls}>{c.showcase.eyebrow}</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{c.showcase.title}</h2>
          <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {c.showcase.cards.map((p) => (
              <div key={p.title} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <PlaceholderImage id={p.imageId} aspectClass="aspect-[4/3]" rounded={false} sizes="(max-width: 640px) 100vw, 30vw" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                  {p.meta?.length ? (
                    <div className="mt-3">
                      {p.meta.map((m) => (
                        <p key={m.label} className="text-xs text-ink-faint"><span className="font-semibold text-ink">{m.label}:</span> {m.value}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          {c.showcase.footnote ? <p className="mt-5 text-sm text-ink-soft">{c.showcase.footnote}</p> : null}
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-ink-faint">{c.showcase.audienceLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.showcase.audience.map((w) => (
              <li key={w} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink">
                <Check className="h-3.5 w-3.5 shrink-0 text-brand-600" /> {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- How it works + FAQ ---- */}
      <section className="border-t border-line">
        <div className={`${shell} py-10 sm:py-14`}>
          <p className={eyebrowCls}>How it works</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{c.steps.title}</h2>
          <ol className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {c.steps.items.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display font-bold text-ink">{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink sm:mt-4">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 max-w-3xl">
            <p className={eyebrowCls}>Common questions</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Before you submit</h2>
            <div className="mt-5 divide-y divide-line">
              {c.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-gold-600 transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="border-t border-line bg-ink text-paper">
        <div className={`${shell} py-12 sm:py-14`}>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-paper sm:text-3xl">{c.finalCta.title}</h2>
              <p className="mt-3 max-w-xl text-paper/75">{c.finalCta.body}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <a href={FORM_HREF} className={ctaCls}>{c.finalCta.cta} <ArrowRight className="h-4 w-4 shrink-0" /></a>
                <a href={whatsappUrl(whatsappPrefill[c.hero.whatsappPrefill])} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-semibold text-paper hover:text-gold-300">
                  Or WhatsApp {site.contact.whatsapp.display}
                </a>
              </div>
            </div>
            <div className="text-sm text-paper/70">
              <a href={telUrl} className="inline-flex items-center gap-2 font-semibold text-paper hover:text-gold-300"><Phone className="h-4 w-4" /> {site.contact.phone.display}</a>
              <p className="mt-2">{site.contact.email}</p>
              <p className="mt-2">Gauteng &amp; Western Cape branches · {site.contact.hours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Cross-service: the other half of the funnel system ---- */}
      <section aria-labelledby="cross-service-title" className="border-t border-line bg-surface-2/50">
        <div className={`${shell} py-10 sm:py-14`}>
          <FunnelLink
            href={other.path}
            className="group grid overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-all duration-300 hover:border-gold-500/60 hover:shadow-lift sm:grid-cols-[0.8fr_1.2fr]"
          >
            <div className="overflow-hidden">
              <PlaceholderImage id={c.crossService.imageId} rounded={false} aspectClass="aspect-[16/9] sm:aspect-auto sm:h-full sm:min-h-[240px]" className="border-0 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, 40vw" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <p className={eyebrowCls}>Also from Cuisine Foods</p>
              <h2 id="cross-service-title" className="mt-2 font-display text-2xl font-bold text-ink sm:text-[28px] sm:leading-tight">{c.crossService.title}</h2>
              <p className="mt-3 max-w-lg text-ink-soft">{c.crossService.body}</p>
              <span className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-base font-semibold text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper sm:w-fit">
                {c.crossService.cta} <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </FunnelLink>
        </div>
      </section>

      <FunnelFooter />
      <StickyQuoteCta label={c.stickyCta} />
    </div>
  );
}
