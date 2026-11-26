'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import { nextPhaseAt, phaseAt, type FlashPhase, type FlashState } from './config';

// The page is a static shell: everything that depends on the time, the
// password or the codes comes from these two routes
const STATE_URL = '/api/flash/state';
const UNLOCK_URL = '/api/flash/unlock';
const REFRESH_MS = 60_000;

export interface FlashOffer {
  code: string;
  checkoutUrl: string;
}

/** What the door is doing */
export type FlashView =
  | 'loading' // the server has not answered yet
  | 'teaser' // sealed until 12:00
  | 'gate' // 12:00 to 18:00, waiting for the password
  | 'soldout' // 12:00 to 18:00, the 20 are gone
  | 'vipOpen' // 12:00 to 18:00, password accepted
  | 'publicOpen' // 18:00 to midnight
  | 'unavailable' // 18:00 to midnight, but the server has no code to give
  | 'ended';

export type UnlockResult =
  | { status: 'ok' }
  | { status: 'wrong' }
  /** `retryAt` is by the visitor's own clock, which is the one they will look at */
  | { status: 'limited'; retryAt: number }
  | { status: 'offline' };

const visible = () => document.visibilityState === 'visible';

/**
 * The server's clock, to the second. The browser's clock only supplies the
 * ticking: `offset` (server minus browser) corrects it, so a phone with the
 * wrong time still counts down correctly. Null while the page is being built.
 */
function useServerSeconds(offset: number): number | null {
  const store = useMemo(() => {
    const now = () => Date.now() + offset;
    return {
      subscribe(onChange: () => void) {
        let timer: ReturnType<typeof setTimeout>;
        // Wake just after each second turns over, so the digits never skip or stall
        const schedule = () => {
          timer = setTimeout(() => {
            onChange();
            schedule();
          }, 1000 - (now() % 1000) + 8);
        };
        schedule();
        // Phones pause timers in the background: look again on return
        document.addEventListener('visibilitychange', onChange);
        return () => {
          clearTimeout(timer);
          document.removeEventListener('visibilitychange', onChange);
        };
      },
      getSnapshot: () => Math.floor(now() / 1000),
    };
  }, [offset]);

  return useSyncExternalStore<number | null>(store.subscribe, store.getSnapshot, () => null);
}

export function useFlashSale() {
  const [state, setState] = useState<FlashState | null>(null);
  const [offset, setOffset] = useState(0);
  const [failures, setFailures] = useState(0);
  // The 50% code this page was handed after a correct password. Kept in
  // memory only (never in storage), so it survives a refresh of the state
  // even in a browser that refuses the cookie.
  const [held, setHeld] = useState<FlashOffer | null>(null);
  // True from the moment the visitor's own password opens the door
  const [justUnlocked, setJustUnlocked] = useState(false);
  const latestRequest = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++latestRequest.current;
    const sentAt = Date.now();
    try {
      const response = await fetch(STATE_URL, {
        cache: 'no-store',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('state unavailable');
      const next = (await response.json()) as FlashState;
      if (typeof next?.serverNow !== 'number' || typeof next.phase !== 'string') throw new Error('bad state');
      // An older answer must never overwrite a newer one
      if (id !== latestRequest.current) return;
      // The server stamped its time somewhere between sending and receiving
      setOffset(Math.round(next.serverNow - (sentAt + Date.now()) / 2));
      setState(next);
      setFailures(0);
    } catch {
      if (id === latestRequest.current) setFailures((count) => count + 1);
    }
  }, []);

  // On arrival, every 60 seconds, and whenever the tab comes back to the front
  useEffect(() => {
    refresh();
    const every = setInterval(() => {
      if (visible()) refresh();
    }, REFRESH_MS);
    const onReturn = () => {
      if (visible()) refresh();
    };
    document.addEventListener('visibilitychange', onReturn);
    window.addEventListener('pageshow', onReturn);
    window.addEventListener('online', onReturn);
    return () => {
      clearInterval(every);
      document.removeEventListener('visibilitychange', onReturn);
      window.removeEventListener('pageshow', onReturn);
      window.removeEventListener('online', onReturn);
    };
  }, [refresh]);

  // A failed request is tried again, a little later each time
  useEffect(() => {
    if (failures === 0) return;
    const retry = setTimeout(refresh, Math.min(2000 * failures, 20_000));
    return () => clearTimeout(retry);
  }, [failures, refresh]);

  const seconds = useServerSeconds(offset);
  const now = seconds === null ? null : seconds * 1000;

  // Until the server answers, the browser's clock draws the timeline and the
  // countdown. That is cosmetic: no code exists on the page to reveal early.
  const phase: FlashPhase | null = state ? state.phase : now === null ? null : phaseAt(now);
  const target = state ? state.nextPhaseAt : phase ? nextPhaseAt(phase) : null;
  const secondsLeft = target === null || now === null ? null : Math.max(0, Math.round((target - now) / 1000));

  // The countdown has reached zero: ask the server, and keep asking until it
  // agrees the next phase has begun. The page then changes in place.
  const turning = state !== null && state.nextPhaseAt !== null && now !== null && now >= state.nextPhaseAt;
  useEffect(() => {
    if (!turning) return;
    let stopped = false;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const ask = async () => {
      if (stopped) return;
      tries += 1;
      await refresh();
      if (!stopped) timer = setTimeout(ask, Math.min(600 * tries, 5000));
    };
    timer = setTimeout(ask, 200);
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [turning, refresh]);

  // The held code belongs to the password phase only
  const inVip = state?.phase === 'vip' && !state.soldOutVip;
  useEffect(() => {
    if (state && !inVip) {
      setHeld(null);
      setJustUnlocked(false);
    }
  }, [state, inVip]);

  const fromServer: FlashOffer | null =
    state?.code && state.checkoutUrl ? { code: state.code, checkoutUrl: state.checkoutUrl } : null;

  let view: FlashView = 'loading';
  let offer: FlashOffer | null = null;
  if (state) {
    if (state.phase === 'teaser') {
      view = 'teaser';
    } else if (state.phase === 'vip') {
      offer = state.soldOutVip ? null : fromServer ?? held;
      view = state.soldOutVip ? 'soldout' : offer ? 'vipOpen' : 'gate';
    } else if (state.phase === 'public') {
      offer = fromServer;
      view = offer ? 'publicOpen' : 'unavailable';
    } else {
      view = 'ended';
    }
  }

  const unlock = useCallback(async (password: string): Promise<UnlockResult> => {
    try {
      const response = await fetch(UNLOCK_URL, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ password }),
      });
      const body: { ok?: unknown; code?: unknown; checkoutUrl?: unknown; retryAfter?: unknown } | null = await response
        .json()
        .catch(() => null);

      if (response.ok && body?.ok === true && typeof body.code === 'string' && typeof body.checkoutUrl === 'string') {
        setHeld({ code: body.code, checkoutUrl: body.checkoutUrl });
        setJustUnlocked(true);
        return { status: 'ok' };
      }
      if (response.status === 429) {
        const wait = Number(body?.retryAfter) || Number(response.headers.get('Retry-After')) || 15 * 60;
        return { status: 'limited', retryAt: Date.now() + wait * 1000 };
      }
      if (response.status === 401) return { status: 'wrong' };
      return { status: 'offline' };
    } catch {
      return { status: 'offline' };
    }
  }, []);

  return {
    view,
    /** The phase to draw the timeline with; null only while the page is being built */
    phase,
    offer,
    soldOutVip: state?.soldOutVip ?? false,
    secondsLeft,
    /** The countdown is at zero and the next phase is being fetched */
    turning,
    /** The server cannot be reached and nothing has been loaded yet */
    unreachable: state === null && failures > 1,
    justUnlocked,
    unlock,
  };
}
