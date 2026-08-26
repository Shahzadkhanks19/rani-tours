import { Schema, model, models, type InferSchemaType } from "mongoose";

const adminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["super_admin", "admin"], default: "admin" },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
    passwordChangedAt: { type: Date, default: null },
    resetPasswordTokenHash: { type: String, default: null, select: false },
    resetPasswordExpiresAt: { type: Date, default: null, select: false },
  },
  { timestamps: true }
);

adminUserSchema.index({ email: 1 }, { unique: true });

export type AdminUserDocument = InferSchemaType<typeof adminUserSchema> & {
  _id: { toString(): string };
};

export const AdminUser = models.AdminUser || model("AdminUser", adminUserSchema);
