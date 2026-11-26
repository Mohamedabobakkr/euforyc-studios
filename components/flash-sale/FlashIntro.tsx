'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';

import { FLASH_ENDS_AT, INTRO_ATTR, INTRO_SEEN_KEY } from './config';
import styles from './flash.module.css';

const TITLE = 'Black Friday';

// One decision per page load. A visitor who leaves /flash for another page of
// the site and comes back does not see the doors again.
let decidedInThisDocument = false;

// On a normal page load INTRO_GATE (an inline script) has already decided,
// before anything was drawn. This is the same decision for a visitor who
// arrives from another page of the site, where that script does not run.
function decideOnArrival(): 'play' | 'skip' {
  try {
    if (Date.now() >= FLASH_ENDS_AT || sessionStorage.getItem(INTRO_SEEN_KEY)) return 'skip';
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Storage is blocked: nothing to remember with, so the doors simply play
  }
  return 'play';
}

// Elements marked data-flash-settle wait for the doors to part before rising
// into place. When the intro is skipped they should rise now, not later.
function settleNow() {
  try {
    document.getAnimations().forEach((animation) => {
      const effect = animation.effect;
      if (!(effect instanceof KeyframeEffect) || !effect.target?.hasAttribute('data-flash-settle')) return;
      const delay = Number(effect.getTiming().delay) || 0;
      if (Number(animation.currentTime ?? 0) < delay) animation.currentTime = delay;
    });
  } catch {
    // An older browser: they rise on schedule instead
  }
}

/**
 * "The doors open": the short opening sequence. A full-screen overlay above
 * the page, which is already drawn and loading underneath.
 *
 * The sequence itself is CSS (flash.module.css), so it runs and ends without
 * JavaScript. This component only adds: skip on any tap, scroll or key; never
 * playing twice in one browser session; and taking the overlay out of the
 * page once it is over. It is hidden from assistive technology throughout,
 * and it never locks scrolling or moves focus.
 */
export default function FlashIntro({ ended }: { ended: boolean }) {
  const overlay = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const skipRef = useRef<() => void>(() => {});
  // True once this copy of the component has started the sequence. React's
  // development mode runs effects twice; the second run must carry on, not skip.
  const started = useRef(false);

  useLayoutEffect(() => {
    const html = document.documentElement;
    let mode: string | null = 'play';
    if (!started.current) {
      mode = html.getAttribute(INTRO_ATTR);
      // Coming back to /flash from another page of the site: already seen
      if (decidedInThisDocument) mode = 'skip';
      else if (mode !== 'play' && mode !== 'skip') mode = decideOnArrival();
      decidedInThisDocument = true;
      html.setAttribute(INTRO_ATTR, mode);
    }
    const element = overlay.current;
    if (mode === 'skip' || !element) {
      setGone(true);
      return;
    }
    started.current = true;

    let finished = false;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let leaving: ReturnType<typeof setTimeout> | undefined;

    const stopListening = () => {
      window.removeEventListener('pointerdown', skip, true);
      window.removeEventListener('keydown', skip, true);
      window.removeEventListener('wheel', skip, true);
      window.removeEventListener('touchmove', skip, true);
      window.removeEventListener('scroll', skip, true);
    };

    // Out of the page for good. (The attribute on <html> is left as it is:
    // the headline and countdown are still rising into place on its timing.)
    const finish = () => {
      if (finished) return;
      finished = true;
      stopListening();
      if (fallback) clearTimeout(fallback);
      if (leaving) clearTimeout(leaving);
      setGone(true);
    };

    function skip() {
      if (finished || leaving) return;
      stopListening();
      element?.classList.add(styles.introSkipped);
      settleNow();
      leaving = setTimeout(finish, 220);
    }
    skipRef.current = skip;

    window.addEventListener('pointerdown', skip, true);
    window.addEventListener('keydown', skip, true);
    window.addEventListener('wheel', skip, { capture: true, passive: true });
    window.addEventListener('touchmove', skip, { capture: true, passive: true });
    window.addEventListener('scroll', skip, { capture: true, passive: true });

    // The sequence ends by itself (CSS). Wait for its first "gone" animation
    // on the overlay, however much of it had already played before this ran.
    try {
      const own = element.getAnimations();
      const first = own.sort(
        (a, b) => Number(a.effect?.getComputedTiming().endTime ?? 0) - Number(b.effect?.getComputedTiming().endTime ?? 0)
      )[0];
      if (first) first.finished.then(finish, finish);
      else fallback = setTimeout(finish, 2400);
    } catch {
      fallback = setTimeout(finish, 2400);
    }
    // Whatever happens, never later than this
    const last = setTimeout(finish, 3400);

    return () => {
      // Stop quietly. `finished` also turns the pending "gone" promise into a no-op.
      finished = true;
      stopListening();
      clearTimeout(last);
      if (fallback) clearTimeout(fallback);
      if (leaving) clearTimeout(leaving);
    };
  }, []);

  // The sale is over: no doors
  useEffect(() => {
    if (ended) skipRef.current();
  }, [ended]);

  if (gone) return null;

  return (
    <div ref={overlay} className={styles.intro} aria-hidden="true" data-flash-intro-overlay>
      <span className={styles.introGlow} />
      <span className={`${styles.introDoor} ${styles.introDoorL}`} />
      <span className={`${styles.introDoor} ${styles.introDoorR}`} />
      <div className={styles.introLockup}>
        <div className={styles.introLogo}>
          <Image src="/logo.png" alt="" width={625} height={313} sizes="(max-width: 480px) 64vw, 300px" loading="eager" />
        </div>
        <span className={styles.introLine} />
        <span className={styles.introTitle}>
          {TITLE.split('').map((letter, index) => (
            <span key={index} style={{ '--i': index } as CSSProperties}>
              {letter === ' ' ? ' ' : letter}
            </span>
          ))}
        </span>
        <span className={styles.introSub}>One night only · 27 November</span>
      </div>
      <span className={styles.introSkip}>Skip</span>
    </div>
  );
}
