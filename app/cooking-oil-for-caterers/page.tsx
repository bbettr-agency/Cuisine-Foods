import type { Metadata } from "next";
import { getBuyer } from "@/config/buyers";
import { buildMetadata } from "@/lib/metadata";
import { BuyerView } from "@/views/buyer-view";

const page = getBuyer("cooking-oil-for-caterers")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` });
export default function Page() {
  return <BuyerView page={page} />;
}
