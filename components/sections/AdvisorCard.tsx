import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { FilmGrain } from "@/components/atoms/FilmGrain";

/**
 * AdvisorCard — M-ADVISOR-CARD（独立大卡，不是 hero 内的 mini）。
 * brief: docs/modules/M-ADVISOR-CARD.md
 *
 * 用 "Lin" 真实名字替代抽象服务包；语言行写 `English · 中文 · 1 more`（brief 约定）。
 */
export function AdvisorCard() {
  return (
    <section
      data-feedback-id="ADVISOR-CARD-01"
      className="relative w-full bg-deep-slate py-20 lg:py-32"
    >
      <SectionInner>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
          {/* Left: portrait + meta */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-[420px] overflow-hidden rounded-[8px] border border-soft-ivory/10">
              <Image
                src="/landmarks/lijiang.jpg"
                alt="顾问肖像占位（实拍待替换 — 客户授权流程后补）"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <FilmGrain opacity={0.06} />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-deep-slate/90 to-transparent">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-alpine-blue" />
                  <span className="text-[12px] font-misans-regular text-soft-ivory/80">
                    Online · 北京时间 09:00 — 21:00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: bio + CTA */}
          <div className="flex flex-col gap-6 max-w-[640px]">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
              你的顾问
            </div>
            <h2 className="text-[36px] lg:text-[56px] font-misans-bold leading-tight text-soft-ivory tracking-tight">
              Lin · 林颂阳
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-misans-regular text-soft-ivory/75">
              <span>English · 中文 · 1 more</span>
              <span className="text-soft-ivory/40">|</span>
              <span>专长：自然摄影 · 家庭旅行 · 西南山地</span>
            </div>
            <p className="text-[15px] lg:text-[17px] font-misans-regular text-soft-ivory/80 leading-relaxed">
              在四川和云南跑了 8 年高山线，更喜欢慢慢拼一条让你"回得去"的路线，而不是塞 12 站。每个客人我会先听节奏，再帮你判断哪条线最合适。
            </p>
            <p className="text-[14px] font-misans-regular text-soft-ivory/65 leading-relaxed">
              "我不是中介。我会跟你一起把行程改三轮，直到你看着它就知道 — 这就是我的旅行。"
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <CTAPrimary href="https://wa.me/" className="h-12 px-7 text-[14px]">
                <MessageCircle size={16} className="mr-2" aria-hidden />
                Talk to Lin on WhatsApp
              </CTAPrimary>
              <a
                href="/chat?advisor=lin"
                className="text-[13px] font-misans-regular text-soft-ivory/85 underline-offset-4 hover:underline"
              >
                站内聊天 · in-site chat
              </a>
            </div>
          </div>
        </div>
      </SectionInner>
    </section>
  );
}
