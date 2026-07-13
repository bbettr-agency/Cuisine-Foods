import type { Metadata } from "next";
import { seo } from "@/config/seo";
import { site } from "@/config/site";

type BuildArgs = {
  title?: string;
  description?: string;
  path: string; // starts with "/"
  image?: string;
  noindex?: boolean;
};

/** Build per-page Metadata with canonical, OG and Twitter tags. */
export function buildMetadata({ title, description, path, image, noindex }: BuildArgs): Metadata {
  const url = `${site.url.replace(/\/$/, "")}${path === "/" ? "" : path}`;
  const metaTitle = title ?? seo.defaultTitle;
  const metaDescription = description ?? seo.defaultDescription;
  const ogImage = image ?? seo.ogImage;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      type: "website",
      siteName: seo.siteName,
      title: metaTitle,
      description: metaDescription,
      url,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo.ogImageAlt }],
    },
    twitter: {
      card: seo.twitterCard,
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}
