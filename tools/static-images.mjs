// Every local photo the site draws through next/image, pre-sized at build time as static WebP and AVIF files, so
// no image request goes to Vercel's optimiser (/_next/image). Runs in `prebuild`; lib/imageLoader.ts points
// next/image at them. Same approach as the Sign Group site (its scripts/static-images.mjs).
//   node tools/static-images.mjs   (writes public/static/img/, git-ignored)
//
// Why (Oct 2026): the Vercel Hobby allowance was used up; the optimiser's transformations and the function
// traffic around it count against it, and these photos never change between deploys.
//
// What it makes, per photo, for each width in lib/image-widths.json (= next.config.js images.deviceSizes +
// imageSizes, the only widths next/image ever asks a loader for): <path without extension>.<width>.webp and
// .avif under public/static/img/. Encoding is exactly what Next's optimiser does
// (next/dist/server/image-optimizer/transform.js optimizeImage): auto-rotate, resize to the width without
// enlarging, WebP at quality 75, AVIF at round(75 * 50/80) = 47 with effort 3. A width larger than the photo
// gets the photo-width file under that name (the optimiser never enlarged either), so every srcset entry exists.
//
// Which photos: every /public raster path written in app/, components/ or lib/ (share cards in /og are
// excluded: they are only linked from page metadata, never drawn through next/image).
//
// Fast rebuilds: each encode is cached in <distDir>/cache/eu-img/ by the photo's hash (Vercel keeps .next/cache
// between builds). public/static/img/version.json holds a hash of all photos and settings: next.config.js puts
// it on every image URL (?v=), so /static's one-year immutable cache can never serve an old photo after one
// changes.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, 'static', 'img');
const CACHE = path.join(ROOT, process.env.NEXT_DIST_DIR || '.next', 'cache', 'eu-img');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib', 'image-widths.json'), 'utf8'));
const WIDTHS = [...config.imageSizes, ...config.deviceSizes].sort((a, b) => a - b);
const QUALITY = config.quality;
const AVIF_QUALITY = Math.max(Math.round(QUALITY * (50 / 80)), 1);
const SETTINGS = `w=${WIDTHS.join(',')};webp q${QUALITY};avif q${AVIF_QUALITY} e3;rotate;noenlarge;v1`;
const SETTINGS_KEY = createHash('sha1').update(SETTINGS).digest('hex').slice(0, 8);

const RASTER = /\.(webp|jpe?g|png|avif)$/i;
const CODE_DIRS = ['app', 'components', 'lib'];
const EXCLUDE = /^og\//;

/** Every /public raster path quoted in the site's code */
function referencedPhotos() {
  const found = new Set();
  const scan = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) scan(p);
      else if (/\.(tsx?|jsx?|mjs|json)$/.test(e.name)) {
        for (const m of fs.readFileSync(p, 'utf8').matchAll(/["'`]\/([A-Za-z0-9_./ -]+\.(?:webp|jpe?g|png|avif))["'`]/gi)) {
          found.add(m[1]);
        }
      }
    }
  };
  for (const dir of CODE_DIRS) scan(path.join(ROOT, dir));
  return [...found]
    .filter((rel) => !EXCLUDE.test(rel) && !rel.startsWith('static/') && fs.existsSync(path.join(PUBLIC, rel)))
    .sort();
}

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex');
const outName = (rel, w, fmt) => path.join(OUT, rel.replace(RASTER, '') + `.${w}.${fmt}`);

async function encode(buf, width, fmt) {
  const img = sharp(buf).rotate().resize(width, undefined, { withoutEnlargement: true });
  return fmt === 'avif' ? img.avif({ quality: AVIF_QUALITY, effort: 3 }).toBuffer() : img.webp({ quality: QUALITY }).toBuffer();
}

async function one(rel) {
  const buf = fs.readFileSync(path.join(PUBLIC, rel));
  const sha = hashOf(buf);
  const { width: W, height: H, orientation } = await sharp(buf).metadata();
  // EXIF orientations 5-8 are rotated a quarter turn: the displayed width is the stored height
  const srcW = (orientation ?? 1) >= 5 ? H : W;
  let made = 0, cached = 0, bytes = 0;
  for (const fmt of ['webp', 'avif']) {
    for (const w of WIDTHS) {
      const target = Math.min(w, srcW);
      const key = path.join(CACHE, `${sha}-${target}-${SETTINGS_KEY}.${fmt}`);
      let data;
      if (fs.existsSync(key)) {
        data = fs.readFileSync(key);
        cached++;
      } else {
        data = await encode(buf, target, fmt);
        fs.mkdirSync(CACHE, { recursive: true });
        fs.writeFileSync(key, data);
        made++;
      }
      const out = outName(rel, w, fmt);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, data);
      bytes += data.length;
    }
  }
  return { rel, sha, made, cached, bytes };
}

const t0 = Date.now();
const sources = referencedPhotos();
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const queue = [...sources];
const results = [];
await Promise.all(
  Array.from({ length: Math.max(2, Math.min(4, os.cpus().length)) }, async () => {
    while (queue.length) results.push(await one(queue.shift()));
  })
);
results.sort((a, b) => a.rel.localeCompare(b.rel));
const version = createHash('sha1')
  .update(SETTINGS + results.map((r) => `${r.rel}:${r.sha}`).join('|'))
  .digest('hex')
  .slice(0, 10);
fs.writeFileSync(
  path.join(OUT, 'version.json'),
  JSON.stringify({ version, settings: SETTINGS, sources: results.map((r) => r.rel) }, null, 1)
);
const sum = (k) => results.reduce((n, r) => n + r[k], 0);
console.log(
  `static images: ${results.length} photos x ${WIDTHS.length} widths x 2 formats -> ${results.length * WIDTHS.length * 2} files, ` +
    `${(sum('bytes') / 1048576).toFixed(0)} MB; encoded ${sum('made')}, from cache ${sum('cached')}; v=${version}; ` +
    `${((Date.now() - t0) / 1000).toFixed(0)} s`
);
