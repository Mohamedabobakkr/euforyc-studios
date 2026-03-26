/**
 * POST /api/sips/auth
 * Barista login — validates password, returns HttpOnly session cookie.
 * GET  /api/sips/auth
 * Session check — validates existing cookie, returns auth status.
 *
 * Security:
 *  - Password validated with constant-time comparison
 *  - Rate limited: 5 attempts per 15 minutes per IP
 *  - Session token is HMAC-SHA256 signed with expiry
 *  - Cookie is HttpOnly + Secure + SameSite (invisible to JS)
 *  - Generic error messages (never reveals if password exists)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  validatePassword,
  createSessionToken,
  setSessionCookie,
  authenticateBarista,
} from '@/lib/barista-auth';

export const dynamic = 'force-dynamic';

// ── In-memory rate limiter ──
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count++;
  return record.count > MAX_ATTEMPTS;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// ── POST: Login ──
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // Rate limit check
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Try again later.' },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const password = typeof body.password === 'string' ? body.password.trim() : '';

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Validate password (constant-time comparison)
    if (!validatePassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Password correct — create session token and set cookie
    const token = await createSessionToken();
    const response = NextResponse.json({ success: true });
    setSessionCookie(response, token);

    // Clear rate limit on successful login
    loginAttempts.delete(ip);

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 },
    );
  }
}

// ── GET: Check session ──
export async function GET(request: NextRequest) {
  const isAuthenticated = await authenticateBarista(request);
  return NextResponse.json({ authenticated: isAuthenticated });
}
