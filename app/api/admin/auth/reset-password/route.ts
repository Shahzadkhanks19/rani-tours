import { NextResponse } from "next/server";
import { hashPassword, hashResetToken, logAdminActivity, validatePasswordStrength } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { token?: string; password?: string };
  try {
    body = (await request.json()) as { token?: string; password?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const token = body.token || "";
  const password = body.password || "";
  if (!token || !validatePasswordStrength(password)) {
    return NextResponse.json(
      { message: "Use a valid reset link and a password of at least 10 characters with uppercase, lowercase, and a number." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const tokenHash = hashResetToken(token);
  const admin = await AdminUser.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpiresAt: { $gt: new Date() },
    isActive: true,
  }).select("+passwordHash +resetPasswordTokenHash +resetPasswordExpiresAt");

  if (!admin) {
    return NextResponse.json({ message: "This reset link is invalid or has expired." }, { status: 400 });
  }

  admin.passwordHash = await hashPassword(password);
  admin.passwordChangedAt = new Date();
  admin.resetPasswordTokenHash = null;
  admin.resetPasswordExpiresAt = null;
  await admin.save();

  await logAdminActivity({
    adminId: admin._id.toString(),
    adminName: admin.name,
    action: "Reset password",
    entity: "authentication",
  });

  return NextResponse.json({ success: true, message: "Password reset successfully. You can now sign in." });
}
