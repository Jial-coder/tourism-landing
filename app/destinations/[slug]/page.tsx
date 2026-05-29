import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { DestinationDetailPageContent } from "@/components/destinations/DestinationDetailPageContent";
import {
  DESTINATION_SLUGS,
  getDestination,
} from "@/lib/data/destinations";
import { PUBLIC_ITINERARY_SLUGS } from "@/lib/data/itineraries";
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
  return DESTINATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  const locale = await getRequestLocale();
  const name = locale === "zh" ? destination.cn : destination.en;
  return {
    title:
      locale === "zh"
        ? `${destination.cn} · 中国目的地路线起点 | pandatravel`
        : `${destination.en} · China route starter | pandatravel`,
    description:
      locale === "zh"
        ? `判断 ${name} 是否适合放进你的中国路线：最佳时节、停留天数、顺路目的地和定制入口。`
        : `Use ${name} as a China route starter: season guidance, stay length, nearby pairings and a custom planning entry.`,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  return (
    <>
      <TopNav />
      <DestinationDetailPageContent
        destination={destination}
        publicItinerarySlugs={PUBLIC_ITINERARY_SLUGS}
      />
      <Footer />
    </>
  );
}
