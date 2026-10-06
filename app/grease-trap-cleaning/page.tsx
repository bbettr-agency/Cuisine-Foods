import type { Metadata } from "next";
import { getUcoService } from "@/config/services";
import { buildMetadata } from "@/lib/metadata";
import { hrefFor } from "@/lib/registry";
import { UcoServiceView } from "@/views/uco-service";

const page = getUcoService("grease-trap-cleaning")!;
export const metadata: Metadata = buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: hrefFor(page) });
export default function Page() {
  return <UcoServiceView page={page} />;
}
