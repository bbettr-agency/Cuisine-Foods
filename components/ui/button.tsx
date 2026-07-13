import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60 min-h-[44px]";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-paper hover:bg-brand-800 shadow-soft hover:shadow-lift",
  gold: "bg-gold-500 text-brand-900 hover:bg-gold-400 shadow-soft hover:shadow-lift",
  outline: "border border-brand-700/25 text-brand-800 hover:border-brand-700/50 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
  whatsapp: "bg-[#25D366] text-white hover:brightness-95 shadow-soft",
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
