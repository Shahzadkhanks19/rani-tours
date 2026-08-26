import { NextRequest,NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
import { Invoice } from "@/models/Invoice";
import { PageView } from "@/models/PageView";

export async function GET(request:NextRequest){
  const admin=await requireAdminApi();if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
  await connectToDatabase();
  const requested=Number(new URL(request.url).searchParams.get("days"));const days=[7,30,90].includes(requested)?requested:30;
  const start=new Date();start.setDate(start.getDate()-(days-1));start.setHours(0,0,0,0);
  const [views,uniqueAgg,popularPages,deviceAgg,recentViews,totalEnquiries,newEnquiries,convertedEnquiries,quoteEnquiries,contactEnquiries,recentEnquiries,statusAgg,totalInvoices,paidInvoices,revenueAgg,outstandingAgg,totalBilledAgg,recentInvoices]=await Promise.all([
    PageView.countDocuments({createdAt:{$gte:start}}),
    PageView.aggregate([{$match:{createdAt:{$gte:start}}},{$group:{_id:"$sessionId"}},{$count:"count"}]),
    PageView.aggregate([{$match:{createdAt:{$gte:start}}},{$group:{_id:"$path",count:{$sum:1}}},{$sort:{count:-1}},{$limit:8}]),
    PageView.aggregate([{$match:{createdAt:{$gte:start}}},{$group:{_id:"$device",count:{$sum:1}}},{$sort:{count:-1}}]),
    PageView.find({createdAt:{$gte:start}}).select({createdAt:1}).lean(),
    Enquiry.countDocuments({createdAt:{$gte:start}}),Enquiry.countDocuments({createdAt:{$gte:start},status:"new"}),Enquiry.countDocuments({createdAt:{$gte:start},status:"converted"}),Enquiry.countDocuments({createdAt:{$gte:start},source:"get_quote"}),Enquiry.countDocuments({createdAt:{$gte:start},source:"contact"}),Enquiry.find({createdAt:{$gte:start}}).select({createdAt:1}).lean(),Enquiry.aggregate([{$match:{createdAt:{$gte:start}}},{$group:{_id:"$status",count:{$sum:1}}},{$sort:{count:-1}}]),
    Invoice.countDocuments({billDate:{$gte:start},status:{$ne:"cancelled"}}),Invoice.countDocuments({billDate:{$gte:start},status:{$ne:"cancelled"},paymentStatus:"paid"}),Invoice.aggregate([{$match:{billDate:{$gte:start},status:{$ne:"cancelled"}}},{$group:{_id:null,value:{$sum:"$amountPaid"}}}]),Invoice.aggregate([{$match:{billDate:{$gte:start},status:{$ne:"cancelled"}}},{$group:{_id:null,value:{$sum:"$balanceDue"}}}]),Invoice.aggregate([{$match:{billDate:{$gte:start},status:{$ne:"cancelled"}}},{$group:{_id:null,value:{$sum:"$total"}}}]),Invoice.find({billDate:{$gte:start},status:{$ne:"cancelled"}}).select({billDate:1,total:1,amountPaid:1}).lean()
  ]);
  const series=Array.from({length:days},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return{key:d.toISOString().slice(0,10),label:d.toLocaleDateString("en-IN",{day:"2-digit",month:"short"}),views:0,enquiries:0,billed:0,received:0}});const map=new Map(series.map(x=>[x.key,x]));
  for(const x of recentViews){const r=map.get(new Date(x.createdAt as Date).toISOString().slice(0,10));if(r)r.views++}for(const x of recentEnquiries){const r=map.get(new Date(x.createdAt as Date).toISOString().slice(0,10));if(r)r.enquiries++}for(const x of recentInvoices){const r=map.get(new Date(x.billDate as Date).toISOString().slice(0,10));if(r){r.billed+=Number(x.total||0);r.received+=Number(x.amountPaid||0)}}
  const uniqueVisitors=Number(uniqueAgg[0]?.count||0),revenue=Number(revenueAgg[0]?.value||0),outstanding=Number(outstandingAgg[0]?.value||0),totalBilled=Number(totalBilledAgg[0]?.value||0);
  return NextResponse.json({days,kpis:{views,uniqueVisitors,totalEnquiries,newEnquiries,convertedEnquiries,conversionRate:totalEnquiries?Math.round(convertedEnquiries/totalEnquiries*1000)/10:0,totalInvoices,paidInvoices,paidRate:totalInvoices?Math.round(paidInvoices/totalInvoices*1000)/10:0,totalBilled,revenue,outstanding,averageInvoice:totalInvoices?Math.round(totalBilled/totalInvoices):0},series,popularPages,deviceAgg,statusAgg,sources:[{label:"Get Quote",count:quoteEnquiries},{label:"Contact Form",count:contactEnquiries}]});
}
