import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { ActivityLog } from "@/models/ActivityLog";

const clean=(value:unknown,max=120)=>String(value??"").trim().slice(0,max);

export async function GET(request:NextRequest){
  const admin=await requireAdminApi();
  if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
  await connectToDatabase();
  const url=new URL(request.url);
  const q=clean(url.searchParams.get("q"),120);
  const entity=clean(url.searchParams.get("entity"),80);
  const adminName=clean(url.searchParams.get("admin"),120);
  const cursor=clean(url.searchParams.get("cursor"),80);
  const limit=Math.min(50,Math.max(10,Number(url.searchParams.get("limit"))||25));
  const filter:Record<string,unknown>={};
  if(q)filter.$or=[{action:{$regex:q,$options:"i"}},{entity:{$regex:q,$options:"i"}},{adminName:{$regex:q,$options:"i"}},{entityId:{$regex:q,$options:"i"}}];
  if(entity)filter.entity=entity;
  if(adminName)filter.adminName=adminName;
  if(cursor){const d=new Date(cursor);if(!Number.isNaN(d.getTime()))filter.createdAt={$lt:d};}
  const items=await ActivityLog.find(filter).sort({createdAt:-1}).limit(limit+1).lean();
  const hasMore=items.length>limit;
  const visible=hasMore?items.slice(0,limit):items;
  const [entities,admins,total]=await Promise.all([
    ActivityLog.distinct("entity"),
    ActivityLog.distinct("adminName"),
    ActivityLog.countDocuments({}),
  ]);
  return NextResponse.json({items:visible,hasMore,nextCursor:hasMore?new Date(visible[visible.length-1].createdAt as Date).toISOString():null,entities:entities.filter(Boolean).sort(),admins:admins.filter(Boolean).sort(),total});
}
