/**
 * CompactClassRow Component
 * One timetable row: time, class, instructor, spaces left and a Book button.
 * The whole row links to the class's Momence booking page.
 * Euforyc Studios brand design
 */

'use client';

import React from 'react';
import { MomenceEvent } from '@/lib/types/momence';
import styles from './schedule.module.css';

interface CompactClassRowProps {
    event: MomenceEvent;
    showDate?: boolean;
}

/** "Beginner" or "Intermediate" when the class title says so */
function levelTag(title: string): string | null {
    if (/beginner/i.test(title)) return 'Beginner';
    if (/intermediate/i.test(title)) return 'Intermediate';
    return null;
}

export default function CompactClassRow({ event, showDate = false }: CompactClassRowProps) {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    // Studio time, whatever the server's or visitor's own timezone
    const time = startDate.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const endTime = endDate.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const dateStr = showDate
        ? startDate.toLocaleDateString('en-GB', { timeZone: 'Europe/London', weekday: 'short', day: 'numeric', month: 'short' })
        : null;

    const spotsLeft = Math.max(0, event.spotsAvailable);
    const capacityText = event.isSoldOut
        ? 'Fully booked'
        : spotsLeft <= 2
            ? `Only ${spotsLeft} left`
            : `${spotsLeft} of ${event.capacity} spots left`;

    // One dot per place for small classes; filled dots are taken places
    const taken = event.capacity - spotsLeft;
    const showDots = event.capacity > 0 && event.capacity <= 10;

    const level = levelTag(event.title);

    const buttonLabel = event.isSoldOut
        ? (event.waitlistEnabled ? 'Join waitlist' : 'Full')
        : 'Book';
    const buttonClass = event.isSoldOut
        ? (event.waitlistEnabled ? styles.bookLine : styles.bookMuted)
        : styles.bookInk;

    return (
        <a
            href={event.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.row}
        >
            <div className={styles.time}>
                {time}
                <small>
                    {dateStr ? `${dateStr} · ` : ''}
                    {event.duration ? `${event.duration} min` : `to ${endTime}`}
                </small>
            </div>

            <div>
                <h3 className={styles.title}>{event.title}</h3>
                {(event.instructor || level) && (
                    <div className={styles.who}>
                        {event.instructor && (
                            <>
                                <span className={styles.avatar} aria-hidden="true">
                                    {event.instructor.name.trim().charAt(0)}
                                </span>
                                <span>with {event.instructor.name}</span>
                            </>
                        )}
                        {level && <span className={styles.tag}>{level}</span>}
                    </div>
                )}
            </div>

            <div className={styles.capWrap}>
                {showDots && (
                    <div className={styles.dots} aria-hidden="true">
                        {Array.from({ length: event.capacity }, (_, i) => (
                            <i key={i} className={i < taken ? styles.taken : undefined} />
                        ))}
                    </div>
                )}
                <div className={`${styles.capText} ${!event.isSoldOut && spotsLeft <= 2 ? styles.capLow : ''}`}>
                    {capacityText}
                </div>
            </div>

            <div className={styles.bookWrap}>
                <span className={`${styles.book} ${buttonClass}`}>{buttonLabel}</span>
            </div>
        </a>
    );
}

/**
 * Date Header Component for grouping
 */
export function DateHeader({
    displayDate,
    eventCount
}: {
    displayDate: string;
    eventCount: number;
}) {
    return (
        <div className={styles.listHead}>
            <h2>{displayDate}</h2>
            <span>
                {eventCount} {eventCount === 1 ? 'class' : 'classes'} · women only
            </span>
        </div>
    );
}
