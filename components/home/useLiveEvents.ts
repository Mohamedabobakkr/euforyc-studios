'use client';

/**
 * Live availability for the homepage's timetable parts: the hero's "Next class"
 * card, "Today at Euforyc" and "Find your class".
 *
 * The page HTML is rebuilt every hour. In the browser this does what the
 * /schedule page's ScheduleView does: it asks /api/momence/events on load and
 * every 5 minutes (the same URL, so visitors on both pages share the CDN's
 * copy) and updates the spaces left on the classes the page already shows.
 * A class cancelled or moved since the page was built is dropped rather than
 * shown wrongly. The three parts share one request.
 */
import { useEffect, useMemo, useState } from 'react';
import type { SlimEvent } from './types';

const REFRESH_INTERVAL = 5 * 60 * 1000;

interface LiveFacts {
  start: number;
  spotsAvailable: number;
  capacity: number;
  isSoldOut: boolean;
  waitlist: boolean;
}

interface Snapshot {
  byId: Map<string, LiveFacts>;
  /** Start of the last class in the response: anything later was not asked for */
  until: number;
}

let snapshot: Snapshot | null = null;
let timer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<(next: Snapshot) => void>();

/** The request ScheduleView makes, parameter for parameter */
function scheduleUrl(): string {
  const params = new URLSearchParams({
    grouped: 'true',
    excludeSoldOut: 'false',
  });
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
  params.append('startDate', today.toISOString().split('T')[0]);
  params.append('endDate', twoWeeksLater.toISOString().split('T')[0]);
  return `/api/momence/events?${params.toString()}`;
}

async function refresh() {
  try {
    const response = await fetch(scheduleUrl(), { cache: 'no-store' });
    if (!response.ok) return;
    const result = await response.json();
    if (!result.success || !Array.isArray(result.data)) return;

    const byId = new Map<string, LiveFacts>();
    let until = -Infinity;
    for (const group of result.data) {
      for (const event of group.events ?? []) {
        const start = new Date(event.startTime).getTime();
        if (Number.isNaN(start)) continue;
        byId.set(String(event.id), {
          start,
          spotsAvailable: Math.max(0, event.spotsAvailable),
          capacity: event.capacity,
          isSoldOut: Boolean(event.isSoldOut),
          waitlist: Boolean(event.waitlistEnabled),
        });
        until = Math.max(until, start);
      }
    }
    if (byId.size === 0) return;

    snapshot = { byId, until };
    listeners.forEach((listener) => listener(snapshot!));
  } catch {
    // Keep what the page already shows
  }
}

function applyLive(events: SlimEvent[], live: Snapshot): SlimEvent[] {
  const updated: SlimEvent[] = [];
  for (const event of events) {
    const fresh = live.byId.get(String(event.id));
    if (!fresh) {
      // Not in the live timetable: cancelled, unless it is beyond what was asked for
      if (event.start > live.until) updated.push(event);
      continue;
    }
    // Moved to another time since the page was built
    if (fresh.start !== event.start) continue;
    updated.push({
      ...event,
      spotsAvailable: fresh.spotsAvailable,
      capacity: fresh.capacity,
      isSoldOut: fresh.isSoldOut,
      waitlist: fresh.waitlist,
    });
  }
  return updated;
}

/**
 * The given server-rendered classes with live spaces left. The first render
 * returns them unchanged, so it matches the server HTML.
 */
export function useLiveEvents(events: SlimEvent[]): SlimEvent[] {
  const [live, setLive] = useState<Snapshot | null>(null);

  useEffect(() => {
    listeners.add(setLive);
    if (listeners.size === 1) {
      // First part on the page: fetch now, then every 5 minutes
      snapshot = null;
      refresh();
      timer = setInterval(refresh, REFRESH_INTERVAL);
    } else if (snapshot) {
      setLive(snapshot);
    }
    return () => {
      listeners.delete(setLive);
      if (listeners.size === 0) {
        clearInterval(timer);
        timer = undefined;
      }
    };
  }, []);

  return useMemo(() => (live ? applyLive(events, live) : events), [events, live]);
}
