'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Sparkles, Timer, Copy, Check } from 'lucide-react';

import MomenceReviews from '@/components/MomenceReviews';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';
import styles from '@/components/pricing/offers.module.css';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { STUDIO } from '@/lib/site';

// Membership promo code (set up in Momence checkout)
const PROMO_CODE = 'EUFORYC5';
// 30 November 2026, 23:59 Europe/London — the UK is on GMT (UTC+0) in November
const PROMO_ENDS_AT = Date.UTC(2026, 10, 30, 23, 59, 59);

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(targetTimestamp: number): TimeLeft | null {
  const difference = targetTimestamp - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

// Countdown to a fixed deadline — returns null once the deadline has passed
function useCountdown(targetTimestamp: number) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(targetTimestamp));

  useEffect(() => {
    const tick = () => {
      const next = getTimeLeft(targetTimestamp);
      setTimeLeft(next);
      if (!next) clearInterval(interval);
    };
    const interval = setInterval(tick, 1000);
    tick();
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return timeLeft;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}

// Euforyc Membership — first-month saving with EUFORYC5
const membershipOffers = [
  {
    id: 'euforyc-4',
    name: 'Euforyc 4',
    monthlyPrice: '£90',
    description: 'Once a week · 4 class credits per month',
    firstMonthSaving: '£4.50',
    momenceUrl: 'https://momence.com/m/937341',
    bestValue: false,
  },
  {
    id: 'euforyc-8',
    name: 'Euforyc 8',
    monthlyPrice: '£165',
    description: 'Twice a week · 8 class credits per month',
    firstMonthSaving: '£8.25',
    momenceUrl: 'https://momence.com/m/937345',
    bestValue: false,
  },
  {
    id: 'euforyc-12',
    name: 'Euforyc 12',
    monthlyPrice: '£240',
    description: 'Three times a week · 12 class credits per month',
    firstMonthSaving: '£12',
    momenceUrl: 'https://momence.com/m/937346',
    bestValue: false,
  },
  {
    id: 'euforyc-unlimited',
    name: 'Euforyc Unlimited',
    monthlyPrice: '£280',
    description: 'Unlimited classes + exclusive member perks',
    firstMonthSaving: '£14',
    momenceUrl: 'https://momence.com/m/937348',
    bestValue: true,
  },
];

// Intro Offer data
const introOffers = {
  'try-all': {
    id: 'try-all',
    name: 'Try It All',
    shortName: 'Try It All',
    classes: '3 Classes',
    price: '£60',
    perClass: '£20',
    validity: '20 days from first class',
    description: 'Three classes to use across all our group classes - Reformer, Hot Pilates, Barre, Dance & more',
    benefits: [
      'Try any group class',
      'Perfect for exploring',
      'Mix & match freely',
      'Find your favourite'
    ],
    momenceUrl: 'https://momence.com/m/631782',
    icon: Sparkles,
    highlight: true,
  }
};

// MOVE packages data
const movePackages = [
  {
    name: '4 Classes',
    price: '£70',
    savings: 'save £10',
    description: '£17.50 per class',
    momenceUrl: 'https://momence.com/m/707786',
    highlight: false,
  },
  {
    name: '8 Classes',
    price: '£135',
    savings: 'save £25',
    description: '£16.88 per class',
    momenceUrl: 'https://momence.com/m/707788',
    highlight: false,
  }
];

const moveClasses = ['Sculpt Mat Pilates', 'Belly Dance'];

type OfferId = keyof typeof introOffers;
const offerIds: OfferId[] = ['try-all'];

// Classes that Try It All covers, for "Build your three"
const BUILDER_CLASSES = ORDERED_CLASS_TYPES.filter((classType) => !classType.slug.startsWith('private')).map(
  (classType) => ({ slug: classType.slug, name: classType.name, image: classType.image })
);

const ROMAN = ['i.', 'ii.', 'iii.', 'iv.'];

// "Build your three": plan an intro across the group classes
function BuildYourThree({ offer }: { offer: (typeof introOffers)[OfferId] }) {
  const [picked, setPicked] = useState<string[]>(['reformer-pilates', 'hot-pilates']);

  const toggle = (slug: string) =>
    setPicked((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...(current.length >= 3 ? current.slice(1) : current), slug]
    );

  const left = 3 - picked.length;
  const summaryA = left === 0 ? 'Your three are set.' : left === 3 ? 'Pick three to begin —' : `Choose ${left} more —`;
  const summaryB = left === 0 ? 'Now book them in.' : `all for ${offer.price}.`;

  return (
    <section className={`${styles.section} ${styles.sectionBeige}`} id="build" aria-labelledby="build-title">
      <div className="eu-wrap">
        <div className={`${styles.head} eu-rv`}>
          <div>
            <div className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
              Build your three
            </div>
            <h2 id="build-title" className={`eu-h2 ${styles.h2}`}>
              Which classes{' '}
              <br />
              are <em>calling</em> you?
            </h2>
          </div>
          <p>
            Pick up to three to plan your intro. Change your mind as often as you like — you choose on the timetable
            when you book.
          </p>
        </div>

        <div className={styles.picks} role="group" aria-label="Choose classes">
          {BUILDER_CLASSES.map((item) => {
            const on = picked.includes(item.slug);
            return (
              <button key={item.slug} type="button" className={styles.pick} aria-pressed={on} onClick={() => toggle(item.slug)}>
                <span className={styles.pickBox} aria-hidden="true">
                  {on && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  )}
                </span>
                {item.name}
              </button>
            );
          })}
        </div>

        <ol className={styles.slots}>
          {[0, 1, 2].map((i) => {
            const item = BUILDER_CLASSES.find((c) => c.slug === picked[i]);
            return (
              <li key={i}>
                <div className={styles.frame}>
                  {item ? (
                    <Image key={item.slug} src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 700px) 30vw, 28vw" />
                  ) : (
                    <span className={styles.empty}>Class {i + 1}</span>
                  )}
                </div>
                <div className={styles.slotCap}>
                  <span className={styles.slotName}>{item ? item.name : 'Choose a class'}</span>
                  <span className="eu-cap" style={{ color: '#3d4a33' }}>
                    0{i + 1}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className={styles.summary}>
          <div className={styles.msg} aria-live="polite">
            {summaryA} <em>{summaryB}</em>
          </div>
          <PillLink
            href={offer.momenceUrl}
            variant="ink"
            dot
            target="_blank"
            rel="noopener noreferrer"
            data-offer-id={offer.id}
            data-content-name={`${offer.name} ${offer.classes} ${offer.price}`}
            data-content-type="intro_offer"
            data-content-category="/offers/build"
            data-value={offer.price.replace(/[^0-9.]/g, '')}
            data-currency="GBP"
          >
            Claim for {offer.price}
          </PillLink>
        </div>
      </div>
    </section>
  );
}

// Main content component
function OffersContent() {
  const [selectedOffer, setSelectedOffer] = useState<OfferId>('try-all');
  const [copied, setCopied] = useState(false);
  const timeLeft = useCountdown(PROMO_ENDS_AT);
  const promoActive = timeLeft !== null;

  // Read ?offer= after mount so the page itself can be rendered as static HTML
  useEffect(() => {
    const offerParam = new URLSearchParams(window.location.search).get('offer') as OfferId | null;
    if (offerParam && introOffers[offerParam]) {
      setSelectedOffer(offerParam);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    if (await copyToClipboard(PROMO_CODE)) setCopied(true);
  };

  const offer = introOffers[selectedOffer];
  const station = STUDIO.transport.station.replace(' is around', ', around');

  return (
    <div className="eu-page-top">
      {/* Hero Section */}
      <section className={`eu-wrap ${styles.hero}`}>
        <div className={styles.copy}>
          <div className="eu-cap eu-cap-num eu-fade-in" style={{ animationDelay: '.1s', color: '#2a3a21' }}>
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            FIRST-TIME CLIENTS ONLY
          </div>

          {/* Main Headline */}
          <h1 className={`${styles.title} eu-rise`} style={{ animationDelay: '.2s' }}>
            Begin Your{' '}
            <br />
            <span className="italic">Transformation</span>
          </h1>

          <div className={`${styles.priceBlock} eu-rise`} style={{ animationDelay: '.5s' }}>
            <span className={styles.pbBig}>{offer.price}</span>
            <span className={styles.pbSide}>
              <strong>{offer.name}</strong>
              <br />
              {offer.classes} · {offer.perClass} per class
            </span>
          </div>

          <p className={`${styles.lede} eu-rise`} style={{ animationDelay: '.65s' }}>
            New to Euforyc? Experience the power of Pilates with our Try It All intro offer.
            Your journey to a stronger, more balanced you starts here.
          </p>

          {/* CTA Buttons */}
          <div className={`${styles.ctas} eu-fade-in`} style={{ animationDelay: '.8s' }}>
            <PillLink href="#intro-offers" variant="ink" dot stretchMobile>
              CLAIM YOUR FIRST 3 CLASSES
            </PillLink>
            {promoActive ? (
              <a href="#membership-offer" className="eu-ulink" style={{ letterSpacing: '.08em', textTransform: 'none', fontSize: 14 }}>
                Ready to commit? 5% off your first month of membership →
              </a>
            ) : (
              <Link href="/packages" className="eu-ulink" style={{ letterSpacing: '.08em', textTransform: 'none', fontSize: 14 }}>
                Returning client? View packages & perks →
              </Link>
            )}
          </div>

          {/* Trust indicators */}
          <ul className={`${styles.trust} eu-fade-in`} style={{ animationDelay: '.95s' }}>
            <li className="eu-chip">Edgware, London</li>
            <li className="eu-chip">Small Classes</li>
            <li className="eu-chip">Flexible Scheduling</li>
          </ul>
        </div>

        <div className={styles.art}>
          <div className={styles.arch}>
            <Image
              src="/hero/IMG_8686.JPG"
              alt="A member stretching on a reformer at Euforyc Studios"
              fill
              loading="eager"
              sizes="(max-width: 900px) 90vw, 36vw"
            />
          </div>
          <div className={`${styles.ticket} eu-fade-in`} style={{ animationDelay: '1.1s' }}>
            <div className="eu-cap" style={{ color: '#F5F0E8' }}>
              Your intro
            </div>
            <div className={styles.ticketN}>
              3 <em>classes</em>
            </div>
            <div className={styles.ticketL}>
              {offer.price} · valid {offer.validity}
            </div>
          </div>
        </div>
      </section>

      {/* Build your three */}
      <BuildYourThree offer={offer} />

      {/* Intro Offers Section */}
      <section id="intro-offers" className={styles.section} style={{ scrollMarginTop: 'var(--eu-header-space)' }}>
        <div className="eu-wrap">
          <div className={`${styles.centerHead} eu-rv`}>
            <p className="tagline">TRY IT ALL</p>
            <h2 className={`eu-h2 ${styles.h2}`}>Intro Offer</h2>
            <p className="eu-lede">
              3 classes to use across all our group classes. Perfect for beginners or those new to Euforyc.
            </p>
          </div>

          {/* Offer Selector Pills */}
          <div className={styles.selector}>
            {offerIds.map((offerId) => {
              const offerData = introOffers[offerId];
              const isSelected = selectedOffer === offerId;
              const Icon = offerData.icon;

              return (
                <button
                  key={offerId}
                  type="button"
                  onClick={() => setSelectedOffer(offerId)}
                  className={styles.selectorBtn}
                  aria-pressed={isSelected}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{offerData.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Offer Card */}
          <a
            href={offer.momenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-offer-id={offer.id}
            data-content-name={`${offer.name} ${offer.classes} ${offer.price}`}
            data-content-type="intro_offer"
            data-content-category="/offers"
            data-value={offer.price.replace(/[^0-9.]/g, '')}
            data-currency="GBP"
            className={`${styles.offer} eu-on-dark`}
          >
            <div className={styles.offerTop}>
              <div>
                <p className="eu-cap" style={{ margin: 0, color: '#F5F0E8' }}>
                  {offer.classes}
                </p>
                <h3 className={styles.offerName}>{offer.name}</h3>
                <p className={styles.offerDesc}>{offer.description}</p>
              </div>
              <div>
                <div className={styles.offerPrice}>{offer.price}</div>
                <p className={styles.offerMeta} style={{ margin: '8px 0 0' }}>
                  {offer.perClass} per class
                </p>
                <p className={styles.offerMeta} style={{ margin: '4px 0 0' }}>
                  Valid for {offer.validity}
                </p>
              </div>
            </div>

            {/* Benefits */}
            <ul className={styles.benefits}>
              {offer.benefits.map((benefit, idx) => (
                <li key={idx}>
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className={styles.offerCta}>
              <span>Claim Your Intro Offer</span>
              <span className={styles.offerCtaDot}>
                <Arrow />
              </span>
            </div>
            <p className={styles.offerFine}>First-time clients only · Can only be bought once</p>
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className={`${styles.section} eu-wrap`} style={{ paddingTop: 0 }} aria-labelledby="how-title">
        <div className="eu-rv">
          <div className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
            How it works
          </div>
          <h2 id="how-title" className={`eu-h2 ${styles.h2}`}>
            Simple, from the{' '}
            <br />
            <em>first</em> breath
          </h2>
        </div>
        <ol className={styles.steps}>
          <li className={`${styles.step} eu-rv`}>
            <div className={styles.stN} aria-hidden="true">i.</div>
            <h3 className={styles.stT}>Claim your intro</h3>
            <p className={styles.stP}>
              Buy {offer.name} online — any three group classes for {offer.price}, for first-time clients. Valid{' '}
              {offer.validity}.
            </p>
          </li>
          <li className={`${styles.step} eu-rv`}>
            <div className={styles.stN} aria-hidden="true">ii.</div>
            <h3 className={styles.stT}>Book your classes</h3>
            <p className={styles.stP}>
              Choose your times on the <Link href="/schedule" className="underline underline-offset-4">live timetable</Link>.
              Arrive 10–15 minutes early on your first visit to check in — and bring grip socks for Reformer.
            </p>
          </li>
          <li className={`${styles.step} eu-rv`}>
            <div className={styles.stN} aria-hidden="true">iii.</div>
            <h3 className={styles.stT}>
              Make it a <em>ritual</em>
            </h3>
            <p className={styles.stP}>
              {promoActive
                ? `Found your favourite? Join a Euforyc Membership — use ${PROMO_CODE} for 5% off your first month, until 30 November 2026.`
                : 'Found your favourite? Join a Euforyc Membership or choose a class package.'}
            </p>
          </li>
        </ol>
      </section>

      {/* Membership Offer Section */}
      {promoActive && (
        <section id="membership-offer" className={`${styles.section} ${styles.sectionBeige}`} style={{ scrollMarginTop: 'var(--eu-header-space)' }}>
          <div className="eu-wrap">
            <div className={`${styles.centerHead} eu-rv`}>
              <p className="tagline">LOVED YOUR FIRST CLASSES?</p>
              <h2 className={`eu-h2 ${styles.h2}`}>
                Your first month, <span className="italic">5% off</span>
              </h2>
              <p className="eu-lede">
                Ready to make it a habit? Choose any Euforyc Membership and enter {PROMO_CODE} at checkout to take 5% off your first monthly payment. One membership for the whole group timetable.
              </p>
              {/* Real deadline: 30 November 2026, 23:59 UK time */}
              <div className={styles.countdown}>
                <Timer className="h-4 w-4" aria-hidden="true" />
                <span suppressHydrationWarning>
                  OFFER ENDS IN: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </span>
              </div>
            </div>

            {/* Promo code */}
            <div className={`${styles.codeCard} eu-on-dark`}>
              <p className="eu-cap" style={{ margin: 0, color: '#F5F0E8' }}>USE CODE AT CHECKOUT</p>
              <p className={styles.codeText}>{PROMO_CODE}</p>
              <button type="button" onClick={handleCopy} aria-live="polite" className="eu-btn eu-btn--cream eu-btn--block">
                {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? 'Copied!' : 'Tap to copy code'}
              </button>
            </div>
            <p className={styles.codeFine}>
              5% off your first monthly payment only. New membership subscribers only. 6-month minimum term applies. Valid until 30 November 2026. One use per customer.
            </p>

            <ul className={styles.mGrid}>
              {membershipOffers.map((membership) => (
                <li key={membership.id}>
                  <a
                    href={membership.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-offer-id={`euforyc5-${membership.id}`}
                    data-content-name={`${membership.name} Membership ${membership.monthlyPrice} (${PROMO_CODE})`}
                    data-content-type="membership"
                    data-content-category="/offers/euforyc5"
                    data-value={membership.monthlyPrice.replace(/[^0-9.]/g, '')}
                    data-currency="GBP"
                    className={`${styles.mCard} ${membership.bestValue ? `${styles.mCardDark} eu-on-dark` : ''}`}
                  >
                    {membership.bestValue && <span className={styles.badge}>BEST VALUE</span>}
                    <h3 className={styles.mName}>{membership.name}</h3>
                    <p className={styles.mDesc}>{membership.description}</p>
                    <div className={styles.mPrice}>
                      {membership.monthlyPrice}
                      <small>/mo</small>
                    </div>
                    <p className={styles.mSave} style={{ margin: 0 }}>
                      Save {membership.firstMonthSaving} on your first month
                    </p>
                    <span className={styles.mCta}>Claim offer</span>
                    <span className={styles.mHint}>Enter {PROMO_CODE} at checkout</span>
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/memberships" className="eu-ulink">
                Compare membership benefits →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* MOVE Section */}
      <section id="move" className={styles.section}>
        <div className="eu-wrap">
          <div className={`${styles.centerHead} eu-rv`}>
            <p className="tagline">MIX &amp; MATCH</p>
            <h2 className={`eu-h2 ${styles.h2}`}>MOVE</h2>
            <p className="eu-lede">
              Sculpt Mat Pilates and Belly Dance, mix and match. Valid 30 days from your first class, no contract.
            </p>
          </div>

          {/* MOVE Classes */}
          <ul className={styles.moveClasses}>
            {moveClasses.map((style) => (
              <li key={style}>{style}</li>
            ))}
          </ul>

          {/* MOVE Package Cards */}
          <ul className={styles.moveGrid}>
            {movePackages.map((pkg, index) => (
              <li key={index}>
                <a
                  href={pkg.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-offer-id={`move-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                  data-content-name={`MOVE ${pkg.name} ${pkg.price}`}
                  data-content-type="move_package"
                  data-content-category="/offers/move"
                  data-value={pkg.price.replace(/[^0-9.]/g, '')}
                  data-currency="GBP"
                  className={styles.mCard}
                >
                  {pkg.highlight && <span className={styles.badge}>BEST VALUE</span>}
                  <h3 className={styles.mName}>{pkg.name}</h3>
                  <p className={styles.mDesc}>{pkg.description}</p>
                  <div className={styles.mPrice}>{pkg.price}</div>
                  {pkg.savings && (
                    <p className={styles.mSave} style={{ margin: 0 }}>
                      {pkg.savings}
                    </p>
                  )}
                  <span className={styles.mCta}>Book Now</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Euforyc */}
      <section className={`${styles.section} ${styles.sectionDark} eu-on-dark`} aria-labelledby="why-title">
        <div className={`eu-wrap ${styles.whyGrid}`}>
          <div className={`${styles.whyImg} eu-rv`}>
            <Image src="/about-studio.jpg" alt="The Euforyc reformer studio" fill sizes="(max-width: 900px) 90vw, 40vw" />
          </div>
          <div className={`${styles.whyText} eu-rv`}>
            <div className="eu-cap eu-cap-num" style={{ color: '#F5F0E8' }}>
              Why Euforyc
            </div>
            <h2 id="why-title" className={`eu-h2 ${styles.h2}`}>
              A space that is{' '}
              <br />
              <em>entirely</em> yours
            </h2>
            <ul className={styles.whyList}>
              {[
                ['Women only', 'Every class, every day — a calm, supportive space designed for women.'],
                ['Small and intimate', 'Six to eight women per class, so you are seen and guided.'],
                ['More than Pilates', 'Red light therapy, infrared heat, skin treatments and matcha — all under one roof.'],
                ['Easy to reach', `${STUDIO.addressLine} — ${station.charAt(0).toLowerCase()}${station.slice(1)}.`],
              ].map(([title, text], i) => (
                <li key={title} className={styles.whyRow}>
                  <span className={styles.k} aria-hidden="true">{ROMAN[i]}</span>
                  <span className={styles.v}>
                    <strong>{title}</strong>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Existing Members Section */}
      <section className={`${styles.section} ${styles.sectionDark} eu-on-dark`} style={{ paddingTop: 0 }}>
        <div className={`eu-wrap ${styles.returning}`}>
          <div className="eu-cap" style={{ color: '#F5F0E8' }}>RETURNING CLIENT?</div>
          <h2 className={`eu-h2 ${styles.h2}`} style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
            We&apos;re Here For Your{' '}
            <br />
            <span className="italic">Fitness Journey</span>
          </h2>
          <p>
            Try It All is exclusively for new clients — but we&apos;ve got you covered. Explore our class packages and memberships for even more value and perks.
          </p>
          <div className={styles.returningCtas}>
            <PillLink href="/packages" variant="cream" dot stretchMobile>
              VIEW PACKAGES
            </PillLink>
            <PillLink href="/memberships" variant="ghost" stretchMobile>
              EXPLORE MEMBERSHIPS
            </PillLink>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.section}>
        <div className="eu-wrap">
          <div className={`${styles.centerHead} eu-rv`} style={{ marginBottom: 40 }}>
            <p className="tagline">FROM OUR COMMUNITY</p>
            <h2 className={`eu-h2 ${styles.h2}`}>What Our Clients Say</h2>
          </div>
          <MomenceReviews />
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={`eu-wrap ${styles.faq}`}>
          <h2 className="eu-h2" style={{ textAlign: 'center' }}>Common Questions</h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3>I&apos;ve never done pilates before</h3>
              <p>Perfect! Try It All is designed for beginners. Our instructors will guide you through every movement with personalized attention.</p>
            </div>

            {promoActive && (
              <div className={styles.faqItem}>
                <h3>How does the {PROMO_CODE} code work?</h3>
                <p>Choose any Euforyc Membership (Euforyc 4, 8, 12 or Unlimited) and enter {PROMO_CODE} at checkout. You&apos;ll get 5% off your first monthly payment only; after that you pay the standard monthly price. The code is for new membership subscribers only, can be used once per customer and is valid until 23:59 (UK time) on 30 November 2026. The Euforyc Membership&apos;s 6-month minimum term applies.</p>
              </div>
            )}

            <div className={styles.faqItem}>
              <h3>What should I bring?</h3>
              <p>Comfortable workout clothes and water. We provide all equipment and mats. Grip socks are mandatory for Reformer Pilates, and you need your own towel for Hot Pilates and Sculpt Mat Pilates. Both can be bought at the studio.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>How do I book my classes?</h3>
              <p>After purchase, you&apos;ll receive access to our booking system where you can schedule your classes at times that suit you.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p className="eu-lede" style={{ marginBottom: 8 }}>Have more questions?</p>
            <Link href="/contact" className="btn-minimal">
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`${styles.final} eu-wrap`}>
        <h2 className="eu-h2">
          Ready to Begin Your <em>Journey</em>?
        </h2>
        <div className={styles.finalCta}>
          <PillLink href="#intro-offers" variant="ink" dot stretchMobile>
            CLAIM YOUR FIRST 3 CLASSES
          </PillLink>
        </div>
      </section>

      {/* Sticky CTA - Mobile only */}
      <div className={`${styles.mbar} eu-on-dark`} data-bookbar>
        <span className="eu-cap">{offer.shortName} · {offer.price}</span>
        <a
          href={offer.momenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-offer-id={offer.id}
          data-content-name={`${offer.name} ${offer.classes} ${offer.price}`}
          data-content-type="intro_offer"
          data-content-category="/offers/sticky-mobile"
          data-value={offer.price.replace(/[^0-9.]/g, '')}
          data-currency="GBP"
          className={styles.mbarGo}
        >
          CLAIM {offer.shortName.toUpperCase()} OFFER
        </a>
      </div>
    </div>
  );
}

export default function OffersPage() {
  return (
    <Suspense fallback={<div className="eu-page-top min-h-screen bg-[#fffcf2]" />}>
      <OffersContent />
    </Suspense>
  );
}
