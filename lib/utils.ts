import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merge Tailwind classes without conflicts.
 * (clsx + tailwind-merge: two tiny deps that keep component class logic clean;
 * justified in PROJECT_STATUS.md per the OS minimal-deps rule.)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute URL from a path, using the configured site origin. */
export function absoluteUrl(path: string, origin: string): string {
  if (path.startsWith("http")) return path;
  return `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
