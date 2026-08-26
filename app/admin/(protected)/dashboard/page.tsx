import Link from "next/link";
import { Activity, ArrowUpRight, Database, Layers3, PackageCheck, ShieldCheck } from "lucide-react";
import { connectToDatabase } from "@/lib/db";
import { ActivityLog } from "@/models/ActivityLog";
import { TourPackage } from "@/models/TourPackage";

const modules = ["Tour Packages","Taxi Services","Destinations","Fleet","Gallery","Blog","Reviews","Enquiries","Bookings","Users","Coupons","SEO Manager"];

export default async function AdminDashboardPage() {
  await connectToDatabase();
  const [recentActivity,totalPackages,publishedPackages] = await Promise.all([
    ActivityLog.find({}).sort({ createdAt: -1 }).limit(6).lean(),
    TourPackage.countDocuments({}),
    TourPackage.countDocuments({ status: "published" }),
  ]);

  return <div className="space-y-7">
    <section><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6b3a]">Overview</p><h1 className="mt-1 text-3xl font-black md:text-4xl">Admin Dashboard</h1><p className="mt-2 max-w-2xl text-[#6d806f]">Tour Packages CMS is live. Additional content modules will plug into the same protected admin foundation.</p></section>
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[{label:"Tour Packages",value:totalPackages,detail:`${publishedPackages} published`,icon:PackageCheck},{label:"CMS Modules",value:modules.length,detail:"Planned content areas",icon:Layers3},{label:"Database",value:"Online",detail:"MongoDB connection ready",icon:Database},{label:"Admin Security",value:"Active",detail:"Signed HttpOnly sessions",icon:ShieldCheck}].map((card)=>{const Icon=card.icon;return <article key={card.label} className="rounded-2xl border border-[#143124]/10 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className="grid size-11 place-items-center rounded-xl bg-[#eef5df] text-[#0b6b3a]"><Icon className="size-5"/></div><ArrowUpRight className="size-4 text-[#9aaa9b]"/></div><p className="mt-6 text-3xl font-black">{card.value}</p><p className="mt-1 font-semibold">{card.label}</p><p className="mt-1 text-sm text-[#7b8d7e]">{card.detail}</p></article>})}
    </section>
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <article className="rounded-2xl border border-[#143124]/10 bg-white p-5 md:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-black">CMS roadmap</h2><p className="text-sm text-[#7b8d7e]">Modules become active without changing the dashboard shell.</p></div><Link href="/admin/tour-packages" className="text-sm font-bold text-[#0b6b3a]">Manage packages →</Link></div><div className="grid gap-3 sm:grid-cols-2">{modules.map((module,index)=><div key={module} className="flex items-center gap-3 rounded-xl border border-[#143124]/8 bg-[#f8faf6] px-4 py-3"><span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-black ${index===0?"bg-[#b3df24] text-[#073b25]":"bg-[#e8eee8] text-[#6d806f]"}`}>{index+1}</span><div><p className="text-sm font-semibold">{module}</p><p className="text-xs text-[#8a998c]">{index===0?"Live":"Queued"}</p></div></div>)}</div></article>
      <article className="rounded-2xl border border-[#143124]/10 bg-white p-5 md:p-6"><div className="flex items-center gap-2"><Activity className="size-5 text-[#0b6b3a]"/><h2 className="text-xl font-black">Recent activity</h2></div><p className="mb-5 text-sm text-[#7b8d7e]">Security and CMS actions are recorded automatically.</p><div className="space-y-3">{recentActivity.length?recentActivity.map((item)=><div key={item._id.toString()} className="rounded-xl border border-[#143124]/8 px-4 py-3"><div className="flex items-start gap-3"><span className="mt-1.5 size-2 rounded-full bg-[#82aa16]"/><div><p className="text-sm font-semibold">{String(item.action)}</p><p className="text-xs text-[#7b8d7e]">{String(item.adminName||"System")} · {new Date(item.createdAt as Date).toLocaleString("en-IN")}</p></div></div></div>):<div className="rounded-xl bg-[#f8faf6] p-5 text-sm text-[#7b8d7e]">No activity has been recorded yet.</div>}</div></article>
    </section>
  </div>;
}
