import type { Metadata } from "next";
import { TaxiServicesPageContent } from "@/components/taxi-services/taxi-services-page";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";

export const metadata: Metadata = {
  title: "All India Taxi Services from Jodhpur | Rani Tours",
  description: "Book reliable all India taxi services from Jodhpur with Rani Tours. Comfortable vehicles, experienced drivers, transparent pricing and 24/7 support.",
};

export default function TaxiServicesPage() {
  return (
    <>
      <Header />
      <main>
        <TaxiServicesPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
