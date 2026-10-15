'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Arrow from '@/components/euforyc/Arrow';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="eu-page-top flex min-h-screen items-center justify-center bg-eu-cream">
      <div className="mx-auto max-w-xl space-y-6 px-5 py-[clamp(64px,8vw,120px)] text-center">
        <h1 className="font-serif text-[clamp(44px,5.6vw,80px)] font-normal leading-[1] tracking-[-0.025em] text-eu-ink">Something went wrong</h1>
        <p className="eu-lede">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
          <button
            onClick={reset}
            className="eu-btn eu-btn--ink eu-btn--stretch-mobile"
          >
            Try Again
            <span className="eu-btn__dot">
              <Arrow />
            </span>
          </button>
          <Link
            href="/"
            className="eu-btn eu-btn--line eu-btn--stretch-mobile"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
