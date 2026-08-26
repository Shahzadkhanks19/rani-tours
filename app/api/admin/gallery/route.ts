import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, requireAdminApi } from "@/lib/admin-auth";
import { normalizeGalleryItemInput, validateGalleryItem } from "@/lib/gallery";
import { GalleryItem } from "@/models/GalleryItem";

export async function GET(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const sp = request.nextUrl.searchParams;
  const search = (sp.get("search") || "").trim();
  const status = sp.get("status") || "all";
  const category = sp.get("category") || "all";
  const query: Record<string, unknown> = {};
  if (search) query.$text = { $search: search };
  if (status === "draft" || status === "published") query.status = status;
  if (category !== "all") query.category = category;
  const items = await GalleryItem.find(query).sort({ sortOrder: 1, updatedAt: -1 }).limit(200).lean();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = normalizeGalleryItemInput(await request.json());
  const errors = validateGalleryItem(input);
  if (errors.length) return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  await connectToDatabase();
  const item = await GalleryItem.create({ ...input, publishedAt: input.status === "published" ? new Date() : null, createdBy: admin.id, updatedBy: admin.id });
  await logAdminActivity({ adminId: admin.id, adminName: admin.name, action: "Created gallery item", entity: "GalleryItem", entityId: item._id.toString(), metadata: { category: item.category, title: item.title } });
  return NextResponse.json({ item }, { status: 201 });
}
