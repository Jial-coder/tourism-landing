import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * CTAGhost — DESIGN.md §7.3 (Ghost outline placeholder).
 * Hero CTA placeholder; final colored CTA comes from M-DUAL-CTA atop this.
 */
type Common = {
  children: ReactNode;
  className?: string;
};

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsAnchor = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type CTAGhostProps = AsButton | AsAnchor;

const baseCls =
  "inline-flex items-center justify-center rounded-full px-8 py-3.5 " +
  "border border-soft-ivory/15 bg-transparent " +
  "text-[13px] font-misans-regular tracking-wide text-soft-ivory/60 " +
  "motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none " +
  "hover:bg-soft-ivory/5 hover:text-soft-ivory/90 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70";

export function CTAGhost(props: CTAGhostProps) {
  if ("href" in props && props.href) {
    const { className, children, ...rest } = props;
    return (
      <a className={cn(baseCls, className)} {...rest}>
        {children}
      </a>
    );
  }
  const { className, children, ...rest } = props as AsButton;
  return (
    <button type="button" className={cn(baseCls, className)} {...rest}>
      {children}
    </button>
  );
}

/**
 * CTAPrimary — final M-DUAL-CTA primary pill (alpine-blue 70% stroke transparent fill).
 * brief: M-DUAL-CTA hero variant.
 */
export function CTAPrimary(props: CTAGhostProps) {
  const primaryCls =
    "inline-flex items-center justify-center rounded-full h-11 px-7 " +
    "border border-alpine-blue/70 bg-transparent " +
    "text-[15px] font-misans-bold text-soft-ivory " +
    "motion-safe:transition-all motion-safe:duration-150 motion-reduce:transition-none " +
    "hover:bg-alpine-blue/15 active:bg-alpine-blue/25 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue";

  if ("href" in props && props.href) {
    const { className, children, ...rest } = props;
    return (
      <a className={cn(primaryCls, className)} {...rest}>
        {children}
      </a>
    );
  }
  const { className, children, ...rest } = props as AsButton;
  return (
    <button type="button" className={cn(primaryCls, className)} {...rest}>
      {children}
    </button>
  );
}
