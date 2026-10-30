'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { londonDayKey, relativeDay, spotsText, spotsTone, stillUpcoming, type SlimEvent } from './types';
import { useLiveEvents } from './useLiveEvents';

const SHOWN = 8;

/**
 * "Today at Euforyc": the next classes on the live timetable. Rendered on the
 * server; once mounted it keeps spaces left live and drops anything that has
 * started since. Hidden entirely when there is nothing to show.
 */
export default function TodayStrip({ events: rendered, renderedAt }: { events: SlimEvent[]; renderedAt: number }) {
  const events = useLiveEvents(rendered);
  const [now, setNow] = useState(renderedAt);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const upcoming = stillUpcoming(events, now).slice(0, SHOWN);
  if (upcoming.length === 0) return null;

  const today = londonDayKey(now);
  const anyToday = upcoming.some((event) => event.dayKey === today);
  const toneClass = { full: styles.tcFull, low: styles.tcLow, open: '' };

  return (
    <section className={styles.strip} aria-labelledby="today-title">
      <div className={`eu-wrap ${styles.stripIn}`}>
        <div className={styles.stripLabel}>
          <span className={`eu-cap ${styles.stripLive}`}>
            <span className="eu-live-dot eu-live-dot--dark" aria-hidden="true" />
            Live from Momence
          </span>
          <h2 id="today-title" className={styles.stripTitle}>
            {anyToday ? 'Today' : 'Next'} at <em>Euforyc</em>
          </h2>
        </div>
        <ul className={styles.stripRow}>
          {upcoming.map((event) => {
            const day = relativeDay(event, now);
            return (
              <li key={event.id}>
                <Link href="/schedule" className={styles.tc}>
                  <span className={styles.tcTime}>
                    {event.time}
                    {day !== 'Today' && <span className={styles.tcDay}>{day}</span>}
                  </span>
                  <span className={styles.tcName}>{event.title}</span>
                  <span className={`${styles.tcSpots} ${toneClass[spotsTone(event)]}`}>
                    {spotsText(event)}
                    {event.instructor ? ` · with ${event.instructor}` : ''}
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/schedule" className={`${styles.tc} ${styles.tcAll}`}>
              <span className={styles.tcTime}>Full timetable</span>
              <span className={styles.tcSpots}>14 days ahead →</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
