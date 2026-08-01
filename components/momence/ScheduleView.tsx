/**
 * ScheduleView Component
 * Minimalist schedule layout with compact rows for efficient viewing
 * Client component for Euforyc Studios
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Filter, ChevronDown, Search, X } from 'lucide-react';
import CompactClassRow, { DateHeader } from './CompactClassRow';
import { FullPageLoading } from './LoadingState';
import ErrorState, { EmptyState } from './ErrorState';
import { DateGroupedEvents } from '@/lib/types/momence';

interface ScheduleViewProps {
  initialData?: DateGroupedEvents[];
}

export default function ScheduleView({ initialData }: ScheduleViewProps) {
  // State
  const [groupedEvents, setGroupedEvents] = useState<DateGroupedEvents[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

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
   * Initial fetch on mount
   */
  useEffect(() => {
    if (!initialData) {
      fetchEvents();
    }
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
    const now = new Date();
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
          const classStartTime = new Date(event.startTime);
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
  }, [groupedEvents, selectedCategory, selectedInstructor, searchQuery]);

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

  // Loading state
  if (isLoading && groupedEvents.length === 0) {
    return <FullPageLoading />;
  }

  // Error state
  if (error) {
    return <ErrorState message={error} onRetry={fetchEvents} />;
  }

  return (
    <div className="space-y-8">
      {/* Filters Section - Dark Green */}
      <div className="bg-[#1a260e] rounded-2xl p-5 md:p-6 border border-white/10
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]
        transition-shadow duration-500
        relative overflow-hidden">

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 relative z-10">
          {/* Search */}
          <div className="flex-1">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                <Search className="w-4 h-4 text-white/40 group-focus-within:text-white/60 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search classes, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-11 py-3.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40
                  focus:bg-white/15 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10
                  transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full
                    text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2.5 px-5 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/10
              hover:bg-white/15 hover:shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-yellow-500 text-[#1a260e] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Class Type Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white font-medium
                  focus:bg-white/15 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10
                  transition-all duration-300 cursor-pointer hover:bg-white/15 hover:border-white/15"
              >
                <option value="all">All Class Types</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
            </div>

            {/* Instructor Filter */}
            <div className="relative">
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white font-medium
                  focus:bg-white/15 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10
                  transition-all duration-300 cursor-pointer hover:bg-white/15 hover:border-white/15"
              >
                <option value="all">All Instructors</option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filters Dropdown - Dark Green Theme */}
        {showFilters && (
          <div className="lg:hidden mt-5 pt-5 border-t border-white/10 space-y-4 animate-fade-down">
            {/* Class Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-[0.15em]">
                Class Type
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white font-medium
                    focus:bg-white/15 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10
                    transition-all duration-300"
                >
                  <option value="all">All Class Types</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>
            </div>

            {/* Instructor Filter */}
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-[0.15em]">
                Instructor
              </label>
              <div className="relative">
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="w-full appearance-none px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white font-medium
                    focus:bg-white/15 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10
                    transition-all duration-300"
                >
                  <option value="all">All Instructors</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>
            </div>

            {/* Clear Button - Dark Theme */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/10
                  transition-all duration-300 hover:shadow-sm"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-[#1a260e]/50 font-light">
          Showing <span className="font-semibold text-[#1a260e] text-base">{totalClasses}</span>{' '}
          {totalClasses === 1 ? 'class' : 'classes'}
          {hasActiveFilters && <span className="text-[#1a260e]/40"> (filtered)</span>}
        </p>
      </div>

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
        <div className="space-y-8">
          {filteredGroupedEvents.map((group) => (
            <div key={group.date}>
              <DateHeader displayDate={group.displayDate} eventCount={group.events.length} />
              <div className="space-y-2">
                {group.events.map((event) => (
                  <CompactClassRow key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refresh Indicator */}
      {isLoading && groupedEvents.length > 0 && (
        <div className="fixed bottom-8 right-8 bg-[#1a260e] text-[#fffcf2] px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-[#fffcf2] rounded-full animate-ping" />
          <span className="text-sm font-medium">Updating...</span>
        </div>
      )}
    </div>
  );
}
