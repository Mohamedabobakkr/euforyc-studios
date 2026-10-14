/**
 * ErrorState Component
 * Graceful error handling with Euforyc brand aesthetic
 */

import React from 'react';
import { AlertCircle, RefreshCcw, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import scheduleStyles from './schedule.module.css';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showContactSupport?: boolean;
  variant?: 'default' | 'compact' | 'inline';
}

export default function ErrorState({
  title = 'Unable to Load Data',
  message = "We're having trouble loading this information. Please try again in a moment.",
  onRetry,
  showContactSupport = true,
  variant = 'default',
}: ErrorStateProps) {
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-900">{title}</p>
          <p className="text-xs text-red-700 mt-1">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 hover:text-red-900 hover:bg-red-100 rounded-md transition-colors duration-200"
          >
            <RefreshCcw className="w-4 h-4" />
            Retry
          </button>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="rounded-xl p-8 bg-white border-2 border-[#1a260e]/10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="font-serif text-xl font-light text-[#1a260e] mb-2">{title}</h3>
        <p className="text-sm text-[#1a260e]/70 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a260e] text-[#fffcf2] rounded-lg hover:bg-[#1a260e]/90 transition-all duration-200 font-medium"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    );
  }

  // Default variant - full featured
  return (
    <div className={scheduleStyles.empty} role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button type="button" onClick={onRetry} className="eu-btn eu-btn--ink">
            <RefreshCcw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </button>
        )}
        <Link href="/" className="eu-btn eu-btn--line">
          <Home className="w-4 h-4" aria-hidden="true" />
          Go Home
        </Link>
      </div>

      {showContactSupport && (
        <p style={{ marginTop: 28 }}>
          Still having issues?{' '}
          <a href="mailto:euforyc@gmail.com" className="underline underline-offset-4">
            <Mail className="inline w-4 h-4 mr-1" aria-hidden="true" />
            Contact Support
          </a>
        </p>
      )}
    </div>
  );
}

/**
 * Network error specific component
 */
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Connection Issue"
      message="We're having trouble connecting to our servers. Please check your internet connection and try again."
      onRetry={onRetry}
      showContactSupport={false}
    />
  );
}

/**
 * Not found error component
 */
export function NotFoundError({ resourceType = 'content' }: { resourceType?: string }) {
  return (
    <ErrorState
      title="Not Found"
      message={`The ${resourceType} you're looking for doesn't exist or has been removed.`}
      showContactSupport={false}
    />
  );
}

/**
 * No data available component (not an error, just empty state)
 */
export function EmptyState({
  icon: Icon = AlertCircle,
  title = 'No Items Found',
  message = "There's nothing to display right now. Please check back later.",
  actionLabel,
  onAction,
}: {
  icon?: React.ElementType;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className={scheduleStyles.empty}>
      <Icon className="w-8 h-8 mx-auto mb-4 text-[#2a3a21]" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="eu-btn eu-btn--ink">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/**
 * Error boundary fallback component
 */
export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <ErrorState
      title="Something Went Wrong"
      message={
        process.env.NODE_ENV === 'development'
          ? error.message
          : "We've encountered an unexpected error. Our team has been notified."
      }
      onRetry={resetErrorBoundary}
      showContactSupport={true}
    />
  );
}
