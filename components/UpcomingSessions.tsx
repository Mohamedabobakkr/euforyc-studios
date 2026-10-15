'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface UpcomingSession {
  id: string;
  title: string;
  startTime: string;
  dateLabel: string;
  timeLabel: string;
  instructor: string | null;
  spotsAvailable: number;
  isSoldOut: boolean;
  bookingUrl: string;
}

interface UpcomingSessionsProps {
  sessions: UpcomingSession[];
  /** When the page HTML was generated — keeps the first client render identical to the server's */
  renderedAt: number;
}

/**
 * Next sessions for a class type. Rendered on the server so the dates are in
 * the HTML; once mounted it drops any session that has started since the page
 * was generated.
 */
export default function UpcomingSessions({ sessions, renderedAt }: UpcomingSessionsProps) {
  const [now, setNow] = useState(renderedAt);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const upcoming = sessions.filter((session) => new Date(session.startTime).getTime() > now);

  if (upcoming.length === 0) {
    return (
      <p className="body-text">
        See the{' '}
        <Link href="/schedule" className="text-eu-ink underline decoration-[#1a260e]/40 underline-offset-4 hover:decoration-[#1a260e]">
          live timetable
        </Link>{' '}
        for the next available sessions.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[#1a260e]/15 border-y border-[#1a260e]/15">
      {upcoming.map((session) => (
        <li key={session.id}>
          <a
            href={session.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-content-name={session.title}
            data-content-category="class_booking"
            data-content-type="class"
            className="group my-1.5 flex flex-col gap-1.5 rounded-[20px] px-3 py-4 text-eu-ink transition-colors duration-300 hover:bg-eu-beige hover:text-eu-ink sm:flex-row sm:items-center sm:gap-6 sm:px-5"
          >
            <span className="flex-shrink-0 font-serif text-[20px] leading-snug text-eu-ink sm:w-64">
              {session.dateLabel}, {session.timeLabel}
            </span>
            <span className="flex-1 font-sans text-[15px] leading-[1.5] text-eu-green">
              {session.title}
              {session.instructor ? ` with ${session.instructor}` : ''}
            </span>
            <span
              className={`mt-2 inline-flex min-h-[36px] flex-shrink-0 items-center self-start rounded-full px-4 font-sans text-[11px] uppercase tracking-[0.14em] sm:mt-0 sm:self-auto ${
                session.isSoldOut
                  ? 'border border-[#1a260e]/20 text-eu-sage'
                  : 'bg-eu-ink text-eu-cream transition-colors duration-300 group-hover:bg-eu-green'
              }`}
            >
              {session.isSoldOut
                ? 'Fully booked'
                : `${session.spotsAvailable} ${session.spotsAvailable === 1 ? 'space' : 'spaces'} left · Book`}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
