import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { enforceBodySize, getClientIp, hasJsonContentType, jsonNoStore, sanitizePlainText } from "@/lib/security";
import { PageView } from "@/models/PageView";

export async function POST(request:NextRequest){
 const sizeError=enforceBodySize(request,8*1024);if(sizeError)return sizeError;if(!hasJsonContentType(request))return jsonNoStore({ok:false},{status:415});
 const ip=await getClientIp();const limit=rateLimit(`analytics-view:${ip}`,120,10*60*1000);if(!limit.allowed)return jsonNoStore({ok:false},{status:429,headers:{"Retry-After":String(limit.retryAfterSeconds)}});
 const body=await request.json().catch(()=>null) as Record<string,unknown>|null;if(!body)return jsonNoStore({ok:false},{status:400});
 const path=sanitizePlainText(body.path,300),sessionId=sanitizePlainText(body.sessionId,100);if(!path.startsWith("/")||path.startsWith("//")||path.includes("\\")||!sessionId||!/^[A-Za-z0-9._:-]{8,100}$/.test(sessionId))return jsonNoStore({ok:false},{status:400});
 const ua=request.headers.get("user-agent")||"";if(/bot|crawler|spider|slurp|preview|facebookexternalhit|headless/i.test(ua))return jsonNoStore({ok:true},{status:202});
 const device=/ipad|tablet/i.test(ua)?"tablet":/mobile|android|iphone/i.test(ua)?"mobile":"desktop";await connectToDatabase();await PageView.create({path,sessionId,device,referrer:sanitizePlainText(body.referrer,500)});return jsonNoStore({ok:true},{status:201});
}
