import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, setAdminSession, verifyPassword } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { AdminUser } from "@/models/AdminUser";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || headerStore.get("x-real-ip") || "unknown";
  const limit = rateLimit(`admin-login:${ip}`, 8, 15 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password || "";
  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  await connectToDatabase();
  const admin = await AdminUser.findOne({ email }).select("+passwordHash");
  const valid = admin?.isActive && (await verifyPassword(password, admin.passwordHash));

  if (!admin || !valid) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  admin.lastLoginAt = new Date();
  await admin.save();
  await setAdminSession(admin);
  await logAdminActivity({
    adminId: admin._id.toString(),
    adminName: admin.name,
    action: "Signed in",
    entity: "authentication",
  });

  return NextResponse.json({
    admin: {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}
