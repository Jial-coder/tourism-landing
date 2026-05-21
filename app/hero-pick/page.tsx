"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Hero 候选对比页 — /hero-pick
 *
 * 5 张暖金时刻候选，每张以接近 hero 实际尺寸（70vh）渲染，配同款渐变蒙版 + headline，
 * 直接所见即所得。决策完毕后告诉 lead 编号即可换图，本路由 review 完毕后删除。
 */

type Candidate = {
  id: string;
  file: string;
  label: string;
  caption: string;
};

const CANDIDATES: Candidate[] = [
  {
    id: "v4-a",
    file: "/landmarks/hero-gen/v4-a.webp",
    label: "v4-a · 抹地图烙印",
    caption: "v3-a 当 reference 重生 · 抹掉右半中国轮廓 + 4 marker + 金色路线 · 留左半黄山 · 准备叠 SVG overlay",
  },
  {
    id: "v4-b",
    file: "/landmarks/hero-gen/v4-b.webp",
    label: "v4-b · 抹地图烙印",
    caption: "同 prompt 第二张候选",
  },
  {
    id: "v4-c",
    file: "/landmarks/hero-gen/v4-c.webp",
    label: "v4-c · 抹地图烙印",
    caption: "同 prompt 第三张候选",
  },
  {
    id: "v4-d",
    file: "/landmarks/hero-gen/v4-d.webp",
    label: "v4-d · 抹地图烙印",
    caption: "同 prompt 第四张候选",
  },
  {
    id: "v3-a",
    file: "/landmarks/hero-gen/v3-a.webp",
    label: "v3-a · 含地图烙印（已淘汰）",
    caption: "对比基准 · 右半地图烙死无法交互 · 准备替换",
  },
];

export default function HeroPickPage() {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-soft-ivory/10 bg-deep-slate/95 backdrop-blur-md px-6 lg:px-16 py-5 text-soft-ivory">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-[18px] lg:text-[22px] font-misans-bold">
              Hero v4 候选 · 抹地图烙印 · 4 张 + v3-a 对比基准
            </h1>
            <p className="text-[12px] text-soft-ivory/55 mt-1">
              选标准：左半黄山未被破坏 + 右半地图 / marker / 路线全部干净 → 后续叠 SVG overlay
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-[12px] text-soft-ivory/65 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showOverlay}
                onChange={(e) => setShowOverlay(e.target.checked)}
                className="accent-alpine-blue"
              />
              叠加 hero 蒙版 + 文字
            </label>
            <Link
              href="/"
              className="text-[13px] underline-offset-4 hover:underline text-soft-ivory/75"
            >
              ← 回首页
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-col">
        {CANDIDATES.map((c) => (
          <article
            key={c.id}
            className="relative w-full overflow-hidden border-b border-soft-ivory/10"
            style={{ height: "min(72vh, 720px)" }}
          >
            <Image
              src={c.file}
              alt={c.label}
              fill
              priority={c.id === "v4-a"}
              sizes="100vw"
              className="object-cover"
            />

            {showOverlay && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal-blue/75 via-charcoal-blue/35 to-transparent"
                />
                <div className="relative z-10 flex h-full items-center px-6 lg:px-16">
                  <div className="max-w-[640px]">
                    <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/85">
                      候选 · {c.id}
                    </div>
                    <h2 className="mt-3 text-[36px] lg:text-[64px] font-misans-heavy leading-[1.1] tracking-tight drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]">
                      还没想好去中国哪？
                    </h2>
                    <p className="mt-3 text-[16px] lg:text-[18px] font-misans-regular text-soft-ivory/85 leading-relaxed max-w-[520px]">
                      从你喜欢的，开始一段旅程。
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* corner label always visible — small but legible */}
            <div className="absolute right-4 top-4 z-20 rounded-[6px] bg-deep-slate/85 backdrop-blur-md px-3 py-2 border border-soft-ivory/15">
              <div className="text-[13px] font-misans-bold text-soft-ivory">
                {c.label}
              </div>
              <div className="text-[11px] font-misans-regular text-soft-ivory/65 mt-0.5">
                {c.caption}
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="px-6 lg:px-16 py-8 text-[12px] text-ink/55">
        <div className="mx-auto max-w-[1440px]">
          5 张并排所见即所得 · v4 重点看右半是否干净 + 左半黄山是否未被破坏 · 选完 lead 把 Hero.tsx 主图换到对应文件并叠 ChinaMapOverlay
        </div>
      </footer>
    </main>
  );
}
