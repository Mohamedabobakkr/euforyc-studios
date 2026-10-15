/**
 * Server-rendered homepage sections. Copy is the approved homepage copy from
 * the design; class facts come from lib/classes.ts and studio facts from
 * lib/site.ts.
 */
import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/components/euforyc/Arrow';
import PauseOffscreen from '@/components/euforyc/PauseOffscreen';
import PillLink from '@/components/euforyc/PillLink';
import { ORDERED_CLASS_TYPES, type ClassType } from '@/lib/classes';
import { POLICIES, PRICING, STUDIO } from '@/lib/site';
import ClassPanels, { type ClassPanel } from './ClassPanels';
import { OpenNow, StudioHours } from './OpenStatus';
import type { SpecialSession } from './data';
import { SOCIAL_CARDS, SOCIAL_LINE, SOCIAL_MEMBERSHIP, type SocialCard } from './social-data';
import { spotsText } from './types';
import styles from './home.module.css';

export const TRY_IT_ALL_URL = 'https://momence.com/m/631782';

/** Data attributes the layout's booking click tracking reads for Try It All */
export function tryItAllTracking(category: string) {
  return {
    'data-offer-id': 'try-all',
    'data-content-name': `${PRICING.introOffer.name} ${PRICING.introOffer.classes} Classes £${PRICING.introOffer.price}`,
    'data-content-type': 'intro_offer',
    'data-content-category': category,
    'data-value': String(PRICING.introOffer.price),
    'data-currency': 'GBP',
  };
}

export function priceLabel(classType: ClassType): string {
  return classType.groupSize === 'One-to-one' ? `£${classType.price} session` : `£${classType.price} drop-in`;
}

export function classPanel(classType: ClassType): ClassPanel {
  return {
    slug: classType.slug,
    name: classType.name,
    tagline: classType.tagline,
    duration: classType.duration.replace(' minutes', ' min'),
    groupSize: classType.groupSize.replace(' per class', ''),
    priceLabel: priceLabel(classType),
    image: { src: classType.image.src, alt: classType.image.alt },
  };
}

function firstSentence(text: string): string {
  return text.split(/(?<=\.)\s/)[0];
}

// ---------------------------------------------------------------------------

export function Philosophy() {
  return (
    <section className={`eu-wrap ${styles.philo}`} aria-labelledby="philo-title">
      <div className={styles.philoGrid}>
        <div className={`${styles.philoText} eu-rv`}>
          <h2 id="philo-title" className={styles.philoH}>
            <span className={styles.philoHa}>everything is</span>
            <span className={styles.philoHb}>euforyc</span>
          </h2>
          <p className={styles.philoLead}>
            More than a Pilates studio — a women-only space in the heart of North West London, made for moving,
            breathing and <em>belonging</em>.
          </p>
          <p>
            Come for your morning reformer or red light class. Stay for the matcha, the conversation and the women who
            become your friends. Here you work on your body, your goals and your peace — and you never do it alone.
          </p>
          <p>
            Transformation is built with time, breath by breath. Every small movement layers into lasting growth — in
            your body, and in your life.
          </p>
          <Link href="/about" className="eu-ulink" style={{ marginTop: 10 }}>
            Discover our story
          </Link>
        </div>
        <div className={styles.philoArt}>
          <div className={`eu-arch ${styles.philoArch}`}>
            <div className={`${styles.philoImgWrap} eu-par`}>
              <Image
                src="/euforyc.jpg"
                alt="A member with a matcha on a reformer by the window at Euforyc Studios"
                fill
                sizes="(max-width: 900px) 90vw, 36vw"
              />
            </div>
          </div>
          <div className={styles.seal} aria-hidden="true">
            <PauseOffscreen className={`${styles.sealRing} eu-spin`}>
              <svg viewBox="0 0 120 120" width="100%" height="100%">
                <defs>
                  <path id="seal-path" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
                </defs>
                <text fontFamily="Inter, sans-serif" fontSize="8" fill="#fffcf2" letterSpacing="1.4">
                  <textPath href="#seal-path" textLength="300" lengthAdjust="spacing">
                    EVERYTHING IS EUFORYC • EUFORYC IS EVERYTHING •{' '}
                  </textPath>
                </text>
              </svg>
            </PauseOffscreen>
            <span className={styles.sealE}>e</span>
          </div>
          <div className={`eu-cap ${styles.philoCap}`}>
            <span>Women only</span>
            <span>
              {STUDIO.address.locality} · North West London
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

const roofItems: { n: string; title: string; text: string; href: string; sameTab?: boolean }[] = [
  {
    n: 'i.',
    title: 'Move',
    text: 'Reformer, Hot and Red Light Pilates, Sculpt, Barre and Belly Dance — your daily ritual, in small classes.',
    href: '/classes',
  },
  {
    n: 'ii.',
    title: 'Restore',
    text: 'Red light, heat and massage to recover, reset and feel good in your body again.',
    href: '/massage',
  },
  {
    n: 'iii.',
    title: 'Glow',
    text: 'Treatments at Euforyc Skin Studio, just steps from your reformer.',
    // Skin Studio's own site, opened in the same tab
    href: 'https://euforycskin.co.uk/',
    sameTab: true,
  },
  {
    n: 'iv.',
    title: 'Sip',
    text: 'Matcha and coffee at Euforyc Sips — where the after-class conversations happen.',
    href: 'https://www.instagram.com/euforycsips',
  },
  {
    n: 'v.',
    title: 'Gather',
    text: 'Women’s Circle, guided journaling and socials across London with women who just get it.',
    href: 'https://euforycsocial.co.uk',
  },
  {
    n: 'vi.',
    title: 'Escape',
    text: 'Retreats with Euforyc Social, for when you need more than a weekend. Next stop: Siwa, April 2027.',
    href: 'https://euforycsocial.co.uk',
  },
];

export function UnderOneRoof() {
  return (
    <section className={`eu-wrap ${styles.roof}`} aria-labelledby="roof-title">
      <div className={`${styles.roofHead} eu-rv`}>
        <div className={styles.roofHeadL}>
          <span className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
            Under one roof
          </span>
          <h2 id="roof-title" className={styles.roofH}>
            Your daily class.{' '}
            <br />
            Your friends. Your <em>peace</em>.
          </h2>
        </div>
        <p className={styles.roofHeadR}>
          Everything a woman needs to feel good — in her body, her progress, her life and her people — in one place
          she can call her own.
        </p>
      </div>
      <ul className={`${styles.roofGrid} eu-rv`}>
        {roofItems.map((item) => {
          const inner = (
            <>
              <span className={styles.riTop}>
                <span className={styles.riN}>{item.n}</span>
                <span className={styles.riArrow}>
                  <Arrow size={18} />
                </span>
              </span>
              <span className={styles.riT}>{item.title}</span>
              <span className={styles.riP}>{item.text}</span>
            </>
          );
          return (
            <li key={item.title}>
              {item.href.startsWith('/') ? (
                <Link href={item.href} className={styles.ri}>
                  {inner}
                </Link>
              ) : item.sameTab ? (
                <a href={item.href} className={styles.ri}>
                  {inner}
                </a>
              ) : (
                <a href={item.href} className={styles.ri} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function ClassesSection() {
  const panels = ORDERED_CLASS_TYPES.map(classPanel);

  return (
    <section className={styles.classes} id="classes" aria-labelledby="classes-title">
      <div className="eu-wrap">
        <div className={`${styles.cHead} eu-rv`}>
          <h2 id="classes-title" className="eu-h2">
            Our <em>Classes</em>
          </h2>
          <p className={`eu-tagline ${styles.tagline}`} style={{ marginTop: 20 }}>
            Reformer • Hot Pilates • Red Light • Sculpt • Barre • Belly Dance • Private 1:1
          </p>
          <p className={styles.cSub}>
            Your daily ritual, in small women-only classes — from your first reformer session to the class you never
            miss.
          </p>
        </div>

        <ClassPanels classes={panels} />

        <ul className={styles.cMobile}>
          {panels.map((item) => (
            <li key={item.slug}>
              <Link href={`/classes/${item.slug}`} className={styles.mcard}>
                <span className={styles.mcardImg} style={{ display: 'block' }}>
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 900px) 78vw, 1px" />
                </span>
                <h3>{item.name}</h3>
                <p>
                  {item.duration} · {item.groupSize} · {item.priceLabel}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className={`${styles.cCta} eu-rv`}>
          <PillLink href="/schedule" variant="ink" dot stretchMobile>
            View schedule
          </PillLink>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

const SOCIAL_SIZES = '(max-width: 1100px) min(76vw, 320px), 340px';

function SocialCardLink({ card }: { card: SocialCard }) {
  return (
    <a href={card.href} className={`${styles.ev} ${styles.evBig}`}>
      <span className={`${styles.evImg} ${card.image ? '' : styles.evWordBox}`} style={{ display: 'block' }}>
        {card.image && card.crossfade ? (
          // Two stacked photos; the top one fades in and out (CSS only)
          <PauseOffscreen as="span" className={styles.evFade}>
            <Image src={card.image.src} alt={card.image.alt} fill sizes={SOCIAL_SIZES} style={{ objectPosition: card.image.position }} />
            <span className={styles.evFadeTop}>
              <Image
                src={card.crossfade.src}
                alt={card.crossfade.alt}
                fill
                sizes={SOCIAL_SIZES}
                style={{ objectPosition: card.crossfade.position }}
              />
            </span>
          </PauseOffscreen>
        ) : card.image ? (
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes={SOCIAL_SIZES}
            style={{ objectPosition: card.image.position }}
          />
        ) : (
          <span className={styles.evWord} aria-hidden="true">
            {card.word}
          </span>
        )}
        <span className={styles.evDate}>
          {card.badge.top && <span className="eu-cap">{card.badge.top}</span>}
          {card.badge.big && <b>{card.badge.big}</b>}
          {card.badge.bottom && <span className="eu-cap">{card.badge.bottom}</span>}
        </span>
      </span>
      <span className={styles.evIn}>
        <span className={`eu-cap ${styles.evKind}`}>{card.kicker}</span>
        <span className={styles.evT}>{card.title}</span>
        <span className={styles.evP}>{card.line}</span>
        {card.note && <span className={styles.evP}>{card.note}</span>}
        <span className={styles.evGo}>
          {card.cta}
          <Arrow size={14} />
        </span>
      </span>
    </a>
  );
}

export function ThisMonth({ specials }: { specials: SpecialSession[] }) {
  return (
    <section className={styles.month} aria-labelledby="month-title">
      <div className="eu-wrap">
        <div className={`${styles.secHead} eu-rv`}>
          <div className={styles.secHeadL}>
            <span className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
              Beyond the mat
            </span>
            <h2 id="month-title" className="eu-h2">
              This month at <em>Euforyc</em>
            </h2>
          </div>
          <p className={`${styles.secHeadR} eu-lede`}>
            Socials, circles, special sessions and the next retreat — the moments where strangers become friends.
          </p>
        </div>

        {specials.length > 0 && (
          <ul className={styles.evGrid} style={{ ['--cards' as string]: specials.length }}>
            {specials.map(({ event, label, image }) => {
              const [weekday, day, month] = event.dayLabel.split(' ');
              return (
                <li key={event.id}>
                  <Link href="/schedule" className={styles.ev}>
                    <span className={styles.evImg} style={{ display: 'block' }}>
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1100px) 76vw, 25vw" />
                      <span className={styles.evDate}>
                        <span className="eu-cap">{weekday}</span>
                        <b>{day}</b>
                        <span className="eu-cap">{month}</span>
                      </span>
                    </span>
                    <span className={styles.evIn}>
                      <span className={`eu-cap ${styles.evKind}`}>
                        {label} · {event.time}
                      </span>
                      <span className={styles.evT}>{event.title}</span>
                      <span className={styles.evP}>
                        {event.instructor ? `With ${event.instructor}, at the studio. ` : 'At the studio. '}
                        {event.isSoldOut ? spotsText(event) : `${event.spotsAvailable} of ${event.capacity} places left.`}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Euforyc Social: retreats and London socials (components/home/social-data.ts) */}
        <div className={styles.social}>
          <div className={`${styles.socialHead} eu-rv`}>
            <span className="eu-cap" style={{ color: '#2a3a21' }}>
              Euforyc Social
            </span>
            <h3 className={styles.socialH}>{SOCIAL_LINE}</h3>
          </div>
          <ul className={`${styles.evGrid} ${styles.socialGrid}`} style={{ ['--cards' as string]: SOCIAL_CARDS.length }}>
            {SOCIAL_CARDS.map((card) => (
              <li key={card.id}>
                <SocialCardLink card={card} />
              </li>
            ))}
          </ul>
          <p className={styles.socialMember}>
            <a href={SOCIAL_MEMBERSHIP.href}>
              {SOCIAL_MEMBERSHIP.text}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function Euforia() {
  return (
    <section className={`${styles.eu} eu-on-dark`} aria-labelledby="euforia-title">
      <div className={styles.euImg}>
        <Image
          src="/about-cta.jpg"
          alt="A member stretching on the reformer by the window"
          fill
          // Landscape photo in a tall box on phones: ask for a larger file there
          sizes="(max-width: 600px) and (min-resolution: 3.5dppx) 500px, (max-width: 600px) 640px, 100vw"
        />
      </div>
      <PauseOffscreen className={`${styles.euRing} eu-spin eu-spin--slow`} ariaHidden>
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <defs>
            <path id="euforia-ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
          </defs>
          <text fontFamily="Playfair Display, serif" fontSize="17" fill="#fffcf2" letterSpacing="3">
            <textPath href="#euforia-ring" textLength="510" lengthAdjust="spacing">
              EUFORIA • EUFORIA • EUFORIA •{' '}
            </textPath>
          </text>
        </svg>
      </PauseOffscreen>
      <div className={styles.euIn}>
        <h2 id="euforia-title" className="eu-cap" style={{ color: '#F5F0E8', margin: 0 }}>
          Euforia
        </h2>
        <p className={styles.euQ}>
          Euforia is not a destination, it is a feeling you create with every mindful moment.
        </p>
      </div>
      <div className={styles.euCols}>
        <div className={`eu-wrap ${styles.euColsGrid}`}>
          <p className={styles.euA}>
            Find happiness in movement, not just the results — and in the women around you. Here, friendships start
            between classes, carry on over matcha and spill out into socials across London.
          </p>
          <p className={styles.euB}>
            Feel good about your body, your progress, your life and your people. That is the Euforyc feeling. You will
            understand it the moment you walk in.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function FirstVisit() {
  const { introOffer } = PRICING;
  const steps = [
    {
      n: 'i.',
      title: <>Book {introOffer.name}</>,
      // "valid 20 days from your first class" comes from the price list
      text: `Any three group classes for £${introOffer.price}, for first-time clients. Valid ${introOffer.note.split('valid ')[1]}.`,
      image: { src: '/reformer-new.jpg', alt: 'A client on the reformer at Euforyc Studios', position: '50% 30%' },
    },
    {
      n: 'ii.',
      title: <>Arrive a little early</>,
      text: [POLICIES.arrival, POLICIES.gripSocks, POLICIES.towel].map(firstSentence).join(' '),
      image: { src: '/gripsocks.png', alt: 'Euforyc grip socks', position: '50% 40%' },
    },
    {
      n: 'iii.',
      title: (
        <>
          Stay for a <em>matcha</em>
        </>
      ),
      text: 'Euforyc Sips is in the same building. It’s usually where the friendships start.',
      image: { src: '/euforyc.jpg', alt: 'Matcha at the studio', position: '50% 50%' },
    },
  ];

  return (
    <section className={`eu-wrap ${styles.first}`} aria-labelledby="first-title">
      <div className={`${styles.secHead} eu-rv`}>
        <div className={styles.secHeadL}>
          <span className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
            New here?
          </span>
          <h2 id="first-title" className="eu-h2">
            Your first <em>visit</em>
          </h2>
        </div>
        <p className={`${styles.secHeadR} eu-lede`}>No nerves needed. Here is exactly how it goes.</p>
      </div>
      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.n} className={`${styles.step} eu-rv`}>
            <div className={styles.stepImg}>
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                sizes="(max-width: 900px) 240px, 30vw"
                style={{ objectPosition: step.image.position }}
              />
            </div>
            <div className={styles.stepIn}>
              <div className={styles.stepN} aria-hidden="true">
                {step.n}
              </div>
              <h3 className={styles.stepT}>{step.title}</h3>
              <p className={styles.stepP}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function VisitTicket() {
  const station = STUDIO.transport.station.replace(' is around', ', around');

  return (
    <section className={`eu-wrap ${styles.visit}`} id="visit" aria-labelledby="visit-title">
      <div className="eu-rv">
        <span className="eu-cap eu-cap-num" style={{ color: '#2a3a21' }}>
          Visit
        </span>
        <h2 id="visit-title" className="eu-h2">
          Your pass to <em>euforyc</em>
        </h2>
      </div>
      <div className={`${styles.ticket} eu-rv`}>
        <div className={styles.tkPhoto}>
          <Image
            src="/hero/IMG_4879.JPG"
            alt="The Euforyc Studios shopfront on Holmstall Parade"
            fill
            sizes="(max-width: 1000px) 100vw, 40vw"
          />
          <span className={`eu-cap ${styles.tkLbl}`}>Holmstall Parade</span>
        </div>
        <div className={styles.tkBody}>
          <div className={`eu-cap ${styles.tkAdmit}`}>Admit one · women only</div>
          <h3 className={styles.tkName}>EUFORYC STUDIOS</h3>
          <dl className={styles.tkRows}>
            <div className={styles.tkRow}>
              <dt className="eu-cap">Address</dt>
              <dd>
                <a className={styles.tkSerif} href={STUDIO.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {STUDIO.addressLine}
                </a>
              </dd>
            </div>
            <div className={styles.tkRow}>
              <dt className="eu-cap">Getting here</dt>
              <dd>
                {station} · buses {STUDIO.transport.buses.join(', ')}
              </dd>
            </div>
            <div className={styles.tkRow}>
              <dt className="eu-cap">Hours</dt>
              <dd>
                <StudioHours />
              </dd>
            </div>
            <div className={styles.tkRow}>
              <dt className="eu-cap">Right now</dt>
              <dd>
                <OpenNow />
              </dd>
            </div>
            <div className={styles.tkRow}>
              <dt className="eu-cap">Say hello</dt>
              <dd className={styles.tkContact}>
                <a href={`tel:${STUDIO.phoneE164}`}>{STUDIO.phoneDisplay}</a>
                <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
              </dd>
            </div>
          </dl>
          <div className={styles.tkCtas}>
            <PillLink href="/contact" variant="ink" dot>
              Contact us
            </PillLink>
            <PillLink href="/faq" variant="line">
              FAQ
            </PillLink>
            <PillLink href={STUDIO.mapsUrl} variant="line" target="_blank" rel="noopener noreferrer">
              Directions
            </PillLink>
          </div>
        </div>
        <div className={styles.tkStub} aria-hidden="true">
          <span className="eu-cap" style={{ fontSize: 10 }}>
            No. 01
          </span>
          <span className={styles.tkVert}>
            everything is <em>euforyc</em>
          </span>
          <span className={styles.tkBars}>
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function Mantra() {
  return (
    <section className={styles.mantra}>
      <p className={`${styles.mtLine} ${styles.mtA}`}>
        <span>everything is</span>
        <span className={styles.mtImg}>
          <Image src="/euforyc.jpg" alt="" fill sizes="240px" />
        </span>
        <em>euforyc</em>
      </p>
      <p className={`${styles.mtLine} ${styles.mtB}`}>
        <span>euforyc is</span>
        <span className={styles.mtImg}>
          <Image src="/redlight-new.jpg" alt="" fill sizes="240px" />
        </span>
        <span className={styles.mtOutline}>everything</span>
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function BookingBar() {
  return (
    <div className={`${styles.bookbar} eu-on-dark`} role="region" aria-label="Quick booking" data-bookbar>
      <span className={styles.bbText}>
        New here? <b>3 classes £{PRICING.introOffer.price}</b>
      </span>
      <Link href="/schedule" className={styles.bbSec}>
        Timetable
      </Link>
      <a href={TRY_IT_ALL_URL} className={styles.bbGo} target="_blank" rel="noopener noreferrer" {...tryItAllTracking('/sticky-bar')}>
        Try It All
      </a>
    </div>
  );
}
