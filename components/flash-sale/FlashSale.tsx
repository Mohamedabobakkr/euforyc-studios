'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

import { flashTracking } from './config';
import FlashCover from './FlashCover';
import FlashGradient, { type FlashGradientHandle } from './FlashGradient';
import FlashOpen from './FlashOpen';
import { useFlashSale, type FlashView } from './useFlashSale';
import './flash-ground.css';
import styles from './flash.module.css';

// The existing clipboard pattern (PromoBanner, /offers), with the fallback for older browsers
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }
}

/**
 * While the cover is closed, nothing behind it can be reached: the page does
 * not scroll, and the site's header and footer are `inert` (no keyboard
 * focus, no screen reader, no taps). Done from here, on the elements as they
 * are in the page; the layout itself is not touched. Returns the undo.
 */
function sealPageBehind(root: HTMLElement): () => void {
  const sealed: HTMLElement[] = [];
  Array.from(document.body.children).forEach((element) => {
    if (!(element instanceof HTMLElement) || element.contains(root)) return;
    if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE' || element.tagName === 'NEXT-ROUTE-ANNOUNCER') return;
    // Already inert for someone else's reason: not ours to release later
    if (element.hasAttribute('inert')) return;
    element.setAttribute('inert', '');
    sealed.push(element);
  });

  const html = document.documentElement;
  const overflowBefore = html.style.overflow;
  html.style.overflow = 'hidden';

  return () => {
    sealed.forEach((element) => element.removeAttribute('inert'));
    html.style.overflow = overflowBefore;
  };
}

// Said once, politely, to screen readers when the page changes in place
const ANNOUNCE = {
  opened: 'The page is open. Your code is on it.',
  closed: 'The page has closed.',
};

/**
 * The /flash page. A static shell: everything live comes from
 * /api/flash/state.
 *
 * The whole page is closed until the server hands over a code. Closed, it is
 * one full-screen cover (FlashCover) over a slow gradient (FlashGradient) and
 * nothing of the sale is in the page at all. Open, it is FlashOpen.
 */
export default function FlashSale() {
  const { view, phase, offer, open, secondsLeft, turning, unreachable, justUnlocked, unlock } = useFlashSale();

  const root = useRef<HTMLDivElement>(null);
  const gradient = useRef<FlashGradientHandle>(null);

  // closed: the cover is shut. opening: it is sliding apart over the page. open: it is gone.
  const [reached, setReached] = useState<'closed' | 'opening' | 'open'>('closed');
  // The cover has come back after the page was open (midnight arrived)
  const [returning, setReturning] = useState(false);

  // Only a code from the server opens the cover, and losing it closes it again:
  // at once, in the same render, whatever the animation had reached
  const stage = open ? reached : 'closed';
  useEffect(() => {
    if (!open && reached !== 'closed') {
      setReached('closed');
      setReturning(true);
    }
  }, [open, reached]);

  const onOpening = useCallback(() => setReached('opening'), []);
  const onOpened = useCallback(() => setReached('open'), []);
  const takeSnapshot = useCallback(
    (left: HTMLCanvasElement, right: HTMLCanvasElement) => gradient.current?.snapshot(left, right) ?? false,
    []
  );

  // What the cover shows. While it opens it keeps showing what it last showed
  // closed; someone who arrives with the page already open sees no more than
  // the wordmark and the headline.
  const [closedView, setClosedView] = useState<FlashView>('loading');
  if (!open && closedView !== view) setClosedView(view);
  const coverView = open ? closedView : view;

  // Closed: seal off everything behind the cover. Released the moment it
  // starts to open, and when the visitor leaves the page.
  useEffect(() => {
    if (stage !== 'closed' || !root.current) return;
    return sealPageBehind(root.current);
  }, [stage]);

  // How much of the screen below the cover's words is clear for the light
  const [clearBelow, setClearBelow] = useState(0);
  const onClearBelow = useCallback((share: number) => setClearBelow(Math.round(share * 200) / 200), []);

  // ---- Copy the code ----
  const [copied, setCopied] = useState(false);
  const code = offer?.code;
  const copy = useCallback(async () => {
    if (!code) return;
    const ok = await copyToClipboard(code);
    setCopied(ok);
    if (ok) {
      try {
        navigator.vibrate?.(12);
      } catch {
        // No vibration on this device
      }
    }
  }, [code]);
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timeout);
  }, [copied]);

  // ---- Sticky bar: shown on phones while the page's own checkout button is off screen ----
  const pageMounted = stage !== 'closed' && offer !== null;
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [checkoutInView, setCheckoutInView] = useState(true);
  useEffect(() => {
    const button = checkoutRef.current;
    if (!pageMounted || !button) return;
    const observer = new IntersectionObserver(([entry]) => setCheckoutInView(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(button);
    return () => observer.disconnect();
  }, [pageMounted, view]);

  // ---- Tell screen readers when the page changes in place ----
  const [announcement, setAnnouncement] = useState('');
  const stageBefore = useRef(stage);
  useEffect(() => {
    const before = stageBefore.current;
    stageBefore.current = stage;
    if (before === 'closed' && stage === 'opening') setAnnouncement(ANNOUNCE.opened);
    if (before !== 'closed' && stage === 'closed') setAnnouncement(ANNOUNCE.closed);
  }, [stage]);

  const tier = view === 'vipOpen' ? 'vip' : 'public';

  return (
    <div
      ref={root}
      className={`${styles.root} eu-on-dark`}
      // The CSS gradient (shown when WebGL is missing) keeps its light below the words too
      style={{ '--fl-light': clearBelow } as CSSProperties}
      data-flash-root
    >
      {/* One canvas for the whole page: the cover's ground while closed, the top of the page once open */}
      <FlashGradient
        ref={gradient}
        mode={stage === 'closed' ? 'cover' : 'page'}
        lightBelow={clearBelow}
        paused={stage === 'opening'}
        still={view === 'ended'}
      />

      {stage !== 'open' && (
        <FlashCover
          view={coverView}
          secondsLeft={secondsLeft}
          turning={turning}
          unreachable={unreachable}
          onUnlock={unlock}
          wantOpen={open}
          confirmed={justUnlocked}
          returning={returning}
          takeSnapshot={takeSnapshot}
          onOpening={onOpening}
          onOpened={onOpened}
          onClearBelow={onClearBelow}
        />
      )}

      {/* Nothing of the sale is in the page until the cover opens */}
      {pageMounted && offer && (
        <FlashOpen
          offer={offer}
          tier={tier}
          phase={phase}
          secondsLeft={secondsLeft}
          arrive
          focusCode={justUnlocked}
          copied={copied}
          onCopy={copy}
          checkoutRef={checkoutRef}
        />
      )}

      {/* Phones: the code and the checkout stay in reach once the button has scrolled away */}
      {stage === 'open' && offer && (
        <div className={`${styles.bar} ${checkoutInView ? '' : styles.barShow}`} data-bookbar>
          <button type="button" className={styles.barCode} onClick={copy} aria-label={copied ? 'Code copied' : 'Copy code'}>
            <span className={styles.barCodeText}>{copied ? 'Copied' : offer.code}</span>
            <span className={styles.barCodeHint}>{copied ? '' : 'Copy'}</span>
          </button>
          <a href={offer.checkoutUrl} className={styles.barGo} target="_blank" rel="noopener noreferrer" {...flashTracking(tier)}>
            Checkout
          </a>
        </div>
      )}

      <p className="eu-sr-only" aria-live="polite">
        {copied ? 'Code copied.' : ''}
      </p>
      <p className="eu-sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
