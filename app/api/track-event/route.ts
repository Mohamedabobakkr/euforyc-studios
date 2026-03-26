/**
 * Facebook Conversions API - All Events Tracking
 * Handles PageView, ViewContent, Lead, Contact, and custom events
 * Routes to correct pixel based on business_unit
 *
 * @copyright Euforyc Studios 2025
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Pixel configurations
const PIXELS = {
  pilates: {
    pixelId: process.env.FB_PILATES_PIXEL_ID || '',
    accessToken: process.env.FB_PILATES_ACCESS_TOKEN || '',
  },
  skin: {
    pixelId: process.env.FB_SKIN_PIXEL_ID || process.env.META_SKIN_STUDIO_PIXEL_ID || '',
    accessToken: process.env.FB_SKIN_ACCESS_TOKEN || process.env.META_SKIN_STUDIO_ACCESS_TOKEN || '',
  },
};

// Hash function for Facebook (SHA-256)
function hashSHA256(value: string | null | undefined): string | null {
  if (!value) return null;
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

// Generate unique event ID for deduplication
function generateEventId(eventName: string, timestamp: number): string {
  const random = crypto.randomBytes(8).toString('hex');
  return `${eventName.toLowerCase()}_${timestamp}_${random}`;
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      event_name,
      event_id, // Client should generate and pass this for deduplication
      business_unit = 'pilates', // 'pilates' or 'skin'
      page_url = '',
      page_path = '',
      // User data (will be hashed)
      email = '',
      phone = '',
      first_name = '',
      last_name = '',
      fbc = '', // Facebook click ID cookie
      fbp = '', // Facebook browser ID cookie
      // Custom data
      content_name = '',
      content_type = '',
      content_category = '',
      value = 0,
      currency = 'GBP',
    } = body;

    if (!event_name) {
      return NextResponse.json({ error: 'event_name is required' }, { status: 400 });
    }

    // Select correct pixel based on business unit
    const pixel = business_unit === 'skin' ? PIXELS.skin : PIXELS.pilates;

    // Skip if no access token (Pilates events handled by Momence)
    if (!pixel.accessToken) {
      // For Pilates, we only skip non-Purchase events since Momence handles the pixel
      if (business_unit === 'pilates') {
        return NextResponse.json({
          success: true,
          skipped: true,
          reason: 'Pilates events tracked via GTM/Momence',
        });
      }
      return NextResponse.json({ error: 'No access token for pixel' }, { status: 500 });
    }

    const eventTime = Math.floor(Date.now() / 1000);
    const finalEventId = event_id || generateEventId(event_name, eventTime);

    // Build user data object with hashed values
    const userData: Record<string, unknown> = {
      country: ['gb'],
    };

    if (email) userData.em = [hashSHA256(email)];
    if (phone) userData.ph = [hashSHA256(phone.replace(/\D/g, ''))];
    if (first_name) userData.fn = [hashSHA256(first_name)];
    if (last_name) userData.ln = [hashSHA256(last_name)];
    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    // Get client IP
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (clientIp) userData.client_ip_address = clientIp;

    // Get user agent
    const userAgent = request.headers.get('user-agent');
    if (userAgent) userData.client_user_agent = userAgent;

    // Build custom data based on event type
    const customData: Record<string, unknown> = {};

    if (content_name) customData.content_name = content_name;
    if (content_type) customData.content_type = content_type;
    if (content_category) customData.content_category = content_category;
    if (value) {
      customData.value = parseFloat(value) || 0;
      customData.currency = currency;
    }

    // Prepare Facebook event data
    const eventData: Record<string, unknown> = {
      event_name,
      event_time: eventTime,
      event_id: finalEventId, // CRITICAL: Same ID as browser pixel for deduplication
      action_source: 'website',
      event_source_url: page_url || (business_unit === 'skin'
        ? 'https://euforyc.co.uk/skin-studio'
        : 'https://euforyc.co.uk'),
      user_data: userData,
    };

    // Only add custom_data if it has content
    if (Object.keys(customData).length > 0) {
      eventData.custom_data = customData;
    }

    // Send to Facebook CAPI
    const result = await sendToFacebookCAPI(pixel, eventData);

    if (result.success) {
      console.log('Event sent to pixel:', { event_name, business_unit });
    } else {
      console.error('Failed to send event:', { event_name, business_unit, error: result.error });
    }

    return NextResponse.json({
      success: result.success,
      event_id: finalEventId, // Return for client-side deduplication
      pixel: business_unit,
    });
  } catch (error) {
    console.error('Track event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Health check — no sensitive info exposed
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
