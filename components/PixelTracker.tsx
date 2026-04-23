'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const PATH_VALUES: Record<string, { value: number; content_type: string }> = {
  '/offers': { value: 50, content_type: 'intro_offer' },
  '/_all-access-offer': { value: 150, content_type: 'all_access' },
  '/packages': { value: 100, content_type: 'package' },
  '/packages-memberships': { value: 100, content_type: 'package' },
  '/memberships': { value: 150, content_type: 'membership' },
  '/pricing': { value: 50, content_type: 'pricing' },
  '/schedule': { value: 25, content_type: 'class_schedule' },
  '/book': { value: 50, content_type: 'booking' },
  '/massage': { value: 60, content_type: 'service' },
  '/ems-sculpt': { value: 75, content_type: 'service' },
  '/summer-challenge': { value: 50, content_type: 'challenge' },
  '/gift-cards': { value: 50, content_type: 'gift_card' },
};

function generateEventId(name: string): string {
  return `${name.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

function getContentForPath(pathname: string) {
  for (const [path, config] of Object.entries(PATH_VALUES)) {
    if (pathname === path || pathname.startsWith(path + '/')) return config;
  }
  return null;
}

export default function PixelTracker() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (typeof window === 'undefined') return;
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== 'function') return;

    const pvId = generateEventId('PageView');
    fbq('track', 'PageView', {}, { eventID: pvId });

    const content = getContentForPath(pathname);
    if (content) {
      const vcId = generateEventId('ViewContent');
      fbq(
        'track',
        'ViewContent',
        {
          content_name: document.title,
          content_type: content.content_type,
          content_category: pathname,
          value: content.value,
          currency: 'GBP',
        },
        { eventID: vcId }
      );
    }
  }, [pathname]);

  return null;
}
