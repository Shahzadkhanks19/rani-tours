import { createHash } from "crypto";
import { NextRequest } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { enforceSameOrigin, getClientIp, jsonNoStore } from "@/lib/security";

export const runtime = "nodejs";
const MAX_FILE_SIZE=5*1024*1024;
const allowedMime=new Set(["image/jpeg","image/png","image/webp","image/avif"]);

function validMagic(bytes:Uint8Array,type:string){if(type==="image/jpeg")return bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff;if(type==="image/png")return bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47;if(type==="image/webp")return String.fromCharCode(...bytes.slice(0,4))==="RIFF"&&String.fromCharCode(...bytes.slice(8,12))==="WEBP";if(type==="image/avif")return String.fromCharCode(...bytes.slice(4,12)).includes("ftyp");return false}

export async function POST(request:NextRequest){
 const originError=enforceSameOrigin(request);if(originError)return originError;
 const admin=await requireAdminApi();if(!admin)return jsonNoStore({error:"Unauthorized"},{status:401});
 const ip=await getClientIp();const limit=rateLimit(`admin-upload:${admin.id}:${ip}`,30,15*60*1000);if(!limit.allowed)return jsonNoStore({error:"Too many upload attempts."},{status:429,headers:{"Retry-After":String(limit.retryAfterSeconds)}});
 const cloudName=process.env.CLOUDINARY_CLOUD_NAME,apiKey=process.env.CLOUDINARY_API_KEY,apiSecret=process.env.CLOUDINARY_API_SECRET;if(!cloudName||!apiKey||!apiSecret)return jsonNoStore({error:"Image service is not configured."},{status:503});
 const contentLength=Number(request.headers.get("content-length")||0);if(contentLength>MAX_FILE_SIZE+1024*1024)return jsonNoStore({error:"Upload is too large."},{status:413});
 let form:FormData;try{form=await request.formData()}catch{return jsonNoStore({error:"Invalid multipart request."},{status:400})}
 const file=form.get("file");if(!(file instanceof File))return jsonNoStore({error:"Image file is required."},{status:400});if(!allowedMime.has(file.type))return jsonNoStore({error:"Only JPEG, PNG, WebP or AVIF images are allowed."},{status:400});if(file.size<=0||file.size>MAX_FILE_SIZE)return jsonNoStore({error:"Image must be 5MB or smaller."},{status:400});
 const head=new Uint8Array(await file.slice(0,16).arrayBuffer());if(!validMagic(head,file.type))return jsonNoStore({error:"The uploaded file does not match its declared image format."},{status:400});
 const requestedFolder=String(form.get("folder")||"tour-packages");const allowedFolders=new Set(["tour-packages","taxi-services","destinations","fleet","gallery","billing-signatures"]);if(!allowedFolders.has(requestedFolder))return jsonNoStore({error:"Invalid upload destination."},{status:400});
 const timestamp=Math.floor(Date.now()/1000),folder=`rani-tours/${requestedFolder}`,signature=createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");const payload=new FormData();payload.append("file",file);payload.append("api_key",apiKey);payload.append("timestamp",String(timestamp));payload.append("folder",folder);payload.append("signature",signature);
 const response=await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{method:"POST",body:payload});const data=await response.json() as{secure_url?:string;public_id?:string;error?:{message?:string}};if(!response.ok||!data.secure_url)return jsonNoStore({error:"Image upload failed."},{status:502});return jsonNoStore({image:{url:data.secure_url,publicId:data.public_id||""}})
}
