/**
 * The picture shown when /flash is shared (WhatsApp, Instagram, iMessage).
 * Drawn once at build time: the studio's own wordmark (public/logo.png) under
 * a brass arch on the page's dark ground. No photo, no secrets, about 30 KB.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Black Friday at Euforyc Studios. One night only, Friday 27 November.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NIGHT = '#10180a';
const CREAM = '#fffcf2';
const BRASS = '#c9a35c';

// The wordmark file is 625 x 313 with empty space above and below the
// lettering. Drawn 520 wide, the lettering sits between 87 and 191 down.
const LOGO_WIDTH = 520;
const LOGO_HEIGHT = Math.round((LOGO_WIDTH * 313) / 625);
const LOGO_TOP = 87;
const LOGO_VISIBLE = 104;

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
          alignItems: 'flex-end',
          justifyContent: 'center',
          backgroundColor: NIGHT,
          backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(201, 163, 92, 0.22), rgba(16, 24, 10, 0) 62%)',
          color: CREAM,
        }}
      >
        {/* The arch: the door the whole sale is about */}
        <div
          style={{
            width: 700,
            height: 570,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 40,
            borderTop: `2px solid ${BRASS}`,
            borderLeft: `2px solid ${BRASS}`,
            borderRight: `2px solid ${BRASS}`,
            borderTopLeftRadius: 350,
            borderTopRightRadius: 350,
          }}
        >
          <div style={{ display: 'flex', width: LOGO_WIDTH, height: LOGO_VISIBLE, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="" width={LOGO_WIDTH} height={LOGO_HEIGHT} style={{ marginTop: -LOGO_TOP }} />
          </div>
          <div style={{ width: 240, height: 2, marginTop: 30, backgroundColor: BRASS }} />
          <div style={{ marginTop: 34, fontSize: 54, letterSpacing: 16, textTransform: 'uppercase' }}>Black Friday</div>
          <div
            style={{
              marginTop: 22,
              fontSize: 23,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: BRASS,
            }}
          >
            One night only, 27 November
          </div>
        </div>
      </div>
    ),
    size
  );
}
