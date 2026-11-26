'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';
import { FLASH_DATE, FLASH_ENDS_AT, FLASH_VIP_LIMIT, INTRO_ATTR, INTRO_SEEN_KEY } from './config';
import FlashCountdown from './FlashCountdown';
import type { FlashView, UnlockResult } from './useFlashSale';
import styles from './flash.module.css';

// The landing sequence (CSS, in flash.module.css): the wordmark rises, a thin
// line draws, the headline arrives, and whatever belongs under it settles in.
/** When the countdown or the password field joins the sequence */
const SETTLE_MS = 1300;
/** When the sequence is over and the cover may open */
const INTRO_MS = 1450;
/** How long the password field shows that it was right before the cover parts */
const CONFIRM_MS = 650;
/** The halves sliding apart, and the quick fade used instead of it */
const PART_MS = 900;
const FADE_MS = 300;

// One decision per page load. A visitor who leaves /flash for another page of
// the site and comes back does not get the landing sequence again.
let decidedInThisDocument = false;

// On a normal page load BEFORE_PAINT (an inline script) has already decided,
// before anything was drawn. This is the same decision for a visitor who
// arrives from another page of the site, where that script does not run.
function decideOnArrival(): 'play' | 'skip' {
  try {
    if (Date.now() >= FLASH_ENDS_AT || sessionStorage.getItem(INTRO_SEEN_KEY)) return 'skip';
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Storage is blocked: nothing to remember with, so the sequence simply plays
  }
  return 'play';
}

// ---------------------------------------------------------------------------
// The password
// ---------------------------------------------------------------------------

type GateStatus = 'idle' | 'checking' | 'empty' | 'wrong' | 'limited' | 'offline' | 'ok';

// "12:21", by the visitor's own clock, rounded up to the minute
const clockTime = (time: number) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(Math.ceil(time / 60_000) * 60_000);

function Gate({ onUnlock }: { onUnlock: (password: string) => Promise<UnlockResult> }) {
  const input = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<GateStatus>('idle');
  const [retryAt, setRetryAt] = useState(0);
  // Alternates 1, 2, 1... so every wrong try restarts the shake
  const [shake, setShake] = useState(0);

  const busy = status === 'checking' || status === 'ok';

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    if (!password.trim()) {
      setStatus('empty');
      input.current?.focus();
      return;
    }

    setStatus('checking');
    const result = await onUnlock(password);
    // Right: the field confirms, and the cover parts a moment later
    if (result.status === 'ok') {
      setStatus('ok');
      return;
    }

    if (result.status === 'limited') setRetryAt(result.retryAt);
    if (result.status === 'wrong') setShake((current) => (current === 1 ? 2 : 1));
    setStatus(result.status);
    input.current?.focus();
    input.current?.select();
  };

  const message: Record<GateStatus, string> = {
    idle: '',
    checking: '',
    empty: 'Enter the password you were sent.',
    wrong: 'That isn’t the password. Check the spelling and try again.',
    limited: `Too many tries from this connection. Try again at ${clockTime(retryAt)}.`,
    offline: 'We couldn’t reach the studio. Check your connection and try again.',
    ok: 'That’s the one. Opening.',
  };

  return (
    <form className={`${styles.gate} ${status === 'ok' ? styles.gateOk : ''}`} onSubmit={submit} noValidate>
      <label htmlFor="door-password" className="eu-sr-only">
        Password
      </label>
      <div className={styles.shake} data-shake={shake}>
        {/* The name and id avoid "first", "last", "email" and "phone", which the
            site's pixel code reads from form fields. This field is never read.
            Phones type capitals (the check ignores case either way). Nothing
            here hints at how long the password is: no boxes, no maxlength. */}
        <input
          ref={input}
          id="door-password"
          name="door-password"
          className={styles.gateInput}
          type="text"
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="Password"
          value={password}
          readOnly={status === 'ok'}
          onChange={(event) => {
            setPassword(event.target.value);
            if (status !== 'idle' && status !== 'checking') setStatus('idle');
          }}
          aria-describedby="door-password-message"
          aria-invalid={status === 'wrong' || status === 'empty'}
          data-1p-ignore
          data-lpignore="true"
        />
      </div>
      <button type="submit" className={`eu-btn eu-btn--cream eu-btn--block ${styles.gateGo}`} aria-disabled={busy}>
        {status === 'ok' ? 'Opening' : status === 'checking' ? 'Checking' : 'Open'}
        <span className="eu-btn__dot" aria-hidden="true">
          <Arrow />
        </span>
      </button>
      <p id="door-password-message" className={styles.gateMsg} aria-live="polite">
        {message[status]}
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// The cover
// ---------------------------------------------------------------------------

interface FlashCoverProps {
  /** What the closed cover shows. While it opens, the last thing it showed. */
  view: FlashView;
  secondsLeft: number | null;
  /** The countdown is at zero and the server is being asked what comes next */
  turning: boolean;
  unreachable: boolean;
  onUnlock: (password: string) => Promise<UnlockResult>;
  /** The server has handed over a code: the cover is to open */
  wantOpen: boolean;
  /** The visitor's own password did it, so the field confirms before the cover parts */
  confirmed: boolean;
  /** The cover is back after having been open (the sale ended while the page was up) */
  returning: boolean;
  /** Copies the gradient as it is this instant into the two halves; false if there is none to copy */
  takeSnapshot: (left: HTMLCanvasElement, right: HTMLCanvasElement) => boolean;
  /** The cover has begun to open: the page behind it is there and can be used */
  onOpening: () => void;
  /** The cover is gone */
  onOpened: () => void;
  /** The share of the screen, below the last line of words, that is clear for the gradient's light */
  onClearBelow: (share: number) => void;
}

/**
 * The closed page. One full-screen layer above everything, the site header
 * included: the wordmark (the way home), the headline, and under it whatever
 * the moment calls for. Nothing of the sale is behind it until it opens.
 *
 * It opens when `wantOpen` turns true, which only the server can cause. Its
 * two halves then slide apart, carrying a still of the gradient.
 */
export default function FlashCover({
  view,
  secondsLeft,
  turning,
  unreachable,
  onUnlock,
  wantOpen,
  confirmed,
  returning,
  takeSnapshot,
  onOpening,
  onOpened,
  onClearBelow,
}: FlashCoverProps) {
  const cover = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const slotItem = useRef<HTMLDivElement>(null);
  const leftHalf = useRef<HTMLCanvasElement>(null);
  const rightHalf = useRef<HTMLCanvasElement>(null);

  // ---- The landing sequence: once per browser session ----
  // What was decided for this copy of the component. Kept in a ref because
  // React's development mode runs effects twice, and the second run must not
  // decide again.
  const intro = useRef<{ plays: boolean; startedAt: number } | null>(null);
  const [introOver, setIntroOver] = useState(false);

  useLayoutEffect(() => {
    if (!intro.current) {
      const html = document.documentElement;
      const fromPageLoad = !decidedInThisDocument && html.hasAttribute(INTRO_ATTR);
      let mode = html.getAttribute(INTRO_ATTR);
      if (decidedInThisDocument || returning) mode = 'skip';
      else if (mode !== 'play' && mode !== 'skip') mode = decideOnArrival();
      decidedInThisDocument = true;
      html.setAttribute(INTRO_ATTR, mode);

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // The sequence is CSS and began with the first paint, perhaps before this code ran
      const firstPaint = fromPageLoad ? performance.getEntriesByName('first-contentful-paint')[0] : undefined;
      intro.current = {
        plays: mode === 'play' && !reducedMotion,
        startedAt: firstPaint ? firstPaint.startTime : performance.now(),
      };
    }

    if (!intro.current.plays) {
      setIntroOver(true);
      return;
    }

    // It ends by itself, or at once on any tap, key or scroll
    const end = () => setIntroOver(true);
    const timer = setTimeout(end, Math.max(0, intro.current.startedAt + INTRO_MS - performance.now()));
    window.addEventListener('pointerdown', end, true);
    window.addEventListener('keydown', end, true);
    window.addEventListener('wheel', end, { capture: true, passive: true });
    window.addEventListener('touchmove', end, { capture: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', end, true);
      window.removeEventListener('keydown', end, true);
      window.removeEventListener('wheel', end, true);
      window.removeEventListener('touchmove', end, true);
    };
    // Decided once, when the cover arrives
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once over, it is over for this page load: a cover that comes back is simply there
  useEffect(() => {
    if (introOver) document.documentElement.setAttribute(INTRO_ATTR, 'skip');
  }, [introOver]);

  // ---- Opening ----
  // Whether the visitor has seen this cover closed with something on it. If
  // not, they arrived when the page was already open to them.
  const sawClosed = useRef(false);
  if (!wantOpen && view !== 'loading') sawClosed.current = true;

  const [opening, setOpening] = useState<'part' | 'fade' | null>(null);
  const [halves, setHalves] = useState(false);

  useEffect(() => {
    if (!wantOpen) {
      // The server took the code back before the cover had finished opening
      setOpening(null);
      setHalves(false);
      return;
    }
    if (opening || !introOver) return;

    const begin = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Arriving when it is already open, on a later visit in the same session: a quick fade
      const arrivedOpen = !sawClosed.current;
      const style = reducedMotion || (arrivedOpen && !intro.current?.plays) ? 'fade' : 'part';

      // The gradient as it is this instant, still, in two halves that can slide
      if (leftHalf.current && rightHalf.current) takeSnapshot(leftHalf.current, rightHalf.current);
      setHalves(true);
      setOpening(style);
      onOpening();
    };

    const wait = setTimeout(begin, confirmed && sawClosed.current ? CONFIRM_MS : 0);
    return () => clearTimeout(wait);
  }, [wantOpen, introOver, confirmed, opening, takeSnapshot, onOpening]);

  useEffect(() => {
    if (!opening) return;
    const done = setTimeout(onOpened, opening === 'part' ? PART_MS : FADE_MS);
    return () => clearTimeout(done);
  }, [opening, onOpened]);

  // A cover that has come back takes the focus the open page was holding
  useEffect(() => {
    if (returning) title.current?.focus();
  }, [returning]);

  // ---- What is under the headline ----
  let slotKey: string | null = null;
  let content: ReactNode = null;
  if (view === 'teaser') {
    slotKey = 'teaser';
    content = (
      <>
        <FlashCountdown secondsLeft={secondsLeft} until="until the page opens for password holders" />
        <p className={styles.caption}>{turning ? 'Opening now.' : `Opens ${FLASH_DATE}, 12:00.`}</p>
      </>
    );
  } else if (view === 'gate') {
    slotKey = 'gate';
    content = (
      <>
        <Gate onUnlock={onUnlock} />
        <p className={styles.hint}>
          Opens to everyone at 18:00{' '}
          <FlashCountdown size="small" secondsLeft={secondsLeft} until="until the page opens for everyone" />
        </p>
      </>
    );
  } else if (view === 'soldout') {
    slotKey = 'soldout';
    content = (
      <>
        <p className={styles.line}>The first {FLASH_VIP_LIMIT} are gone.</p>
        <FlashCountdown secondsLeft={secondsLeft} until="until the page opens for everyone" />
        <p className={styles.caption}>{turning ? 'Opening now.' : 'Opens to everyone at 18:00.'}</p>
      </>
    );
  } else if (view === 'unavailable') {
    slotKey = 'unavailable';
    content = <p className={styles.line}>The code isn’t showing just now. Please refresh in a minute.</p>;
  } else if (view === 'ended') {
    slotKey = 'ended';
    content = (
      <PillLink href="/offers" variant="cream" dot>
        See current offers
      </PillLink>
    );
  } else if (unreachable) {
    slotKey = 'unreachable';
    content = <p className={styles.line}>We can’t reach the studio just now. Trying again.</p>;
  }

  // When what is under the headline changes (12:00: the countdown gives way to
  // the password field), the old content fades out as the new arrives, in place
  const [shown, setShown] = useState<{ key: string | null; previous: { key: string; node: ReactNode } | null }>({
    key: slotKey,
    previous: null,
  });
  // What was on screen after the last render (recorded after it, never during)
  const lastContent = useRef<ReactNode>(null);
  if (shown.key !== slotKey) {
    setShown({ key: slotKey, previous: shown.key ? { key: shown.key, node: lastContent.current } : null });
  }
  useEffect(() => {
    lastContent.current = content;
  });
  useEffect(() => {
    if (!shown.previous) return;
    const gone = setTimeout(() => setShown((current) => ({ ...current, previous: null })), 360);
    return () => clearTimeout(gone);
  }, [shown.previous]);

  // The first thing to appear under the headline joins the landing sequence at
  // its place in it, however early the server answered
  const firstKey = useRef<string | null>(null);
  const firstDelay = useRef(0);
  if (slotKey && firstKey.current === null && typeof performance !== 'undefined') {
    firstKey.current = slotKey;
    firstDelay.current =
      intro.current?.plays && !introOver ? Math.max(0, intro.current.startedAt + SETTLE_MS - performance.now()) : 0;
  }
  const slotStyle: CSSProperties | undefined =
    slotKey === firstKey.current && firstDelay.current > 0 ? { animationDelay: `${Math.round(firstDelay.current)}ms` } : undefined;

  // ---- Where the words end, so the gradient can keep its light below them ----
  useEffect(() => {
    const element = cover.current;
    if (!element) return;
    const measure = () => {
      const height = element.clientHeight;
      if (!height) return;
      // On a screen too short for the cover, it scrolls, and the light stays out altogether
      if (element.scrollHeight > height + 1) {
        onClearBelow(0);
        return;
      }
      const edges = [title.current, slotItem.current].map((part) => (part ? part.getBoundingClientRect().bottom : 0));
      const lowest = Math.max(edges[0], edges[1]) - element.getBoundingClientRect().top;
      // The light stops 32px short of the words
      onClearBelow(Math.max(0, (height - lowest - 32) / height));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    if (slotItem.current) observer.observe(slotItem.current);
    return () => observer.disconnect();
  }, [slotKey, onClearBelow]);

  const ended = view === 'ended';
  const classes = [
    styles.cover,
    introOver ? styles.introOver : '',
    returning ? styles.coverReturn : '',
    halves ? styles.halvesOn : '',
    opening === 'part' ? styles.coverParting : '',
    opening === 'fade' ? styles.coverFading : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={cover} className={classes} data-flash-cover={opening ? 'opening' : 'closed'} aria-label="Black Friday Flash Sale">
      {/* The two halves that slide apart. Hidden until then: the living gradient is behind the cover. */}
      <span className={`${styles.half} ${styles.halfL}`} aria-hidden="true">
        <canvas ref={leftHalf} />
      </span>
      <span className={`${styles.half} ${styles.halfR}`} aria-hidden="true">
        <canvas ref={rightHalf} />
      </span>
      <span className={styles.veil} aria-hidden="true" />

      <div className={styles.stack}>
        <Link href="/" className={styles.wordmark} aria-label="Euforyc Studios, home">
          <span className={styles.wordmarkCrop}>
            <Image src="/logo.png" alt="" width={625} height={313} sizes="(max-width: 600px) 44vw, 220px" loading="eager" />
          </span>
        </Link>
        <span className={styles.introLine} aria-hidden="true" />

        <h1 ref={title} className={styles.coverTitle} tabIndex={-1}>
          {ended ? (
            <>
              <span style={{ '--i': 0 } as CSSProperties}>That was</span>
              <span style={{ '--i': 1 } as CSSProperties}>
                <em>Black Friday.</em>
              </span>
            </>
          ) : (
            <>
              <span style={{ '--i': 0 } as CSSProperties}>Black Friday</span>
              <span style={{ '--i': 1 } as CSSProperties}>
                <em>Flash</em> Sale
              </span>
            </>
          )}
        </h1>

        <div className={styles.slot}>
          {shown.previous && (
            <div key={`out-${shown.previous.key}`} className={`${styles.slotItem} ${styles.slotOut}`} aria-hidden="true">
              {shown.previous.node}
            </div>
          )}
          {content && (
            <div key={slotKey} ref={slotItem} className={`${styles.slotItem} ${styles.slotIn}`} style={slotStyle}>
              {content}
            </div>
          )}
          <noscript>
            <p className={styles.line}>This page needs JavaScript to open.</p>
          </noscript>
        </div>
      </div>
    </section>
  );
}
