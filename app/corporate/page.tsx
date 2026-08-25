import type { Metadata } from "next";
import { CorporatePageContent } from "@/components/corporate/corporate-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Corporate Travel Solutions | Rani Tour's Jodhpur",
  description:
    "Corporate travel solutions in Jodhpur for airport transfers, employee transport, executive travel, meetings, events and outstation business journeys.",
};

export default function CorporatePage() {
  return (
    <>
      <Header />
      <main>
        <CorporatePageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
