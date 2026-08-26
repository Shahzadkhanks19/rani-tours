import Link from "next/link";
import { Activity, ArrowUpRight, BarChart3, CarFront, GalleryHorizontal, MapPinned, MessageSquareText, PackageCheck, ReceiptIndianRupee } from "lucide-react";
import { connectToDatabase } from "@/lib/db";
import { ActivityLog } from "@/models/ActivityLog";
import { Destination } from "@/models/Destination";
import { Enquiry } from "@/models/Enquiry";
import { FleetVehicle } from "@/models/FleetVehicle";
import { GalleryItem } from "@/models/GalleryItem";
import { Invoice } from "@/models/Invoice";
import { TaxiService } from "@/models/TaxiService";
import { TourPackage } from "@/models/TourPackage";

const modules=["Tour Packages","Taxi Services","Destinations","Fleet","Gallery","Enquiries","Billing","Analytics","SEO Manager"];

export default async function AdminDashboardPage(){
  await connectToDatabase();
  const [recentActivity,totalPackages,publishedPackages,totalTaxi,publishedTaxi,totalDestinations,publishedDestinations,totalFleet,publishedFleet,totalGallery,publishedGallery,totalEnquiries,newEnquiries,totalInvoices,revenueAgg]=await Promise.all([
    ActivityLog.find({}).sort({createdAt:-1}).limit(6).lean(),
    TourPackage.countDocuments({}),TourPackage.countDocuments({status:"published"}),
    TaxiService.countDocuments({}),TaxiService.countDocuments({status:"published"}),
    Destination.countDocuments({}),Destination.countDocuments({status:"published"}),
    FleetVehicle.countDocuments({}),FleetVehicle.countDocuments({status:"published"}),
    GalleryItem.countDocuments({}),GalleryItem.countDocuments({status:"published"}),
    Enquiry.countDocuments({}),Enquiry.countDocuments({status:"new"}),
    Invoice.countDocuments({status:{$ne:"cancelled"}}),Invoice.aggregate([{$match:{status:{$ne:"cancelled"}}},{$group:{_id:null,value:{$sum:"$amountPaid"}}}]),
  ]);
  const revenue=Number(revenueAgg[0]?.value||0);
  const cards=[
    {label:"Tour Packages",value:totalPackages,detail:`${publishedPackages} published`,icon:PackageCheck,href:"/admin/tour-packages"},
    {label:"Taxi Services",value:totalTaxi,detail:`${publishedTaxi} published`,icon:CarFront,href:"/admin/taxi-services"},
    {label:"Destinations",value:totalDestinations,detail:`${publishedDestinations} published`,icon:MapPinned,href:"/admin/destinations"},
    {label:"Fleet",value:totalFleet,detail:`${publishedFleet} published`,icon:CarFront,href:"/admin/fleet"},
    {label:"Gallery",value:totalGallery,detail:`${publishedGallery} published`,icon:GalleryHorizontal,href:"/admin/gallery"},
    {label:"Enquiries",value:totalEnquiries,detail:`${newEnquiries} new`,icon:MessageSquareText,href:"/admin/enquiries"},
    {label:"Billing",value:totalInvoices,detail:`₹${revenue.toLocaleString("en-IN")} received`,icon:ReceiptIndianRupee,href:"/admin/billing"},
    {label:"Analytics",value:"Live",detail:"Enquiries + billing insights",icon:BarChart3,href:"/admin/analytics"},
  ];
  return <div className="space-y-7">
    <section><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6b3a]">Overview</p><h1 className="mt-1 text-3xl font-black md:text-4xl">Admin Dashboard</h1><p className="mt-2 max-w-2xl text-[#6d806f]">Content, enquiries, billing and performance analytics now share the same protected admin foundation.</p></section>
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cards.map(card=>{const Icon=card.icon;return <Link href={card.href} key={card.label} className="rounded-2xl border border-[#143124]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"><div className="flex items-start justify-between"><div className="grid size-11 place-items-center rounded-xl bg-[#eef5df] text-[#0b6b3a]"><Icon className="size-5"/></div><ArrowUpRight className="size-4 text-[#9aaa9b]"/></div><p className="mt-6 text-3xl font-black">{card.value}</p><p className="mt-1 font-semibold">{card.label}</p><p className="mt-1 text-sm text-[#7b8d7e]">{card.detail}</p></Link>})}</section>
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <article className="rounded-2xl border border-[#143124]/10 bg-white p-5 md:p-6"><h2 className="text-xl font-black">Admin modules</h2><p className="mb-5 text-sm text-[#7b8d7e]">The operational admin is now focused on content, leads, finance and reporting.</p><div className="grid gap-3 sm:grid-cols-2">{modules.map((module,index)=><div key={module} className="flex items-center gap-3 rounded-xl border border-[#143124]/8 bg-[#f8faf6] px-4 py-3"><span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-black ${index<8?"bg-[#b3df24] text-[#073b25]":"bg-[#e8eee8] text-[#6d806f]"}`}>{index+1}</span><div><p className="text-sm font-semibold">{module}</p><p className="text-xs text-[#8a998c]">{index<8?"Live":"Queued"}</p></div></div>)}</div></article>
      <article className="rounded-2xl border border-[#143124]/10 bg-white p-5 md:p-6"><div className="flex items-center gap-2"><Activity className="size-5 text-[#0b6b3a]"/><h2 className="text-xl font-black">Recent activity</h2></div><p className="mb-5 text-sm text-[#7b8d7e]">Security, CMS, enquiry and billing actions are recorded automatically.</p><div className="space-y-3">{recentActivity.length?recentActivity.map(item=><div key={item._id.toString()} className="rounded-xl border border-[#143124]/8 px-4 py-3"><div className="flex items-start gap-3"><span className="mt-1.5 size-2 rounded-full bg-[#82aa16]"/><div><p className="text-sm font-semibold">{String(item.action)}</p><p className="text-xs text-[#7b8d7e]">{String(item.adminName||"System")} · {new Date(item.createdAt as Date).toLocaleString("en-IN")}</p></div></div></div>):<div className="rounded-xl bg-[#f8faf6] p-5 text-sm text-[#7b8d7e]">No activity has been recorded yet.</div>}</div></article>
    </section>
  </div>;
}
