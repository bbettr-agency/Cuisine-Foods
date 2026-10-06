import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getHub } from "@/config/coverage";
import { KwaZuluNatalView } from "@/views/kwazulu-natal-view";

// Indexation decision (Phase 3C §9): while the hub is not "open" the page is a
// truthful coming-soon page with no verified local facts, so it is noindex until
// status flips to "open" in config/coverage.ts — at which point it indexes
// automatically. Quality over indexing a thin pre-launch page.
const hub = getHub("kwazulu-natal");
const isOpen = hub?.status === "open";

export const metadata: Metadata = buildMetadata({
  title: "KwaZulu-Natal – Opening Soon | Cuisine Foods",
  description:
    "Cuisine Foods is expanding into KwaZulu-Natal – bringing commercial cooking oil supply and used cooking oil collection to the region. Register your interest.",
  path: "/kwazulu-natal",
  noindex: !isOpen,
});

export default function Page() {
  return <KwaZuluNatalView />;
}
