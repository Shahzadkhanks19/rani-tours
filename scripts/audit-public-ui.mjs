import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const scanRoots = [path.join(root, "app"), path.join(root, "components")];

const checks = [
  { label: "browser-native <select>", pattern: /<select\b/i },
  { label: "browser-native date input", pattern: /type=["']date["']/i },
  { label: "browser-native number input", pattern: /type=["']number["']/i },
  { label: "dead href=# link", pattern: /href=["']#["']/i },
  { label: "window.alert", pattern: /window\s*\.\s*alert\s*\(/i },
  { label: "window.confirm", pattern: /window\s*\.\s*confirm\s*\(/i },
  { label: "window.prompt", pattern: /window\s*\.\s*prompt\s*\(/i },
  { label: "globalThis.alert", pattern: /globalThis\s*\.\s*alert\s*\(/i },
  { label: "globalThis.confirm", pattern: /globalThis\s*\.\s*confirm\s*\(/i },
  { label: "globalThis.prompt", pattern: /globalThis\s*\.\s*prompt\s*\(/i },
  { label: "bare alert()", pattern: /(^|[^\w.])alert\s*\(/im },
  { label: "bare confirm()", pattern: /(^|[^\w.])confirm\s*\(/im },
  { label: "bare prompt()", pattern: /(^|[^\w.])prompt\s*\(/im },
];

function filesIn(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return filesIn(full);
    return /\.(tsx|ts|jsx|js)$/.test(entry.name) ? [full] : [];
  });
}

const files = scanRoots.flatMap(filesIn);
const failures = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const check of checks) {
    if (check.pattern.test(source)) failures.push(`${path.relative(root, file)}: ${check.label}`);
  }
}

if (failures.length) {
  console.error("UI consistency audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  console.error("\nReplace native browser dialogs/controls with the project's custom UI components.");
  process.exit(1);
}

console.log(`UI consistency audit passed (${files.length} app/component source files checked).`);
