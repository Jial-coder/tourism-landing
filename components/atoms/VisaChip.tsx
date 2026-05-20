import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * VisaChip — DESIGN.md §7.2 (Annotation).
 * Editorial annotation chip with a 6px alpine-blue dot prefix.
 * Used in hero visa hint, NOT a banner.
 */
type VisaChipProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function VisaChip({ children, className, ...rest }: VisaChipProps) {
  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 shadow-sm",
        "border border-soft-ivory/30 bg-charcoal-blue/20 backdrop-blur-md",
        "text-[12px] font-misans-regular text-soft-ivory/90",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-alpine-blue"
      />
      {children}
    </div>
  );
}
