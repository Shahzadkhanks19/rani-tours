import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { logAdminActivity, requireAdminApi } from "@/lib/admin-auth";
import { destroyCloudinaryImage, collectCmsPublicIds } from "@/lib/cloudinary";
import { normalizeTaxiServiceInput, validateTaxiService } from "@/lib/taxi-services";
import { TaxiService } from "@/models/TaxiService";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, context: Context) {
  const admin=await requireAdminApi(); if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await context.params; if(!Types.ObjectId.isValid(id))return NextResponse.json({error:"Invalid service id."},{status:400});
  await connectToDatabase(); const item=await TaxiService.findById(id).lean(); if(!item)return NextResponse.json({error:"Taxi service not found."},{status:404});
  return NextResponse.json({item});
}

export async function PUT(request: NextRequest, context: Context) {
  const admin=await requireAdminApi(); if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await context.params; if(!Types.ObjectId.isValid(id))return NextResponse.json({error:"Invalid service id."},{status:400});
  const input=normalizeTaxiServiceInput(await request.json()); const errors=validateTaxiService(input); if(errors.length)return NextResponse.json({error:errors[0],errors},{status:400});
  await connectToDatabase(); const existing=await TaxiService.findById(id); if(!existing)return NextResponse.json({error:"Taxi service not found."},{status:404});
  if(await TaxiService.exists({slug:input.slug,_id:{$ne:id}}))return NextResponse.json({error:"A taxi service with this slug already exists."},{status:409});
  const oldIds=collectCmsPublicIds(existing.toObject(),"rani-tours/taxi-services/");
  const newIds=collectCmsPublicIds(input,"rani-tours/taxi-services/");
  const publishedAt=input.status==="published"?(existing.publishedAt||new Date()):null;
  const item=await TaxiService.findByIdAndUpdate(id,{...input,publishedAt,updatedBy:admin.id},{new:true,runValidators:true});
  await Promise.all([...oldIds].filter((publicId)=>!newIds.has(publicId)).map(destroyCloudinaryImage));
  await logAdminActivity({adminId:admin.id,adminName:admin.name,action:"Updated taxi service",entity:"TaxiService",entityId:id,metadata:{title:input.title,status:input.status}});
  return NextResponse.json({item});
}

export async function DELETE(_: NextRequest, context: Context) {
  const admin=await requireAdminApi(); if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await context.params; if(!Types.ObjectId.isValid(id))return NextResponse.json({error:"Invalid service id."},{status:400});
  await connectToDatabase(); const item=await TaxiService.findByIdAndDelete(id); if(!item)return NextResponse.json({error:"Taxi service not found."},{status:404});
  await Promise.all([...collectCmsPublicIds(item.toObject(),"rani-tours/taxi-services/")].map(destroyCloudinaryImage));
  await logAdminActivity({adminId:admin.id,adminName:admin.name,action:"Deleted taxi service",entity:"TaxiService",entityId:id,metadata:{title:item.title}});
  return NextResponse.json({success:true});
}
