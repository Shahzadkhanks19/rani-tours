import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String, default: "" },
  alt: { type: String, required: true, trim: true },
}, { _id: false });

const GalleryItemSchema = new Schema({
  title: { type: String, default: "", trim: true },
  category: { type: String, enum: ["Destinations", "Vehicles", "Happy Travelers", "Travel Moments", "Events"], required: true, index: true },
  image: { type: ImageSchema, required: true },
  caption: { type: String, default: "" },
  location: { type: String, default: "" },
  destinationId: { type: Schema.Types.ObjectId, ref: "Destination", default: null },
  fleetId: { type: Schema.Types.ObjectId, ref: "FleetVehicle", default: null },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  sortOrder: { type: Number, default: 0 },
  publishedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null },
  updatedBy: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null },
}, { timestamps: true });

GalleryItemSchema.index({ title: "text", caption: "text", location: "text", "image.alt": "text" });

export const GalleryItem = models.GalleryItem || model("GalleryItem", GalleryItemSchema);
