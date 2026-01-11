/**
 * Momence API Client
 * Secure server-side client for Euforyc Studios integration
 *
 * SECURITY: This file MUST only be imported in server-side code
 * (API routes, Server Components). Never import in Client Components.
 */

import {
  MomenceEvent,
  MomenceMembership,
  MomenceProduct,
  MomenceTeacher,
  MomenceApiError,
  EventFilters,
  DateGroupedEvents,
} from './types/momence';

// ============================================================================
// Configuration
// ============================================================================

const MOMENCE_CONFIG = {
  apiToken: process.env.MOMENCE_API_TOKEN || '',
  hostId: process.env.MOMENCE_HOST_ID || '75303',
  baseUrl: process.env.MOMENCE_API_BASE_URL || 'https://momence.com/_api/primary',
};

// Cache durations (in seconds)
const CACHE_DURATION = {
  events: 0, // No caching - always fetch fresh data for live schedule
  memberships: 3600, // 1 hour - semi-static pricing
  products: 3600, // 1 hour - semi-static pricing
  teachers: 7200, // 2 hours - rarely changes
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validates that API token is configured
 */
function validateConfig(): void {
  if (!MOMENCE_CONFIG.apiToken || MOMENCE_CONFIG.apiToken === 'your_momence_api_token_here') {
    throw new MomenceApiError({
      code: 'CONFIG_ERROR',
      message: 'Momence API token is not configured. Please add MOMENCE_API_TOKEN to .env.local',
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Sanitizes error messages to prevent sensitive data leaks
 */
function sanitizeError(error: unknown): MomenceApiError {
  if (error instanceof MomenceApiError) {
    return error;
  }

  const timestamp = new Date().toISOString();

  if (error instanceof Error) {
    // Don't expose internal error details
    return new MomenceApiError({
      code: 'API_ERROR',
      message: 'An error occurred while fetching data from Momence',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      statusCode: 500,
      timestamp,
    });
  }

  return new MomenceApiError({
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500,
    timestamp,
  });
}

/**
 * Groups events by date for display
 */
function groupEventsByDate(events: MomenceEvent[]): DateGroupedEvents[] {
  const grouped = new Map<string, MomenceEvent[]>();

  events.forEach((event) => {
    const date = new Date(event.startTime).toISOString().split('T')[0];
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(event);
  });

  const result: DateGroupedEvents[] = [];
  grouped.forEach((events, date) => {
    const displayDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    result.push({
      date,
      displayDate,
      events: events.sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      ),
    });
  });

  return result.sort((a, b) => a.date.localeCompare(b.date));
}

// ============================================================================
// Momence API Client Class
// ============================================================================

export class MomenceApiClient {
  private baseUrl: string;
  private hostId: string;
  private token: string;

  constructor() {
    validateConfig();

    this.baseUrl = MOMENCE_CONFIG.baseUrl;
    this.hostId = MOMENCE_CONFIG.hostId;
    this.token = MOMENCE_CONFIG.apiToken;
  }

  /**
   * Makes an authenticated request to the Momence API
   */
  private async request<T>(
    endpoint: string,
    additionalParams: Record<string, string> = {},
    cacheDuration?: number
  ): Promise<T> {
    try {
      // Build URL with required query parameters
      const params = new URLSearchParams({
        hostId: this.hostId,
        token: this.token,
        ...additionalParams,
      });

      const url = `${this.baseUrl}${endpoint}?${params.toString()}`;

      const fetchOptions: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Add Next.js caching if duration specified
      if (cacheDuration) {
        fetchOptions.next = {
          revalidate: cacheDuration,
        };
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new MomenceApiError({
          code: 'HTTP_ERROR',
          message: `HTTP ${response.status}: ${response.statusText}`,
          details: process.env.NODE_ENV === 'development' ? errorText : undefined,
          statusCode: response.status,
          timestamp: new Date().toISOString(),
        });
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      throw sanitizeError(error);
    }
  }

  /**
   * Fetches events/classes with optional filters
   */
  async getEvents(filters?: EventFilters): Promise<MomenceEvent[]> {
    try {
      const additionalParams: Record<string, string> = {};

      if (filters?.startDate) {
        additionalParams.startDate = filters.startDate;
      }
      if (filters?.endDate) {
        additionalParams.endDate = filters.endDate;
      }
      if (filters?.instructorId) {
        additionalParams.instructorId = filters.instructorId;
      }
      if (filters?.category) {
        additionalParams.category = filters.category;
      }

      // Fetch events from Momence API
      const data = await this.request<any>(
        '/api/v1/Events',
        additionalParams,
        CACHE_DURATION.events
      );

      // Transform API response to our MomenceEvent type
      const events: MomenceEvent[] = this.transformEvents(data);

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Momence] Total events from API: ${events.length}`);
      }

      // Apply client-side filters
      let filteredEvents = events;

      // ALWAYS filter out cancelled events - they shouldn't be displayed
      const cancelledEvents = filteredEvents.filter((event) => event.isCancelled);
      filteredEvents = filteredEvents.filter((event) => !event.isCancelled);

      if (process.env.NODE_ENV === 'development' && cancelledEvents.length > 0) {
        console.log(`[Momence] Filtered out ${cancelledEvents.length} cancelled/unpublished events:`);
        cancelledEvents.slice(0, 3).forEach((event: MomenceEvent) => {
          console.log(`  - ${event.title} (${event.startTime}) - ID: ${event.id}`);
        });
        if (cancelledEvents.length > 3) {
          console.log(`  ... and ${cancelledEvents.length - 3} more`);
        }
      }

      if (filters?.excludeSoldOut) {
        filteredEvents = filteredEvents.filter((event) => !event.isSoldOut);
      }

      if (filters?.minSpotsAvailable) {
        filteredEvents = filteredEvents.filter(
          (event) => event.spotsAvailable >= (filters.minSpotsAvailable || 0)
        );
      }

      if (filters?.level) {
        filteredEvents = filteredEvents.filter((event) => event.level === filters.level);
      }

      return filteredEvents;
    } catch (error) {
      throw sanitizeError(error);
    }
  }

  /**
   * Fetches events grouped by date
   */
  async getEventsGroupedByDate(filters?: EventFilters): Promise<DateGroupedEvents[]> {
    const events = await this.getEvents(filters);
    return groupEventsByDate(events);
  }

  /**
   * Fetches memberships
   */
  async getMemberships(): Promise<MomenceMembership[]> {
    try {
      const data = await this.request<any>(
        '/api/v1/Memberships',
        {},
        CACHE_DURATION.memberships
      );

      return this.transformMemberships(data);
    } catch (error) {
      throw sanitizeError(error);
    }
  }

  /**
   * Fetches products/packages
   */
  async getProducts(): Promise<MomenceProduct[]> {
    try {
      const data = await this.request<any>(
        '/api/v1/Products',
        {},
        CACHE_DURATION.products
      );

      return this.transformProducts(data);
    } catch (error) {
      throw sanitizeError(error);
    }
  }

  /**
   * Fetches teachers/instructors
   */
  async getTeachers(): Promise<MomenceTeacher[]> {
    try {
      const data = await this.request<any>(
        '/api/v1/Teachers',
        {},
        CACHE_DURATION.teachers
      );

      return this.transformTeachers(data);
    } catch (error) {
      throw sanitizeError(error);
    }
  }

  // ==========================================================================
  // Data Transformation Methods
  // ==========================================================================

  /**
   * Transforms raw API events to MomenceEvent type
   * Based on actual Momence API v1 response structure
   */
  private transformEvents(data: any): MomenceEvent[] {
    const events = Array.isArray(data) ? data : data.events || [];

    // Log API response summary for debugging
    if (process.env.NODE_ENV === 'development' && events.length > 0) {
      const dates = events.map((e: any) => new Date(e.dateTime).toISOString().split('T')[0]);
      const uniqueDates = [...new Set(dates)].sort();
      console.log('[Momence API] Date range:', uniqueDates[0], 'to', uniqueDates[uniqueDates.length - 1]);
      console.log('[Momence API] Sample events:', events.slice(0, 2).map((e: any) => ({
        id: e.id,
        title: e.title,
        dateTime: e.dateTime,
        published: e.published,
        isCancelled: e.isCancelled,
        isDeleted: e.isDeleted,
      })));
    }

    return events.map((event: any) => {
      // Momence API fields: dateTime, capacity, spotsRemaining, ticketsSold, fixedPrice
      const capacity = event.capacity || 0;
      const spotsAvailable = event.spotsRemaining || 0;
      const spotsBooked = event.ticketsSold || 0;
      const isSoldOut = spotsAvailable === 0;
      const isLowCapacity = spotsAvailable > 0 && spotsAvailable / capacity < 0.25;

      // Only mark as cancelled if explicitly cancelled, deleted, or unpublished
      // Trust the Momence API - if it's published and not cancelled, show it
      const isCancelled =
        event.isCancelled === true ||
        event.isDeleted === true ||
        event.published === false;

      // Calculate endTime from startTime + duration
      const startTime = event.dateTime;
      let endTime = startTime;
      if (startTime && event.duration) {
        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + event.duration * 60000);
        endTime = endDate.toISOString();
      }

      return {
        id: String(event.id),
        title: event.title || 'Class',
        description: event.description || '',
        startTime: startTime,
        endTime: endTime,
        duration: event.duration || 45,
        timeZone: 'Europe/London',

        // Teacher is a string in Momence API, not an object
        instructor: event.teacher
          ? {
              id: String(event.teacherId || event.originalTeacherId || ''),
              name: event.teacher || event.originalTeacher || 'Staff',
              bio: '',
              profileImageUrl: event.image2 || undefined,
            }
          : undefined,

        capacity,
        spotsAvailable,
        spotsBooked,
        isSoldOut,
        isLowCapacity,
        waitlistEnabled: event.allowWaitlist || false,
        waitlistCount: 0,

        price: event.fixedPrice || 0,
        currency: 'GBP',
        dropInPrice: event.fixedPrice,

        category: event.type || '',
        level: 'All Levels',
        tags: event.tags || [],

        // Location is a string in Momence API
        location: {
          name: event.location || 'Euforyc Studios',
          address: '161 Hale Lane, Edgware, London HA8 9QP',
          room: undefined,
        },

        bookingUrl: event.link || `https://momence.com/s/${event.id}`,
        canBook: !isSoldOut && !isCancelled,
        requiresAccount: true,

        notes: undefined,
        prerequisites: undefined,
        equipmentNeeded: undefined,
        imageUrl: event.image1 || undefined,
        isRecurring: false,
        isCancelled: isCancelled,
        cancellationReason: event.cancellationReason || undefined,
      } as MomenceEvent;
    });
  }

  /**
   * Transforms raw API memberships to MomenceMembership type
   */
  private transformMemberships(data: any): MomenceMembership[] {
    const memberships = Array.isArray(data) ? data : data.memberships || [];

    return memberships.map((membership: any) => ({
      id: membership.id || membership._id || String(membership.membershipId),
      name: membership.name || membership.title || 'Membership',
      description: membership.description || '',
      shortDescription: membership.shortDescription || membership.summary,

      price: membership.price || membership.amount || 0,
      currency: membership.currency || 'GBP',
      billingCycle: membership.billingCycle || membership.frequency || 'monthly',
      setupFee: membership.setupFee || membership.initFee,

      classesPerMonth:
        membership.classesPerMonth || membership.classLimit || membership.unlimited ? 'unlimited' : 0,
      classTypes: membership.classTypes || membership.applicableClasses || [],
      benefits: membership.benefits || membership.features || [],

      isPopular: membership.isPopular || membership.featured || false,
      isPaused: membership.isPaused || false,
      isActive: membership.isActive !== false,

      availableSlots: membership.availableSlots || membership.openSpots,
      maxMembers: membership.maxMembers || membership.memberLimit,

      contractLength: membership.contractLength || membership.commitmentMonths,
      autoRenew: membership.autoRenew !== false,
      cancellationPolicy: membership.cancellationPolicy,

      signUpUrl: membership.signUpUrl || membership.purchaseUrl || `https://momence.com/Euforyc-Studios/memberships/${membership.id}`,

      category: this.categorizeMembership(membership),
      imageUrl: membership.imageUrl || membership.image,
      displayOrder: membership.displayOrder || membership.sortOrder || 0,
    })) as MomenceMembership[];
  }

  /**
   * Transforms raw API products to MomenceProduct type
   */
  private transformProducts(data: any): MomenceProduct[] {
    const products = Array.isArray(data) ? data : data.products || [];

    return products.map((product: any) => ({
      id: product.id || product._id || String(product.productId),
      name: product.name || product.title || 'Class Package',
      description: product.description || '',
      shortDescription: product.shortDescription || product.summary,

      price: product.price || product.amount || 0,
      currency: product.currency || 'GBP',
      compareAtPrice: product.compareAtPrice || product.regularPrice,

      classCount: product.classCount || product.classes || product.credits,
      validityDays: product.validityDays || product.expiryDays,
      expirationDate: product.expirationDate || product.expiry,

      isIntroOffer: product.isIntroOffer || product.introductory || false,
      isPopular: product.isPopular || product.featured || false,
      isActive: product.isActive !== false,

      applicableClassTypes: product.applicableClassTypes || product.classTypes || [],
      restrictions: product.restrictions || [],

      availableSlots: product.availableSlots,
      maxPurchases: product.maxPurchases || product.purchaseLimit,

      purchaseUrl: product.purchaseUrl || product.buyUrl || `https://momence.com/Euforyc-Studios/packages/${product.id}`,

      category: this.categorizeProduct(product),
      imageUrl: product.imageUrl || product.image,
      displayOrder: product.displayOrder || product.sortOrder || 0,
      badges: product.badges || this.generateProductBadges(product),
    })) as MomenceProduct[];
  }

  /**
   * Transforms raw API teachers to MomenceTeacher type
   */
  private transformTeachers(data: any): MomenceTeacher[] {
    const teachers = Array.isArray(data) ? data : data.teachers || data.instructors || [];

    return teachers.map((teacher: any) => ({
      id: teacher.id || teacher._id || String(teacher.teacherId),
      name: teacher.name || teacher.fullName || 'Instructor',
      bio: teacher.bio || teacher.description || '',
      shortBio: teacher.shortBio || teacher.summary,

      profileImageUrl: teacher.profileImageUrl || teacher.imageUrl || teacher.photo,
      email: teacher.email,
      phone: teacher.phone,

      certifications: teacher.certifications || teacher.certs || [],
      specialties: teacher.specialties || teacher.expertise || [],
      experience: teacher.experience || teacher.yearsExperience,
      education: teacher.education || [],

      classesTeaching: teacher.classesTeaching || teacher.classes || [],
      teachingStyles: teacher.teachingStyles || teacher.styles || [],

      instagramHandle: teacher.instagramHandle || teacher.instagram,
      websiteUrl: teacher.websiteUrl || teacher.website,
      linkedInUrl: teacher.linkedInUrl || teacher.linkedin,

      isActive: teacher.isActive !== false,

      totalClasses: teacher.totalClasses || teacher.classCount,
      rating: teacher.rating || teacher.averageRating,
      reviewCount: teacher.reviewCount || teacher.totalReviews,

      displayOrder: teacher.displayOrder || teacher.sortOrder || 0,
      featuredQuote: teacher.featuredQuote || teacher.quote,
    })) as MomenceTeacher[];
  }

  // ==========================================================================
  // Helper Methods
  // ==========================================================================

  /**
   * Categorizes membership based on name/type for Euforyc
   */
  private categorizeMembership(membership: any): 'reformer' | 'hot' | 'hybrid' | 'dance' | undefined {
    const name = (membership.name || '').toLowerCase();

    if (name.includes('reformer')) return 'reformer';
    if (name.includes('hot') || name.includes('pilates')) return 'hot';
    if (name.includes('hybrid') || name.includes('unlimited')) return 'hybrid';
    if (name.includes('dance')) return 'dance';

    return undefined;
  }

  /**
   * Categorizes product based on name/type for Euforyc
   */
  private categorizeProduct(product: any): 'reformer' | 'hot' | 'hybrid' | 'intro' | undefined {
    const name = (product.name || '').toLowerCase();

    if (name.includes('intro') || name.includes('new client')) return 'intro';
    if (name.includes('reformer')) return 'reformer';
    if (name.includes('hot') || name.includes('pilates')) return 'hot';
    if (name.includes('hybrid')) return 'hybrid';

    return undefined;
  }

  /**
   * Generates badges for products based on attributes
   */
  private generateProductBadges(product: any): string[] {
    const badges: string[] = [];

    if (product.isIntroOffer || product.introductory) {
      badges.push('INTRO OFFER');
    }
    if (product.isPopular || product.featured) {
      badges.push('POPULAR');
    }
    if (product.compareAtPrice && product.compareAtPrice > product.price) {
      badges.push('SAVE ' + Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) + '%');
    }
    if (product.isNew) {
      badges.push('NEW');
    }
    if (product.limited || product.limitedTime) {
      badges.push('LIMITED TIME');
    }

    return badges;
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const momenceClient = new MomenceApiClient();
