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
  { source: "/used-cooking-oil", destination: "/used-cooking-oil-collection", permanent: true },
  { source: "/used-cooking-oil-uco", destination: "/used-cooking-oil-collection", permanent: true },
  { source: "/palm-oil", destination: "/palm-olein", permanent: true },
  { source: "/vegetable-oils", destination: "/bulk-cooking-oil-supply", permanent: true },
  { source: "/services", destination: "/bulk-cooking-oil-supply", permanent: true },
  { source: "/frying-guide", destination: "/resources/commercial-frying-guide", permanent: true },
  { source: "/uco-report", destination: "/uco-compliance-reporting", permanent: true },
];

const nextConfig = {
  reactStrictMode: true,
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
