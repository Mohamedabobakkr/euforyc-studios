'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';

import PillLink from '@/components/euforyc/PillLink';
import { SITE_URL } from '@/lib/site';
import { buildFlashCalendar } from './calendar';
import {
  FLASH_DATE,
  FLASH_PACK_CLASSES,
  FLASH_PATH,
  FLASH_PRICES,
  FLASH_PUBLIC_PERCENT,
  FLASH_TERMS,
  FLASH_USUAL_PER_CLASS,
  FLASH_USUAL_PRICE,
  FLASH_VIP_LIMIT,
  FLASH_VIP_PERCENT,
  PHASE_ATTR,
  flashTracking,
  type FlashPhase,
} from './config';
import FlashCountdown from './FlashCountdown';
import FlashDoor, { CopyIcon } from './FlashDoor';
import FlashIntro from './FlashIntro';
import FlashTimeline from './FlashTimeline';
import { useFlashSale, type FlashView } from './useFlashSale';
import './flash-ground.css';
import styles from './flash.module.css';

const PAGE_URL = `${SITE_URL}${FLASH_PATH}`;

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

// What the countdown is counting to, in each part of the day
const COUNTING: Record<Exclude<FlashPhase, 'ended'>, { label: string; until: string }> = {
  teaser: { label: 'Opens for password holders in', until: 'until the door opens for password holders' },
  vip: { label: 'Opens for everyone in', until: 'until the door opens for everyone' },
  public: { label: 'Closes in', until: 'until the door closes' },
};

// Said once, politely, to screen readers when the page changes in place
const ARRIVED: Partial<Record<FlashView, string>> = {
  gate: 'It is 12:00. The door is open for password holders.',
  soldout: `All ${FLASH_VIP_LIMIT} of the ${FLASH_VIP_PERCENT}% codes have been used.`,
  vipOpen: `The door is open. Your ${FLASH_VIP_PERCENT}% code is on the page.`,
  publicOpen: `It is 18:00. The door is open to everyone, with ${FLASH_PUBLIC_PERCENT}% off.`,
  ended: 'It is midnight. The door is closed.',
};

/** The /flash page. A static shell: everything live comes from /api/flash/state. */
export default function FlashSale() {
  const { view, phase, offer, soldOutVip, secondsLeft, turning, unreachable, justUnlocked, unlock } = useFlashSale();

  const ended = view === 'ended';
  const open = (view === 'vipOpen' || view === 'publicOpen') && offer !== null;
  const tier = view === 'vipOpen' ? 'vip' : 'public';

  // The layout follows the phase through one attribute on <html>, first set
  // before the page is drawn (BEFORE_PAINT) and kept current here. The dark
  // ground behind the page hangs on it too (flash-ground.css). Taken off again
  // when the visitor leaves for another page of the site.
  useLayoutEffect(() => {
    if (!phase) return;
    document.documentElement.setAttribute(PHASE_ATTR, phase);
    return () => document.documentElement.removeAttribute(PHASE_ATTR);
  }, [phase]);

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

  // ---- Sticky bar: shown on phones while the door's own checkout button is off screen ----
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [checkoutInView, setCheckoutInView] = useState(true);
  useEffect(() => {
    const button = checkoutRef.current;
    if (!open || !button) return;
    const observer = new IntersectionObserver(([entry]) => setCheckoutInView(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(button);
    return () => observer.disconnect();
  }, [open, view]);
  // After the visitor's own password, the bar waits for the reveal to finish
  const [barReady, setBarReady] = useState(false);
  useEffect(() => {
    if (!open) {
      setBarReady(false);
      return;
    }
    if (!justUnlocked) {
      setBarReady(true);
      return;
    }
    const wait = setTimeout(() => setBarReady(true), 2800);
    return () => clearTimeout(wait);
  }, [open, justUnlocked]);

  // ---- Tell screen readers when the page changes in place ----
  const [announcement, setAnnouncement] = useState('');
  const previousView = useRef<FlashView>('loading');
  useEffect(() => {
    const before = previousView.current;
    previousView.current = view;
    if (before !== 'loading' && before !== view) setAnnouncement(ARRIVED[view] ?? '');
  }, [view]);

  // ---- Teaser actions ----
  const [actionNote, setActionNote] = useState('');

  const addToCalendar = () => {
    try {
      const file = new Blob([buildFlashCalendar(PAGE_URL)], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'euforyc-black-friday.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      setActionNote('Two reminders saved: 12:00 and 18:00. Open the file to add them to your calendar.');
    } catch {
      setActionNote(`Your browser would not save the file. The times are 12:00 and 18:00 on ${FLASH_DATE}.`);
    }
  };

  const sendToFriend = async () => {
    const text = `Euforyc’s Black Friday is one night only, on ${FLASH_DATE}. The door opens to everyone at 18:00, with ${FLASH_PUBLIC_PERCENT}% off a ${FLASH_PACK_CLASSES}-class pack, and it is gone at midnight.`;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: 'Black Friday at Euforyc', text, url: PAGE_URL });
        return;
      } catch (error) {
        // Closing the share sheet is not a failure
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    // No share sheet: WhatsApp. Opened from a button, not a link, so the
    // site's "Contact" click tracking does not count it as an enquiry.
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${PAGE_URL}`)}`, '_blank', 'noopener,noreferrer');
  };

  const counting = phase && phase !== 'ended' ? COUNTING[phase] : COUNTING.teaser;
  const showLedger = view === 'loading' || view === 'teaser' || view === 'gate' || view === 'soldout' || view === 'unavailable';
  const vipGone = soldOutVip || phase === 'public';

  return (
    <div className={`${styles.root} eu-on-dark`} data-flash-root>
      <FlashIntro ended={ended} />

      <div className={`eu-wrap ${styles.stage}`}>
        {/* The headline never changes while the sale is on. The closed page's
            own words are here too: CSS shows one set or the other. */}
        <header className={`${styles.lead} ${styles.settle}`} data-flash-settle>
          <p className={styles.eyebrow}>Black Friday, {FLASH_DATE}</p>
          <h1 className={styles.title}>
            <span className={styles.whenLive}>One night.</span>
            <span className={styles.whenLive}>One pack.</span>
            <span className={styles.whenLive}>
              <em>A thank-you.</em>
            </span>
            <span className={styles.whenEnded}>That was</span>
            <span className={styles.whenEnded}>
              <em>Black Friday.</em>
            </span>
          </h1>
          <p className={`${styles.lede} ${styles.whenLive}`}>
            {FLASH_PACK_CLASSES} classes for less than the usual {FLASH_USUAL_PRICE}, on one day only. It is our
            thank-you for the year: first to those with the password, then to everyone, and at midnight it is gone.
          </p>
          <p className={`${styles.lede} ${styles.whenEnded}`}>
            The door closed at midnight and the codes have expired. Thank you to everyone who came through it. Our
            current offers are waiting for you.
          </p>
          <div className={`${styles.endedCta} ${styles.whenEnded}`}>
            <PillLink href="/offers" variant="cream" dot stretchMobile>
              See current offers
            </PillLink>
          </div>
        </header>

        <FlashTimeline phase={phase} soldOutVip={soldOutVip} />

        <FlashCountdown secondsLeft={ended ? null : secondsLeft} label={counting.label} until={counting.until} turning={turning} />

        <FlashDoor
          view={view}
          offer={offer}
          celebrate={justUnlocked}
          unreachable={unreachable}
          onUnlock={unlock}
          copied={copied}
          onCopy={copy}
          checkoutRef={checkoutRef}
        />

        <div className={styles.rest}>
          {view === 'teaser' && (
            <div className={styles.actions}>
              <button type="button" className="eu-btn eu-btn--ghost" onClick={addToCalendar}>
                Add to calendar
              </button>
              <button type="button" className="eu-btn eu-btn--ghost" onClick={sendToFriend}>
                Send to a friend
              </button>
              <p className={styles.actionNote} aria-live="polite">
                {actionNote}
              </p>
            </div>
          )}

          {view === 'gate' && (
            <section className={styles.block} aria-labelledby="flash-later-title">
              <h2 id="flash-later-title" className={styles.blockTitle}>
                No password? <em>18:00 is yours.</em>
              </h2>
              <p className={styles.lede}>
                At 18:00 the door opens to everyone. The code will be on this page, no password needed:{' '}
                {FLASH_PUBLIC_PERCENT}% off, so the pack is {FLASH_PRICES.public.price} instead of {FLASH_USUAL_PRICE}.
                It stays open until midnight.
              </p>
            </section>
          )}

          {open && (
            <section className={styles.block} aria-labelledby="flash-steps-title">
              <h2 id="flash-steps-title" className={styles.blockTitle}>
                Three <em>short</em> steps
              </h2>
              <ol className={styles.lines}>
                <li>Copy the code.</li>
                <li>Tap “Go to checkout”. It opens Momence, where you pay.</li>
                <li>Paste the code in “Discount code” and apply it before you pay.</li>
              </ol>
              {view === 'vipOpen' && (
                <p className={styles.honest}>
                  Only {FLASH_VIP_LIMIT} exist, and Momence counts them. If checkout says the code has been used up,
                  they are gone. {FLASH_PUBLIC_PERCENT}% opens to everyone at 18:00.
                </p>
              )}
            </section>
          )}

          {view === 'teaser' && (
            <section className={styles.block} aria-labelledby="flash-how-title">
              <h2 id="flash-how-title" className={styles.blockTitle}>
                How it <em>works</em>
              </h2>
              <ol className={styles.lines}>
                <li>
                  At 12:00 the door opens for password holders: {FLASH_VIP_PERCENT}% off, and only {FLASH_VIP_LIMIT}{' '}
                  codes exist.
                </li>
                <li>At 18:00 it opens for everyone: {FLASH_PUBLIC_PERCENT}% off, until midnight.</li>
                <li>The code appears on this page. Copy it, go to checkout, and paste it in “Discount code”.</li>
              </ol>
            </section>
          )}

          {showLedger && (
            <section className={styles.block} aria-labelledby="flash-price-title">
              <h2 id="flash-price-title" className={styles.blockTitle}>
                The pack: {FLASH_PACK_CLASSES} classes, usually {FLASH_USUAL_PRICE}
              </h2>
              <ul className={styles.ledger}>
                <li className={vipGone ? styles.ledgerGone : undefined}>
                  <span className={styles.ledgerWho}>
                    With the password
                    <small>
                      From 12:00, the first {FLASH_VIP_LIMIT} only{vipGone ? '. Gone.' : ''}
                    </small>
                  </span>
                  <span className={styles.ledgerPrice}>
                    <span className="eu-sr-only">
                      Usually {FLASH_USUAL_PRICE}, {FLASH_PRICES.vip.price} with the password.
                    </span>
                    <s aria-hidden="true">{FLASH_USUAL_PRICE}</s>
                    <b aria-hidden="true">{FLASH_PRICES.vip.price}</b>
                  </span>
                  <span className={styles.ledgerMaths}>
                    {FLASH_PRICES.vip.perClass} a class, instead of {FLASH_USUAL_PER_CLASS}
                  </span>
                </li>
                <li>
                  <span className={styles.ledgerWho}>
                    For everyone
                    <small>From 18:00 until midnight</small>
                  </span>
                  <span className={styles.ledgerPrice}>
                    <span className="eu-sr-only">
                      Usually {FLASH_USUAL_PRICE}, {FLASH_PRICES.public.price} for everyone.
                    </span>
                    <s aria-hidden="true">{FLASH_USUAL_PRICE}</s>
                    <b aria-hidden="true">{FLASH_PRICES.public.price}</b>
                  </span>
                  <span className={styles.ledgerMaths}>
                    {FLASH_PRICES.public.perClass} a class, instead of {FLASH_USUAL_PER_CLASS}
                  </span>
                </li>
              </ul>
            </section>
          )}

          {!ended && (
            <section className={styles.block} aria-labelledby="flash-terms-title">
              <h2 id="flash-terms-title" className={styles.blockTitle}>
                The small print
              </h2>
              <ul className={styles.terms}>
                {FLASH_TERMS.map((term) => (
                  <li key={term}>{term}</li>
                ))}
                <li>
                  Our usual <Link href="/terms">terms and conditions</Link> apply.
                </li>
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Phones: the code and the checkout stay in reach once the door has scrolled away */}
      {open && offer && (
        <div className={`${styles.bar} ${barReady && !checkoutInView ? styles.barShow : ''}`} data-bookbar>
          <button type="button" className={styles.barCode} onClick={copy} aria-label={copied ? 'Code copied' : 'Copy code'}>
            <span>{copied ? 'Copied' : offer.code}</span>
            <CopyIcon />
          </button>
          <a
            href={offer.checkoutUrl}
            className={styles.barGo}
            target="_blank"
            rel="noopener noreferrer"
            {...flashTracking(tier)}
          >
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
