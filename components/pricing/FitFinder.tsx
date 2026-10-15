'use client';

import { useState } from 'react';
import PillLink from '@/components/euforyc/PillLink';
import { MEMBERSHIPS, membershipTracking } from './plans';
import styles from './pricing.module.css';

const WEEKS_A_MONTH = 4;

const money = (amount: number) => `£${amount.toFixed(2).replace(/\.00$/, '')}`;

/**
 * "Find your fit": classes per week → the membership that covers it, the
 * price per class and the monthly saving against single drop-in classes.
 */
export default function FitFinder({ dropIn }: { dropIn: number }) {
  const [perWeek, setPerWeek] = useState(2);

  const perMonth = perWeek * WEEKS_A_MONTH;
  const plan =
    MEMBERSHIPS.find((membership) => membership.classes !== null && perMonth <= membership.classes) ??
    MEMBERSHIPS[MEMBERSHIPS.length - 1];
  const saving = Math.max(0, perMonth * dropIn - plan.price);

  return (
    <section className={`${styles.finder} eu-rv`} aria-labelledby="fit-title">
      <div className={styles.fdL}>
        <div className="eu-cap" style={{ color: '#2a3a21' }}>
          Find your fit
        </div>
        <h2 id="fit-title">
          How often do you{' '}
          <br />
          want to <em>move</em>?
        </h2>
        <div className={styles.freq} role="group" aria-label="Classes per week">
          {[1, 2, 3, 4, 5].map((count) => (
            <button
              key={count}
              type="button"
              className={styles.fq}
              aria-pressed={count === perWeek}
              aria-label={`${count} ${count === 1 ? 'class' : 'classes'} a week`}
              onClick={() => setPerWeek(count)}
            >
              {count}×
            </button>
          ))}
        </div>
        <div className="eu-cap" style={{ marginTop: 14, color: '#3d4a33' }}>
          Classes per week
        </div>
        <p className={styles.fdNote}>
          Based on four weeks a month and the £{dropIn} single-class price for Reformer, Hot and Red Light classes.
        </p>
      </div>

      <div className={`${styles.fdR} eu-on-dark`} aria-live="polite">
        <div key={plan.name} className={styles.swap}>
          <div className="eu-cap" style={{ color: '#F5F0E8' }}>
            Your fit
          </div>
          <div className={styles.fdPlan}>{plan.name}</div>
          <div className={styles.fdPrice}>
            <span className={styles.big}>£{plan.price}</span>
            <span>/ month</span>
          </div>
        </div>
        <div className={styles.fdStats}>
          <div>
            <div className={styles.v}>{money(plan.price / perMonth)}</div>
            <div className={styles.l}>per class</div>
          </div>
          <div>
            <div className={styles.v}>£{saving}</div>
            <div className={styles.l}>saved a month vs single classes</div>
          </div>
        </div>
        <PillLink
          href={plan.url}
          variant="cream"
          dot
          target="_blank"
          rel="noopener noreferrer"
          style={{ alignSelf: 'flex-start' }}
          {...membershipTracking(plan, '/packages-memberships/find-your-fit')}
        >
          Join {plan.name}
        </PillLink>
      </div>
    </section>
  );
}
