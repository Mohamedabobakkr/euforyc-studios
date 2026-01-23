'use client';

/**
 * Thank You Page - Purchase Confirmation & Tracking
 * Receives purchase data from Momence and fires correct pixel
 *
 * @copyright Euforyc Studios 2025
 */

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Skin Studio service keywords for routing
const SKIN_STUDIO_KEYWORDS = [
  'appointment', 'consultation', 'filler', 'botox', 'anti-wrinkle',
  'skin', 'aesthetic', 'iv drip', 'profhilo', 'laser', 'dermal',
  'lip', 'facial', 'body contouring', 'cavitation', 'skin booster'
];

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [tracked, setTracked] = useState(false);
  const [business, setBusiness] = useState<'euforyc' | 'skin_studio'>('euforyc');

  useEffect(() => {
    if (tracked) return;

    // Get purchase data from URL params (sent by Momence)
    const purchaseType = searchParams.get('type') || searchParams.get('purchase_type') || '';
    const serviceName = searchParams.get('service') || searchParams.get('service_name') || searchParams.get('item') || '';
    const value = searchParams.get('value') || searchParams.get('amount') || searchParams.get('price') || '0';
    const orderId = searchParams.get('order_id') || searchParams.get('booking_id') || searchParams.get('id') || '';
    const email = searchParams.get('email') || '';
    const firstName = searchParams.get('first_name') || searchParams.get('fname') || '';
    const lastName = searchParams.get('last_name') || searchParams.get('lname') || '';
    const phone = searchParams.get('phone') || '';

    // Determine which business this purchase belongs to
    const lowerServiceName = serviceName.toLowerCase();
    const lowerPurchaseType = purchaseType.toLowerCase();

    const isSkinStudio = lowerPurchaseType === 'appointment' ||
      SKIN_STUDIO_KEYWORDS.some(keyword => lowerServiceName.includes(keyword));

    const targetBusiness = isSkinStudio ? 'skin_studio' : 'euforyc';
    setBusiness(targetBusiness);

    // Get Facebook cookies for better matching
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
      return '';
    };

    const fbc = getCookie('_fbc') || searchParams.get('fbc') || '';
    const fbp = getCookie('_fbp') || '';

    // Track purchase via CAPI (server-side)
    const trackPurchase = async () => {
      try {
        const response = await fetch('/api/track-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'Purchase',
            purchase_type: purchaseType || (isSkinStudio ? 'appointment' : 'class'),
            service_name: serviceName,
            value: parseFloat(value) || 0,
            currency: 'GBP',
            order_id: orderId,
            email,
            phone,
            first_name: firstName,
            last_name: lastName,
            client_user_agent: navigator.userAgent,
            event_source_url: window.location.href,
            fbc,
            fbp,
          }),
        });

        const result = await response.json();
        console.log('CAPI tracking result:', result);
      } catch (error) {
        console.error('CAPI tracking error:', error);
      }
    };

    // Fire client-side pixel as backup
    const fireClientPixel = () => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        const pixelId = isSkinStudio ? '1210900647179360' : '1085377523538304';

        // Initialize the correct pixel if not already done
        (window as any).fbq('init', pixelId);

        // Fire purchase event
        (window as any).fbq('track', 'Purchase', {
          value: parseFloat(value) || 0,
          currency: 'GBP',
          content_name: serviceName,
          content_category: purchaseType,
          order_id: orderId,
        });

        console.log(`Client pixel fired for ${targetBusiness}:`, pixelId);
      }
    };

    // Execute tracking
    // IMPORTANT: Both Skin Studio and Pilates purchases are tracked elsewhere:
    // - Skin Studio: Zapier → /api/webhooks/momence → Facebook CAPI
    // - Pilates: GTM + Momence built-in CAPI
    // The thank-you page should NOT fire additional Purchase events to avoid duplicates

    if (isSkinStudio) {
      console.log('Skin Studio purchase - tracked via Zapier webhook, skipping thank-you page');
    } else {
      console.log('Pilates purchase - tracked via GTM + Momence CAPI, skipping thank-you page');
    }
    setTracked(true);
  }, [searchParams, tracked]);

  const isSkinStudio = business === 'skin_studio';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="text-3xl md:text-4xl font-serif mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your booking has been confirmed. We&apos;ve sent a confirmation email with all the details.
        </p>

        {/* Booking Details */}
        {searchParams.get('service') && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold mb-4">Booking Details</h2>
            <div className="space-y-2 text-sm">
              {searchParams.get('service') && (
                <p><span className="text-gray-500">Service:</span> {searchParams.get('service')}</p>
              )}
              {searchParams.get('value') && (
                <p><span className="text-gray-500">Amount:</span> £{searchParams.get('value')}</p>
              )}
              {searchParams.get('order_id') && (
                <p><span className="text-gray-500">Booking ID:</span> {searchParams.get('order_id')}</p>
              )}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link
            href={isSkinStudio ? '/skin-studio' : '/schedule'}
            className="block w-full bg-[#1a260e] text-white py-3 px-6 rounded hover:bg-[#2a3620] transition-colors"
          >
            {isSkinStudio ? 'Back to Skin Studio' : 'View Schedule'}
          </Link>
          <Link
            href="/"
            className="block w-full border border-[#1a260e] text-[#1a260e] py-3 px-6 rounded hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Contact Info */}
        <p className="mt-8 text-sm text-gray-500">
          Questions? Contact us at{' '}
          <a href="mailto:euforyc@gmail.com" className="underline">
            euforyc@gmail.com
          </a>{' '}
          or{' '}
          <a href="tel:+447375710370" className="underline">
            +44 7375 710370
          </a>
        </p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a260e]"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
