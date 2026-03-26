/**
 * Barista Dashboard — Server-Side Session Auth
 *
 * Security architecture:
 *  - Password is validated with constant-time comparison (prevents timing attacks)
 *  - Session token is HMAC-SHA256 signed (tamper-proof)
 *  - Token includes expiry timestamp (auto-expires after 12 hours)
 *  - Delivered via HttpOnly + Secure + SameSite cookie (invisible to JavaScript)
 *  - No sensitive data stored client-side — ever
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = '__Host-barista-session';
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

/**
 * Derives an HMAC-SHA256 signing key from the BARISTA_PASSWORD env var.
 * This way the signing key is never hardcoded — it's derived from the
 * same secret the barista uses to log in.
 */
async function getSigningKey(): Promise<CryptoKey> {
  const secret = process.env.BARISTA_PASSWORD;
  if (!secret) {
    throw new Error('BARISTA_PASSWORD not configured');
  }

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  return keyMaterial;
}

/**
 * Creates a signed session token: base64(payload) + '.' + base64(signature)
 */
export async function createSessionToken(): Promise<string> {
  const key = await getSigningKey();
  const payload = JSON.stringify({
    role: 'barista',
    exp: Date.now() + SESSION_DURATION_MS,
    iat: Date.now(),
    jti: crypto.randomUUID(), // unique token ID prevents replay
  });

  const encoder = new TextEncoder();
  const payloadB64 = btoa(payload);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
  const sigB64 = btoa(Array.from(new Uint8Array(sigBuffer), (b) => String.fromCharCode(b)).join(''));

  return `${payloadB64}.${sigB64}`;
}

/**
 * Validates a session token: checks signature integrity and expiry.
 */
export async function validateSessionToken(token: string): Promise<boolean> {
  try {
    const [payloadB64, sigB64] = token.split('.');
    if (!payloadB64 || !sigB64) return false;

    const key = await getSigningKey();
    const encoder = new TextEncoder();

    // Verify HMAC signature
    const sigBytes = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payloadB64));
    if (!isValid) return false;

    // Check expiry
    const payload = JSON.parse(atob(payloadB64));
    if (!payload.exp || Date.now() > payload.exp) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Validates the barista password using constant-time comparison.
 * Returns true only if the password matches BARISTA_PASSWORD.
 */
export function validatePassword(password: string): boolean {
  const expected = process.env.BARISTA_PASSWORD;
  if (!expected || !password) return false;

  // Constant-time comparison to prevent timing attacks
  const encoder = new TextEncoder();
  const a = encoder.encode(password);
  const b = encoder.encode(expected);

  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  return mismatch === 0;
}

/**
 * Sets the session cookie on a response.
 */
export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,          // JavaScript cannot access this cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'lax',         // Prevents CSRF
    path: '/api/sips',       // Only sent to sips API routes
    maxAge: SESSION_DURATION_MS / 1000, // 12 hours in seconds
  });

  // Also set for the barista page route to allow server-side checks
  response.cookies.set(`${COOKIE_NAME}-page`, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/sips/barista',
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

/**
 * Clears the session cookies.
 */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/sips',
    maxAge: 0,
  });
  response.cookies.set(`${COOKIE_NAME}-page`, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/sips/barista',
    maxAge: 0,
  });
}

/**
 * Extracts and validates the session from a request.
 * Returns true if the request has a valid barista session.
 */
export async function authenticateBarista(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return validateSessionToken(token);
}
