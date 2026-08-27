import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destinations/destination-detail";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { absoluteUrl, jsonLd, publicMetadata } from "@/lib/seo";
import { Destination } from "@/models/Destination";

type P={params:Promise<{slug:string}>};export const dynamic="force-dynamic";
export async function generateMetadata({params}:P):Promise<Metadata>{const{slug}=await params;await connectToDatabase();const d=await Destination.findOne({slug,status:"published"}).lean();if(!d)return{robots:{index:false,follow:false}};const seo=d.seo as{metaTitle?:string;metaDescription?:string;keywords?:string[];canonicalUrl?:string;ogImage?:{url?:string}}|undefined;const image=seo?.ogImage?.url||String((d.heroImage as{url?:string}|undefined)?.url||"");return publicMetadata({title:seo?.metaTitle||String(d.title),description:seo?.metaDescription||String(d.shortDescription),path:seo?.canonicalUrl||`/destinations/${slug}`,image,keywords:seo?.keywords});}
export default async function DestinationPage({params}:P){const{slug}=await params;await connectToDatabase();const d=await Destination.findOne({slug,status:"published"}).lean();if(!d)notFound();const url=absoluteUrl(`/destinations/${slug}`),image=String((d.heroImage as{url?:string}|undefined)?.url||"");const place={"@context":"https://schema.org","@type":"TouristDestination",name:String(d.title),description:String(d.shortDescription||""),url,image:image||undefined,touristType:"Travelers"};const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:absoluteUrl("/")},{"@type":"ListItem",position:2,name:"Destinations",item:absoluteUrl("/destinations")},{"@type":"ListItem",position:3,name:String(d.title),item:url}]};return <><Header/><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(place)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumb)}}/><DestinationDetail destination={JSON.parse(JSON.stringify(d))}/></main><Footer/><FloatingActions/></>}
