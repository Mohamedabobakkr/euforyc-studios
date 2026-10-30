// next/image loader (next.config.js images.loaderFile): pre-built static files instead of Vercel's image
// optimiser (/_next/image), the same approach as the Sign Group site.
//   /reformer-new.jpg at 1080 -> /static/img/reformer-new.1080.webp?v=<version>
// tools/static-images.mjs makes the files at build time (WebP and AVIF, with Next's own encoder settings), for
// every width in lib/image-widths.json, which is also the width list next/image asks for. A browser that accepts
// AVIF gets the .avif under the same URL (next.config.js rewrite on the Accept header).
import widths from './image-widths.json';

const WIDTHS = [...widths.imageSizes, ...widths.deviceSizes].sort((a, b) => a - b);
const V = process.env.NEXT_PUBLIC_IMG_V;
const RASTER = /\.(webp|jpe?g|png|avif)$/i;

export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  // No pre-built set (e.g. `next dev` before `npm run images`), or not a local photo
  // (Momence, Square): the original file, as is.
  if (!V || !src.startsWith('/') || src.startsWith('//') || !RASTER.test(src)) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/static/img${src.replace(RASTER, '')}.${w}.webp?v=${V}`;
}
