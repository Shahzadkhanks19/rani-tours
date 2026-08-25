import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "About Rani Tours | Trusted Taxi & Tour Company in Jodhpur",
  description: "Learn about Rani Tours, a Jodhpur-based taxi and travel company providing reliable Rajasthan tours, outstation taxis and all-India travel services.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
