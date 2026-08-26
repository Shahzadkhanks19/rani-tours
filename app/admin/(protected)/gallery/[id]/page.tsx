import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { GalleryForm } from "@/components/admin/gallery-form";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/models/GalleryItem";

type PageProps={params:Promise<{id:string}>};
export const dynamic="force-dynamic";
export default async function EditGalleryItemPage({params}:PageProps){const{id}=await params;if(!Types.ObjectId.isValid(id))notFound();await connectToDatabase();const item=await GalleryItem.findById(id).lean();if(!item)notFound();return <GalleryForm initialData={JSON.parse(JSON.stringify(item))}/>}
