"use client";

import { usePathname } from "next/navigation";

/**
 * ChromeGate — renders the site chrome (header, footer, floating WhatsApp, global
 * sticky CTA) on every page EXCEPT the paid-ads funnel, which must be a
 * distraction-free landing page with no site navigation. The chrome elements are
 * passed in as already-rendered nodes from the (server) root layout; this client
 * component only decides whether to show them, based on the current path.
 */
export function ChromeGate({
  header,
  footer,
  floating,
  sticky,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  floating: React.ReactNode;
  sticky: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Paid-ads funnels are distraction-free: no site chrome at all.
  const bare = pathname === "/quote" || pathname?.startsWith("/quote/");
  // Form-centric pages render full chrome, but we drop the global sticky
  // Call/WhatsApp bar so it never overlaps the embedded enquiry form's lower
  // fields or submit button. The floating WhatsApp button (corner) stays.
  const hideSticky = pathname === "/contact" || pathname === "/request-a-quote";

  if (bare) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      {header}
      <main id="main" className={hideSticky ? "" : "pb-16 lg:pb-0"}>
        {children}
      </main>
      {footer}
      {floating}
      {!hideSticky && sticky}
    </>
  );
}
