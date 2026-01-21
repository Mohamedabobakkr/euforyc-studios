/**
 * Event Tracking Helper
 * Sends events to both browser pixel (via fbq) and server (via CAPI)
 * Uses matching event_id for proper deduplication
 *
 * @copyright Euforyc Studios 2025
 */

// Generate unique event ID
function generateEventId(eventName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `${eventName.toLowerCase()}_${timestamp}_${random}`;
}

// Get Facebook cookies
function getFacebookCookies(): { fbc: string; fbp: string } {
  if (typeof document === 'undefined') return { fbc: '', fbp: '' };

  const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  return {
    fbc: getCookie('_fbc'),
    fbp: getCookie('_fbp'),
  };
}

// Get user data from page (if available)
function getUserData(): { email?: string; phone?: string; firstName?: string; lastName?: string } {
  if (typeof document === 'undefined') return {};

  // Try to find user data from forms or meta tags
  const emailInput = document.querySelector('input[type="email"], input[name="email"]') as HTMLInputElement;
  const phoneInput = document.querySelector('input[type="tel"], input[name="phone"]') as HTMLInputElement;

  return {
    email: emailInput?.value || undefined,
    phone: phoneInput?.value || undefined,
  };
}

interface TrackEventOptions {
  eventName: string;
  businessUnit: 'pilates' | 'skin';
  contentName?: string;
  contentType?: string;
  contentCategory?: string;
  value?: number;
  currency?: string;
  customData?: Record<string, unknown>;
}

/**
 * Track event with both browser pixel and server CAPI
 * This ensures proper deduplication with matching event_id
 */
export async function trackEvent(options: TrackEventOptions): Promise<void> {
  const {
    eventName,
    businessUnit,
    contentName,
    contentType,
    contentCategory,
    value,
    currency = 'GBP',
    customData = {},
  } = options;

  // Generate unique event ID for deduplication
  const eventId = generateEventId(eventName);

  // Get Facebook cookies and user data
  const { fbc, fbp } = getFacebookCookies();
  const userData = getUserData();

  // 1. Fire browser pixel with event_id
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const fbqData: Record<string, unknown> = {
      eventID: eventId, // Facebook uses eventID for dedup
      ...customData,
    };

    if (contentName) fbqData.content_name = contentName;
    if (contentType) fbqData.content_type = contentType;
    if (contentCategory) fbqData.content_category = contentCategory;
    if (value) {
      fbqData.value = value;
      fbqData.currency = currency;
    }

    // Fire the pixel event
    (window as any).fbq('track', eventName, fbqData, { eventID: eventId });
  }

  // 2. Send to server CAPI with same event_id
  try {
    await fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        business_unit: businessUnit,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        email: userData.email,
        phone: userData.phone,
        fbc,
        fbp,
        content_name: contentName,
        content_type: contentType,
        content_category: contentCategory,
        value,
        currency,
      }),
    });
  } catch (error) {
    console.error('Server tracking failed:', error);
    // Browser pixel still fired, so event is tracked
  }
}

/**
 * Track PageView event
 */
export function trackPageView(businessUnit: 'pilates' | 'skin'): void {
  trackEvent({
    eventName: 'PageView',
    businessUnit,
  });
}

/**
 * Track ViewContent event
 */
export function trackViewContent(
  businessUnit: 'pilates' | 'skin',
  contentName: string,
  contentType: string
): void {
  trackEvent({
    eventName: 'ViewContent',
    businessUnit,
    contentName,
    contentType,
  });
}

/**
 * Track Lead event
 */
export function trackLead(
  businessUnit: 'pilates' | 'skin',
  contentName: string,
  contentCategory?: string
): void {
  trackEvent({
    eventName: 'Lead',
    businessUnit,
    contentName,
    contentCategory,
  });
}

/**
 * Track Contact event
 */
export function trackContact(businessUnit: 'pilates' | 'skin', contactType: string): void {
  trackEvent({
    eventName: 'Contact',
    businessUnit,
    contentName: contactType,
  });
}
