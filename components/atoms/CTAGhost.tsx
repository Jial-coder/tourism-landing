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
  "border border-ink/15 bg-transparent " +
  "text-[13px] font-misans-regular tracking-wide text-ink/70 " +
  "motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none " +
  "hover:bg-ink/5 hover:text-ink " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

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
 * CTAPrimary — pandatravel 主 CTA (vermilion 实心，spec §3.3 主 CTA 应用规则)。
 * brand 中国红 + soft-ivory 字，AA 5.20 (spec §3.5 contrast matrix)。
 */
export function CTAPrimary(props: CTAGhostProps) {
  const primaryCls =
    "inline-flex items-center justify-center rounded-full h-11 px-7 " +
    "bg-vermilion text-soft-ivory shadow-md shadow-vermilion/20 " +
    "text-[15px] font-misans-bold " +
    "motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none " +
    "hover:bg-vermilion-deep " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

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
