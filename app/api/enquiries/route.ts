import { createHash } from "node:crypto";
import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { cleanText,validateContactInput,validateQuoteInput } from "@/lib/form-validation";
import { rateLimit } from "@/lib/rate-limit";
import { Enquiry } from "@/models/Enquiry";

const duplicateWindowMs=30_000;
export async function POST(request:NextRequest){
 const ip=cleanText(request.headers.get("x-forwarded-for")?.split(",")[0]||request.headers.get("x-real-ip")||"unknown",80);const limit=rateLimit(`public-enquiry:${ip}`,8,10*60*1000);if(!limit.allowed)return NextResponse.json({error:"Too many enquiry attempts. Please wait a few minutes and try again."},{status:429,headers:{"Retry-After":String(limit.retryAfterSeconds)}});
 const contentType=request.headers.get("content-type")||"";if(!contentType.toLowerCase().includes("application/json"))return NextResponse.json({error:"Unsupported request format."},{status:415});
 const body=await request.json().catch(()=>null) as Record<string,unknown>|null;if(!body)return NextResponse.json({error:"Invalid request."},{status:400});
 const source=body.source==="contact"?"contact":body.source==="get_quote"?"get_quote":null;if(!source)return NextResponse.json({error:"Invalid enquiry source."},{status:400});const requestId=cleanText(body.requestId,120);
 let data:Record<string,unknown>;let coreFingerprintParts:string[];
 if(source==="contact"){
  const result=validateContactInput({name:body.name,phone:body.phone,email:body.email,subject:body.subject,message:body.message});if(!result.valid)return NextResponse.json({error:Object.values(result.errors)[0],errors:result.errors},{status:400});data={requestId:requestId||undefined,source,...result.data};coreFingerprintParts=[source,result.data.name.toLowerCase(),result.data.phone,result.data.email,result.data.subject.toLowerCase(),result.data.message.toLowerCase()];
 }else{
  const result=validateQuoteInput({name:body.name,phone:body.phone,email:body.email,journeyType:body.journeyType,pickup:body.pickup,destination:body.destination,travelDate:body.travelDate,travellers:body.travellers,duration:body.duration,vehicle:body.vehicle,message:body.message});if(!result.valid)return NextResponse.json({error:Object.values(result.errors)[0],errors:result.errors},{status:400});const date=new Date(`${result.data.travelDate}T00:00:00.000Z`);data={requestId:requestId||undefined,source,...result.data,travelDate:date};coreFingerprintParts=[source,result.data.name.toLowerCase(),result.data.phone,result.data.email,result.data.journeyType.toLowerCase(),result.data.pickup.toLowerCase(),result.data.destination.toLowerCase(),result.data.travelDate];
 }
 Object.assign(data,{ipAddress:ip,userAgent:cleanText(request.headers.get("user-agent"),500)});
 const fingerprint=createHash("sha256").update(coreFingerprintParts.join("|")).digest("hex"),now=Date.now(),currentBucket=Math.floor(now/duplicateWindowMs),previousBucket=currentBucket-1,currentKey=createHash("sha256").update(`${fingerprint}|${currentBucket}`).digest("hex"),previousKey=createHash("sha256").update(`${fingerprint}|${previousBucket}`).digest("hex");data.dedupeKey=currentKey;
 await connectToDatabase();if(requestId){const existing=await Enquiry.findOne({requestId}).select("_id").lean();if(existing)return NextResponse.json({success:true,id:String(existing._id),duplicate:true},{status:200});}
 const duplicate=await Enquiry.findOne({dedupeKey:{$in:[currentKey,previousKey]},createdAt:{$gte:new Date(now-duplicateWindowMs)}}).select("_id").lean();if(duplicate)return NextResponse.json({success:true,id:String(duplicate._id),duplicate:true},{status:200});
 try{const item=await Enquiry.create(data);return NextResponse.json({success:true,id:item._id.toString()},{status:201});}catch(error:unknown){if(typeof error==="object"&&error!==null&&"code" in error&&(error as{code?:number}).code===11000){const existing=requestId?await Enquiry.findOne({$or:[{requestId},{dedupeKey:{$in:[currentKey,previousKey]}}]}).select("_id").lean():await Enquiry.findOne({dedupeKey:{$in:[currentKey,previousKey]}}).select("_id").lean();if(existing)return NextResponse.json({success:true,id:String(existing._id),duplicate:true},{status:200});}throw error;}
}
