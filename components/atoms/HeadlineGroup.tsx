import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * HeadlineGroup — DESIGN.md §7.6.
 * Three-line headline block: h1 (heavy) / h2 (bold) / supporting copy (regular).
 * Drop-shadow ensures legibility on translucent gradients.
 */
type HeadlineGroupProps = {
  eyebrow?: ReactNode;
  /** primary headline line 1 — required */
  h1: ReactNode;
  /** secondary headline line — optional, h2 weight */
  h2?: ReactNode;
  /** supporting copy ≤ 2 lines — optional */
  supporting?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function HeadlineGroup({
  eyebrow,
  h1,
  h2,
  supporting,
  align = "left",
  className,
}: HeadlineGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-[640px]",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-alpine-blue/80">
          {eyebrow}
        </div>
      )}
      <h1
        className={cn(
          "font-misans-heavy tracking-tight",
          "text-[36px] leading-[1.2] lg:text-[72px] lg:leading-[1.1]",
          "text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]",
        )}
      >
        {h1}
      </h1>
      {h2 && (
        <h2
          className={cn(
            "font-misans-bold tracking-tight",
            "text-[24px] leading-[1.3] lg:text-[42px] lg:leading-[1.2]",
            "text-soft-ivory/95 drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]",
          )}
        >
          {h2}
        </h2>
      )}
      {supporting && (
        <p
          className={cn(
            "font-misans-regular leading-relaxed max-w-[560px]",
            "text-[14px] lg:text-[17px] text-soft-ivory/75",
          )}
        >
          {supporting}
        </p>
      )}
    </div>
  );
}
