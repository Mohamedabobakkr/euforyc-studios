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
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <li key={review.id} className="flex">
          <figure className="flex h-full w-full flex-col rounded-eu-md bg-eu-beige p-7 md:p-8">
            <p
              className="eu-stars text-eu-ink"
              role="img"
              aria-label={`Rated ${review.grade} out of 5`}
            >
              {'★'.repeat(review.grade)}
            </p>
            <blockquote className="mt-5 flex-1 font-serif text-[18px] leading-[1.55] text-eu-ink md:text-[19px]">
              “{review.comment}”
            </blockquote>
            <figcaption className="mt-7 border-t border-[#1a260e]/15 pt-5">
              <span className="block font-serif text-[19px] text-eu-ink">{review.reviewerName}</span>
              <span className="mt-1.5 block font-sans text-[11.5px] uppercase leading-[1.5] tracking-[0.14em] text-eu-sage">
                {reviewContext(review)}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
