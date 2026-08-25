import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Contact Rani Tour's | Taxi & Travel Support in Jodhpur",
  description: "Contact Rani Tour's in Jodhpur for taxi bookings, Rajasthan travel, corporate transport, group travel and customized journey planning.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
