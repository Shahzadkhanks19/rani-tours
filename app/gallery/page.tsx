import type { Metadata } from "next";
import { GalleryPageContent, type PublicGalleryItem } from "@/components/gallery/gallery-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { absoluteUrl, jsonLd, publicMetadata } from "@/lib/seo";
import { GalleryItem } from "@/models/GalleryItem";

export const dynamic="force-dynamic";
export const metadata: Metadata = publicMetadata({
  title: "Travel Gallery | Rajasthan Destinations & Fleet",
  description: "Explore memorable destinations, travel moments, vehicles and journeys with Rani Tour's across Rajasthan and India.",
  path: "/gallery",
  keywords: ["Rajasthan travel gallery", "Jodhpur tourist places", "Rani Tours fleet", "Rajasthan tourism photos"],
});

export default async function GalleryPage() {
  await connectToDatabase();
  const records=await GalleryItem.find({status:"published"}).sort({featured:-1,sortOrder:1,publishedAt:-1,updatedAt:-1}).limit(200).lean();
  const items:PublicGalleryItem[]=records.map((item)=>({id:String(item._id),title:item.title||item.image?.alt||"Rani Tour's Gallery",src:item.image?.url||"",alt:item.image?.alt||item.title||"Rani Tour's travel gallery",category:item.category,caption:item.caption||"",location:item.location||"",featured:Boolean(item.featured)})).filter((item)=>Boolean(item.src));
  const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:absoluteUrl("/")},{"@type":"ListItem",position:2,name:"Gallery",item:absoluteUrl("/gallery")}]};
  const list={"@context":"https://schema.org","@type":"ItemList",name:"Rani Tour's Travel Gallery",numberOfItems:items.length,itemListElement:items.slice(0,100).map((item,index)=>({"@type":"ListItem",position:index+1,item:{"@type":"ImageObject",name:item.title,contentUrl:item.src,caption:item.caption||item.alt,description:item.alt}}))};
  return <><Header/><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(list)}}/><GalleryPageContent items={items}/></main><Footer/><FloatingActions/></>;
}
