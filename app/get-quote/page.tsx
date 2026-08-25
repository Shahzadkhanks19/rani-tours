import type { Metadata } from "next";
import { GetQuotePageContent } from "@/components/get-quote/get-quote-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Get a Quote | Rani Tour's Jodhpur",
  description: "Request a travel quote from Rani Tour's in Jodhpur for local taxis, Rajasthan tours, outstation travel, corporate transport, Force Travellers and buses.",
};

export default function GetQuotePage() {
  return (
    <>
      <Header />
      <main>
        <GetQuotePageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
