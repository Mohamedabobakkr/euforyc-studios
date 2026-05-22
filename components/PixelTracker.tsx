'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function generateEventId(name: string): string {
  return `${name.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function PixelTracker() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    const fbq = window.fbq;

    const pvId = generateEventId('PageView');
    fbq('track', 'PageView', {}, { eventID: pvId });

    // ViewContent only fires when the current page exposes #page-content-meta with real data.
    // This avoids polluting Meta with fake flat values on every SPA navigation.
    const metaEl = document.getElementById('page-content-meta');
    if (metaEl) {
      const vcId = generateEventId('ViewContent');
      const payload: Record<string, unknown> = {
        content_name: (metaEl.getAttribute('data-content-name') || document.title || '').substring(0, 200),
        content_type: metaEl.getAttribute('data-content-type') || 'page',
        content_category: metaEl.getAttribute('data-content-category') || pathname,
      };
      const valueAttr = metaEl.getAttribute('data-value');
      const value = valueAttr ? parseFloat(valueAttr) : NaN;
      if (!isNaN(value) && value > 0) {
        payload.value = value;
        payload.currency = metaEl.getAttribute('data-currency') || 'GBP';
        const contentIds = metaEl.getAttribute('data-content-ids');
        if (contentIds) payload.content_ids = [contentIds];
      }
      fbq('track', 'ViewContent', payload, { eventID: vcId });
    }
  }, [pathname]);

  return null;
}
