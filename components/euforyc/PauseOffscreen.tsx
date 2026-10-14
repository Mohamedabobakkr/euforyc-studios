'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Wraps a looping CSS animation (marquee, rotating ring) and pauses it while
 * it is off-screen or the tab is hidden, via the global .eu-paused class.
 */
export default function PauseOffscreen({
  children,
  className = '',
  ariaHidden = false,
}: {
  children: ReactNode;
  className?: string;
  ariaHidden?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' });
    observer.observe(element);
    const onVisibility = () => setTabHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${!visible || tabHidden ? 'eu-paused' : ''}`}
      aria-hidden={ariaHidden || undefined}
    >
      {children}
    </div>
  );
}
