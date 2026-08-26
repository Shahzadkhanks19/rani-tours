import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { TaxiServiceDetail } from "@/components/taxi-services/taxi-service-detail";
import { connectToDatabase } from "@/lib/db";
import { FleetVehicle } from "@/models/FleetVehicle";
import { TaxiService } from "@/models/TaxiService";

type Props={params:Promise<{slug:string}>};
export const dynamic="force-dynamic";
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;await connectToDatabase();const service=await TaxiService.findOne({slug,status:"published"}).select({title:1,shortDescription:1,seo:1,heroImage:1}).lean();if(!service)return{};const seo=service.seo as {metaTitle?:string;metaDescription?:string;keywords?:string[];canonicalUrl?:string;ogImage?:{url?:string}}|undefined;return{title:seo?.metaTitle||`${String(service.title)} | Rani Tour's`,description:seo?.metaDescription||String(service.shortDescription),keywords:seo?.keywords,alternates:seo?.canonicalUrl?{canonical:seo.canonicalUrl}:undefined,openGraph:{title:seo?.metaTitle||String(service.title),description:seo?.metaDescription||String(service.shortDescription),images:[seo?.ogImage?.url||String((service.heroImage as {url:string}).url)]}}}
export default async function TaxiServicePage({params}:Props){const{slug}=await params;await connectToDatabase();const[service,fleet]=await Promise.all([TaxiService.findOne({slug,status:"published"}).lean(),FleetVehicle.find({status:"published"}).sort({sortOrder:1,featured:-1}).limit(8).lean()]);if(!service)notFound();return <><Header/><main><TaxiServiceDetail service={JSON.parse(JSON.stringify(service))} fleet={JSON.parse(JSON.stringify(fleet))}/></main><Footer/><FloatingActions/></>}
