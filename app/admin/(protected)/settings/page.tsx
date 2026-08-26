import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { requireAdminPage } from "@/lib/admin-auth";

export default async function AdminSettingsPage() {
  const admin = await requireAdminPage();
  return (
    <div className="space-y-7">
      <section><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6b3a]">Account</p><h1 className="mt-1 text-3xl font-black">Settings</h1><p className="mt-2 text-[#6d806f]">Manage your administrator account and security.</p></section>
      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-2xl border border-[#143124]/10 bg-white p-6"><h2 className="text-xl font-black">Profile</h2><div className="mt-5 space-y-4 text-sm"><div><p className="text-[#7b8d7e]">Name</p><p className="font-semibold">{admin.name}</p></div><div><p className="text-[#7b8d7e]">Email</p><p className="font-semibold">{admin.email}</p></div><div><p className="text-[#7b8d7e]">Role</p><p className="font-semibold">{admin.role === "super_admin" ? "Super Admin" : "Admin"}</p></div></div></article>
        <article className="rounded-2xl border border-[#143124]/10 bg-white p-6"><h2 className="text-xl font-black">Change password</h2><p className="mb-5 mt-1 text-sm text-[#7b8d7e]">Update your password without leaving the CMS.</p><ChangePasswordForm /></article>
      </section>
    </div>
  );
}
