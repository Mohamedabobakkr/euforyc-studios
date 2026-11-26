'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './flash.module.css';

const PLACEHOLDER = '-';
/** The last ten minutes before a change */
const FINAL_SECONDS = 10 * 60;

/**
 * One digit. When it changes, the old figure rolls out below and the new one
 * rolls in from above. Only `transform` moves, and the cell never changes
 * size, so nothing around it shifts.
 */
function Digit({ value }: { value: string }) {
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
      <span key={`in-${faces.current}`} className={`${styles.face} ${rolling ? styles.faceIn : ''}`}>
        {faces.current}
      </span>
    </span>
  );
}

function Pair({ value, unit }: { value: number | null; unit: string }) {
  const text = value === null ? PLACEHOLDER + PLACEHOLDER : String(value).padStart(2, '0');
  return (
    <span className={styles.pair}>
      <span className={styles.pairDigits}>
        <Digit value={text.charAt(0)} />
        <Digit value={text.charAt(1)} />
      </span>
      <span className={styles.pairUnit}>{unit}</span>
    </span>
  );
}

const two = (value: number) => String(value).padStart(2, '0');
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
  if (seconds > FINAL_SECONDS) return seconds % 300 === 0;
  if (seconds > 60) return seconds % 60 === 0;
  return seconds === 60 || seconds === 30 || seconds === 10;
}

/**
 * The countdown to the next moment of the day: 12:00, then 18:00, then
 * midnight. `secondsLeft` is already corrected by the server's clock.
 *
 * "large" is the one on the cover, with rolling digits. "small" is a line of
 * figures inside a sentence. Both use tabular figures in fixed cells, so the
 * time never changes width.
 */
export default function FlashCountdown({
  secondsLeft,
  until,
  size = 'large',
}: {
  secondsLeft: number | null;
  /** For screen readers: "until the page opens for everyone" */
  until: string;
  size?: 'large' | 'small';
}) {
  const hours = secondsLeft === null ? null : Math.min(99, Math.floor(secondsLeft / 3600));
  const minutes = secondsLeft === null ? null : Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft === null ? null : secondsLeft % 60;
  const final = secondsLeft !== null && secondsLeft <= FINAL_SECONDS;

  // The polite, throttled sentence for screen readers (the large one only:
  // a page never needs two voices counting)
  const [spoken, setSpoken] = useState('');
  const hasSpoken = useRef(false);
  useEffect(() => {
    if (size !== 'large' || secondsLeft === null || secondsLeft <= 0) return;
    if (hasSpoken.current && !worthSaying(secondsLeft)) return;
    hasSpoken.current = true;
    setSpoken(`${inWords(secondsLeft)} ${until}.`);
  }, [secondsLeft, until, size]);

  if (size === 'small') {
    return (
      <span className={styles.countSmall} role="timer" aria-label={`Time ${until}`}>
        {hours === null || minutes === null || seconds === null ? '--:--:--' : `${two(hours)}:${two(minutes)}:${two(seconds)}`}
      </span>
    );
  }

  return (
    <div className={`${styles.count} ${final ? styles.countFinal : ''}`}>
      <div role="timer" aria-label={`Time ${until}`}>
        <span className={styles.countDigits} aria-hidden="true">
          <Pair value={hours} unit="hrs" />
          <span className={styles.colon}>:</span>
          <Pair value={minutes} unit="min" />
          <span className={styles.colon}>:</span>
          <Pair value={seconds} unit="sec" />
        </span>
      </div>
      <p className="eu-sr-only" aria-live="polite">
        {spoken}
      </p>
    </div>
  );
}
