import { NextResponse } from "next/server";
import { hashPassword, logAdminActivity, requireAdminApi, validatePasswordStrength, verifyPassword } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const currentAdmin = await requireAdminApi();
  if (!currentAdmin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = (await request.json()) as { currentPassword?: string; newPassword?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const currentPassword = body.currentPassword || "";
  const newPassword = body.newPassword || "";
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: "Both password fields are required." }, { status: 400 });
  }
  if (!validatePasswordStrength(newPassword)) {
    return NextResponse.json(
      { message: "New password must be at least 10 characters and include uppercase, lowercase, and a number." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const admin = await AdminUser.findById(currentAdmin.id).select("+passwordHash");
  if (!admin || !(await verifyPassword(currentPassword, admin.passwordHash))) {
    return NextResponse.json({ message: "Current password is incorrect." }, { status: 400 });
  }

  admin.passwordHash = await hashPassword(newPassword);
  admin.passwordChangedAt = new Date();
  await admin.save();

  await logAdminActivity({
    adminId: currentAdmin.id,
    adminName: currentAdmin.name,
    action: "Changed password",
    entity: "authentication",
  });

  return NextResponse.json({ success: true, message: "Password updated successfully." });
}
