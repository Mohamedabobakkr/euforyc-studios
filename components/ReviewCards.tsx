import type { StudioReview } from '@/lib/studio-data';

function reviewContext(review: StudioReview): string {
  const date = new Date(review.createdAt).toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    month: 'long',
    year: 'numeric',
  });
  const parts = [];
  if (review.sessionName) {
    parts.push(review.teacherName ? `${review.sessionName} with ${review.teacherName}` : review.sessionName);
  }
  parts.push(date);
  return parts.join(' · ');
}

/**
 * Client reviews rendered as plain HTML, so they are readable without
 * JavaScript. Reviews come from Momence, where clients leave them after class.
 */
export default function ReviewCards({ reviews }: { reviews: StudioReview[] }) {
  if (reviews.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
      {reviews.map((review) => (
        <li key={review.id}>
          <figure className="h-full flex flex-col border-t border-[#1a260e]/10 pt-6">
            <p
              className="font-sans text-xs tracking-[0.3em] text-[#1a260e]"
              role="img"
              aria-label={`Rated ${review.grade} out of 5`}
            >
              {'★'.repeat(review.grade)}
            </p>
            <blockquote className="font-sans text-base font-light leading-relaxed text-[#1a260e]/80 mt-4 flex-1">
              “{review.comment}”
            </blockquote>
            <figcaption className="mt-6">
              <span className="block font-serif text-lg text-[#1a260e]">{review.reviewerName}</span>
              <span className="block font-sans text-[11px] tracking-[0.12em] uppercase text-[#1a260e]/50 mt-1">
                {reviewContext(review)}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
