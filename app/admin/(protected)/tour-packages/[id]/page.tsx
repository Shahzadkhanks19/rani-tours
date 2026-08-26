import { notFound } from "next/navigation";
import { Types } from "mongoose";
import { TourPackageForm } from "@/components/admin/tour-package-form";
import { connectToDatabase } from "@/lib/db";
import { TourPackage } from "@/models/TourPackage";

type PageProps = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function EditTourPackagePage({ params }: PageProps) {
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) notFound();
  await connectToDatabase();
  const item = await TourPackage.findById(id).lean();
  if (!item) notFound();
  const initialData = JSON.parse(JSON.stringify(item));
  return <TourPackageForm initialData={initialData} />;
}
