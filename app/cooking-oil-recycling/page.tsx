import type { Metadata } from "next";
import { getUcoService } from "@/config/services";
import { buildMetadata } from "@/lib/metadata";
import { hrefFor } from "@/lib/registry";
import { MoneyPageView } from "@/views/money-page";

const page = getUcoService("cooking-oil-recycling")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: hrefFor(page) });
export default function Page() {
  return <MoneyPageView page={page} />;
}
