/**
 * ScheduleView Component
 * Minimalist schedule layout with compact rows for efficient viewing
 * Client component for Euforyc Studios
 */

'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Calendar, ChevronDown, Search, X } from 'lucide-react';
import CompactClassRow, { DateHeader } from './CompactClassRow';
import { FullPageLoading } from './LoadingState';
import ErrorState, { EmptyState } from './ErrorState';
import { DateGroupedEvents } from '@/lib/types/momence';
import styles from './schedule.module.css';

interface ScheduleViewProps {
  initialData?: DateGroupedEvents[];
  /** When the server rendered initialData — keeps the first client render identical to the server's */
  renderedAt?: number;
}

export default function ScheduleView({ initialData, renderedAt }: ScheduleViewProps) {
  // State
  const [groupedEvents, setGroupedEvents] = useState<DateGroupedEvents[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<number>(() => renderedAt ?? Date.now());

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  /**
   * Fetch events from API
   */
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams({
        grouped: 'true',
        excludeSoldOut: 'false',
      });

      // Add date range (next 14 days)
      const today = new Date();
      const twoWeeksLater = new Date(today);
      twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

      params.append('startDate', today.toISOString().split('T')[0]);
      params.append('endDate', twoWeeksLater.toISOString().split('T')[0]);

      const response = await fetch(`/api/momence/events?${params.toString()}`, {
        cache: 'no-store', // Disable caching to always get fresh data
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Count total events for debugging
        const totalEvents = result.data.reduce(
          (sum: number, group: any) => sum + group.events.length,
          0
        );
        console.log(`[Schedule] Received ${totalEvents} events from API`);
        console.log('[Schedule] API Timestamp:', result.timestamp);

        setGroupedEvents(result.data);
        setNow(Date.now());
      } else {
        throw new Error(result.error?.message || 'Failed to load schedule');
      }
    } catch (err) {
      console.error('Schedule fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load schedule');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch on mount. Server-rendered data may be a few minutes old, so it is
   * always refreshed for live availability.
   */
  useEffect(() => {
    setNow(Date.now());
    fetchEvents();
  }, []);

  /**
   * Auto-refresh every 5 minutes for real-time accuracy
   */
  useEffect(() => {
    const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

    const intervalId = setInterval(() => {
      console.log('[Schedule] Auto-refreshing events...');
      fetchEvents();
    }, REFRESH_INTERVAL);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Check if event should be excluded from public schedule
   * Only hide private client-specific events, NOT bookable 1:1 services
   */
  const isPrivateEvent = (event: any): boolean => {
    const title = event.title.toLowerCase();

    // ONLY exclude events that are private client bookings (not public bookable services)
    // Private events typically have format like "Private - Client Name" or just "Private"
    // But keep "Private 1:1" or "1:1 Private Session" as those are bookable services
    if (
      title.startsWith('private') &&
      !title.includes('1:1') &&
      !title.includes('1-1') &&
      !title.includes('session')
    ) {
      return true;
    }

    return false;
  };

  /**
   * Extract class type from title (e.g., "Reformer Pilates (Full Body)" -> "Reformer Pilates")
   */
  const extractClassType = (title: string): string => {
    // Handle 1-on-1 private sessions
    if (title.toLowerCase().includes('1:1') || title.toLowerCase().includes('1-1') ||
        (title.toLowerCase().includes('private') && title.toLowerCase().includes('session'))) {
      return 'Private Sessions';
    }

    // Remove parenthetical content and trim
    const baseTitle = title.split('(')[0].trim();

    // Map to standardized class types
    if (baseTitle.toLowerCase().includes('reformer')) return 'Reformer Pilates';
    if (baseTitle.toLowerCase().includes('hot pilates') || baseTitle.toLowerCase().includes('hot yoga')) return 'Hot Pilates';
    if (baseTitle.toLowerCase().includes('barre')) return 'Barre';
    if (baseTitle.toLowerCase().includes('afro') || baseTitle.toLowerCase().includes('dabke')) return 'Dance';
    if (baseTitle.toLowerCase().includes('belly')) return 'Belly Dance';
    if (baseTitle.toLowerCase().includes('journal')) return 'Guided Journaling';
    if (baseTitle.toLowerCase().includes('circle')) return "Women's Circle";
    if (baseTitle.toLowerCase().includes('dance')) return 'Dance';
    if (baseTitle.toLowerCase().includes('yoga')) return 'Yoga';

    // Return the base title if no match
    return baseTitle;
  };

  /**
   * Extract unique class types and instructors for filters
   */
  const { categories, instructors } = useMemo(() => {
    const categoriesSet = new Set<string>();
    const instructorsMap = new Map<string, string>();

    groupedEvents.forEach((group) => {
      group.events.forEach((event) => {
        // Skip private test events
        if (isPrivateEvent(event)) return;

        // Extract class type from title instead of using category field
        const classType = extractClassType(event.title);
        categoriesSet.add(classType);

        if (event.instructor) {
          instructorsMap.set(event.instructor.id, event.instructor.name);
        }
      });
    });

    return {
      categories: Array.from(categoriesSet).sort(),
      instructors: Array.from(instructorsMap.entries())
        .map(([id, name]) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }, [groupedEvents]);

  /**
   * Filter events based on selected filters AND remove past classes
   */
  const filteredGroupedEvents = useMemo(() => {
    let privateCount = 0;
    let pastCount = 0;
    let totalBeforeFilter = 0;

    const filtered = groupedEvents
      .map((group) => {
        const filteredEvents = group.events.filter((event) => {
          totalBeforeFilter++;

          // Filter out private test events
          if (isPrivateEvent(event)) {
            privateCount++;
            return false;
          }

          // Filter out classes that have already started
          const classStartTime = new Date(event.startTime).getTime();
          if (classStartTime <= now) {
            pastCount++;
            return false;
          }

          // Class type filter
          if (selectedCategory !== 'all') {
            const eventClassType = extractClassType(event.title);
            if (eventClassType !== selectedCategory) {
              return false;
            }
          }

          // Instructor filter
          if (
            selectedInstructor !== 'all' &&
            event.instructor?.id !== selectedInstructor
          ) {
            return false;
          }

          // Search query
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesTitle = event.title.toLowerCase().includes(query);
            const matchesDescription = event.description?.toLowerCase().includes(query);
            const matchesInstructor = event.instructor?.name.toLowerCase().includes(query);

            if (!matchesTitle && !matchesDescription && !matchesInstructor) {
              return false;
            }
          }

          return true;
        });

        return {
          ...group,
          events: filteredEvents,
        };
      })
      .filter((group) => group.events.length > 0); // Remove empty date groups

    // Log filtering summary for debugging
    const totalAfterFilter = filtered.reduce((sum, group) => sum + group.events.length, 0);
    console.log('[Schedule Filter Summary]', {
      totalBeforeFilter,
      privateFiltered: privateCount,
      pastFiltered: pastCount,
      categoryFiltered: totalBeforeFilter - privateCount - pastCount - totalAfterFilter,
      totalAfterFilter,
    });

    return filtered;
  }, [groupedEvents, selectedCategory, selectedInstructor, searchQuery, now]);

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedInstructor('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedInstructor !== 'all' || searchQuery !== '';

  const totalClasses = filteredGroupedEvents.reduce((sum, group) => sum + group.events.length, 0);

  // Day pills jump to that day in the list and follow the scroll position
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const sections = Array.from(list.querySelectorAll<HTMLElement>('[data-day]'));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveDate(visible[0].target.getAttribute('data-day'));
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [filteredGroupedEvents]);

  const jumpToDay = (date: string) => {
    setActiveDate(date);
    document.getElementById(`day-${date}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const currentDate = activeDate ?? filteredGroupedEvents[0]?.date;

  // Loading state
  if (isLoading && groupedEvents.length === 0) {
    return <FullPageLoading />;
  }

  // Error state
  if (error && groupedEvents.length === 0) {
    return <ErrorState message={error} onRetry={fetchEvents} />;
  }

  return (
    <div>
      {/* Day strip */}
      {filteredGroupedEvents.length > 0 && (
        <nav className={styles.daysBar} aria-label="Jump to a day">
          <ul className={styles.days}>
            {filteredGroupedEvents.map((group) => {
              const { weekday, day } = dayParts(group.date);
              return (
                <li key={group.date}>
                  <button
                    type="button"
                    className={styles.day}
                    aria-current={group.date === currentDate ? 'true' : undefined}
                    onClick={() => jumpToDay(group.date)}
                  >
                    <span className={`eu-cap ${styles.dayName}`}>{weekday}</span>
                    <span className={styles.dayNum}>{day}</span>
                    <span className={styles.dayCount}>
                      {group.events.length} {group.events.length === 1 ? 'class' : 'classes'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.chips} role="group" aria-label="Class type">
          {['all', ...categories].map((category) => (
            <button
              key={category}
              type="button"
              className={styles.chip}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All classes' : category}
            </button>
          ))}
        </div>

        <div className={styles.tools}>
          <div className={styles.field}>
            <label htmlFor="schedule-instructor" className="eu-sr-only">
              Instructor
            </label>
            <select
              id="schedule-instructor"
              className={styles.select}
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
            >
              <option value="all">All instructors</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
            <ChevronDown className={styles.fieldIcon} style={{ right: 16 }} width={14} height={14} aria-hidden="true" />
          </div>

          <div className={styles.field}>
            <label htmlFor="schedule-search" className="eu-sr-only">
              Search classes and instructors
            </label>
            <Search className={styles.fieldIcon} style={{ left: 16 }} width={15} height={15} aria-hidden="true" />
            <input
              id="schedule-search"
              type="search"
              placeholder="Search classes, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.search}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={styles.clearSearch}
                aria-label="Clear search"
              >
                <X width={15} height={15} aria-hidden="true" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button type="button" onClick={clearFilters} className={styles.clearAll}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <p className={styles.summary} aria-live="polite">
        Showing {totalClasses} {totalClasses === 1 ? 'class' : 'classes'}
        {hasActiveFilters && ' (filtered)'}
      </p>

      {/* Schedule Content - List View Only */}
      {filteredGroupedEvents.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No Classes Found"
          message={
            hasActiveFilters
              ? 'Try adjusting your filters to see more classes.'
              : 'No classes are scheduled at this time. Please check back later.'
          }
          actionLabel={hasActiveFilters ? 'Clear Filters' : undefined}
          onAction={hasActiveFilters ? clearFilters : undefined}
        />
      ) : (
        /* Compact List View */
        <div ref={listRef}>
          {filteredGroupedEvents.map((group) => (
            <section key={group.date} id={`day-${group.date}`} data-day={group.date} className={styles.dayGroup}>
              <DateHeader displayDate={longDate(group.date)} eventCount={group.events.length} />
              <ul className={styles.rows}>
                {group.events.map((event, index) => (
                  <li key={event.id} style={{ animationDelay: `${Math.min(index, 12) * 0.045}s` }}>
                    <CompactClassRow event={event} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* Refresh Indicator */}
      {isLoading && groupedEvents.length > 0 && (
        <div className={styles.refreshing} role="status">
          <span className="eu-live-dot" aria-hidden="true" />
          Updating...
        </div>
      )}
    </div>
  );
}

/** "2026-10-15" → { weekday: "Thu", day: "15" } */
function dayParts(date: string) {
  const noonUtc = new Date(`${date}T12:00:00Z`);
  return {
    weekday: noonUtc.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' }),
    day: String(noonUtc.getUTCDate()),
  };
}

/** "2026-10-15" → "Thursday 15 October" */
function longDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}
