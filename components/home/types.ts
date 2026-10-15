/**
 * Shapes passed from the homepage (server) to its interactive parts, plus
 * small helpers that run the same way on the server and in the browser.
 */

/** One upcoming class, trimmed to what the homepage shows */
export interface SlimEvent {
  id: string;
  title: string;
  /** Start time, epoch milliseconds */
  start: number;
  /** "18:00", studio time */
  time: string;
  /** "2026-10-15", studio date */
  dayKey: string;
  /** "Thu 15 Oct" */
  dayLabel: string;
  /** "Thu" */
  weekday: string;
  /** Hour of day in studio time, 0–23 */
  hour: number;
  /** Instructor's first name */
  instructor: string | null;
  spotsAvailable: number;
  capacity: number;
  isSoldOut: boolean;
  waitlist: boolean;
  bookingUrl: string;
  /** Class type from lib/classes.ts, when the title matches one */
  slug: string | null;
}

export interface DeckReview {
  id: number;
  comment: string;
  name: string;
  context: string;
  grade: number;
}

export interface ReviewScore {
  count: number;
  /** "5.0" */
  average: string;
  allFiveStars: boolean;
}

const londonDate = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** "2026-10-15" for the studio's calendar day at the given moment */
export function londonDayKey(ms: number): string {
  const parts = londonDate.formatToParts(new Date(ms));
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** A class that can still be booked */
export function hasSpace(event: SlimEvent): boolean {
  return !event.isSoldOut && event.spotsAvailable > 0;
}

/** "Only 2 left", "Full · waitlist" and so on */
export function spotsText(event: SlimEvent): string {
  if (event.isSoldOut || event.spotsAvailable <= 0) return event.waitlist ? 'Full · waitlist' : 'Fully booked';
  if (event.spotsAvailable <= 2) return `Only ${event.spotsAvailable} left`;
  return `${event.spotsAvailable} spots left`;
}

export type SpotsTone = 'full' | 'low' | 'open';

export function spotsTone(event: SlimEvent): SpotsTone {
  if (event.isSoldOut || event.spotsAvailable <= 0) return 'full';
  if (event.spotsAvailable <= 2) return 'low';
  return 'open';
}

/** Events that have not started yet at `now` */
export function stillUpcoming<T extends { start: number }>(events: T[], now: number): T[] {
  return events.filter((event) => event.start > now);
}

/** "Today", "Tomorrow" or "Sat" relative to `now` */
export function relativeDay(event: SlimEvent, now: number): string {
  const today = londonDayKey(now);
  if (event.dayKey === today) return 'Today';
  if (event.dayKey === londonDayKey(now + 24 * 60 * 60 * 1000)) return 'Tomorrow';
  return event.weekday;
}
