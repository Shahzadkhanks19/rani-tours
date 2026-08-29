import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { TourPackageDetail } from "@/components/tour-packages/tour-package-detail";
import { connectToDatabase } from "@/lib/db";
import { absoluteUrl, cleanDescription, jsonLd, publicMetadata } from "@/lib/seo";
import { FleetVehicle } from "@/models/FleetVehicle";
import { TourPackage } from "@/models/TourPackage";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

const FALLBACK_TOUR_IMAGE = {
  url: "https://images.pexels.com/photos/33726478/pexels-photo-33726478.jpeg?auto=compress&cs=tinysrgb&w=1600",
  alt: "Rajasthan tour landscape",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const p = await TourPackage.findOne({ slug, status: "published" })
    .select({ title: 1, shortDescription: 1, seo: 1, heroImage: 1 })
    .lean();

  if (!p) return { robots: { index: false, follow: false } };

  const seo = p.seo as
    | {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
        canonicalUrl?: string;
        ogImage?: { url?: string };
      }
    | undefined;

  return publicMetadata({
    title: seo?.metaTitle || String(p.title),
    description: seo?.metaDescription || String(p.shortDescription || "Explore this private tour package with Rani Tours."),
    path: seo?.canonicalUrl || `/tour-packages/${slug}`,
    image: seo?.ogImage?.url || String((p.heroImage as { url?: string } | undefined)?.url || FALLBACK_TOUR_IMAGE.url),
    keywords: seo?.keywords,
  });
}

export default async function TourPackagePage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();

  const p = await TourPackage.findOne({ slug, status: "published" }).lean();
  if (!p) notFound();

  const [fleetResult, relatedResult] = await Promise.allSettled([
    FleetVehicle.find({ status: "published" })
      .sort({ featured: -1, sortOrder: 1 })
      .limit(8)
      .lean(),
    TourPackage.find({ status: "published" })
      .sort({ featured: -1, sortOrder: 1 })
      .limit(8)
      .select({
        title: 1,
        slug: 1,
        category: 1,
        location: 1,
        shortDescription: 1,
        durationDays: 1,
        durationNights: 1,
        heroImage: 1,
      })
      .lean(),
  ]);

  const rawPackage = JSON.parse(JSON.stringify(p)) as Record<string, unknown>;
  const heroImage = rawPackage.heroImage as { url?: string; alt?: string } | undefined;
  if (!heroImage?.url) rawPackage.heroImage = FALLBACK_TOUR_IMAGE;
  if (!Array.isArray(rawPackage.gallery)) rawPackage.gallery = [];
  if (!Array.isArray(rawPackage.itinerary)) rawPackage.itinerary = [];
  if (!Array.isArray(rawPackage.highlights)) rawPackage.highlights = [];
  if (!Array.isArray(rawPackage.inclusions)) rawPackage.inclusions = [];
  if (!Array.isArray(rawPackage.exclusions)) rawPackage.exclusions = [];
  if (!Array.isArray(rawPackage.faq)) rawPackage.faq = [];

  const fleet = fleetResult.status === "fulfilled" ? fleetResult.value : [];
  const safeFleet = JSON.parse(JSON.stringify(fleet)).filter(
    (item: { _id?: string; name?: string }) => Boolean(item?._id && item?.name),
  );

  const related = relatedResult.status === "fulfilled" ? relatedResult.value : [];
  const safeRelated = JSON.parse(JSON.stringify(related)).filter(
    (item: { _id?: string; slug?: string; title?: string; heroImage?: { url?: string } }) =>
      Boolean(item?._id && item?.slug && item?.title && item?.heroImage?.url && item.slug !== slug),
  ).slice(0, 4);

  const seo = p.seo as { metaDescription?: string } | undefined;
  const description = cleanDescription(
    seo?.metaDescription || String(p.shortDescription || "Explore this private tour package with Rani Tours."),
  );
  const url = absoluteUrl(`/tour-packages/${slug}`);
  const image = String((rawPackage.heroImage as { url?: string } | undefined)?.url || FALLBACK_TOUR_IMAGE.url);
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: String(p.title),
    description,
    url,
    image,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    touristType: "Travelers",
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Tour Packages", item: absoluteUrl("/tour-packages") },
      { "@type": "ListItem", position: 3, name: String(p.title), item: url },
    ],
  };

  return (
    <>
      <meta name="description" content={description} />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
        <TourPackageDetail pkg={rawPackage as never} fleet={safeFleet} related={safeRelated} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
