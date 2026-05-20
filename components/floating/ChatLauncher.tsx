"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilmGrain } from "@/components/atoms/FilmGrain";

/**
 * ChatLauncher — M-CHAT-LAUNCHER 右下浮 FAB。
 * brief: docs/modules/M-CHAT-LAUNCHER.md
 *
 * 4 状态：default / online dot / hidden（手风扁抓手）/ unread breath。
 * 与 INTERACTIVE-DOCK 留 16px 间距。
 */
export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHidden(window.localStorage.getItem("chatLauncherHidden") === "1");
  }, []);

  const toggleHidden = () => {
    const nv = !hidden;
    setHidden(nv);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("chatLauncherHidden", nv ? "1" : "0");
    }
  };

  if (hidden) {
    return (
      <button
        type="button"
        onClick={toggleHidden}
        aria-label="显示聊天入口"
        className="fixed bottom-6 right-0 z-40 h-12 w-8 rounded-l-full bg-charcoal-blue/80 backdrop-blur-md border border-r-0 border-soft-ivory/12 text-soft-ivory/65 hover:text-soft-ivory motion-safe:transition-colors"
      >
        <MessageCircle size={14} className="mx-auto" aria-hidden />
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="聊天入口 · Chat with our concierge desk"
        aria-expanded={open}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full",
          "bg-charcoal-blue/85 backdrop-blur-md border border-soft-ivory/12 shadow-[0_8px_32px_rgba(15,23,42,0.5)]",
          "grid place-items-center text-soft-ivory hover:bg-charcoal-blue/95 motion-safe:transition-all motion-safe:duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70",
        )}
      >
        <MessageCircle size={20} aria-hidden />
        <span
          aria-hidden
          className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-alpine-blue"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="聊天 widget"
          className="fixed bottom-24 right-6 z-40 w-[min(360px,90vw)] overflow-hidden rounded-[16px] surface-dropdown"
        >
          <FilmGrain opacity={0.04} />
          <div className="relative flex flex-col">
            <div className="flex items-center justify-between border-b border-soft-ivory/8 px-5 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-misans-bold text-soft-ivory">
                  Chat with our concierge desk
                </span>
                <span className="text-[11px] font-misans-regular text-soft-ivory/55">
                  Lin · Online · 通常 5 分钟内回复
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleHidden}
                  className="text-[11px] text-soft-ivory/55 hover:text-soft-ivory/85 underline-offset-4 hover:underline"
                >
                  Hide
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="关闭"
                  className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-soft-ivory/[0.06]"
                >
                  <X size={14} aria-hidden className="text-soft-ivory/75" />
                </button>
              </div>
            </div>
            <div className="px-5 py-4 text-[13px] font-misans-regular text-soft-ivory/85 leading-relaxed">
              你好。先问一句 - 你大概打算什么时候来中国？我先记下来，再给你一份对应季节的样板路线。
            </div>
            <div className="px-5 pb-4 flex flex-col gap-2">
              <input
                type="text"
                placeholder="写下你的问题…"
                className="bg-transparent border-b border-soft-ivory/15 py-2 text-[13px] text-soft-ivory placeholder:text-soft-ivory/35 focus:outline-none focus:border-alpine-blue/60"
              />
              <a
                href="https://wa.me/"
                className="text-[12px] font-misans-regular text-soft-ivory/55 underline-offset-4 hover:underline self-start"
              >
                Open WhatsApp instead →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
