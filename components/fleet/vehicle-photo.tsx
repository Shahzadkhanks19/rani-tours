"use client";

import Image from "next/image";
import { useState } from "react";
import { publicImageUrl } from "@/lib/public-image";

type VehiclePhotoProps = {
  name: string;
  image: { url: string; alt?: string };
};

export function VehiclePhoto({ name, image }: VehiclePhotoProps) {
  const [fallback, setFallback] = useState(false);

  return (
    <Image
      src={fallback ? "/images/fleet/vehicle-fallback.svg" : publicImageUrl(image.url, 640)}
      alt={image.alt || name}
      fill
      sizes="(min-width: 1280px) 280px, (min-width: 768px) 50vw, 100vw"
      className="object-contain p-2"
      onError={() => setFallback(true)}
    />
  );
}
