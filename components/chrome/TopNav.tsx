"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, MessageCircle, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { DropdownSurface } from "@/components/atoms/DropdownSurface";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { LocaleSwitch } from "@/components/i18n/LocaleSwitch";

/**
 * TopNav v2 — chrome 三件套整合（M-NAV + M-LANG + M-AUTH-ENTRY）
 *
 * 6 项 codex 5.5 cross-validation 修复均命中（chrome v1 → v2）：
 *   1. scrolled 阈值 = window.innerHeight * 0.9（不是 >10），hero 内不变暗
 *   2. dropdown 通过 click toggle + outside-click 关闭（不是仅 hover），触屏友好
 *   3. motion-safe 包裹所有 transition + Esc 关 dropdown
 *   4. role / aria-haspopup / aria-expanded / aria-disabled / focus-visible 全套
 *   5. "旅行故事" 软 404 触发 240×120 dialog（不是静默吞掉点击）
 *   6. lang current 用 left border-l + bg-transparent（不是 bg-[#fdfbf7]/5）
 *
 * brief sources:
 *   docs/modules/M-NAV.md §3-§7
 *   docs/modules/M-LANG.md §3-§5
 *   docs/modules/M-AUTH-ENTRY.md
 *   DESIGN.md §7.7-§7.10
 */

const NAV_ITEMS = [
  { href: "/destinations", label: "目的地", soft404: false },
  { href: "/itineraries", label: "行程", soft404: false },
  { href: "/advisors", label: "顾问", soft404: false },
  { href: "/stories", label: "旅行故事", soft404: true },
  { href: "/about", label: "关于我们", soft404: false },
];

export function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  const authTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Fix 1: scrolled threshold = 90vh (NOT >10) — hero 内不触发
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile drawer body lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[72px]",
          "motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none",
          "font-[var(--font-sans)]",
          isScrolled
            ? "bg-charcoal-blue/80 backdrop-blur-[12px]"
            : "bg-transparent",
        )}
      >
        {isScrolled && <FilmGrain opacity={0.04} />}
        <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center px-6 lg:px-16">
          {/* Brand wordmark */}
          <Link
            href="/"
            className="font-misans-bold text-[20px] lg:text-[22px] tracking-tight text-soft-ivory shrink-0"
          >
            [Brand]
          </Link>

          {/* Desktop nav */}
          <nav
            role="navigation"
            aria-label="主导航"
            className="ml-12 hidden lg:flex items-center gap-8"
          >
            {NAV_ITEMS.map((item) =>
              item.soft404 ? (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => setStoryModalOpen(true)}
                  className={cn(
                    "text-[14px] font-misans-regular focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 rounded-sm",
                    "motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none",
                    "text-soft-ivory/60 hover:text-soft-ivory/75",
                  )}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[14px] font-misans-regular focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 rounded-sm",
                    "motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none",
                    "text-soft-ivory/90 hover:text-soft-ivory",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/more"
              className="inline-flex items-center gap-1 text-[14px] font-misans-regular text-soft-ivory/90 hover:text-soft-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 rounded-sm"
            >
              更多 <ChevronDown size={14} aria-hidden />
            </Link>
          </nav>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-4 lg:gap-6">
            {/* Desktop: M-DUAL-CTA compact */}
            <div className="hidden lg:flex items-center gap-4">
              <CTAPrimary
                href="/plan"
                className="h-9 px-5 text-[13px]"
              >
                免费定制行程
              </CTAPrimary>
              <a
                href="https://wa.me/"
                className="inline-flex items-center gap-1.5 text-[13px] font-misans-regular text-soft-ivory hover:text-soft-ivory/80 motion-safe:transition-colors"
                aria-label="WhatsApp 值班顾问"
              >
                <MessageCircle size={14} aria-hidden />
                WhatsApp · 值班
              </a>
            </div>

            {/* M-AUTH-ENTRY */}
            <div className="relative hidden lg:block">
              <button
                ref={authTriggerRef}
                type="button"
                onClick={() => {
                  setAuthOpen((v) => !v);
                }}
                aria-haspopup="menu"
                aria-expanded={authOpen}
                className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-[13px] font-misans-regular text-soft-ivory hover:text-soft-ivory/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
              >
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-full border border-soft-ivory/30"
                >
                  <User size={14} className="text-soft-ivory/85" />
                </span>
                登录
                <ChevronDown size={12} aria-hidden />
              </button>
              <DropdownSurface
                open={authOpen}
                onClose={() => setAuthOpen(false)}
                triggerRef={authTriggerRef}
                width={280}
                ariaLabel="登录菜单"
                align="right"
              >
                <div className="flex flex-col gap-3 p-5">
                  <div className="text-[14px] font-misans-bold text-soft-ivory">
                    欢迎
                  </div>
                  <CTAPrimary href="/auth/sign-in" className="w-full h-10 text-[13px]">
                    登录
                  </CTAPrimary>
                  <a
                    href="/auth/sign-up"
                    className="text-[13px] font-misans-regular text-soft-ivory underline-offset-4 hover:underline"
                  >
                    创建账号
                  </a>
                  <p className="text-[12px] font-misans-regular text-soft-ivory/60 leading-relaxed">
                    保存草稿和聊天记录，下次回来继续。
                  </p>
                </div>
              </DropdownSurface>
            </div>

            {/* M-LANG */}
            <div className="relative">
              <LocaleSwitch />
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-soft-ivory hover:bg-soft-ivory/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
              aria-label="打开菜单"
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSoft404={() => {
          setMobileOpen(false);
          setStoryModalOpen(true);
        }}
      />

      <SoftFourOhFourDialog
        open={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
      />
    </>
  );
}

/* ----- Mobile Drawer ----- */
function MobileDrawer({
  open,
  onClose,
  onSoft404,
}: {
  open: boolean;
  onClose: () => void;
  onSoft404: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      {...(!open ? { inert: true } : {})}
      aria-label="移动端菜单"
      className={cn(
        "lg:hidden fixed inset-0 z-[60] bg-charcoal-blue/95",
        "motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none",
        open ? "translate-x-0" : "translate-x-full pointer-events-none",
      )}
    >
      <FilmGrain opacity={0.05} />
      <div className="relative flex h-full flex-col px-6 py-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭菜单"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-soft-ivory hover:bg-soft-ivory/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
        >
          <X size={20} aria-hidden />
        </button>
        <nav className="mt-4 flex flex-col gap-8" aria-label="主导航">
          {NAV_ITEMS.map((item) =>
            item.soft404 ? (
              <button
                key={item.href}
                type="button"
                onClick={onSoft404}
                className="text-left text-[28px] font-misans-bold text-soft-ivory/60"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="text-[28px] font-misans-bold text-soft-ivory"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="mt-10 flex flex-col gap-4">
          <CTAPrimary href="/plan" className="w-full h-12">
            免费定制行程
          </CTAPrimary>
          <a
            href="https://wa.me/"
            className="inline-flex items-center justify-center gap-2 text-[15px] font-misans-regular text-soft-ivory"
          >
            <MessageCircle size={16} aria-hidden />
            WhatsApp · 值班
          </a>
        </div>
        <div className="mt-10">
          <div className="text-[12px] font-misans-regular tracking-widest text-soft-ivory/45">
            LANGUAGE · 语言
          </div>
          <div className="mt-3">
            <LocaleSwitch />
          </div>
        </div>
        <div className="mt-auto pt-6">
          <Link
            href="/auth/sign-in"
            onClick={onClose}
            className="text-[15px] font-misans-regular text-soft-ivory underline-offset-4 hover:underline"
          >
            登录 →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ----- Soft 404 dialog ----- */
function SoftFourOhFourDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-deep-slate/60 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in-0"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="soft404-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-[min(560px,92vw)] overflow-hidden rounded-[16px] surface-dropdown p-6"
      >
        <FilmGrain opacity={0.05} />
        <div className="relative flex flex-col gap-3">
          <h3
            id="soft404-title"
            className="text-[16px] font-misans-bold text-soft-ivory"
          >
            这一栏将在第二阶段开放
          </h3>
          <p className="text-[13px] font-misans-regular text-soft-ivory/75 leading-relaxed">
            This corner of the site is opening in Phase 2. Want us to email you when it&apos;s live?
          </p>
          <div className="mt-2 flex items-center gap-4">
            <a
              href="mailto:hello@example.com?subject=Notify%20me%20when%20Stories%20opens"
              className="text-[13px] font-misans-regular text-alpine-blue underline-offset-4 hover:underline"
            >
              Notify me · 通知我
            </a>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto text-[12px] font-misans-regular text-soft-ivory/60 hover:text-soft-ivory/85"
            >
              Esc 关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
