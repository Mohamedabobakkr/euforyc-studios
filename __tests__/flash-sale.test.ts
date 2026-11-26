/**
 * Black Friday flash sale: the rules that must never break.
 *
 * Every value below is FAKE. The real password, codes and checkout link live
 * only in environment variables and never appear in this repository.
 */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { NextRequest } from 'next/server';

import { GET as getState } from '@/app/api/flash/state/route';
import { POST as postUnlock } from '@/app/api/flash/unlock/route';
import { buildFlashCalendar } from '@/components/flash-sale/calendar';
import {
  FLASH_ENDS_AT,
  FLASH_LAST_SECOND,
  FLASH_PRICES,
  FLASH_PUBLIC_AT,
  FLASH_VIP_AT,
  flashTracking,
  nextPhaseAt,
  phaseAt,
} from '@/components/flash-sale/config';
import {
  createUnlockToken,
  flashNow,
  passwordMatches,
  readFlashConfig,
  takeAttempt,
  unlockCookieName,
  unlockCookieOptions,
  verifyUnlockToken,
} from '@/lib/flash-sale';

const FAKE = {
  FLASH_VIP_PASSWORD: 'Test-Password-Not-Real',
  FLASH_CODE_VIP: 'TESTVIP50',
  FLASH_CODE_PUBLIC: 'TESTPUB40',
  FLASH_CHECKOUT_URL: 'https://checkout.example.test/pack',
  FLASH_SESSION_SECRET: 'test-only-signing-secret-0123456789-abcdef',
};
const SECRET_VALUES = Object.values(FAKE);

const ORIGIN = 'http://localhost:3000';
const at = (hours: number, minutes = 0, seconds = 0) => Date.UTC(2026, 10, 27, hours, minutes, seconds);

// process.env is typed read-only for NODE_ENV; the tests need to set it
const env = process.env as Record<string, string | undefined>;
const savedEnv = { ...process.env };

/** Sets the simulated server clock (honoured here because Jest is not production) */
const setClock = (iso: string) => {
  env.FLASH_TEST_NOW = iso;
};
const TEASER = '2026-11-27T10:00:00Z';
const VIP = '2026-11-27T13:00:00Z';
const PUBLIC = '2026-11-27T19:00:00Z';
const ENDED = '2026-11-28T00:00:05Z';

beforeEach(() => {
  Object.assign(env, FAKE);
  delete env.FLASH_VIP_SOLD_OUT;
  delete env.VERCEL_ENV;
  env.NODE_ENV = 'test';
  setClock(VIP);
});

afterEach(() => {
  Object.keys(env).forEach((key) => {
    if (!(key in savedEnv)) delete env[key];
  });
  Object.assign(env, savedEnv);
  jest.restoreAllMocks();
});

// Each test gets its own IP address, so the rate limit of one never touches another
let lastIp = 0;
const freshIp = () => `203.0.113.${(lastIp += 1)}`;

function stateRequest(cookie?: string) {
  return new NextRequest(`${ORIGIN}/api/flash/state`, { headers: cookie ? { cookie } : {} });
}

async function readState(cookie?: string) {
  const response = await getState(stateRequest(cookie));
  return { response, body: (await response.json()) as Record<string, unknown> };
}

interface UnlockOptions {
  ip?: string;
  origin?: string | null;
  contentType?: string;
  rawBody?: string;
}

async function unlock(password: unknown, options: UnlockOptions = {}) {
  const headers: Record<string, string> = {
    host: 'localhost:3000',
    'content-type': options.contentType ?? 'application/json',
    'x-forwarded-for': options.ip ?? freshIp(),
  };
  if (options.origin !== null) headers.origin = options.origin ?? ORIGIN;

  const response = await postUnlock(
    new NextRequest(`${ORIGIN}/api/flash/unlock`, {
      method: 'POST',
      headers,
      body: options.rawBody ?? JSON.stringify({ password }),
    })
  );
  return { response, body: (await response.json()) as Record<string, unknown> };
}

const REFUSED = { ok: false, error: 'invalid' };

// A cookie header carrying an unlock token
const cookieFor = (token: string) => `${unlockCookieName()}=${token}`;
const validCookie = () => cookieFor(createUnlockToken(FAKE.FLASH_SESSION_SECRET, flashNow()));

// ---------------------------------------------------------------------------

describe('phase calculation', () => {
  it('is the teaser until the last second before 12:00', () => {
    expect(phaseAt(Date.UTC(2026, 10, 20, 9, 0, 0))).toBe('teaser');
    expect(phaseAt(at(11, 59, 59))).toBe('teaser');
    expect(phaseAt(FLASH_VIP_AT - 1)).toBe('teaser');
  });

  it('is the password phase from 12:00:00 to 17:59:59', () => {
    expect(phaseAt(at(12, 0, 0))).toBe('vip');
    expect(phaseAt(FLASH_VIP_AT)).toBe('vip');
    expect(phaseAt(at(17, 59, 59))).toBe('vip');
    expect(phaseAt(FLASH_PUBLIC_AT - 1)).toBe('vip');
  });

  it('is public from 18:00:00 to 23:59:59', () => {
    expect(phaseAt(at(18, 0, 0))).toBe('public');
    expect(phaseAt(FLASH_PUBLIC_AT)).toBe('public');
    expect(phaseAt(at(23, 59, 59))).toBe('public');
    expect(phaseAt(FLASH_LAST_SECOND)).toBe('public');
    expect(phaseAt(FLASH_LAST_SECOND + 999)).toBe('public');
  });

  it('has ended from midnight', () => {
    expect(phaseAt(FLASH_ENDS_AT)).toBe('ended');
    expect(phaseAt(Date.UTC(2026, 10, 28, 0, 0, 0))).toBe('ended');
    expect(phaseAt(Date.UTC(2026, 11, 25, 12, 0, 0))).toBe('ended');
  });

  it('counts down to 12:00, then 18:00, then midnight, then nothing', () => {
    expect(nextPhaseAt('teaser')).toBe(at(12));
    expect(nextPhaseAt('vip')).toBe(at(18));
    expect(nextPhaseAt('public')).toBe(Date.UTC(2026, 10, 28, 0, 0, 0));
    expect(nextPhaseAt('ended')).toBeNull();
  });

  it('prices the pack at 50% and 40% off £56', () => {
    expect(FLASH_PRICES.vip).toMatchObject({ value: 28, price: '£28', perClass: '£14' });
    expect(FLASH_PRICES.public).toMatchObject({ value: 33.6, price: '£33.60', perClass: '£16.80' });
  });
});

// ---------------------------------------------------------------------------

// What the state route always returns, and all it returns unless a code is due
const ALWAYS = ['nextPhaseAt', 'phase', 'ready', 'serverNow', 'soldOutVip'];

// Each way one of the five required variables can be missing or unusable
const BROKEN_CONFIGS: Array<[string, string | undefined]> = [
  ['FLASH_VIP_PASSWORD', undefined],
  ['FLASH_CODE_VIP', undefined],
  ['FLASH_CODE_PUBLIC', ''],
  ['FLASH_CHECKOUT_URL', undefined],
  ['FLASH_CHECKOUT_URL', 'http://not-https.example.test'],
  ['FLASH_SESSION_SECRET', undefined],
  ['FLASH_SESSION_SECRET', 'too-short'],
];

/** The full fake configuration, with one variable removed or replaced */
function breakConfig(name: string, value: string | undefined) {
  Object.assign(env, FAKE);
  if (value === undefined) delete env[name];
  else env[name] = value;
}

describe('GET /api/flash/state', () => {
  it('returns no code and no checkout link in the teaser, even with a valid cookie', async () => {
    const cookie = validCookie();
    setClock(TEASER);
    const { response, body } = await readState(cookie);

    expect(response.status).toBe(200);
    expect(body.phase).toBe('teaser');
    expect(Object.keys(body).sort()).toEqual(ALWAYS);
    expect(body.nextPhaseAt).toBe(FLASH_VIP_AT);
    SECRET_VALUES.forEach((secret) => expect(JSON.stringify(body)).not.toContain(secret));
  });

  it('returns no code after the sale has ended, even with a valid cookie', async () => {
    const cookie = validCookie();
    setClock(ENDED);
    const { body } = await readState(cookie);

    expect(body.phase).toBe('ended');
    expect(body.nextPhaseAt).toBeNull();
    expect(body).not.toHaveProperty('code');
    expect(body).not.toHaveProperty('checkoutUrl');
  });

  it('returns no code in the password phase without a cookie', async () => {
    const { body } = await readState();

    expect(body.phase).toBe('vip');
    expect(body).not.toHaveProperty('code');
    expect(body).not.toHaveProperty('checkoutUrl');
    SECRET_VALUES.forEach((secret) => expect(JSON.stringify(body)).not.toContain(secret));
  });

  it('returns the 50% code in the password phase with a valid signed cookie', async () => {
    const { body } = await readState(validCookie());

    expect(body.code).toBe(FAKE.FLASH_CODE_VIP);
    expect(body.checkoutUrl).toBe(FAKE.FLASH_CHECKOUT_URL);
  });

  it('refuses a cookie that was tampered with, forged or signed with another secret', async () => {
    const [payload, signature] = createUnlockToken(FAKE.FLASH_SESSION_SECRET, flashNow()).split('.');
    const longer = Buffer.from(JSON.stringify({ v: 1, iat: 0, exp: FLASH_ENDS_AT * 2 })).toString('base64url');
    const forgeries = [
      `${longer}.${signature}`, // payload changed, signature kept
      `${payload}.${signature.slice(0, -2)}xx`, // signature changed
      `${payload}.`, // no signature
      createUnlockToken('some-other-secret-that-is-long-enough-000', flashNow()),
      'not-a-token',
    ];

    for (const forged of forgeries) {
      const { body } = await readState(cookieFor(forged));
      expect(body).not.toHaveProperty('code');
    }
  });

  it('returns the 40% code to everyone in the public phase, never the 50% one', async () => {
    const cookie = validCookie();
    setClock(PUBLIC);

    for (const who of [undefined, cookie]) {
      const { body } = await readState(who);
      expect(body.phase).toBe('public');
      expect(body.code).toBe(FAKE.FLASH_CODE_PUBLIC);
      expect(body.checkoutUrl).toBe(FAKE.FLASH_CHECKOUT_URL);
      expect(JSON.stringify(body)).not.toContain(FAKE.FLASH_CODE_VIP);
    }
  });

  it('returns no 50% code once the 20 are marked as gone', async () => {
    env.FLASH_VIP_SOLD_OUT = 'true';
    const { body } = await readState(validCookie());

    expect(body.soldOutVip).toBe(true);
    expect(body).not.toHaveProperty('code');
  });

  it('fails closed: with any secret missing or unusable, no code in any phase', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const cookie = validCookie();

    for (const [name, value] of BROKEN_CONFIGS) {
      breakConfig(name, value);
      expect(readFlashConfig()).toBeNull();

      for (const clock of [VIP, PUBLIC]) {
        setClock(clock);
        const { response, body } = await readState(cookie);
        expect(response.status).toBe(200);
        expect(body).not.toHaveProperty('code');
        expect(body).not.toHaveProperty('checkoutUrl');
      }
    }
  });

  it('says ready: true in every phase when all five secrets are present and valid', async () => {
    for (const clock of [TEASER, VIP, PUBLIC, ENDED]) {
      setClock(clock);
      const { body } = await readState();
      expect(body.ready).toBe(true);
    }

    // The sold-out switch is optional: it does not make the sale "not ready"
    env.FLASH_VIP_SOLD_OUT = 'true';
    setClock(VIP);
    expect((await readState()).body.ready).toBe(true);
  });

  it('says ready: false in every phase when any one is missing or invalid, and says nothing more', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    for (const clock of [TEASER, VIP, PUBLIC, ENDED]) {
      const answers: string[] = [];

      for (const [name, value] of BROKEN_CONFIGS) {
        breakConfig(name, value);
        setClock(clock);
        const { response, body } = await readState();

        expect(response.status).toBe(200);
        expect(body.ready).toBe(false);
        // Nothing but the usual fields: no detail about what is wrong
        expect(Object.keys(body).sort()).toEqual(ALWAYS);

        const text = JSON.stringify(body);
        expect(text).not.toContain('FLASH_');
        expect(text).not.toContain(name);
        SECRET_VALUES.forEach((secret) => expect(text).not.toContain(secret));
        if (value) expect(text).not.toContain(value);

        answers.push(JSON.stringify({ ...body, serverNow: 0 }));
      }

      // Whichever variable is the problem, the answer is word for word the same
      expect(new Set(answers).size).toBe(1);
    }
  });

  it('is never cached', async () => {
    const { response } = await readState();
    expect(response.headers.get('cache-control')).toContain('no-store');
  });
});

// ---------------------------------------------------------------------------

describe('POST /api/flash/unlock', () => {
  it('refuses a wrong password with the generic error, after a pause', async () => {
    const started = Date.now();
    const { response, body } = await unlock('definitely-wrong');

    expect(response.status).toBe(401);
    expect(body).toEqual(REFUSED);
    expect(response.headers.get('set-cookie')).toBeNull();
    expect(response.headers.get('cache-control')).toContain('no-store');
    expect(Date.now() - started).toBeGreaterThanOrEqual(300);
  });

  it('accepts the right password: returns the code and sets the signed cookie', async () => {
    const { response, body } = await unlock(FAKE.FLASH_VIP_PASSWORD);

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true, code: FAKE.FLASH_CODE_VIP, checkoutUrl: FAKE.FLASH_CHECKOUT_URL });

    const setCookie = response.headers.get('set-cookie') ?? '';
    expect(setCookie).toContain(`${unlockCookieName()}=`);
    expect(setCookie).toMatch(/HttpOnly/i);
    expect(setCookie).toMatch(/SameSite=lax/i);
    expect(setCookie).toMatch(/Path=\//i);
    expect(setCookie).toContain(`Expires=${new Date(FLASH_ENDS_AT).toUTCString()}`);

    // The cookie it set is the one the state route accepts
    const token = response.cookies.get(unlockCookieName())?.value ?? '';
    expect(verifyUnlockToken(token, FAKE.FLASH_SESSION_SECRET, flashNow())).toBe(true);
    const { body: state } = await readState(cookieFor(token));
    expect(state.code).toBe(FAKE.FLASH_CODE_VIP);
  });

  it('forgives capitals and stray spaces, as typed on a phone', async () => {
    const { response } = await unlock(`  ${FAKE.FLASH_VIP_PASSWORD.toUpperCase()} `);
    expect(response.status).toBe(200);
  });

  it('gives the same refusal in the wrong phase, even for the right password', async () => {
    for (const clock of [TEASER, PUBLIC, ENDED]) {
      setClock(clock);
      const { response, body } = await unlock(FAKE.FLASH_VIP_PASSWORD);
      expect(response.status).toBe(401);
      expect(body).toEqual(REFUSED);
      expect(response.headers.get('set-cookie')).toBeNull();
    }
  });

  it('gives the same refusal when the 20 are gone or the sale is not configured', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    env.FLASH_VIP_SOLD_OUT = 'true';
    expect((await unlock(FAKE.FLASH_VIP_PASSWORD)).body).toEqual(REFUSED);
    delete env.FLASH_VIP_SOLD_OUT;

    delete env.FLASH_CODE_VIP;
    const { response, body } = await unlock(FAKE.FLASH_VIP_PASSWORD);
    expect(response.status).toBe(401);
    expect(body).toEqual(REFUSED);
  });

  it('refuses a body over 1 KB, a password over 128 characters, and anything that is not JSON', async () => {
    const oversize = await unlock(FAKE.FLASH_VIP_PASSWORD, {
      rawBody: JSON.stringify({ password: FAKE.FLASH_VIP_PASSWORD, padding: 'x'.repeat(1100) }),
    });
    expect(oversize.response.status).toBe(401);
    expect(oversize.body).toEqual(REFUSED);

    const longPassword = await unlock('p'.repeat(129));
    expect(longPassword.body).toEqual(REFUSED);

    const notJsonType = await unlock(FAKE.FLASH_VIP_PASSWORD, { contentType: 'text/plain' });
    expect(notJsonType.body).toEqual(REFUSED);

    const notJsonBody = await unlock(null, { rawBody: `password=${FAKE.FLASH_VIP_PASSWORD}` });
    expect(notJsonBody.body).toEqual(REFUSED);

    const wrongShape = await unlock(12345);
    expect(wrongShape.body).toEqual(REFUSED);
  });

  it('refuses a request that does not come from the site itself', async () => {
    const elsewhere = await unlock(FAKE.FLASH_VIP_PASSWORD, { origin: 'https://evil.example.test' });
    expect(elsewhere.response.status).toBe(401);
    expect(elsewhere.body).toEqual(REFUSED);

    const noOrigin = await unlock(FAKE.FLASH_VIP_PASSWORD, { origin: null });
    expect(noOrigin.body).toEqual(REFUSED);
  });

  it('rate limits an IP after 20 attempts in 15 minutes', async () => {
    const ip = freshIp();
    for (let attempt = 1; attempt <= 20; attempt += 1) {
      const { response } = await unlock('wrong', { ip });
      expect(response.status).toBe(401);
    }

    // The twenty-first is turned away, even with the right password
    const { response, body } = await unlock(FAKE.FLASH_VIP_PASSWORD, { ip });
    expect(response.status).toBe(429);
    expect(body.ok).toBe(false);
    expect(body.error).toBe('rate_limited');
    expect(body.retryAfter).toBeGreaterThan(0);
    expect(body.retryAfter).toBeLessThanOrEqual(15 * 60);
    expect(response.headers.get('retry-after')).toBe(String(body.retryAfter));
    expect(JSON.stringify(body)).not.toContain(FAKE.FLASH_CODE_VIP);

    // Someone else is not affected
    expect((await unlock(FAKE.FLASH_VIP_PASSWORD)).response.status).toBe(200);
    // 20 refusals each wait out the fixed pause, so this test needs longer than Jest's 5 seconds
  }, 30_000);

  it('clears the count after a correct password', async () => {
    const ip = freshIp();
    // 19 attempts already against this IP. Counted directly, which skips the pause.
    for (let attempt = 1; attempt <= 19; attempt += 1) expect(takeAttempt(ip).limited).toBe(false);

    // The 20th is the right password: accepted, and the count starts again
    expect((await unlock(FAKE.FLASH_VIP_PASSWORD, { ip })).response.status).toBe(200);

    // So a full 20 more are allowed, and only the 21st is over the limit
    for (let attempt = 1; attempt <= 20; attempt += 1) expect(takeAttempt(ip).limited).toBe(false);
    const over = takeAttempt(ip);
    expect(over.limited).toBe(true);
    expect(over.retryAfter).toBeGreaterThan(0);
    expect((await unlock(FAKE.FLASH_VIP_PASSWORD, { ip })).response.status).toBe(429);
  });

  it('never logs the password, a code, the link or the secret', async () => {
    const logged: unknown[] = [];
    (['log', 'info', 'warn', 'error', 'debug'] as const).forEach((method) => {
      jest.spyOn(console, method).mockImplementation((...args: unknown[]) => {
        logged.push(...args);
      });
    });

    await unlock('wrong-guess-that-must-not-be-logged');
    await unlock(FAKE.FLASH_VIP_PASSWORD);
    await readState(validCookie());
    setClock(PUBLIC);
    await readState();
    delete env.FLASH_CODE_PUBLIC;
    await readState();

    const text = logged.map(String).join('\n');
    [...SECRET_VALUES, 'wrong-guess-that-must-not-be-logged'].forEach((secret) => expect(text).not.toContain(secret));
  });
});

// ---------------------------------------------------------------------------

describe('the unlock cookie', () => {
  const secret = FAKE.FLASH_SESSION_SECRET;

  it('verifies a token it signed, until the sale ends', () => {
    const token = createUnlockToken(secret, at(13));
    expect(verifyUnlockToken(token, secret, at(13))).toBe(true);
    expect(verifyUnlockToken(token, secret, FLASH_LAST_SECOND)).toBe(true);
  });

  it('refuses an expired token', () => {
    const token = createUnlockToken(secret, at(13));
    expect(verifyUnlockToken(token, secret, FLASH_ENDS_AT)).toBe(false);
    expect(verifyUnlockToken(token, secret, FLASH_ENDS_AT + 60_000)).toBe(false);
  });

  it('refuses a tampered token', () => {
    const [payload, signature] = createUnlockToken(secret, at(13)).split('.');
    const edited = Buffer.from(JSON.stringify({ v: 1, iat: at(13), exp: FLASH_ENDS_AT + 86_400_000 })).toString('base64url');

    expect(verifyUnlockToken(`${edited}.${signature}`, secret, at(13))).toBe(false);
    expect(verifyUnlockToken(`${payload}.${signature.split('').reverse().join('')}`, secret, at(13))).toBe(false);
    expect(verifyUnlockToken(`${payload}x.${signature}`, secret, at(13))).toBe(false);
    expect(verifyUnlockToken(payload, secret, at(13))).toBe(false);
    expect(verifyUnlockToken(`${payload}.${signature}.extra`, secret, at(13))).toBe(false);
  });

  it('refuses a token signed with a different secret, and nonsense', () => {
    const other = createUnlockToken('a-completely-different-secret-0123456789', at(13));
    expect(verifyUnlockToken(other, secret, at(13))).toBe(false);
    expect(verifyUnlockToken(undefined, secret, at(13))).toBe(false);
    expect(verifyUnlockToken('', secret, at(13))).toBe(false);
    expect(verifyUnlockToken('..', secret, at(13))).toBe(false);
    expect(verifyUnlockToken(createUnlockToken(secret, at(13)), '', at(13))).toBe(false);
  });

  it('is __Secure-, Secure, HttpOnly, SameSite=Lax, Path=/ and expires at sale end in production', () => {
    env.NODE_ENV = 'production';
    expect(unlockCookieName()).toBe('__Secure-flash-unlock');
    expect(unlockCookieOptions()).toEqual({
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(FLASH_ENDS_AT),
    });

    // And on Vercel production whatever NODE_ENV says
    env.NODE_ENV = 'development';
    env.VERCEL_ENV = 'production';
    expect(unlockCookieName()).toBe('__Secure-flash-unlock');
    expect(unlockCookieOptions().secure).toBe(true);
  });
});

// ---------------------------------------------------------------------------

describe('the password check', () => {
  const config = () => readFlashConfig()!;

  it('matches the password whatever the capitals or surrounding spaces', () => {
    expect(passwordMatches(FAKE.FLASH_VIP_PASSWORD, config())).toBe(true);
    expect(passwordMatches(`\t${FAKE.FLASH_VIP_PASSWORD.toLowerCase()}\n`, config())).toBe(true);
  });

  it('rejects anything else, including an empty attempt and a near miss', () => {
    expect(passwordMatches('', config())).toBe(false);
    expect(passwordMatches('   ', config())).toBe(false);
    expect(passwordMatches(FAKE.FLASH_VIP_PASSWORD.slice(0, -1), config())).toBe(false);
    expect(passwordMatches(`${FAKE.FLASH_VIP_PASSWORD}x`, config())).toBe(false);
  });
});

// ---------------------------------------------------------------------------

describe('FLASH_TEST_NOW', () => {
  const nearRealNow = (time: number) => Math.abs(time - Date.now()) < 5000;

  it('simulates the clock on a developer machine', () => {
    setClock(PUBLIC);
    expect(Math.abs(flashNow() - Date.parse(PUBLIC))).toBeLessThan(5000);
    expect(phaseAt(flashNow())).toBe('public');
  });

  it('is ignored in a production build', async () => {
    setClock(PUBLIC);
    env.NODE_ENV = 'production';

    expect(nearRealNow(flashNow())).toBe(true);

    // And so the API answers by the real clock, not the simulated one
    const { body } = await readState();
    expect(nearRealNow(body.serverNow as number)).toBe(true);
    expect(body.phase).toBe(phaseAt(Date.now()));
  });

  it('is ignored on Vercel production', () => {
    setClock(PUBLIC);
    env.NODE_ENV = 'development';
    env.VERCEL_ENV = 'production';
    expect(nearRealNow(flashNow())).toBe(true);
  });

  it('falls back to the real clock when it is not a date', () => {
    setClock('not-a-date');
    expect(nearRealNow(flashNow())).toBe(true);
  });
});

// ---------------------------------------------------------------------------

describe('what leaves the server without being asked', () => {
  it('keeps the code out of the tracking attributes', () => {
    const attributes = JSON.stringify([flashTracking('vip'), flashTracking('public')]);
    SECRET_VALUES.forEach((secret) => expect(attributes).not.toContain(secret));
    expect(flashTracking('vip')['data-offer-id']).toBe('flash-2-classes');
    expect(flashTracking('public')['data-value']).toBe('33.6');
  });

  it('builds a calendar file with the two openings, 12:00 and 18:00', () => {
    const ics = buildFlashCalendar('https://euforyc.co.uk/flash', at(9));

    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(ics).toContain('DTSTART:20261127T120000Z');
    expect(ics).toContain('DTSTART:20261127T180000Z');
    expect(ics).toContain('URL:https://euforyc.co.uk/flash');
    ics.split('\r\n').forEach((line) => expect(line.length).toBeLessThanOrEqual(75));
    SECRET_VALUES.forEach((secret) => expect(ics).not.toContain(secret));
  });
});
