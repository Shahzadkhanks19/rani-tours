import type { Metadata } from "next";
import { GalleryPageContent } from "@/components/gallery/gallery-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Gallery | Rani Tour's Jodhpur",
  description:
    "Explore memorable destinations, travel moments, vehicles and journeys with Rani Tour's across Rajasthan and India.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <GalleryPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
