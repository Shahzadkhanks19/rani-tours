import { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true, index: true },
    business: {
      name: { type: String, default: "Rani Tour's" },
      tagline: { type: String, default: "Your Tour Expert" },
      address: { type: String, default: "" },
      primaryPhone: { type: String, default: "" },
      secondaryPhone: { type: String, default: "" },
      email: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      mapsUrl: { type: String, default: "" },
    },
    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    billing: {
      defaultTaxRate: { type: Number, min: 0.01, default: 5 },
      invoicePrefix: { type: String, default: "RT" },
      defaultSignatoryName: { type: String, default: "Authorized Signatory" },
      declaration: { type: String, default: "This invoice records the travel service provided by Rani Tour's. Toll and parking are charged separately only when marked as extra. Tax is calculated on the taxable invoice amount." },
      footerNote: { type: String, default: "Thank you for choosing Rani Tour's" },
    },
    enquiry: {
      notificationEmail: { type: String, default: "" },
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null },
  },
  { timestamps: true }
);

export const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
