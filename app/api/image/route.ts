import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "images.unsplash.com",
  "images.pexels.com",
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "res.cloudinary.com",
  "gostops.com",
  "www.ranthamborenationalpark.com",
  "static.toiimg.com",
  "www.indianrajputs.com",
  "i.pinimg.com",
  "r1imghtlak.mmtcdn.com",
  "www.trawellino.com",
  "jckolkata.wordpress.com",
  "www.stayvista.com",
  "s7ap1.scene7.com",
  "vishwanthretreat.com",
  "avathioutdoors.gumlet.io",
  "www.fabhotels.com",
  "cms.patrika.com",
  "www.rajasthandriver.com",
  "media.assettype.com",
  "api.welcomerajasthantours.com",
  "media1.thrillophilia.com",
  "static2.tripoto.com",
  "media.traveldepartment.com",
  "www.sreestours.com",
  "telugu.nativeplanet.com",
  "www.transindiatravels.com",
  "maataxiservice.com",
  "menworld.pl",
  "www.motorbeam.com",
  "assets.cdntoyota.co.za",
  "images10.gaadi.com",
  "www.smtravelhub.com",
  "www.southtourism.in",
  "godavarigrand.com",
  "ncdtempotravellerhire.com",
  "busesandvans.tatamotors.com",
  "aaitoursandtravels.com",
]);

const MAX_REDIRECTS = 3;
const MIN_WIDTH = 160;
const MAX_WIDTH = 2000;

function clampWidth(value: string | null) {
  const width = Number(value);
  if (!Number.isFinite(width)) return 1200;
  return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, Math.round(width)));
}

function clampQuality(value: string | null) {
  const quality = Number(value);
  if (!Number.isFinite(quality)) return 62;
  return Math.max(40, Math.min(90, Math.round(quality)));
}

function assertAllowedUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || !ALLOWED_HOSTS.has(url.hostname)) {
    throw new Error("Image host is not allowed");
  }
  return url;
}

function resizeUpstreamUrl(url: URL, width: number, quality: number) {
  if (url.hostname === "images.pexels.com") {
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("q", String(quality));
    url.searchParams.set("w", String(width));
    return url;
  }

  if (url.hostname === "images.unsplash.com") {
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("q", String(quality));
    url.searchParams.set("w", String(width));
    return url;
  }

  if ((url.hostname === "commons.wikimedia.org" || url.hostname.endsWith(".wikimedia.org")) && url.pathname.includes("Special:Redirect/file/")) {
    url.searchParams.set("width", String(width));
    return url;
  }

  if (url.searchParams.has("imwidth")) {
    url.searchParams.set("imwidth", String(width));
  }

  return url;
}

async function fetchAllowedImage(initialUrl: URL) {
  let currentUrl = initialUrl;

  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    const response = await fetch(currentUrl, {
      redirect: "manual",
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "RaniToursImageProxy/1.0",
      },
      next: { revalidate: 86400 },
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location || redirect === MAX_REDIRECTS) throw new Error("Too many image redirects");
      currentUrl = assertAllowedUrl(new URL(location, currentUrl).toString());
      continue;
    }

    if (!response.ok) throw new Error(`Image request failed with ${response.status}`);
    return response;
  }

  throw new Error("Unable to load image");
}

export async function GET(request: NextRequest) {
  try {
    const source = request.nextUrl.searchParams.get("url");
    if (!source) return NextResponse.json({ error: "Missing image URL" }, { status: 400 });

    const width = clampWidth(request.nextUrl.searchParams.get("width"));
    const quality = clampQuality(request.nextUrl.searchParams.get("quality"));
    const url = resizeUpstreamUrl(assertAllowedUrl(source), width, quality);
    const response = await fetchAllowedImage(url);
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
    return NextResponse.json({ error: "Unable to load image" }, { status: 502 });
  }
}
