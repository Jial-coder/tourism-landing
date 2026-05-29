import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { DestinationsListPageContent } from "@/components/destinations/DestinationsListPageContent";
import { DESTINATIONS, DESTINATION_SLUGS } from "@/lib/data/destinations";
import { destinationPageCopy } from "@/lib/data/destination-page-copy";
import { DEFAULT_LOCALE, isLocale } from "@/lib/data/locales";
import { detectLocaleFromAcceptLanguage } from "@/lib/i18n/detect";
import { cookies, headers } from "next/headers";
import type { Metadata } from "next";

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
  return destinationPageCopy[locale].meta;
}

export default function DestinationsListPage() {
  const items = DESTINATION_SLUGS.map((slug) => DESTINATIONS[slug]);

  return (
    <>
      <TopNav variant="always-chromed" />
      <DestinationsListPageContent items={items} />
      <Footer />
    </>
  );
}
