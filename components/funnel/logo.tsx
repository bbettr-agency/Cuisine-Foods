import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark logo. Swap for an <Image> when the client supplies the logo file. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Cuisine Foods — home"
      className={cn("inline-flex items-baseline gap-1.5 font-display font-bold tracking-tight", className)}
    >
      <span className={cn("text-xl", tone === "light" ? "text-paper" : "text-ink")}>Cuisine</span>
      <span className="text-xl text-gold-500">Foods</span>
    </Link>
  );
}
