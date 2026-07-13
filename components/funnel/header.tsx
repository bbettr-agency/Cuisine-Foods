"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { headerNav } from "@/config/navigation";
import { site } from "@/config/site";
import { cta, telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { Logo } from "@/components/funnel/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out-expo",
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {headerNav.map((group) =>
            group.links.length === 0 ? (
              <Link
                key={group.label}
                href={group.href ?? "#"}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {group.label}
              </Link>
            ) : (
              <div
                key={group.label}
                className="group relative"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                  aria-expanded={openGroup === group.label}
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                >
                  {group.label}
                  <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />
                </button>
                <div
                  className={cn(
                    "absolute left-0 top-full w-72 pt-2 transition-all duration-200",
                    openGroup === group.label
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none translate-y-1 opacity-0",
                  )}
                >
                  <div className="card overflow-hidden p-2 shadow-lift">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-lg px-3 py-2 transition-colors hover:bg-brand-50"
                      >
                        <span className="block text-sm font-medium text-ink">{link.label}</span>
                        {link.description && (
                          <span className="block text-xs text-ink-faint">{link.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telUrl}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.contact.phone.display}
          </a>
          <Button href="/request-a-quote" size="md" variant="primary">
            {cta.quote}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper lg:hidden">
          <nav aria-label="Mobile" className="container-x py-6">
            {headerNav.map((group) => (
              <div key={group.label} className="border-b border-line py-2">
                {group.links.length === 0 ? (
                  <Link href={group.href ?? "#"} className="block py-2 text-base font-semibold text-ink">
                    {group.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="flex w-full items-center justify-between py-2 text-base font-semibold text-ink"
                      aria-expanded={openGroup === group.label}
                      onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                    >
                      {group.label}
                      <ChevronDown
                        className={cn("h-5 w-5 transition-transform", openGroup === group.label && "rotate-180")}
                      />
                    </button>
                    {openGroup === group.label && (
                      <div className="pb-2 pl-2">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block py-2 text-sm text-ink-soft"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <Button href="/request-a-quote" size="lg" variant="primary">
                {cta.quote}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button href={telUrl} size="lg" variant="outline">
                  <Phone className="h-4 w-4" /> Call
                </Button>
                <Button href={whatsappUrl(whatsappPrefill.general)} size="lg" variant="whatsapp" external>
                  WhatsApp
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
