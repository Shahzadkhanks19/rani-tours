import "server-only";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function jsonNoStore(body: unknown, init: ResponseInit = {}) {
  const responseHeaders = new Headers(init.headers);
  responseHeaders.set("Cache-Control", "no-store, max-age=0");
  responseHeaders.set("Pragma", "no-cache");
  responseHeaders.set("X-Content-Type-Options", "nosniff");
  return NextResponse.json(body, { ...init, headers: responseHeaders });
}

export async function getClientIp() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = forwarded || h.get("x-real-ip") || "unknown";
  return /^[0-9a-f:.]{3,64}$/i.test(candidate) ? candidate : "unknown";
}

export function hasJsonContentType(request: Request) {
  const type = (request.headers.get("content-type") || "").toLowerCase();
  return type === "application/json" || type.startsWith("application/json;");
}

export function enforceBodySize(request: Request, maxBytes: number) {
  const raw = request.headers.get("content-length");
  if (!raw) return null;
  const size = Number(raw);
  if (!Number.isFinite(size) || size < 0 || size > maxBytes) return jsonNoStore({ error: "Request payload is too large." }, { status: 413 });
  return null;
}

function normalizeHost(value: string | null) {
  if (!value) return null;
  const host = value.split(",")[0]?.trim().toLowerCase();
  if (!host || host.length > 253 || /[\s\\/]/.test(host)) return null;
  return host;
}

export function enforceSameOrigin(request: Request) {
  if (SAFE_METHODS.has(request.method.toUpperCase())) return null;
  const origin = request.headers.get("origin");
  const host = normalizeHost(request.headers.get("x-forwarded-host") || request.headers.get("host"));
  if (!origin || !host) return jsonNoStore({ error: "Invalid request origin." }, { status: 403 });
  try {
    const parsed = new URL(origin);
    if ((parsed.protocol !== "https:" && parsed.protocol !== "http:") || parsed.host.toLowerCase() !== host) return jsonNoStore({ error: "Cross-site request blocked." }, { status: 403 });
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

export function isSafeObjectId(value: unknown) {
  return typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
}
