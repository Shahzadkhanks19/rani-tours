import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destinations/destination-detail";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { Destination } from "@/models/Destination";

type P = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const destination = await Destination.findOne({ slug, status: "published" }).lean();
  if (!destination) return {};
  return {
    title: destination.seo?.metaTitle || `${destination.title} | Rani Tour's`,
    description: destination.seo?.metaDescription || destination.shortDescription,
  };
}

export default async function DestinationPage({ params }: P) {
  const { slug } = await params;
  await connectToDatabase();
  const destination = await Destination.findOne({ slug, status: "published" }).lean();
  if (!destination) notFound();
  return <><Header/><main><DestinationDetail destination={JSON.parse(JSON.stringify(destination))}/></main><Footer/><FloatingActions/></>;
}
