import type { ContentSection } from "@/config/types";
import { Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FeatureGrid } from "@/components/shared/feature-grid";

/** Renders prose ContentSection[] — each answers one objection/question. */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  if (sections.length === 0) return null;
  return (
    <Section alt>
      <div className="mx-auto max-w-3xl space-y-12">
        {sections.map((s) => (
          <Reveal key={s.heading}>
            <h2 className="text-h2 text-ink">{s.heading}</h2>
            {s.body && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{s.body}</p>}
            {s.points && <div className="mt-6"><FeatureGrid points={s.points} columns={2} /></div>}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
