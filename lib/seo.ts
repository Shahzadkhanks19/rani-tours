import type { Metadata } from "next";

export const SITE_NAME="Rani Tour's";
export const DEFAULT_SITE_URL="https://www.ranitour.in";
export const DEFAULT_DESCRIPTION="Reliable taxi services, Rajasthan tour packages and custom travel experiences from Jodhpur with Rani Tour's.";

export function getSiteUrl(){const raw=process.env.NEXT_PUBLIC_SITE_URL||DEFAULT_SITE_URL;try{return new URL(raw.startsWith("http")?raw:`https://${raw}`).origin}catch{return DEFAULT_SITE_URL}}
export function absoluteUrl(path="/"){return new URL(path,getSiteUrl()).toString()}
export function cleanDescription(value:unknown,fallback=DEFAULT_DESCRIPTION){const text=String(value||fallback).replace(/\s+/g," ").trim();return text.slice(0,160)}
export function publicMetadata(input:{title:string;description?:string;path:string;image?:string|null;keywords?:string[];type?:"website"|"article"}):Metadata{
 const description=cleanDescription(input.description);const canonical=absoluteUrl(input.path);const image=input.image?absoluteUrl(input.image):absoluteUrl("/rani-tours-icon.svg");
 return{title:input.title,description,keywords:input.keywords,alternates:{canonical},robots:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1},openGraph:{type:input.type||"website",siteName:SITE_NAME,title:input.title,description,url:canonical,locale:"en_IN",images:[{url:image,alt:input.title}]},twitter:{card:"summary_large_image",title:input.title,description,images:[image]}};
}
export function jsonLd(value:unknown){return JSON.stringify(value).replace(/</g,"\\u003c")}
