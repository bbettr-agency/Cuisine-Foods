import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = as;
  return (
    <Reveal className={cn("max-w-prose", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={cn(as === "h1" ? "text-display" : "text-h2")}>{title}</Tag>
      {intro && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </Reveal>
  );
}
