/**
 * GET /api/flash/state
 * What the /flash page shows right now, decided by the server's clock.
 *
 * Always returns { phase, serverNow, nextPhaseAt, soldOutVip, ready }.
 * `ready` is true only when all five required environment variables are
 * present and valid. It is a bare yes or no, the same in every phase: it
 * never names a variable and never carries a value.
 * Adds { code, checkoutUrl } only when the visitor is entitled to them:
 *  - public phase: the 40% code, for everyone
 *  - vip phase: the 50% code, only with a valid signed unlock cookie
 *  - teaser and ended: never
 *
 * Security:
 *  - The phase is worked out here on every request; nothing is cached
 *  - Secrets come from lib/flash-sale.ts (server only)
 *  - If the sale is not fully configured, no code is returned at all
 *  - Nothing is logged
 */

import { NextRequest, NextResponse } from 'next/server';

import { nextPhaseAt, phaseAt, type FlashState } from '@/components/flash-sale/config';
import { flashNow, readFlashConfig, unlockCookieName, verifyUnlockToken, vipSoldOut } from '@/lib/flash-sale';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const now = flashNow();
  const phase = phaseAt(now);
  const soldOutVip = vipSoldOut();

  // All five secrets, or null if any one is missing or unusable
  const config = readFlashConfig();

  const state: FlashState = {
    phase,
    serverNow: now,
    nextPhaseAt: nextPhaseAt(phase),
    soldOutVip,
    ready: config !== null,
  };

  // No configuration means no code, whatever the phase
  if (config) {
    if (phase === 'public') {
      state.code = config.codePublic;
      state.checkoutUrl = config.checkoutUrl;
    } else if (phase === 'vip' && !soldOutVip) {
      const token = request.cookies.get(unlockCookieName())?.value;
      if (verifyUnlockToken(token, config.sessionSecret, now)) {
        state.code = config.codeVip;
        state.checkoutUrl = config.checkoutUrl;
      }
    }
  }

  return NextResponse.json(state, { headers: { 'Cache-Control': 'no-store' } });
}
