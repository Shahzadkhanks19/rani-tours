import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({ url: { type: String, required: true }, publicId: { type: String, default: "" }, alt: { type: String, default: "" } }, { _id: false });
const ItineraryStopSchema = new Schema({ time: { type: String, default: "" }, title: { type: String, required: true } }, { _id: false });
const ItineraryDaySchema = new Schema({ day: { type: Number, required: true }, title: { type: String, required: true }, description: { type: String, default: "" }, image: { type: ImageSchema, default: null }, stops: { type: [ItineraryStopSchema], default: [] } }, { _id: false });
const FaqSchema = new Schema({ question: { type: String, required: true }, answer: { type: String, required: true } }, { _id: false });

const TourPackageSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  category: { type: String, required: true, trim: true, index: true },
  location: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, trim: true },
  overview: { type: String, default: "" },
  heroImage: { type: ImageSchema, required: true },
  gallery: { type: [ImageSchema], default: [] },
  durationDays: { type: Number, required: true, min: 1 },
  durationNights: { type: Number, required: true, min: 0 },
  approximateDistanceKm: { type: Number, default: 0, min: 0 },
  popularAttractions: { type: Number, default: 0, min: 0 },
  tourType: { type: String, default: "Private Tour" },
  flexibleItinerary: { type: Boolean, default: true },
  customizable: { type: Boolean, default: true },
  startingPrice: { type: Number, required: true, min: 0 },
  priceUnit: { type: String, default: "Per Car" },
  priceNote: { type: String, default: "Price may vary based on vehicle type, season and availability." },
  highlights: { type: [String], default: [] },
  itinerary: { type: [ItineraryDaySchema], default: [] },
  itineraryNote: { type: String, default: "This is a suggested itinerary. You can customize it according to your preferences." },
  inclusions: { type: [String], default: [] },
  exclusions: { type: [String], default: [] },
  faq: { type: [FaqSchema], default: [] },
  relatedPackageIds: { type: [Schema.Types.ObjectId], ref: "TourPackage", default: [] },
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

TourPackageSchema.index({ title: "text", shortDescription: "text", location: "text", category: "text" });

export const TourPackage = models.TourPackage || model("TourPackage", TourPackageSchema);
