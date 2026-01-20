/**
 * Meta Conversions API - Purchase Event Tracking
 * Routes purchases to correct pixel based on purchase type
 *
 * @copyright Euforyc Studios 2025
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Pixel configurations
// NOTE: Euforyc purchases are already tracked by Momence's built-in CAPI integration
// We only need to track Skin Studio purchases separately
const PIXELS = {
  skin_studio: {
    pixelId: process.env.META_SKIN_STUDIO_PIXEL_ID || '1210900647179360',
    accessToken: process.env.META_SKIN_STUDIO_ACCESS_TOKEN || '',
  },
};

// Hash function for user data (required by Meta)
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Check if this is a Skin Studio purchase (appointments/aesthetic services)
function isSkinStudioPurchase(purchaseType: string, serviceName: string): boolean {
  const skinStudioKeywords = [
    'appointment', 'consultation', 'filler', 'botox', 'anti-wrinkle',
    'skin', 'aesthetic', 'iv drip', 'profhilo', 'laser', 'dermal',
    'lip', 'facial', 'body contouring', 'cavitation', 'skin booster',
    'polynucleotide', 'dermalux', 'microneedling'
  ];

  const lowerServiceName = serviceName.toLowerCase();
  const lowerPurchaseType = purchaseType.toLowerCase();

  // Check if it's a Skin Studio service
  return lowerPurchaseType === 'appointment' ||
    skinStudioKeywords.some(keyword => lowerServiceName.includes(keyword));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      event_name = 'Purchase',
      purchase_type = '', // 'appointment', 'class', 'membership', 'package'
      service_name = '',
      value = 0,
      currency = 'GBP',
      order_id = '',
      email = '',
      phone = '',
      first_name = '',
      last_name = '',
      client_ip = '',
      client_user_agent = '',
      event_source_url = '',
      fbc = '', // Facebook click ID
      fbp = '', // Facebook browser ID
    } = body;

    // Check if this is a Skin Studio purchase
    const skinStudio = isSkinStudioPurchase(purchase_type, service_name);

    // If NOT a Skin Studio purchase, skip - Momence already tracks Euforyc purchases
    if (!skinStudio) {
      console.log('Euforyc purchase - skipping CAPI (handled by Momence):', {
        service_name,
        purchase_type,
        value,
      });
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: 'Euforyc purchases are tracked by Momence CAPI',
      });
    }

    // Get Skin Studio pixel config
    const pixel = PIXELS.skin_studio;

    if (!pixel.accessToken) {
      console.error('No access token configured for Skin Studio pixel');
      return NextResponse.json(
        { error: 'No access token for Skin Studio' },
        { status: 500 }
      );
    }

    // Build user data object with hashed values
    const userData: Record<string, string> = {
      country: hashData('gb'),
    };

    if (email) userData.em = hashData(email);
    if (phone) userData.ph = hashData(phone.replace(/\D/g, ''));
    if (first_name) userData.fn = hashData(first_name);
    if (last_name) userData.ln = hashData(last_name);
    if (client_ip) userData.client_ip_address = client_ip;
    if (client_user_agent) userData.client_user_agent = client_user_agent;
    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    // Build event data
    const eventData = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: order_id || `purchase_${Date.now()}`,
          event_source_url: event_source_url || 'https://euforyc.co.uk/thank-you',
          action_source: 'website',
          user_data: userData,
          custom_data: {
            value: parseFloat(value) || 0,
            currency,
            content_name: service_name,
            content_category: purchase_type,
            order_id,
          },
        },
      ],
    };

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixel.pixelId}/events?access_token=${pixel.accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI Error:', result);
      return NextResponse.json(
        { error: 'Failed to send event to Meta', details: result },
        { status: 500 }
      );
    }

    console.log('Skin Studio purchase event sent via CAPI:', {
      order_id,
      value,
      service_name,
      pixel: pixel.pixelId,
    });

    return NextResponse.json({
      success: true,
      pixel: 'skin_studio',
      pixel_id: pixel.pixelId,
      events_received: result.events_received,
    });
  } catch (error) {
    console.error('Track purchase error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET for testing
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Skin Studio purchase tracking API is running',
    note: 'Euforyc purchases are tracked by Momence CAPI',
    skin_studio_pixel: PIXELS.skin_studio.pixelId,
  });
}
