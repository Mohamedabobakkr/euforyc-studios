import Image from 'next/image';
import Link from 'next/link';
import PillLink from '@/components/euforyc/PillLink';
import Arrow from '@/components/euforyc/Arrow';
import FitFinder from '@/components/pricing/FitFinder';
import PricingTabs from '@/components/pricing/PricingTabs';
import PromoBanner from '@/components/pricing/PromoBanner';
import { MEMBERSHIPS, membershipTracking } from '@/components/pricing/plans';
import styles from '@/components/pricing/pricing.module.css';
import { getClassType } from '@/lib/classes';
import { PRICING, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Packages & Memberships',
  description: 'Compare flexible class packages with monthly memberships at Euforyc Studios in Edgware. Packages from £105 with no contract, memberships from £90 a month.',
  path: '/packages-memberships',
});

const roman = ['i.', 'ii.', 'iii.', 'iv.', 'v.'];

export default function PackagesMemberships() {
  const unlimited = MEMBERSHIPS[MEMBERSHIPS.length - 1];
  const privateFor = getClassType('private-reformer-pilates')?.goodFor ?? [];

  return (
    <div className="eu-page-top">
      <div className="eu-wrap">
        {/* Header */}
        <section className={styles.hero}>
          <div className={`${styles.heroL} eu-fade-in`}>
            <div className="eu-cap" style={{ color: '#2a3a21' }}>
              Pricing
            </div>
            <h1 className={styles.h1}>
              Packages &amp;{' '}
              <br />
              <em>Memberships</em>
            </h1>
          </div>
          <div className={`${styles.heroR} eu-fade-in`} style={{ animationDelay: '.15s' }}>
            <p>
              Choose the perfect option for your fitness journey. Select from flexible class packages
              or ongoing membership contracts designed to support your long-term wellness goals.
            </p>
          </div>
        </section>

        <PromoBanner />

        <FitFinder dropIn={PRICING.dropIn.standard} />

        <PricingTabs
          packageNote="All group classes · no contract · valid 30 days from first class"
          moveNote="Sculpt Mat Pilates & Belly Dance · mix and match · valid 30 days"
          privateFor={privateFor}
          membershipNote={[
            '6-month minimum term, then monthly rolling',
            'Credits work across the whole group timetable',
            'Unused credits don’t roll over',
            'Excludes 1-1 privates, massages, treatments, workshops and events, except where listed as an Unlimited benefit',
          ]}
        />

        {/* Euforyc Unlimited */}
        <section className={`${styles.unl} eu-on-dark eu-rv`} aria-labelledby="unlimited-title">
          <div className={styles.unlImg}>
            <Image src="/totebag.jpg" alt="The Euforyc Studios tote bag" fill sizes="(max-width: 1000px) 100vw, 45vw" />
          </div>
          <div className={styles.unlIn}>
            <div className="eu-cap" style={{ color: '#F5F0E8' }}>
              {unlimited.name} · £{unlimited.price} / month
            </div>
            <h2 id="unlimited-title" className="eu-h2" style={{ scrollMarginTop: 'calc(var(--eu-header-space) + 120px)' }}>
              The complete{' '}
              <br />
              Euforyc <em>experience</em>
            </h2>
            <ul className={styles.perks}>
              {unlimited.features.map((feature, i) => (
                <li key={feature}>
                  <span className={styles.k} aria-hidden="true">
                    {['i.', 'ii.', 'iii.', 'iv.', 'v.', 'vi.', 'vii.', 'viii.', 'ix.', 'x.', 'xi.'][i]}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {unlimited.note && <p className={styles.unlNote}>{unlimited.note}</p>}
            <PillLink
              href={unlimited.url}
              variant="cream"
              dot
              target="_blank"
              rel="noopener noreferrer"
              {...membershipTracking(unlimited, '/packages-memberships/unlimited')}
            >
              Go Unlimited
            </PillLink>
          </div>
        </section>

        {/* Package and membership pages */}
        <div className={styles.details}>
          <Link href="/packages" className={`${styles.detail} eu-rv`}>
            <h2>Class Packages</h2>
            <p>
              Flexible pay-as-you-go packages perfect for those who want to try different classes
              or have varying schedules.
            </p>
            <ul>
              <li>30-day validity from first class</li>
              <li>No long-term commitment</li>
              <li>Perfect for beginners or occasional visitors</li>
              <li>Mix and match class types</li>
            </ul>
            <span className="eu-cap" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              View Packages <Arrow size={14} />
            </span>
          </Link>
          <Link href="/memberships" className={`${styles.detail} ${styles.detailDark} eu-on-dark eu-rv`}>
            <span className={styles.detailNew}>NEW</span>
            <h2>
              Euforyc <em>Membership</em>
            </h2>
            <p>
              One monthly membership for the whole Euforyc timetable, from £90/month.
              Euforyc Unlimited is our best value, with exclusive perks.
            </p>
            <ul>
              <li>Credits work across every group class</li>
              <li>Better value per class, from £20</li>
              <li>6-month minimum, then monthly rolling</li>
              <li>Unlimited: priority booking, monthly massage &amp; more</li>
            </ul>
            <span className="eu-cap" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              View Memberships <Arrow size={14} />
            </span>
          </Link>
        </div>

        {/* Comparison */}
        <section className={styles.cmp} aria-labelledby="compare-title">
          <div className={`${styles.cmpHead} eu-rv`}>
            <h2 id="compare-title" className="eu-h2">
              Which Option Is <em>Right</em> For You?
            </h2>
            <p className="eu-lede">Compare our options to find the perfect fit for your fitness journey</p>
          </div>
          <div className={`${styles.cmpC} eu-rv`}>
            <h3>Choose Packages If:</h3>
            <ul>
              {[
                "You're new to Pilates",
                'You have an irregular schedule',
                'You prefer no long-term commitment',
                'You want to try different class types',
              ].map((line, i) => (
                <li key={line}>
                  <span aria-hidden="true">{roman[i]}</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.cmpC} ${styles.cmpDark} eu-on-dark eu-rv`}>
            <h3>Choose Memberships If:</h3>
            <ul>
              {[
                'You attend classes regularly (2+ times/week)',
                'You want the best value per class',
                'You want to mix Reformer, Hot Pilates, Barre & more',
                'You want Unlimited perks like priority booking',
                "You're committed to your fitness journey",
              ].map((line, i) => (
                <li key={line}>
                  <span aria-hidden="true">{roman[i]}</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Help */}
        <section className={`${styles.help} eu-rv`} aria-labelledby="help-title">
          <h2 id="help-title" className="eu-h2">
            Still Not <em>Sure</em>?
          </h2>
          <p>Our team is here to help you choose the perfect option for your fitness goals and schedule.</p>
          <div className={styles.helpCtas}>
            <PillLink href="/contact" variant="ink" dot stretchMobile>
              Get Personalized Advice
            </PillLink>
            <PillLink href="/book" variant="line" stretchMobile>
              Book a Trial Class
            </PillLink>
          </div>
        </section>
      </div>
    </div>
  );
}
