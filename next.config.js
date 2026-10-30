const fs = require('fs');
const path = require('path');
const imageWidths = require('./lib/image-widths.json');

// Photos are pre-sized at build time (tools/static-images.mjs, in prebuild) and served as static files, so
// nothing goes through Vercel's image optimiser (/_next/image). The version is a hash of every source photo,
// put on each image URL so /static's one-year cache never serves an old photo.
const IMG_VERSION = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'public/static/img/version.json'), 'utf8')).version;
  } catch {
    return '';
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for better performance with SSR/ISR
  // output: 'export', // Comment this out for production

  // Disable X-Powered-By header
  poweredByHeader: false,

  // Stop `next dev` generating AGENTS.md / CLAUDE.md in the repo root
  agentRules: false,

  env: { NEXT_PUBLIC_IMG_V: IMG_VERSION },

  // next/image reads the pre-built files (lib/imageLoader.ts) instead of the optimiser. Same widths as before,
  // from lib/image-widths.json, which the build script reads too. External photos (Square, on the Sips pages)
  // are plain <img> tags and load from their own servers, as before.
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    deviceSizes: imageWidths.deviceSizes,
    imageSizes: imageWidths.imageSizes,
  },

  async rewrites() {
    return {
      beforeFiles: [
        // A pre-sized photo is linked as .webp; a browser that accepts AVIF gets the .avif made next to it
        // (same URL), as the optimiser did with formats ['image/avif', 'image/webp']
        {
          source: '/static/img/:path(.*)\\.webp',
          has: [{ type: 'header', key: 'accept', value: '(.*)image/avif(.*)' }],
          destination: '/static/img/:path.avif',
        },
      ],
    };
  },

  // Performance optimizations
  compiler: {
    // Strip console.* in production, but keep console.error — the transform also
    // applies to server code, and API routes rely on it for Vercel logs
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
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
              "connect-src 'self' https://euforyc.co.uk https://www.euforyc.co.uk https://capig.euforyc.co.uk https://connect.squareup.com https://web.squarecdn.com https://momence.com https://api.momence.com https://graph.facebook.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://cdn.vercel-insights.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://bzr.openai.com https://bzrcdn.openai.com",
              "frame-src 'self' https://connect.squareup.com https://web.squarecdn.com https://momence.com https://www.facebook.com https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://www.facebook.com",
              "frame-ancestors 'self'",
            ].join('; ')
          }
        ]
      },
      {
        // Prevent caching of API responses (Sips auth and orders, webhooks, enquiries...).
        // /api/momence/events is left out: it sets its own short shared CDN cache.
        source: '/api/:path((?!momence/events(?:/|$)).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      },
      {
        // Pre-sized photos: the ?v= on every URL changes when any photo does
        source: '/static/img/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          // the same URL is AVIF or WebP depending on the Accept header
          { key: 'Vary', value: 'Accept' },
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
      // Summer challenge retired
      {
        source: '/summer-challenge',
        destination: '/offers',
        statusCode: 301,
      },
      // EMS Sculpt landing page retired — EMS is offered through Skin Studio
      {
        source: '/ems-sculpt',
        destination: 'https://euforycskin.co.uk/',
        permanent: true,
      },
      // Skin Studio now has its own site
      {
        source: '/skin-studio',
        destination: 'https://euforycskin.co.uk/',
        permanent: true,
      },
      {
        source: '/skin-studio/:path*',
        destination: 'https://euforycskin.co.uk/',
        permanent: true,
      },
      // Retreats have moved to Euforyc Social
      {
        source: '/morocco-retreat',
        destination: 'https://euforycsocial.co.uk',
        permanent: true,
      },
      {
        source: '/retreat',
        destination: 'https://euforycsocial.co.uk',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
