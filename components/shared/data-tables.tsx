import type { ProductSpec, ComparisonTable } from "@/config/types";
import { Reveal } from "@/components/ui/reveal";

/** Product datasheet — a clean 2-column spec table (also strong for AI-search extraction). */
export function SpecTable({ specs, caption }: { specs: ProductSpec[]; caption?: string }) {
  if (!specs || specs.length === 0) return null;
  return (
    <Reveal>
      <table className="w-full overflow-hidden rounded-[var(--radius)] border border-line text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <tbody className="divide-y divide-line">
          {specs.map((s) => (
            <tr key={s.label} className="odd:bg-surface even:bg-surface-2">
              <th scope="row" className="w-2/5 px-4 py-3 align-top font-semibold text-ink">{s.label}</th>
              <td className="px-4 py-3 text-ink-soft">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

/** Comparison table — tables win AI-search / featured-snippet citations for commercial queries. */
export function ComparisonTableView({ table }: { table: ComparisonTable }) {
  return (
    <Reveal>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] overflow-hidden rounded-[var(--radius)] border border-line text-left text-sm">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr className="bg-ink text-paper">
              {table.columns.map((c, i) => (
                <th key={i} scope="col" className="px-4 py-3 font-semibold">{c || "Feature"}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {table.rows.map((row) => (
              <tr key={row[0]} className="odd:bg-surface even:bg-surface-2">
                {row.map((cell, i) => (
                  <td key={i} className={i === 0 ? "px-4 py-3 font-semibold text-ink" : "px-4 py-3 text-ink-soft"}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
