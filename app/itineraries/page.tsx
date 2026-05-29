import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { ItinerariesPageContent } from "@/components/itineraries/ItinerariesPageContent";
import { itineraryPageCopy } from "@/lib/data/itinerary-page-copy";
import { listItineraries } from "@/lib/data/itineraries";
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
  return itineraryPageCopy[locale].meta;
}

export default function ItinerariesPage() {
  const items = listItineraries();

  return (
    <>
      <TopNav variant="always-chromed" />
      <ItinerariesPageContent items={items} />
      <Footer />
    </>
  );
}
