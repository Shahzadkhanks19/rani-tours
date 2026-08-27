import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicComponentDirs = [
  "about",
  "contact",
  "corporate",
  "destinations",
  "faq",
  "fleet",
  "gallery",
  "get-quote",
  "home",
  "layout",
  "legal",
  "taxi-services",
  "tour-packages",
];

const checks = [
  { label: "browser-native <select>", pattern: /<select\b/i },
  { label: "browser-native date input", pattern: /type=["']date["']/i },
  { label: "browser-native number input", pattern: /type=["']number["']/i },
  { label: "dead href=# link", pattern: /href=["']#["']/i },
  { label: "window.alert", pattern: /window\.alert\s*\(/i },
  { label: "window.confirm", pattern: /window\.confirm\s*\(/i },
];

function filesIn(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return filesIn(full);
    return /\.(tsx|ts|jsx|js)$/.test(entry.name) ? [full] : [];
  });
}

const files = publicComponentDirs.flatMap((name) => filesIn(path.join(root, "components", name)));
const failures = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const check of checks) {
    if (check.pattern.test(source)) failures.push(`${path.relative(root, file)}: ${check.label}`);
  }
}

if (failures.length) {
  console.error("Public UI consistency audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public UI consistency audit passed (${files.length} source files checked).`);
