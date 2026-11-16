'use client';

import { useSyncExternalStore } from 'react';
import { BF_ENDS_AT, bfTimeLeft, blackFridayEnded } from './offer';

// The clock check shared by /black-friday and the Black Friday banner

// Tells React to look at the clock again: at the end time itself, every 30
// seconds, and whenever the tab comes back to the front (phones pause timers)
function subscribeToEnd(onChange: () => void) {
  const remaining = BF_ENDS_AT - Date.now();
  if (remaining <= 0) return () => {};
  const atEnd = remaining < 2 ** 31 - 1000 ? setTimeout(onChange, remaining + 50) : null;
  const tick = setInterval(onChange, 30_000);
  document.addEventListener('visibilitychange', onChange);
  return () => {
    if (atEnd) clearTimeout(atEnd);
    clearInterval(tick);
    document.removeEventListener('visibilitychange', onChange);
  };
}

const endedNow = () => blackFridayEnded();

/**
 * Whether the offer has ended, by the visitor's own clock. `serverEnded` is
 * what the page HTML was built with (it can be out of date); the browser's
 * answer replaces it as soon as the page is running.
 */
export function useOfferEnded(serverEnded: boolean) {
  return useSyncExternalStore(subscribeToEnd, endedNow, () => serverEnded);
}

const timeLeftNow = () => bfTimeLeft();

/**
 * "13 days left", "Ends tonight at 23:59" and so on, by the visitor's own
 * clock. `serverTimeLeft` is what the page HTML was built with.
 */
export function useTimeLeft(serverTimeLeft: string) {
  return useSyncExternalStore(subscribeToEnd, timeLeftNow, () => serverTimeLeft);
}
