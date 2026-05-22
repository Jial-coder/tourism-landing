import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { headers, cookies } from "next/headers";
import { detectLocaleFromAcceptLanguage } from "@/lib/i18n/detect";
import { isLocale, DEFAULT_LOCALE } from "@/lib/data/locales";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import en from "@/lib/data/dictionaries/en";
import zh from "@/lib/data/dictionaries/zh";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "./globals.css";

const dictionaries = { en, zh } as const;

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

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get("locale")?.value;
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(headerStore.get("accept-language")) ?? DEFAULT_LOCALE;
  const meta = (dictionaries[locale] as { meta?: { title?: string; description?: string } } | undefined)?.meta;
  return {
    title: meta?.title ?? "pandatravel · Concierge Travel China",
    description:
      meta?.description ??
      "Editorial cinematic concierge for inbound China travel. A real local advisor turns your idea into a route — not a generic package.",
  };
}

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
      translate="no"
    >
      <head>
        {process.env.NODE_ENV !== "production" && (
          <meta name="google" content="notranslate" />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <LocaleProvider initialLocale={initialLocale}>
          <ScrollProgress />
          {children}
        </LocaleProvider>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
