// After `next build`: every image URL in the pre-rendered pages and the browser scripts must be a pre-built
// static file (WebP and AVIF both present in public/static/img/), and nothing may point at Vercel's optimiser
// (/_next/image). Fails the build otherwise. Same check as the Sign Group site.
//   node tools/check-static-images.mjs      (runs as `postbuild`)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, process.env.NEXT_DIST_DIR || '.next');
const APP = path.join(DIST, 'server', 'app');
const CHUNKS = path.join(DIST, 'static', 'chunks');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, 'static', 'img');

const walk = (dir, test, out = []) => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, test, out);
    else if (test.test(e.name)) out.push(p);
  }
  return out;
};

const pages = walk(APP, /\.(html|rsc)$/);
const urls = new Set();
const optimiser = new Set();
for (const f of pages) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/\/static\/img\/[^"'\s,?\\]+\.webp/g)) urls.add(m[0]);
  if (/\/_next\/image/.test(t)) optimiser.add(path.relative(APP, f));
}

const missing = [];
for (const u of urls) {
  for (const ext of ['webp', 'avif']) {
    const file = path.join(PUBLIC, u.replace(/\.webp$/, `.${ext}`));
    if (!fs.existsSync(file)) missing.push(u.replace(/\.webp$/, `.${ext}`));
  }
}

// Photos only the browser draws (not in any pre-rendered page): each local raster path in the client scripts
// that is a file in /public must have its pre-built set.
const built = (() => {
  try {
    return new Set(JSON.parse(fs.readFileSync(path.join(OUT, 'version.json'), 'utf8')).sources);
  } catch {
    return new Set();
  }
})();
const clientOnly = new Set();
for (const f of walk(CHUNKS, /\.js$/)) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/["'`]\/([A-Za-z0-9_./ -]+\.(?:webp|jpe?g|png|avif))["'`]/gi)) {
    const rel = m[1];
    if (rel.startsWith('og/') || rel.startsWith('static/')) continue;
    if (fs.existsSync(path.join(PUBLIC, rel)) && !built.has(rel)) clientOnly.add(rel);
  }
}

console.log(
  `static images: ${pages.length} pre-rendered files, ${urls.size} image URLs, ${missing.length} missing, ` +
    `${optimiser.size} pages pointing at /_next/image, ${clientOnly.size} browser-only photos not pre-built`
);
if (built.size === 0 || urls.size === 0 || missing.length || optimiser.size || clientOnly.size) {
  if (built.size === 0) console.error('no public/static/img/version.json: run `npm run images` (prebuild) first');
  if (urls.size === 0) console.error('no pre-sized image URLs in the pages: is NEXT_PUBLIC_IMG_V set?');
  for (const m of missing.slice(0, 20)) console.error('missing', m);
  for (const o of [...optimiser].slice(0, 20)) console.error('/_next/image in', o);
  for (const c of [...clientOnly].slice(0, 20)) console.error('not pre-built', c);
  process.exit(1);
}
