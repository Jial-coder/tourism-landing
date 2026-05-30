"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { VisaChip } from "@/components/atoms/VisaChip";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { cn } from "@/lib/utils";

/**
 * VisaSection — M-VISA 独立段（不是 hero 内的 chip）。
 * brief: docs/modules/M-VISA.md — 含展开浮层（30 天清单 / 10 天过境 / 政策备注）+ Last updated。
 */

const COUNTRIES_30D = [
  "美国 · United States",
  "英国 · United Kingdom",
  "加拿大 · Canada",
  "欧盟成员国 · EU members",
  "澳大利亚 · Australia",
  "新西兰 · New Zealand",
  "日本 · Japan",
  "韩国 · South Korea",
  "瑞士 · Switzerland",
  "挪威 · Norway",
];

export function VisaSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section
      data-feedback-id="VISA-01"
      className="relative w-full bg-deep-slate py-16 lg:py-24"
    >
      <SectionInner>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-4 max-w-[480px]">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
              签证
            </div>
            <h2 className="text-[28px] lg:text-[40px] font-misans-bold leading-tight text-soft-ivory tracking-tight">
              30 天免签 · 现在能直接来
            </h2>
            <p className="text-[14px] lg:text-[15px] font-misans-regular text-soft-ivory/70 leading-relaxed">
              30 天免签覆盖了北美、英联邦、欧盟和东亚主流国家。常见情况下，从决定到飞起只需要一张机票 + 一晚酒店预订。我们也能在收到咨询后核实你的护照适用范围。
            </p>
            <VisaChip>截至 2026 年 12 月有效 · 政策来源：中国国家移民管理局</VisaChip>
          </div>

          <div className="rounded-[8px] border border-soft-ivory/10 bg-charcoal-blue/40 overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
              aria-expanded={expanded}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-misans-bold text-soft-ivory">
                  30 天免签国家清单（10 个示例）
                </span>
                <span className="text-[12px] font-misans-regular text-soft-ivory/55">
                  完整清单点击展开 · approximate location only · we don&apos;t build a travel profile
                </span>
              </div>
              {expanded ? (
                <ChevronUp size={18} aria-hidden className="text-soft-ivory/65" />
              ) : (
                <ChevronDown size={18} aria-hidden className="text-soft-ivory/65" />
              )}
            </button>
            <div
              className={cn(
                "grid grid-cols-2 gap-x-8 gap-y-2 px-6 motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none",
                expanded ? "max-h-[600px] py-4 border-t border-soft-ivory/8" : "max-h-0 overflow-hidden",
              )}
            >
              {COUNTRIES_30D.map((c) => (
                <div
                  key={c}
                  className="text-[13px] font-misans-regular text-soft-ivory/85 py-1"
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="border-t border-soft-ivory/8 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-misans-regular text-soft-ivory/45">
                Last updated · 2026-05
              </span>
              <a
                href="/visa"
                className="text-[12px] font-misans-regular text-alpine-blue underline-offset-4 hover:underline"
              >
                Full visa guide →
              </a>
            </div>
          </div>
        </div>
      </SectionInner>
    </section>
  );
}
