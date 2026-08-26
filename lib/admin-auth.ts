import "server-only";

import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { ActivityLog } from "@/models/ActivityLog";
import { AdminUser } from "@/models/AdminUser";

const scrypt = promisify(scryptCallback);
const SESSION_COOKIE = "rani_admin_session";
const SESSION_VERSION = 1;

type SessionPayload = {
  v: number;
  sub: string;
  email: string;
  role: "super_admin" | "admin";
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_JWT_SECRET must be configured with at least 32 characters.");
  }
  return secret;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [salt, storedKeyHex] = storedHash.split(":");
  if (!salt || !storedKeyHex) return false;

  const storedKey = Buffer.from(storedKeyHex, "hex");
  const derivedKey = (await scrypt(password, salt, storedKey.length)) as Buffer;
  return storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey);
}

export function createSessionToken(payload: Omit<SessionPayload, "v" | "exp">) {
  const days = Math.max(1, Number(process.env.ADMIN_SESSION_DAYS || 7));
  const sessionPayload: SessionPayload = {
    ...payload,
    v: SESSION_VERSION,
    exp: Math.floor(Date.now() / 1000) + days * 24 * 60 * 60,
  };
  const encoded = base64UrlEncode(JSON.stringify(sessionPayload));
  return `${encoded}.${signPayload(encoded)}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = signPayload(encoded);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (payload.v !== SESSION_VERSION || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setAdminSession(admin: { _id: { toString(): string }; email: string; role: "super_admin" | "admin" }) {
  const cookieStore = await cookies();
  const days = Math.max(1, Number(process.env.ADMIN_SESSION_DAYS || 7));
  cookieStore.set(SESSION_COOKIE, createSessionToken({ sub: admin._id.toString(), email: admin.email, role: admin.role }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: days * 24 * 60 * 60,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function getCurrentAdmin() {
  const session = await getAdminSession();
  if (!session) return null;

  await connectToDatabase();
  const admin = await AdminUser.findOne({ _id: session.sub, isActive: true }).lean();
  if (!admin) return null;

  return {
    id: admin._id.toString(),
    name: admin.name as string,
    email: admin.email as string,
    role: admin.role as "super_admin" | "admin",
  };
}

export async function requireAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function requireAdminApi() {
  return getCurrentAdmin();
}

export function validatePasswordStrength(password: string) {
  return password.length >= 10 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
}

export async function logAdminActivity(input: {
  adminId?: string | null;
  adminName?: string;
  action: string;
  entity: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  await connectToDatabase();
  const headerStore = await headers();
  const ipAddress = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || headerStore.get("x-real-ip");

  await ActivityLog.create({
    adminId: input.adminId || null,
    adminName: input.adminName || "System",
    action: input.action,
    entity: input.entity,
    entityId: input.entityId || null,
    metadata: input.metadata || {},
    ipAddress: ipAddress || null,
  });
}

export function createResetToken() {
  const raw = randomBytes(32).toString("hex");
  const hash = createHmac("sha256", getSessionSecret()).update(raw).digest("hex");
  return { raw, hash };
}

export function hashResetToken(raw: string) {
  return createHmac("sha256", getSessionSecret()).update(raw).digest("hex");
}
