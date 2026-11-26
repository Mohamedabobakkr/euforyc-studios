'use client';

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import Link from 'next/link';

import PillLink from '@/components/euforyc/PillLink';
import {
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
import FlashCountdown from './FlashCountdown';
import type { FlashOffer } from './useFlashSale';
import styles from './flash.module.css';

/**
 * The open page: the same for password holders and for everyone after 18:00.
 * Only the code, the price and two lines of copy differ.
 *
 * One light object, the cream code card, on the ink ground. It is only ever
 * mounted with a code the server has handed over.
 */
export default function FlashOpen({
  offer,
  tier,
  phase,
  secondsLeft,
  arrive,
  focusCode,
  copied,
  onCopy,
  checkoutRef,
}: {
  offer: FlashOffer;
  tier: 'vip' | 'public';
  phase: FlashPhase | null;
  secondsLeft: number | null;
  /** Rise gently into place as the cover parts */
  arrive: boolean;
  /** The visitor's own password opened the page: focus goes to the code */
  focusCode: boolean;
  copied: boolean;
  onCopy: () => void;
  checkoutRef: RefObject<HTMLDivElement>;
}) {
  const price = FLASH_PRICES[tier];
  const code = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (focusCode) code.current?.focus({ preventScroll: true });
  }, [focusCode]);

  return (
    <div className={`${styles.page} ${arrive ? styles.pageArrive : ''}`}>
      <div className={styles.column}>
        <p className={styles.eyebrow}>
          {tier === 'vip' ? `${FLASH_VIP_PERCENT}% off · for the first ${FLASH_VIP_LIMIT}` : `${FLASH_PUBLIC_PERCENT}% off · until midnight`}
        </p>
        <h1 className={styles.title}>
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
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>

        <p className={styles.price}>
          <span className="eu-sr-only">
            Usually {FLASH_USUAL_PRICE}, tonight {price.price}.
          </span>
          <span className={styles.priceRow} aria-hidden="true">
            <s>{FLASH_USUAL_PRICE}</s>
            <b>{price.price}</b>
          </span>
          <span className={styles.priceMaths}>
            {price.perClass} a class, instead of {FLASH_USUAL_PER_CLASS}
          </span>
        </p>

        <div ref={checkoutRef} className={styles.checkout}>
          {/* Opens Momence as every other checkout button on the site does. The code is never in the link. */}
          <PillLink
            href={offer.checkoutUrl}
            variant="ghost"
            dot
            className="eu-btn--block"
            target="_blank"
            rel="noopener noreferrer"
            {...flashTracking(tier)}
          >
            Go to checkout
          </PillLink>
        </div>
        <p className={styles.note}>Paste the code in “Discount code” before you pay.</p>

        <section className={styles.block} aria-label={tier === 'vip' ? 'How long the 50% code has' : 'When the sale closes'}>
          <p className={styles.closing}>
            {tier === 'vip' ? `${FLASH_PUBLIC_PERCENT}% opens to everyone in` : 'Closes at midnight, in'}{' '}
            <FlashCountdown
              size="small"
              secondsLeft={secondsLeft}
              until={tier === 'vip' ? 'until the page opens for everyone' : 'until the sale closes'}
            />
          </p>
          {tier === 'vip' && (
            <p className={styles.honest}>
              Only {FLASH_VIP_LIMIT} of these codes exist, and Momence counts them. If checkout says the code has been
              used up, they are gone.
            </p>
          )}
        </section>

        <section className={styles.block} aria-labelledby="flash-steps">
          <h2 id="flash-steps" className={styles.blockLabel}>
            Three steps
          </h2>
          <ol className={styles.steps}>
            <li>Copy the code.</li>
            <li>Go to checkout. It opens Momence, where you pay.</li>
            <li>Paste the code in “Discount code” and apply it before you pay.</li>
          </ol>
        </section>

        <section className={styles.block} aria-labelledby="flash-day">
          <h2 id="flash-day" className={styles.blockLabel}>
            The day
          </h2>
          <ol className={styles.day}>
            {FLASH_STEPS.map((step) => (
              <li key={step.time} className={step.phase === phase ? styles.dayNow : undefined} aria-current={step.phase === phase ? 'step' : undefined}>
                <span className={styles.dayTime}>{step.time}</span>
                <span>
                  {step.title}
                  {step.detail ? `. ${step.detail}` : ''}
                </span>
              </li>
            ))}
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
