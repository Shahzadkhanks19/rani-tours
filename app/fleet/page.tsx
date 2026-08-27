import type { Metadata } from "next";
import { FleetPageContent } from "@/components/fleet/fleet-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { absoluteUrl, jsonLd, publicMetadata } from "@/lib/seo";
import { FleetVehicle } from "@/models/FleetVehicle";

export const dynamic = "force-dynamic";
export const metadata: Metadata = publicMetadata({
  title: "Our Fleet | Cars, Travellers & Buses",
  description: "Explore Rani Tour's fleet of sedans, SUVs, Tempo Travellers and tourist buses for safe and comfortable travel from Jodhpur.",
  path: "/fleet",
  keywords: ["car rental Jodhpur", "Tempo Traveller Jodhpur", "tourist bus Jodhpur", "taxi fleet Jodhpur"],
});

export default async function FleetPage() {
  await connectToDatabase();
  const rows = await FleetVehicle.find({ status: "published" }).sort({ sortOrder: 1, name: 1 }).lean();
  const vehicles = JSON.parse(JSON.stringify(rows));
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:absoluteUrl("/")},{"@type":"ListItem",position:2,name:"Fleet",item:absoluteUrl("/fleet")}]};
  const list = {"@context":"https://schema.org","@type":"ItemList",name:"Rani Tour's Fleet",numberOfItems:rows.length,itemListElement:rows.map((v,i)=>({"@type":"ListItem",position:i+1,item:{"@type":"Vehicle",name:String(v.name),image:(v.image as {url?:string}|undefined)?.url||undefined,url:absoluteUrl("/fleet")}}))};
  return <><Header/><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(list)}}/><FleetPageContent vehicles={vehicles}/></main><Footer/><FloatingActions/></>;
}
