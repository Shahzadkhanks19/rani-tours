import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, setAdminSession, verifyPassword } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { enforceBodySize, enforceSameOrigin, getClientIp, hasJsonContentType, jsonNoStore } from "@/lib/security";
import { AdminUser } from "@/models/AdminUser";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = enforceSameOrigin(request); if (originError) return originError;
  const sizeError = enforceBodySize(request, 8 * 1024); if (sizeError) return sizeError;
  if (!hasJsonContentType(request)) return jsonNoStore({ message: "Unsupported request format." }, { status: 415 });
  const ip = await getClientIp();
  const ipLimit = rateLimit(`admin-login:${ip}`, 8, 15 * 60 * 1000);
  if (!ipLimit.allowed) return jsonNoStore({ message: "Too many login attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSeconds) } });
  let body: { email?: string; password?: string };
  try { body = (await request.json()) as { email?: string; password?: string }; } catch { return jsonNoStore({ message: "Invalid request." }, { status: 400 }); }
  const email = body.email?.trim().toLowerCase() || ""; const password = body.password || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || password.length < 1 || password.length > 128) return jsonNoStore({ message: "Invalid email or password." }, { status: 401 });
  const accountLimit = rateLimit(`admin-login-account:${email}`, 10, 30 * 60 * 1000);
  if (!accountLimit.allowed) return jsonNoStore({ message: "Too many login attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(accountLimit.retryAfterSeconds) } });
  await connectToDatabase(); const admin = await AdminUser.findOne({ email }).select("+passwordHash"); const valid = admin?.isActive && (await verifyPassword(password, admin.passwordHash));
  if (!admin || !valid) return jsonNoStore({ message: "Invalid email or password." }, { status: 401 });
  admin.lastLoginAt = new Date(); await admin.save(); await setAdminSession(admin); await logAdminActivity({ adminId: admin._id.toString(), adminName: admin.name, action: "Signed in", entity: "authentication" });
  return jsonNoStore({ admin: { id: admin._id.toString(), name: admin.name, email: admin.email, role: admin.role } });
}
