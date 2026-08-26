import { NextResponse } from "next/server";
import { clearAdminSession, getCurrentAdmin, logAdminActivity } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  const admin = await getCurrentAdmin();

  if (admin) {
    await logAdminActivity({
      adminId: admin.id,
      adminName: admin.name,
      action: "Signed out",
      entity: "authentication",
    });
  }

  await clearAdminSession();
  return NextResponse.json({ success: true });
}
