import type { Metadata } from "next";
import { getBuyer } from "@/config/buyers";
import { buildMetadata } from "@/lib/metadata";
import { MoneyPageView } from "@/views/money-page";

const page = getBuyer("cooking-oil-for-franchises")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` });
export default function Page() {
  return <MoneyPageView page={page} />;
}
