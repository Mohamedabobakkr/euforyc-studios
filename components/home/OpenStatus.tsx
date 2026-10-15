'use client';

import { useEffect, useState } from 'react';
import { STUDIO } from '@/lib/site';
import styles from './home.module.css';

type Period = (typeof STUDIO.hours)[number];

/** "06:45" → "6:45 AM" */
export function formatClock(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** "Monday"…"Friday" → "Mon – Fri" */
export function periodDays(period: Period): string {
  const first = period.days[0].slice(0, 3);
  const last = period.days[period.days.length - 1].slice(0, 3);
  return first === last ? first : `${first} – ${last}`;
}

const minutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

interface Status {
  text: string;
  open: boolean;
  todayPeriod: number;
}

function studioStatus(now: Date): Status | null {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const weekday = get('weekday');
  const current = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);

  const periodFor = (day: string) => STUDIO.hours.findIndex((period) => (period.days as readonly string[]).includes(day));
  const todayIndex = periodFor(weekday);
  if (todayIndex === -1) return null;
  const today = STUDIO.hours[todayIndex];

  if (current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { text: `Open now · until ${formatClock(today.closes)}`, open: true, todayPeriod: todayIndex };
  }
  if (current < minutes(today.opens)) {
    return { text: `Closed · opens today at ${formatClock(today.opens)}`, open: false, todayPeriod: todayIndex };
  }
  const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const tomorrow = week[(week.indexOf(weekday) + 1) % 7];
  const tomorrowPeriod = STUDIO.hours[periodFor(tomorrow)];
  return {
    text: tomorrowPeriod ? `Closed · opens tomorrow at ${formatClock(tomorrowPeriod.opens)}` : 'Closed',
    open: false,
    todayPeriod: todayIndex,
  };
}

/**
 * Opening hours with today's line underlined, plus a live open/closed pill.
 * Worked out in the browser after mount (studio time), so the server HTML
 * stays the same for everyone.
 */
export function StudioHours() {
  const status = useStudioStatus();
  return (
    <>
      {STUDIO.hours.map((period, i) => (
        <span key={period.label} style={{ display: 'block' }}>
          <span className={status?.todayPeriod === i ? styles.hoursToday : undefined}>
            {periodDays(period)}&nbsp;&nbsp;{formatClock(period.opens)} – {formatClock(period.closes)}
          </span>
        </span>
      ))}
    </>
  );
}

export function OpenNow() {
  const status = useStudioStatus();
  const sevenDays = STUDIO.hours.reduce((total, period) => total + period.days.length, 0) === 7;
  return (
    <span className={`${styles.status} ${status && !status.open ? styles.statusClosed : ''}`}>
      <i aria-hidden="true" />
      {status ? status.text : sevenDays ? 'Open 7 days a week' : 'See opening hours'}
    </span>
  );
}

function useStudioStatus(): Status | null {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const update = () => setStatus(studioStatus(new Date()));
    update();
    const timer = setInterval(update, 60 * 1000);
    return () => clearInterval(timer);
  }, []);
  return status;
}
