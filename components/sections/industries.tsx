import { trust, hasTestimonials } from "@/config/trust";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/** Social proof — industries served (safe, category-level) + testimonials when available. */
export function Industries() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Trusted across the trade"
        title="The kitchens we keep running"
        intro="From independent restaurants to national franchise groups — we supply and collect across the food industry."
        align="center"
      />
      <RevealGroup className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
        {trust.industries.map((ind) => (
          <Reveal as="div" key={ind}>
            <span className="inline-flex rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-soft">
              {ind}
            </span>
          </Reveal>
        ))}
      </RevealGroup>

      {/* Progressive: real, consented client logos only — never placeholder brands */}
      {trust.clientLogos.length > 0 && (
        <RevealGroup className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {trust.clientLogos.map((c) => (
            <Reveal as="div" key={c.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt={c.name} className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </Reveal>
          ))}
        </RevealGroup>
      )}

      {hasTestimonials() && (
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trust.testimonials.filter((t) => t.enabled).map((t) => (
            <Reveal as="div" key={t.author} className="card p-6">
              <p className="text-sm leading-relaxed text-ink">“{t.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-ink">{t.author}</p>
              <p className="text-xs text-ink-faint">{t.role}{t.location ? `, ${t.location}` : ""}</p>
            </Reveal>
          ))}
        </RevealGroup>
      )}
    </Section>
  );
}
