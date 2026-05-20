import { SectionInner } from "@/components/atoms/SectionContainer";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { NewsletterForm } from "./NewsletterForm";

/**
 * Footer — M-FOOTER（编辑型目录 + Newsletter + 多语言展示行 + 法务）。
 * brief: docs/modules/M-FOOTER.md
 *
 * 4 列 / 移动 accordion；不替代 M-LANG 的顶栏切换器。
 */

const COLUMNS = [
  {
    title: "Brand & Promise",
    items: [
      { label: "我们是谁", href: "/about" },
      { label: "品牌承诺", href: "/about/promise" },
      { label: "Responsible travel", href: "/about/responsible-travel" },
    ],
  },
  {
    title: "Travel",
    items: [
      { label: "目的地 · Destinations", href: "/destinations" },
      { label: "行程 · Itineraries", href: "/itineraries" },
      { label: "签证 · Visa", href: "/visa" },
      { label: "旅行故事 · Stories", href: "/stories", soft404: true },
      { label: "Best time", href: "/best-time", soft404: true },
    ],
  },
  {
    title: "People",
    items: [
      { label: "顾问 · Advisors", href: "/advisors" },
      { label: "客户原话", href: "/about/voices" },
      { label: "Careers", href: "/careers", soft404: true },
    ],
  },
  {
    title: "Get in touch",
    items: [
      { label: "WhatsApp · 值班", href: "https://wa.me/" },
      { label: "Email · hello@example.com", href: "mailto:hello@example.com" },
      { label: "WeChat · 扫码加 Lin", href: "/contact/wechat" },
      { label: "Press inquiries", href: "/press" },
    ],
  },
];

const LANG_DISPLAY = [
  { code: "ZH", label: "中文" },
  { code: "EN", label: "English" },
  { code: "JA", label: "日本語" },
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "ES", label: "Español", coming: true },
  { code: "IT", label: "Italiano", coming: true },
  { code: "RU", label: "Русский", coming: true },
];

export function Footer() {
  return (
    <footer
      data-feedback-id="FOOTER-01"
      className="relative w-full bg-gradient-to-b from-charcoal-blue to-deep-slate"
    >
      <FilmGrain opacity={0.04} />
      <div className="relative">
        {/* Manifesto strip */}
        <div className="border-y border-soft-ivory/8">
          <SectionInner className="py-8 lg:py-12">
            <p className="text-[18px] lg:text-[28px] font-misans-bold tracking-tight italic text-soft-ivory text-center">
              Highlights happen when you get closer.
            </p>
            <p className="mt-2 text-[13px] font-misans-regular text-soft-ivory/55 text-center">
              真正的高光时刻，发生在距离够近的时候。
            </p>
          </SectionInner>
        </div>

        {/* Columns + Newsletter */}
        <SectionInner className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Newsletter (occupies col 1) */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-alpine-blue/80">
                Newsletter
              </div>
              <p className="text-[13px] font-misans-regular text-soft-ivory/75 leading-relaxed">
                每月 1 封 · 顾问亲选 3 个目的地灵感 · 不卖广告。
              </p>
              <NewsletterForm />
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-soft-ivory/55">
                  {col.title}
                </div>
                <ul className="flex flex-col gap-2">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        className={
                          "text-[13px] font-misans-regular underline-offset-4 hover:underline " +
                          ("soft404" in it && it.soft404
                            ? "text-soft-ivory/60"
                            : "text-soft-ivory/85")
                        }
                      >
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionInner>

        {/* Language display row + legal */}
        <div className="border-t border-soft-ivory/8">
          <SectionInner className="py-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-misans-regular">
              {LANG_DISPLAY.map((l) => (
                <span
                  key={l.code}
                  className={
                    l.coming
                      ? "text-soft-ivory/35"
                      : "text-soft-ivory/75 hover:text-soft-ivory cursor-pointer"
                  }
                >
                  {l.label}
                  {l.coming && (
                    <span className="ml-1 text-soft-ivory/28">· soon</span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-misans-regular text-soft-ivory/45">
              <span>© 2026 [Brand] · 中国本地旅行顾问</span>
              <a href="/legal/privacy" className="hover:text-soft-ivory/65">
                Privacy
              </a>
              <a href="/legal/terms" className="hover:text-soft-ivory/65">
                Terms
              </a>
              <a href="/legal/icp" className="hover:text-soft-ivory/65">
                ICP 备案 · ICP-XXXXXXX
              </a>
            </div>
          </SectionInner>
        </div>

        <div className="h-6" /> {/* safe area for CHAT-LAUNCHER */}
      </div>
    </footer>
  );
}
