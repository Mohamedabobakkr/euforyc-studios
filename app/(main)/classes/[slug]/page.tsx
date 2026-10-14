import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import ReviewCards from '@/components/ReviewCards';
import UpcomingSessions from '@/components/UpcomingSessions';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';
import { CLASS_TYPES, ORDERED_CLASS_TYPES, getClassType } from '@/lib/classes';
import {
  ORGANIZATION_ID,
  POLICIES,
  SITE_URL,
  STUDIO,
  breadcrumbSchema,
  pageMetadata,
  postalAddressSchema,
} from '@/lib/site';
import {
  formatLondonDate,
  formatLondonTime,
  getReviews,
  getUpcomingEvents,
  liveFactsFor,
  reviewsFor,
} from '@/lib/studio-data';

// Timetable facts refresh every 10 minutes
export const revalidate = 600;
export const dynamicParams = false;

// Shared type and spacing for the class page sections
const H1 = 'font-serif text-[clamp(48px,6.4vw,104px)] font-normal leading-[0.95] tracking-[-0.035em] text-eu-ink';
const H2 = 'font-serif text-[clamp(36px,4.4vw,64px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-ink';
const H2_SMALL = 'font-serif text-[clamp(32px,3vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-eu-ink';
const SECTION_TOP = 'pt-[clamp(80px,10vw,150px)]';
const LIST_ITEM =
  "relative pl-6 text-[16px] leading-[1.6] text-eu-green before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-current before:content-['']";
const PRICE_LINK =
  'group flex min-h-[64px] items-center justify-between gap-4 border-b border-[#fffcf2]/15 font-serif text-[24px] font-normal text-eu-cream hover:text-eu-cream [&>svg]:transition-transform [&>svg]:duration-500 hover:[&>svg]:-rotate-45';

export function generateStaticParams() {
  return CLASS_TYPES.map((classType) => ({ slug: classType.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const classType = getClassType(slug);
  if (!classType) return {};

  return pageMetadata({
    title: `${classType.name} Classes in Edgware, North West London`,
    description: classType.summary,
    path: `/classes/${classType.slug}`,
    image: {
      url: `${SITE_URL}${classType.image.src}`,
      width: classType.image.width,
      height: classType.image.height,
      alt: classType.image.alt,
    },
  });
}

export default async function ClassTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const classType = getClassType(slug);
  if (!classType) notFound();

  const [events, { reviews }] = await Promise.all([getUpcomingEvents(), getReviews()]);
  const live = liveFactsFor(classType, events);
  const classReviews = reviewsFor(classType, reviews);
  const isPrivate = classType.slug.startsWith('private-');
  const renderedAt = Date.now();

  const dropIn = `£${classType.price}`;

  const facts = [
    { label: 'Duration', value: classType.duration },
    { label: 'Class size', value: classType.groupSize },
    { label: 'Level', value: classType.level },
    { label: isPrivate ? 'Single session' : 'Drop-in', value: dropIn },
    { label: 'Studio', value: 'Women-only' },
  ];

  const nextSessions = live.sessions.slice(0, 8);
  const pageUrl = `${SITE_URL}/classes/${classType.slug}`;
  const otherClasses = ORDERED_CLASS_TYPES.filter((c) => c.slug !== classType.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${classType.name} at ${STUDIO.name}`,
    serviceType: classType.name,
    description: classType.summary,
    url: pageUrl,
    image: `${SITE_URL}${classType.image.src}`,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: STUDIO.areas.map((name) => ({ '@type': 'Place', name })),
    audience: { '@type': 'PeopleAudience', suggestedGender: 'female' },
    offers: {
      '@type': 'Offer',
      price: classType.price,
      priceCurrency: 'GBP',
      url: STUDIO.bookingUrl,
      description: isPrivate ? 'Single session' : 'Single drop-in class',
    },
  };

  const eventSchema = nextSessions.slice(0, 5).map((session) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: session.title,
    description: session.description?.trim() || classType.summary,
    startDate: session.startTime,
    endDate: session.endTime,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: `${SITE_URL}${classType.image.src}`,
    location: {
      '@type': 'Place',
      name: STUDIO.name,
      address: postalAddressSchema,
    },
    organizer: { '@id': ORGANIZATION_ID },
    ...(session.instructor?.name
      ? { performer: { '@type': 'Person', name: session.instructor.name.replace(/\s+/g, ' ').trim() } }
      : {}),
    offers: {
      '@type': 'Offer',
      price: classType.price,
      priceCurrency: 'GBP',
      url: session.bookingUrl,
      availability: session.isSoldOut ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
  }));

  return (
    <div className="eu-page-top">
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Classes', path: '/classes' },
          { name: classType.name, path: `/classes/${classType.slug}` },
        ])}
      />
      {eventSchema.map((event) => (
        <JsonLd key={`${event.name}-${event.startDate}`} data={event} />
      ))}

      {/* Header */}
      <section className="eu-wrap pt-[clamp(20px,3vw,48px)]">
        <nav aria-label="Breadcrumb" className="eu-cap mb-6 flex flex-wrap items-center text-eu-sage md:mb-10">
          <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-eu-ink">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/classes" className="inline-flex min-h-[44px] items-center hover:text-eu-ink">Classes</Link>
          <span className="mx-2">/</span>
          <span className="text-eu-ink">{classType.name}</span>
        </nav>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="eu-rise space-y-8 lg:col-span-6">
            <div className="space-y-5">
              <p className="eu-cap eu-cap-num text-eu-green">Women-only · Edgware, North West London</p>
              <h1 className={H1}>{classType.name}</h1>
            </div>
            <p className="eu-lede">{classType.summary}</p>

            <dl className="flex flex-wrap gap-2 border-t border-[#1a260e]/15 pt-8">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="inline-flex min-h-[44px] flex-wrap items-baseline gap-x-2.5 gap-y-0.5 rounded-[22px] border border-[#1a260e]/20 px-4 py-2.5"
                >
                  <dt className="eu-cap text-eu-sage">{fact.label}</dt>
                  <dd className="font-serif text-[17px] leading-tight text-eu-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <PillLink href="/schedule" variant="ink" dot stretchMobile>
                View timetable
              </PillLink>
              <PillLink href="/packages" variant="line" stretchMobile className="!whitespace-normal text-center">
                Intro offer: 3 classes for £60
              </PillLink>
            </div>
          </div>

          <div className="eu-arch aspect-[4/5] w-full max-w-[560px] justify-self-center lg:col-span-5 lg:col-start-8">
            <Image
              src={classType.image.src}
              alt={classType.image.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1023px) 560px, 40vw"
            />
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className={`eu-wrap ${SECTION_TOP}`}>
        <div className="grid grid-cols-1 gap-12 border-t border-[#1a260e]/15 pt-[clamp(48px,5vw,72px)] lg:grid-cols-12 lg:gap-x-6">
          <div className="space-y-6 lg:col-span-7">
            <h2 className="eu-h2 !mb-8">
              What to <em>expect</em>
            </h2>
            {classType.expect.map((paragraph) => (
              <p key={paragraph} className="body-text">{paragraph}</p>
            ))}
          </div>

          <div className="space-y-10 self-start rounded-eu-md bg-eu-beige p-7 md:p-9 lg:col-span-4 lg:col-start-9">
            <div className="space-y-4">
              <h2 className="font-serif text-[28px] font-normal italic leading-[1.15] text-eu-ink">Good for</h2>
              <ul className="space-y-3">
                {classType.goodFor.map((item) => (
                  <li key={item} className={LIST_ITEM}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 border-t border-[#1a260e]/15 pt-8">
              <h2 className="font-serif text-[28px] font-normal italic leading-[1.15] text-eu-ink">What to bring</h2>
              <ul className="space-y-3">
                {classType.bring.map((item) => (
                  <li key={item} className={LIST_ITEM}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formats on the timetable */}
      {live.formats.length > 0 && (
        <section className={`eu-wrap ${SECTION_TOP}`}>
          <div className="space-y-10">
            <div className="max-w-3xl space-y-4">
              <h2 className={H2}>{classType.name} on the timetable</h2>
              <p className="body-text max-w-3xl">
                These are the {classType.name} classes currently running at Euforyc Studios.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-4">
              {live.formats.map((format) => (
                <article
                  key={format.title}
                  className="space-y-3 border-t border-[#1a260e]/15 pt-6 md:rounded-eu-md md:border md:p-9"
                >
                  <h3 className="font-serif text-[26px] font-normal leading-[1.15] text-eu-ink md:text-[30px]">{format.title}</h3>
                  {format.description && (
                    <p className="whitespace-pre-line text-[16px] leading-[1.7] text-eu-green">
                      {format.description}
                    </p>
                  )}
                  {format.instructors.length > 0 && (
                    <p className="eu-cap pt-2 text-eu-sage">
                      Taught by {format.instructors.join(', ')}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming sessions */}
      <section className={`eu-wrap ${SECTION_TOP}`}>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className={H2}>
              Next <em>sessions</em>
            </h2>
            <Link href="/schedule" className="eu-ulink self-start text-eu-ink md:self-auto">
              Full timetable <Arrow size={14} />
            </Link>
          </div>
          <UpcomingSessions
            renderedAt={renderedAt}
            sessions={nextSessions.map((session) => ({
              id: session.id,
              title: session.title,
              startTime: session.startTime,
              dateLabel: formatLondonDate(session.startTime),
              timeLabel: formatLondonTime(session.startTime),
              instructor: session.instructor?.name?.replace(/\s+/g, ' ').trim() || null,
              spotsAvailable: session.spotsAvailable,
              isSoldOut: session.isSoldOut,
              bookingUrl: session.bookingUrl,
            }))}
          />
        </div>
      </section>

      {/* Prices */}
      <section className="eu-on-dark mx-[clamp(10px,1.5vw,24px)] mt-[clamp(80px,10vw,150px)] rounded-eu-xl bg-eu-ink py-[clamp(72px,9vw,140px)] text-eu-cream">
        <div className="eu-wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-6">
          <div className="space-y-6 lg:col-span-7">
            <h2 className="eu-h2">Prices</h2>
            <p className="text-[17px] leading-[1.75] text-eu-beige md:text-[18px]">
              {isPrivate
                ? classType.covered
                : `A single ${classType.name} class is ${dropIn}. ${classType.covered}`}
            </p>
            {!isPrivate && (
              <p className="text-[17px] leading-[1.75] text-eu-beige md:text-[18px]">
                New to Euforyc? Try It All gives first-time clients 3 classes for £60, valid for 20 days from your first class.
              </p>
            )}
          </div>
          <div className="flex flex-col border-t border-[#fffcf2]/15 lg:col-span-4 lg:col-start-9">
            <Link href="/pricing" className={PRICE_LINK}>Full price list <Arrow /></Link>
            <Link href="/packages" className={PRICE_LINK}>Class packages <Arrow /></Link>
            <Link href="/memberships" className={PRICE_LINK}>Memberships <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {classReviews.length > 0 && (
        <section className={`eu-wrap ${SECTION_TOP}`}>
          <div className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <h2 className={H2}>What clients say about {classType.name}</h2>
              <p className="body-text max-w-3xl">
                {classReviews.length} written {classReviews.length === 1 ? 'review' : 'reviews'} from clients who took this class, left through our booking system after their session.
              </p>
            </div>
            <ReviewCards reviews={classReviews.slice(0, 6)} />
            <PillLink href="/reviews" variant="line">Read all reviews</PillLink>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className={`eu-wrap ${SECTION_TOP}`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-6">
          <h2 className={`${H2} lg:col-span-4`}>{classType.name} questions</h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-[#1a260e]/15">
              {classType.faqs.map((faq) => (
                <div key={faq.question} className="space-y-3 border-b border-[#1a260e]/15 py-7">
                  <h3 className="font-serif text-[22px] font-normal leading-[1.25] text-eu-ink md:text-[26px]">{faq.question}</h3>
                  <p className="body-text">{faq.answer}</p>
                </div>
              ))}
            </div>
            <Link href="/faq" className="eu-ulink mt-8 text-eu-ink">More questions answered <Arrow size={14} /></Link>
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className={`eu-wrap ${SECTION_TOP} pb-[clamp(80px,10vw,150px)]`}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-5 rounded-eu-lg bg-eu-beige p-7 md:p-12">
            <h2 className={H2_SMALL}>Where we are</h2>
            <p className="body-text">
              {STUDIO.name} is at {STUDIO.addressLine}. {STUDIO.transport.station}, and buses {STUDIO.transport.buses.join(', ')} stop nearby.
            </p>
            <p className="body-text">{POLICIES.womenOnly}</p>
            <Link href="/contact" className="eu-ulink text-eu-ink">Map and directions <Arrow size={14} /></Link>
          </div>
          <div className="space-y-5 rounded-eu-lg border border-[#1a260e]/15 p-7 md:p-12">
            <h2 className={H2_SMALL}>Other classes</h2>
            <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {otherClasses.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/classes/${other.slug}`}
                    className="group flex min-h-[56px] items-center justify-between gap-4 border-b border-[#1a260e]/15 py-3 font-serif text-[20px] font-normal leading-[1.25] text-eu-ink hover:text-eu-ink"
                  >
                    {other.name}
                    <span className="flex-none transition-transform duration-500 ease-eu group-hover:-rotate-45">
                      <Arrow size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
