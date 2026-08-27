import type { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db";
import { absoluteUrl } from "@/lib/seo";
import { Destination } from "@/models/Destination";
import { TaxiService } from "@/models/TaxiService";
import { TourPackage } from "@/models/TourPackage";

export const dynamic="force-dynamic";
const staticRoutes=["/","/about","/taxi-services","/tour-packages","/destinations","/fleet","/gallery","/corporate","/contact","/get-quote","/faq","/privacy-policy","/terms-and-conditions","/cancellation-policy"];
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const now=new Date();const entries:MetadataRoute.Sitemap=staticRoutes.map((path,index)=>({url:absoluteUrl(path),lastModified:now,changeFrequency:index===0?"daily":"weekly",priority:index===0?1:path==="/taxi-services"||path==="/tour-packages"||path==="/destinations"?0.9:0.7}));
 try{await connectToDatabase();const[taxis,tours,destinations]=await Promise.all([TaxiService.find({status:"published"}).select({slug:1,updatedAt:1}).lean(),TourPackage.find({status:"published"}).select({slug:1,updatedAt:1}).lean(),Destination.find({status:"published"}).select({slug:1,updatedAt:1}).lean()]);
 for(const item of taxis)entries.push({url:absoluteUrl(`/taxi-services/${item.slug}`),lastModified:item.updatedAt||now,changeFrequency:"weekly",priority:.8});for(const item of tours)entries.push({url:absoluteUrl(`/tour-packages/${item.slug}`),lastModified:item.updatedAt||now,changeFrequency:"weekly",priority:.8});for(const item of destinations)entries.push({url:absoluteUrl(`/destinations/${item.slug}`),lastModified:item.updatedAt||now,changeFrequency:"weekly",priority:.8});
 }catch{/* Static URLs remain discoverable if the database is temporarily unavailable. */}
 return entries;
}
