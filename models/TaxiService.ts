import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({ url: { type: String, required: true }, publicId: { type: String, default: "" }, alt: { type: String, default: "" } }, { _id: false });
const FeatureSchema = new Schema({ title: { type: String, required: true }, description: { type: String, default: "" }, icon: { type: String, default: "" } }, { _id: false });
const CardSchema = new Schema({ title: { type: String, required: true }, description: { type: String, default: "" }, image: { type: ImageSchema, default: null } }, { _id: false });
const RouteSchema = new Schema({ title: { type: String, required: true }, from: { type: String, default: "" }, to: { type: String, default: "" }, durationLabel: { type: String, default: "" }, startingPrice: { type: Number, default: 0 }, priceUnit: { type: String, default: "" }, image: { type: ImageSchema, default: null } }, { _id: false });
const FaqSchema = new Schema({ question: { type: String, required: true }, answer: { type: String, required: true } }, { _id: false });

const TaxiServiceSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  serviceType: { type: String, required: true, trim: true, index: true },
  pageTemplate: { type: String, enum: ["generic", "route", "airport", "round_trip", "local", "corporate", "wedding"], default: "generic" },
  tagline: { type: String, default: "" },
  shortDescription: { type: String, required: true, trim: true },
  overview: { type: String, default: "" },
  heroImage: { type: ImageSchema, required: true },
  gallery: { type: [ImageSchema], default: [] },
  origin: { type: String, default: "" },
  destination: { type: String, default: "" },
  distanceKm: { type: Number, default: 0, min: 0 },
  estimatedDuration: { type: String, default: "" },
  tripType: { type: String, default: "" },
  startingPrice: { type: Number, default: 0, min: 0 },
  priceUnit: { type: String, default: "" },
  priceNote: { type: String, default: "" },
  bookingForm: {
    title: { type: String, default: "Plan Your Ride" },
    showReturnDate: { type: Boolean, default: false },
    showTime: { type: Boolean, default: false },
    showTransferType: { type: Boolean, default: false },
    showFlightNumber: { type: Boolean, default: false },
    showVehicleType: { type: Boolean, default: true },
    showPassengers: { type: Boolean, default: true },
  },
  heroFeatures: { type: [FeatureSchema], default: [] },
  whyChooseFeatures: { type: [FeatureSchema], default: [] },
  serviceCards: { type: [CardSchema], default: [] },
  popularRoutes: { type: [RouteSchema], default: [] },
  useCases: { type: [CardSchema], default: [] },
  faq: { type: [FaqSchema], default: [] },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  sortOrder: { type: Number, default: 0 },
  publishedAt: { type: Date, default: null },
  seo: {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] },
    canonicalUrl: { type: String, default: "" },
    ogImage: { type: ImageSchema, default: null },
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null },
  updatedBy: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null },
}, { timestamps: true });

TaxiServiceSchema.index({ title: "text", shortDescription: "text", serviceType: "text", origin: "text", destination: "text" });

export const TaxiService = models.TaxiService || model("TaxiService", TaxiServiceSchema);
