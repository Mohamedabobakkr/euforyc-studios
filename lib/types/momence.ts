/**
 * Momence API TypeScript Types
 * Secure, type-safe interfaces for Euforyc Studios integration
 */

// ============================================================================
// Core Event/Class Types
// ============================================================================

export interface MomenceEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string; // ISO 8601 datetime
  endTime: string; // ISO 8601 datetime
  duration?: number; // minutes
  timeZone?: string;

  // Instructor information
  instructor?: {
    id: string;
    name: string;
    bio?: string;
    profileImageUrl?: string;
  };

  // Capacity and availability
  capacity: number;
  spotsAvailable: number;
  spotsBooked: number;
  waitlistEnabled?: boolean;
  waitlistCount?: number;
  isSoldOut: boolean;
  isLowCapacity: boolean; // Custom flag for UI (< 25% spots)

  // Pricing
  price: number;
  currency: string;
  dropInPrice?: number;

  // Classification
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  tags?: string[];

  // Location
  location?: {
    name: string;
    address: string;
    room?: string;
  };

  // Booking
  bookingUrl: string;
  canBook: boolean;
  requiresAccount?: boolean;

  // Additional metadata
  notes?: string;
  prerequisites?: string;
  equipmentNeeded?: string[];
  imageUrl?: string;
  isRecurring?: boolean;
  recurrencePattern?: string;
  isCancelled?: boolean;
  cancellationReason?: string;
}

// ============================================================================
// Membership Types
// ============================================================================

export interface MomenceMembership {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;

  // Pricing
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'quarterly' | 'annually' | 'one-time';
  setupFee?: number;

  // Benefits
  classesPerMonth?: number | 'unlimited';
  classTypes?: string[];
  benefits: string[];

  // Attributes
  isPopular?: boolean;
  isPaused?: boolean;
  isActive: boolean;

  // Availability
  availableSlots?: number;
  maxMembers?: number;

  // Terms
  contractLength?: number; // months
  autoRenew?: boolean;
  cancellationPolicy?: string;

  // Booking
  signUpUrl: string;

  // Categorization for Euforyc
  category?: 'reformer' | 'hot' | 'hybrid' | 'dance';

  // Display
  imageUrl?: string;
  displayOrder?: number;
}

// ============================================================================
// Package/Product Types
// ============================================================================

export interface MomenceProduct {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;

  // Pricing
  price: number;
  currency: string;
  compareAtPrice?: number; // Original price for showing savings

  // Package details
  classCount?: number;
  validityDays?: number; // How long package is valid
  expirationDate?: string;

  // Attributes
  isIntroOffer?: boolean;
  isPopular?: boolean;
  isActive: boolean;

  // Usage
  applicableClassTypes?: string[];
  restrictions?: string[];

  // Availability
  availableSlots?: number;
  maxPurchases?: number;

  // Booking
  purchaseUrl: string;

  // Categorization for Euforyc
  category?: 'reformer' | 'hot' | 'hybrid' | 'intro';

  // Display
  imageUrl?: string;
  displayOrder?: number;
  badges?: string[]; // e.g., ['NEW', 'BEST VALUE', 'LIMITED TIME']
}

// ============================================================================
// Teacher/Instructor Types
// ============================================================================

export interface MomenceTeacher {
  id: string;
  name: string;
  bio: string;
  shortBio?: string;

  // Profile
  profileImageUrl?: string;
  email?: string;
  phone?: string;

  // Credentials
  certifications?: string[];
  specialties?: string[];
  experience?: string;
  education?: string[];

  // Teaching
  classesTeaching?: string[];
  teachingStyles?: string[];

  // Social media
  instagramHandle?: string;
  websiteUrl?: string;
  linkedInUrl?: string;

  // Availability
  isActive: boolean;

  // Stats (optional)
  totalClasses?: number;
  rating?: number;
  reviewCount?: number;

  // Display
  displayOrder?: number;
  featuredQuote?: string;
}

// ============================================================================
// API Response Wrappers
// ============================================================================

export interface MomenceApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  cached?: boolean;
  cacheExpiry?: string;
}

export interface MomenceListResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page?: number;
  perPage?: number;
  timestamp: string;
  cached?: boolean;
}

// ============================================================================
// Error Types
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: string;
  statusCode: number;
  timestamp: string;
}

export class MomenceApiError extends Error {
  code: string;
  statusCode: number;
  details?: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'MomenceApiError';
    this.code = error.code;
    this.statusCode = error.statusCode;
    this.details = error.details;
  }
}

// ============================================================================
// Filter & Query Types
// ============================================================================

export interface EventFilters {
  startDate?: string; // ISO date
  endDate?: string; // ISO date
  instructorId?: string;
  category?: string;
  level?: string;
  minSpotsAvailable?: number;
  includeWaitlist?: boolean;
  excludeSoldOut?: boolean;
}

export interface DateGroupedEvents {
  date: string; // YYYY-MM-DD
  displayDate: string; // e.g., "Monday, January 8"
  events: MomenceEvent[];
}

// ============================================================================
// UI State Types
// ============================================================================

export interface LoadingState {
  isLoading: boolean;
  error: ApiError | null;
  lastFetched?: string;
}

export interface ScheduleState extends LoadingState {
  events: MomenceEvent[];
  groupedEvents: DateGroupedEvents[];
  filters: EventFilters;
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface MomenceConfig {
  apiToken: string;
  hostId: string;
  baseUrl: string;
  cacheOptions: {
    events: number; // seconds
    memberships: number;
    products: number;
    teachers: number;
  };
}
