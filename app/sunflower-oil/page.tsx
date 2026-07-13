import type { Metadata } from "next";
import { getProduct } from "@/config/products";
import { buildMetadata } from "@/lib/metadata";
import { MoneyPageView } from "@/views/money-page";

const page = getProduct("sunflower-oil")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` });
export default function Page() {
  return <MoneyPageView page={page} />;
}
