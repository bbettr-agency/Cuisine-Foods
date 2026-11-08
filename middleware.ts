import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep only the canonical domain (cuisinefoods.co.za) indexable.
 * Any non-canonical host – the *.vercel.app preview/production alias or a bare
 * IP – gets X-Robots-Tag: noindex so duplicate hosts never compete in search.
 * (Canonical <link> tags already point to the real domain; this is belt-and-braces.)
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isCanonical = host === "cuisinefoods.co.za" || host === "www.cuisinefoods.co.za";
  const path = request.nextUrl.pathname;
  // The /quote ads funnel must never be indexed on ANY host (it is unlisted,
  // paid-traffic only). Everything else: only non-canonical hosts are noindexed.
  const isAdFunnel = path === "/quote" || path.startsWith("/quote/");
  const response = NextResponse.next();
  if (!isCanonical || isAdFunnel) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  // Run on pages only; skip static assets, image optimizer and metadata routes.
  matcher: ["/((?!_next/|images/|favicon|robots.txt|sitemap.xml|api/).*)"],
};
