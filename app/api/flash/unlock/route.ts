/**
 * POST /api/flash/unlock   { "password": "..." }
 * The password door of the Black Friday flash sale. A correct password during
 * the vip phase returns the 50% code and sets a signed HttpOnly cookie, so a
 * refresh keeps the door open.
 *
 * Security:
 *  - Only accepted in the vip phase, and only from the site's own pages
 *  - Rate limited: 5 attempts per 15 minutes per IP (see lib/flash-sale.ts
 *    for what that does and does not protect against)
 *  - Body must be JSON, at most 1 KB; password at most 128 characters
 *  - Password compared in constant time
 *  - One generic refusal for a wrong password, the wrong phase, a bad request
 *    and missing configuration alike, after the same fixed pause
 *  - The password and the codes are never logged
 */

import { NextRequest, NextResponse } from 'next/server';

import { phaseAt } from '@/components/flash-sale/config';
import {
  FAILURE_DELAY_MS,
  MAX_BODY_BYTES,
  MAX_PASSWORD_LENGTH,
  clearAttempts,
  clientIp,
  createUnlockToken,
  flashNow,
  isSameOrigin,
  passwordMatches,
  pause,
  readBodyCapped,
  readFlashConfig,
  takeAttempt,
  unlockCookieName,
  unlockCookieOptions,
  vipSoldOut,
} from '@/lib/flash-sale';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

/** The one refusal. It never says why. */
async function refuse() {
  await pause(FAILURE_DELAY_MS);
  return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401, headers: NO_STORE });
}

/** The password from a small JSON body, or null if the request is not one */
async function readPassword(request: NextRequest): Promise<string | null> {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) return null;

  const text = await readBodyCapped(request, MAX_BODY_BYTES);
  if (text === null) return null;

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return null;
  }
  if (typeof body !== 'object' || body === null) return null;

  const password = (body as { password?: unknown }).password;
  if (typeof password !== 'string' || password.length === 0 || password.length > MAX_PASSWORD_LENGTH) return null;
  return password;
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);

  // Every attempt counts, whatever is wrong with it
  const { limited, retryAfter } = takeAttempt(ip);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited', retryAfter },
      { status: 429, headers: { ...NO_STORE, 'Retry-After': String(retryAfter) } }
    );
  }

  try {
    if (!isSameOrigin(request.headers)) return refuse();

    const password = await readPassword(request);
    if (password === null) return refuse();

    const now = flashNow();
    if (phaseAt(now) !== 'vip' || vipSoldOut()) return refuse();

    const config = readFlashConfig();
    if (!config) return refuse();

    if (!passwordMatches(password, config)) return refuse();

    // Correct: hand over the code and remember this browser until the sale ends
    clearAttempts(ip);
    const response = NextResponse.json(
      { ok: true, code: config.codeVip, checkoutUrl: config.checkoutUrl },
      { headers: NO_STORE }
    );
    response.cookies.set(unlockCookieName(), createUnlockToken(config.sessionSecret, now), unlockCookieOptions());
    return response;
  } catch {
    return refuse();
  }
}
