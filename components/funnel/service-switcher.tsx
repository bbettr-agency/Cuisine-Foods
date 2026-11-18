import { funnels, type FunnelId } from "@/config/funnels";
import { FunnelLink } from "@/components/funnel/funnel-link";
import { cn } from "@/lib/utils";

/**
 * ServiceSwitcher — the small "I'm interested in" control at the top of each
 * funnel. Highlights the current service; the other option goes straight to its
 * funnel (attribution parameters preserved), so nobody is stuck in the wrong one.
 */
export function ServiceSwitcher({ current }: { current: FunnelId }) {
  const options: FunnelId[] = ["buy", "collect"];
  return (
    <nav aria-label="Choose a service" className="border-b border-line bg-surface-2/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-4 py-2.5 sm:flex-row sm:justify-center sm:gap-3 sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">I&apos;m interested in:</span>
        <div className="grid w-full max-w-sm grid-cols-2 gap-1 rounded-full border border-line bg-surface p-1 sm:w-auto sm:max-w-none">
          {options.map((id) => {
            const active = id === current;
            const cls = cn(
              "inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-full px-3 text-[13px] font-semibold transition-colors duration-200 sm:px-5 sm:text-sm",
              active ? "bg-ink text-paper shadow-soft" : "text-ink-soft hover:bg-gold-100/70 hover:text-ink",
            );
            return active ? (
              <span key={id} aria-current="page" className={cls}>
                {funnels[id].switcherLabel}
              </span>
            ) : (
              <FunnelLink key={id} href={funnels[id].path} className={cls}>
                {funnels[id].switcherLabel}
              </FunnelLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
