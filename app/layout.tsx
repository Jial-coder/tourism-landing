import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { headers, cookies } from "next/headers";
import { detectLocaleFromAcceptLanguage } from "@/lib/i18n/detect";
import { isLocale, DEFAULT_LOCALE } from "@/lib/data/locales";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CursorAura } from "@/components/motion/CursorAura";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

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
    <html
      lang={initialLocale}
      className={`h-full antialiased ${newsreader.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <LocaleProvider initialLocale={initialLocale}>
          <ScrollProgress />
          <CursorAura />
          {children}
        </LocaleProvider>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
