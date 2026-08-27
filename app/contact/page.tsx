import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { absoluteUrl, jsonLd, publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "Contact Rani Tour's | Taxi & Travel Support in Jodhpur",
  description: "Contact Rani Tour's in Jodhpur for taxi bookings, Rajasthan travel, corporate transport, group travel and customized journey planning.",
  path: "/contact",
  keywords: ["contact Rani Tours", "taxi booking Jodhpur", "Jodhpur travel support", "Rajasthan taxi enquiry"],
});

export default function ContactPage() {
  const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:absoluteUrl("/")},{"@type":"ListItem",position:2,name:"Contact",item:absoluteUrl("/contact")}]};
  return <><Header/><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumb)}}/><ContactPageContent/></main><Footer/><FloatingActions/></>;
}
