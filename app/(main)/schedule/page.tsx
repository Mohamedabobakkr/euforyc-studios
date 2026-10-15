/**
 * Class Schedule Page
 * Live timetable with real-time availability - Euforyc Studios
 */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import PillLink from '@/components/euforyc/PillLink';
import ScheduleView from '@/components/momence/ScheduleView';
import styles from '@/components/momence/schedule.module.css';
import { POLICIES, PRICING, STUDIO, pageMetadata } from '@/lib/site';
import { getUpcomingEvents, groupByLondonDay } from '@/lib/studio-data';

// The timetable is rendered into the page HTML and refreshed every 5 minutes;
// the browser then keeps availability live.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: 'Class Timetable | Reformer, Hot & Red Light Pilates in Edgware',
  description:
    'Live class timetable for Euforyc Studios in Edgware, North West London. See the next two weeks of Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Barre and Belly Dance classes with instructors and spaces left, and book online.',
  path: '/schedule',
});

const TRY_IT_ALL_URL = 'https://momence.com/m/631782';

const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0];

function Icon({ path }: { path: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default async function SchedulePage() {
  const events = await getUpcomingEvents();
  const initialData = events.length > 0 ? groupByLondonDay(events, 14) : undefined;
  const renderedAt = Date.now();
  const intro = PRICING.introOffer;

  const beforeYouArrive = [
    { title: 'Grip socks', text: POLICIES.gripSocks, image: '/gripsocks.png' },
    { title: 'Your own towel', text: POLICIES.towel, icon: 'M4 7h16v10H4zM4 11h16' },
    { title: 'Arrive early', text: firstSentence(POLICIES.arrival), icon: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 8v4l3 2' },
    { title: '24-hour cancellation', text: POLICIES.cancellation, icon: 'M6 4h12v16H6zM9 9h6M9 13h6' },
  ];

  return (
    <div className="eu-page-top">
      <div className="eu-wrap">
        <section className={styles.head}>
          <div className={`${styles.headL} eu-rise`}>
            <p className={`eu-cap ${styles.kicker}`} style={{ margin: 0 }}>
              <span className="eu-live-dot eu-live-dot--dark" aria-hidden="true" />
              Live Schedule
            </p>
            <h1 className={styles.h1}>
              Class <em>Schedule</em>
            </h1>
          </div>
          <div className={`${styles.headR} eu-rise`}>
            <span className={styles.pill}>
              <span className="eu-live-dot eu-live-dot--dark" aria-hidden="true" />
              Updated live from Momence
            </span>
            <span className={styles.pill}>14 days ahead</span>
          </div>
        </section>

        <div className={styles.body}>
          <div>
            <ScheduleView initialData={initialData} renderedAt={renderedAt} />
          </div>

          <aside className={styles.aside} aria-label="Before you book">
            <div className={`${styles.offer} eu-on-dark`}>
              <div className={styles.offerImg}>
                <Image
                  src="/reformer-new.jpg"
                  alt="A client on the reformer at Euforyc Studios"
                  fill
                  sizes="(max-width: 1100px) 100vw, 360px"
                />
              </div>
              <div className={styles.offerIn}>
                <div className="eu-cap" style={{ color: '#F5F0E8' }}>
                  New to Euforyc?
                </div>
                <h2>
                  Try It <em>All</em> — £{intro.price}
                </h2>
                <p>
                  Three group classes of your choice for first-time clients. Valid{' '}
                  {intro.note.split('valid ')[1]}.
                </p>
                <PillLink
                  href={TRY_IT_ALL_URL}
                  variant="cream"
                  dot
                  className="eu-btn--block"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-offer-id="try-all"
                  data-content-name={`${intro.name} ${intro.classes} Classes £${intro.price}`}
                  data-content-type="intro_offer"
                  data-content-category="/schedule"
                  data-value={String(intro.price)}
                  data-currency="GBP"
                >
                  Get {intro.classes} classes
                </PillLink>
              </div>
            </div>

            <div className={styles.know}>
              <h2>
                Before you <em>arrive</em>
              </h2>
              <ul>
                {beforeYouArrive.map((item) => (
                  <li key={item.title} className={styles.knowRow}>
                    <span className={styles.knowIcon}>
                      {item.image ? (
                        <Image src={item.image} alt="" fill sizes="56px" />
                      ) : (
                        <Icon path={item.icon!} />
                      )}
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Visit details */}
        <section className={`${styles.visit} eu-on-dark`} aria-label="Visiting the studio">
          <div className={styles.visitTop}>
            <div>
              <p className={styles.visitName}>Euforyc Studios</p>
              <address className={styles.visitAddress}>{STUDIO.addressLine}</address>
            </div>
            <div className={styles.visitLinks}>
              <PillLink href={STUDIO.mapsUrl} variant="cream" target="_blank" rel="noopener noreferrer">
                Get Directions
              </PillLink>
              <PillLink href={`tel:${STUDIO.phoneE164}`} variant="ghost">
                {STUDIO.phoneDisplay}
              </PillLink>
              <PillLink href={`mailto:${STUDIO.email}`} variant="ghost">
                {STUDIO.email}
              </PillLink>
            </div>
          </div>
          <p className={styles.visitNote}>
            First time visiting? We recommend arriving 10-15 minutes early to check in.
          </p>
        </section>
      </div>
    </div>
  );
}
