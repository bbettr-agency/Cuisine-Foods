import { home } from "@/config/home";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/** How it works — both tracks, compact. Kills switching inertia. */
export function HowItWorks() {
  const { howItWorks } = home;
  return (
    <Section>
      <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} align="center" />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {howItWorks.tracks.map((track) => (
          <div key={track.title} className="card p-7 sm:p-8">
            <h3 className="font-display text-lg font-bold text-ink">{track.title}</h3>
            <RevealGroup className="mt-6 space-y-5">
              {track.steps.map((step, i) => (
                <Reveal as="div" key={step} className="flex items-start gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-paper">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm text-ink">{step}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </Section>
  );
}
