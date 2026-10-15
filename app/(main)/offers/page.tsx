/**
 * Special Offers page. The page itself is interactive (OffersContent); the
 * reviews are rendered here on the server from Momence, as on the homepage.
 */
import MomenceReviews from '@/components/MomenceReviews';
import ReviewDeck from '@/components/home/ReviewDeck';
import { deckReviews, reviewScore } from '@/components/home/data';
import reviewStyles from '@/components/home/reviews.module.css';
import { getReviews } from '@/lib/studio-data';
import OffersContent from './OffersContent';

// Reviews refresh every 5 minutes, like the homepage
export const revalidate = 300;

// No Suspense boundary: nothing here suspends (?offer= is read after mount),
// and a boundary made React stream the whole page hidden until a script ran
export default async function OffersPage() {
  const { reviews } = await getReviews();
  const score = reviewScore(reviews);
  const deck = deckReviews(reviews);

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

  return <OffersContent reviews={reviewsBlock} />;
}
