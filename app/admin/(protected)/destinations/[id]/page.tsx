import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { DestinationForm } from "@/components/admin/destination-form";
import { connectToDatabase } from "@/lib/db";
import { Destination } from "@/models/Destination";

type PageProps={params:Promise<{id:string}>};
export const dynamic="force-dynamic";
export default async function EditDestinationPage({params}:PageProps){const{id}=await params;if(!Types.ObjectId.isValid(id))notFound();await connectToDatabase();const item=await Destination.findById(id).lean();if(!item)notFound();return <DestinationForm initialData={JSON.parse(JSON.stringify(item))}/>}
