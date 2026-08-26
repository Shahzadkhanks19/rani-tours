import { connectToDatabase } from "@/lib/db";
import { siteContact } from "@/lib/site-data";
import { SiteSettings } from "@/models/SiteSettings";

export const defaultSiteSettings = {
  business: {
    name: "Rani Tour's",
    tagline: "Your Tour Expert",
    address: siteContact.address,
    primaryPhone: siteContact.phones[0].display,
    secondaryPhone: siteContact.phones[1].display,
    email: siteContact.email,
    whatsapp: siteContact.whatsapp,
    mapsUrl: siteContact.mapsUrl,
  },
  social: { instagram: "", facebook: "", youtube: "" },
  billing: {
    defaultTaxRate: 5,
    invoicePrefix: "RT",
    defaultSignatoryName: "Authorized Signatory",
    declaration: "This invoice records the travel service provided by Rani Tour's. Toll and parking are charged separately only when marked as extra. Tax is calculated on the taxable invoice amount.",
    footerNote: "Thank you for choosing Rani Tour's",
  },
  enquiry: { notificationEmail: siteContact.email },
};

export async function getSiteSettings() {
  await connectToDatabase();
  const item = await SiteSettings.findOne({ key: "main" }).lean();
  if (!item) return defaultSiteSettings;
  return {
    business: { ...defaultSiteSettings.business, ...(item.business || {}) },
    social: { ...defaultSiteSettings.social, ...(item.social || {}) },
    billing: { ...defaultSiteSettings.billing, ...(item.billing || {}) },
    enquiry: { ...defaultSiteSettings.enquiry, ...(item.enquiry || {}) },
  };
}
