import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const failures=[];
const mustExist=["proxy.ts","lib/security.ts","lib/admin-auth.ts","app/api/enquiries/route.ts","app/api/admin/uploads/route.ts"];
for(const rel of mustExist)if(!fs.existsSync(path.join(root,rel)))failures.push(`Missing security file: ${rel}`);

function read(rel){const file=path.join(root,rel);return fs.existsSync(file)?fs.readFileSync(file,"utf8"):""}
const proxy=read("proxy.ts");
const adminAuth=read("lib/admin-auth.ts");
const security=read("lib/security.ts");
const uploads=read("app/api/admin/uploads/route.ts");
const enquiries=read("app/api/enquiries/route.ts");

const requiredProxy=["Content-Security-Policy","Strict-Transport-Security","X-Frame-Options","X-Content-Type-Options","Permissions-Policy","sameOrigin(request)","/api/admin/"];
for(const token of requiredProxy)if(!proxy.includes(token))failures.push(`proxy.ts missing ${token}`);
for(const token of["httpOnly:true","sameSite:\"strict\"","priority:\"high\"","SESSION_VERSION = 2","passwordChangedAt","length>=12"])if(!adminAuth.replaceAll(" ","").includes(token.replaceAll(" ","")))failures.push(`admin-auth.ts missing ${token}`);
for(const token of["enforceSameOrigin","enforceBodySize","jsonNoStore"])if(!security.includes(token))failures.push(`lib/security.ts missing ${token}`);
for(const token of["allowedMime","validMagic","MAX_FILE_SIZE","enforceSameOrigin","rateLimit"])if(!uploads.includes(token))failures.push(`upload security missing ${token}`);
for(const token of["enforceBodySize","rateLimit","validateContactInput","validateQuoteInput","dedupeKey"])if(!enquiries.includes(token))failures.push(`enquiry security missing ${token}`);

function filesIn(dir){if(!fs.existsSync(dir))return[];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const full=path.join(dir,e.name);return e.isDirectory()?filesIn(full):/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(e.name)?[full]:[]})}
for(const file of filesIn(path.join(root,"app"))){const src=fs.readFileSync(file,"utf8"),rel=path.relative(root,file);if(/eval\s*\(/.test(src))failures.push(`${rel}: eval() is forbidden`);if(/new\s+Function\s*\(/.test(src))failures.push(`${rel}: new Function() is forbidden`);if(/dangerouslySetInnerHTML/.test(src)&&!rel.includes("structured-data"))failures.push(`${rel}: review dangerouslySetInnerHTML usage`);}

if(failures.length){console.error("Security audit failed:\n");for(const f of failures)console.error(`- ${f}`);process.exit(1)}
console.log("Security audit passed: request gateway, sessions, uploads, enquiries and dangerous-code checks are present.");
