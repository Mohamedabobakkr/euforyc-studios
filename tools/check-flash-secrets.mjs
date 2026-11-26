// After `next build`: proves that the flash sale's secrets are not in anything a browser can download.
//
//   FLASH_CODE_VIP=... FLASH_CODE_PUBLIC=... FLASH_VIP_PASSWORD=... node tools/check-flash-secrets.mjs
//
// Build with FAKE values in those variables, then run this with the same fake values. It fails if any of them
// appears (in any letter case) in:
//   - anything under <distDir>/static (the JavaScript, CSS and other files sent to browsers)
//   - any pre-rendered page: the HTML, RSC payload and metadata Next wrote at build time, /flash included
//   - any server bundle (a secret in one would mean it was copied into the build instead of read at run time)
// It also fails if /flash was not pre-rendered at all, because the page is meant to be a static shell.
// FLASH_CHECKOUT_URL and FLASH_SESSION_SECRET are checked too when they are set.
// Only variable names and file paths are printed, never a value.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, process.env.NEXT_DIST_DIR || '.next');
const STATIC = path.join(DIST, 'static');
const SERVER = path.join(DIST, 'server');

const REQUIRED = ['FLASH_CODE_VIP', 'FLASH_CODE_PUBLIC', 'FLASH_VIP_PASSWORD'];
const OPTIONAL = ['FLASH_CHECKOUT_URL', 'FLASH_SESSION_SECRET'];
// A very short value would match by accident and prove nothing
const MIN_LENGTH = 6;

const fail = (message) => {
  console.error(`check-flash-secrets: ${message}`);
  process.exit(1);
};

const needles = [];
for (const name of [...REQUIRED, ...OPTIONAL]) {
  const value = (process.env[name] || '').trim();
  if (!value) {
    if (REQUIRED.includes(name)) {
      fail(`${name} is not set. Run this with the same FAKE values the build was made with.`);
    }
    continue;
  }
  if (value.length < MIN_LENGTH) {
    fail(`${name} is shorter than ${MIN_LENGTH} characters, too short to search for reliably. Use a longer fake value.`);
  }
  needles.push({ name, value: value.toLowerCase() });
}

if (!fs.existsSync(STATIC) || !fs.existsSync(SERVER)) {
  fail(`no build found in ${path.relative(ROOT, DIST)}. Run \`npm run build\` first.`);
}

const walk = (dir, out = []) => {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, out);
    else if (entry.isFile()) out.push(file);
  }
  return out;
};

const rel = (file) => path.relative(ROOT, file);
const isPrerendered = (file) => /\.(html|rsc|meta|body)$/.test(file);
const isFlashPage = (file) => /(^|[\\/])flash\.(html|rsc)$/.test(file) || /[\\/]flash\.segments[\\/]/.test(file);

const staticFiles = walk(STATIC);
const serverFiles = walk(SERVER);
const prerendered = serverFiles.filter(isPrerendered);
const flashPages = prerendered.filter(isFlashPage);
const serverBundles = serverFiles.filter((file) => /\.(js|mjs|cjs|json|map)$/.test(file));

if (!flashPages.some((file) => /flash\.html$/.test(file))) {
  fail('/flash was not pre-rendered (no flash.html in the build). The page must be a static shell.');
}

const found = [];
const scan = (files, where) => {
  for (const file of files) {
    // latin1 keeps every byte, so binary files (fonts, images) can be searched too
    const text = fs.readFileSync(file, 'latin1').toLowerCase();
    for (const needle of needles) {
      if (text.includes(needle.value)) found.push(`${needle.name} is in ${rel(file)} (${where})`);
    }
  }
};

scan(staticFiles, 'sent to browsers');
scan(prerendered, 'pre-rendered page');
scan(serverBundles, 'server bundle');

console.log(`check-flash-secrets: looked for ${needles.map((needle) => needle.name).join(', ')}`);
console.log(`  ${staticFiles.length} files under ${rel(STATIC)}`);
console.log(`  ${prerendered.length} pre-rendered files under ${rel(SERVER)}, of which /flash:`);
for (const file of flashPages) console.log(`    ${rel(file)}`);
console.log(`  ${serverBundles.length} server bundle files under ${rel(SERVER)}`);

if (found.length > 0) {
  console.error(`check-flash-secrets: FAILED, ${found.length} leak(s) found:`);
  for (const line of found) console.error(`  ${line}`);
  process.exit(1);
}

console.log('check-flash-secrets: OK, none of them appears anywhere in the build.');
