import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ReviewCards from '@/components/ReviewCards';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { STUDIO, breadcrumbSchema, pageMetadata } from '@/lib/site';
import { getReviews, reviewsFor } from '@/lib/studio-data';
import { classTypeForTitle } from '@/lib/classes';

// Reviews refresh every 6 hours
export const revalidate = 21600;

const H2 = 'font-serif text-[clamp(34px,4vw,60px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-ink';
const SECTION_TOP = 'pt-[clamp(56px,7vw,110px)]';

export const metadata = pageMetadata({
  title: 'Client Reviews | Women-Only Pilates Studio in Edgware',
  description:
    'Read what clients say about Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Barre, Belly Dance and 1:1 private sessions at Euforyc Studios in Edgware, North West London. Reviews are left by clients after class.',
  path: '/reviews',
});

export default async function ReviewsPage() {
  const { reviews, total } = await getReviews();

  // Every written review from the Momence feed appears once: grouped by class,
  // then any left for other sessions
  const sections = ORDERED_CLASS_TYPES.map((classType) => ({
    classType,
    reviews: reviewsFor(classType, reviews),
  })).filter((section) => section.reviews.length > 0);
  const otherReviews = reviews.filter(
    (review) => !review.sessionName || !classTypeForTitle(review.sessionName)
  );

  return (
    <div className="eu-page-top">
      <JsonLd data={breadcrumbSchema([{ name: 'Reviews', path: '/reviews' }])} />

      <section className="eu-wrap pb-[clamp(24px,3vw,40px)] pt-[clamp(48px,6vw,96px)]">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="eu-rise lg:col-span-6">
            <p className="eu-cap eu-cap-num text-eu-green">In our clients’ words</p>
            <h1 className="eu-h1 !mt-6">Reviews</h1>
          </div>
          <p className="body-text eu-rise lg:col-span-5 lg:col-start-8">
            {total > 0
              ? `Clients have left ${total} written reviews of classes at ${STUDIO.name}. `
              : ''}
            Every review here was written by a client through Momence, our booking system, after attending a class. They are shown as written, grouped by class, with the most recent first. Reviewers are named by first name and last initial.
          </p>
        </div>
      </section>

      {sections.length === 0 ? (
        <section className={`eu-wrap ${SECTION_TOP}`}>
          <div className="rounded-eu-lg bg-eu-beige px-6 py-16 text-center">
            <p className="body-text">Reviews are loading. Please check back shortly.</p>
          </div>
        </section>
      ) : (
        sections.map(({ classType, reviews: classReviews }) => (
          <section key={classType.slug} className={`eu-wrap ${SECTION_TOP}`}>
            <div className="space-y-10 border-t border-[#1a260e]/15 pt-[clamp(32px,4vw,56px)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <h2 className={H2}>{classType.name} reviews</h2>
                  <p className="eu-cap text-eu-sage">
                    {classReviews.length} written {classReviews.length === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
                <Link href={`/classes/${classType.slug}`} className="eu-ulink self-start text-eu-ink md:self-auto">
                  About {classType.name} <Arrow size={14} />
                </Link>
              </div>
              <ReviewCards reviews={classReviews} />
            </div>
          </section>
        ))
      )}

      {otherReviews.length > 0 && (
        <section className={`eu-wrap ${SECTION_TOP}`}>
          <div className="space-y-10 border-t border-[#1a260e]/15 pt-[clamp(32px,4vw,56px)]">
            <div className="space-y-3">
              <h2 className={H2}>Other sessions and events</h2>
              <p className="eu-cap text-eu-sage">
                {otherReviews.length} written {otherReviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
            <ReviewCards reviews={otherReviews} />
          </div>
        </section>
      )}

      <section className="eu-on-dark mx-[clamp(10px,1.5vw,24px)] mb-[clamp(56px,7vw,110px)] mt-[clamp(80px,10vw,150px)] rounded-eu-xl bg-eu-ink py-[clamp(72px,9vw,140px)] text-eu-cream">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="eu-h2">
            Come and see for <em>yourself</em>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-[1.75] text-eu-beige md:text-[18px]">
            First-time clients can try any three group classes for £60.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <PillLink href="/packages" variant="cream" dot stretchMobile>
              Intro offer
            </PillLink>
            <PillLink href="/classes" variant="ghost" stretchMobile>
              Explore classes
            </PillLink>
          </div>
        </div>
      </section>
    </div>
  );
}
