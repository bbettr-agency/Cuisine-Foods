import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { Logo } from "@/components/funnel/logo";

export function Footer() {
  const year = 2026; // build-time constant; avoids Date() in build

  return (
    <footer className="bg-ink text-paper">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          {/* Brand + contact */}
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">{site.shortDescription}</p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={telUrl} className="flex items-center gap-2 text-paper/75 transition-colors hover:text-gold-400">
                <Phone className="h-4 w-4 text-gold-500" /> {site.contact.phone.display}
              </a>
              <a
                href={whatsappUrl(whatsappPrefill.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-paper/75 transition-colors hover:text-gold-400"
              >
                <span className="text-gold-500">◍</span> WhatsApp {site.contact.whatsapp.display}
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-paper/75 transition-colors hover:text-gold-400">
                <Mail className="h-4 w-4 text-gold-500" /> {site.contact.email}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h3 className="text-sm font-semibold text-paper">{group.label}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-paper/60 transition-colors hover:text-gold-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Branches (NAP) */}
        <div className="mt-12 grid gap-6 border-t border-paper/10 pt-8 sm:grid-cols-2 lg:max-w-3xl">
          {site.branches.map((b) => (
            <div key={b.id} className="flex gap-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <div>
                <p className="font-semibold text-paper">{site.name} — {b.label}</p>
                <p className="text-paper/70">
                  {b.street}, {b.city}, {b.postalCode}
                </p>
                <p className="text-paper/50">{site.contact.hours}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal / credit */}
        <div className="mt-10 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved. {site.ownership}.</p>
          <p>
            Website designed &amp; developed by{" "}
            <a
              href="https://www.bbettragency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold-400 hover:text-gold-300"
            >
              Bbettr Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
