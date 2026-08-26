import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { InvoiceForm } from "@/components/admin/invoice-form";
import { connectToDatabase } from "@/lib/db";
import { Invoice } from "@/models/Invoice";

type PageProps={params:Promise<{id:string}>};
export const dynamic="force-dynamic";
export default async function EditInvoicePage({params}:PageProps){const{id}=await params;if(!Types.ObjectId.isValid(id))notFound();await connectToDatabase();const item=await Invoice.findById(id).lean();if(!item)notFound();return <InvoiceForm initialData={JSON.parse(JSON.stringify(item))}/>}
