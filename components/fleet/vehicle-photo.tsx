"use client";

import Image from "next/image";
import { useState } from "react";
import { publicImageUrl } from "@/lib/public-image";

type VehiclePhotoProps = {
  name: string;
  image: { url: string; alt?: string };
};

const unreliableHosts=new Set([
  "ncdtempotravellerhire.com",
  "www.ncdtempotravellerhire.com",
  "aaitoursandtravels.com",
  "www.aaitoursandtravels.com",
]);
function initialFallback(src:string){try{return unreliableHosts.has(new URL(src).hostname)}catch{return !src}}

export function VehiclePhoto({ name, image }: VehiclePhotoProps) {
  const [fallback, setFallback] = useState(()=>initialFallback(image.url));

  return (
    <Image
      src={fallback ? "/images/fleet/vehicle-fallback.svg" : publicImageUrl(image.url, 520)}
      alt={image.alt || name}
      fill
      sizes="(min-width: 1280px) 280px, (min-width: 768px) 50vw, 100vw"
      className="object-contain p-2"
      onError={() => setFallback(true)}
    />
  );
}
