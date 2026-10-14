import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import ReviewCards from '@/components/ReviewCards';
import UpcomingSessions from '@/components/UpcomingSessions';
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
    <div className="pt-32">
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
      <section className="section-padding pb-12 bg-[#fffcf2]">
        <div className="container-width">
          <nav aria-label="Breadcrumb" className="font-sans text-xs tracking-[0.12em] uppercase text-[#1a260e]/50 mb-10">
            <Link href="/" className="hover:text-[#1a260e]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/classes" className="hover:text-[#1a260e]">Classes</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1a260e]/80">{classType.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="tagline">Women-only · Edgware, North West London</p>
                <h1 className="heading-primary">{classType.name}</h1>
              </div>
              <p className="body-text">{classType.summary}</p>

              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 border-t border-[#1a260e]/10 pt-8">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#1a260e]/50">{fact.label}</dt>
                    <dd className="font-serif text-xl text-[#1a260e] mt-1">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/schedule" className="btn-primary text-center">
                  View timetable
                </Link>
                <Link href="/packages" className="btn-secondary text-center">
                  Intro offer: 3 classes for £60
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-[#1a260e]/5">
              <Image
                src={classType.image.src}
                alt={classType.image.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="heading-secondary">What to expect</h2>
            {classType.expect.map((paragraph) => (
              <p key={paragraph} className="body-text">{paragraph}</p>
            ))}
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="heading-tertiary">Good for</h2>
              <ul className="space-y-2">
                {classType.goodFor.map((item) => (
                  <li key={item} className="font-sans text-base font-light text-[#1a260e]/80 leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="heading-tertiary">What to bring</h2>
              <ul className="space-y-2">
                {classType.bring.map((item) => (
                  <li key={item} className="font-sans text-base font-light text-[#1a260e]/80 leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formats on the timetable */}
      {live.formats.length > 0 && (
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width space-y-10">
            <div className="space-y-3">
              <h2 className="heading-secondary">{classType.name} on the timetable</h2>
              <p className="body-text max-w-3xl">
                These are the {classType.name} classes currently running at Euforyc Studios.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {live.formats.map((format) => (
                <article key={format.title} className="border-t border-[#1a260e]/10 pt-6 space-y-3">
                  <h3 className="font-serif text-2xl font-light text-[#1a260e]">{format.title}</h3>
                  {format.description && (
                    <p className="font-sans text-base font-light leading-relaxed text-[#1a260e]/80 whitespace-pre-line">
                      {format.description}
                    </p>
                  )}
                  {format.instructors.length > 0 && (
                    <p className="font-sans text-[11px] tracking-[0.12em] uppercase text-[#1a260e]/50">
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
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="heading-secondary">Next sessions</h2>
            <Link href="/schedule" className="btn-minimal">
              Full timetable
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
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="heading-secondary text-[#fffcf2]">Prices</h2>
            <p className="font-sans text-base md:text-lg font-light leading-relaxed text-[#fffcf2]/80">
              {isPrivate
                ? classType.covered
                : `A single ${classType.name} class is ${dropIn}. ${classType.covered}`}
            </p>
            {!isPrivate && (
              <p className="font-sans text-base md:text-lg font-light leading-relaxed text-[#fffcf2]/80">
                New to Euforyc? Try It All gives first-time clients 3 classes for £60, valid for 20 days from your first class.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 lg:items-end lg:justify-center">
            <Link href="/pricing" className="btn-minimal text-[#fffcf2]">Full price list</Link>
            <Link href="/packages" className="btn-minimal text-[#fffcf2]">Class packages</Link>
            <Link href="/memberships" className="btn-minimal text-[#fffcf2]">Memberships</Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {classReviews.length > 0 && (
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width space-y-12">
            <div className="space-y-3">
              <h2 className="heading-secondary">What clients say about {classType.name}</h2>
              <p className="body-text max-w-3xl">
                {classReviews.length} written {classReviews.length === 1 ? 'review' : 'reviews'} from clients who took this class, left through our booking system after their session.
              </p>
            </div>
            <ReviewCards reviews={classReviews.slice(0, 6)} />
            <Link href="/reviews" className="btn-minimal">Read all reviews</Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width max-w-4xl space-y-10">
          <h2 className="heading-secondary">{classType.name} questions</h2>
          <div className="space-y-8">
            {classType.faqs.map((faq) => (
              <div key={faq.question} className="border-t border-[#1a260e]/10 pt-6 space-y-3">
                <h3 className="font-serif text-xl md:text-2xl font-light text-[#1a260e]">{faq.question}</h3>
                <p className="body-text">{faq.answer}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="btn-minimal">More questions answered</Link>
        </div>
      </section>

      {/* Getting here */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-5">
            <h2 className="heading-secondary">Where we are</h2>
            <p className="body-text">
              {STUDIO.name} is at {STUDIO.addressLine}. {STUDIO.transport.station}, and buses {STUDIO.transport.buses.join(', ')} stop nearby.
            </p>
            <p className="body-text">{POLICIES.womenOnly}</p>
            <Link href="/contact" className="btn-minimal">Map and directions</Link>
          </div>
          <div className="space-y-5">
            <h2 className="heading-secondary">Other classes</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {otherClasses.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/classes/${other.slug}`}
                    className="font-serif text-xl font-light text-[#1a260e] hover:opacity-70 transition-opacity"
                  >
                    {other.name}
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
