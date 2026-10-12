import type { Metadata } from "next";
import { getProduct } from "@/config/products";
import { buildMetadata } from "@/lib/metadata";
import { FryingView } from "@/views/frying-view";

const page = getProduct("frying-oil")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` });
export default function Page() {
  return <FryingView page={page} />;
}
