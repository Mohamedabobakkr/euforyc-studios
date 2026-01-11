/**
 * ErrorState Component
 * Graceful error handling with Euforyc brand aesthetic
 */

import React from 'react';
import { AlertCircle, RefreshCcw, Home, Mail } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        {/* Error icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-50 to-orange-50 rounded-full mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-orange-100/50 rounded-full animate-ping" />
          <AlertCircle className="w-10 h-10 text-red-600 relative z-10" />
        </div>

        {/* Error title */}
        <h2 className="font-serif text-3xl font-light text-[#1a260e] mb-3">{title}</h2>

        {/* Error message */}
        <p className="text-[#1a260e]/70 mb-8 leading-relaxed">{message}</p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#1a260e] text-[#fffcf2] rounded-xl hover:bg-[#1a260e]/90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-medium w-full sm:w-auto"
            >
              <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </button>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#1a260e]/20 text-[#1a260e] rounded-xl hover:border-[#1a260e]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-medium w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Contact support */}
        {showContactSupport && (
          <div className="mt-8 pt-8 border-t border-[#1a260e]/10">
            <p className="text-sm text-[#1a260e]/60 mb-3">Still having issues?</p>
            <a
              href="mailto:info@euforyc.co.uk"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1a260e] hover:text-[#1a260e]/70 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </a>
          </div>
        )}
      </div>
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
    <div className="min-h-[40vh] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1a260e]/5 rounded-full mb-6">
          <Icon className="w-10 h-10 text-[#1a260e]/40" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-light text-[#1a260e] mb-3">{title}</h3>

        {/* Message */}
        <p className="text-[#1a260e]/60 mb-6">{message}</p>

        {/* Optional action */}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a260e] text-[#fffcf2] rounded-xl hover:bg-[#1a260e]/90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-medium"
          >
            {actionLabel}
          </button>
        )}
      </div>
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
