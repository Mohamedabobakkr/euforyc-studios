/**
 * /flash: the one-day Black Friday flash sale, Friday 27 November 2026.
 *
 * This page is a static shell with no secrets in it. The password, the two
 * discount codes and the Momence checkout link live in server environment
 * variables (lib/flash-sale.ts) and only ever reach a browser through
 * /api/flash/state and /api/flash/unlock, when the server's clock and the
 * visitor's cookie say they may. The public facts (times, prices, words) are
 * in components/flash-sale/config.ts.
 *
 * Not in the sitemap or llms.txt, and no structured data, by design.
 */
import type { Metadata, Viewport } from 'next';

import FlashSale from '@/components/flash-sale/FlashSale';
import {
  BEFORE_PAINT,
  FLASH_DATE,
  FLASH_PACK_CLASSES,
  FLASH_PATH,
  FLASH_PUBLIC_PERCENT,
  FLASH_VIP_LIMIT,
  FLASH_VIP_PERCENT,
} from '@/components/flash-sale/config';
import { pageMetadata } from '@/lib/site';

const TITLE = 'Black Friday: One Night Only';

const shared = pageMetadata({
  title: TITLE,
  description: `One night at Euforyc Studios, Edgware: ${FLASH_DATE}. A ${FLASH_PACK_CLASSES}-class pack at ${FLASH_VIP_PERCENT}% off for the first ${FLASH_VIP_LIMIT} password holders from 12:00, then ${FLASH_PUBLIC_PERCENT}% off for everyone from 18:00. Gone at midnight.`,
  path: FLASH_PATH,
  noindex: true,
});

// The helper always names a share image (the studio photo by default). Next
// only uses this folder's own opengraph-image.tsx / twitter-image.tsx when the
// page names none, so the helper's choice is taken out here.
function withoutImages<Card extends { images?: unknown }>(card: Card | null | undefined) {
  if (!card) return undefined;
  const { images: _helperImage, ...rest } = card;
  return rest;
}

export const metadata: Metadata = {
  ...shared,
  openGraph: withoutImages(shared.openGraph) as Metadata['openGraph'],
  twitter: withoutImages(shared.twitter) as Metadata['twitter'],
  // The helper's noindex still lets crawlers follow the links. This page asks for neither.
  robots: { index: false, follow: false },
};

// The browser's own bars go dark with the page
export const viewport: Viewport = {
  themeColor: '#10180a',
};

export default function FlashPage() {
  return (
    <>
      {/* Picks the layout for the time of day and decides whether the opening
          animation plays, before anything is drawn (components/flash-sale/config.ts) */}
      <script dangerouslySetInnerHTML={{ __html: BEFORE_PAINT }} />
      {/* Read by the site's pixel code (app/(main)/layout.tsx) for the ViewContent event */}
      <div
        id="page-content-meta"
        hidden
        data-content-name={TITLE}
        data-content-type="offer"
        data-content-category={FLASH_PATH}
      />
      <FlashSale />
    </>
  );
}
