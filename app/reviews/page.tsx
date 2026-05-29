import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { ReviewsPageContent } from "@/components/reviews/ReviewsPageContent";
import { reviewsPageCopy } from "@/lib/data/reviews-page-copy";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return reviewsPageCopy[locale].meta;
}

export default function ReviewsPage() {
  return (
    <>
      <TopNav variant="always-chromed" />
      <ReviewsPageContent />
      <Footer />
    </>
  );
}
