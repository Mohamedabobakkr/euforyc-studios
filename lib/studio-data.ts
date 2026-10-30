/**
 * Server-side studio data for rendering pages as HTML.
 *
 * The live timetable and client reviews come from Momence. Fetching them on
 * the server means they are part of the page HTML, so search engines and AI
 * assistants (which mostly do not run JavaScript) can read them.
 *
 * Every function here fails soft: if Momence is unreachable the page still
 * renders with its evergreen content.
 */
import 'server-only';
import { unstable_cache } from 'next/cache';
import { MomenceEvent, DateGroupedEvents } from './types/momence';
import { ClassType, classTypeForTitle } from './classes';
import { SITE_URL } from './site';

const MOMENCE_HOST_ID = process.env.MOMENCE_HOST_ID || '75303';
// Public signature for the Momence reviews plugin embed
const REVIEWS_PLUGIN_SIGNATURE = 'b5276d8f04f580428352131d60c1206a43a3e929ee68a214824cd8882bf0ac17';

// One hour, the same as the pages that show the timetable (/, /schedule,
// /classes/*); the browser keeps availability live on / and /schedule. This
// value also caps the page's own revalidate, so it must never be shorter.
const EVENTS_REVALIDATE_SECONDS = 60 * 60;
const REVIEWS_REVALIDATE_SECONDS = 6 * 60 * 60;
const LONDON = 'Europe/London';

// ============================================================================
// Timetable
// ============================================================================

/**
 * Client-specific private bookings ("Private - Client Name") are not public
 * classes. Bookable 1:1 services keep "1:1" or "session" in the title.
 */
export function isPrivateBooking(title: string): boolean {
  const lower = title.toLowerCase();
  return (
    lower.startsWith('private') &&
    !lower.includes('1:1') &&
    !lower.includes('1-1') &&
    !lower.includes('session')
  );
}

// Each page keeps its own copy (the page path is part of the cache key), so
// every hourly rebuild of a page finds its copy due and reads Momence afresh
// instead of reusing one another page fetched up to an hour earlier.
const fetchEvents = unstable_cache(
  async (_page: string): Promise<MomenceEvent[]> => {
    const { momenceClient } = await import('./momence-client');
    return momenceClient.getEvents();
  },
  ['momence-public-events'],
  { revalidate: EVENTS_REVALIDATE_SECONDS }
);

/**
 * Upcoming public classes, soonest first. Empty if Momence is unavailable.
 * `page` is the path of the page asking, e.g. "/schedule".
 */
export async function getUpcomingEvents(page: string): Promise<MomenceEvent[]> {
  try {
    const events = await fetchEvents(page);
    const now = Date.now();
    return events
      .filter((event) => !isPrivateBooking(event.title))
      .filter((event) => new Date(event.startTime).getTime() > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  } catch (error) {
    console.error('[studio-data] Failed to load timetable:', error);
    return [];
  }
}

/** Groups events by London calendar day, for the schedule page */
export function groupByLondonDay(events: MomenceEvent[], days: number): DateGroupedEvents[] {
  const cutoff = Date.now() + days * 24 * 60 * 60 * 1000;
  const groups = new Map<string, DateGroupedEvents>();

  for (const event of events) {
    const start = new Date(event.startTime);
    if (start.getTime() > cutoff) continue;

    // en-CA gives YYYY-MM-DD
    const date = start.toLocaleDateString('en-CA', { timeZone: LONDON });
    if (!groups.has(date)) {
      groups.set(date, {
        date,
        displayDate: start.toLocaleDateString('en-US', {
          timeZone: LONDON,
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }),
        events: [],
      });
    }
    groups.get(date)!.events.push(event);
  }

  return Array.from(groups.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function formatLondonDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    timeZone: LONDON,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function formatLondonTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', {
    timeZone: LONDON,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export interface ClassFormat {
  title: string;
  description: string;
  instructors: string[];
}

// Class size and price come from lib/classes.ts (the studio price list), not
// from Momence, so every page shows the same figures.
export interface LiveClassFacts {
  sessions: MomenceEvent[];
  formats: ClassFormat[];
  instructors: string[];
}

function cleanName(name: string): string {
  return name.replace(/\s+/g, ' ').trim();
}

/** What the current timetable says about one class type */
export function liveFactsFor(classType: ClassType, events: MomenceEvent[]): LiveClassFacts {
  const sessions = events.filter((event) => classTypeForTitle(event.title)?.slug === classType.slug);

  const formats = new Map<string, ClassFormat>();
  const instructors = new Set<string>();
  for (const session of sessions) {
    const title = cleanName(session.title);
    if (!formats.has(title)) {
      formats.set(title, { title, description: session.description?.trim() || '', instructors: [] });
    }
    if (session.instructor?.name) {
      const name = cleanName(session.instructor.name);
      instructors.add(name);
      const format = formats.get(title)!;
      if (!format.instructors.includes(name)) format.instructors.push(name);
    }
  }

  return {
    sessions,
    formats: Array.from(formats.values()),
    instructors: Array.from(instructors).sort(),
  };
}

// ============================================================================
// Reviews
// ============================================================================

export interface StudioReview {
  id: number;
  comment: string;
  grade: number;
  createdAt: string;
  reviewerName: string;
  sessionName: string | null;
  teacherName: string | null;
}

interface ReviewsResult {
  reviews: StudioReview[];
  total: number;
}

/** "Sarah Johnson" becomes "Sarah J." — reviewers are shown by first name and last initial only */
export function shortReviewerName(fullName: string | null | undefined): string {
  const parts = cleanName(fullName || '').split(' ').filter(Boolean);
  if (parts.length === 0) return 'Euforyc client';
  const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  if (parts.length === 1) return first;
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${first} ${lastInitial}.`;
}

async function fetchReviewPage(page: number): Promise<{ payload: any[]; totalCount: number }> {
  const params = new URLSearchParams({
    pageSize: '100',
    page: String(page),
    isTextOnlyEnabled: 'true',
    isSessionAndTeacherInfoEnabled: 'true',
    s: REVIEWS_PLUGIN_SIGNATURE,
  });
  const response = await fetch(
    `https://api.momence.com/host-plugins/host/${MOMENCE_HOST_ID}/reviews?${params.toString()}`,
    {
      headers: { 'x-origin': `${SITE_URL}/` },
      next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
    }
  );
  if (!response.ok) throw new Error(`Momence reviews HTTP ${response.status}`);
  const data = await response.json();
  return { payload: data.payload || [], totalCount: data.pagination?.totalCount || 0 };
}

/**
 * Written client reviews left through Momence after class, newest first.
 * These are the same reviews the Momence widget shows.
 */
export async function getReviews(): Promise<ReviewsResult> {
  try {
    const first = await fetchReviewPage(0);
    const pageCount = Math.min(Math.ceil(first.totalCount / 100), 10);
    const rest = await Promise.all(
      Array.from({ length: Math.max(pageCount - 1, 0) }, (_, i) => fetchReviewPage(i + 1))
    );

    const seen = new Set<number>();
    const reviews: StudioReview[] = [];
    for (const raw of [first, ...rest].flatMap((page) => page.payload)) {
      const comment = (raw.comment || '').trim();
      if (!comment || seen.has(raw.id)) continue;
      seen.add(raw.id);
      reviews.push({
        id: raw.id,
        comment,
        grade: raw.grade,
        createdAt: raw.createdAt,
        reviewerName: shortReviewerName(raw.reviewerName),
        sessionName: raw.sessionName ? cleanName(raw.sessionName) : null,
        teacherName: raw.teacherFullName ? cleanName(raw.teacherFullName) : null,
      });
    }

    reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return { reviews, total: first.totalCount };
  } catch (error) {
    console.error('[studio-data] Failed to load reviews:', error);
    return { reviews: [], total: 0 };
  }
}

export function reviewsFor(classType: ClassType, reviews: StudioReview[]): StudioReview[] {
  return reviews.filter(
    (review) => review.sessionName && classTypeForTitle(review.sessionName)?.slug === classType.slug
  );
}

// ============================================================================
// Instructors
// ============================================================================

export interface InstructorSummary {
  name: string;
  /** Class types they teach on the current timetable */
  classTypes: ClassType[];
  reviewCount: number;
  latestReview: StudioReview | null;
}

/** Instructors on the current timetable, with what they teach and what clients say */
export function summariseInstructors(
  events: MomenceEvent[],
  reviews: StudioReview[]
): InstructorSummary[] {
  const byName = new Map<string, InstructorSummary>();

  for (const event of events) {
    if (!event.instructor?.name) continue;
    const name = cleanName(event.instructor.name);
    if (!byName.has(name)) {
      byName.set(name, { name, classTypes: [], reviewCount: 0, latestReview: null });
    }
    const classType = classTypeForTitle(event.title);
    const summary = byName.get(name)!;
    if (classType && !summary.classTypes.some((c) => c.slug === classType.slug)) {
      summary.classTypes.push(classType);
    }
  }

  // Reviews arrive newest first, so the first match is the latest
  for (const review of reviews) {
    if (!review.teacherName) continue;
    const summary = byName.get(review.teacherName);
    if (!summary) continue;
    summary.reviewCount += 1;
    if (!summary.latestReview) summary.latestReview = review;
  }

  return Array.from(byName.values()).sort(
    (a, b) => b.reviewCount - a.reviewCount || a.name.localeCompare(b.name)
  );
}
