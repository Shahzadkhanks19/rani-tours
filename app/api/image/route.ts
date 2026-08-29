import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "aaitoursandtravels.com",
]);

function getAllowedSource(value: string | null) {
  if (!value) throw new Error("Missing image URL");
  const url = new URL(value);
  if (url.protocol !== "https:" || !ALLOWED_HOSTS.has(url.hostname)) {
    throw new Error("Image host is not allowed");
  }
  return url;
}

export async function GET(request: NextRequest) {
  try {
    const source = getAllowedSource(request.nextUrl.searchParams.get("url"));
    const response = await fetch(source, {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "User-Agent": "RaniToursImageBridge/1.0",
      },
      next: { revalidate: 604800 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Unable to load image" }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid image response" }, { status: 502 });
    }

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to load image" }, { status: 400 });
  }
}
