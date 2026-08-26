import { SettingsCenter } from "@/components/admin/settings-center";
import { requireAdminPage } from "@/lib/admin-auth";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [admin, settings] = await Promise.all([requireAdminPage(), getSiteSettings()]);
  const integrations = {
    mongo: Boolean(process.env.MONGODB_URI),
    resend: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL),
    cloudinary: Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
    sessionSecret: Boolean(process.env.ADMIN_JWT_SECRET && process.env.ADMIN_JWT_SECRET.length >= 32),
  };
  return <SettingsCenter admin={admin} initialSettings={JSON.parse(JSON.stringify(settings))} integrations={integrations}/>;
}
