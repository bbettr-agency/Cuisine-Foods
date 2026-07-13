import Link from "next/link";
import { Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-3 text-display text-ink">We couldn't find that page</h1>
        <p className="mt-4 text-lg text-ink-soft">
          The page may have moved. Try our bulk oil supply, used-oil collection, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/bulk-cooking-oil-supply" variant="outline">Oil supply</Button>
          <Button href="/used-cooking-oil-collection" variant="outline">UCO collection</Button>
        </div>
      </div>
    </Section>
  );
}
