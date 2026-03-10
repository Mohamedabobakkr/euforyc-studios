/**
 * POST /api/sips/webhook
 * Receives Square webhook events, verifies the HMAC-SHA256 signature,
 * and sends a Telegram notification when a payment is completed.
 *
 * Security:
 *  - Raw body is used for signature computation (not the parsed JSON).
 *  - Signature is verified via constant-time comparison.
 *  - Unverified requests are rejected with 403.
 *  - Returns 200 to Square even if notification dispatch fails,
 *    so Square does not keep retrying.
 */

import { NextRequest, NextResponse } from 'next/server';
import { notifyNewOrder } from '@/lib/notify';

export const dynamic = 'force-dynamic';

// ── Square webhook event types ──

interface SquarePaymentData {
  id: string;
  order_id?: string;
  amount_money?: { amount: number; currency: string };
  status: string;
}

interface SquareOrderLineItem {
  name?: string;
  quantity?: string;
  variation_name?: string;
}

interface SquareOrderFulfillment {
  type: string;
  pickup_details?: {
    recipient?: { display_name?: string };
    pickup_at?: string;
    note?: string;
  };
}

interface SquareOrderData {
  id: string;
  line_items?: SquareOrderLineItem[];
  fulfillments?: SquareOrderFulfillment[];
  total_money?: { amount: number };
}

interface SquareWebhookEvent {
  type: string;
  event_id: string;
  data?: {
    type: string;
    id: string;
    object?: {
      payment?: SquarePaymentData;
      order?: SquareOrderData;
    };
  };
}

// ── Signature verification ──

async function verifySquareSignature(
  rawBody: string,
  signatureHeader: string,
  signatureKey: string,
  notificationUrl: string,
): Promise<boolean> {
  // Square's signature is computed over: notificationUrl + rawBody
  const payload = notificationUrl + rawBody;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(signatureKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const bytes = new Uint8Array(signatureBuffer);
  const computedSignature = btoa(
    Array.from(bytes, (b) => String.fromCharCode(b)).join(''),
  );

  // Constant-time comparison to prevent timing attacks
  if (computedSignature.length !== signatureHeader.length) return false;

  let mismatch = 0;
  for (let i = 0; i < computedSignature.length; i++) {
    mismatch |= computedSignature.charCodeAt(i) ^ signatureHeader.charCodeAt(i);
  }
  return mismatch === 0;
}

// ── Route handler ──

export async function POST(request: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

  if (!signatureKey) {
    console.error('[Webhook] SQUARE_WEBHOOK_SIGNATURE_KEY not configured');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  // Read the raw body for signature verification
  const rawBody = await request.text();
  const signature = request.headers.get('x-square-hmacsha256-signature') || '';

  // The notification URL must match exactly what's configured in the Square Dashboard
  const webhookUrl =
    process.env.SQUARE_WEBHOOK_URL || 'https://euforyc.co.uk/api/sips/webhook';

  // ── Verify signature ──
  const isValid = await verifySquareSignature(rawBody, signature, signatureKey, webhookUrl);

  if (!isValid) {
    console.warn('[Webhook] Invalid signature — request rejected');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
  }

  // ── Parse event ──
  let event: SquareWebhookEvent;
  try {
    event = JSON.parse(rawBody) as SquareWebhookEvent;
  } catch {
    console.error('[Webhook] Failed to parse request body');
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  console.log(`[Webhook] Received event: ${event.type} (${event.event_id})`);

  // ── Only process payment.updated events where status is COMPLETED ──
  if (event.type !== 'payment.updated') {
    return NextResponse.json({ received: true });
  }

  const paymentStatus = event.data?.object?.payment?.status;
  if (paymentStatus !== 'COMPLETED') {
    console.log(`[Webhook] Payment status is ${paymentStatus} — skipping`);
    return NextResponse.json({ received: true });
  }

  // ── Extract order details ──
  try {
    const payment = event.data?.object?.payment;
    const orderId = payment?.order_id || event.data?.id || 'unknown';
    const totalPence = payment?.amount_money?.amount || 0;

    // If Square embeds the order in the webhook payload
    const order = event.data?.object?.order;
    const fulfillment = order?.fulfillments?.find((f) => f.type === 'PICKUP');

    const customerName =
      fulfillment?.pickup_details?.recipient?.display_name || 'Guest';
    const pickupTime =
      fulfillment?.pickup_details?.pickup_at || new Date().toISOString();
    const note = fulfillment?.pickup_details?.note || '';

    const items = (order?.line_items || []).map((li) => ({
      name: li.name || 'Unknown item',
      quantity: parseInt(li.quantity || '1', 10),
      variationName: li.variation_name || '',
    }));

    // If no line items were embedded, still send a notification with what we have
    if (items.length === 0) {
      items.push({
        name: 'Order placed (see Square Dashboard for details)',
        quantity: 1,
        variationName: '',
      });
    }

    await notifyNewOrder({
      orderId,
      customerName,
      items,
      pickupTime,
      totalPence,
      note,
    });

    console.log(`[Webhook] Notification sent for order ${orderId}`);
  } catch (err) {
    // Log the error but still return 200 — don't let notification
    // failures cause Square to retry the webhook
    console.error('[Webhook] Error processing notification:', err);
  }

  return NextResponse.json({ received: true });
}
