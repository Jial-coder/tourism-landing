"use client";

import { useState } from "react";
import { Heart, FileText, MessageSquare, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * InteractiveDock — M-INTERACTIVE-DOCK 右侧 4 按钮 dock。
 * brief: docs/modules/M-INTERACTIVE-DOCK.md
 *
 * idle 仅 2px 右屏边线；hover/focus right-edge 24px 才渐显；移动端隐藏。
 */

const ITEMS = [
  { icon: Heart, label: "收藏", href: "/account/favorites" },
  { icon: FileText, label: "草稿", href: "/account/drafts" },
  { icon: MessageSquare, label: "反馈", href: "/feedback" },
];

export function InteractiveDock() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        aria-label="显示工具 dock"
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 h-12 w-1.5 bg-soft-ivory/8 hover:bg-soft-ivory/20 motion-safe:transition-colors"
      />
    );
  }

  return (
    <div
      className={cn(
        "hidden lg:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 flex-col gap-2",
        "rounded-full bg-charcoal-blue/70 border border-soft-ivory/8 backdrop-blur-md p-1.5",
        "opacity-50 hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-150",
      )}
    >
      {ITEMS.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="grid h-8 w-8 place-items-center rounded-full text-soft-ivory/75 hover:text-soft-ivory hover:bg-soft-ivory/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
        >
          <Icon size={16} aria-hidden />
        </a>
      ))}
      <button
        type="button"
        onClick={() => setCollapsed(true)}
        aria-label="收起 dock"
        className="grid h-8 w-8 place-items-center rounded-full text-soft-ivory/55 hover:text-soft-ivory/85 hover:bg-soft-ivory/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
      >
        <Minus size={16} aria-hidden />
      </button>
    </div>
  );
}
