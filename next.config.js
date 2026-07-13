/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // No remote/placeholder hosts. Real images live in /public/images (per SYSTEM/08).
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
