import { clearAdminSession, hashPassword, logAdminActivity, requireAdminApi, validatePasswordStrength, verifyPassword } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { enforceBodySize,enforceSameOrigin,getClientIp,hasJsonContentType,jsonNoStore } from "@/lib/security";
import { AdminUser } from "@/models/AdminUser";

export const runtime="nodejs";

export async function POST(request:Request){
 const originError=enforceSameOrigin(request);if(originError)return originError;const sizeError=enforceBodySize(request,12*1024);if(sizeError)return sizeError;if(!hasJsonContentType(request))return jsonNoStore({message:"Unsupported request format."},{status:415});
 const currentAdmin=await requireAdminApi();if(!currentAdmin)return jsonNoStore({message:"Unauthorized."},{status:401});
 const ip=await getClientIp();const limit=rateLimit(`admin-change-password:${currentAdmin.id}:${ip}`,6,30*60*1000);if(!limit.allowed)return jsonNoStore({message:"Too many password change attempts. Please try again later."},{status:429,headers:{"Retry-After":String(limit.retryAfterSeconds)}});
 let body:{currentPassword?:string;newPassword?:string};try{body=await request.json() as{currentPassword?:string;newPassword?:string}}catch{return jsonNoStore({message:"Invalid request."},{status:400})}
 const currentPassword=body.currentPassword||"",newPassword=body.newPassword||"";if(currentPassword.length<1||currentPassword.length>128||!validatePasswordStrength(newPassword))return jsonNoStore({message:"New password must be 12–128 characters and include uppercase, lowercase, number, and symbol."},{status:400});
 await connectToDatabase();const admin=await AdminUser.findById(currentAdmin.id).select("+passwordHash");if(!admin||!(await verifyPassword(currentPassword,admin.passwordHash)))return jsonNoStore({message:"Current password is incorrect."},{status:400});if(await verifyPassword(newPassword,admin.passwordHash))return jsonNoStore({message:"Choose a password different from your current password."},{status:400});
 admin.passwordHash=await hashPassword(newPassword);admin.passwordChangedAt=new Date();admin.resetPasswordTokenHash=null;admin.resetPasswordExpiresAt=null;await admin.save();await clearAdminSession();await logAdminActivity({adminId:currentAdmin.id,adminName:currentAdmin.name,action:"Changed password",entity:"authentication"});return jsonNoStore({success:true,message:"Password updated successfully. Please sign in again."});
}
