import { Resend } from "resend";
import { createResetToken, logAdminActivity } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { enforceBodySize,enforceSameOrigin,getClientIp,hasJsonContentType,jsonNoStore } from "@/lib/security";
import { AdminUser } from "@/models/AdminUser";

export const runtime = "nodejs";
const genericMessage="If an active admin account exists for that email, a reset link has been sent.";
function escapeHtml(value:string){return value.replace(/[&<>"']/g,(char)=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]||char))}

export async function POST(request:Request){
 const originError=enforceSameOrigin(request);if(originError)return originError;const sizeError=enforceBodySize(request,8*1024);if(sizeError)return sizeError;if(!hasJsonContentType(request))return jsonNoStore({message:genericMessage});
 const ip=await getClientIp();const limit=rateLimit(`admin-forgot:${ip}`,5,30*60*1000);if(!limit.allowed)return jsonNoStore({message:genericMessage});
 let body:{email?:string};try{body=await request.json() as{email?:string}}catch{return jsonNoStore({message:genericMessage})}const email=body.email?.trim().toLowerCase()||"";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return jsonNoStore({message:genericMessage});
 const emailLimit=rateLimit(`admin-forgot-email:${email}`,3,60*60*1000);if(!emailLimit.allowed)return jsonNoStore({message:genericMessage});await connectToDatabase();const admin=await AdminUser.findOne({email,isActive:true}).select("+resetPasswordTokenHash +resetPasswordExpiresAt");if(!admin)return jsonNoStore({message:genericMessage});
 const{raw,hash}=createResetToken();admin.resetPasswordTokenHash=hash;admin.resetPasswordExpiresAt=new Date(Date.now()+20*60*1000);await admin.save();
 const configuredBase=process.env.ADMIN_RESET_BASE_URL;const baseUrl=configuredBase||(process.env.NODE_ENV!=="production"?"http://localhost:3000/admin/reset-password":"");if(!baseUrl||(!baseUrl.startsWith("https://")&&process.env.NODE_ENV==="production")){admin.resetPasswordTokenHash=null;admin.resetPasswordExpiresAt=null;await admin.save();return jsonNoStore({message:genericMessage});}
 const resetUrl=`${baseUrl}?token=${encodeURIComponent(raw)}`,apiKey=process.env.RESEND_API_KEY,from=process.env.RESEND_FROM_EMAIL;if(apiKey&&from){const resend=new Resend(apiKey);await resend.emails.send({from,to:admin.email,subject:"Reset your Rani Tours admin password",html:`<p>Hello ${escapeHtml(String(admin.name))},</p><p>A password reset was requested for your Rani Tours admin account.</p><p><a href="${escapeHtml(resetUrl)}">Reset password</a></p><p>This one-time link expires in 20 minutes. If you did not request this, ignore this email.</p>`});}
 await logAdminActivity({adminId:admin._id.toString(),adminName:admin.name,action:"Requested password reset",entity:"authentication"});return jsonNoStore({message:genericMessage});
}
