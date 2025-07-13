'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen flex items-center justify-center bg-[#fffcf2]">
      <div className="text-center space-y-6 max-w-lg mx-auto px-4">
        <h1 className="font-serif text-4xl text-[#1a260e]">Something went wrong</h1>
        <p className="font-sans text-[#1a260e]/70">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block bg-[#1a260e] text-[#fffcf2] px-8 py-3 font-sans text-sm tracking-[0.1em] uppercase transition-all duration-500 hover:bg-[#1a260e]/90"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block border border-[#1a260e] text-[#1a260e] px-8 py-3 font-sans text-sm tracking-[0.1em] uppercase transition-all duration-500 hover:bg-[#1a260e] hover:text-[#fffcf2]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}