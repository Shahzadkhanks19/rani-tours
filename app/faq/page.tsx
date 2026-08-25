import type { Metadata } from "next";
import { FaqPageContent } from "@/components/faq/faq-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "FAQ | Rani Tour's Jodhpur",
  description: "Frequently asked questions about Rani Tour's taxi services, bookings, payments, vehicles, corporate travel, tour planning, and support.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <FaqPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
