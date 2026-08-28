import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory() && !["node_modules", ".next", ".git"].includes(entry.name)) return walk(file);
    return entry.isFile() && /\.(tsx|jsx|css)$/.test(entry.name) ? [file] : [];
  });
}

const files = [...walk(path.join(root, "app")), ...walk(path.join(root, "components"))];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);

  if (/https?:\/\/fonts\.(?:googleapis|gstatic)\.com/i.test(source)) failures.push(`${rel}: remote Google font request can block rendering; use next/font or local/system fonts`);
  if (/@import\s+(?:url\()?['"]?https?:\/\//i.test(source)) failures.push(`${rel}: remote CSS @import can block rendering`);
  if (/<video\b[^>]*\bautoplay\b/i.test(source)) failures.push(`${rel}: autoplay video can consume bandwidth and main-thread work`);

  for (const match of source.matchAll(/<Image\b([\s\S]*?)\/>/g)) {
    const props = match[1];
    if (/\bfill\b/.test(props) && !/\bsizes\s*=/.test(props)) failures.push(`${rel}: fill Image is missing sizes`);
  }

  const priorities = [...source.matchAll(/<Image\b[\s\S]*?\bpriority\b[\s\S]*?\/>/g)].length;
  if (priorities > 2) warnings.push(`${rel}: ${priorities} priority images found; reserve priority for above-the-fold/LCP imagery`);
}

const globals = fs.readFileSync(path.join(root, "app", "globals.css"), "utf8");
if (!globals.includes("prefers-reduced-motion")) failures.push("app/globals.css: reduced-motion fallback missing");

const config = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
if (/unoptimized\s*:\s*true/.test(config)) warnings.push("next.config.ts: global image optimization is disabled; external CMS/CDN reliability currently takes precedence, but this should be reviewed with production Lighthouse data");

if (failures.length) {
  console.error("Performance audit failed:\n\n" + [...new Set(failures)].map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Performance audit passed (${files.length} app/component style and UI files checked).`);
if (warnings.length) console.warn("Performance audit notes:\n" + [...new Set(warnings)].map((item) => `- ${item}`).join("\n"));
