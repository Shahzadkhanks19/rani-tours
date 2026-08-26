import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const admin = await requireAdminPage();
  return <AdminShell admin={admin}>{children}</AdminShell>;
}
