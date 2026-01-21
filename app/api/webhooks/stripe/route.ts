/**
 * Stripe Webhook Handler for Facebook Conversions API
 * Routes purchases to correct pixel based on product/service type
 *
 * @copyright Euforyc Studios 2025
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import crypto from 'crypto';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil',
});

// Pixel configurations
const PIXELS = {
  pilates: {
    pixelId: process.env.FB_PILATES_PIXEL_ID || '1085377523538304',
    accessToken: process.env.FB_PILATES_ACCESS_TOKEN || '',
  },
  skin: {
    pixelId: process.env.FB_SKIN_PIXEL_ID || process.env.META_SKIN_STUDIO_PIXEL_ID || '1210900647179360',
    accessToken: process.env.FB_SKIN_ACCESS_TOKEN || process.env.META_SKIN_STUDIO_ACCESS_TOKEN || '',
  },
};

// Skin Studio product/price IDs from Stripe
// Add your Skin Studio Stripe product IDs here
const SKIN_STUDIO_PRODUCTS: string[] = (process.env.SKIN_STUDIO_STRIPE_PRODUCTS || '').split(',').filter(Boolean);
const SKIN_STUDIO_PRICES: string[] = (process.env.SKIN_STUDIO_STRIPE_PRICES || '').split(',').filter(Boolean);

// Skin Studio service keywords for fallback detection
const SKIN_STUDIO_KEYWORDS = [
  'appointment', 'consultation', 'filler', 'botox', 'anti-wrinkle',
  'skin', 'aesthetic', 'iv drip', 'profhilo', 'laser', 'dermal',
  'lip', 'facial', 'body contouring', 'cavitation', 'skin booster',
  'polynucleotide', 'dermalux', 'microneedling', 'aesthetic'
];

// Hash function for Facebook (SHA-256)
function hashSHA256(value: string | null | undefined): string | null {
  if (!value) return null;
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

// Determine business unit from Stripe line items
async function getBusinessUnit(session: Stripe.Checkout.Session): Promise<'skin' | 'pilates'> {
  try {
    // Check session metadata first (if explicitly set)
    if (session.metadata?.business_unit === 'skin') {
      return 'skin';
    }
    if (session.metadata?.business_unit === 'pilates') {
      return 'pilates';
    }

    // Get line items to check products
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    for (const item of lineItems.data) {
      const price = item.price;
      const productId = typeof price?.product === 'string' ? price.product : price?.product?.id;
      const priceId = price?.id;

      // Check if product/price is in Skin Studio lists
      if (productId && SKIN_STUDIO_PRODUCTS.includes(productId)) {
        return 'skin';
      }
      if (priceId && SKIN_STUDIO_PRICES.includes(priceId)) {
        return 'skin';
      }

      // Check product name for keywords
      const product = typeof price?.product === 'object' ? price.product as Stripe.Product : null;
      if (product?.name) {
        const productName = product.name.toLowerCase();
        if (SKIN_STUDIO_KEYWORDS.some(keyword => productName.includes(keyword))) {
          return 'skin';
        }
      }

      // Check item description
      if (item.description) {
        const description = item.description.toLowerCase();
        if (SKIN_STUDIO_KEYWORDS.some(keyword => description.includes(keyword))) {
          return 'skin';
        }
      }
    }

    // Default to pilates
    return 'pilates';
  } catch (error) {
    console.error('Error determining business unit:', error);
    return 'pilates';
  }
}

// Send event to Facebook Conversions API
async function sendToFacebookCAPI(
  pixel: { pixelId: string; accessToken: string },
  eventData: Record<string, unknown>
): Promise<{ success: boolean; response?: unknown; error?: string }> {
  if (!pixel.accessToken) {
    return { success: false, error: 'No access token configured' };
  }

  const url = `https://graph.facebook.com/v18.0/${pixel.pixelId}/events?access_token=${pixel.accessToken}`;

  const payload = {
    data: [eventData],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook CAPI Error:', result);
      return { success: false, error: JSON.stringify(result) };
    }

    return { success: true, response: result };
  } catch (error) {
    console.error('Error sending to Facebook CAPI:', error);
    return { success: false, error: String(error) };
  }
}

// Get raw body for signature verification
async function getRawBody(request: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();

  if (!reader) {
    throw new Error('No request body');
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

// Main webhook handler
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    console.error('Missing Stripe signature');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  let rawBody: Buffer;

  try {
    rawBody = await getRawBody(request);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle checkout.session.completed (successful payment)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process if payment was successful
    if (session.payment_status !== 'paid') {
      console.log('Payment not completed, skipping:', session.id);
      return NextResponse.json({ received: true, skipped: true });
    }

    // Extract customer data
    const customerEmail = session.customer_details?.email || session.customer_email || '';
    const customerPhone = session.customer_details?.phone || '';
    const customerName = session.customer_details?.name || '';
    const amount = (session.amount_total || 0) / 100; // Convert from cents
    const currency = session.currency?.toUpperCase() || 'GBP';

    // Determine which pixel to use
    const businessUnit = await getBusinessUnit(session);
    const pixel = PIXELS[businessUnit];

    console.log(`Processing purchase for ${businessUnit}:`, {
      session_id: session.id,
      email: customerEmail ? '***@***' : 'none',
      amount,
      currency,
    });

    // Parse customer name
    const nameParts = customerName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build user data object
    const userData: Record<string, unknown> = {
      country: ['gb'],
    };

    if (customerEmail) userData.em = [hashSHA256(customerEmail)];
    if (customerPhone) userData.ph = [hashSHA256(customerPhone.replace(/\D/g, ''))];
    if (firstName) userData.fn = [hashSHA256(firstName)];
    if (lastName) userData.ln = [hashSHA256(lastName)];

    // Get client IP if available
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (clientIp) userData.client_ip_address = clientIp;

    // Prepare Facebook event data
    const eventData = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: `stripe_${session.id}`, // For deduplication
      action_source: 'website',
      event_source_url: businessUnit === 'skin'
        ? 'https://euforyc.co.uk/skin-studio'
        : 'https://euforyc.co.uk',
      user_data: userData,
      custom_data: {
        currency: currency,
        value: amount,
        content_type: 'product',
        content_ids: [session.id],
        content_name: businessUnit === 'skin' ? 'Skin Studio Service' : 'Pilates Class/Package',
        order_id: session.id,
      },
    };

    // Send to correct Facebook pixel
    const result = await sendToFacebookCAPI(pixel, eventData);

    if (result.success) {
      console.log(`Purchase event sent to ${businessUnit} pixel (${pixel.pixelId})`);
    } else {
      console.error(`Failed to send to ${businessUnit} pixel:`, result.error);
    }

    return NextResponse.json({
      received: true,
      business_unit: businessUnit,
      pixel_id: pixel.pixelId,
      capi_success: result.success,
    });
  }

  // Handle payment_intent.succeeded (alternative tracking)
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log('Payment intent succeeded:', paymentIntent.id);
    // Add similar logic if needed
    return NextResponse.json({ received: true, event_type: 'payment_intent.succeeded' });
  }

  // Acknowledge other events
  console.log('Received event:', event.type);
  return NextResponse.json({ received: true });
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Stripe webhook endpoint is running',
    pixels: {
      pilates: PIXELS.pilates.pixelId,
      skin: PIXELS.skin.pixelId,
    },
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasPilatesToken: !!process.env.FB_PILATES_ACCESS_TOKEN,
    hasSkinToken: !!(process.env.FB_SKIN_ACCESS_TOKEN || process.env.META_SKIN_STUDIO_ACCESS_TOKEN),
  });
}
