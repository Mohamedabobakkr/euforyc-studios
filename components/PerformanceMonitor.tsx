'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Web Vitals monitoring
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Send metrics to analytics instead of console.log
        const sendToAnalytics = (metric) => {
          // In production, replace with your analytics service
          // Example: sending to Google Analytics
          if (window.gtag) {
            window.gtag('event', 'web-vitals', {
              eventCategory: 'Web Vitals',
              eventAction: metric.name,
              eventValue: Math.round(metric.value),
              eventLabel: metric.id,
              nonInteraction: true,
            });
          }
        };
        
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      });
    }

    // Performance observer for resource timing
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // In production, send to analytics instead of logging
          // Silently collect data without console noise
        });
      });
      observer.observe({ entryTypes: ['resource', 'navigation'] });
    }
  }, []);

  return null;
}