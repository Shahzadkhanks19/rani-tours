import type { Metadata } from "next";
import { CorporatePageContent } from "@/components/corporate/corporate-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { absoluteUrl, jsonLd, publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "Corporate Travel Solutions in Jodhpur",
  description: "Corporate travel solutions in Jodhpur for airport transfers, employee transport, executive travel, meetings, events and outstation business journeys.",
  path: "/corporate",
  keywords: ["corporate travel Jodhpur", "employee transport Jodhpur", "corporate taxi Jodhpur", "business travel Rajasthan"],
});

export default function CorporatePage() {
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:absoluteUrl("/")},{"@type":"ListItem",position:2,name:"Corporate Travel",item:absoluteUrl("/corporate")}]};
  const service = {"@context":"https://schema.org","@type":"Service",name:"Corporate Travel Solutions",description:"Corporate transport for employee movement, executive transfers, meetings, events, airport transfers and outstation business travel.",url:absoluteUrl("/corporate"),provider:{"@id":`${absoluteUrl("/")}#organization`},areaServed:{"@type":"Country",name:"India"},serviceType:"Corporate travel and transport"};
  return <><Header/><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(service)}}/><CorporatePageContent/></main><Footer/><FloatingActions/></>;
}
