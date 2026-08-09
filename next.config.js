/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for better performance with SSR/ISR
  // output: 'export', // Comment this out for production

  // Disable X-Powered-By header
  poweredByHeader: false,

  // Image optimization — restrict to known trusted domains only
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.squarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'squarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'items-images-production.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'euforyc.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.euforyc.co.uk',
      },
      {
        protocol: 'https',
        hostname: '*.momence.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://cdn.vercel-insights.com https://va.vercel-scripts.com https://bzrcdn.openai.com https://momence.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http://localhost:3000",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://euforyc.co.uk https://www.euforyc.co.uk https://capig.euforyc.co.uk https://connect.squareup.com https://web.squarecdn.com https://momence.com https://api.momence.com https://graph.facebook.com https://*.google-analytics.com https://*.analytics.google.com https://cdn.vercel-insights.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://bzr.openai.com https://bzrcdn.openai.com",
              "frame-src 'self' https://connect.squareup.com https://web.squarecdn.com https://momence.com https://www.facebook.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://www.facebook.com",
              "frame-ancestors 'self'",
            ].join('; ')
          }
        ]
      },
      {
        // Prevent caching of API responses
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
