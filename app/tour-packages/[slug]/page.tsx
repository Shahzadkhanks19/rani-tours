import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { TourPackageDetail } from "@/components/tour-packages/tour-package-detail";
import { connectToDatabase } from "@/lib/db";
import { FleetVehicle } from "@/models/FleetVehicle";
import { TourPackage } from "@/models/TourPackage";

type Props={params:Promise<{slug:string}>};
export const dynamic="force-dynamic";

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;
  await connectToDatabase();
  const pkg=await TourPackage.findOne({slug,status:"published"}).select({title:1,shortDescription:1,seo:1,heroImage:1}).lean();
  if(!pkg)return{};
  const seo=pkg.seo as {metaTitle?:string;metaDescription?:string;keywords?:string[];canonicalUrl?:string;ogImage?:{url?:string}}|undefined;
  return {title:seo?.metaTitle||`${String(pkg.title)} | Rani Tour's`,description:seo?.metaDescription||String(pkg.shortDescription),keywords:seo?.keywords,alternates:seo?.canonicalUrl?{canonical:seo.canonicalUrl}:undefined,openGraph:{title:seo?.metaTitle||String(pkg.title),description:seo?.metaDescription||String(pkg.shortDescription),images:[seo?.ogImage?.url||String((pkg.heroImage as {url:string}).url)]}};
}

export default async function TourPackagePage({params}:Props){
  const {slug}=await params;
  await connectToDatabase();
  const [pkg,fleet,related]=await Promise.all([
    TourPackage.findOne({slug,status:"published"}).lean(),
    FleetVehicle.find({status:"published"}).sort({featured:-1,sortOrder:1}).limit(8).lean(),
    TourPackage.find({slug:{$ne:slug},status:"published"}).sort({featured:-1,sortOrder:1}).limit(4).select({title:1,slug:1,category:1,location:1,shortDescription:1,durationDays:1,durationNights:1,heroImage:1}).lean(),
  ]);
  if(!pkg)notFound();
  return <><Header/><main><TourPackageDetail pkg={JSON.parse(JSON.stringify(pkg))} fleet={JSON.parse(JSON.stringify(fleet))} related={JSON.parse(JSON.stringify(related))}/></main><Footer/><FloatingActions/></>;
}
