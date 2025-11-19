/**
 * @copyright Euforyc Studios 2025
 * @license Proprietary and confidential
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */

/**
 * Facebook Pixel Advanced Matching Data
 * Collects user data for improved ad targeting and conversion tracking
 * Data is automatically hashed by the pixel using SHA-256
 */
export interface AdvancedMatchingData {
  em?: string;      // Email
  ph?: string;      // Phone
  fn?: string;      // First Name
  ln?: string;      // Last Name
  ct?: string;      // City
  st?: string;      // State/Province
  zp?: string;      // Zip/Postal Code
  country?: string; // Country Code
  ge?: string;      // Gender (m/f)
  db?: string;      // Date of Birth (YYYYMMDD)
  external_id?: string; // External ID
}

/**
 * Collects advanced matching data from the page
 * Automatically extracts data from common form fields and meta tags
 */
export function collectAdvancedMatchingData(): AdvancedMatchingData {
  const data: AdvancedMatchingData = {};

  // Try to get data from various sources
  try {
    // Check for email fields
    const emailInputs = document.querySelectorAll<HTMLInputElement>(
      'input[type="email"], input[name*="email" i], input[id*="email" i]'
    );
    if (emailInputs.length > 0) {
      const emailValue = emailInputs[0].value?.trim();
      if (emailValue && validateEmail(emailValue)) {
        data.em = emailValue.toLowerCase();
      }
    }

    // Check for phone fields
    const phoneInputs = document.querySelectorAll<HTMLInputElement>(
      'input[type="tel"], input[name*="phone" i], input[id*="phone" i]'
    );
    if (phoneInputs.length > 0) {
      const phoneValue = phoneInputs[0].value?.trim();
      if (phoneValue) {
        // Remove non-numeric characters
        data.ph = phoneValue.replace(/\D/g, '');
      }
    }

    // Check for first name fields
    const firstNameInputs = document.querySelectorAll<HTMLInputElement>(
      'input[name*="firstname" i], input[name*="first_name" i], input[name*="fname" i], input[id*="firstname" i]'
    );
    if (firstNameInputs.length > 0) {
      const fnValue = firstNameInputs[0].value?.trim();
      if (fnValue) {
        data.fn = fnValue.toLowerCase();
      }
    }

    // Check for last name fields
    const lastNameInputs = document.querySelectorAll<HTMLInputElement>(
      'input[name*="lastname" i], input[name*="last_name" i], input[name*="lname" i], input[id*="lastname" i]'
    );
    if (lastNameInputs.length > 0) {
      const lnValue = lastNameInputs[0].value?.trim();
      if (lnValue) {
        data.ln = lnValue.toLowerCase();
      }
    }

    // Check for city fields
    const cityInputs = document.querySelectorAll<HTMLInputElement>(
      'input[name*="city" i], input[id*="city" i]'
    );
    if (cityInputs.length > 0) {
      const cityValue = cityInputs[0].value?.trim();
      if (cityValue) {
        data.ct = cityValue.toLowerCase();
      }
    }

    // Check for postal code fields
    const zipInputs = document.querySelectorAll<HTMLInputElement>(
      'input[name*="zip" i], input[name*="postal" i], input[name*="postcode" i], input[id*="zip" i], input[id*="postal" i]'
    );
    if (zipInputs.length > 0) {
      const zipValue = zipInputs[0].value?.trim();
      if (zipValue) {
        data.zp = zipValue.toLowerCase();
      }
    }

    // Default country to GB for UK-based business
    data.country = 'gb';

  } catch (error) {
    console.warn('Error collecting advanced matching data:', error);
  }

  return data;
}

/**
 * Validates email format
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Initialize Facebook Pixel with advanced matching
 */
export function initializeFacebookPixel(pixelId: string): void {
  if (typeof window === 'undefined' || !window.fbq) {
    return;
  }

  const advancedMatchingData = collectAdvancedMatchingData();

  // Initialize with advanced matching data
  window.fbq('init', pixelId, advancedMatchingData);
  window.fbq('track', 'PageView');
}

/**
 * Track Facebook Pixel events with advanced matching
 */
export function trackFacebookEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.fbq) {
    return;
  }

  window.fbq('track', eventName, parameters);
}

/**
 * Track custom Facebook Pixel events
 */
export function trackCustomEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.fbq) {
    return;
  }

  window.fbq('trackCustom', eventName, parameters);
}

// Type declarations for Facebook Pixel
declare global {
  interface Window {
    fbq: (
      command: string,
      eventNameOrPixelId: string,
      parameters?: Record<string, any>
    ) => void;
  }
}
