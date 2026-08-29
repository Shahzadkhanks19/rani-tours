type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const DIRECT_HOSTS = new Set(["upload.wikimedia.org", "commons.wikimedia.org"]);

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src || src.startsWith("/") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  try {
    const url = new URL(src);
    if (DIRECT_HOSTS.has(url.hostname)) return src;
  } catch {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    width: String(width),
  });

  if (quality) params.set("quality", String(quality));

  return `/api/image?${params.toString()}`;
}
