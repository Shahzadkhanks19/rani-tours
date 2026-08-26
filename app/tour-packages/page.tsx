import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { TourPackagesListing } from "@/components/tour-packages/tour-packages-listing";
import { connectToDatabase } from "@/lib/db";
import { TourPackage } from "@/models/TourPackage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Tour Packages from Jodhpur | Rajasthan & India | Rani Tour's",
  description: "Explore customizable Rajasthan heritage, desert, family, honeymoon, wildlife, Golden Triangle and all-India tour packages with Rani Tour's.",
};

export default async function TourPackagesPage() {
  await connectToDatabase();
  const packages = await TourPackage.find({ status: "published" }).sort({ sortOrder: 1, title: 1 }).select({ title:1, slug:1, category:1, location:1, shortDescription:1, heroImage:1, durationDays:1, durationNights:1, customizable:1, featured:1 }).lean();
  return <><Header/><main><TourPackagesListing packages={JSON.parse(JSON.stringify(packages))}/></main><Footer/><FloatingActions/></>;
}
