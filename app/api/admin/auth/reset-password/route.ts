import { clearAdminSession, hashPassword, hashResetToken, logAdminActivity, validatePasswordStrength } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { enforceBodySize,enforceSameOrigin,getClientIp,hasJsonContentType,jsonNoStore } from "@/lib/security";
import { AdminUser } from "@/models/AdminUser";

export const runtime="nodejs";

export async function POST(request:Request){
 const originError=enforceSameOrigin(request);if(originError)return originError;const sizeError=enforceBodySize(request,12*1024);if(sizeError)return sizeError;if(!hasJsonContentType(request))return jsonNoStore({message:"Unsupported request format."},{status:415});
 const ip=await getClientIp();const limit=rateLimit(`admin-reset:${ip}`,8,30*60*1000);if(!limit.allowed)return jsonNoStore({message:"Too many reset attempts. Please request a new reset link later."},{status:429,headers:{"Retry-After":String(limit.retryAfterSeconds)}});
 let body:{token?:string;password?:string};try{body=await request.json() as{token?:string;password?:string}}catch{return jsonNoStore({message:"Invalid request."},{status:400})}
 const token=body.token||"",password=body.password||"";if(!/^[a-f0-9]{64}$/i.test(token)||!validatePasswordStrength(password))return jsonNoStore({message:"Use a valid reset link and a password of 12–128 characters with uppercase, lowercase, number, and symbol."},{status:400});
 const tokenLimit=rateLimit(`admin-reset-token:${hashResetToken(token).slice(0,24)}`,5,30*60*1000);if(!tokenLimit.allowed)return jsonNoStore({message:"This reset link is invalid or has expired."},{status:400});
 await connectToDatabase();const tokenHash=hashResetToken(token);const admin=await AdminUser.findOne({resetPasswordTokenHash:tokenHash,resetPasswordExpiresAt:{$gt:new Date()},isActive:true}).select("+passwordHash +resetPasswordTokenHash +resetPasswordExpiresAt");if(!admin)return jsonNoStore({message:"This reset link is invalid or has expired."},{status:400});
 if(await import("@/lib/admin-auth").then(m=>m.verifyPassword(password,admin.passwordHash)))return jsonNoStore({message:"Choose a password different from your current password."},{status:400});
 admin.passwordHash=await hashPassword(password);admin.passwordChangedAt=new Date();admin.resetPasswordTokenHash=null;admin.resetPasswordExpiresAt=null;await admin.save();await clearAdminSession();await logAdminActivity({adminId:admin._id.toString(),adminName:admin.name,action:"Reset password",entity:"authentication"});return jsonNoStore({success:true,message:"Password reset successfully. You can now sign in."});
}
