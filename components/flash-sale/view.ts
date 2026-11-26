import type { FlashState } from './config';

/**
 * The one rule of the /flash page:
 *
 *   the cover opens if, and only if, the server has handed over a code.
 *
 * That happens in exactly three cases, all decided on the server: a correct
 * password in the password phase, a returning visitor whose signed cookie is
 * still valid, and everyone in the public phase. Nothing here looks at a
 * clock. The browser's time can draw a countdown, but it can never open the
 * page, because there is no code on the page for it to reveal.
 */

/** A code and the checkout link it is used at, as the server sent them */
export interface FlashOffer {
  code: string;
  checkoutUrl: string;
}

export type FlashView =
  | 'loading' // the server has not answered yet
  | 'teaser' // before 12:00
  | 'gate' // 12:00 to 18:00, waiting for the password
  | 'soldout' // 12:00 to 18:00, the first 20 are gone
  | 'vipOpen' // 12:00 to 18:00, password accepted
  | 'publicOpen' // 18:00 to midnight
  | 'unavailable' // 18:00 to midnight, but the server has no code to give
  | 'ended';

export interface FlashReading {
  view: FlashView;
  /** The code to show; null whenever the cover is closed */
  offer: FlashOffer | null;
  /** True only when `offer` is there */
  open: boolean;
}

const offerIn = (state: FlashState): FlashOffer | null =>
  state.code && state.checkoutUrl ? { code: state.code, checkoutUrl: state.checkoutUrl } : null;

/**
 * What the page shows.
 *
 * `state` is the latest answer from GET /api/flash/state. `held` is the code
 * POST /api/flash/unlock returned for this visitor's own correct password; it
 * is kept in memory so the page stays open through the password phase even in
 * a browser that refuses the cookie. It counts in the password phase only.
 */
export function readFlash(state: FlashState | null, held: FlashOffer | null = null): FlashReading {
  if (!state) return { view: 'loading', offer: null, open: false };

  if (state.phase === 'vip') {
    if (state.soldOutVip) return { view: 'soldout', offer: null, open: false };
    const offer = offerIn(state) ?? held;
    return offer ? { view: 'vipOpen', offer, open: true } : { view: 'gate', offer: null, open: false };
  }

  if (state.phase === 'public') {
    const offer = offerIn(state);
    return offer ? { view: 'publicOpen', offer, open: true } : { view: 'unavailable', offer: null, open: false };
  }

  // Before 12:00 and after midnight the server never sends a code, and the
  // cover stays shut whatever else arrives
  return { view: state.phase === 'teaser' ? 'teaser' : 'ended', offer: null, open: false };
}
