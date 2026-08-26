import { Schema, model, models } from "mongoose";

const activityLogSchema = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null },
    adminName: { type: String, trim: true, default: "System" },
    action: { type: String, required: true, trim: true, maxlength: 120 },
    entity: { type: String, required: true, trim: true, maxlength: 80 },
    entityId: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: null },
  },
  { timestamps: true }
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ entity: 1, createdAt: -1 });

export const ActivityLog = models.ActivityLog || model("ActivityLog", activityLogSchema);
