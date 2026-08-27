import { createHash } from "node:crypto";
import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";

const phoneRe=/^[6-9]\d{9}$/;
const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean=(v:unknown,max=1000)=>String(v??"").trim().slice(0,max);
const normalizePhone=(v:unknown)=>String(v??"").replace(/\D/g,"").slice(-10);
const duplicateWindowMs=30_000;

export async function POST(request:NextRequest){
  const body=await request.json().catch(()=>null) as Record<string,unknown>|null;
  if(!body)return NextResponse.json({error:"Invalid request."},{status:400});
  const source=body.source==="contact"?"contact":body.source==="get_quote"?"get_quote":null;
  if(!source)return NextResponse.json({error:"Invalid enquiry source."},{status:400});
  const requestId=clean(body.requestId,120);
  const name=clean(body.name,100);const phone=normalizePhone(body.phone);const email=clean(body.email,160).toLowerCase();
  if(name.length<2)return NextResponse.json({error:"Please enter your name."},{status:400});
  if(!phoneRe.test(phone))return NextResponse.json({error:"Enter a valid 10-digit Indian mobile number."},{status:400});
  if(email&&!emailRe.test(email))return NextResponse.json({error:"Enter a valid email address."},{status:400});
  const subject=clean(body.subject,160),message=clean(body.message,4000);
  const data:Record<string,unknown>={requestId:requestId||undefined,source,name,phone,email,subject,message,ipAddress:clean(request.headers.get("x-forwarded-for")?.split(",")[0],80),userAgent:clean(request.headers.get("user-agent"),500)};
  let fingerprintParts=[source,name.toLowerCase(),phone,email,subject.toLowerCase(),message.toLowerCase()];
  if(source==="contact"){
    if(!email)return NextResponse.json({error:"Email is required."},{status:400});
    if(subject.length<2)return NextResponse.json({error:"Subject is required."},{status:400});
    if(message.length<5)return NextResponse.json({error:"Please enter your message."},{status:400});
  }else{
    const journeyType=clean(body.journeyType,120),pickup=clean(body.pickup,160),destination=clean(body.destination,160),travelDate=clean(body.travelDate,30),duration=clean(body.duration,100),vehicle=clean(body.vehicle,160),travellers=Math.max(1,Math.min(100,Number(body.travellers)||1));
    if(!journeyType||pickup.length<2||destination.length<2||!travelDate)return NextResponse.json({error:"Please complete the required journey details."},{status:400});
    const date=new Date(`${travelDate}T00:00:00.000Z`);if(Number.isNaN(date.getTime()))return NextResponse.json({error:"Invalid travel date."},{status:400});
    Object.assign(data,{journeyType,pickup,destination,travelDate:date,travellers,duration,vehicle});
    fingerprintParts=[...fingerprintParts,journeyType.toLowerCase(),pickup.toLowerCase(),destination.toLowerCase(),travelDate,String(travellers),duration.toLowerCase(),vehicle.toLowerCase()];
  }
  const timeBucket=Math.floor(Date.now()/duplicateWindowMs);
  const dedupeKey=createHash("sha256").update(`${fingerprintParts.join("|")}|${timeBucket}`).digest("hex");
  data.dedupeKey=dedupeKey;
  await connectToDatabase();
  if(requestId){const existing=await Enquiry.findOne({requestId}).select("_id").lean();if(existing)return NextResponse.json({success:true,id:String(existing._id),duplicate:true},{status:200});}
  const duplicate=await Enquiry.findOne({dedupeKey}).select("_id").lean();
  if(duplicate)return NextResponse.json({success:true,id:String(duplicate._id),duplicate:true},{status:200});
  try{
    const item=await Enquiry.create(data);
    return NextResponse.json({success:true,id:item._id.toString()},{status:201});
  }catch(error:unknown){
    if(typeof error==="object"&&error!==null&&"code" in error&&(error as {code?:number}).code===11000){
      const existing=requestId?await Enquiry.findOne({$or:[{requestId},{dedupeKey}]}).select("_id").lean():await Enquiry.findOne({dedupeKey}).select("_id").lean();
      if(existing)return NextResponse.json({success:true,id:String(existing._id),duplicate:true},{status:200});
    }
    throw error;
  }
}
