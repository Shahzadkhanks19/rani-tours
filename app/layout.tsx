import type { Metadata } from "next";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { PublicEnquiryBridge } from "@/components/enquiries/public-enquiry-bridge";
import { SitePreloader } from "@/components/system/site-preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rani Tour's | Taxi & Rajasthan Tour Packages",
    template: "%s | Rani Tour's",
  },
  description:
    "Reliable taxi services, Rajasthan tours and custom travel experiences from Jodhpur with Rani Tour's.",
  icons: {
    icon: "/rani-tours-icon.svg",
    shortcut: "/rani-tours-icon.svg",
    apple: "/rani-tours-icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="m-0 bg-[#fffdf7] font-sans text-[#143124] antialiased selection:bg-[#d6a63a] selection:text-[#17341f]">
        <SitePreloader />
        <PublicEnquiryBridge />
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
