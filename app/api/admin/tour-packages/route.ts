import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, requireAdminApi } from "@/lib/admin-auth";
import { normalizeTourPackageInput, validateTourPackage } from "@/lib/tour-packages";
import { TourPackage } from "@/models/TourPackage";

export async function GET(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(5, Number(searchParams.get("limit") || 12)));
  const search = (searchParams.get("search") || "").trim();
  const status = searchParams.get("status") || "all";
  const category = (searchParams.get("category") || "").trim();
  const query: Record<string, unknown> = {};
  if (search) query.$text = { $search: search };
  if (status === "draft" || status === "published") query.status = status;
  if (category) query.category = category;
  const [items, total, categories] = await Promise.all([
    TourPackage.find(query).sort({ sortOrder: 1, updatedAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    TourPackage.countDocuments(query),
    TourPackage.distinct("category"),
  ]);
  return NextResponse.json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)), categories: categories.sort() });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = normalizeTourPackageInput(await request.json());
  const errors = validateTourPackage(input);
  if (errors.length) return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  await connectToDatabase();
  if (await TourPackage.exists({ slug: input.slug })) return NextResponse.json({ error: "A tour package with this slug already exists." }, { status: 409 });
  const item = await TourPackage.create({ ...input, publishedAt: input.status === "published" ? new Date() : null, createdBy: admin.id, updatedBy: admin.id });
  await logAdminActivity({ adminId: admin.id, adminName: admin.name, action: "Created tour package", entity: "TourPackage", entityId: item._id.toString(), metadata: { title: item.title, status: item.status } });
  return NextResponse.json({ item }, { status: 201 });
}
