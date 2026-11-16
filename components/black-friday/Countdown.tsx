'use client';

import { useSyncExternalStore } from 'react';
import { BF_END_DATE, BF_ENDS_AT } from './offer';
import styles from './countdown.module.css';

// Looks at the clock every second, and whenever the tab comes back to the front
function subscribeEverySecond(onChange: () => void) {
  const tick = setInterval(onChange, 1000);
  document.addEventListener('visibilitychange', onChange);
  return () => {
    clearInterval(tick);
    document.removeEventListener('visibilitychange', onChange);
  };
}

const secondsLeftNow = () => Math.max(0, Math.floor((BF_ENDS_AT - Date.now()) / 1000));
// The page's HTML is built ahead of time, so it cannot know the seconds left
const unknownOnServer = () => null;

// Runs before the page is drawn and writes the real numbers into the timer
// just above it, so nobody sees empty digits while the page starts up
const FILL_BEFORE_PAINT = `(function(){var el=document.currentScript.previousElementSibling;if(!el)return;var s=Math.max(0,Math.floor((${BF_ENDS_AT}-Date.now())/1000)),v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60],n=el.querySelectorAll('[data-n]');for(var i=0;i<n.length;i++){var k=+n[i].getAttribute('data-n');n[i].textContent=(v[k]<10?'0':'')+v[k]}})()`;

const UNITS = [
  { long: 'Days', short: 'd' },
  { long: 'Hrs', short: 'h' },
  { long: 'Min', short: 'm' },
  { long: 'Sec', short: 's' },
];

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * A live countdown to the offer's real end time (BF_ENDS_AT), by the visitor's
 * own clock. "boxes" is the large days / hrs / min / sec timer; "inline" is
 * the compact "13d 04h 12m 30s" used inside a sentence.
 */
export default function Countdown({
  variant,
  seconds = true,
}: {
  variant: 'boxes' | 'inline';
  /** false leaves the seconds out, for the quieter timers on the cards */
  seconds?: boolean;
}) {
  const left = useSyncExternalStore(subscribeEverySecond, secondsLeftNow, unknownOnServer);
  const parts =
    left === null
      ? null
      : [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60), left % 60];

  return (
    <>
      <span
        className={variant === 'boxes' ? styles.boxes : styles.inline}
        role="timer"
        aria-label={`The offer ends on ${BF_END_DATE}`}
      >
        {UNITS.map((unit, index) =>
          index === 3 && !seconds ? null : (
            <span key={unit.long} className={styles.unit} aria-hidden="true">
              <span className={styles.n} data-n={index} suppressHydrationWarning>
                {parts ? pad(parts[index]) : '--'}
              </span>
              <span className={styles.u}>{variant === 'boxes' ? unit.long : unit.short}</span>
            </span>
          )
        )}
      </span>
      <script dangerouslySetInnerHTML={{ __html: FILL_BEFORE_PAINT }} />
    </>
  );
}
