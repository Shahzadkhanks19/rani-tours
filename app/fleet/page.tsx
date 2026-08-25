import type { Metadata } from "next";
import { FleetPageContent } from "@/components/fleet/fleet-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Our Fleet | Rani Tour's Jodhpur",
  description: "Explore Rani Tour's fleet of sedans, Innova, Force Tempo Travellers and tourist buses for safe and comfortable travel from Jodhpur.",
};

export default function FleetPage() {
  return (
    <>
      <Header />
      <main>
        <FleetPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
