import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail. Emit breadcrumbSchema() alongside in the page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
            {i === items.length - 1 ? (
              <span className="text-ink-soft" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="transition-colors hover:text-brand-700">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
