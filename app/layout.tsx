import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "中国本地旅行顾问 · Concierge Travel China",
  description:
    "Editorial cinematic concierge for inbound China travel. A real local advisor turns your idea into a route — not a generic package.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-deep-slate text-soft-ivory">
        {children}
      </body>
    </html>
  );
}
