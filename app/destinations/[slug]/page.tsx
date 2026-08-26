import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destinations/destination-detail";
import { connectToDatabase } from "@/lib/db";
import { Destination } from "@/models/Destination";
type P={params:Promise<{slug:string}>};
export async function generateMetadata({params}:P):Promise<Metadata>{const{slug}=await params;await connectToDatabase();const d=await Destination.findOne({slug,status:"published"}).lean();if(!d)return{};return{title:d.seo?.metaTitle||`${d.title} | Rani Tour's`,description:d.seo?.metaDescription||d.shortDescription};}
export default async function DestinationPage({params}:P){const{slug}=await params;await connectToDatabase();const d=await Destination.findOne({slug,status:"published"}).lean();if(!d)notFound();return <DestinationDetail destination={JSON.parse(JSON.stringify(d))}/>;}