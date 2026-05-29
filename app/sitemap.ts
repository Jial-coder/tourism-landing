import type { MetadataRoute } from "next";
import { DESTINATION_SLUGS } from "@/lib/data/destinations";
import { PUBLIC_ITINERARY_SLUGS } from "@/lib/data/itineraries";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_PUBLIC_PATHS = [
  "/",
  "/plan",
  "/visa-free",
  "/destinations",
  "/itineraries",
  "/reviews",
  "/about",
  "/themes/family",
  "/themes/nature",
  "/themes/business-add-on",
  "/themes/heritage",
] as const;

function entry(siteUrl: URL, path: string): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const destinationPaths = DESTINATION_SLUGS.map((slug) => `/destinations/${slug}`);
  const itineraryPaths = PUBLIC_ITINERARY_SLUGS.map((slug) => `/itineraries/${slug}`);

  return [...STATIC_PUBLIC_PATHS, ...destinationPaths, ...itineraryPaths].map((path) =>
    entry(siteUrl, path),
  );
}
