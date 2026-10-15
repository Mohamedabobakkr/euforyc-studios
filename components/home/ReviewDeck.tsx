'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Arrow from '@/components/euforyc/Arrow';
import styles from './reviews.module.css';
import type { DeckReview } from './types';

const ADVANCE_MS = 6500;

// Resting positions of the top four cards in the stack
const POSES = [
  { transform: 'translate(0px, 0px) rotate(-1deg) scale(1)', zIndex: 10, opacity: 1 },
  { transform: 'translate(26px, 24px) rotate(4deg) scale(.95)', zIndex: 9, opacity: 1 },
  { transform: 'translate(-22px, 44px) rotate(-5deg) scale(.9)', zIndex: 8, opacity: 1 },
  { transform: 'translate(14px, 62px) rotate(2.5deg) scale(.86)', zIndex: 7, opacity: 0.9 },
];
const THROWN = { transform: 'translate(-130%, -40px) rotate(-16deg) scale(.95)', zIndex: 11, opacity: 0 };
const BURIED = { transform: 'translate(14px, 62px) rotate(2.5deg) scale(.84)', zIndex: 1, opacity: 0 };

/**
 * The stacked review cards. Every review is in the server HTML; this only
 * moves the stack. Auto-advance can be paused, stops while hovered or
 * focused, off-screen or in a hidden tab, and never runs with reduced motion.
 */
export default function ReviewDeck({ reviews, intro }: { reviews: DeckReview[]; intro: ReactNode }) {
  const [top, setTop] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [holding, setHolding] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const count = reviews.length;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const onMotion = () => setReducedMotion(media.matches);
    media.addEventListener('change', onMotion);

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (deckRef.current) observer.observe(deckRef.current);
    const onVisibility = () => setTabHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      media.removeEventListener('change', onMotion);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const autoPlaying = playing && !reducedMotion && count > 1;

  useEffect(() => {
    if (!autoPlaying || holding || !visible || tabHidden) return;
    const timer = setTimeout(() => setTop((current) => (current + 1) % count), ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [autoPlaying, holding, visible, tabHidden, top, count]);

  const go = (step: number) => {
    setPlaying(false);
    setTop((current) => (current + step + count) % count);
  };

  return (
    <div className={`eu-wrap ${styles.rvGrid}`}>
      <div className={`${styles.rvL} eu-rv`}>
        {intro}
        {count > 1 && (
          <div className={styles.deckCtrl}>
            <button type="button" className={styles.rbtn} aria-label="Previous review" onClick={() => go(-1)}>
              <Arrow size={18} direction="left" />
            </button>
            <button type="button" className={styles.rbtn} aria-label="Next review" onClick={() => go(1)}>
              <Arrow size={18} />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                className={styles.rbtn}
                aria-label={playing ? 'Pause reviews' : 'Play reviews'}
                onClick={() => setPlaying((value) => !value)}
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                )}
              </button>
            )}
            <span className={styles.dCount} aria-hidden="true">
              {String(top + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span>
            </span>
          </div>
        )}
      </div>

      <div className={styles.rvR}>
        <div
          ref={deckRef}
          className={styles.deck}
          aria-live={autoPlaying ? 'off' : 'polite'}
          onMouseEnter={() => setHolding(true)}
          onMouseLeave={() => setHolding(false)}
          onPointerDown={(event) => {
            pointerStart.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (pointerStart.current === null || count < 2) return;
            const dx = event.clientX - pointerStart.current;
            pointerStart.current = null;
            if (dx > 40) go(-1);
            else go(1);
          }}
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
        >
          {reviews.map((review, i) => {
            const depth = (i - top + count) % count;
            const pose = depth < POSES.length ? POSES[depth] : depth === count - 1 ? THROWN : BURIED;
            return (
              <figure
                key={review.id}
                className={`${styles.card} ${styles[`c${i % 4}`]}`}
                style={pose}
                aria-hidden={depth !== 0}
              >
                <div>
                  <div className={styles.qMark} aria-hidden="true">
                    “
                  </div>
                  <blockquote className={styles.q}>{review.comment}</blockquote>
                </div>
                <figcaption className={styles.qWho}>
                  <span>
                    <span className={styles.qName}>{review.name}</span>
                    <span className={styles.qCtx}>{review.context}</span>
                  </span>
                  <span className="eu-stars" role="img" aria-label={`Rated ${review.grade} out of 5`} style={{ fontSize: 13 }}>
                    {'★'.repeat(review.grade)}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
