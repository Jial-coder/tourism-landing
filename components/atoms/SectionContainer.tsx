import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * SectionContainer — DESIGN.md §7.5.
 * Page-level section wrapper. Charcoal blue + MiSans + selection token.
 * Use as <section> on every layout block.
 */
type SectionContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "main" | "footer" | "header";
  fullBleed?: boolean;
  children: ReactNode;
};

export function SectionContainer({
  as: Tag = "section",
  fullBleed = false,
  className,
  children,
  ...rest
}: SectionContainerProps) {
  return (
    <Tag
      className={cn(
        "relative w-full overflow-x-hidden",
        "bg-deep-slate text-soft-ivory",
        "font-[var(--font-sans)]",
        fullBleed ? "" : "min-h-[60vh]",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * SectionInner — content max-width + responsive horizontal padding.
 * DESIGN.md §4 spacing tokens (1440px / px-16 / px-6).
 */
export function SectionInner({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-6 lg:px-16", className)}>
      {children}
    </div>
  );
}
