import type { Metadata } from "next";
import { ArrowRight, Check, Phone, Truck, ShieldCheck, UserRound, Recycle } from "lucide-react";
import { site } from "@/config/site";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { GhlQuoteEmbed } from "@/components/funnel/ghl-quote-embed";
import { FunnelHeader } from "@/components/funnel/funnel-header";
import { StickyQuoteCta } from "@/components/funnel/sticky-quote-cta";

/**
 * /quote — PAID-ADS landing page (Meta Ads & other paid traffic). Unlisted:
 * noindex/nofollow, excluded from the sitemap and site navigation, but publicly
 * reachable via its direct URL. Distraction-free (no site header/footer — see
 * ChromeGate). The quote form is the official GoHighLevel embed.
 *
 * Conversion order (form early, especially on mobile): hero + CTA → short trust &
 * benefits → QUOTE FORM → product info → reassurance + FAQs → final CTA.
 */
export const metadata: Metadata = {
  title: "Get a Bulk Cooking Oil Quote | Cuisine Foods",
  description:
    "Request a custom bulk cooking oil quote — premium Sunflower, Palm Olein and Soya, delivered nationwide. A regional rep calls you with pricing for your volume and area.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${site.url}/quote` },
};

/** Shared primary CTA — identical gold styling everywhere; full-width on mobile. */
const ctaCls =
  "inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 sm:w-auto";

const PRODUCTS = [
  { id: "product-sunflower-oil", name: "Sunflower Oil", blurb: "100% pure, light flavour. The all-rounder for frying, baking and salads.", bestFor: "Restaurants, bakeries, general use" },
  { id: "product-palm-olein", name: "Palm Olein", blurb: "Heat-stable and long-lasting — cuts oil costs in high-volume fryers.", bestFor: "Takeaways, fast-food, deep-frying" },
  { id: "product-soya-oil", name: "Soya Oil", blurb: "Neutral taste, versatile and cost-effective for high-volume production.", bestFor: "Food manufacturers, large catering" },
];

const WHO = [
  "Restaurants & caterers",
  "Takeaways & fast-food",
  "Bakeries",
  "Food manufacturers",
  "Oil resellers & distributors",
  "Private-label buyers",
];

const WHY = [
  { icon: Truck, title: "Nationwide delivery", body: "From our Centurion and Cape Town branches to every major metro — daily, weekly or monthly slots." },
  { icon: ShieldCheck, title: "Consistent quality", body: "Same oil, same spec, every delivery, so your food tastes the same to every customer." },
  { icon: UserRound, title: "A real rep, not a call centre", body: "One person who knows your kitchen, volumes and schedule. No automated systems, no queue." },
];

const STEPS = [
  { n: "1", title: "Tell us what you need", body: "Answer a few quick questions about your business, volume, oil type and delivery area. About a minute." },
  { n: "2", title: "A rep calls you", body: "A regional rep reaches out with custom pricing for your volume and area — usually within one business day." },
  { n: "3", title: "Confirm and we deliver", body: "Once you're happy with the quote, we schedule delivery to your kitchen on a rhythm that suits you." },
];

const FAQS = [
  { q: "Do you supply small businesses too?", a: "Yes. From a single-location takeaway to a national manufacturer — if you cook, sell or resell cooking oil, we'll supply you." },
  { q: "Why aren't prices listed online?", a: "Bulk oil pricing depends on your volume, oil type and delivery area, so we quote each business individually rather than posting a one-size price." },
  { q: "What if I'm just comparing prices?", a: "That's completely fine. Ask for a quote and compare — a real rep gives you a clear number for your volumes, with no obligation." },
  { q: "How quickly can you deliver?", a: "We run daily, weekly and monthly delivery slots from our Gauteng and Western Cape branches. Your rep sets a schedule that fits your kitchen." },
  { q: "Do you also collect used cooking oil?", a: "Yes — we offer compliant used cooking oil collection with documentation and recycling, alongside supply. Mention it on your enquiry." },
];

export default function QuotePage() {
  return (
    <div className="bg-paper text-ink">
      <FunnelHeader />

      {/* ---- Hero (mobile-first: CTA above the fold) ---- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 50% at 15% 0%, rgb(var(--gold-100) / 0.8) 0%, transparent 60%)" }} />
        <div className="mx-auto w-full max-w-5xl px-5 pb-8 pt-6 sm:px-8 sm:pb-14 sm:pt-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-surface px-3 py-1 text-xs font-semibold text-brand-800">
            <Check className="h-3.5 w-3.5 shrink-0 text-gold-600" /> Trusted by SA food businesses since 2009
          </span>
          <div className="mt-4 grid gap-6 sm:mt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div>
              <h1 className="font-display text-[30px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                Bulk cooking oil. Quoted fast. <span className="text-gold-700">Delivered nationwide.</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
                Premium Sunflower, Palm Olein &amp; Soya, supplied in bulk to South African kitchens. Tell us what you need — a real rep calls you with a custom quote, usually within one business day.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
                <a href="#quote-form" className={ctaCls}>Get my quote <ArrowRight className="h-4 w-4" /></a>
                <a href={whatsappUrl(whatsappPrefill.supply)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-base font-semibold text-ink transition-colors hover:border-ink/55 hover:bg-ink/[0.04] sm:w-auto">
                  WhatsApp us
                </a>
              </div>
              <p className="mt-3 text-sm text-ink-faint">No spam. No price-shopping bots. Just a quote from a real human.</p>
            </div>
            <div className="relative">
              <PlaceholderImage id="supply-pillar" aspectClass="aspect-[16/10] sm:aspect-[4/3]" className="shadow-soft" sizes="(max-width: 1024px) 100vw, 44vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Short trust + benefits (compact, keeps the form near the top) ---- */}
      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {WHY.map((b) => (
              <div key={b.title} className="flex gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-col sm:p-6">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><b.icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink sm:mt-1 sm:text-lg">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- The form (appears early) ---- */}
      <section id="quote-form" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">Get your custom quote</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">A few quick questions. One real quote.</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">A regional rep will call you with pricing for your volume and delivery area — usually within one business day.</p>
          </div>
          <div className="mt-6 sm:mt-8">
            <GhlQuoteEmbed />
          </div>
        </div>
      </section>

      {/* ---- Product information ---- */}
      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">What we supply</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Three premium cooking oils, supplied in bulk</h2>
          <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <PlaceholderImage id={p.id} aspectClass="aspect-[4/3]" rounded={false} sizes="(max-width: 640px) 100vw, 30vw" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink">{p.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.blurb}</p>
                  <p className="mt-3 text-xs text-ink-faint"><span className="font-semibold text-ink">Best for:</span> {p.bestFor}</p>
                  <p className="text-xs text-ink-faint"><span className="font-semibold text-ink">Available in:</span> 20L drums &amp; bulk</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-soft">Two ways to order: 20L drums for foodservice and kitchens, or bulk supply for high-volume manufacturers and resellers.</p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-500/25 bg-gold-100/40 p-5">
            <Recycle className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
            <p className="text-sm text-ink-soft"><span className="font-semibold text-ink">Also offering — Used Cooking Oil collection.</span> Compliant pickup, documentation and recycling, handled for you. Mention it on your enquiry.</p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {WHO.map((w) => (
              <li key={w} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink">
                <Check className="h-3.5 w-3.5 shrink-0 text-brand-600" /> {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Reassurance (how it works) + FAQ ---- */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">From form to first delivery — straightforward</h2>
          <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display font-bold text-ink">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink sm:mt-4">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">Common questions</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Before you submit</h2>
            <div className="mt-5 divide-y divide-line">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink">
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
        <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Ready for a quote built around your kitchen?</h2>
              <p className="mt-3 max-w-xl text-paper/75">A few quick questions and a regional rep calls you back — usually within one business day. No obligation.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <a href="#quote-form" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 sm:w-auto">
                  Get my quote <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl(whatsappPrefill.general)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-semibold text-paper hover:text-gold-300">
                  Or WhatsApp {site.contact.whatsapp.display}
                </a>
              </div>
            </div>
            <div className="text-sm text-paper/70">
              <a href={telUrl} className="inline-flex items-center gap-2 font-semibold text-paper hover:text-gold-300"><Phone className="h-4 w-4" /> {site.contact.phone.display}</a>
              <p className="mt-2">{site.contact.email}</p>
              <p className="mt-2">Gauteng &amp; Western Cape branches · Mon–Fri 08:00–17:00</p>
            </div>
          </div>
        </div>
      </section>

      <StickyQuoteCta />
    </div>
  );
}
