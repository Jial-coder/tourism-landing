"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DestinationCarousel — Hero 右侧目的地轮播。
 *
 * 桌面（lg+）：竖直堆叠，1 张为主图（大），上下两边各露半张，
 *   上下箭头/键盘 ArrowUp/Down/PageUp/PageDown 翻；hover 显示控制；点击主图跳详情。
 * 移动（< lg）：水平横滑 strip，左右箭头 / swipe 切；点击当前主图跳详情。
 *
 * 不自动播（DESIGN.md §6 禁 auto-carousel）。
 * 切换走 motion-safe transition；reduced-motion 关动效。
 */

export type CarouselItem = {
  href: string;
  src: string;
  en: string;
  cn: string;
  tagline: string;
  iata: string;
  gps: string;
};

type Props = {
  items: CarouselItem[];
  ariaLabel?: string;
  /** "full" 三行 caption (EN·CN / tagline / GPS·IATA) — hero 右侧旧版用
   *  "single" 一行 caption (EN · CN) — 下方 DestinationTilesSection 用 */
  captionVariant?: "full" | "single";
};

export function DestinationCarousel({
  items,
  ariaLabel = "目的地轮播",
  captionVariant = "full",
}: Props) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const go = (delta: number) => {
    setActive((cur) => (cur + delta + items.length) % items.length);
  };

  // keyboard navigation when carousel has focus
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement)) return;
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      } else if (["ArrowDown", "PageDown", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        go(1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  // swipe (mobile)
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
    touchStart.current = null;
  };

  const len = items.length;
  const prevIdx = (active - 1 + len) % len;
  const nextIdx = (active + 1) % len;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/40 rounded-[12px]"
    >
      {/* ───── Desktop: vertical stack ───── */}
      <div className="hidden lg:block relative h-[600px] w-full select-none">
        {items.map((item, i) => {
          const offset = (i - active + len) % len;
          // map offset → visual slot: 0=center, 1=below, len-1=above, others hidden
          let slotClass = "opacity-0 pointer-events-none";
          let translateY = "translate-y-0";
          let scale = "scale-100";
          let zIndex = "z-0";
          if (offset === 0) {
            slotClass = "opacity-100";
            translateY = "translate-y-0";
            scale = "scale-100";
            zIndex = "z-20";
          } else if (offset === 1) {
            slotClass = "opacity-55";
            translateY = "translate-y-[58%]";
            scale = "scale-[0.8]";
            zIndex = "z-10";
          } else if (offset === len - 1) {
            slotClass = "opacity-55";
            translateY = "-translate-y-[58%]";
            scale = "scale-[0.8]";
            zIndex = "z-10";
          }
          const isActive = offset === 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={isActive ? 0 : -1}
              aria-label={`查看 ${item.cn} ${item.en} 详情`}
              aria-hidden={!isActive}
              className={cn(
                "absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto",
                "block group",
                "motion-safe:transition-all motion-safe:duration-500 motion-reduce:transition-none",
                slotClass,
                zIndex,
              )}
              style={{ transform: `translateY(calc(-50% + ${
                offset === 0 ? 0 : offset === 1 ? 58 : offset === len - 1 ? -58 : 0
              }%))` }}
            >
              <div
                className={cn(
                  "relative mx-auto w-[88%] aspect-[4/3] overflow-hidden rounded-[8px]",
                  "border border-soft-ivory/12 shadow-[0_20px_50px_rgba(15,23,42,0.55)]",
                  "motion-safe:transition-all motion-safe:duration-300",
                  isActive && "group-hover:border-alpine-blue/45 group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.7)]",
                )}
              >
                <Image
                  src={item.src}
                  alt={`${item.en} ${item.cn}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className={cn(
                    "object-cover",
                    "motion-safe:transition-transform motion-safe:duration-500",
                    isActive && "group-hover:scale-[1.04]",
                  )}
                />
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-charcoal-blue/75 backdrop-blur-md text-soft-ivory opacity-0 motion-safe:transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight size={15} />
                  </span>
                )}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-deep-slate/85 via-deep-slate/45 to-transparent",
                    !isActive && "opacity-70",
                  )}
                >
                  <div className="text-[14px] font-misans-bold text-soft-ivory">
                    {item.en} · {item.cn}
                  </div>
                  {captionVariant === "full" && (
                    <>
                      <div className="mt-0.5 text-[11px] font-misans-regular text-soft-ivory/65">
                        {item.tagline}
                      </div>
                      <div className="mt-1 text-[10px] font-misans-regular tracking-widest text-soft-ivory/45">
                        {item.gps} · {item.iata}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}

        {/* desktop up/down controls */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="上一张目的地"
          className="absolute right-2 top-2 z-30 grid h-9 w-9 place-items-center rounded-full bg-charcoal-blue/70 backdrop-blur-md border border-soft-ivory/12 text-soft-ivory hover:bg-charcoal-blue/90 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
        >
          <ChevronUp size={16} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="下一张目的地"
          className="absolute right-2 bottom-2 z-30 grid h-9 w-9 place-items-center rounded-full bg-charcoal-blue/70 backdrop-blur-md border border-soft-ivory/12 text-soft-ivory hover:bg-charcoal-blue/90 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
        >
          <ChevronDown size={16} aria-hidden />
        </button>

        {/* desktop dots */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`跳到第 ${i + 1} 张`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 w-1.5 rounded-full motion-safe:transition-all",
                i === active ? "bg-soft-ivory h-4" : "bg-soft-ivory/35 hover:bg-soft-ivory/70",
              )}
            />
          ))}
        </div>
      </div>

      {/* ───── Mobile: horizontal strip ───── */}
      <div className="lg:hidden relative w-full select-none">
        <div className="overflow-hidden rounded-[8px]">
          <div
            className="flex motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transition-none"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`查看 ${item.cn} ${item.en} 详情`}
                  aria-hidden={!isActive}
                  className="relative shrink-0 w-full aspect-[5/4] block group"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[8px] border border-soft-ivory/12">
                    <Image
                      src={item.src}
                      alt={`${item.en} ${item.cn}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-deep-slate/85 via-deep-slate/40 to-transparent">
                      <div className="text-[14px] font-misans-bold text-soft-ivory">
                        {item.en} · {item.cn}
                      </div>
                      {captionVariant === "full" && (
                        <>
                          <div className="mt-0.5 text-[11px] font-misans-regular text-soft-ivory/70">
                            {item.tagline}
                          </div>
                          <div className="mt-1 text-[10px] font-misans-regular tracking-widest text-soft-ivory/50">
                            {item.gps} · {item.iata}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* mobile prev/next */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="上一张目的地"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-charcoal-blue/70 backdrop-blur-md border border-soft-ivory/12 text-soft-ivory"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="下一张目的地"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-charcoal-blue/70 backdrop-blur-md border border-soft-ivory/12 text-soft-ivory"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
        {/* mobile dots */}
        <div className="mt-3 flex justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`跳到第 ${i + 1} 张`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full motion-safe:transition-all",
                i === active ? "w-5 bg-soft-ivory" : "w-1.5 bg-soft-ivory/35 hover:bg-soft-ivory/70",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
