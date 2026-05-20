import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * Pill — DESIGN.md §7.1 (Diagnostic).
 * Soft editorial pill with stroke + translucent fill, NOT a button.
 * Hover only brightens stroke, never fills color.
 */
type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Pill({ active, className, children, ...rest }: PillProps) {
  return (
    <button
      type="button"
      data-active={active ? "true" : undefined}
      className={cn(
        "shrink-0 rounded-full whitespace-nowrap shadow-sm",
        "border border-soft-ivory/[0.18] bg-charcoal-blue/60 backdrop-blur-md",
        "px-4 py-2 text-[14px] font-misans-regular text-soft-ivory/90",
        "motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none",
        "hover:border-soft-ivory/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70",
        "data-[active=true]:border-soft-ivory/40 data-[active=true]:text-soft-ivory",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
