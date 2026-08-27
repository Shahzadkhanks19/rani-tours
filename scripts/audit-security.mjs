import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const failures=[];
const mustExist=["proxy.ts","lib/security.ts","lib/admin-auth.ts","app/api/enquiries/route.ts","app/api/admin/uploads/route.ts","app/api/admin/auth/login/route.ts","app/api/admin/auth/forgot-password/route.ts","app/api/admin/auth/reset-password/route.ts","app/api/admin/auth/change-password/route.ts","scripts/create-admin.mjs"];
for(const rel of mustExist)if(!fs.existsSync(path.join(root,rel)))failures.push(`Missing security file: ${rel}`);
function read(rel){const file=path.join(root,rel);return fs.existsSync(file)?fs.readFileSync(file,"utf8"):""}
function compact(v){return v.replace(/\s+/g,"")}

const proxy=read("proxy.ts"),adminAuth=read("lib/admin-auth.ts"),security=read("lib/security.ts"),uploads=read("app/api/admin/uploads/route.ts"),enquiries=read("app/api/enquiries/route.ts"),login=read("app/api/admin/auth/login/route.ts"),forgot=read("app/api/admin/auth/forgot-password/route.ts"),reset=read("app/api/admin/auth/reset-password/route.ts"),change=read("app/api/admin/auth/change-password/route.ts"),bootstrap=read("scripts/create-admin.mjs"),gitignore=read(".gitignore"),envExample=read(".env.example");

for(const token of["Content-Security-Policy","Strict-Transport-Security","X-Frame-Options","X-Content-Type-Options","Permissions-Policy","Referrer-Policy","sameOrigin(request)","/api/admin/","no-store","noindex"] )if(!proxy.includes(token))failures.push(`proxy.ts missing ${token}`);
for(const token of["httpOnly:true","sameSite:\"strict\"","priority:\"high\"","SESSION_VERSION=2","passwordChangedAt","length>=12","length<=128","ADMIN_SESSION_HOURS"] )if(!compact(adminAuth).includes(compact(token)))failures.push(`admin-auth.ts missing ${token}`);
for(const token of["enforceSameOrigin","enforceBodySize","jsonNoStore","hasJsonContentType","sanitizePlainText"] )if(!security.includes(token))failures.push(`lib/security.ts missing ${token}`);
for(const token of["allowedMime","validMagic","MAX_FILE_SIZE","enforceSameOrigin","rateLimit"] )if(!uploads.includes(token))failures.push(`upload security missing ${token}`);
for(const token of["enforceBodySize","rateLimit","validateContactInput","validateQuoteInput","dedupeKey","user-agent"] )if(!enquiries.includes(token))failures.push(`enquiry security missing ${token}`);
for(const [name,src,tokens] of [["login",login,["enforceSameOrigin","enforceBodySize","hasJsonContentType","admin-login-account","jsonNoStore"]],["forgot-password",forgot,["enforceSameOrigin","admin-forgot-email","20*60*1000","https://","genericMessage"]],["reset-password",reset,["enforceSameOrigin","admin-reset-token","validatePasswordStrength","clearAdminSession"]],["change-password",change,["enforceSameOrigin","validatePasswordStrength","clearAdminSession","verifyPassword"]],["bootstrap",bootstrap,["password.length < 12","password.length > 128","serverSelectionTimeoutMS"]]])for(const token of tokens)if(!src.includes(token))failures.push(`${name} security missing ${token}`);
if(!gitignore.includes(".env*")||!gitignore.includes("!.env.example"))failures.push(".gitignore must ignore environment files except .env.example");
if(envExample.includes("ADMIN_SESSION_DAYS"))failures.push(".env.example still documents deprecated ADMIN_SESSION_DAYS");
if(!envExample.includes("ADMIN_SESSION_HOURS=8"))failures.push(".env.example missing ADMIN_SESSION_HOURS");

function filesIn(dir){if(!fs.existsSync(dir))return[];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const full=path.join(dir,e.name);return e.isDirectory()?filesIn(full):/\.(ts|tsx|js|jsx|mjs|cjs|json|md)$/.test(e.name)?[full]:[]})}
// The audit script intentionally contains signatures of dangerous constructs as data,
// so exclude this file from the source scan to avoid flagging its own detectors.
const auditFile=path.resolve(root,"scripts/audit-security.mjs");
const scanFiles=[...filesIn(path.join(root,"app")),...filesIn(path.join(root,"components")),...filesIn(path.join(root,"lib")),...filesIn(path.join(root,"scripts"))].filter(file=>path.resolve(file)!==auditFile);
const evalPattern=new RegExp("\\be"+"val\\s*\\(");
const functionCtorPattern=new RegExp("\\bnew\\s+"+"Function\\s*\\(");
const processExecPattern=new RegExp("child_"+"process|exec"+"Sync\\s*\\(|spawn"+"Sync\\s*\\(");
for(const file of scanFiles){const src=fs.readFileSync(file,"utf8"),rel=path.relative(root,file);if(evalPattern.test(src))failures.push(`${rel}: dynamic evaluation is forbidden`);if(functionCtorPattern.test(src))failures.push(`${rel}: dynamic function construction is forbidden`);if(processExecPattern.test(src))failures.push(`${rel}: review process execution usage`);if(/mongodb(?:\+srv)?:\/\/[^\s"']+:[^\s"']+@/i.test(src))failures.push(`${rel}: possible MongoDB credential committed`);if(/(?:sk|re)_[A-Za-z0-9_-]{24,}/.test(src))failures.push(`${rel}: possible API secret committed`);}

if(failures.length){console.error("Security audit failed:\n");for(const f of failures)console.error(`- ${f}`);process.exit(1)}
console.log(`Security audit passed (${scanFiles.length} source/config files scanned): gateway, headers, sessions, auth abuse controls, uploads, enquiries, secret hygiene and dangerous-code checks are present.`);
