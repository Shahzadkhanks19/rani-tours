import { NextRequest,NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";

export async function GET(request:NextRequest){
  const admin=await requireAdminApi();if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
  await connectToDatabase();
  const p=request.nextUrl.searchParams;const page=Math.max(1,Number(p.get("page")||1));const limit=Math.min(50,Math.max(5,Number(p.get("limit")||20)));
  const search=(p.get("search")||"").trim();const status=p.get("status")||"all";const source=p.get("source")||"all";const priority=p.get("priority")||"all";
  const query:Record<string,unknown>={};if(search)query.$text={$search:search};if(status!=="all")query.status=status;if(source!=="all")query.source=source;if(priority!=="all")query.priority=priority;
  const [items,total,newCount]=await Promise.all([Enquiry.find(query).sort({createdAt:-1}).skip((page-1)*limit).limit(limit).lean(),Enquiry.countDocuments(query),Enquiry.countDocuments({status:"new"})]);
  return NextResponse.json({items,total,newCount,page,pages:Math.max(1,Math.ceil(total/limit))});
}
