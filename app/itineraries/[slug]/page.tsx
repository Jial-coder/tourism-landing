import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PUBLIC_ITINERARY_SLUGS,
  getItinerary,
} from "@/lib/data/itineraries";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return PUBLIC_ITINERARY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = getItinerary(slug);

  if (!itinerary) {
    return {
      title: "Itinerary unavailable | pandatravel",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${itinerary.title.en} | pandatravel`,
    description:
      "This itinerary direction is not public until its product data, pricing, inclusions, support scope and supplier claims have been reviewed.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const itinerary = getItinerary(slug);

  if (!itinerary) notFound();

  // Detail rendering stays closed while every source itinerary is marked hidden.
  // Re-enable only after product data, pricing and support promises are verified.
  notFound();
}
