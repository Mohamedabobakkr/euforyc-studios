/**
 * GET /api/sips/orders
 * Fetches today's pickup orders for the barista dashboard.
 * Protected by BARISTA_PASSWORD via Authorization header.
 */

import { NextRequest, NextResponse } from 'next/server';
import { squareFetch, getLocationId, SquareApiError } from '@/lib/square';
import type { SipsOrder, SipsOrderItem, FulfillmentState } from '@/lib/sips-types';

export const dynamic = 'force-dynamic';

interface SquareOrdersSearchResponse {
  orders?: SquareRawOrder[];
}

interface SquareRawOrder {
  id: string;
  version: number;
  state: string;
  created_at: string;
  total_money?: { amount: number };
  tenders?: unknown[];
  line_items?: {
    name?: string;
    quantity?: string;
    variation_name?: string;
    total_money?: { amount: number };
  }[];
  fulfillments?: {
    uid: string;
    type: string;
    state: string;
    pickup_details?: {
      recipient?: { display_name?: string };
      pickup_at?: string;
      note?: string;
    };
  }[];
}

export async function GET(request: NextRequest) {
  try {
    // Validate barista password via Authorization header
    const authHeader = request.headers.get('authorization') || '';
    const password = authHeader.replace(/^Bearer\s+/i, '');
    const expected = process.env.BARISTA_PASSWORD;

    if (!expected || password !== expected) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const locationId = getLocationId();

    // Today's date range (UTC)
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

    const data = await squareFetch<SquareOrdersSearchResponse>('/orders/search', {
      method: 'POST',
      body: {
        location_ids: [locationId],
        query: {
          filter: {
            date_time_filter: {
              created_at: {
                start_at: startOfDay,
                end_at: endOfDay,
              },
            },
            fulfillment_filter: {
              fulfillment_types: ['PICKUP'],
            },
            state_filter: {
              states: ['COMPLETED'],
            },
          },
          sort: {
            sort_field: 'CREATED_AT',
            sort_order: 'DESC',
          },
        },
      },
    });

    // Parse raw Square orders into our format
    const orders: SipsOrder[] = (data.orders || [])
      .filter((o) => o.fulfillments?.some((f) => f.type === 'PICKUP'))
      .map((o) => {
        const fulfillment = o.fulfillments!.find((f) => f.type === 'PICKUP')!;
        const items: SipsOrderItem[] = (o.line_items || []).map((li) => ({
          name: li.name || 'Unknown item',
          quantity: parseInt(li.quantity || '1', 10),
          variationName: li.variation_name || '',
          pricePence: li.total_money?.amount || 0,
        }));

        return {
          id: o.id,
          fulfillmentUid: fulfillment.uid,
          customerName: fulfillment.pickup_details?.recipient?.display_name || 'Guest',
          items,
          pickupTime: fulfillment.pickup_details?.pickup_at || o.created_at,
          createdAt: o.created_at,
          totalPence: o.total_money?.amount || 0,
          state: (fulfillment.state || 'PROPOSED') as FulfillmentState,
          version: o.version,
        };
      });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('[Sips Orders API] Error:', error);

    const status = error instanceof SquareApiError ? error.statusCode : 500;
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status },
    );
  }
}
