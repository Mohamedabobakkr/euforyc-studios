/**
 * Momence Teachers API Route
 * Server-side proxy for fetching instructor profiles
 * Security: API token never exposed to client
 */

import { NextRequest, NextResponse } from 'next/server';
import { momenceClient } from '@/lib/momence-client';
import { MomenceApiError } from '@/lib/types/momence';

export const dynamic = 'force-dynamic'; // Disable static generation
export const revalidate = 7200; // Revalidate every 2 hours

/**
 * GET /api/momence/teachers
 * Fetches all active instructors/teachers
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch teachers from Momence API
    const teachers = await momenceClient.getTeachers();

    // Return success response with cache headers
    return NextResponse.json(
      {
        success: true,
        data: teachers,
        total: teachers.length,
        timestamp: new Date().toISOString(),
        cached: false,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=14400',
        },
      }
    );
  } catch (error) {
    console.error('[Momence Teachers API] Error:', error);

    // Handle Momence API errors
    if (error instanceof MomenceApiError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: 'Failed to fetch teachers',
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
