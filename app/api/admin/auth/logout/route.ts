import { clearAdminSession, getCurrentAdmin, logAdminActivity } from "@/lib/admin-auth";
import { enforceSameOrigin,jsonNoStore } from "@/lib/security";

export const runtime="nodejs";

export async function POST(request:Request){const originError=enforceSameOrigin(request);if(originError)return originError;const admin=await getCurrentAdmin();if(admin)await logAdminActivity({adminId:admin.id,adminName:admin.name,action:"Signed out",entity:"authentication"});await clearAdminSession();return jsonNoStore({success:true});}
