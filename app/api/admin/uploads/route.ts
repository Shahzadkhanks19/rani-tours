import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Image must be 8MB or smaller." }, { status: 400 });

  const requestedFolder = String(form.get("folder") || "tour-packages");
  const allowedFolders = new Set(["tour-packages", "taxi-services"]);
  const area = allowedFolders.has(requestedFolder) ? requestedFolder : "tour-packages";
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `rani-tours/${area}`;
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  const payload = new FormData();
  payload.append("file", file);
  payload.append("api_key", apiKey);
  payload.append("timestamp", String(timestamp));
  payload.append("folder", folder);
  payload.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: payload });
  const data = await response.json() as { secure_url?: string; public_id?: string; error?: { message?: string } };
  if (!response.ok || !data.secure_url) return NextResponse.json({ error: data.error?.message || "Image upload failed." }, { status: 502 });
  return NextResponse.json({ image: { url: data.secure_url, publicId: data.public_id || "" } });
}
