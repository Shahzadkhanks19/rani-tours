import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/admin/admin-recovery-forms";

export const metadata: Metadata = { title: "Reset Admin Password" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f2] p-5">
      <section className="w-full max-w-md rounded-[28px] border border-[#143124]/10 bg-white p-6 shadow-[0_24px_80px_rgba(20,49,36,0.10)] sm:p-9">
        <div className="mb-7 grid size-11 place-items-center rounded-xl bg-[#b3df24] font-black text-[#073b25]">RT</div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b6b3a]">Admin Security</p>
        <h1 className="mt-2 text-3xl font-black">Choose a new password</h1>
        <p className="mb-8 mt-2 text-sm leading-6 text-[#6d806f]">Set a strong password for your Rani Tours administrator account.</p>
        <ResetPasswordForm token={token} />
      </section>
    </main>
  );
}
