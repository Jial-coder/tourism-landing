"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CHINA_VIEWBOX,
  CHINA_PATH,
  NANSEA_PATH,
  NINE_DASH_PATH,
  MARKER_COORDS,
  type ChinaMarkerId,
} from "@/lib/china-map-data";

type ChinaMapOverlayProps = {
  className?: string;
  /** 默认 false。Hero 不显示南海 / 九段线；留接口给未来 destinations 页用 */
  showNansea?: boolean;
  ariaLabel?: string;
};

const MARKERS: Array<{ id: ChinaMarkerId; en: string; cn: string }> = [
  { id: "jiuzhaigou", en: "Jiuzhaigou", cn: "九寨沟" },
  { id: "zhangjiajie", en: "Zhangjiajie", cn: "张家界" },
  { id: "guilin", en: "Guilin", cn: "桂林" },
  { id: "dali", en: "Dali", cn: "大理" },
];

const VIEWBOX_W = 620;
const VIEWBOX_H = 360;

const GOLD_STROKE = "rgba(212, 175, 55, 0.85)";
const GOLD_ROUTE = "rgba(212, 175, 55, 0.5)";
const GOLD_FAINT = "rgba(212, 175, 55, 0.35)";

const ROUTE_PATH = MARKERS.map((m, i) => {
  const c = MARKER_COORDS[m.id];
  return `${i === 0 ? "M" : "L"}${c.x},${c.y}`;
}).join(" ");

export function ChinaMapOverlay({
  className,
  showNansea = false,
  ariaLabel = "中国主要目的地地图",
}: ChinaMapOverlayProps) {
  const reduce = useReducedMotion();

  const outlineMotion = reduce
    ? { initial: false as const, animate: { pathLength: 1 } }
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 2.5, ease: "easeInOut" as const },
      };

  const routeMotion = reduce
    ? { initial: false as const, animate: { pathLength: 1 } }
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 1.6, ease: "easeInOut" as const, delay: 1.0 },
      };

  return (
    <div className={cn("relative", className)}>
      {/* 内部锁定 viewBox 比例，保证 SVG 与 marker 像素对齐 */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="relative w-full"
          style={{ aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}` }}
        >
          <svg
            role="img"
            aria-label={ariaLabel}
            viewBox={CHINA_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            style={{ overflow: showNansea ? "visible" : "hidden" }}
          >
            {/* 中国轮廓：金色细线 + 入场 dash 动画 */}
            <motion.path
              d={CHINA_PATH}
              fill="none"
              stroke={GOLD_STROKE}
              strokeWidth={0.8}
              strokeLinejoin="round"
              strokeLinecap="round"
              fillRule="evenodd"
              vectorEffect="non-scaling-stroke"
              {...outlineMotion}
            />

            {/* 路线：4 城金色虚线连线，delay 跟轮廓错开 */}
            <motion.path
              d={ROUTE_PATH}
              fill="none"
              stroke={GOLD_ROUTE}
              strokeWidth={0.7}
              strokeDasharray="4 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              {...routeMotion}
            />

            {showNansea && (
              <>
                <path
                  d={NANSEA_PATH}
                  fill={GOLD_FAINT}
                  stroke={GOLD_FAINT}
                  strokeWidth={0.4}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={NINE_DASH_PATH}
                  fill="none"
                  stroke={GOLD_FAINT}
                  strokeWidth={0.6}
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}
          </svg>

          {/* Marker 4 个：DOM 层 Link，hover/focus 缩放 + tooltip */}
          {MARKERS.map((m) => {
            const c = MARKER_COORDS[m.id];
            const left = `${(c.x / VIEWBOX_W) * 100}%`;
            const top = `${(c.y / VIEWBOX_H) * 100}%`;
            return (
              <Link
                key={m.id}
                href={`/destinations/${m.id}`}
                aria-label={`查看 ${m.cn} ${m.en} 详情`}
                className={cn(
                  "group absolute -translate-x-1/2 -translate-y-1/2",
                  "rounded-full",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70",
                )}
                style={{ left, top }}
              >
                <span
                  aria-hidden
                  className={cn(
                    "block h-4 w-4 rounded-full",
                    "bg-[#d4af37]",
                    "shadow-[0_0_12px_rgba(212,175,55,0.6)]",
                    "motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none",
                    "group-hover:scale-[1.3] group-focus-visible:scale-[1.3]",
                    "group-hover:shadow-[0_0_18px_rgba(212,175,55,0.9)] group-focus-visible:shadow-[0_0_18px_rgba(212,175,55,0.9)]",
                  )}
                />
                <span
                  role="tooltip"
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap",
                    "rounded-md border border-soft-ivory/15 bg-charcoal-blue/85 backdrop-blur-md",
                    "px-2 py-1 text-[11px] font-misans-regular text-soft-ivory",
                    "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                    "motion-safe:transition-opacity motion-safe:duration-150 motion-reduce:transition-none",
                  )}
                >
                  {m.en} · {m.cn}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
