import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { InvoicePrint } from "@/components/admin/invoice-print";
import { connectToDatabase } from "@/lib/db";
import { Invoice } from "@/models/Invoice";

type PageProps={params:Promise<{id:string}>};
export const dynamic="force-dynamic";
export default async function PrintInvoicePage({params}:PageProps){const{id}=await params;if(!Types.ObjectId.isValid(id))notFound();await connectToDatabase();const invoice=await Invoice.findById(id).lean();if(!invoice)notFound();return <InvoicePrint invoice={JSON.parse(JSON.stringify(invoice))}/>}
