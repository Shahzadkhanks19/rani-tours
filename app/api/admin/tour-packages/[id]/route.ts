import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, requireAdminApi } from "@/lib/admin-auth";
import { collectPackagePublicIds, destroyCloudinaryImage } from "@/lib/cloudinary";
import { normalizeTourPackageInput, validateTourPackage } from "@/lib/tour-packages";
import { TourPackage } from "@/models/TourPackage";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, context: Context) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid package id." }, { status: 400 });
  await connectToDatabase();
  const item = await TourPackage.findById(id).lean();
  if (!item) return NextResponse.json({ error: "Tour package not found." }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, context: Context) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid package id." }, { status: 400 });
  const input = normalizeTourPackageInput(await request.json());
  const errors = validateTourPackage(input);
  if (errors.length) return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  await connectToDatabase();
  const existing = await TourPackage.findById(id);
  if (!existing) return NextResponse.json({ error: "Tour package not found." }, { status: 404 });
  if (await TourPackage.exists({ slug: input.slug, _id: { $ne: id } })) return NextResponse.json({ error: "A tour package with this slug already exists." }, { status: 409 });

  const oldMedia = collectPackagePublicIds(existing.toObject());
  const newMedia = collectPackagePublicIds(input);
  const publishedAt = input.status === "published" ? (existing.publishedAt || new Date()) : null;
  const item = await TourPackage.findByIdAndUpdate(id, { ...input, publishedAt, updatedBy: admin.id }, { new: true, runValidators: true });

  const removedMedia = [...oldMedia].filter((publicId) => !newMedia.has(publicId));
  await Promise.allSettled(removedMedia.map(destroyCloudinaryImage));
  await logAdminActivity({ adminId: admin.id, adminName: admin.name, action: "Updated tour package", entity: "TourPackage", entityId: id, metadata: { title: input.title, status: input.status } });
  return NextResponse.json({ item });
}

export async function DELETE(_: NextRequest, context: Context) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid package id." }, { status: 400 });
  await connectToDatabase();
  const item = await TourPackage.findByIdAndDelete(id);
  if (!item) return NextResponse.json({ error: "Tour package not found." }, { status: 404 });
  const media = collectPackagePublicIds(item.toObject());
  await Promise.allSettled([...media].map(destroyCloudinaryImage));
  await logAdminActivity({ adminId: admin.id, adminName: admin.name, action: "Deleted tour package", entity: "TourPackage", entityId: id, metadata: { title: item.title } });
  return NextResponse.json({ success: true });
}
