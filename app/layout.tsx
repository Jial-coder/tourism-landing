import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { detectLocaleFromAcceptLanguage } from "@/lib/i18n/detect";
import { isLocale, DEFAULT_LOCALE } from "@/lib/data/locales";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "中国本地旅行顾问 · Concierge Travel China",
  description:
    "Editorial cinematic concierge for inbound China travel. A real local advisor turns your idea into a route — not a generic package.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get("locale")?.value;
  const initialLocale = isLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(headerStore.get("accept-language")) ?? DEFAULT_LOCALE;
  return (
    <html lang={initialLocale} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-deep-slate text-soft-ivory">
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
