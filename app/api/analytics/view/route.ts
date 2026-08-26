import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PageView } from "@/models/PageView";
const clean=(v:unknown,max=500)=>String(v??"").trim().slice(0,max);
export async function POST(request:NextRequest){const body=await request.json().catch(()=>null) as Record<string,unknown>|null;if(!body)return NextResponse.json({ok:false},{status:400});const path=clean(body.path,300);const sessionId=clean(body.sessionId,100);if(!path.startsWith("/")||!sessionId)return NextResponse.json({ok:false},{status:400});const ua=request.headers.get("user-agent")||"";const device=/ipad|tablet/i.test(ua)?"tablet":/mobile|android|iphone/i.test(ua)?"mobile":"desktop";await connectToDatabase();await PageView.create({path,sessionId,device,referrer:clean(body.referrer,500)});return NextResponse.json({ok:true},{status:201});}
