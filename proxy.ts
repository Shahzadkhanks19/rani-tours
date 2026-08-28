import { NextRequest, NextResponse } from "next/server";

const unsafeMethods=new Set(["POST","PUT","PATCH","DELETE"]);
const isProd=process.env.NODE_ENV==="production";
const scriptSrc=["'self'","'unsafe-inline'",...(isProd?[]:["'unsafe-eval'"])].join(" ");
const csp=["default-src 'self'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'","object-src 'none'",`script-src ${scriptSrc}`,"style-src 'self' 'unsafe-inline'","img-src 'self' data: blob: https:","font-src 'self' data:","connect-src 'self' https://api.cloudinary.com https://res.cloudinary.com","frame-src 'self' https://www.google.com https://maps.google.com","media-src 'self' https:","worker-src 'self' blob:","manifest-src 'self'",...(isProd?["upgrade-insecure-requests"]:[])].join("; ");

function applySecurityHeaders(response:NextResponse,pathname:string){
 response.headers.set("Content-Security-Policy",csp);
 response.headers.set("Referrer-Policy","strict-origin-when-cross-origin");
 response.headers.set("X-Content-Type-Options","nosniff");
 response.headers.set("X-Frame-Options","DENY");
 response.headers.set("Permissions-Policy","camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()");
 response.headers.set("Cross-Origin-Opener-Policy","same-origin");
 response.headers.set("Cross-Origin-Resource-Policy","same-site");
 response.headers.set("Origin-Agent-Cluster","?1");
 if(isProd)response.headers.set("Strict-Transport-Security","max-age=63072000; includeSubDomains; preload");
 if(pathname.startsWith("/admin")||pathname.startsWith("/api/")){response.headers.set("Cache-Control","no-store, max-age=0");response.headers.set("Pragma","no-cache");}
 if(pathname.startsWith("/admin"))response.headers.set("X-Robots-Tag","noindex, nofollow, noarchive, nosnippet");
 if(pathname.startsWith("/api/"))response.headers.set("X-Robots-Tag","noindex, nofollow");
 return response;
}

function normalizedHost(value:string|null){const host=value?.split(",")[0]?.trim().toLowerCase();return host&&host.length<=253&&!/[\s\\/]/.test(host)?host:null}
function sameOrigin(request:NextRequest){
 const origin=request.headers.get("origin"),host=normalizedHost(request.headers.get("x-forwarded-host")||request.headers.get("host"));
 if(!origin||!host)return false;
 try{const parsed=new URL(origin);return (parsed.protocol==="https:"||parsed.protocol==="http:")&&parsed.host.toLowerCase()===host}catch{return false}
}

export function proxy(request:NextRequest){
 const pathname=request.nextUrl.pathname,method=request.method.toUpperCase();
 if(method==="TRACE"||method==="CONNECT")return applySecurityHeaders(new NextResponse(null,{status:405,headers:{Allow:"GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE"}}),pathname);
 if(pathname.startsWith("/api/admin/")&&unsafeMethods.has(method)&&!sameOrigin(request))return applySecurityHeaders(NextResponse.json({error:"Cross-site request blocked."},{status:403}),pathname);
 const rawLength=request.headers.get("content-length"),contentLength=rawLength===null?0:Number(rawLength);
 if(rawLength!==null&&(!Number.isFinite(contentLength)||contentLength<0))return applySecurityHeaders(NextResponse.json({error:"Invalid request size."},{status:400}),pathname);
 if(pathname.startsWith("/api/admin/")&&unsafeMethods.has(method)&&contentLength>2*1024*1024&&!pathname.endsWith("/uploads"))return applySecurityHeaders(NextResponse.json({error:"Request payload is too large."},{status:413}),pathname);
 return applySecurityHeaders(NextResponse.next(),pathname);
}

export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|rani-tours-icon.svg).*)"]};
