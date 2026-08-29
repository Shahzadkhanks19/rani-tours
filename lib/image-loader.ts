type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src || src.startsWith("/") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    width: String(width),
  });

  if (quality) params.set("quality", String(quality));

  return `/api/image?${params.toString()}`;
}
