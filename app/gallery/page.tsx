import type { Metadata } from "next";
import { GalleryPageContent, type PublicGalleryItem } from "@/components/gallery/gallery-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/models/GalleryItem";

export const dynamic="force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | Rani Tour's Jodhpur",
  description:
    "Explore memorable destinations, travel moments, vehicles and journeys with Rani Tour's across Rajasthan and India.",
};

export default async function GalleryPage() {
  await connectToDatabase();
  const records=await GalleryItem.find({status:"published"}).sort({featured:-1,sortOrder:1,publishedAt:-1,updatedAt:-1}).limit(200).lean();
  const items:PublicGalleryItem[]=records.map((item)=>({
    id:String(item._id),
    title:item.title||item.image?.alt||"Rani Tour's Gallery",
    src:item.image?.url||"",
    alt:item.image?.alt||item.title||"Rani Tour's travel gallery",
    category:item.category,
    caption:item.caption||"",
    location:item.location||"",
    featured:Boolean(item.featured),
  })).filter((item)=>Boolean(item.src));

  return (
    <>
      <Header />
      <main>
        <GalleryPageContent items={items} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
