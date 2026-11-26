'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

import { OPEN_SEEN_KEY, RETURN_ATTR, flashTracking } from './config';
import FlashCover from './FlashCover';
import FlashGradient, { type FlashGradientHandle } from './FlashGradient';
import FlashOpen from './FlashOpen';
import { useFlashSale, type FlashView } from './useFlashSale';
import './flash-ground.css';
import styles from './flash.module.css';

// The older way to copy, for browsers (some in-app ones) where the clipboard
// is not offered or is refused. Kept out of sight and off the page's scroll.
function selectAndCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    textarea.style.fontSize = '16px'; // no zoom on focus in iOS
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

// The existing clipboard pattern (PromoBanner, /offers). The write is started
// at once, inside the tap that asked for it, which is what browsers require.
function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => selectAndCopy(text)
      );
    }
  } catch {
    // Fall through to the older way
  }
  return Promise.resolve(selectAndCopy(text));
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

// The session remembers that the page was open (never the code), so coming
// back from Momence or refreshing does not show the cover again first
function rememberOpen(open: boolean) {
  try {
    if (open) sessionStorage.setItem(OPEN_SEEN_KEY, '1');
    else sessionStorage.removeItem(OPEN_SEEN_KEY);
  } catch {
    // Storage is blocked: the cover simply shows for a moment on the way back
  }
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
  const { view, phase, offer, open, secondsLeft, now, turning, unreachable, offline, justUnlocked, unlock } = useFlashSale();

  const root = useRef<HTMLDivElement>(null);
  const gradient = useRef<FlashGradientHandle>(null);

  // closed: the cover is shut. opening: it is sliding apart over the page. open: it is gone.
  const [reached, setReached] = useState<'closed' | 'opening' | 'open'>('closed');
  // The cover has come back after the page was open (midnight arrived)
  const [returning, setReturning] = useState(false);

  // Coming back to a page that was open earlier in this session (from Momence,
  // or a refresh): BEFORE_PAINT has kept the cover from being drawn. Until the
  // server answers there is only the ink ground; then the page is simply
  // there again, or the cover returns if the server no longer hands over a code.
  const [resuming, setResuming] = useState(false);
  useLayoutEffect(() => {
    if (document.documentElement.getAttribute(RETURN_ATTR) === 'open') setResuming(true);
    return () => document.documentElement.removeAttribute(RETURN_ATTR);
  }, []);
  const waitingToResume = resuming && view === 'loading' && !unreachable;
  useEffect(() => {
    if (!resuming || waitingToResume) return;
    if (open) setReached('open');
    else setReturning(true);
    setResuming(false);
    document.documentElement.removeAttribute(RETURN_ATTR);
  }, [resuming, waitingToResume, open]);

  // Only a code from the server opens the cover, and losing it closes it again:
  // at once, in the same render, whatever the animation had reached
  const stage = open ? (resuming ? 'open' : reached) : 'closed';
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
  const coverShown = stage !== 'open' && !waitingToResume;

  // Closed: seal off everything behind the cover. Released the moment it
  // starts to open, and when the visitor leaves the page.
  useEffect(() => {
    if (stage !== 'closed' || !coverShown || !root.current) return;
    return sealPageBehind(root.current);
  }, [stage, coverShown]);

  useEffect(() => {
    if (stage === 'open') rememberOpen(true);
    else if (view !== 'loading' && !open) rememberOpen(false);
  }, [stage, view, open]);

  // How much of the screen below the cover's words is clear for the light
  const [clearBelow, setClearBelow] = useState(0);
  const onClearBelow = useCallback((share: number) => setClearBelow(Math.round(share * 200) / 200), []);

  // ---- Copy the code ----
  const code = offer?.code;
  const [copied, setCopied] = useState(false);
  // After a copy, the checkout button draws the eye once
  const [nudge, setNudge] = useState(false);
  const afterCopy = useCallback((ok: boolean) => {
    setCopied(ok);
    if (!ok) return;
    setNudge(true);
    try {
      navigator.vibrate?.(12);
    } catch {
      // No vibration on this device
    }
  }, []);
  const copy = useCallback(() => {
    if (code) copyToClipboard(code).then(afterCopy);
  }, [code, afterCopy]);
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timeout);
  }, [copied]);
  useEffect(() => {
    if (!nudge) return;
    const timeout = setTimeout(() => setNudge(false), 1300);
    return () => clearTimeout(timeout);
  }, [nudge]);

  // ---- Checkout copies the code for you ----
  // Runs inside the tap on either checkout button, before the link opens
  // Momence in its own tab exactly as it always has. The code goes to the
  // clipboard, never into the link.
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const copyOnTheWayOut = useCallback(() => {
    if (!code) return;
    copyToClipboard(code).then((ok) => {
      setCopied(ok);
      setConfirmation(ok ? `${code} copied. Paste it in Discount code.` : `Your code is ${code}. Type it in Discount code.`);
    });
  }, [code]);
  // The line stays for a while after the visitor is back on this tab
  useEffect(() => {
    if (!confirmation) return;
    let timeout = setTimeout(() => setConfirmation(null), 8000);
    const onReturn = () => {
      if (document.visibilityState !== 'visible') return;
      clearTimeout(timeout);
      timeout = setTimeout(() => setConfirmation(null), 8000);
    };
    document.addEventListener('visibilitychange', onReturn);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', onReturn);
    };
  }, [confirmation]);

  // ---- Sticky bar: shown on phones once the page's own checkout button has scrolled away ----
  // Only once it has gone off the top. While it is still below, the visitor
  // has not yet seen what they are buying, and the bar stays out of the way.
  // The observer's box reaches far below the screen, so "in view" means "on
  // screen or still to come", and a jump straight past the button (a restored
  // scroll position, a link to the small print) is noticed like a slow scroll.
  const pageMounted = stage !== 'closed' && offer !== null;
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [checkoutInView, setCheckoutInView] = useState(true);
  useEffect(() => {
    const button = checkoutRef.current;
    if (!pageMounted || !button) return;
    const observer = new IntersectionObserver(
      // The second test covers a browser that ignores the margin (a page shown inside a frame)
      ([entry]) => setCheckoutInView(entry.isIntersecting || entry.boundingClientRect.top > 0),
      { threshold: 0.5, rootMargin: '0px 0px 100000px 0px' }
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, [pageMounted, view]);

  // ---- Tell screen readers when the page changes in place ----
  const [announcement, setAnnouncement] = useState('');
  const stageBefore = useRef(stage);
  useEffect(() => {
    const before = stageBefore.current;
    stageBefore.current = stage;
    if (before === 'closed' && stage !== 'closed') setAnnouncement(ANNOUNCE.opened);
    if (before !== 'closed' && stage === 'closed') setAnnouncement(ANNOUNCE.closed);
  }, [stage]);

  const tier = view === 'vipOpen' ? 'vip' : 'public';
  const barShown = stage === 'open' && !checkoutInView;

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
        hidden={waitingToResume}
      />

      {coverShown && (
        <FlashCover
          view={coverView}
          secondsLeft={secondsLeft}
          turning={turning}
          unreachable={unreachable}
          offline={offline}
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
          now={now}
          focusCode={justUnlocked}
          copied={copied}
          onCopy={copy}
          onCheckout={copyOnTheWayOut}
          confirmation={confirmation}
          nudge={nudge}
          offline={offline}
          checkoutRef={checkoutRef}
        />
      )}

      {/* Phones: the code and the checkout stay in reach once the button has scrolled away */}
      {stage === 'open' && offer && (
        <>
          {/* The confirmation for a tap on the bar's own checkout, just above it */}
          <p className={`${styles.toast} ${barShown && confirmation ? styles.toastShow : ''}`} aria-hidden="true">
            {confirmation}
          </p>
          <div className={`${styles.bar} ${barShown ? styles.barShow : ''}`} data-bookbar>
            <button type="button" className={styles.barCode} onClick={copy} aria-label={copied ? 'Code copied' : 'Copy code'}>
              <span className={styles.barCodeText}>{copied ? 'Copied' : offer.code}</span>
              <span className={styles.barCodeHint}>{copied ? '' : 'Copy'}</span>
            </button>
            <a
              href={offer.checkoutUrl}
              className={styles.barGo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyOnTheWayOut}
              {...flashTracking(tier)}
            >
              Checkout
            </a>
          </div>
        </>
      )}

      <p className="eu-sr-only" aria-live="polite">
        {copied && !confirmation ? 'Code copied.' : ''}
      </p>
      <p className="eu-sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
