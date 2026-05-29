import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { ThemePageContent } from "@/components/themes/ThemePageContent";
import {
  THEME_PAGE_SLUGS,
  isThemePageSlug,
  themePageCopy,
} from "@/lib/data/theme-page-copy";
import { DEFAULT_LOCALE, isLocale } from "@/lib/data/locales";
import { detectLocaleFromAcceptLanguage } from "@/lib/i18n/detect";

async function getRequestLocale() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get("locale")?.value;
  return isLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(headerStore.get("accept-language")) ?? DEFAULT_LOCALE;
}

export function generateStaticParams() {
  return THEME_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isThemePageSlug(slug)) return {};
  const locale = await getRequestLocale();
  return themePageCopy[locale].themes[slug].meta;
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isThemePageSlug(slug)) {
    notFound();
  }

  return (
    <>
      <TopNav variant="always-chromed" />
      <ThemePageContent slug={slug} />
      <Footer />
    </>
  );
}
