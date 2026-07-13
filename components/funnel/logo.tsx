import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Logo — text wordmark until the real logo lands. When the client uploads
 * public/images/logo/logo-primary.png, set `brand.ready: true` in config/site.ts
 * and this renders the image instead. No other changes needed.
 */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Cuisine Foods — home"
      className={cn("inline-flex items-center gap-1.5 font-display font-bold tracking-tight", className)}
    >
      {site.brand.ready ? (
        <Image src={site.brand.logoPrimary} alt="Cuisine Foods" width={168} height={40} priority className="h-9 w-auto" />
      ) : (
        <>
          <span className={cn("text-xl", tone === "light" ? "text-paper" : "text-ink")}>Cuisine</span>
          <span className="text-xl text-gold-500">Foods</span>
        </>
      )}
    </Link>
  );
}
