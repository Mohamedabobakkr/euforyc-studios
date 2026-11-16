'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/components/euforyc/Arrow';
import LoadWhenNear from '@/components/euforyc/LoadWhenNear';
import PillLink from '@/components/euforyc/PillLink';
import {
  BF_BONUS_MONTHS,
  BF_END_DATE,
  BF_ENDS_AT,
  BF_FAQS,
  BF_GROUP_CLASSES,
  BF_LINE,
  BF_MAX_FREE_CLASSES,
  BF_MEMBERSHIPS,
  BF_NAME,
  BF_PACKAGES,
  BF_PACKAGE_EXTRA_CLASSES,
  BF_PATH,
  BF_TERMS,
  BF_UNLIMITED_GIFT,
  BF_UNLIMITED_GIFT_EVERY,
  MEMBERSHIP_TERM,
  MOVE_PACKAGE_COVERS,
  PACKAGE_VALIDITY,
  bfMembershipTracking,
  bfPackageTracking,
  blackFridayEnded,
} from '@/components/black-friday/offer';
// Hero, section rhythm, FAQ rows and the sticky bar are the ones /offers uses
import offerStyles from '@/components/pricing/offers.module.css';
import styles from './black-friday.module.css';

// Tells React to look at the clock again: at the end time itself, every 30
// seconds, and whenever the tab comes back to the front (phones pause timers)
function subscribeToEnd(onChange: () => void) {
  const remaining = BF_ENDS_AT - Date.now();
  if (remaining <= 0) return () => {};
  const atEnd = remaining < 2 ** 31 - 1000 ? setTimeout(onChange, remaining + 50) : null;
  const tick = setInterval(onChange, 30_000);
  document.addEventListener('visibilitychange', onChange);
  return () => {
    if (atEnd) clearTimeout(atEnd);
    clearInterval(tick);
    document.removeEventListener('visibilitychange', onChange);
  };
}

const endedNow = () => blackFridayEnded();

/**
 * Whether the offer has ended, by the visitor's own clock. `serverEnded` is
 * what the page HTML was built with (it can be a few minutes old); the
 * browser's answer replaces it before anything is drawn.
 */
function useOfferEnded(serverEnded: boolean) {
  return useSyncExternalStore(subscribeToEnd, endedNow, () => serverEnded);
}

/** A checkout button, or a marked placeholder while its Momence link is missing */
function Checkout({
  url,
  variant,
  tracking,
  children,
}: {
  url: string | null;
  variant: 'ink' | 'cream';
  tracking: Record<string, string>;
  children: ReactNode;
}) {
  if (!url) {
    return (
      <span className={styles.pending} data-placeholder="checkout-link">
        Checkout link pending
        <small>Placeholder</small>
      </span>
    );
  }
  return (
    <PillLink href={url} variant={variant} dot className="eu-btn--block" target="_blank" rel="noopener noreferrer" {...tracking}>
      {children}
    </PillLink>
  );
}

function OfferEnded() {
  return (
    <div className="eu-page-top">
      <section className={`eu-wrap ${styles.ended}`}>
        <div>
          <p className="eu-cap" style={{ margin: 0, color: '#2a3a21' }}>
            Black Friday at Euforyc
          </p>
          <h1 className={`${offerStyles.title} eu-rise`}>
            This offer{' '}
            <br />
            <em>has ended.</em>
          </h1>
          <p className={styles.endedText}>
            {BF_NAME} closed on {BF_END_DATE}. Our current offers are waiting for you.
          </p>
          <div className={styles.endedCta}>
            <PillLink href="/offers" variant="ink" dot stretchMobile>
              See current offers
            </PillLink>
          </div>
        </div>
      </section>
    </div>
  );
}

/** The /black-friday page. `reviews` is rendered on the server by page.tsx. */
export default function BlackFridayContent({ serverEnded, reviews }: { serverEnded: boolean; reviews: ReactNode }) {
  const ended = useOfferEnded(serverEnded);

  // The sticky bar shows once the hero button has scrolled away, and steps
  // aside while the offer cards (which have their own buttons) are on screen
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);
  const [offersInView, setOffersInView] = useState(false);

  useEffect(() => {
    if (ended) return;
    const button = heroCtaRef.current;
    const offers = offersRef.current;
    if (!button || !offers) return;
    const heroObserver = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    );
    const offersObserver = new IntersectionObserver(([entry]) => setOffersInView(entry.isIntersecting));
    heroObserver.observe(button);
    offersObserver.observe(offers);
    return () => {
      heroObserver.disconnect();
      offersObserver.disconnect();
    };
  }, [ended]);

  if (ended) return <OfferEnded />;

  const classPlans = BF_MEMBERSHIPS.filter((offer) => offer.classesWithBonus !== null);
  const unlimited = BF_MEMBERSHIPS.filter((offer) => offer.classesWithBonus === null);

  return (
    <div className={`eu-page-top ${styles.live}`}>
      {/* 1. Hero: the offer, the end date and one button on the first screen of a phone */}
      <section className={`eu-wrap ${offerStyles.hero}`}>
        <div className={offerStyles.copy}>
          <p className={`eu-cap ${offerStyles.kicker}`}>Black Friday at Euforyc</p>

          <h1 className={`${offerStyles.title} eu-rise`}>
            One more,{' '}
            <br />
            <em>on us.</em>
          </h1>

          <p className={`${offerStyles.lede} eu-rise`}>{BF_LINE}</p>

          <p className={styles.ends}>
            <span className="eu-cap">Early access</span>
            <span>Ends {BF_END_DATE}</span>
          </p>

          <a ref={heroCtaRef} href="#offers" className={`eu-btn eu-btn--ink eu-btn--block ${offerStyles.heroCta} ${styles.down}`}>
            See the offers
            <span className="eu-btn__dot" aria-hidden="true">
              <Arrow />
            </span>
          </a>
        </div>

        <div className={offerStyles.art}>
          <div className={`${offerStyles.arch} ${styles.archImg}`}>
            <LoadWhenNear>
              <Image
                src="/hero/IMG_8698.JPG"
                alt="A member at the barre in front of arched mirrors at Euforyc Studios"
                fill
                sizes="(max-width: 900px) 70vw, 36vw"
              />
            </LoadWhenNear>
          </div>
          <div className={`${offerStyles.ticket} ${styles.ticket}`}>
            <div className="eu-cap" style={{ color: '#F5F0E8' }}>
              Same price
            </div>
            <div className={`${offerStyles.ticketN} ${styles.ticketN}`}>
              One <em>more</em>
            </div>
            <div className={offerStyles.ticketL}>Until {BF_END_DATE}</div>
          </div>
        </div>
      </section>

      <div ref={offersRef}>
        {/* 2. Memberships */}
        <section
          id="offers"
          className={`${offerStyles.section} ${offerStyles.sectionBeige}`}
          style={{ scrollMarginTop: 'var(--eu-header-space)' }}
          aria-labelledby="bf-memberships-title"
        >
          <div className="eu-wrap">
            <div className={`${offerStyles.head} eu-rv`}>
              <div>
                <div className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
                  Memberships
                </div>
                <h2 id="bf-memberships-title" className={`eu-h2 ${offerStyles.h2}`}>
                  Same price,{' '}
                  <br />
                  <em>more</em> classes
                </h2>
              </div>
              <p>
                Extra classes every month for your first {BF_BONUS_MONTHS} months, up to {BF_MAX_FREE_CLASSES} free
                classes in all. {MEMBERSHIP_TERM}.
              </p>
            </div>

            <ul className={styles.cards}>
              {classPlans.map((offer) => (
                <li key={offer.id}>
                  <article className={styles.card}>
                    <h3 className={styles.cardName}>{offer.plan.name}</h3>
                    <p className={styles.cardSub}>{offer.plan.sub}</p>

                    <p className={styles.swap}>
                      <span className="eu-sr-only">
                        Was {offer.plan.classes}, now {offer.classesWithBonus}
                      </span>
                      <span className={styles.swapNums} aria-hidden="true">
                        <s>{offer.plan.classes}</s>
                        <Arrow size={22} />
                        <b>{offer.classesWithBonus}</b>
                      </span>
                      <span className={styles.swapUnit}>classes a month</span>
                    </p>
                    <p className={styles.every}>every month for your first {BF_BONUS_MONTHS} months</p>

                    <div className={styles.cardFoot}>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>
                          £{offer.plan.price}
                          <small>/mo</small>
                        </span>
                        <span className={styles.free}>
                          Up to {offer.freeClasses} free classes over {BF_BONUS_MONTHS} months
                        </span>
                      </div>
                      <div className={styles.cardCta}>
                        <Checkout url={offer.checkoutUrl} variant="ink" tracking={bfMembershipTracking(offer, BF_PATH)}>
                          Join {offer.plan.name}
                        </Checkout>
                      </div>
                    </div>
                  </article>
                </li>
              ))}

              {unlimited.map((offer) => (
                <li key={offer.id}>
                  <article className={`${styles.card} ${styles.cardDark} eu-on-dark`}>
                    <h3 className={styles.cardName}>{offer.plan.name}</h3>
                    <p className={styles.cardSub}>{offer.plan.sub}</p>

                    <p className={styles.gift}>{BF_UNLIMITED_GIFT}</p>
                    <p className={styles.every}>{BF_UNLIMITED_GIFT_EVERY}</p>

                    <div className={styles.cardFoot}>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>
                          £{offer.plan.price}
                          <small>/mo</small>
                        </span>
                        <span className={styles.free}>Unlimited classes</span>
                      </div>
                      <div className={styles.cardCta}>
                        <Checkout url={offer.checkoutUrl} variant="cream" tracking={bfMembershipTracking(offer, BF_PATH)}>
                          Join Unlimited
                        </Checkout>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Class packages */}
        <section className={offerStyles.section} aria-labelledby="bf-packages-title">
          <div className="eu-wrap">
            <div className={`${offerStyles.head} eu-rv`}>
              <div>
                <div className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
                  Class packages
                </div>
                <h2 id="bf-packages-title" className={`eu-h2 ${offerStyles.h2}`}>
                  One <em>extra</em>{' '}
                  <br />
                  class
                </h2>
              </div>
              <p>
                Buy an eligible class package and get {BF_PACKAGE_EXTRA_CLASSES} extra class. No contract,{' '}
                {PACKAGE_VALIDITY}.
              </p>
            </div>

            <ul className={styles.packs}>
              {BF_PACKAGES.map((offer) => (
                <li key={offer.id} className={offer.kind === 'move_package' ? styles.packWide : undefined}>
                  <article className={styles.card}>
                    <p className={`eu-cap ${styles.packLabel}`}>{offer.label}</p>
                    <h3 className={styles.packName}>
                      {offer.option.name} <em>+{BF_PACKAGE_EXTRA_CLASSES} class</em>
                    </h3>
                    <p className={styles.cardSub}>{offer.covers}</p>

                    <div className={styles.cardFoot}>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>£{offer.option.price}</span>
                        <span className={styles.free}>Same price, one more class</span>
                      </div>
                      <div className={styles.cardCta}>
                        <Checkout url={offer.checkoutUrl} variant="ink" tracking={bfPackageTracking(offer, BF_PATH)}>
                          Buy {offer.kind === 'move_package' ? `MOVE ${offer.option.name}` : offer.option.name}
                        </Checkout>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* 4. How it works */}
      <section className={`${offerStyles.section} ${offerStyles.sectionDark} eu-on-dark`} aria-labelledby="bf-how-title">
        <div className="eu-wrap">
          <div className="eu-rv">
            <div className="eu-cap eu-cap-num" style={{ color: '#F5F0E8' }}>
              How it works
            </div>
            <h2 id="bf-how-title" className={`eu-h2 ${offerStyles.h2}`}>
              Three <em>short</em> steps
            </h2>
          </div>

          <ol className={styles.steps}>
            <li className={styles.step}>
              <div className={styles.stepN} aria-hidden="true">i.</div>
              <h3 className={styles.stepT}>Choose your offer</h3>
              <p className={styles.stepP}>
                Pick a Euforyc Membership or an eligible class package before {BF_END_DATE}.
              </p>
            </li>
            <li className={styles.step}>
              <div className={styles.stepN} aria-hidden="true">ii.</div>
              <h3 className={styles.stepT}>Check out online</h3>
              <p className={styles.stepP}>You pay the usual price. No price drops, just a little more.</p>
            </li>
            <li className={styles.step}>
              <div className={styles.stepN} aria-hidden="true">iii.</div>
              <h3 className={styles.stepT}>
                Book your <em>classes</em>
              </h3>
              <p className={styles.stepP}>
                Choose your classes on the{' '}
                <Link href="/schedule" className="underline underline-offset-4">
                  live timetable
                </Link>
                , at times that suit you.
              </p>
            </li>
          </ol>

          <div className={styles.useOn}>
            <h3 className={styles.useOnT}>Use them on any Euforyc group class</h3>
            <ul className={styles.classes}>
              {BF_GROUP_CLASSES.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <p className={styles.useOnNote}>The MOVE Package is for {MOVE_PACKAGE_COVERS}.</p>
          </div>
        </div>
      </section>

      {/* 5. Reviews, as on /offers */}
      <section className={`${offerStyles.section} ${offerStyles.reviews}`}>
        <div className="eu-wrap">
          <div className={`${offerStyles.centerHead} eu-rv`} style={{ marginBottom: 40 }}>
            <p className="tagline">FROM OUR COMMUNITY</p>
            <h2 className={`eu-h2 ${offerStyles.h2}`}>What Our Clients Say</h2>
          </div>
        </div>
        {reviews}
      </section>

      {/* 6. FAQ */}
      <section className={offerStyles.section} style={{ paddingTop: 0 }} aria-labelledby="bf-faq-title">
        <div className={`eu-wrap ${offerStyles.faq}`}>
          <h2 id="bf-faq-title" className="eu-h2" style={{ textAlign: 'center' }}>
            Good to <em>know</em>
          </h2>

          <div className={offerStyles.faqList}>
            {BF_FAQS.map((faq) => (
              <div key={faq.question} className={offerStyles.faqItem}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Terms */}
      <section className={offerStyles.section} style={{ paddingTop: 0 }} aria-labelledby="bf-terms-title">
        <div className={`eu-wrap ${styles.terms}`}>
          <h2 id="bf-terms-title" className="eu-h3">
            The terms, in plain English
          </h2>
          <ul className={styles.termsList}>
            {BF_TERMS.map((term) => (
              <li key={term}>{term}</li>
            ))}
            <li>
              Our usual{' '}
              <Link href="/terms" className="underline underline-offset-4">
                terms and conditions
              </Link>{' '}
              apply.
            </li>
          </ul>
        </div>
      </section>

      {/* 8. Sticky button (phones): scrolls to the offer cards */}
      <div
        className={`${offerStyles.mbar} ${pastHero && !offersInView ? offerStyles.mbarShow : ''} eu-on-dark`}
        data-bookbar
      >
        <span className="eu-cap">{BF_NAME}</span>
        <a href="#offers" className={offerStyles.mbarGo}>
          See offers
        </a>
      </div>
    </div>
  );
}
