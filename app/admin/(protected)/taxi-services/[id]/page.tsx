import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { TaxiServiceForm } from "@/components/admin/taxi-service-form";
import { connectToDatabase } from "@/lib/db";
import { TaxiService } from "@/models/TaxiService";

type PageProps={params:Promise<{id:string}>};
export const dynamic="force-dynamic";

export default async function EditTaxiServicePage({params}:PageProps){
  const {id}=await params;
  if(!Types.ObjectId.isValid(id))notFound();
  await connectToDatabase();
  const item=await TaxiService.findById(id).lean();
  if(!item)notFound();
  const initialData=JSON.parse(JSON.stringify(item));
  return <TaxiServiceForm initialData={initialData}/>;
}
