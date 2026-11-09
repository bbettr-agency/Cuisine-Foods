import type { Metadata } from "next";
import { ArrowRight, Check, Phone, CalendarClock, Banknote, ShieldCheck, Recycle } from "lucide-react";
import { site } from "@/config/site";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { GhlCollectEmbed } from "@/components/funnel/ghl-collect-embed";
import { FunnelHeader } from "@/components/funnel/funnel-header";
import { StickyQuoteCta } from "@/components/funnel/sticky-quote-cta";

/**
 * /collect — PAID-ADS landing page for USED COOKING OIL COLLECTION (Meta Ads &
 * other paid traffic). Unlisted: noindex/nofollow, excluded from sitemap and
 * nav, publicly reachable via its direct URL. Distraction-free (no site chrome —
 * see ChromeGate). Uses its OWN dedicated GHL collection form (placeholder until
 * the official embed is supplied) — never the bulk-quote form or /api/lead.
 *
 * Conversion order: hero + CTA → quick benefits → COLLECTION FORM → how it works
 * → responsible recovery → FAQs → final CTA.
 */
export const metadata: Metadata = {
  title: "Used Cooking Oil Collection — Arrange a Collection | Cuisine Foods",
  description:
    "Used cooking oil? Cuisine Foods collects it and pays you for qualifying oil. Scheduled, documented collection, recovered responsibly for biodiesel. Arrange a collection.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${site.url}/collect` },
};

const ctaCls =
  "inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 sm:w-auto";

const BENEFITS = [
  { icon: CalendarClock, title: "Scheduled collection", body: "We agree a collection rhythm that suits your kitchen – no need to store oil indefinitely or chase anyone." },
  { icon: Banknote, title: "We pay for qualifying oil", body: "Used cooking oil has value as a biodiesel feedstock. Qualifying oil is purchased from you – your rep confirms the rate for your volume and quality." },
  { icon: ShieldCheck, title: "Responsible & documented", body: "Collection is documented for your records and your used oil is handled responsibly, not dumped or returned to the food chain." },
];

const STEPS = [
  { n: "1", title: "Tell us about your used oil", body: "A few quick questions about your business, your volumes and where you are." },
  { n: "2", title: "Our team confirms the details", body: "A member of our team contacts you to confirm the collection details and what qualifies." },
  { n: "3", title: "Collection is arranged", body: "Once confirmed, we schedule and complete the collection – documented, on a rhythm that works for you." },
];

const FAQS = [
  { q: "Which businesses can arrange collection?", a: "Restaurants, takeaways, fast-food outlets, bakeries, caterers, hotels and food manufacturers – any business that produces used cooking oil. Tell us about yours and the team confirms." },
  { q: "Which areas do you service?", a: "We operate from regional hubs in Gauteng and the Western Cape, with KwaZulu-Natal opening soon. Share your location and we'll confirm collection in your area." },
  { q: "How much used oil do I need?", a: "There's no strict minimum – tell us your volumes and our team will confirm what works for a collection." },
  { q: "How often can you collect?", a: "Daily, weekly or monthly – we agree a schedule with you based on how much oil your kitchen produces." },
  { q: "How does payment work?", a: "Qualifying used oil is purchased from you. Your rep confirms the rate based on your volume and the quality of the oil – we don't post a one-size figure." },
  { q: "What happens to the collected oil?", a: "It's collected and documented, then directed into the recovery supply chain for biodiesel – never returned to kitchens or the food chain." },
];

export default function CollectPage() {
  return (
    <div className="bg-paper text-ink">
      <FunnelHeader ctaHref="#collect-form" ctaLabel="Arrange My Collection" ctaLabelShort="Arrange" />

      {/* ---- Hero (mobile-first: CTA above the fold) ---- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 50% at 15% 0%, rgb(var(--gold-100) / 0.8) 0%, transparent 60%)" }} />
        <div className="mx-auto w-full max-w-5xl px-5 pb-8 pt-6 sm:px-8 sm:pb-14 sm:pt-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-surface px-3 py-1 text-xs font-semibold text-brand-800">
            <Check className="h-3.5 w-3.5 shrink-0 text-gold-600" /> Compliant collection for SA kitchens since 2009
          </span>
          <div className="mt-4 grid gap-6 sm:mt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div>
              <h1 className="font-display text-[30px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                Used cooking oil? <span className="text-gold-700">We collect and pay.</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
                Turn your business&apos;s used cooking oil into value with professional collection from Cuisine Foods. Scheduled, documented and recovered responsibly.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
                <a href="#collect-form" className={ctaCls}>Arrange My Collection <ArrowRight className="h-4 w-4" /></a>
                <a href={whatsappUrl(whatsappPrefill.uco)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-base font-semibold text-ink transition-colors hover:border-ink/55 hover:bg-ink/[0.04] sm:w-auto">
                  WhatsApp Our Team
                </a>
              </div>
              <p className="mt-3 text-sm text-ink-faint">We pay you for qualifying used oil – and keep it out of the food chain.</p>
            </div>
            <div className="relative">
              <PlaceholderImage id="uco-pillar" aspectClass="aspect-[16/10] sm:aspect-[4/3]" className="shadow-soft" sizes="(max-width: 1024px) 100vw, 44vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Quick benefits ---- */}
      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {BENEFITS.map((b) => (
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

      {/* ---- Collection form (appears early) ---- */}
      <section id="collect-form" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">Arrange your collection</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">Tell us about your used oil</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">A few quick questions and our team confirms the collection details with you.</p>
          </div>
          <div className="mt-6 sm:mt-8">
            <GhlCollectEmbed />
          </div>
        </div>
      </section>

      {/* ---- How collection works ---- */}
      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">How collection works</h2>
          <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display font-bold text-ink">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink sm:mt-4">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-faint">An enquiry starts the conversation – it doesn&apos;t guarantee a collection until our team has confirmed the details.</p>
        </div>
      </section>

      {/* ---- Responsible recovery (one-way, NOT a closed loop to edible oil) ---- */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-start gap-3">
            <Recycle className="mt-1 h-6 w-6 shrink-0 text-brand-700" />
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Collected, documented, recovered</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                The used oil we collect is documented for your records and directed into the recovery supply chain, where it becomes a feedstock for biodiesel. It moves onward into that supply chain – it is never returned to kitchens or the food chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQs ---- */}
      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">Common questions</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Before you enquire</h2>
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
          <div className="mt-8 flex justify-center"><a href="#collect-form" className={ctaCls}>Arrange My Collection <ArrowRight className="h-4 w-4" /></a></div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Turn your used oil into value</h2>
              <p className="mt-3 max-w-xl text-paper/75">Arrange a collection and our team confirms the details with you – scheduled, documented and recovered responsibly.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <a href="#collect-form" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 sm:w-auto">
                  Arrange My Collection <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl(whatsappPrefill.uco)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-semibold text-paper hover:text-gold-300">
                  Or WhatsApp {site.contact.whatsapp.display}
                </a>
              </div>
            </div>
            <div className="text-sm text-paper/70">
              <a href={telUrl} className="inline-flex items-center gap-2 font-semibold text-paper hover:text-gold-300"><Phone className="h-4 w-4" /> {site.contact.phone.display}</a>
              <p className="mt-2">{site.contact.email}</p>
              <p className="mt-2">Gauteng &amp; Western Cape hubs · KwaZulu-Natal soon</p>
            </div>
          </div>
        </div>
      </section>

      <StickyQuoteCta label="Arrange My Collection" targetId="collect-form" />
    </div>
  );
}
