import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { EnquiryDetail } from "@/components/admin/enquiry-detail";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
type PageProps={params:Promise<{id:string}>};
export const dynamic="force-dynamic";
export default async function EnquiryPage({params}:PageProps){const{id}=await params;if(!Types.ObjectId.isValid(id))notFound();await connectToDatabase();const item=await Enquiry.findById(id).lean();if(!item)notFound();return <EnquiryDetail initialData={JSON.parse(JSON.stringify(item))}/>;}
