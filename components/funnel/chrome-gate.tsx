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
  const bare = pathname === "/quote" || pathname?.startsWith("/quote/");

  if (bare) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      {header}
      <main id="main" className="pb-16 lg:pb-0">
        {children}
      </main>
      {footer}
      {floating}
      {sticky}
    </>
  );
}
