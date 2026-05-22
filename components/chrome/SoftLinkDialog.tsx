"use client";

import { useEffect } from "react";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { useDictionary } from "@/components/i18n/LocaleProvider";

/**
 * SoftLinkDialog — soft-404 modal extracted from TopNav for reuse.
 * Used wherever we expose a route that is not yet implemented (auth, themes, legal, etc.)
 * — instead of hard 404, we tell the user the corner is coming + offer notify-me.
 *
 * Renders only when `open=true`. Esc + outside click close. Each call site keeps its own
 * `useState(false)` and dialog instance — modal is modal, no shared state.
 *
 * `title` / `body` are passed by the caller (per-route copy). `Notify` / `Close` labels
 * read from dict (same keys used by the original Stories soft-404).
 */
export function SoftLinkDialog({
  open,
  onClose,
  title,
  body,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
}) {
  const dict = useDictionary();
  const nav = dict.home.nav;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-deep-slate/60 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in-0"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="soft-link-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-[min(560px,92vw)] overflow-hidden rounded-[16px] surface-dropdown p-6"
      >
        <FilmGrain opacity={0.05} />
        <div className="relative flex flex-col gap-3">
          <h3
            id="soft-link-title"
            className="text-[16px] font-misans-bold text-soft-ivory"
          >
            {title}
          </h3>
          <p className="text-[13px] font-misans-regular text-soft-ivory/75 leading-relaxed">
            {body}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <a
              href="mailto:hello@example.com?subject=Notify%20me%20when%20this%20corner%20opens"
              className="text-[13px] font-misans-regular text-alpine-blue underline-offset-4 hover:underline"
            >
              {nav.soft404Notify}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto text-[12px] font-misans-regular text-soft-ivory/60 hover:text-soft-ivory/85"
            >
              {nav.soft404Close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
