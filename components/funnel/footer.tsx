import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { Logo } from "@/components/funnel/logo";

export function Footer() {
  const year = 2026; // build-time constant; avoids Date() in build

  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">{site.shortDescription}</p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={telUrl} className="flex items-center gap-2 text-ink-soft hover:text-ink">
                <Phone className="h-4 w-4 text-brand-600" /> {site.contact.phone.display}
              </a>
              <a
                href={whatsappUrl(whatsappPrefill.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ink-soft hover:text-ink"
              >
                <span className="text-brand-600">◍</span> WhatsApp {site.contact.whatsapp.display}
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-ink-soft hover:text-ink">
                <Mail className="h-4 w-4 text-brand-600" /> {site.contact.email}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h3 className="text-sm font-semibold text-ink">{group.label}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-soft transition-colors hover:text-brand-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Branches (NAP) */}
        <div className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:max-w-3xl">
          {site.branches.map((b) => (
            <div key={b.id} className="flex gap-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <div>
                <p className="font-semibold text-ink">{site.name} — {b.label}</p>
                <p className="text-ink-soft">
                  {b.street}, {b.city}, {b.postalCode}
                </p>
                <p className="text-ink-faint">{site.contact.hours}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal / credit */}
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved. {site.ownership}.</p>
          <p>
            Website designed &amp; developed by{" "}
            <a
              href="https://www.bbettragency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 hover:underline"
            >
              Bbettr Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
