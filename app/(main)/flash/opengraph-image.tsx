/**
 * The picture shown when /flash is shared (WhatsApp, Instagram, iMessage).
 * Drawn once at build time, in the closed page's own terms: the studio's
 * wordmark (public/logo.png) on the ink ground, the name of the sale and its
 * date under it, and the light along the bottom edge. Brand colours only.
 * No photo, no secrets.
 *
 * The wordmark is the only serif here: the image renderer has no Playfair
 * Display to set a headline in, so the two lines under it are plain captions.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Black Friday Flash Sale at Euforyc Studios. Friday 27 November.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Brand tokens (app/globals.css)
const INK = '#1a260e';
const CREAM = '#fffcf2';

// The wordmark file is 625 x 313 with empty space above and below the
// lettering. Drawn 600 wide, the lettering sits between 100 and 222 down.
const LOGO_WIDTH = 600;
const LOGO_HEIGHT = Math.round((LOGO_WIDTH * 313) / 625);
const LOGO_TOP = 100;
const LOGO_VISIBLE = 122;

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 60,
          backgroundColor: INK,
          // A level band of cream light along the bottom edge, passing through sage into the ink
          backgroundImage:
            'linear-gradient(to top, rgba(255, 252, 242, 0.92) 0%, rgba(245, 240, 232, 0.6) 5%, rgba(61, 74, 51, 0.75) 15%, rgba(42, 58, 33, 0.5) 24%, rgba(26, 38, 14, 0) 36%)',
          color: CREAM,
        }}
      >
        <div style={{ display: 'flex', width: LOGO_WIDTH, height: LOGO_VISIBLE, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={LOGO_WIDTH} height={LOGO_HEIGHT} style={{ marginTop: -LOGO_TOP }} />
        </div>
        <div style={{ marginTop: 52, fontSize: 46 }}>Black Friday Flash Sale</div>
        <div style={{ marginTop: 16, fontSize: 28, color: 'rgba(255, 252, 242, 0.8)' }}>Friday 27 November</div>
      </div>
    ),
    size
  );
}
