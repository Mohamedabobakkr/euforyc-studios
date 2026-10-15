'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Renders its children (an image) only once the page is running and the
 * spot is near the screen. The browser's own loading="lazy" still fetches
 * images 1250–2500px ahead, so on a landing page they would download
 * alongside the first screen. The wrapper fills its positioned parent, which
 * keeps the frame's size, so nothing moves when the image arrives.
 */
export default function LoadWhenNear({ children, margin = '300px' }: { children: ReactNode; margin?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <span ref={ref} style={{ position: 'absolute', inset: 0, display: 'block' }}>
      {near ? children : null}
    </span>
  );
}
