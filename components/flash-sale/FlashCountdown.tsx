'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { FLASH_ENDS_AT, FLASH_PUBLIC_AT, FLASH_VIP_AT } from './config';
import styles from './flash.module.css';

const PLACEHOLDER = '-';
/** The last ten minutes of a phase are drawn more intensely */
const URGENT_SECONDS = 10 * 60;

// Runs before the page is drawn and writes the real digits into the timer
// just above it, from the visitor's own clock, so nobody sees empty digits
// while the page starts up. The server's clock corrects them a moment later.
const FILL_BEFORE_PAINT = `(function(){var el=document.currentScript.previousElementSibling;if(!el)return;var n=Date.now(),t=[${FLASH_VIP_AT},${FLASH_PUBLIC_AT},${FLASH_ENDS_AT}],x=0;for(var i=0;i<3;i++){if(n<t[i]){x=t[i];break}}if(!x)return;var s=Math.max(0,Math.round((x-n)/1000)),v=[Math.min(99,Math.floor(s/3600)),Math.floor(s%3600/60),s%60],c=el.querySelectorAll('[data-d]');for(var j=0;j<c.length;j++){var k=+c[j].getAttribute('data-d'),p=v[k>>1];c[j].textContent=k%2?p%10:Math.floor(p/10)}})()`;

/**
 * One digit. When it changes, the old figure rolls out below and the new one
 * rolls in from above. Only `transform` moves, and the cell never changes
 * size, so nothing around it shifts.
 */
function Digit({ value, index }: { value: string; index: number }) {
  // The figure on show and the one it replaced
  const [faces, setFaces] = useState<{ current: string; previous: string | null }>({ current: value, previous: null });
  if (faces.current !== value) setFaces({ current: value, previous: faces.current });

  const rolling = faces.previous !== null && faces.previous !== PLACEHOLDER;

  return (
    <span className={styles.digit}>
      {rolling && (
        <span key={`out-${faces.current}`} className={`${styles.face} ${styles.faceOut}`}>
          {faces.previous}
        </span>
      )}
      <span
        key={`in-${faces.current}`}
        className={`${styles.face} ${rolling ? styles.faceIn : ''}`}
        data-d={index}
        suppressHydrationWarning
      >
        {faces.current}
      </span>
    </span>
  );
}

function Pair({ value, first, unit }: { value: number | null; first: number; unit: string }) {
  const text = value === null ? PLACEHOLDER + PLACEHOLDER : String(value).padStart(2, '0');
  return (
    <span className={styles.pair}>
      <span className={styles.pairDigits}>
        <Digit value={text.charAt(0)} index={first} />
        <Digit value={text.charAt(1)} index={first + 1} />
      </span>
      <span className={styles.pairUnit}>{unit}</span>
    </span>
  );
}

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

// "5 hours 12 minutes", "9 minutes", "30 seconds"
function inWords(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return minutes > 0 ? `${plural(hours, 'hour')} ${plural(minutes, 'minute')}` : plural(hours, 'hour');
  if (minutes > 0) return plural(minutes, 'minute');
  return plural(seconds, 'second');
}

// How often a screen reader is told the time: every half hour, then every
// five minutes, every minute in the last ten, and at 30 and 10 seconds
function worthSaying(seconds: number): boolean {
  if (seconds > 3600) return seconds % 1800 === 0;
  if (seconds > URGENT_SECONDS) return seconds % 300 === 0;
  if (seconds > 60) return seconds % 60 === 0;
  return seconds === 60 || seconds === 30 || seconds === 10;
}

/**
 * The large countdown to the next moment of the day: 12:00, then 18:00, then
 * midnight. `secondsLeft` is already corrected by the server's clock.
 */
export default function FlashCountdown({
  secondsLeft,
  label,
  until,
  turning,
}: {
  secondsLeft: number | null;
  /** Shown above the digits: "Opens for everyone in" */
  label: string;
  /** For screen readers: "until the door opens for everyone" */
  until: string;
  /** At zero, while the next phase is being fetched */
  turning: boolean;
}) {
  const hours = secondsLeft === null ? null : Math.min(99, Math.floor(secondsLeft / 3600));
  const minutes = secondsLeft === null ? null : Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft === null ? null : secondsLeft % 60;
  const urgent = secondsLeft !== null && secondsLeft <= URGENT_SECONDS;

  // The polite, throttled sentence for screen readers
  const [spoken, setSpoken] = useState('');
  const hasSpoken = useRef(false);
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;
    if (hasSpoken.current && !worthSaying(secondsLeft)) return;
    hasSpoken.current = true;
    setSpoken(`${inWords(secondsLeft)} ${until}.`);
  }, [secondsLeft, until]);

  return (
    <div
      className={`${styles.count} ${styles.settle} ${urgent ? styles.countUrgent : ''}`}
      style={{ '--settle': 2 } as CSSProperties}
      data-flash-settle
    >
      <p className={styles.countLabel}>
        {turning ? 'Opening now' : label}
        {urgent && !turning && <span className={styles.countFinal}>Final minutes</span>}
      </p>
      <div className={styles.countRow} role="timer" aria-label={`Time ${until}`}>
        <span className={styles.countDigits} aria-hidden="true">
          <Pair value={hours} first={0} unit="Hrs" />
          <span className={styles.colon}>:</span>
          <Pair value={minutes} first={2} unit="Min" />
          <span className={styles.colon}>:</span>
          <Pair value={seconds} first={4} unit="Sec" />
        </span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: FILL_BEFORE_PAINT }} />
      <p className="eu-sr-only" aria-live="polite">
        {spoken}
      </p>
    </div>
  );
}
