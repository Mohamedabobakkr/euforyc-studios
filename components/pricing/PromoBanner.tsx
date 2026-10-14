'use client';

import { useEffect, useState } from 'react';
import { PROMO_CODE, PROMO_ENDS_AT } from './plans';
import styles from './pricing.module.css';

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** EUFORYC5 banner. Disappears once the offer's deadline has passed. */
export default function PromoBanner() {
  const [active, setActive] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActive(Date.now() < PROMO_ENDS_AT);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timeout);
  }, [copied]);

  if (!active) return null;

  return (
    <div className={`${styles.promo} eu-on-dark eu-fade-in`} style={{ animationDelay: '.25s' }}>
      <p className={styles.promoText} style={{ margin: 0 }}>
        <strong>5% off your first month</strong>
        of any Euforyc Membership — enter the code at checkout. Until 30 November 2026.
      </p>
      <button
        type="button"
        className={styles.code}
        onClick={async () => setCopied(await copyToClipboard(PROMO_CODE))}
      >
        <span className="eu-sr-only">Copy code </span>
        <span aria-live="polite">{copied ? 'COPIED' : PROMO_CODE}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
        </svg>
      </button>
    </div>
  );
}
