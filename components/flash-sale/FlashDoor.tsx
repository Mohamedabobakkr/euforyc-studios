'use client';

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode, type RefObject } from 'react';

import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';
import {
  FLASH_PRICES,
  FLASH_PUBLIC_PERCENT,
  FLASH_USUAL_PER_CLASS,
  FLASH_USUAL_PRICE,
  FLASH_VIP_LIMIT,
  FLASH_VIP_PERCENT,
  flashTracking,
} from './config';
import type { FlashOffer, FlashView, UnlockResult } from './useFlashSale';
import styles from './flash.module.css';

export function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" focusable="false">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// The code, decoding
// ---------------------------------------------------------------------------

// No 0/O or 1/I: the scramble should look like a code, not like noise
const SCRAMBLE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const randomGlyph = () => SCRAMBLE.charAt(Math.floor(Math.random() * SCRAMBLE.length));

/**
 * The characters to draw for a code. With `play`, they start as shifting
 * random characters and settle into the real code one by one, left to right,
 * as the doors part. Otherwise (and with reduced motion) the code is simply there.
 */
function useDecoded(code: string, play: boolean) {
  const [frame, setFrame] = useState(() => ({
    glyphs: play ? code.split('').map(randomGlyph) : code.split(''),
    settled: play ? 0 : code.length,
  }));

  useEffect(() => {
    const letters = code.split('');
    if (!play || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFrame({ glyphs: letters, settled: letters.length });
      return;
    }

    const HOLD = 900; // the doors are parting
    const STEP = 90; // then one character settles at a time
    const startedAt = performance.now();
    let raf = 0;
    let drawnAt = 0;
    let drawnSettled = -1;

    const draw = (time: number) => {
      const settled = Math.max(0, Math.min(letters.length, Math.floor((time - startedAt - HOLD) / STEP)));
      if (time - drawnAt > 48 || settled !== drawnSettled) {
        drawnAt = time;
        drawnSettled = settled;
        setFrame({ glyphs: letters.map((letter, index) => (index < settled ? letter : randomGlyph())), settled });
      }
      if (settled < letters.length) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [code, play]);

  return frame;
}

// ---------------------------------------------------------------------------
// The password
// ---------------------------------------------------------------------------

type GateStatus = 'idle' | 'checking' | 'empty' | 'wrong' | 'limited' | 'offline';

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

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'checking') return;
    if (!password.trim()) {
      setStatus('empty');
      input.current?.focus();
      return;
    }

    setStatus('checking');
    const result = await onUnlock(password);
    // On "ok" the door opens and this form is gone
    if (result.status === 'ok') return;

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
    offline: 'We couldn’t reach the door. Check your connection and try again.',
  };

  const checking = status === 'checking';

  return (
    <form className={styles.gate} onSubmit={submit} noValidate>
      <label htmlFor="door-password" className={styles.gateLabel}>
        Password
      </label>
      <div className={`${styles.gateField} ${styles.shake}`} data-shake={shake}>
        {/* The name and id avoid "first", "last", "email" and "phone", which the
            site's pixel code reads from form fields. This field is never read. */}
        <input
          ref={input}
          id="door-password"
          name="door-password"
          className={styles.gateInput}
          type="text"
          inputMode="text"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          maxLength={128}
          placeholder="type it here"
          value={password}
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
      <button
        type="submit"
        className={`eu-btn eu-btn--cream eu-btn--block ${styles.gateGo}`}
        aria-disabled={checking}
      >
        {checking ? 'Checking' : 'Open the door'}
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
// The open doorway: the code, the price and the way to checkout
// ---------------------------------------------------------------------------

function Inside({
  offer,
  tier,
  decode,
  copied,
  onCopy,
  checkoutRef,
}: {
  offer: FlashOffer;
  tier: 'vip' | 'public';
  decode: boolean;
  copied: boolean;
  onCopy: () => void;
  checkoutRef: RefObject<HTMLDivElement>;
}) {
  const price = FLASH_PRICES[tier];
  const { glyphs, settled } = useDecoded(offer.code, decode);
  const code = useRef<HTMLParagraphElement>(null);

  // After the visitor's own password opens the door, focus goes to the code
  useEffect(() => {
    if (decode) code.current?.focus();
  }, [decode]);

  return (
    <>
      <p className={styles.doorKicker}>
        {tier === 'vip' ? `${FLASH_VIP_PERCENT}% off, for the first ${FLASH_VIP_LIMIT}` : `${FLASH_PUBLIC_PERCENT}% off, until midnight`}
      </p>
      <h2 id="flash-door-title" className={styles.doorTitle}>
        {tier === 'vip' ? (
          <>
            You’re <em>in.</em>
          </>
        ) : (
          <>
            Open to <em>everyone.</em>
          </>
        )}
      </h2>

      <p ref={code} className={styles.code} tabIndex={-1}>
        <span className="eu-sr-only">Your code: {offer.code}</span>
        <span className={styles.glyphs} style={{ '--n': Math.max(4, offer.code.length) } as CSSProperties} aria-hidden="true">
          {glyphs.map((glyph, index) => (
            <span key={index} className={`${styles.glyph} ${index < settled ? styles.glyphSet : ''}`}>
              {glyph}
            </span>
          ))}
        </span>
      </p>

      <button type="button" className={`${styles.copy} ${copied ? styles.copyDone : ''}`} onClick={onCopy}>
        <CopyIcon />
        {copied ? 'Copied' : 'Copy code'}
      </button>

      <p className={styles.price}>
        <span className="eu-sr-only">
          Usually {FLASH_USUAL_PRICE}, tonight {price.price}.
        </span>
        <span className={styles.priceRow} aria-hidden="true">
          <s className={styles.priceWas}>{FLASH_USUAL_PRICE}</s>
          <b className={styles.priceNow}>{price.price}</b>
        </span>
        <span className={styles.priceMaths}>
          {price.perClass} a class, instead of {FLASH_USUAL_PER_CLASS}
        </span>
      </p>

      <div ref={checkoutRef} className={styles.checkout}>
        {/* Opens Momence as every other checkout button on the site does. The code is never in the link. */}
        <PillLink
          href={offer.checkoutUrl}
          variant="cream"
          dot
          className="eu-btn--block"
          target="_blank"
          rel="noopener noreferrer"
          {...flashTracking(tier)}
        >
          Go to checkout
        </PillLink>
      </div>
      <p className={styles.doorNote}>Paste the code in “Discount code” before you pay.</p>
    </>
  );
}

// ---------------------------------------------------------------------------
// The door
// ---------------------------------------------------------------------------

/**
 * The arched double door at the centre of the page. Closed and sealed before
 * 12:00, carrying the password field until 18:00, open with the code inside
 * once the visitor is entitled to it, and closed again after midnight.
 */
export default function FlashDoor({
  view,
  offer,
  celebrate,
  unreachable,
  onUnlock,
  copied,
  onCopy,
  checkoutRef,
}: {
  view: FlashView;
  offer: FlashOffer | null;
  /** The visitor's own password has just opened the door */
  celebrate: boolean;
  unreachable: boolean;
  onUnlock: (password: string) => Promise<UnlockResult>;
  copied: boolean;
  onCopy: () => void;
  checkoutRef: RefObject<HTMLDivElement>;
}) {
  const open = (view === 'vipOpen' || view === 'publicOpen') && offer !== null;
  const celebrating = open && celebrate && view === 'vipOpen';

  let content: ReactNode;
  if (open && offer) {
    content = (
      <Inside
        offer={offer}
        tier={view === 'vipOpen' ? 'vip' : 'public'}
        decode={celebrating}
        copied={copied}
        onCopy={onCopy}
        checkoutRef={checkoutRef}
      />
    );
  } else if (view === 'teaser') {
    content = (
      <>
        <p className={styles.doorKicker}>The code</p>
        <h2 id="flash-door-title" className={styles.doorTitle}>
          Sealed until <em>noon.</em>
        </h2>
        <span className={styles.sealed} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <p className={styles.doorText}>
          It is not on this page yet, anywhere. It arrives when the door opens, and nothing can be bought before then.
        </p>
      </>
    );
  } else if (view === 'gate') {
    content = (
      <>
        <p className={styles.doorKicker}>
          {FLASH_VIP_PERCENT}% off, for the first {FLASH_VIP_LIMIT}
        </p>
        <h2 id="flash-door-title" className={styles.doorTitle}>
          Say the <em>password.</em>
        </h2>
        <Gate onUnlock={onUnlock} />
      </>
    );
  } else if (view === 'soldout') {
    content = (
      <>
        <p className={styles.doorKicker}>{FLASH_VIP_PERCENT}% off</p>
        <h2 id="flash-door-title" className={styles.doorTitle}>
          The {FLASH_VIP_LIMIT} are <em>gone.</em>
        </h2>
        <p className={styles.doorText}>
          Every one of the {FLASH_VIP_PERCENT}% codes has been used. The door opens to everyone at 18:00, with{' '}
          {FLASH_PUBLIC_PERCENT}% off.
        </p>
      </>
    );
  } else if (view === 'unavailable') {
    content = (
      <>
        <h2 id="flash-door-title" className={styles.doorTitle}>
          One <em>moment.</em>
        </h2>
        <p className={styles.doorText}>The code is not showing just now. Refresh in a minute, or ask us at the studio.</p>
      </>
    );
  } else if (view === 'ended') {
    content = (
      <>
        <p className={styles.doorKicker}>Friday 27 November</p>
        <h2 id="flash-door-title" className={styles.doorTitle}>
          The door is <em>closed.</em>
        </h2>
        <p className={styles.doorText}>The codes expired at midnight.</p>
      </>
    );
  } else {
    content = (
      <>
        <h2 id="flash-door-title" className="eu-sr-only">
          {unreachable ? 'Reconnecting' : 'The door'}
        </h2>
        {unreachable && <p className={styles.doorText}>We can’t reach the studio clock. Trying again.</p>}
      </>
    );
  }

  return (
    <section
      className={`${styles.door} ${styles.settle} ${open ? styles.doorOpen : ''} ${celebrating ? styles.doorCelebrate : ''}`}
      style={{ '--settle': 3 } as CSSProperties}
      data-flash-settle
      aria-labelledby="flash-door-title"
      aria-busy={view === 'loading'}
    >
      <span className={styles.doorLight} aria-hidden="true" />
      {celebrating && <span className={styles.bloom} aria-hidden="true" />}
      <span className={`${styles.leaf} ${styles.leafL}`} aria-hidden="true" />
      <span className={`${styles.leaf} ${styles.leafR}`} aria-hidden="true" />
      {celebrating && <span className={styles.seam} aria-hidden="true" />}
      <div
        key={view}
        className={`${styles.doorBody} ${open ? styles.doorInside : styles.doorFront} ${!open && view !== 'loading' ? styles.doorWords : ''}`}
      >
        {content}
      </div>
    </section>
  );
}
