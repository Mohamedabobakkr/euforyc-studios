/**
 * Picks what the homepage shows from the live Momence timetable and reviews
 * (lib/studio-data.ts). Presentation only: nothing here fetches.
 */
import 'server-only';
import type { MomenceEvent } from '@/lib/types/momence';
import type { StudioReview } from '@/lib/studio-data';
import { classTypeForTitle } from '@/lib/classes';
import type { DeckReview, ReviewScore, SlimEvent } from './types';
import { londonDayKey } from './types';

const LONDON = 'Europe/London';

function clean(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function firstName(name: string | null | undefined): string | null {
  const first = clean(name || '').split(' ')[0];
  return first ? first.charAt(0).toUpperCase() + first.slice(1) : null;
}

/** 1:1 private sessions are bookable appointments, not group classes */
function isOneToOne(title: string): boolean {
  const slug = classTypeForTitle(title)?.slug;
  return Boolean(slug?.startsWith('private')) || /\b1[:-]1\b/.test(title);
}

export function toSlimEvent(event: MomenceEvent): SlimEvent {
  const start = new Date(event.startTime);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: LONDON,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(start);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const hour = parseInt(get('hour'), 10) % 24;

  return {
    id: event.id,
    title: clean(event.title),
    start: start.getTime(),
    time: `${String(hour).padStart(2, '0')}:${get('minute')}`,
    dayKey: londonDayKey(start.getTime()),
    dayLabel: `${get('weekday')} ${get('day')} ${get('month')}`,
    weekday: get('weekday'),
    hour,
    instructor: firstName(event.instructor?.name),
    spotsAvailable: Math.max(0, event.spotsAvailable),
    capacity: event.capacity,
    isSoldOut: event.isSoldOut,
    waitlist: Boolean(event.waitlistEnabled),
    bookingUrl: event.bookingUrl,
    slug: classTypeForTitle(event.title)?.slug ?? null,
  };
}

/** Upcoming group classes (no 1:1 appointments, nothing cancelled), soonest first */
export function groupClasses(events: MomenceEvent[]): MomenceEvent[] {
  return events.filter((event) => !event.isCancelled && !isOneToOne(event.title));
}

/** Group classes starting within `days` days of `now` */
export function within(events: MomenceEvent[], now: number, days: number): MomenceEvent[] {
  const cutoff = now + days * 24 * 60 * 60 * 1000;
  return events.filter((event) => new Date(event.startTime).getTime() <= cutoff);
}

export interface SpecialSession {
  event: SlimEvent;
  label: string;
  image: { src: string; alt: string };
}

/**
 * One-off and special sessions on the timetable: anything that is not one of
 * the regular class types in lib/classes.ts. Each title appears once, at its
 * next date.
 */
export function specialSessions(events: MomenceEvent[], limit = 3): SpecialSession[] {
  const seen = new Set<string>();
  const specials: SpecialSession[] = [];

  for (const event of groupClasses(events)) {
    if (classTypeForTitle(event.title)) continue;
    const key = clean(event.title).toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seen.has(key)) continue;
    seen.add(key);

    const lower = event.title.toLowerCase();
    let label = 'Special session';
    let image = { src: '/about-studio.jpg', alt: 'The reformer studio at Euforyc Studios' };
    if (lower.includes('circle') || lower.includes('journal')) {
      label = 'Community';
      image = { src: '/euforyc.jpg', alt: 'A member with a matcha at Euforyc Studios' };
    } else if (lower.includes('mommy') || lower.includes('mummy') || lower.includes('mum')) {
      label = 'Mums & little ones';
      image = { src: '/euforyc-mat.jpg', alt: 'The Euforyc mat' };
    } else if (lower.includes('dance')) {
      label = 'Dance session';
      image = { src: '/dance-new.jpg', alt: 'A belly dancer in a beaded costume' };
    }

    specials.push({ event: toSlimEvent(event), label, image });
    if (specials.length === limit) break;
  }

  return specials;
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export function reviewScore(reviews: StudioReview[]): ReviewScore | null {
  const graded = reviews.filter((review) => review.grade > 0);
  if (graded.length === 0) return null;
  const sum = graded.reduce((total, review) => total + review.grade, 0);
  return {
    count: graded.length,
    average: (sum / graded.length).toFixed(1),
    allFiveStars: graded.every((review) => review.grade === 5),
  };
}

/** Recent reviews that fit on a card, one per reviewer */
export function deckReviews(reviews: StudioReview[], limit = 10): DeckReview[] {
  const names = new Set<string>();
  const picked: DeckReview[] = [];

  for (const review of reviews) {
    const comment = clean(review.comment);
    if (comment.length < 60 || comment.length > 220) continue;
    if (names.has(review.reviewerName)) continue;
    names.add(review.reviewerName);

    const teacher = firstName(review.teacherName);
    const context = review.sessionName
      ? teacher
        ? `${review.sessionName} with ${teacher}`
        : review.sessionName
      : 'Euforyc Studios';

    picked.push({ id: review.id, comment, name: review.reviewerName, context, grade: review.grade });
    if (picked.length === limit) break;
  }

  return picked;
}

const PRAISE = [
  'love', 'loved', 'amazing', 'great', 'enjoy', 'fun', 'recommend', 'best', 'brilliant', 'fantastic',
  'lovely', 'excellent', 'perfect', 'so good', 'wonderful', 'beautiful', 'favourite',
];

/**
 * Short phrases lifted word for word from review text, for the scrolling
 * strip. Phrases that name a person are skipped.
 */
export function reviewPhrases(reviews: StudioReview[], limit = 8): string[] {
  const people = new Set<string>();
  for (const review of reviews) {
    for (const name of [review.teacherName, review.reviewerName]) {
      const first = firstName(name)?.toLowerCase();
      if (first && first.length >= 3) people.add(first);
    }
  }
  // A word that is a name, or the start of one ("Marz" for Marziyeh)
  const namesPerson = (sentence: string) =>
    sentence
      .toLowerCase()
      .split(/[^a-z]+/)
      .some((word) => people.has(word) || (word.length >= 4 && Array.from(people).some((name) => name.startsWith(word))));

  const seen = new Set<string>();
  const phrases: string[] = [];

  for (const review of reviews) {
    for (const raw of review.comment.split(/(?<=[.!?])\s+/)) {
      const sentence = clean(raw).replace(/\.+$/, '');
      const words = sentence.split(' ').length;
      if (words < 2 || words > 6 || sentence.length > 34) continue;
      // Plain text only: no emoji or stray symbols
      if (!/^[A-Za-z0-9 ,!?'’&-]+$/.test(sentence)) continue;
      const lower = sentence.toLowerCase();
      if (!PRAISE.some((word) => lower.includes(word))) continue;
      if (namesPerson(sentence)) continue;
      const key = lower.replace(/[^a-z ]/g, '').trim();
      if (seen.has(key)) continue;
      seen.add(key);
      phrases.push(sentence);
      if (phrases.length === limit) return phrases;
    }
  }

  return phrases;
}
