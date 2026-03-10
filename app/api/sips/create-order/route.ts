/**
 * POST /api/sips/create-order
 * Creates a Square payment link with an embedded order (PICKUP fulfillment).
 * The payment link API creates the order for us — no separate order creation needed.
 */

import { NextRequest, NextResponse } from 'next/server';
import { squareFetch, getLocationId, newIdempotencyKey, SquareApiError } from '@/lib/square';
import type { CreateOrderPayload } from '@/lib/sips-types';

export const dynamic = 'force-dynamic';

// Allowed redirect domains — prevents open redirect attacks
const ALLOWED_ORIGINS = [
  'https://euforyc.co.uk',
  'https://www.euforyc.co.uk',
  'http://localhost:3000',
];

interface SquarePaymentLinkResponse {
  payment_link?: {
    url: string;
    id: string;
    order_id: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderPayload = await request.json();

    // ── Input validation ──
    if (!body.items?.length || !body.customerName || !body.pickupAt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: items, customerName, pickupAt' },
        { status: 400 },
      );
    }

    // Sanitize & limit input lengths
    const customerName = String(body.customerName).trim().slice(0, 100);
    const note = body.note ? String(body.note).trim().slice(0, 500) : '';
    const pickupAt = String(body.pickupAt).trim();

    if (!customerName) {
      return NextResponse.json(
        { success: false, error: 'Customer name is required' },
        { status: 400 },
      );
    }

    // Validate pickupAt is a reasonable ISO date
    const pickupDate = new Date(pickupAt);
    if (isNaN(pickupDate.getTime()) || pickupDate < new Date(Date.now() - 60000)) {
      return NextResponse.json(
        { success: false, error: 'Invalid pickup time' },
        { status: 400 },
      );
    }

    // Limit total items
    if (body.items.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Too many items in order' },
        { status: 400 },
      );
    }

    const locationId = getLocationId();

    // Build line items — filter out any with missing IDs, cap quantity
    const lineItems = body.items
      .filter((item) => item.catalogObjectId && item.quantity > 0)
      .map((item) => {
        const quantity = Math.min(Math.max(1, Math.floor(Number(item.quantity))), 99);
        const lineItem: {
          catalog_object_id: string;
          quantity: string;
          modifiers?: { catalog_object_id: string }[];
        } = {
          catalog_object_id: String(item.catalogObjectId).slice(0, 100),
          quantity: String(quantity),
        };
        // Attach modifiers if any were selected (cap at 20)
        if (item.modifierIds?.length) {
          lineItem.modifiers = item.modifierIds.slice(0, 20).map((id) => ({
            catalog_object_id: String(id).slice(0, 100),
          }));
        }
        return lineItem;
      });

    if (lineItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid items in cart. Please try adding items again.' },
        { status: 400 },
      );
    }

    // Build safe redirect URL — validate against whitelist
    const origin = request.headers.get('origin') || '';
    const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    // Single idempotency key for both header and body
    const idempotencyKey = newIdempotencyKey();

    // Create payment link with embedded order
    const linkData = await squareFetch<SquarePaymentLinkResponse>(
      '/online-checkout/payment-links',
      {
        method: 'POST',
        idempotencyKey,
        body: {
          idempotency_key: idempotencyKey,
          order: {
            location_id: locationId,
            line_items: lineItems,
            fulfillments: [
              {
                type: 'PICKUP',
                state: 'PROPOSED',
                pickup_details: {
                  recipient: {
                    display_name: customerName,
                  },
                  pickup_at: pickupAt,
                  schedule_type: 'SCHEDULED',
                  note: note || 'euforyc sips — click & collect',
                },
              },
            ],
          },
          checkout_options: {
            redirect_url: `${safeOrigin}/sips/order?success=true`,
            ask_for_shipping_address: false,
          },
        },
      },
    );

    const paymentUrl = linkData.payment_link?.url;
    const orderId = linkData.payment_link?.order_id;

    if (!paymentUrl) {
      throw new Error('Payment link created but no URL returned');
    }

    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
    });
  } catch (error) {
    console.error('[Sips Create Order] Error:', error);

    const status = error instanceof SquareApiError ? error.statusCode : 500;
    return NextResponse.json(
      { success: false, error: 'Failed to create order. Please try again.' },
      { status },
    );
  }
}
