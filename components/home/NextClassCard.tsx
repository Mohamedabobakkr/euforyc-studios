'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Arrow from '@/components/euforyc/Arrow';
import styles from './home.module.css';
import { hasSpace, relativeDay, spotsText, stillUpcoming, type SlimEvent } from './types';

/**
 * The hero's "Next class" card, from the live timetable: the next class with
 * spaces left, or the next full one when every upcoming class is full.
 */
export default function NextClassCard({ events, renderedAt }: { events: SlimEvent[]; renderedAt: number }) {
  const [now, setNow] = useState(renderedAt);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const upcoming = stillUpcoming(events, now);
  const next = upcoming.find(hasSpace) ?? upcoming[0];
  if (!next) return <span />;

  const day = relativeDay(next, now);
  const spots =
    next.isSoldOut || next.spotsAvailable <= 2 ? spotsText(next) : `${next.spotsAvailable} of ${next.capacity} spots left`;

  return (
    <Link href="/schedule" className={styles.next}>
      <span>
        <span className={`eu-cap ${styles.nextLabel}`}>
          <span className="eu-live-dot" aria-hidden="true" />
          Next class{day === 'Today' ? '' : ` · ${day}`}
        </span>
        <span className={styles.nextTime} style={{ display: 'block' }}>
          {next.time}
        </span>
      </span>
      <span className={styles.nextDetail}>
        <strong>{next.title}</strong>
        {next.instructor ? `with ${next.instructor} · ` : ''}
        {spots}
      </span>
      <span className={styles.nextGo} aria-hidden="true">
        <Arrow />
      </span>
    </Link>
  );
}
