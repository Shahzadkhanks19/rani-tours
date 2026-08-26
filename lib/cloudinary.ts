import "server-only";
import { createHash } from "crypto";

export async function destroyCloudinaryImage(publicId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!publicId || !cloudName || !apiKey || !apiSecret) return;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1").update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  const body = new URLSearchParams({ public_id: publicId, timestamp: String(timestamp), api_key: apiKey, signature });
  try {
    await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  } catch {
    // Media cleanup must never make the CMS write fail.
  }
}

export function collectPackagePublicIds(value: unknown) {
  const ids = new Set<string>();
  const walk = (item: unknown) => {
    if (!item) return;
    if (Array.isArray(item)) return item.forEach(walk);
    if (typeof item !== "object") return;
    const record = item as Record<string, unknown>;
    if (typeof record.publicId === "string" && record.publicId.startsWith("rani-tours/tour-packages/")) ids.add(record.publicId);
    Object.values(record).forEach(walk);
  };
  walk(value);
  return ids;
}
