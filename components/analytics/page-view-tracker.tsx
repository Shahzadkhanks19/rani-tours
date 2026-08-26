"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function sessionId(){const key="rani_tours_session";let id=localStorage.getItem(key);if(!id){id=crypto.randomUUID();localStorage.setItem(key,id)}return id}
export function PageViewTracker(){const pathname=usePathname();useEffect(()=>{if(!pathname||pathname.startsWith("/admin"))return;const payload={path:pathname,sessionId:sessionId(),referrer:document.referrer};const body=JSON.stringify(payload);if(navigator.sendBeacon){navigator.sendBeacon("/api/analytics/view",new Blob([body],{type:"application/json"}))}else{fetch("/api/analytics/view",{method:"POST",headers:{"Content-Type":"application/json"},body,keepalive:true}).catch(()=>{})}},[pathname]);return null}
