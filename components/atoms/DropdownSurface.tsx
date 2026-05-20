"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { FilmGrain } from "@/components/atoms/FilmGrain";

/**
 * DropdownSurface — DESIGN.md §7.7 (chrome v1).
 * Reusable surface for any dropdown / popover / dialog.
 * Outside-click + Esc auto-close behavior.
 *
 * Pass `triggerRef` so outside-click logic ignores clicks on the trigger
 * (otherwise toggling the trigger would immediately re-close).
 */
type DropdownSurfaceProps = {
  open: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLElement | null>;
  width?: number | string;
  /** ARIA role — defaults to "menu". Use "dialog" for soft-404 etc. */
  role?: "menu" | "dialog";
  ariaLabel?: string;
  align?: "left" | "right";
  className?: string;
  children: ReactNode;
};

export function DropdownSurface({
  open,
  onClose,
  triggerRef,
  width = 280,
  role = "menu",
  ariaLabel,
  align = "right",
  className,
  children,
}: DropdownSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (surfaceRef.current?.contains(target)) return;
      if (triggerRef?.current?.contains(target)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;
  return (
    <div
      ref={surfaceRef}
      role={role}
      {...(role === "dialog" ? { "aria-modal": true } : {})}
      aria-label={ariaLabel}
      style={{ width, [align]: 0 }}
      className={cn(
        "absolute top-full mt-3 overflow-hidden rounded-[12px]",
        "surface-dropdown",
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-150",
        className,
      )}
    >
      <FilmGrain opacity={0.04} />
      <div className="relative">{children}</div>
    </div>
  );
}
