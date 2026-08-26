import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { FleetForm } from "@/components/admin/fleet-form";
import { connectToDatabase } from "@/lib/db";
import { FleetVehicle } from "@/models/FleetVehicle";

type PageProps={params:Promise<{id:string}>};
export const dynamic="force-dynamic";
export default async function EditFleetVehiclePage({params}:PageProps){const{id}=await params;if(!Types.ObjectId.isValid(id))notFound();await connectToDatabase();const item=await FleetVehicle.findById(id).lean();if(!item)notFound();return <FleetForm initialData={JSON.parse(JSON.stringify(item))}/>}
