import type { Metadata } from "next";
import { DestinationsListing } from "@/components/destinations/destinations-listing";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { absoluteUrl, jsonLd, publicMetadata } from "@/lib/seo";
import { Destination } from "@/models/Destination";

// Destination content is CMS-driven but does not need a fresh database read on
// every public request. A short ISR window reduces TTFB while keeping edits
// visible quickly after they are published.
export const revalidate = 300;

export const metadata: Metadata = publicMetadata({
  title: "Destinations in Rajasthan & India",
  description:
    "Explore Rajasthan and India destinations, regions and travel themes with Rani Tour's from Jodhpur.",
  path: "/destinations",
  keywords: [
    "Rajasthan destinations",
    "places to visit Rajasthan",
    "Jodhpur travel",
    "India tourist destinations",
  ],
});

export default async function DestinationsPage() {
  await connectToDatabase();
  const destinations = await Destination.find({ status: "published" })
    .sort({ sortOrder: 1, title: 1 })
    .lean();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: absoluteUrl("/destinations"),
      },
    ],
  };

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rani Tour's Travel Destinations",
    numberOfItems: destinations.length,
    itemListElement: destinations.map((destination, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: String(destination.title),
      url: absoluteUrl(`/destinations/${destination.slug}`),
    })),
  };

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(list) }}
        />
        <DestinationsListing destinations={JSON.parse(JSON.stringify(destinations))} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
