import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "dark" | "onDark" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60 min-h-[44px]";

const variants: Record<Variant, string> = {
  // Gold CTA with dark text — the primary conversion colour.
  primary: "bg-gold-500 text-ink hover:bg-gold-600 shadow-soft hover:shadow-lift",
  gold: "bg-gold-500 text-ink hover:bg-gold-600 shadow-soft hover:shadow-lift",
  // Strong near-black button (secondary CTA on light backgrounds).
  dark: "bg-ink text-paper hover:bg-ink/90 shadow-soft hover:shadow-lift",
  // Light outline for use on dark/near-black sections.
  onDark: "border border-paper/30 text-paper hover:bg-white/10",
  outline: "border border-ink/20 text-ink hover:border-ink/40 hover:bg-surface-2",
  ghost: "text-ink hover:bg-surface-2",
  whatsapp: "bg-ink text-paper hover:bg-ink/90 shadow-soft",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  ariaLabel?: string;
};

export function Button({ href, variant = "primary", size = "md", className, children, external, ariaLabel }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("https://wa.me")) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={cls}>
      {children}
    </Link>
  );
}
