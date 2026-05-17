import Link from "next/link";
import type { ReactNode } from "react";

const tabs = [
  { href: "/client/prototype", label: "原型" },
  { href: "/client/workflow", label: "流程" },
  { href: "/client/progress", label: "进度" },
];

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#1A1A1A]">
      <header className="border-b border-[#E8E0D5] bg-[#F8F4EC]/95 backdrop-blur sticky top-0 z-10">
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-[#1F4E5C]">Tourism Landing</span>
            <span className="text-xs text-[#1A1A1A]/60">客户预览 · Day 1</span>
          </div>
          <ul className="flex gap-6 text-sm">
            {tabs.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="text-[#1F4E5C] hover:text-[#C13829] transition-colors"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-[1280px] px-6 py-12">{children}</main>
      <footer className="border-t border-[#E8E0D5] py-6 text-center text-xs text-[#1A1A1A]/50">
        Cognitive Cockpit · Design Stack v9 · 2026-05-18
      </footer>
    </div>
  );
}
