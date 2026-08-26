import { InvoiceForm } from "@/components/admin/invoice-form";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage(){
  const settings = await getSiteSettings();
  return <InvoiceForm defaults={{ taxRate: settings.billing.defaultTaxRate, signatoryName: settings.billing.defaultSignatoryName }}/>;
}
