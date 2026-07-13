import { enabledStats } from "@/config/trust";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/** Trust bar — renders only enabled, verified proof (progressive trust, OS P9). */
export function TrustBar({ bordered = true }: { bordered?: boolean }) {
  const stats = enabledStats();
  if (stats.length === 0) return null;

  return (
    <div className={bordered ? "border-y border-line bg-surface" : ""}>
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-4 sm:py-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <dt className="font-display text-xl font-bold text-brand-700 sm:text-2xl">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </div>
  );
}
