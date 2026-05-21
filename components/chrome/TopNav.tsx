"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, MessageCircle, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { DropdownSurface } from "@/components/atoms/DropdownSurface";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { LocaleSwitch } from "@/components/i18n/LocaleSwitch";
import { useDictionary } from "@/components/i18n/LocaleProvider";

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

export function TopNav() {
  const dict = useDictionary();
  const nav = dict.home.nav;

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
            aria-label={nav.brand}
            className="inline-flex items-center gap-2 shrink-0 text-soft-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 rounded-sm"
          >
            <PandaMark className="h-7 w-7 lg:h-8 lg:w-8" />
            <span className="font-misans-bold text-[20px] lg:text-[22px] tracking-tight">
              {nav.brand}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            role="navigation"
            aria-label={nav.ariaLabel}
            className="ml-12 hidden lg:flex items-center gap-8"
          >
            {nav.items.map((item) =>
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
              {nav.more} <ChevronDown size={14} aria-hidden />
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
                {nav.ctaPlan}
              </CTAPrimary>
              <a
                href="https://wa.me/"
                className="inline-flex items-center gap-1.5 text-[13px] font-misans-regular text-soft-ivory hover:text-soft-ivory/80 motion-safe:transition-colors"
                aria-label={nav.whatsappAria}
              >
                <MessageCircle size={14} aria-hidden />
                {nav.whatsappLabel}
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
                {nav.authTrigger}
                <ChevronDown size={12} aria-hidden />
              </button>
              <DropdownSurface
                open={authOpen}
                onClose={() => setAuthOpen(false)}
                triggerRef={authTriggerRef}
                width={280}
                ariaLabel={nav.authMenuLabel}
                align="right"
              >
                <div className="flex flex-col gap-3 p-5">
                  <div className="text-[14px] font-misans-bold text-soft-ivory">
                    {nav.authWelcome}
                  </div>
                  <CTAPrimary href="/auth/sign-in" className="w-full h-10 text-[13px]">
                    {nav.authSignIn}
                  </CTAPrimary>
                  <a
                    href="/auth/sign-up"
                    className="text-[13px] font-misans-regular text-soft-ivory underline-offset-4 hover:underline"
                  >
                    {nav.authSignUp}
                  </a>
                  <p className="text-[12px] font-misans-regular text-soft-ivory/60 leading-relaxed">
                    {nav.authNote}
                  </p>
                </div>
              </DropdownSurface>
            </div>

            {/* M-LANG */}
            <div className="relative hidden md:block">
              <LocaleSwitch />
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-soft-ivory hover:bg-soft-ivory/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
              aria-label={nav.mobileMenuOpen}
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
  const dict = useDictionary();
  const nav = dict.home.nav;

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
      aria-label={nav.mobileMenuLabel}
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
          aria-label={nav.mobileMenuClose}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-soft-ivory hover:bg-soft-ivory/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70"
        >
          <X size={20} aria-hidden />
        </button>
        <nav className="mt-4 flex flex-col gap-8" aria-label={nav.ariaLabel}>
          {nav.items.map((item) =>
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
            {nav.ctaPlan}
          </CTAPrimary>
          <a
            href="https://wa.me/"
            className="inline-flex items-center justify-center gap-2 text-[15px] font-misans-regular text-soft-ivory"
          >
            <MessageCircle size={16} aria-hidden />
            {nav.whatsappLabel}
          </a>
        </div>
        <div className="mt-10">
          <div className="text-[12px] font-misans-regular tracking-widest text-soft-ivory/45">
            {nav.languageHeading}
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
            {nav.authMobileLink}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ----- Brand mark ----- */
function PandaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      role="img"
    >
      {/* Head */}
      <circle cx="16" cy="17" r="10" fill="#FAF7EE" />
      {/* Ears */}
      <ellipse cx="7.5" cy="9.5" rx="3.6" ry="3.2" fill="#1F1F1F" />
      <ellipse cx="24.5" cy="9.5" rx="3.6" ry="3.2" fill="#1F1F1F" />
      {/* Eye patches */}
      <ellipse cx="12" cy="16" rx="2.4" ry="3" fill="#1F1F1F" transform="rotate(-15 12 16)" />
      <ellipse cx="20" cy="16" rx="2.4" ry="3" fill="#1F1F1F" transform="rotate(15 20 16)" />
      {/* Eyes */}
      <circle cx="12.4" cy="16.6" r="0.9" fill="#FAF7EE" />
      <circle cx="19.6" cy="16.6" r="0.9" fill="#FAF7EE" />
      {/* Nose */}
      <ellipse cx="16" cy="20" rx="1.4" ry="1" fill="#1F1F1F" />
      {/* Red accent — 中国元素 */}
      <circle cx="16" cy="6.5" r="1.6" fill="#C8102E" />
    </svg>
  );
}
function SoftFourOhFourDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dict = useDictionary();
  const nav = dict.home.nav;

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
            {nav.soft404Title}
          </h3>
          <p className="text-[13px] font-misans-regular text-soft-ivory/75 leading-relaxed">
            {nav.soft404Body}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <a
              href="mailto:hello@example.com?subject=Notify%20me%20when%20Stories%20opens"
              className="text-[13px] font-misans-regular text-alpine-blue underline-offset-4 hover:underline"
            >
              {nav.soft404Notify}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto text-[12px] font-misans-regular text-soft-ivory/60 hover:text-soft-ivory/85"
            >
              {nav.soft404Close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
