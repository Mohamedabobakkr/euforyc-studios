/**
 * Black Friday landing page: "One more, on us". The Meta ads land here.
 *
 * The offer itself (dates, extra classes, checkout links) is in
 * components/black-friday/offer.ts. The reviews are rendered here on the
 * server from Momence, the same block as /offers.
 */
import JsonLd from '@/components/JsonLd';
import MomenceReviews from '@/components/MomenceReviews';
import ReviewDeck from '@/components/home/ReviewDeck';
import { deckReviews, reviewScore } from '@/components/home/data';
import reviewStyles from '@/components/home/reviews.module.css';
import {
  BF_END_DATE,
  BF_FAQS,
  BF_HAS_PLACEHOLDERS,
  BF_LINE,
  BF_MAX_FREE_CLASSES,
  BF_BONUS_MONTHS,
  BF_NAME,
  BF_PATH,
  HIDE_IF_ENDED,
  blackFridayEnded,
} from '@/components/black-friday/offer';
import { breadcrumbSchema, pageMetadata } from '@/lib/site';
import { getReviews } from '@/lib/studio-data';
import BlackFridayContent from './BlackFridayContent';

// Rebuilt every five minutes, so the page's HTML switches to "offer ended" on
// its own soon after the end time, with no redeploy. In the browser the switch
// is immediate (BlackFridayContent checks the clock itself).
export const revalidate = 300;

export const metadata = pageMetadata({
  title: `Black Friday: ${BF_NAME}`,
  description: `Black Friday at Euforyc Studios, Edgware. ${BF_LINE} Extra classes every month for your first ${BF_BONUS_MONTHS} months of a Euforyc Membership, up to ${BF_MAX_FREE_CLASSES} free classes, and 1 extra class with eligible class packages. Ends ${BF_END_DATE}.`,
  path: BF_PATH,
  // Not indexed until every checkout link is in place
  noindex: BF_HAS_PLACEHOLDERS,
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: BF_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default async function BlackFridayPage() {
  const ended = blackFridayEnded();
  const { reviews } = await getReviews();
  const score = reviewScore(reviews);
  const deck = deckReviews(reviews);

  // Same reviews block as /offers
  const reviewsBlock =
    deck.length > 0 && score ? (
      <ReviewDeck
        reviews={deck}
        intro={
          <div className={`${reviewStyles.score} ${reviewStyles.scoreFirst}`}>
            <span className={reviewStyles.scoreBig}>{score.average}</span>
            <span className={reviewStyles.scoreMeta}>
              <span className="eu-stars" role="img" aria-label={`Average rating ${score.average} out of 5`}>
                ★★★★★
              </span>{' '}
              <br />
              {score.count} written reviews on Momence
              {score.allFiveStars ? ' — every single one five stars.' : '.'}
            </span>
          </div>
        }
      />
    ) : (
      <div className="eu-wrap">
        <MomenceReviews />
      </div>
    );

  return (
    <>
      {/* Hides the offer before the page is drawn if it has ended since this HTML was built (.live in black-friday.module.css) */}
      <script dangerouslySetInnerHTML={{ __html: HIDE_IF_ENDED }} />
      <JsonLd data={breadcrumbSchema([{ name: 'Black Friday', path: BF_PATH }])} />
      {!ended && <JsonLd data={faqSchema} />}
      {/* Read by the site's pixel code (app/(main)/layout.tsx) for the ViewContent event */}
      <div
        id="page-content-meta"
        hidden
        data-content-name={`Black Friday: ${BF_NAME}`}
        data-content-type="offer"
        data-content-category={BF_PATH}
      />
      <BlackFridayContent serverEnded={ended} reviews={reviewsBlock} />
    </>
  );
}
