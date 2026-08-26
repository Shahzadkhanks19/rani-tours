import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, requireAdminApi } from "@/lib/admin-auth";
import { collectCmsPublicIds, destroyCloudinaryImage } from "@/lib/cloudinary";
import { normalizeGalleryItemInput, validateGalleryItem } from "@/lib/gallery";
import { GalleryItem } from "@/models/GalleryItem";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, context: Context) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid gallery item id." }, { status: 400 });
  await connectToDatabase();
  const item = await GalleryItem.findById(id).lean();
  if (!item) return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, context: Context) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid gallery item id." }, { status: 400 });
  const input = normalizeGalleryItemInput(await request.json());
  const errors = validateGalleryItem(input);
  if (errors.length) return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  await connectToDatabase();
  const existing = await GalleryItem.findById(id);
  if (!existing) return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
  const oldIds = collectCmsPublicIds(existing.toObject(), "rani-tours/gallery/");
  const newIds = collectCmsPublicIds(input, "rani-tours/gallery/");
  const item = await GalleryItem.findByIdAndUpdate(id, { ...input, publishedAt: input.status === "published" ? (existing.publishedAt || new Date()) : null, updatedBy: admin.id }, { new: true, runValidators: true });
  await Promise.all([...oldIds].filter((publicId) => !newIds.has(publicId)).map(destroyCloudinaryImage));
  await logAdminActivity({ adminId: admin.id, adminName: admin.name, action: "Updated gallery item", entity: "GalleryItem", entityId: id, metadata: { category: input.category, title: input.title } });
  return NextResponse.json({ item });
}

export async function DELETE(_: NextRequest, context: Context) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid gallery item id." }, { status: 400 });
  await connectToDatabase();
  const item = await GalleryItem.findByIdAndDelete(id);
  if (!item) return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
  await Promise.all([...collectCmsPublicIds(item.toObject(), "rani-tours/gallery/")].map(destroyCloudinaryImage));
  await logAdminActivity({ adminId: admin.id, adminName: admin.name, action: "Deleted gallery item", entity: "GalleryItem", entityId: id, metadata: { category: item.category, title: item.title } });
  return NextResponse.json({ success: true });
}
