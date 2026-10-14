import type { Metadata } from 'next';
import MomenceReviews from '@/components/MomenceReviews';
import HeroSlideshow from '@/components/HeroSlideshow';
import PauseOffscreen from '@/components/euforyc/PauseOffscreen';
import PillLink from '@/components/euforyc/PillLink';
import ClassFinder from '@/components/home/ClassFinder';
import NextClassCard from '@/components/home/NextClassCard';
import ReviewDeck from '@/components/home/ReviewDeck';
import TodayStrip from '@/components/home/TodayStrip';
import {
  BookingBar,
  ClassesSection,
  Euforia,
  FirstVisit,
  Mantra,
  Philosophy,
  ThisMonth,
  TRY_IT_ALL_URL,
  UnderOneRoof,
  VisitTicket,
  classPanel,
  tryItAllTracking,
} from '@/components/home/HomeSections';
import {
  deckReviews,
  groupClasses,
  reviewPhrases,
  reviewScore,
  specialSessions,
  toSlimEvent,
  within,
} from '@/components/home/data';
import styles from '@/components/home/home.module.css';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { PRICING, pageMetadata } from '@/lib/site';
import { getReviews, getUpcomingEvents } from '@/lib/studio-data';

// The timetable parts of the page refresh every 5 minutes, like /schedule
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: 'Euforyc Studios | Women-Only Pilates Studio in Edgware, North West London',
  description: 'Women-only boutique Pilates studio in Edgware, North West London. Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Barre, Belly Dance and 1:1 private Reformer and Cadillac Reformer sessions. First-time clients: 3 classes for £60.',
  path: '/',
  absoluteTitle: true,
});

const HEADLINE = ['EUFORYC', 'STUDIOS'];

export default async function Home() {
  const [events, { reviews }] = await Promise.all([getUpcomingEvents(), getReviews()]);
  const renderedAt = Date.now();

  const classes = groupClasses(events);
  const soon = classes.slice(0, 12).map(toSlimEvent);
  const thisWeek = within(classes, renderedAt, 7).map(toSlimEvent);
  const specials = specialSessions(events);

  const score = reviewScore(reviews);
  const deck = deckReviews(reviews);
  const phrases = reviewPhrases(reviews);
  const intro = PRICING.introOffer;
  const introShort = `${intro.classes} classes £${intro.price}`;

  let letter = 0;
  const headline = HEADLINE.map((word, w) => (
    <span key={word} className={styles.word}>
      {word.split('').map((char) => {
        const delay = (0.25 + letter++ * 0.05).toFixed(2);
        return (
          <span key={`${w}-${char}-${delay}`} className={styles.ch} style={{ animationDelay: `${delay}s` }} aria-hidden="true">
            {char}
          </span>
        );
      })}
    </span>
  ));

  return (
    <div>
      {/* 1 · Hero */}
      <HeroSlideshow
        nextClass={soon.length > 0 ? <NextClassCard events={soon} renderedAt={renderedAt} /> : undefined}
        rating={
          score ? (
            <div className={styles.rate}>
              <strong>{score.average}</strong>
              <span className={styles.stars} aria-hidden="true">
                ★★★★★
              </span>
              <br />
              {score.count} client reviews
            </div>
          ) : undefined
        }
      >
        <div className={`eu-cap eu-fade-in ${styles.kicker}`} style={{ animationDelay: '.1s' }}>
          Women only · North West London
        </div>
        <h1 className={styles.h1} aria-label="Euforyc Studios">
          {headline.flatMap((word, i) => (i === 0 ? [word] : [' ', word]))}
        </h1>
        <div className={`eu-fade-in ${styles.heroTag}`} style={{ animationDelay: '1.1s' }}>
          Pilates • Wellness • Strength
        </div>
        <p className={`eu-fade-in ${styles.heroLede}`} style={{ animationDelay: '1.25s' }}>
          A space to move, glow, gather and breathe — all under one roof.
        </p>
        <div className={`eu-fade-in ${styles.heroCtas} eu-on-dark`} style={{ animationDelay: '1.4s' }}>
          <PillLink href="/schedule" variant="cream" dot stretchMobile>
            Book a class
          </PillLink>
          <PillLink href="/offers" variant="ghost" stretchMobile>
            New here? {introShort}
          </PillLink>
        </div>
      </HeroSlideshow>

      {/* 2 · Today at Euforyc (hidden when the timetable is empty or unavailable) */}
      {soon.length > 0 && <TodayStrip events={soon} renderedAt={renderedAt} />}

      {/* 3 · everything is euforyc */}
      <Philosophy />

      {/* 4 · Under one roof */}
      <UnderOneRoof />

      {/* 5 · Our classes */}
      <ClassesSection />

      {/* 6 · Find your class */}
      <section className={`${styles.quiz} eu-on-dark`} id="find" aria-labelledby="find-title">
        <div className="eu-wrap">
          <div className={`${styles.secHead} eu-rv`}>
            <div className={styles.secHeadL}>
              <span className="eu-cap eu-cap-num" style={{ color: '#F5F0E8' }}>
                Three taps
              </span>
              <h2 id="find-title" className="eu-h2">
                Find your <em>class</em>
              </h2>
            </div>
            <p className={`${styles.secHeadR} eu-lede`}>
              Not sure where to start? Tell us what you’re after and we’ll point you to your first class — and real
              times from this week’s timetable.
            </p>
          </div>
          <ClassFinder
            classes={ORDERED_CLASS_TYPES.map(classPanel)}
            events={thisWeek}
            renderedAt={renderedAt}
            tryItAll={{ href: TRY_IT_ALL_URL, label: `Start with ${introShort.replace(' classes', ' for')}`, tracking: tryItAllTracking('/find-your-class') }}
          />
        </div>
      </section>

      {/* 7 · What our community says */}
      <section className={styles.rvSec} id="reviews" aria-labelledby="reviews-title">
        {deck.length > 0 && score ? (
          <ReviewDeck
            reviews={deck}
            intro={
              <>
                <span className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
                  Our community
                </span>
                <h2 id="reviews-title" className="eu-h2">
                  What our <em>community</em> says
                </h2>
                <p className={`eu-tagline ${styles.tagline}`}>Real reviews from our clients</p>
                <div className={styles.score}>
                  <span className={styles.scoreBig}>{score.average}</span>
                  <span className={styles.scoreMeta}>
                    <span className="eu-stars" role="img" aria-label={`Average rating ${score.average} out of 5`}>
                      ★★★★★
                    </span>
                    <br />
                    {score.count} written reviews on Momence
                    {score.allFiveStars ? ' — every single one five stars.' : '.'}
                  </span>
                </div>
              </>
            }
          />
        ) : (
          <div className="eu-wrap">
            <span className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
              Our community
            </span>
            <h2 id="reviews-title" className="eu-h2" style={{ marginTop: 22 }}>
              What our <em>community</em> says
            </h2>
            <p className="eu-tagline" style={{ marginTop: 22 }}>
              Real reviews from our clients
            </p>
            <div className={styles.rvFallback}>
              <MomenceReviews />
            </div>
          </div>
        )}

        {phrases.length > 0 && (
          <div className={styles.frag} aria-hidden="true">
            <PauseOffscreen className={`${styles.fragRow} eu-marquee`}>
              {[...phrases, ...phrases].map((phrase, i) => (
                <span key={`${phrase}-${i}`} className={styles.fragItem}>
                  {phrase}
                </span>
              ))}
            </PauseOffscreen>
          </div>
        )}

        <div className={`eu-wrap eu-cap ${styles.rvNote}`}>
          <span>Reviews written by clients through Momence after class</span>
          <PillLink href="/reviews" variant="line">
            Read all reviews
          </PillLink>
        </div>
      </section>

      {/* 8 · This month at Euforyc */}
      <ThisMonth specials={specials} />

      {/* 9 · Euforia */}
      <Euforia />

      {/* 10 · Your first visit */}
      <FirstVisit />

      {/* 11 · Your pass to euforyc */}
      <VisitTicket />

      {/* 12 · Mantra */}
      <Mantra />

      {/* 13 · Sticky booking bar */}
      <BookingBar />
    </div>
  );
}
