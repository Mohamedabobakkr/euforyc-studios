import type { CSSProperties } from 'react';

import { FLASH_STEPS, FLASH_VIP_LIMIT, type FlashPhase } from './config';
import styles from './flash.module.css';

const ORDER: FlashPhase[] = ['teaser', 'vip', 'public', 'ended'];

/**
 * The day in three steps: 12:00, 18:00, 23:59. The current step is lit, past
 * steps are struck through, and it moves on by itself as the phase changes.
 */
export default function FlashTimeline({ phase, soldOutVip }: { phase: FlashPhase | null; soldOutVip: boolean }) {
  const reached = phase ? ORDER.indexOf(phase) : 0;

  return (
    <ol
      className={`${styles.rail} ${styles.settle}`}
      style={{ '--settle': 1 } as CSSProperties}
      data-flash-settle
      aria-label="How the day runs"
    >
      {FLASH_STEPS.map((step, index) => {
        const position = index + 1;
        const status = position < reached ? 'past' : position === reached ? 'now' : position === reached + 1 ? 'next' : 'later';
        const detail = step.phase === 'vip' && soldOutVip ? `All ${FLASH_VIP_LIMIT} gone` : step.detail;

        return (
          <li
            key={step.time}
            className={`${styles.step} ${styles[`step_${status}`]}`}
            aria-current={status === 'now' ? 'step' : undefined}
          >
            <span className={styles.stepDot} aria-hidden="true" />
            <span className={styles.stepTime}>{step.time}</span>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepDetail}>{detail}</span>
            {status === 'past' && <span className="eu-sr-only"> (passed)</span>}
            {status === 'now' && <span className="eu-sr-only"> (now)</span>}
          </li>
        );
      })}
    </ol>
  );
}
