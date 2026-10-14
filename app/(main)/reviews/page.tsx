import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ReviewCards from '@/components/ReviewCards';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { STUDIO, breadcrumbSchema, pageMetadata } from '@/lib/site';
import { getReviews, reviewsFor } from '@/lib/studio-data';
import { classTypeForTitle } from '@/lib/classes';

// Reviews refresh every 6 hours
export const revalidate = 21600;

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
    <div className="pt-32">
      <JsonLd data={breadcrumbSchema([{ name: 'Reviews', path: '/reviews' }])} />

      <section className="section-padding pb-12 bg-[#fffcf2]">
        <div className="container-width text-center space-y-6">
          <p className="tagline">In our clients’ words</p>
          <h1 className="heading-primary">Reviews</h1>
          <p className="body-text max-w-3xl mx-auto">
            {total > 0
              ? `Clients have left ${total} written reviews of classes at ${STUDIO.name}. `
              : ''}
            Every review here was written by a client through Momence, our booking system, after attending a class. They are shown as written, grouped by class, with the most recent first. Reviewers are named by first name and last initial.
          </p>
        </div>
      </section>

      {sections.length === 0 ? (
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width text-center">
            <p className="body-text">Reviews are loading. Please check back shortly.</p>
          </div>
        </section>
      ) : (
        sections.map(({ classType, reviews: classReviews }) => (
          <section key={classType.slug} className="section-padding bg-[#fffcf2]">
            <div className="container-width space-y-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="heading-secondary">{classType.name} reviews</h2>
                  <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#1a260e]/50">
                    {classReviews.length} written {classReviews.length === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
                <Link href={`/classes/${classType.slug}`} className="btn-minimal">
                  About {classType.name}
                </Link>
              </div>
              <ReviewCards reviews={classReviews} />
            </div>
          </section>
        ))
      )}

      {otherReviews.length > 0 && (
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width space-y-12">
            <div className="space-y-2">
              <h2 className="heading-secondary">Other sessions and events</h2>
              <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#1a260e]/50">
                {otherReviews.length} written {otherReviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
            <ReviewCards reviews={otherReviews} />
          </div>
        </section>
      )}

      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width max-w-3xl text-center space-y-8">
          <h2 className="heading-secondary text-[#fffcf2]">Come and see for yourself</h2>
          <p className="font-sans text-base md:text-lg font-light leading-relaxed text-[#fffcf2]/80">
            First-time clients can try any three group classes for £60.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-block bg-[#fffcf2] text-[#1a260e] px-10 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#fffcf2]/90"
            >
              Intro offer
            </Link>
            <Link
              href="/classes"
              className="inline-block border border-[#fffcf2] text-[#fffcf2] px-10 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#fffcf2] hover:text-[#1a260e]"
            >
              Explore classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
