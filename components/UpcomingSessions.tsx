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
        <Link href="/schedule" className="underline underline-offset-4 hover:opacity-70">
          live timetable
        </Link>{' '}
        for the next available sessions.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[#1a260e]/10 border-y border-[#1a260e]/10">
      {upcoming.map((session) => (
        <li key={session.id}>
          <a
            href={session.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-content-name={session.title}
            data-content-category="class_booking"
            data-content-type="class"
            className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-5 transition-opacity duration-300 hover:opacity-70"
          >
            <span className="font-serif text-lg text-[#1a260e] sm:w-64 flex-shrink-0">
              {session.dateLabel}, {session.timeLabel}
            </span>
            <span className="font-sans text-sm font-light text-[#1a260e]/80 flex-1">
              {session.title}
              {session.instructor ? ` with ${session.instructor}` : ''}
            </span>
            <span className="font-sans text-xs tracking-[0.12em] uppercase text-[#1a260e]/60 flex-shrink-0">
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
