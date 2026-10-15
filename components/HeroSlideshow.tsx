'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './home/home.module.css';

// The shopfront photo is landscape: on a portrait phone only its middle shows,
// so phones ask for a larger file (less on 4x screens, which would get 3840w)
const LANDSCAPE_SIZES = '(max-width: 600px) and (min-resolution: 3.5dppx) 500px, (max-width: 600px) 640px, 100vw';
const LANDSCAPE = new Set(['/hero/IMG_4879.JPG']);

const heroImages = [
  '/hero/IMG_4879.JPG',
  '/hero/IMG_5111.jpg',
  '/hero/IMG_8682.JPG',
  '/hero/IMG_8686.JPG',
  '/hero/IMG_8687.JPG',
  '/hero/IMG_8688.JPG',
  '/hero/IMG_8690.JPG',
  '/hero/IMG_8698.JPG',
];

const SLIDE_MS = 6000;

interface HeroSlideshowProps {
  /** Headline, copy and buttons, rendered on the server */
  children: ReactNode;
  /** Left of the bottom row: the next class */
  nextClass?: ReactNode;
  /** Right of the bottom row: the review score */
  rating?: ReactNode;
}

/**
 * Full-bleed hero with a crossfading slideshow. A timer moves it on and
 * remembers how much of the slide was left when paused (the button, the tab
 * being hidden or the hero scrolling off-screen), so the progress bars stay
 * in step. With reduced motion it starts paused. Slides load one ahead of
 * time rather than all at once.
 */
export default function HeroSlideshow({ children, nextClass, rating }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  // Highest slide index allowed to load so far
  const [loadedUpTo, setLoadedUpTo] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Time left on the current slide, and when the timer last (re)started
  const remainingRef = useRef(SLIDE_MS);
  const startedRef = useRef(0);

  const paused = userPaused || offscreen || tabHidden;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setUserPaused(true);
  }, []);

  // A new slide gets the full time
  useEffect(() => {
    remainingRef.current = SLIDE_MS;
  }, [index]);

  useEffect(() => {
    if (paused) return;
    startedRef.current = Date.now();
    const timer = setTimeout(() => {
      setHasAdvanced(true);
      setIndex((current) => (current + 1) % heroImages.length);
    }, remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedRef.current));
    };
  }, [paused, index]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    observer.observe(section);
    const onVisibility = () => setTabHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Let the next slide start loading a couple of seconds into this one
  useEffect(() => {
    const next = Math.min(index + 1, heroImages.length - 1);
    if (next <= loadedUpTo) return;
    const timer = setTimeout(() => setLoadedUpTo(next), 2000);
    return () => clearTimeout(timer);
  }, [index, loadedUpTo]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} ${paused ? styles.heroPaused : ''}`}
      aria-label="Euforyc Studios"
      style={{ ['--slide-ms' as string]: `${SLIDE_MS}ms` }}
    >
      {heroImages.map((src, i) =>
        i <= loadedUpTo ? (
          <div
            key={src}
            className={`${styles.slide} ${i === index ? styles.slideActive : ''} ${hasAdvanced ? styles.slideZoom : ''}`}
            aria-hidden="true"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes={LANDSCAPE.has(src) ? LANDSCAPE_SIZES : '100vw'}
              priority={i === 0}
              loading={i === 0 ? undefined : 'eager'}
            />
          </div>
        ) : null
      )}
      <div className={styles.shade} />
      <div className={styles.heroContent}>{children}</div>

      <div className={`${styles.heroFoot} eu-fade-in`} style={{ animationDelay: '1.7s' }}>
        {nextClass ?? <span />}
        <div className={styles.controls}>
          <div className={styles.bars} aria-hidden="true">
            {heroImages.map((src, i) => (
              <span key={src} className={`${styles.bar} ${i === index ? styles.barActive : ''}`}>
                <i className={styles.barFill} />
              </span>
            ))}
          </div>
          <button
            type="button"
            className={styles.pause}
            onClick={() => setUserPaused((value) => !value)}
            aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {userPaused ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            )}
          </button>
        </div>
        {rating ?? <span />}
      </div>
    </section>
  );
}
