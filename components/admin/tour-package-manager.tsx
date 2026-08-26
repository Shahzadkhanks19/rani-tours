"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Edit3, Eye, Plus, Search, Star, Trash2 } from "lucide-react";

type PackageItem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  startingPrice: number;
  durationDays: number;
  durationNights: number;
  status: "draft" | "published";
  featured: boolean;
  heroImage?: { url?: string };
  updatedAt: string;
};

export function TourPackageManager() {
  const [items, setItems] = useState<PackageItem[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true); setError("");
    const params = new URLSearchParams({ limit: "50", status });
    if (search.trim()) params.set("search", search.trim());
    try {
      const res = await fetch(`/api/admin/tour-packages?${params.toString()}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to load tour packages.");
      setItems(data.items || []);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to load tour packages."); }
    finally { setLoading(false); }
  }

  useEffect(() => { const timer = window.setTimeout(load, 250); return () => window.clearTimeout(timer); }, [search, status]);

  async function remove(item: PackageItem) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/tour-packages/${item._id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return window.alert(data.error || "Unable to delete package.");
    setItems((current) => current.filter((entry) => entry._id !== item._id));
  }

  const counts = useMemo(() => ({ total: items.length, published: items.filter((x) => x.status === "published").length, drafts: items.filter((x) => x.status === "draft").length }), [items]);

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
      <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#68806f]">Content Management</p><h1 className="mt-1 text-3xl font-black">Tour Packages</h1><p className="mt-2 max-w-2xl text-sm text-[#68806f]">Manage package content used by the tour listing cards and future dynamic package-detail pages.</p></div>
      <Link href="/admin/tour-packages/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b6b3a] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#07572f]"><Plus className="size-4"/> Add Tour Package</Link>
    </div>

    <div className="grid gap-3 sm:grid-cols-3">
      {[['Total packages', counts.total], ['Published', counts.published], ['Drafts', counts.drafts]].map(([label,value]) => <div key={String(label)} className="rounded-2xl border border-[#143124]/10 bg-white p-5"><p className="text-sm text-[#68806f]">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}
    </div>

    <div className="rounded-2xl border border-[#143124]/10 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68806f]"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search packages, locations or categories…" className="w-full rounded-xl border border-[#143124]/15 bg-[#f8faf6] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#0b6b3a]"/></label>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="rounded-xl border border-[#143124]/15 bg-[#f8faf6] px-4 py-3 text-sm outline-none"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select>
      </div>
    </div>

    {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
    {loading ? <div className="rounded-2xl border border-[#143124]/10 bg-white p-10 text-center text-sm text-[#68806f]">Loading tour packages…</div> : items.length === 0 ? <div className="rounded-2xl border border-dashed border-[#143124]/20 bg-white p-12 text-center"><h2 className="font-bold">No tour packages found</h2><p className="mt-2 text-sm text-[#68806f]">Create your first package or adjust the current filters.</p></div> :
      <div className="overflow-hidden rounded-2xl border border-[#143124]/10 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left text-sm"><thead className="bg-[#f6f8f4] text-xs uppercase tracking-wide text-[#68806f]"><tr><th className="px-5 py-4">Package</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Duration</th><th className="px-5 py-4">Price</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody>{items.map((item)=><tr key={item._id} className="border-t border-[#143124]/8 hover:bg-[#fbfcfa]"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="size-14 overflow-hidden rounded-xl bg-[#eef3ea]">{item.heroImage?.url ? <img src={item.heroImage.url} alt="" className="h-full w-full object-cover"/>:null}</div><div><div className="flex items-center gap-2"><p className="font-bold">{item.title}</p>{item.featured && <Star className="size-4 fill-amber-400 text-amber-400"/>}</div><p className="mt-1 text-xs text-[#68806f]">{item.location} · /{item.slug}</p></div></div></td><td className="px-5 py-4">{item.category}</td><td className="px-5 py-4">{item.durationDays}D / {item.durationNights}N</td><td className="px-5 py-4 font-semibold">₹{Number(item.startingPrice||0).toLocaleString('en-IN')}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.status==='published'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{item.status}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2">{item.status==='published' && <a href={`/tour-packages/${item.slug}`} target="_blank" rel="noreferrer" className="rounded-lg border border-[#143124]/10 p-2 hover:bg-[#f3f6f1]" title="Preview"><Eye className="size-4"/></a>}<Link href={`/admin/tour-packages/${item._id}`} className="rounded-lg border border-[#143124]/10 p-2 hover:bg-[#f3f6f1]" title="Edit"><Edit3 className="size-4"/></Link><button onClick={()=>remove(item)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50" title="Delete"><Trash2 className="size-4"/></button></div></td></tr>)}</tbody></table></div></div>}
  </div>;
}
