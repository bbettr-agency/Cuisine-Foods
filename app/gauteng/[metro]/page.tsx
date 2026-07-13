import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMetro, metrosFor } from "@/config/locations";
import { buildMetadata } from "@/lib/metadata";
import { LocationMetroView } from "@/views/location-metro";

export function generateStaticParams() {
  return metrosFor("gauteng").map((m) => ({ metro: m.slug }));
}

export function generateMetadata({ params }: { params: { metro: string } }): Metadata {
  const m = getMetro(params.metro);
  if (!m || m.provinceSlug !== "gauteng") return {};
  return buildMetadata({ title: m.metaTitle, description: m.metaDescription, path: `/gauteng/${m.slug}` });
}

export default function Page({ params }: { params: { metro: string } }) {
  const metro = getMetro(params.metro);
  if (!metro || metro.provinceSlug !== "gauteng") notFound();
  return <LocationMetroView metro={metro} />;
}
