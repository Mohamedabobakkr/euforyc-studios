'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './home/home.module.css';

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
 * Full-bleed hero with a crossfading slideshow. Each slide's progress bar
 * drives the timing, so pausing (the button, the tab being hidden or the
 * hero scrolling off-screen) freezes the picture and the bar together.
 * Slides load one ahead of time rather than all at once.
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

  const paused = userPaused || offscreen || tabHidden;

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

  const advance = () => {
    setHasAdvanced(true);
    setIndex((current) => (current + 1) % heroImages.length);
  };

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
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : 'eager'}
              quality={70}
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
                <i
                  className={styles.barFill}
                  onAnimationEnd={i === index ? advance : undefined}
                />
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
