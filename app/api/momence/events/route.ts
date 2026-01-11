/**
 * Momence Events API Route
 * Server-side proxy for fetching class schedule
 * Security: API token never exposed to client
 */

import { NextRequest, NextResponse } from 'next/server';
import { momenceClient } from '@/lib/momence-client';
import { MomenceApiError } from '@/lib/types/momence';

export const dynamic = 'force-dynamic'; // Disable static generation
export const revalidate = 300; // Revalidate every 5 minutes

/**
 * GET /api/momence/events
 * Query params:
 * - startDate: ISO date string (optional)
 * - endDate: ISO date string (optional)
 * - instructorId: string (optional)
 * - category: string (optional)
 * - level: string (optional)
 * - excludeSoldOut: boolean (optional)
 * - minSpotsAvailable: number (optional)
 * - grouped: boolean (optional) - return events grouped by date
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and sanitize query parameters
    const filters = {
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      instructorId: searchParams.get('instructorId') || undefined,
      category: searchParams.get('category') || undefined,
      level: searchParams.get('level') || undefined,
      excludeSoldOut: searchParams.get('excludeSoldOut') === 'true',
      minSpotsAvailable: searchParams.get('minSpotsAvailable')
        ? parseInt(searchParams.get('minSpotsAvailable')!, 10)
        : undefined,
    };

    const grouped = searchParams.get('grouped') === 'true';

    // Fetch events from Momence API
    const data = grouped
      ? await momenceClient.getEventsGroupedByDate(filters)
      : await momenceClient.getEvents(filters);

    // Return success response with cache headers
    return NextResponse.json(
      {
        success: true,
        data,
        timestamp: new Date().toISOString(),
        cached: false,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('[Momence Events API] Error:', error);

    // Handle Momence API errors
    if (error instanceof MomenceApiError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
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
