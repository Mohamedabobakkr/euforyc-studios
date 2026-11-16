'use client';

import Link from 'next/link';

import Arrow from '@/components/euforyc/Arrow';
import { BF_END_DATE, BF_HAS_PLACEHOLDERS, BF_LINE, BF_PATH, HIDE_IF_ENDED } from './offer';
import { useOfferEnded } from './useOfferEnded';
import styles from './banner.module.css';

// "Sunday" and "29 November", from the offer's end date
const [END_WEEKDAY, ...END_REST] = BF_END_DATE.replace(/\s\d{4}$/, '').split(' ');
const END_DAY = END_REST.join(' ');

/**
 * The slim Black Friday strip that links to /black-friday.
 *
 * It uses the same clock check as the page itself, so it disappears at the
 * offer's end time on its own, with no redeploy. `afterHero` is the homepage
 * placement: directly below the full-screen hero rather than under the header.
 */
export default function BlackFridayBanner({ afterHero = false }: { afterHero?: boolean }) {
  // The pages this sits on are built ahead of time, so their HTML always
  // starts with the banner; the visitor's clock then decides
  const ended = useOfferEnded(false);
  if (ended || BF_HAS_PLACEHOLDERS) return null;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HIDE_IF_ENDED }} />
      <div className={`eu-wrap ${styles.wrap} ${afterHero ? styles.afterHero : ''}`}>
        <Link href={BF_PATH} className={`${styles.strip} eu-on-dark`} data-bf-banner>
          <span className={styles.text}>
            <span className={styles.name}>
              More, <em>on us.</em>
            </span>
            <span className={styles.meta}>
              <span className={styles.label}>Black Friday</span>
              <span className={styles.line}>{BF_LINE}</span>
              <span className={styles.until}>
                Ends <span className={styles.weekday}>{END_WEEKDAY} </span>
                {END_DAY}
              </span>
            </span>
          </span>
          <span className={styles.go}>
            <span className={styles.goText}>See the offer</span>
            <span className={styles.dot} aria-hidden="true">
              <Arrow />
            </span>
          </span>
        </Link>
      </div>
    </>
  );
}
