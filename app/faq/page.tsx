import type { Metadata } from "next";
import { FaqPageContent } from "@/components/faq/faq-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { absoluteUrl, jsonLd, publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "FAQ | Taxi, Tours, Fleet & Booking Questions",
  description: "Frequently asked questions about Rani Tour's taxi services, bookings, payments, vehicles, corporate travel, tour planning, and support.",
  path: "/faq",
  keywords: ["Rani Tours FAQ", "Jodhpur taxi FAQ", "Rajasthan tour booking questions", "taxi booking help Jodhpur"],
});

const faqItems = [
  ["What services does Rani Tour's provide?","We provide local and outstation taxi services, Rajasthan and all-India travel, airport and railway transfers, corporate travel, tour planning, group transport, and customized travel solutions."],
  ["How can I book a taxi with Rani Tour's?","You can call us, WhatsApp us, send an enquiry through the website, or request a quote. Our team will confirm availability and guide you through the booking."],
  ["What areas do you serve?","We are based in Jodhpur and serve destinations across Rajasthan as well as long-distance routes across India."],
  ["Do you provide local Jodhpur sightseeing taxis?","Yes. We arrange local Jodhpur sightseeing and point-to-point taxi requirements."],
  ["Can I book an outstation taxi from Jodhpur?","Yes. We provide one-way, round-trip, and multi-day outstation taxi services from Jodhpur to Rajasthan and destinations across India."],
  ["Do you offer customized Rajasthan tour packages?","Yes. Tour plans can be customized around your destinations, trip duration, group size, interests, and preferred vehicle."],
  ["Do you provide corporate employee transport?","Yes. We arrange business travel, employee movement, executive transfers, event transport, and other corporate requirements."],
  ["Which vehicles are available in your fleet?","Our regular options include Toyota Etios, Swift Dzire, Innova Crysta, Fortuner, Corolla, Force Tempo Travellers, tourist buses, and additional vehicles on demand."],
] as const;

export default function FaqPage() {
  const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:absoluteUrl("/")},{"@type":"ListItem",position:2,name:"FAQ",item:absoluteUrl("/faq")}]};
  const faq={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqItems.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))};
  return <><Header/><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(faq)}}/><FaqPageContent/></main><Footer/><FloatingActions/></>;
}
