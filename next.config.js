/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// 301s from the previous (GoHighLevel) site so ranking equity is preserved at launch.
const redirects = [
  // Legacy GoHighLevel home → new root (verified from the live old-site nav).
  { source: "/home", destination: "/", permanent: true },
  { source: "/used-cooking-oil", destination: "/used-cooking-oil-collection", permanent: true },
  { source: "/used-cooking-oil-uco", destination: "/used-cooking-oil-collection", permanent: true },
  { source: "/palm-oil", destination: "/palm-olein", permanent: true },
  { source: "/vegetable-oils", destination: "/bulk-cooking-oil-supply", permanent: true },
  { source: "/services", destination: "/bulk-cooking-oil-supply", permanent: true },
  { source: "/frying-guide", destination: "/resources/commercial-frying-guide", permanent: true },
  { source: "/uco-report", destination: "/uco-compliance-reporting", permanent: true },
];

/**
 * Meta Pixel switch, decided at build time so it needs no dashboard setting:
 *  - ON for Vercel PREVIEW builds of the feat/custom-form branch only (testing).
 *  - ON anywhere NEXT_PUBLIC_META_PIXEL_ENABLED is explicitly "true".
 *  - OFF everywhere else, including production, until that variable is set on purpose.
 */
const pixelOnThisBuild =
  process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true" ||
  (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_GIT_COMMIT_REF === "feat/custom-form");

const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_META_PIXEL_ENABLED: pixelOnThisBuild ? "true" : "" },
  poweredByHeader: false,
  images: {
    // No remote/placeholder hosts. Real images live in /public/images (per SYSTEM/08).
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return redirects;
  },
};

module.exports = nextConfig;
