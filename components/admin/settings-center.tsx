"use client";

import { useState } from "react";
import { Building2, CheckCircle2, CircleDollarSign, Globe2, Mail, Save, ShieldCheck, UserRound } from "lucide-react";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

type Settings = {
  business: { name: string; tagline: string; address: string; primaryPhone: string; secondaryPhone: string; email: string; whatsapp: string; mapsUrl: string };
  social: { instagram: string; facebook: string; youtube: string };
  billing: { defaultTaxRate: number; invoicePrefix: string; defaultSignatoryName: string; declaration: string; footerNote: string };
  enquiry: { notificationEmail: string };
};
type Props = {
  admin: { name: string; email: string; role: "super_admin" | "admin" };
  initialSettings: Settings;
  integrations: { mongo: boolean; resend: boolean; cloudinary: boolean; sessionSecret: boolean };
};

type Tab = "business" | "billing" | "website" | "security";
const input = "h-11 w-full rounded-xl border border-[#143124]/10 bg-white px-3 text-sm outline-none transition focus:border-[#0b6b3a] focus:ring-2 focus:ring-[#0b6b3a]/10";
const textarea = "min-h-24 w-full rounded-xl border border-[#143124]/10 bg-white p-3 text-sm outline-none transition focus:border-[#0b6b3a] focus:ring-2 focus:ring-[#0b6b3a]/10";

export function SettingsCenter({ admin, initialSettings, integrations }: Props) {
  const [tab, setTab] = useState<Tab>("business");
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const setBusiness = (key: keyof Settings["business"], value: string) => setSettings((s) => ({ ...s, business: { ...s.business, [key]: value } }));
  const setSocial = (key: keyof Settings["social"], value: string) => setSettings((s) => ({ ...s, social: { ...s.social, [key]: value } }));
  const setBilling = <K extends keyof Settings["billing"]>(key: K, value: Settings["billing"][K]) => setSettings((s) => ({ ...s, billing: { ...s.billing, [key]: value } }));
  const setEnquiry = (key: keyof Settings["enquiry"], value: string) => setSettings((s) => ({ ...s, enquiry: { ...s.enquiry, [key]: value } }));

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save settings.");
      setSettings(data.settings);
      setMessage({ type: "ok", text: "Settings saved successfully." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not save settings." });
    } finally {
      setSaving(false);
    }
  }

  const tabs: Array<{ id: Tab; label: string; icon: typeof Building2 }> = [
    { id: "business", label: "Business", icon: Building2 },
    { id: "billing", label: "Billing", icon: CircleDollarSign },
    { id: "website", label: "Website", icon: Globe2 },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  return <div className="space-y-6">
    <section className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#0b6b3a]">Configuration</p><h1 className="mt-1 text-3xl font-black md:text-4xl">Settings</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#6d806f]">Manage the global business identity, invoice defaults, website contact details and administrator security.</p></div>{tab !== "security" && <button disabled={saving} onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-[#0b6b3a] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#084f2d] disabled:opacity-60"><Save className="size-4"/>{saving ? "Saving…" : "Save Changes"}</button>}</section>
    {message && <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${message.type === "ok" ? "border-[#b8d7b2] bg-[#f0f8ee] text-[#176434]" : "border-red-200 bg-red-50 text-red-700"}`}>{message.text}</div>}
    <section className="grid gap-6 xl:grid-cols-[230px_1fr]"><aside className="h-fit rounded-2xl border border-[#143124]/10 bg-white p-2">{tabs.map((item) => { const Icon = item.icon; const active = tab === item.id; return <button key={item.id} onClick={() => { setTab(item.id); setMessage(null); }} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition last:mb-0 ${active ? "bg-[#eef5df] text-[#0b6b3a]" : "text-[#667468] hover:bg-[#f7f9f5]"}`}><Icon className="size-4"/>{item.label}</button>; })}</aside>
      <div>{tab === "business" && <Business settings={settings} setBusiness={setBusiness}/>} {tab === "billing" && <Billing settings={settings} setBilling={setBilling}/>} {tab === "website" && <Website settings={settings} setSocial={setSocial} setEnquiry={setEnquiry} integrations={integrations}/>} {tab === "security" && <Security admin={admin}/>}</div>
    </section>
  </div>;
}

function Business({ settings, setBusiness }: { settings: Settings; setBusiness: (key: keyof Settings["business"], value: string) => void }) {
  return <Card title="Business Identity" description="These details are used by the billing system and will become the website-wide source of truth when public pages are connected to the CMS."><div className="grid gap-4 md:grid-cols-2"><Field label="Business Name *"><input className={input} value={settings.business.name} onChange={(e) => setBusiness("name", e.target.value)}/></Field><Field label="Tagline"><input className={input} value={settings.business.tagline} onChange={(e) => setBusiness("tagline", e.target.value)}/></Field><Field label="Primary Phone *"><input className={input} value={settings.business.primaryPhone} onChange={(e) => setBusiness("primaryPhone", e.target.value)}/></Field><Field label="Secondary Phone"><input className={input} value={settings.business.secondaryPhone} onChange={(e) => setBusiness("secondaryPhone", e.target.value)}/></Field><Field label="Business Email *"><input className={input} type="email" value={settings.business.email} onChange={(e) => setBusiness("email", e.target.value)}/></Field><Field label="WhatsApp Link"><input className={input} value={settings.business.whatsapp} onChange={(e) => setBusiness("whatsapp", e.target.value)} placeholder="https://wa.me/..."/></Field><Field label="Office Address" className="md:col-span-2"><textarea className={textarea} value={settings.business.address} onChange={(e) => setBusiness("address", e.target.value)}/></Field><Field label="Google Maps Link" className="md:col-span-2"><input className={input} value={settings.business.mapsUrl} onChange={(e) => setBusiness("mapsUrl", e.target.value)}/></Field></div></Card>;
}

function Billing({ settings, setBilling }: { settings: Settings; setBilling: <K extends keyof Settings["billing"]>(key: K, value: Settings["billing"][K]) => void }) {
  return <div className="space-y-5"><Card title="Invoice Defaults" description="Defaults applied when creating new invoices. Tax remains mandatory on every invoice."><div className="grid gap-4 md:grid-cols-3"><Field label="Default Tax % *"><input className={input} type="number" min="0.01" max="100" step="0.01" value={settings.billing.defaultTaxRate} onChange={(e) => setBilling("defaultTaxRate", Number(e.target.value))}/></Field><Field label="Invoice Prefix"><input className={input} maxLength={12} value={settings.billing.invoicePrefix} onChange={(e) => setBilling("invoicePrefix", e.target.value.toUpperCase())}/></Field><Field label="Default Signatory"><input className={input} value={settings.billing.defaultSignatoryName} onChange={(e) => setBilling("defaultSignatoryName", e.target.value)}/></Field></div></Card><Card title="Invoice Wording" description="Control the declaration and footer language used on branded invoices."><div className="grid gap-4"><Field label="Declaration"><textarea className={textarea} value={settings.billing.declaration} onChange={(e) => setBilling("declaration", e.target.value)}/></Field><Field label="Footer Note"><input className={input} value={settings.billing.footerNote} onChange={(e) => setBilling("footerNote", e.target.value)}/></Field></div></Card></div>;
}

function Website({ settings, setSocial, setEnquiry, integrations }: { settings: Settings; setSocial: (key: keyof Settings["social"], value: string) => void; setEnquiry: (key: keyof Settings["enquiry"], value: string) => void; integrations: Props["integrations"] }) {
  return <div className="space-y-5"><Card title="Lead Notifications" description="Where internal enquiry notifications should be delivered when email notifications are enabled."><Field label="Notification Email"><input className={input} type="email" value={settings.enquiry.notificationEmail} onChange={(e) => setEnquiry("notificationEmail", e.target.value)}/></Field></Card><Card title="Social Profiles" description="Central links for the website footer, contact areas and future structured data."><div className="grid gap-4 md:grid-cols-2"><Field label="Instagram"><input className={input} value={settings.social.instagram} onChange={(e) => setSocial("instagram", e.target.value)}/></Field><Field label="Facebook"><input className={input} value={settings.social.facebook} onChange={(e) => setSocial("facebook", e.target.value)}/></Field><Field label="YouTube"><input className={input} value={settings.social.youtube} onChange={(e) => setSocial("youtube", e.target.value)}/></Field></div></Card><Card title="Integration Health" description="Configuration status only. Secrets remain in environment variables and are never exposed in the browser."><div className="grid gap-3 sm:grid-cols-2"><Integration name="MongoDB" ok={integrations.mongo}/><Integration name="Resend Email" ok={integrations.resend}/><Integration name="Cloudinary" ok={integrations.cloudinary}/><Integration name="Admin Session Secret" ok={integrations.sessionSecret}/></div></Card></div>;
}

function Security({ admin }: { admin: Props["admin"] }) {
  return <div className="space-y-5"><Card title="Administrator Profile" description="Authenticated CMS identity for this session."><div className="grid gap-4 sm:grid-cols-3"><Profile label="Name" value={admin.name}/><Profile label="Email" value={admin.email}/><Profile label="Role" value={admin.role === "super_admin" ? "Super Admin" : "Admin"}/></div></Card><Card title="Change Password" description="Use a strong password that is unique to this CMS."><ChangePasswordForm/></Card></div>;
}

function Card({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <section className="rounded-2xl border border-[#143124]/10 bg-white p-5 md:p-6"><h2 className="text-xl font-black">{title}</h2><p className="mb-5 mt-1 text-sm leading-6 text-[#748176]">{description}</p>{children}</section>; }
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) { return <label className={`block text-xs font-bold text-[#405044] ${className}`}>{label}<div className="mt-1.5">{children}</div></label>; }
function Profile({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-[#f7f9f5] p-4"><div className="flex items-center gap-2 text-[#0b6b3a]"><UserRound className="size-4"/><p className="text-[10px] font-black uppercase tracking-[.13em]">{label}</p></div><p className="mt-2 break-words text-sm font-bold">{value}</p></div>; }
function Integration({ name, ok }: { name: string; ok: boolean }) { return <div className="flex items-center justify-between rounded-xl border border-[#143124]/8 bg-[#fafcf8] px-4 py-3"><div className="flex items-center gap-2"><Mail className="size-4 text-[#78857a]"/><span className="text-sm font-semibold">{name}</span></div><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${ok ? "bg-[#e8f6e5] text-[#176a32]" : "bg-[#fde8e5] text-[#a2382c]"}`}><CheckCircle2 className="size-3"/>{ok ? "Ready" : "Missing"}</span></div>; }
