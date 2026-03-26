/**
 * POST /api/sips/auth/logout
 * Clears the barista session cookie.
 */

import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/barista-auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
