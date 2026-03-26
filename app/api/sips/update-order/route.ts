/**
 * PATCH /api/sips/update-order
 * Updates order fulfillment status (barista dashboard).
 * Protected by HttpOnly session cookie (set via /api/sips/auth).
 */

import { NextRequest, NextResponse } from 'next/server';
import { squareFetch, getLocationId, newIdempotencyKey, SquareApiError } from '@/lib/square';
import { authenticateBarista } from '@/lib/barista-auth';
import type { UpdateOrderPayload, FulfillmentState } from '@/lib/sips-types';

export const dynamic = 'force-dynamic';

const VALID_TRANSITIONS: Record<FulfillmentState, FulfillmentState | null> = {
  PROPOSED: 'RESERVED',
  RESERVED: 'PREPARED',
  PREPARED: 'COMPLETED',
  COMPLETED: null,
};

export async function PATCH(request: NextRequest) {
  try {
    // Validate barista session via HttpOnly cookie
    const isAuthenticated = await authenticateBarista(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const body: UpdateOrderPayload = await request.json();

    if (!body.orderId || !body.fulfillmentUid || !body.newState) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Validate orderId and fulfillmentUid format (alphanumeric + hyphens only)
    const safeIdPattern = /^[a-zA-Z0-9_-]+$/;
    if (!safeIdPattern.test(body.orderId) || !safeIdPattern.test(body.fulfillmentUid)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 },
      );
    }

    // Validate state transition
    const validNext = Object.values(VALID_TRANSITIONS);
    if (!validNext.includes(body.newState)) {
      return NextResponse.json(
        { success: false, error: `Invalid state: ${body.newState}` },
        { status: 400 },
      );
    }

    const locationId = getLocationId();

    const data = await squareFetch(`/orders/${body.orderId}`, {
      method: 'PUT',
      idempotencyKey: newIdempotencyKey(),
      body: {
        order: {
          location_id: locationId,
          version: body.version,
          fulfillments: [
            {
              uid: body.fulfillmentUid,
              state: body.newState,
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error('[Sips Update Order] Error:', error);

    const status = error instanceof SquareApiError ? error.statusCode : 500;
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status },
    );
  }
}
