import type { Metadata } from "next";
import { getProduct } from "@/config/products";
import { buildMetadata } from "@/lib/metadata";
import { PalmView } from "@/views/palm-view";

const page = getProduct("palm-olein")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` });
export default function Page() {
  return <PalmView page={page} />;
}
