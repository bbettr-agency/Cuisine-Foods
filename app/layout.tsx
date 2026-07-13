import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { site } from "@/config/site";
import { seo } from "@/config/seo";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/funnel/header";
import { Footer } from "@/components/funnel/footer";
import { FloatingWhatsApp } from "@/components/funnel/floating-whatsapp";
import { StickyMobileCTA } from "@/components/funnel/sticky-mobile-cta";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.defaultTitle, template: "%s" },
  description: seo.defaultDescription,
  keywords: seo.keywords,
  applicationName: site.name,
  authors: [{ name: "Bbettr Agency", url: "https://www.bbettragency.com" }],
  alternates: { canonical: site.url },
  icons: { icon: site.brand.favicon, shortcut: site.brand.favicon, apple: site.brand.logoIcon },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt }],
  },
  twitter: { card: seo.twitterCard, title: seo.defaultTitle, description: seo.defaultDescription, images: [seo.ogImage] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh">
        <JsonLd data={[organizationSchema(), ...site.branches.map((b) => localBusinessSchema(b))]} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <main id="main" className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
