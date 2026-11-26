/**
 * Black Friday flash sale: everything that must stay on the server.
 *
 * Security architecture (the same shape as lib/barista-auth.ts):
 *  - The password, both discount codes, the checkout link and the signing
 *    secret are read from server environment variables, here and nowhere else.
 *    None is NEXT_PUBLIC_, none has a fallback value, none is ever logged.
 *  - The server clock decides the phase on every request. The browser's clock
 *    is never trusted.
 *  - The password is compared in constant time (SHA-256 both sides, then
 *    crypto.timingSafeEqual on the digests).
 *  - A correct password sets an HMAC-SHA256 signed, HttpOnly cookie with an
 *    expiry inside the signed payload. Signature and expiry are checked on
 *    every read.
 *  - If anything is missing from the environment, no code is ever returned.
 */
import 'server-only';

import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

import { FLASH_ENDS_AT } from '@/components/flash-sale/config';

// ---------------------------------------------------------------------------
// Local testing
// ---------------------------------------------------------------------------

/**
 * True only on a developer's machine (`next dev`). Never on Vercel production,
 * and never in any production build, wherever it runs.
 */
export function isLocalDev(): boolean {
  return process.env.VERCEL_ENV !== 'production' && process.env.NODE_ENV !== 'production';
}

interface TestClock {
  raw: string;
  /** The simulated time the clock was started at */
  simulated: number;
  /** The real time it was started at */
  startedAt: number;
}

const globalClock = globalThis as typeof globalThis & { __euforycFlashTestClock?: TestClock };

/**
 * The server's clock: the only authority on which phase the sale is in.
 *
 * On a developer's machine FLASH_TEST_NOW (an ISO timestamp, for example
 * 2026-11-27T11:59:30Z) simulates the day: the clock starts at that moment on
 * the first request and then runs forward in real time, so a phase change can
 * be watched as it happens. It is ignored in production.
 */
export function flashNow(): number {
  const raw = isLocalDev() ? process.env.FLASH_TEST_NOW : undefined;
  if (!raw) return Date.now();

  const simulated = Date.parse(raw);
  if (Number.isNaN(simulated)) return Date.now();

  // Kept on globalThis so both API routes share one simulated clock
  let clock = globalClock.__euforycFlashTestClock;
  if (!clock || clock.raw !== raw) {
    clock = { raw, simulated, startedAt: Date.now() };
    globalClock.__euforycFlashTestClock = clock;
  }
  return clock.simulated + (Date.now() - clock.startedAt);
}

// ---------------------------------------------------------------------------
// Configuration: all of it or none of it
// ---------------------------------------------------------------------------

export interface FlashConfig {
  vipPassword: string;
  codeVip: string;
  codePublic: string;
  checkoutUrl: string;
  sessionSecret: string;
}

/** The signing secret must be long enough to be worth signing with */
const MIN_SECRET_LENGTH = 32;

let warnedAboutConfig = false;

const read = (name: string) => (process.env[name] ?? '').trim();

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * The sale's secrets, or null if any one of them is missing or unusable.
 * Null means fail closed: callers must then return no code at all.
 */
export function readFlashConfig(): FlashConfig | null {
  const config: FlashConfig = {
    vipPassword: read('FLASH_VIP_PASSWORD'),
    codeVip: read('FLASH_CODE_VIP'),
    codePublic: read('FLASH_CODE_PUBLIC'),
    checkoutUrl: read('FLASH_CHECKOUT_URL'),
    sessionSecret: read('FLASH_SESSION_SECRET'),
  };

  const problems: string[] = [];
  if (!config.vipPassword) problems.push('FLASH_VIP_PASSWORD');
  if (!config.codeVip) problems.push('FLASH_CODE_VIP');
  if (!config.codePublic) problems.push('FLASH_CODE_PUBLIC');
  if (!isHttpsUrl(config.checkoutUrl)) problems.push('FLASH_CHECKOUT_URL');
  if (config.sessionSecret.length < MIN_SECRET_LENGTH) problems.push('FLASH_SESSION_SECRET');

  if (problems.length > 0) {
    // Names only, never values, and only once per server instance
    if (!warnedAboutConfig) {
      warnedAboutConfig = true;
      console.error(`[flash-sale] Not configured, no code will be shown. Missing or invalid: ${problems.join(', ')}`);
    }
    return null;
  }
  return config;
}

/** The studio sets FLASH_VIP_SOLD_OUT=true once Momence has counted all 20 */
export function vipSoldOut(): boolean {
  return read('FLASH_VIP_SOLD_OUT').toLowerCase() === 'true';
}

// ---------------------------------------------------------------------------
// The password
// ---------------------------------------------------------------------------

export const MAX_PASSWORD_LENGTH = 128;

// People type it on phones: spaces at the ends and capitals are forgiven
const normalise = (value: string) => value.normalize('NFKC').trim().toLowerCase();

const sha256 = (value: string) => createHash('sha256').update(value, 'utf8').digest();

/**
 * Constant-time password check. Both sides are hashed first, so the two
 * buffers are always the same length and the comparison leaks nothing about
 * the password, not even how long it is.
 */
export function passwordMatches(attempt: string, config: FlashConfig): boolean {
  const given = normalise(attempt);
  const expected = normalise(config.vipPassword);
  const equal = timingSafeEqual(sha256(given), sha256(expected));
  return equal && given.length > 0 && expected.length > 0;
}

// ---------------------------------------------------------------------------
// The unlock cookie
// ---------------------------------------------------------------------------

/**
 * In production the cookie is `__Secure-` prefixed and Secure, so it only
 * ever travels over HTTPS. Browsers refuse such a cookie on plain
 * http://localhost, so on a developer's machine it has a plain name and is
 * not marked Secure. That is the only difference.
 */
export function unlockCookieName(): string {
  return isLocalDev() ? 'flash-unlock-dev' : '__Secure-flash-unlock';
}

const sign = (payload: string, secret: string) => createHmac('sha256', secret).update(payload).digest('base64url');

/** A signed token: base64url(payload) + '.' + base64url(HMAC-SHA256 of that) */
export function createUnlockToken(secret: string, now: number): string {
  const payload = Buffer.from(JSON.stringify({ v: 1, iat: now, exp: FLASH_ENDS_AT })).toString('base64url');
  return `${payload}.${sign(payload, secret)}`;
}

/** True only for a token this server signed that has not expired */
export function verifyUnlockToken(token: string | undefined, secret: string, now: number): boolean {
  if (!token || !secret) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [payload, signature] = parts;
    if (!payload || !signature) return false;

    const given = Buffer.from(signature, 'base64url');
    const expected = Buffer.from(sign(payload, secret), 'base64url');
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;

    const data: unknown = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof data !== 'object' || data === null) return false;
    const { v, exp } = data as { v?: unknown; exp?: unknown };
    return v === 1 && typeof exp === 'number' && now < exp;
  } catch {
    return false;
  }
}

export function unlockCookieOptions() {
  return {
    httpOnly: true, // JavaScript cannot read it
    secure: !isLocalDev(),
    sameSite: 'lax' as const,
    path: '/',
    expires: new Date(FLASH_ENDS_AT), // gone when the sale is
  };
}

// ---------------------------------------------------------------------------
// Rate limit: 20 attempts per 15 minutes per IP
// ---------------------------------------------------------------------------

// 20, not the 5 of the Sips login: everyone on the studio's Wi-Fi shares one
// IP address, and a few mistyped passwords in the room must not lock all of
// them out for a quarter of an hour.
//
// Honest limits of this: the counter lives in the memory of one serverless
// instance. Vercel can run several instances at once and starts fresh ones
// whenever it likes, and each starts counting from zero. So this slows a
// brute-force attempt down; it does not make one impossible. The real
// protection is that the password is long, and that the code it guards stops
// working after 20 uses in Momence whoever holds it.
const MAX_ATTEMPTS = 20;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_TRACKED_IPS = 5000;

const attempts = new Map<string, { count: number; resetAt: number }>();

/**
 * Counts one attempt for this IP. `limited` is true once it has gone over,
 * and `retryAfter` is then the number of seconds until it may try again.
 * Uses the real clock, not the simulated one: this is about real traffic.
 */
export function takeAttempt(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();

  if (attempts.size > MAX_TRACKED_IPS) {
    attempts.forEach((record, key) => {
      if (now > record.resetAt) attempts.delete(key);
    });
  }

  const record = attempts.get(ip);
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  record.count += 1;
  if (record.count > MAX_ATTEMPTS) {
    return { limited: true, retryAfter: Math.max(1, Math.ceil((record.resetAt - now) / 1000)) };
  }
  return { limited: false, retryAfter: 0 };
}

/** A correct password clears the count, as in the Sips login */
export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}

// ---------------------------------------------------------------------------
// Request checks
// ---------------------------------------------------------------------------

/**
 * True when a POST comes from one of the site's own pages: its Origin header
 * names the host the request was sent to. A browser sets Origin itself and a
 * page on another site cannot change it, so this stops other sites from
 * posting to the unlock route on a visitor's behalf.
 */
export function isSameOrigin(headers: Headers): boolean {
  const origin = headers.get('origin');
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }
  const hosts = [headers.get('x-forwarded-host'), headers.get('host')]
    .map((value) => value?.split(',')[0]?.trim().toLowerCase())
    .filter(Boolean);
  return hosts.includes(originHost);
}

export const MAX_BODY_BYTES = 1024;

/**
 * Reads a request body as text, giving up (null) as soon as it passes
 * `maxBytes`, so an oversized body is never held in memory.
 */
export async function readBodyCapped(request: Request, maxBytes: number): Promise<string | null> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (!request.body) return '';

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

/** The same small pause before every refusal, so guessing is slow */
export const FAILURE_DELAY_MS = 350;

export const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
