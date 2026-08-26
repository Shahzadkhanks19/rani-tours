import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getCurrentAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin/dashboard");

  return (
    <main className="grid min-h-screen bg-[#f4f7f2] lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden bg-[#073b25] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#b3df24] font-black text-[#073b25]">RT</div>
          <div><p className="text-xl font-bold">Rani Tours</p><p className="text-sm text-white/55">Administration</p></div>
        </div>
        <div className="max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75"><ShieldCheck className="size-4 text-[#b3df24]" /> Secure administration</p>
          <h1 className="text-5xl font-black leading-[1.05]">Manage Rani Tours from one secure place.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/60">Manage tour packages, taxi services, destinations, fleet, enquiries, billing, analytics and website settings.</p>
        </div>
        <p className="text-sm text-white/40">Authorized administrators only.</p>
      </section>

      <section className="flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-md rounded-[28px] border border-[#143124]/10 bg-white p-6 shadow-[0_24px_80px_rgba(20,49,36,0.10)] sm:p-9">
          <div className="mb-8 lg:hidden"><div className="grid size-11 place-items-center rounded-xl bg-[#b3df24] font-black text-[#073b25]">RT</div></div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b3a]">Administration</p>
          <h2 className="mt-2 text-3xl font-black">Welcome back</h2>
          <p className="mb-8 mt-2 text-sm leading-6 text-[#6d806f]">Sign in with your administrator account to continue.</p>
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
