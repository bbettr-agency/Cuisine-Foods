import Link from "next/link";
import { site } from "@/config/site";
import { telUrl } from "@/config/conversion";

/** FunnelFooter — the slim shared footer for every /quote funnel route. */
export function FunnelFooter() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper/70">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {site.name}. {site.ownership}.</p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={telUrl} className="hover:text-paper">{site.contact.phone.display}</a>
          <a href={`mailto:${site.contact.email}`} className="hover:text-paper">{site.contact.email}</a>
          <a href="/privacy-policy" target="_blank" rel="noopener" className="hover:text-paper">Privacy Policy</a>
          <Link href="/" className="hover:text-paper">Main website</Link>
        </p>
      </div>
    </footer>
  );
}
