import "server-only";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function jsonNoStore(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("Pragma", "no-cache");
  headers.set("X-Content-Type-Options", "nosniff");
  return NextResponse.json(body, { ...init, headers });
}

export async function getClientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export function hasJsonContentType(request: Request) {
  return (request.headers.get("content-type") || "").toLowerCase().startsWith("application/json");
}

export function enforceBodySize(request: Request, maxBytes: number) {
  const raw = request.headers.get("content-length");
  if (!raw) return null;
  const size = Number(raw);
  if (!Number.isFinite(size) || size < 0 || size > maxBytes) {
    return jsonNoStore({ error: "Request payload is too large." }, { status: 413 });
  }
  return null;
}

export function enforceSameOrigin(request: Request) {
  if (SAFE_METHODS.has(request.method.toUpperCase())) return null;
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return jsonNoStore({ error: "Invalid request origin." }, { status: 403 });
  try {
    if (new URL(origin).host !== host) return jsonNoStore({ error: "Cross-site request blocked." }, { status: 403 });
  } catch {
    return jsonNoStore({ error: "Invalid request origin." }, { status: 403 });
  }
  return null;
}

export function sanitizePlainText(value: unknown, max = 500) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}
