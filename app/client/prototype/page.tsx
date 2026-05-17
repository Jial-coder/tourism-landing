"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import chinaMap from "@/app/_generated/china-map.json";
import { LANDMARK_DETAILS } from "./landmark-details";

type Landmark = {
  id: string;
  zh: string;
  en: string;
  tagline: string;
  lng: number;
  lat: number;
  query: string;
  x: number;
  y: number;
};

const landmarks = chinaMap.landmarks as Landmark[];

export default function PrototypePage() {
  const [hoverId, setHoverId] = useState<string | null>("beijing");
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleEnter = useCallback((id: string) => setHoverId(id), []);
  const handleLeave = useCallback(() => setHoverId(null), []);
  const handleClick = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const popoverLandmark =
    landmarks.find((l) => l.id === hoverId) ??
    landmarks.find((l) => l.id === "beijing")!;
  const activeLandmark = activeId
    ? landmarks.find((l) => l.id === activeId)!
    : null;
  const activeDetail = activeLandmark ? LANDMARK_DETAILS[activeLandmark.id] : null;

  return (
    <article>
      <section
        id="hero"
        data-feedback-id="HERO-01"
        className="relative grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[45fr_55fr] lg:gap-16"
      >
        {/* LEFT — content */}
        <div className="z-10 flex max-w-2xl flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A65C]" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A65C]">
              EXPLORE CHINA · 探索中国
            </span>
          </div>

          <h1
            className="text-[#1F4E5C]"
            style={{ fontFamily: '"Noto Serif SC", "Source Han Serif", serif' }}
          >
            <span className="block text-[clamp(56px,8vw,112px)] leading-[0.95] tracking-tight">
              看景 · 吃喝 · 人文
            </span>
            <span className="mt-3 block text-[clamp(28px,3.5vw,48px)] leading-tight text-[#1F4E5C]/85">
              一站式中国深度行程
            </span>
          </h1>

          <p className="max-w-lg text-lg font-medium text-[#1A1A1A]/90">
            Curated journeys — sights, taste, soul, all in one trip
          </p>

          <p className="max-w-lg text-base leading-relaxed text-[#1A1A1A]/75">
            十年本地策划经验，带境外游客避开打卡套路。每一段行程由当地资深规划师设计 —— 看真景、吃真味、读真历史。
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              className="group flex items-center justify-center gap-2 rounded-xl border border-[#C13829] bg-[#C13829] px-7 py-4 text-sm font-semibold text-[#F8F4EC] shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-[#A82E22]"
            >
              定制我的中国行程
              <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
                →
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#1F4E5C] bg-transparent px-7 py-4 text-sm font-semibold text-[#1F4E5C] transition-all duration-150 hover:-translate-y-px hover:bg-[#1F4E5C]/5"
            >
              在线聊聊想去哪里
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#E8E0D5] pt-6">
            <TrustItem icon="★" label="5,000+ 五星好评" />
            <TrustItem icon="◐" label="24/7 中英双语客服" />
            <TrustItem icon="◇" label="100% 个性化定制" />
          </div>
        </div>

        {/* RIGHT — China map */}
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-visible rounded-3xl border border-[#E8E0D5]/70 bg-gradient-to-br from-[#F8F4EC] to-[#E8E0D5]/60 lg:aspect-auto lg:h-[640px]">
          <svg
            viewBox={chinaMap.viewBox}
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="中华人民共和国地图（GS(2019)1822 标准底图）"
          >
            <path
              d={chinaMap.path}
              fill="rgba(31, 78, 92, 0.04)"
              stroke="#1F4E5C"
              strokeOpacity={0.55}
              strokeWidth={1.2}
              strokeLinejoin="round"
            />
            {landmarks.map((m) =>
              m.id === hoverId || m.id === activeId ? null : (
                <circle
                  key={`pulse-${m.id}`}
                  cx={m.x}
                  cy={m.y}
                  r={22}
                  fill="#C13829"
                  opacity={0.12}
                >
                  <animate attributeName="r" values="18;26;18" dur="3.2s" repeatCount="indefinite" />
                  <animate
                    attributeName="opacity"
                    values="0.14;0.04;0.14"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              ),
            )}

            {/* SVG renders in source order — put hovered/active LAST so they sit on top */}
            {[...landmarks]
              .sort((a, b) => {
                const aBig = a.id === hoverId || a.id === activeId ? 1 : 0;
                const bBig = b.id === hoverId || b.id === activeId ? 1 : 0;
                return aBig - bBig;
              })
              .map((m) => (
                <LandmarkPortrait
                  key={m.id}
                  landmark={m}
                  hovered={hoverId === m.id}
                  active={activeId === m.id}
                  onEnter={handleEnter}
                  onLeave={handleLeave}
                  onClick={handleClick}
                />
              ))}

            <Popover landmark={popoverLandmark} />
          </svg>

          <span className="absolute bottom-3 right-4 text-[10px] text-[#1A1A1A]/35">
            审图号 GS(2019)1822
          </span>
        </div>
      </section>

      {/* Detail panel — expands below hero on landmark click, no page nav */}
      <DetailPanel
        landmark={activeLandmark}
        detail={activeDetail}
        onClose={() => setActiveId(null)}
      />

      <section className="border-t border-[#E8E0D5] py-8 text-sm text-[#1A1A1A]/60">
        <p>
          后续 section 待 v9 落地：ITIN-01 行程卡片 · PRICE-01 价格区 · FORM-01 询价表单 · FAQ-01 · FOOT-01。
        </p>
      </section>
    </article>
  );
}

function TrustItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-[#C9A65C]" aria-hidden>
        {icon}
      </span>
      <span className="text-sm font-medium text-[#1A1A1A]">{label}</span>
    </div>
  );
}

function LandmarkPortrait({
  landmark,
  hovered,
  active,
  onEnter,
  onLeave,
  onClick,
}: {
  landmark: Landmark;
  hovered: boolean;
  active: boolean;
  onEnter: (id: string) => void;
  onLeave: () => void;
  onClick: (id: string) => void;
}) {
  const big = hovered || active;
  const size = big ? 50 : 40;
  // SVG units: place at landmark.x/y inside viewBox (1000x750), -size/2 to center
  return (
    <foreignObject
      x={landmark.x - size / 2}
      y={landmark.y - size / 2}
      width={size}
      height={size}
      style={{ overflow: "visible" }}
    >
      <button
        type="button"
        className="block h-full w-full cursor-pointer rounded-full transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C13829]/40"
        onMouseEnter={() => onEnter(landmark.id)}
        onMouseLeave={onLeave}
        onFocus={() => onEnter(landmark.id)}
        onBlur={onLeave}
        onClick={() => onClick(landmark.id)}
        aria-label={`${landmark.zh} ${landmark.en} — ${landmark.tagline}`}
      >
        <span
          className={`relative block h-full w-full overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#F8F4EC] transition-all duration-300 ${
            active
              ? "ring-[#C13829] shadow-[0_8px_24px_rgba(193,56,41,0.28)]"
              : hovered
                ? "ring-[#C13829]"
                : "ring-[#C9A65C]/70"
          }`}
        >
          <Image
            src={`/landmarks/${landmark.id}.jpg`}
            alt=""
            fill
            sizes="60px"
            className="object-cover"
          />
        </span>
      </button>
    </foreignObject>
  );
}

function Popover({ landmark }: { landmark: Landmark }) {
  // Same coord system: landmark.x/y in viewBox 1000x750
  const popoverW = 280;
  const popoverH = 78;
  const flipLeft = landmark.x > 650;
  const dx = flipLeft ? -(popoverW + 30) : 30;

  return (
    <foreignObject
      x={landmark.x + dx}
      y={landmark.y - popoverH / 2}
      width={popoverW}
      height={popoverH + 10}
      style={{ overflow: "visible", pointerEvents: "none" }}
    >
      <div className="rounded-xl border border-[#E8E0D5] bg-[#F8F4EC] p-3 shadow-[0_12px_32px_rgba(26,26,26,0.10)]">
        <div className="flex gap-3">
          <div className="relative h-[60px] w-[80px] flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={`/landmarks/${landmark.id}.jpg`}
              alt={`${landmark.zh} ${landmark.en}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3
              className="text-sm font-semibold leading-tight text-[#1F4E5C]"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              {landmark.zh} {landmark.en}
            </h3>
            <p className="mb-2 text-[11px] leading-tight text-[#1A1A1A]/60">{landmark.tagline}</p>
            <span className="text-[11px] font-semibold text-[#C13829]">
              点击查看详情 →
            </span>
          </div>
        </div>
      </div>
    </foreignObject>
  );
}

function DetailPanel({
  landmark,
  detail,
  onClose,
}: {
  landmark: Landmark | null;
  detail: ReturnType<typeof LANDMARK_DETAILS extends Record<string, infer T> ? () => T : never> | null;
  onClose: () => void;
}) {
  if (!landmark || !detail) return null;

  return (
    <section
      data-feedback-id="HERO-01-DETAIL"
      className="relative -mt-4 mb-12 animate-[fadeIn_300ms_ease-out] rounded-3xl border border-[#E8E0D5] bg-[#F8F4EC] p-8 shadow-[0_24px_64px_rgba(26,26,26,0.08)]"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E0D5] bg-[#F8F4EC] text-[#1F4E5C] transition-colors hover:bg-[#E8E0D5]"
        aria-label="关闭详情"
      >
        ×
      </button>

      <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={`/landmarks/${landmark.id}.jpg`}
            alt={`${landmark.zh} ${landmark.en}`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A65C]">
              {landmark.en}
            </span>
            <h2
              className="mt-2 text-[clamp(28px,4vw,48px)] leading-tight text-[#1F4E5C]"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              {landmark.zh}
            </h2>
            <p className="mt-2 text-base font-medium text-[#1A1A1A]/80">{detail.emotionLine}</p>
          </div>

          <p className="text-[15px] leading-relaxed text-[#1A1A1A]/75">{detail.intro}</p>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C9A65C]">
              周边美食
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {detail.food.map((f) => (
                <div
                  key={f.name}
                  className="rounded-lg border border-[#E8E0D5] bg-white/40 px-3 py-2 text-sm"
                >
                  <div className="font-medium text-[#1F4E5C]">{f.name}</div>
                  <div className="text-[11px] text-[#1A1A1A]/55">{f.tag}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C9A65C]">
                人文标签
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {detail.culture.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[#1F4E5C]/30 px-3 py-1 text-xs text-[#1F4E5C]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C9A65C]">
                基础设施
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {detail.infra.map((i) => (
                  <li key={i.label} className="flex items-center gap-2 text-[#1A1A1A]/80">
                    <span className="text-[#C9A65C]">{i.icon}</span>
                    <span>{i.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-3 border-t border-[#E8E0D5] pt-5">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-[#C13829] bg-[#C13829] px-6 py-3 text-sm font-semibold text-[#F8F4EC] transition-all hover:-translate-y-px hover:bg-[#A82E22]"
            >
              把这里加进我的行程
              <span>+</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-[#1F4E5C] bg-transparent px-6 py-3 text-sm font-semibold text-[#1F4E5C] transition-all hover:-translate-y-px hover:bg-[#1F4E5C]/5"
            >
              和我聊聊这里
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
