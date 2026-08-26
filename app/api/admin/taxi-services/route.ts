import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, requireAdminApi } from "@/lib/admin-auth";
import { normalizeTaxiServiceInput, validateTaxiService } from "@/lib/taxi-services";
import { TaxiService } from "@/models/TaxiService";

export async function GET(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(5, Number(searchParams.get("limit") || 20)));
  const search = (searchParams.get("search") || "").trim();
  const status = searchParams.get("status") || "all";
  const serviceType = (searchParams.get("serviceType") || "").trim();
  const query: Record<string, unknown> = {};
  if (search) query.$text = { $search: search };
  if (status === "draft" || status === "published") query.status = status;
  if (serviceType) query.serviceType = serviceType;
  const [items,total,serviceTypes] = await Promise.all([
    TaxiService.find(query).sort({ sortOrder: 1, updatedAt: -1 }).skip((page-1)*limit).limit(limit).lean(),
    TaxiService.countDocuments(query), TaxiService.distinct("serviceType"),
  ]);
  return NextResponse.json({ items,total,page,pages:Math.max(1,Math.ceil(total/limit)),serviceTypes:serviceTypes.sort() });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = normalizeTaxiServiceInput(await request.json());
  const errors = validateTaxiService(input);
  if (errors.length) return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  await connectToDatabase();
  if (await TaxiService.exists({ slug: input.slug })) return NextResponse.json({ error: "A taxi service with this slug already exists." }, { status: 409 });
  const item = await TaxiService.create({ ...input, publishedAt: input.status === "published" ? new Date() : null, createdBy: admin.id, updatedBy: admin.id });
  await logAdminActivity({ adminId:admin.id, adminName:admin.name, action:"Created taxi service", entity:"TaxiService", entityId:item._id.toString(), metadata:{ title:item.title,status:item.status } });
  return NextResponse.json({ item }, { status:201 });
}
