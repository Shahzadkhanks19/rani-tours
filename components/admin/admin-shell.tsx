"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Building2,
  CarFront,
  ChevronRight,
  CircleUserRound,
  FileText,
  GalleryHorizontal,
  Gauge,
  LogOut,
  MapPinned,
  Menu,
  MessageSquareText,
  Settings,
  Star,
  Tags,
  Users,
  X,
} from "lucide-react";

type AdminShellProps = {
  admin: { name: string; email: string; role: "super_admin" | "admin" };
  children: React.ReactNode;
};

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Gauge, ready: true },
  { href: "/admin/tour-packages", label: "Tour Packages", icon: MapPinned, ready: true },
  { href: "/admin/taxi-services", label: "Taxi Services", icon: CarFront, ready: true },
  { href: "/admin/destinations", label: "Destinations", icon: Building2, ready: true },
  { href: "/admin/fleet", label: "Fleet", icon: CarFront },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquareText },
  { href: "/admin/bookings", label: "Bookings", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/coupons", label: "Coupons", icon: Tags },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/activity", label: "Activity", icon: Activity, ready: true },
  { href: "/admin/settings", label: "Settings", icon: Settings, ready: true },
];

export function AdminShell({ admin, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7f2] text-[#143124]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-[290px] transform bg-[#073b25] text-white transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="grid size-10 place-items-center rounded-xl bg-[#b3df24] font-black text-[#073b25]">RT</div>
            <div><p className="font-bold leading-none">Rani Tours</p><p className="mt-1 text-xs text-white/55">Admin CMS</p></div>
          </Link>
          <button className="rounded-lg p-2 hover:bg-white/10 lg:hidden" onClick={() => setOpen(false)} aria-label="Close admin navigation"><X className="size-5" /></button>
        </div>
        <nav className="h-[calc(100vh-164px)] overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return <Link key={item.href} href={item.ready ? item.href : "/admin/dashboard"} onClick={() => setOpen(false)} className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-[#b3df24] font-semibold text-[#073b25]" : "text-white/75 hover:bg-white/8 hover:text-white"}`} title={item.ready ? item.label : `${item.label} — coming in the next CMS phases`}><Icon className="size-[18px] shrink-0"/><span className="flex-1">{item.label}</span>{!item.ready && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">Soon</span>}{active && <ChevronRight className="size-4"/>}</Link>;
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#073b25] p-3"><button onClick={logout} disabled={loggingOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/75 transition hover:bg-white/8 hover:text-white disabled:opacity-60"><LogOut className="size-[18px]"/>{loggingOut ? "Signing out…" : "Sign out"}</button></div>
      </aside>
      {open && <button className="fixed inset-0 z-40 bg-black/45 lg:hidden" onClick={() => setOpen(false)} aria-label="Close admin navigation overlay"/>}
      <div className="lg:pl-[290px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#143124]/10 bg-white/90 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3"><button className="rounded-xl border border-[#143124]/10 p-2.5 lg:hidden" onClick={() => setOpen(true)} aria-label="Open admin navigation"><Menu className="size-5"/></button><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d806f]">Control Center</p><p className="font-bold">Rani Tours CMS</p></div></div>
          <div className="flex items-center gap-3 rounded-xl border border-[#143124]/10 bg-[#f8faf6] px-3 py-2"><CircleUserRound className="size-8 text-[#0b6b3a]"/><div className="hidden sm:block"><p className="text-sm font-semibold leading-tight">{admin.name}</p><p className="text-xs text-[#6d806f]">{admin.role === "super_admin" ? "Super Admin" : "Admin"}</p></div></div>
        </header>
        <main className="p-4 md:p-7">{children}</main>
      </div>
    </div>
  );
}
