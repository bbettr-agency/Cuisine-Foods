import type { Metadata } from "next";
import { getProduct } from "@/config/products";
import { buildMetadata } from "@/lib/metadata";
import { SoyaView } from "@/views/soya-view";

const page = getProduct("soya-oil")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` });
export default function Page() {
  return <SoyaView page={page} />;
}
