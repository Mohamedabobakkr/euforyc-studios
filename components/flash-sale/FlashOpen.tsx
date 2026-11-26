'use client';

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import Link from 'next/link';

import PillLink from '@/components/euforyc/PillLink';
import {
  FLASH_PACK,
  FLASH_PRICES,
  FLASH_PUBLIC_PERCENT,
  FLASH_STEPS,
  FLASH_TERMS,
  FLASH_USUAL_PER_CLASS,
  FLASH_USUAL_PRICE,
  FLASH_VIP_LIMIT,
  FLASH_VIP_PERCENT,
  flashTracking,
  type FlashPhase,
} from './config';
import FlashCountdown, { FINAL_SECONDS } from './FlashCountdown';
import type { FlashOffer } from './useFlashSale';
import styles from './flash.module.css';

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/**
 * The open page: the same for password holders and for everyone after 18:00.
 * Only the code, the price and a few lines of copy differ.
 *
 * In order: the code (the one bright object), the pack it buys with the
 * price and the way to checkout, the countdown, three steps, the day, and
 * the small print. It is only ever mounted with a code the server has handed
 * over.
 *
 * Type: Playfair Display for the headline, the pack's title, the price, the
 * times and the countdown, and for one italic accent in a sentence where a
 * word matters. Inter for everything else, the code included.
 */
export default function FlashOpen({
  offer,
  tier,
  phase,
  secondsLeft,
  now,
  focusCode,
  copied,
  onCopy,
  onCheckout,
  confirmation,
  nudge,
  offline,
  checkoutRef,
}: {
  offer: FlashOffer;
  tier: 'vip' | 'public';
  phase: FlashPhase | null;
  secondsLeft: number | null;
  /** The server's clock, in milliseconds. Drives the line under the current row of the day. */
  now: number | null;
  /** The visitor's own password opened the page: focus goes to the code */
  focusCode: boolean;
  copied: boolean;
  onCopy: () => void;
  /** Runs inside the tap on "Go to checkout": copies the code before Momence opens */
  onCheckout: () => void;
  /** "BF50 copied. Paste it in Discount code.", for a few seconds after that tap */
  confirmation: string | null;
  /** The code has just been copied: the checkout button draws the eye, once */
  nudge: boolean;
  /** The server has stopped answering; the page is on the last state it knew */
  offline: boolean;
  checkoutRef: RefObject<HTMLDivElement>;
}) {
  const price = FLASH_PRICES[tier];
  const code = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (focusCode) code.current?.focus({ preventScroll: true });
  }, [focusCode]);

  const final = secondsLeft !== null && secondsLeft <= FINAL_SECONDS;
  const currentStep = FLASH_STEPS.findIndex((step) => step.phase === phase);

  return (
    <div className={`${styles.page} ${styles.pageArrive}`}>
      <div className={styles.column}>
        {/* The lines whose words differ between the two versions are keyed by
            tier: at 18:00 they are replaced whole, in place, rather than having
            their words rearranged inside them, which browsers count as movement. */}
        <p key={`eyebrow-${tier}`} className={styles.eyebrow}>
          <em className={styles.accent}>{tier === 'vip' ? FLASH_VIP_PERCENT : FLASH_PUBLIC_PERCENT}% off</em> ·{' '}
          {tier === 'vip' ? `for the first ${FLASH_VIP_LIMIT}` : 'until midnight'}
        </p>
        <h1 key={`title-${tier}`} className={styles.title}>
          {tier === 'vip' ? (
            <>
              You’re <em>in.</em>
            </>
          ) : (
            <>
              It’s <em>open.</em>
            </>
          )}
        </h1>

        {/* The code card. A tap anywhere on it copies; the button inside is the
            control for keyboards and screen readers, and does the same. */}
        <div className={styles.card} onClick={onCopy}>
          <p className={styles.cardLabel}>Your code</p>
          <p ref={code} className={styles.code} style={{ '--n': Math.max(6, offer.code.length) } as CSSProperties} tabIndex={-1}>
            <span className="eu-sr-only">Your code: </span>
            {offer.code}
          </p>
          <button
            type="button"
            className={styles.copy}
            onClick={(event) => {
              event.stopPropagation();
              onCopy();
            }}
          >
            {copied ? (
              <>
                <Tick />
                Copied
              </>
            ) : (
              'Copy code'
            )}
          </button>
        </div>

        {/* What the code buys, before anyone is asked to check out */}
        <section className={styles.pack} aria-labelledby="flash-pack">
          <p className={styles.packLabel}>{FLASH_PACK.label}</p>
          <h2 id="flash-pack" className={styles.packTitle}>
            {FLASH_PACK.title}
          </h2>
          <ul className={styles.packLines}>
            {FLASH_PACK.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <div className={styles.price}>
            <p key={`price-${tier}`} className={styles.priceRow}>
              <span className="eu-sr-only">
                Usually {FLASH_USUAL_PRICE}, {price.price} with your code.
              </span>
              <s aria-hidden="true">{FLASH_USUAL_PRICE}</s>
              <b aria-hidden="true">{price.price}</b>
            </p>
            <p key={`maths-${tier}`} className={styles.priceMaths}>
              with your code
              <br />
              {price.perClass} a class, instead of {FLASH_USUAL_PER_CLASS}
            </p>
          </div>

          <div ref={checkoutRef} className={`${styles.checkout} ${nudge ? styles.checkoutNudge : ''}`}>
            {/* Opens Momence as every other checkout button on the site does,
                and copies the code in the same tap. The code is never in the link. */}
            <PillLink
              href={offer.checkoutUrl}
              variant="cream"
              dot
              className="eu-btn--block"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCheckout}
              {...flashTracking(tier)}
            >
              Go to checkout
            </PillLink>
          </div>
          <p className={styles.packNote} aria-live="polite">
            {confirmation ?? 'Your code is copied for you. Paste it in “Discount code” before you pay.'}
          </p>
        </section>

        {/* The countdown, as a moment of its own */}
        <section className={styles.clock} aria-label={tier === 'vip' ? 'Time until the page opens for everyone' : 'Time until the sale ends'}>
          <p key={`label-${tier}`} className={styles.clockLabel}>
            {tier === 'vip' ? 'Opens to everyone in' : 'Ends in'}
            {final && <em className={styles.accent}>final minutes</em>}
          </p>
          <FlashCountdown
            face="serif"
            units="long"
            secondsLeft={secondsLeft}
            until={tier === 'vip' ? 'until the page opens for everyone' : 'until the sale ends'}
          />
          {/* One honest line under it, the same size in both versions, so nothing
              below moves when 18:00 turns one into the other */}
          {tier === 'vip' ? (
            <p key="honest-vip" className={styles.honest}>
              Only <em className={styles.accent}>{FLASH_VIP_LIMIT}</em> of these codes exist, and Momence counts them. If
              checkout says the code has been used up, they are gone.
            </p>
          ) : (
            <p key="honest-public" className={styles.honest}>
              Open to everyone until <em className={styles.accent}>midnight</em>. After that the code stops working.
            </p>
          )}
          {offline && (
            <p className={styles.quietLine} aria-live="polite">
              We can’t reach the studio just now. Still trying.
            </p>
          )}
        </section>

        <section className={styles.block} aria-labelledby="flash-steps">
          <h2 id="flash-steps" className={styles.blockLabel}>
            Three steps
          </h2>
          <ol className={styles.steps}>
            <li>Tap “Go to checkout”. It copies your code and opens Momence.</li>
            <li>Paste the code in “Discount code” and apply it.</li>
            <li>Pay, then book your classes on the timetable.</li>
          </ol>
        </section>

        {/* The day: done, now, still to come. The line under the current row
            fills across the length of its phase, by the server's clock. */}
        <section className={styles.block} aria-labelledby="flash-day">
          <h2 id="flash-day" className={styles.blockLabel}>
            The day
          </h2>
          <ol className={styles.day}>
            {FLASH_STEPS.map((step, index) => {
              const status = index < currentStep ? 'done' : index === currentStep ? 'now' : 'later';
              const span = step.endsAt === null ? 0 : step.endsAt - step.startsAt;
              const filled =
                status === 'done' ? 1 : status === 'now' && now !== null && span > 0 ? Math.min(1, Math.max(0, (now - step.startsAt) / span)) : 0;

              return (
                <li key={step.time} className={`${styles.dayRow} ${styles[`day_${status}`]}`} aria-current={status === 'now' ? 'step' : undefined}>
                  <span className={styles.dayTime}>{step.time}</span>
                  <span className={styles.dayText}>
                    <span>{step.title}</span>
                    <span className={styles.dayDetail}>{step.detail}</span>
                  </span>
                  <span className={styles.dayTag}>{status === 'now' ? 'Now' : status === 'done' ? 'Done' : ''}</span>
                  {step.endsAt !== null && (
                    <span className={styles.dayTrack} aria-hidden="true">
                      <span className={styles.dayFill} style={{ transform: `scaleX(${filled.toFixed(4)})` }} />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.block} aria-labelledby="flash-terms">
          <h2 id="flash-terms" className={styles.blockLabel}>
            Small print
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
      </div>
    </div>
  );
}
