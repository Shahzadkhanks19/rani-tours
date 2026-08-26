import { NextRequest, NextResponse } from "next/server";
import { logAdminActivity, requireAdminApi } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { defaultSiteSettings } from "@/lib/site-settings";
import { SiteSettings } from "@/models/SiteSettings";

const clean = (value: unknown, max = 1000) => String(value ?? "").trim().slice(0, max);
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const item = await SiteSettings.findOne({ key: "main" }).lean();
  const settings = item
    ? {
        business: { ...defaultSiteSettings.business, ...(item.business || {}) },
        social: { ...defaultSiteSettings.social, ...(item.social || {}) },
        billing: { ...defaultSiteSettings.billing, ...(item.billing || {}) },
        enquiry: { ...defaultSiteSettings.enquiry, ...(item.enquiry || {}) },
      }
    : defaultSiteSettings;
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const business = (body.business || {}) as Record<string, unknown>;
  const social = (body.social || {}) as Record<string, unknown>;
  const billing = (body.billing || {}) as Record<string, unknown>;
  const enquiry = (body.enquiry || {}) as Record<string, unknown>;

  const name = clean(business.name, 120);
  const primaryPhone = clean(business.primaryPhone, 30);
  const email = clean(business.email, 160).toLowerCase();
  const notificationEmail = clean(enquiry.notificationEmail, 160).toLowerCase();
  const defaultTaxRate = Number(billing.defaultTaxRate);

  if (name.length < 2) return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  if (!primaryPhone) return NextResponse.json({ error: "Primary phone is required." }, { status: 400 });
  if (!emailRe.test(email)) return NextResponse.json({ error: "Enter a valid business email." }, { status: 400 });
  if (notificationEmail && !emailRe.test(notificationEmail)) return NextResponse.json({ error: "Enter a valid enquiry notification email." }, { status: 400 });
  if (!Number.isFinite(defaultTaxRate) || defaultTaxRate <= 0 || defaultTaxRate > 100) return NextResponse.json({ error: "Default tax rate must be greater than 0 and no more than 100." }, { status: 400 });

  const next = {
    business: {
      name,
      tagline: clean(business.tagline, 160),
      address: clean(business.address, 500),
      primaryPhone,
      secondaryPhone: clean(business.secondaryPhone, 30),
      email,
      whatsapp: clean(business.whatsapp, 300),
      mapsUrl: clean(business.mapsUrl, 500),
    },
    social: {
      instagram: clean(social.instagram, 500),
      facebook: clean(social.facebook, 500),
      youtube: clean(social.youtube, 500),
    },
    billing: {
      defaultTaxRate: Math.round(defaultTaxRate * 100) / 100,
      invoicePrefix: clean(billing.invoicePrefix, 12).toUpperCase() || "RT",
      defaultSignatoryName: clean(billing.defaultSignatoryName, 120) || "Authorized Signatory",
      declaration: clean(billing.declaration, 1500),
      footerNote: clean(billing.footerNote, 300),
    },
    enquiry: { notificationEmail },
  };

  await connectToDatabase();
  const item = await SiteSettings.findOneAndUpdate(
    { key: "main" },
    { $set: { ...next, updatedBy: admin.id }, $setOnInsert: { key: "main" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  await logAdminActivity({ adminId: admin.id, adminName: admin.name, action: "Updated global settings", entity: "Settings", entityId: item._id.toString() });
  return NextResponse.json({ success: true, settings: next });
}
