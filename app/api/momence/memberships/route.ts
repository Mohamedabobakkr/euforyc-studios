/**
 * Momence Memberships API Route
 * Server-side proxy for fetching membership plans
 * Security: API token never exposed to client
 */

import { NextRequest, NextResponse } from 'next/server';
import { momenceClient } from '@/lib/momence-client';
import { MomenceApiError } from '@/lib/types/momence';

export const dynamic = 'force-dynamic'; // Disable static generation
export const revalidate = 3600; // Revalidate every 1 hour

/**
 * GET /api/momence/memberships
 * Fetches all active membership plans
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch memberships from Momence API
    const memberships = await momenceClient.getMemberships();

    // Return success response with cache headers
    return NextResponse.json(
      {
        success: true,
        data: memberships,
        total: memberships.length,
        timestamp: new Date().toISOString(),
        cached: false,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    console.error('[Momence Memberships API] Error:', error);

    // Handle Momence API errors
    if (error instanceof MomenceApiError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: 'Failed to fetch memberships',
            details: process.env.NODE_ENV === 'development' ? error.details : undefined,
          },
          timestamp: new Date().toISOString(),
        },
        { status: error.statusCode }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
