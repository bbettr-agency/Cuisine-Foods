import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

/** Section wrapper with consistent vertical rhythm and optional alt background. */
export function Section({
  className,
  alt,
  children,
  id,
}: {
  className?: string;
  alt?: boolean;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("section", alt && "bg-surface-2", className)}>
      <Container>{children}</Container>
    </section>
  );
}
