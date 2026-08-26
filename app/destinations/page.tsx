import type { Metadata } from "next";
import { DestinationsListing } from "@/components/destinations/destinations-listing";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { Destination } from "@/models/Destination";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Destinations | Rani Tour's",
  description: "Explore Rajasthan and India destinations, regions and travel themes with Rani Tours.",
};

export default async function DestinationsPage() {
  await connectToDatabase();
  const destinations = await Destination.find({ status: "published" }).sort({ sortOrder: 1, title: 1 }).lean();
  return <><Header/><main><DestinationsListing destinations={JSON.parse(JSON.stringify(destinations))}/></main><Footer/><FloatingActions/></>;
}
