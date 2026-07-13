import { home } from "@/config/home";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

/** Why Cuisine Foods — two proof columns (reliable supply · compliant collection). */
export function WhyUs() {
  const { why } = home;
  return (
    <Section alt>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={why.eyebrow} title={why.title} />
          <Reveal className="mt-8">
            <PlaceholderImage id="why-fleet" sizes="(max-width: 1024px) 100vw, 40vw" />
          </Reveal>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {why.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-lg font-bold text-brand-700">{col.title}</h3>
              <RevealGroup className="mt-4 space-y-5">
                {col.points.map((p) => (
                  <Reveal as="div" key={p.title} className="flex gap-3.5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-ink">{p.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
