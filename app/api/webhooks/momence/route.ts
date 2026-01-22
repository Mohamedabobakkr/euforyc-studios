/**
 * Momence Webhook Handler for Facebook Conversions API
 * Receives booking/payment webhooks from Momence and fires Purchase events
 *
 * This handles Skin Studio appointment purchases that go through Momence
 *
 * @copyright Euforyc Studios 2025
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Skin Studio pixel configuration
const SKIN_STUDIO_PIXEL = {
  pixelId: process.env.FB_SKIN_PIXEL_ID || process.env.META_SKIN_STUDIO_PIXEL_ID || '1210900647179360',
  accessToken: process.env.FB_SKIN_ACCESS_TOKEN || process.env.META_SKIN_STUDIO_ACCESS_TOKEN || '',
};

// Momence webhook secret for signature verification (if configured)
const MOMENCE_WEBHOOK_SECRET = process.env.MOMENCE_WEBHOOK_SECRET || '';

// Skin Studio service keywords to identify relevant bookings
const SKIN_STUDIO_KEYWORDS = [
  'appointment', 'consultation', 'filler', 'botox', 'anti-wrinkle',
  'skin', 'aesthetic', 'iv drip', 'profhilo', 'laser', 'dermal',
  'lip', 'facial', 'body contouring', 'cavitation', 'skin booster',
  'polynucleotide', 'dermalux', 'microneedling', 'treatment'
];

// Hash function for Facebook (SHA-256)
function hashSHA256(value: string | null | undefined): string | null {
  if (!value) return null;
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

// Verify webhook signature (if Momence provides one)
function verifySignature(payload: string, signature: string | null): boolean {
  if (!MOMENCE_WEBHOOK_SECRET || !signature) {
    // Skip verification if no secret configured
    return true;
  }

  const expectedSignature = crypto
    .createHmac('sha256', MOMENCE_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Check if this is a Skin Studio booking
function isSkinStudioBooking(booking: any): boolean {
  // Check booking type - Momence uses 'appointment' for one-on-one services
  const bookingType = (booking.type || booking.bookingType || '').toLowerCase();
  if (bookingType === 'appointment') {
    return true;
  }

  // Check service/product name
  const serviceName = (
    booking.serviceName ||
    booking.service?.name ||
    booking.product?.name ||
    booking.className ||
    booking.title ||
    ''
  ).toLowerCase();

  // Check category
  const category = (
    booking.category ||
    booking.service?.category ||
    ''
  ).toLowerCase();

  // Match against Skin Studio keywords
  const combinedText = `${serviceName} ${category} ${bookingType}`;
  return SKIN_STUDIO_KEYWORDS.some(keyword => combinedText.includes(keyword));
}

// Send Purchase event to Facebook Conversions API
async function sendPurchaseToFacebook(bookingData: {
  bookingId: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  serviceName: string;
  amount: number;
  currency: string;
  clientIp?: string;
  userAgent?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!SKIN_STUDIO_PIXEL.accessToken) {
    console.error('Momence Webhook: No Facebook access token configured');
    return { success: false, error: 'No access token configured' };
  }

  // Build user data with hashed values
  const userData: Record<string, unknown> = {
    country: ['gb'],
  };

  if (bookingData.email) userData.em = [hashSHA256(bookingData.email)];
  if (bookingData.phone) userData.ph = [hashSHA256(bookingData.phone.replace(/\D/g, ''))];
  if (bookingData.firstName) userData.fn = [hashSHA256(bookingData.firstName)];
  if (bookingData.lastName) userData.ln = [hashSHA256(bookingData.lastName)];
  if (bookingData.clientIp) userData.client_ip_address = bookingData.clientIp;
  if (bookingData.userAgent) userData.client_user_agent = bookingData.userAgent;

  // Build event data
  const eventData = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: `momence_${bookingData.bookingId}`, // Unique ID for deduplication
    action_source: 'website',
    event_source_url: 'https://euforyc.co.uk/skin-studio',
    user_data: userData,
    custom_data: {
      currency: bookingData.currency,
      value: bookingData.amount,
      content_type: 'product',
      content_name: bookingData.serviceName,
      content_category: 'skin_studio_appointment',
      order_id: bookingData.bookingId,
    },
  };

  try {
    const url = `https://graph.facebook.com/v18.0/${SKIN_STUDIO_PIXEL.pixelId}/events?access_token=${SKIN_STUDIO_PIXEL.accessToken}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [eventData] }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Momence Webhook: Facebook CAPI Error:', result);
      return { success: false, error: JSON.stringify(result) };
    }

    console.log('Momence Webhook: Purchase event sent to Facebook:', {
      booking_id: bookingData.bookingId,
      service: bookingData.serviceName,
      amount: bookingData.amount,
      pixel: SKIN_STUDIO_PIXEL.pixelId,
    });

    return { success: true };
  } catch (error) {
    console.error('Momence Webhook: Error sending to Facebook:', error);
    return { success: false, error: String(error) };
  }
}

// Extract booking data from Momence webhook payload
function extractBookingData(payload: any, request: NextRequest) {
  // Momence webhook payloads can vary - handle different structures
  const booking = payload.booking || payload.appointment || payload.data || payload;
  const customer = booking.customer || booking.client || booking.user || {};
  const service = booking.service || booking.product || {};
  const payment = booking.payment || {};

  // Get customer name - might be combined or separate
  let firstName = customer.firstName || customer.first_name || '';
  let lastName = customer.lastName || customer.last_name || '';

  if (!firstName && customer.name) {
    const nameParts = customer.name.split(' ');
    firstName = nameParts[0] || '';
    lastName = nameParts.slice(1).join(' ') || '';
  }

  return {
    bookingId: String(
      booking.id ||
      booking.bookingId ||
      booking._id ||
      `momence_${Date.now()}`
    ),
    email: customer.email || booking.email || '',
    phone: customer.phone || customer.phoneNumber || booking.phone || '',
    firstName,
    lastName,
    serviceName:
      service.name ||
      booking.serviceName ||
      booking.className ||
      booking.title ||
      'Skin Studio Appointment',
    amount:
      payment.amount ||
      booking.amount ||
      booking.price ||
      booking.total ||
      service.price ||
      0,
    currency:
      payment.currency ||
      booking.currency ||
      'GBP',
    clientIp: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '',
    userAgent: request.headers.get('user-agent') || '',
  };
}

// Main webhook handler
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // Verify webhook signature if configured
    const signature = request.headers.get('x-momence-signature') ||
                      request.headers.get('x-webhook-signature');

    if (!verifySignature(rawBody, signature)) {
      console.error('Momence Webhook: Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Log webhook event type
    const eventType = payload.event || payload.type || payload.eventType || 'unknown';
    console.log('Momence Webhook received:', {
      event: eventType,
      timestamp: new Date().toISOString(),
    });

    // Handle different Momence webhook events
    // Events we care about: booking.created, booking.paid, appointment.confirmed
    const purchaseEvents = [
      'booking.created',
      'booking.paid',
      'booking.completed',
      'appointment.created',
      'appointment.confirmed',
      'appointment.paid',
      'payment.completed',
      'order.completed',
    ];

    if (!purchaseEvents.includes(eventType) && eventType !== 'unknown') {
      // Not a purchase event - acknowledge but don't process
      console.log('Momence Webhook: Ignoring non-purchase event:', eventType);
      return NextResponse.json({
        received: true,
        processed: false,
        reason: `Event type '${eventType}' is not a purchase event`,
      });
    }

    // Check if this is a Skin Studio booking
    const booking = payload.booking || payload.appointment || payload.data || payload;

    if (!isSkinStudioBooking(booking)) {
      console.log('Momence Webhook: Not a Skin Studio booking, skipping');
      return NextResponse.json({
        received: true,
        processed: false,
        reason: 'Not a Skin Studio appointment',
      });
    }

    // Extract booking data
    const bookingData = extractBookingData(payload, request);

    // Skip if no amount (might be a free consultation or incomplete data)
    if (!bookingData.amount || bookingData.amount <= 0) {
      console.log('Momence Webhook: No payment amount, skipping Purchase event');
      return NextResponse.json({
        received: true,
        processed: false,
        reason: 'No payment amount in booking',
      });
    }

    // Send Purchase event to Facebook
    const result = await sendPurchaseToFacebook(bookingData);

    return NextResponse.json({
      received: true,
      processed: true,
      booking_id: bookingData.bookingId,
      service: bookingData.serviceName,
      amount: bookingData.amount,
      facebook_capi: result.success,
      error: result.error,
    });

  } catch (error) {
    console.error('Momence Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Momence webhook endpoint is running',
    purpose: 'Receives Skin Studio appointment bookings and fires Facebook Purchase events',
    pixel_id: SKIN_STUDIO_PIXEL.pixelId,
    has_access_token: !!SKIN_STUDIO_PIXEL.accessToken,
    webhook_url: 'https://euforyc.co.uk/api/webhooks/momence',
  });
}
