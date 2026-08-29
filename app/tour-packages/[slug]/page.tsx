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
    description: seo?.metaDescription || String(p.shortDescription),
    path: seo?.canonicalUrl || `/tour-packages/${slug}`,
    image: seo?.ogImage?.url || String((p.heroImage as { url?: string } | undefined)?.url || ""),
    keywords: seo?.keywords,
  });
}

export default async function TourPackagePage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();

  // The package itself is required. Fleet and related packages are supporting
  // sections, so a temporary failure in either must not take down the page.
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

  const fleet = fleetResult.status === "fulfilled" ? fleetResult.value : [];
  const related = relatedResult.status === "fulfilled" ? relatedResult.value : [];
  const filteredRelated = related.filter((item) => String(item.slug) !== slug).slice(0, 4);

  const seo = p.seo as { metaDescription?: string } | undefined;
  const description = cleanDescription(seo?.metaDescription || p.shortDescription);
  const url = absoluteUrl(`/tour-packages/${slug}`);
  const image = String((p.heroImage as { url?: string } | undefined)?.url || "");
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: String(p.title),
    description,
    url,
    image: image || undefined,
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
        <TourPackageDetail
          pkg={JSON.parse(JSON.stringify(p))}
          fleet={JSON.parse(JSON.stringify(fleet))}
          related={JSON.parse(JSON.stringify(filteredRelated))}
        />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
