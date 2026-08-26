import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createResetToken, logAdminActivity } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { AdminUser } from "@/models/AdminUser";

export const runtime = "nodejs";

const genericMessage = "If an active admin account exists for that email, a reset link has been sent.";

export async function POST(request: Request) {
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || headerStore.get("x-real-ip") || "unknown";
  const limit = rateLimit(`admin-forgot:${ip}`, 5, 30 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ message: genericMessage });
  }

  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ message: genericMessage });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ message: genericMessage });

  await connectToDatabase();
  const admin = await AdminUser.findOne({ email, isActive: true }).select("+resetPasswordTokenHash +resetPasswordExpiresAt");
  if (!admin) return NextResponse.json({ message: genericMessage });

  const { raw, hash } = createResetToken();
  admin.resetPasswordTokenHash = hash;
  admin.resetPasswordExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
  await admin.save();

  const baseUrl = process.env.ADMIN_RESET_BASE_URL || "http://localhost:3000/admin/reset-password";
  const resetUrl = `${baseUrl}?token=${encodeURIComponent(raw)}`;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (apiKey && from) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: admin.email,
      subject: "Reset your Rani Tours admin password",
      html: `<p>Hello ${admin.name},</p><p>A password reset was requested for your Rani Tours admin account.</p><p><a href="${resetUrl}">Reset password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p>`,
    });
  } else if (process.env.NODE_ENV !== "production") {
    console.warn("Admin password reset email skipped because RESEND_API_KEY or RESEND_FROM_EMAIL is not configured.");
  }

  await logAdminActivity({
    adminId: admin._id.toString(),
    adminName: admin.name,
    action: "Requested password reset",
    entity: "authentication",
  });

  return NextResponse.json({ message: genericMessage });
}
