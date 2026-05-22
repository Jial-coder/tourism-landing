"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { cn } from "@/lib/utils";

export function ConciergeBand() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // 暂无后端 API（夜间无人工接入），假装异步完成
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setDone(true);
  };

  return (
    <section
      data-feedback-id="CONCIERGE-BAND-01"
      className="relative w-full bg-paper overflow-hidden"
    >
      <FilmGrain opacity={0.04} />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-16 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,320px)] gap-10 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 max-w-[640px]">
              <h2 className="text-[24px] lg:text-[32px] font-misans-bold leading-tight text-ink">
                把想法告诉一个真人顾问
              </h2>
              <p className="text-[14px] lg:text-[15px] font-misans-regular text-ink/70 leading-relaxed">
                4 个字段 · 不需要先选行程 · 不主动外发你的联系方式。本地中国顾问会在 4 小时内回 WhatsApp 或微信。
              </p>
            </div>

            {done ? (
              <div className="rounded-[6px] ring-1 ring-ink/10 bg-cream p-5">
                <div className="text-[15px] font-misans-bold text-ink">
                  收到 · 4 小时内 Lin 会回你
                </div>
                <p className="mt-1 text-[13px] font-misans-regular text-ink/70">
                  我们也会同步发一份 10 天样板行程做参考。如果你急，直接 WhatsApp +86 138 *** Lin。
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="想去哪？"
                    name="destination"
                    placeholder="张家界 · 桂林 · 还没想好…"
                  />
                  <Field
                    label="什么时候 · 多久"
                    name="timing"
                    placeholder="3 月中 · 10 天左右"
                  />
                  <Field
                    label="几位 · 谁同行"
                    name="party"
                    placeholder="2 大 1 小 · 父母同行"
                  />
                  <Field
                    label="WhatsApp / 微信 / Email"
                    name="contact"
                    placeholder="选你最方便回复的一种"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <CTAPrimary type="submit" className="h-10 px-6 text-[13px]">
                    {submitting ? "Sending…" : "Send to Lin"}
                  </CTAPrimary>
                  <p className="text-[12px] font-misans-regular text-ink/70">
                    4 小时内回复 · 不主动外发 · 不订阅营销
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside className="rounded-[12px] ring-1 ring-ink/10 bg-cream p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[16px] ring-1 ring-ink/15">
                <Image
                  src="/landmarks/lijiang.jpg"
                  alt="顾问头像占位（实拍待替换）"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-misans-bold text-ink">
                    Lin · 林颂阳
                  </span>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-jade" />
                  <span className="text-[11px] font-misans-regular text-ink/65">
                    Online
                  </span>
                </div>
                <div className="text-[12px] font-misans-regular text-ink/65 leading-relaxed">
                  English · 中文 · 1 more
                </div>
                <div className="text-[12px] font-misans-regular text-ink/70 leading-relaxed">
                  专长：自然 · 家庭 · 西南山地
                </div>
              </div>
            </div>
            <p className="text-[12px] font-misans-regular text-ink/65 leading-relaxed border-t border-ink/10 pt-3">
              "我会先听你的节奏，再帮你判断哪条线最合适。" — Lin
            </p>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-2 text-[13px] font-misans-bold text-ink hover:text-jade"
            >
              <MessageCircle size={14} aria-hidden />
              Talk to Lin on WhatsApp →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-[12px] font-misans-regular tracking-widest uppercase text-ink/70">
        {label}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent border-0 border-b border-ink/15",
          "py-2 text-[14px] font-misans-regular text-ink placeholder:text-ink/35",
          "focus:outline-none focus:border-jade motion-safe:transition-colors",
        )}
      />
    </label>
  );
}
