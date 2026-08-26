import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/admin/admin-recovery-forms";

export const metadata: Metadata = { title: "Forgot Admin Password" };

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f2] p-5">
      <section className="w-full max-w-md rounded-[28px] border border-[#143124]/10 bg-white p-6 shadow-[0_24px_80px_rgba(20,49,36,0.10)] sm:p-9">
        <div className="mb-7 grid size-11 place-items-center rounded-xl bg-[#b3df24] font-black text-[#073b25]">RT</div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b3a]">Admin Security</p>
        <h1 className="mt-2 text-3xl font-black">Reset access</h1>
        <p className="mb-8 mt-2 text-sm leading-6 text-[#6d806f]">Enter your administrator email and we’ll send a secure reset link if the account exists.</p>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
