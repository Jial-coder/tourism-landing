"use client";

import { useState, type ReactNode, type CSSProperties } from "react";
import { SoftLinkDialog } from "./SoftLinkDialog";

/**
 * SoftLinkButton — drop-in replacement for an `<a>` / `<Link>` that points at a
 * not-yet-implemented route. Renders a button styled like a link; click opens a
 * SoftLinkDialog with caller-provided title + body.
 *
 * Each instance keeps its own dialog state. Good for footers / menus where you
 * have many such links and don't want to lift state to a parent.
 */
export function SoftLinkButton({
  children,
  title,
  body,
  className,
  style,
  ariaLabel,
}: {
  children: ReactNode;
  title: string;
  body: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={style}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
      >
        {children}
      </button>
      <SoftLinkDialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        body={body}
      />
    </>
  );
}
