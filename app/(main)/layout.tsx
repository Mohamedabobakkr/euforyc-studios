/**
 * @copyright Euforyc Studios 2025
 * @license Proprietary and confidential
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */
import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PixelTracker from '@/components/PixelTracker';
import JsonLd from '@/components/JsonLd';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { DEFAULT_OG_IMAGE, ORGANIZATION_ID, SITE_URL, STUDIO, postalAddressSchema } from '@/lib/site';

// Euforyc Pilates Facebook Pixel ID
const EUFORYC_PIXEL_ID = '1085377523538304';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EUFORYC STUDIOS • Pilates • Wellness • Strength',
    template: '%s | EUFORYC STUDIOS'
  },
  description: 'Women-only boutique Pilates studio in Edgware, North West London. Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Barre, Belly Dance and 1:1 private Reformer and Cadillac Reformer sessions. First-time clients: 3 classes for £60.',
  keywords: [
    // North West London — primary target
    'pilates north west london', 'pilates nw london', 'pilates studio north west london', 'reformer pilates north west london', 'best pilates north west london', 'hot pilates north west london', 'women only pilates north west london', 'pilates classes north west london', 'barre classes north west london', 'pilates studio nw london',
    // London — general
    'pilates london', 'reformer pilates london', 'pilates studio london', 'pilates classes london', 'hot pilates london', 'best pilates london', 'best pilates classes london', 'women only pilates london', 'boutique pilates studio', 'private pilates london', 'pilates booking london', 'pilates studio uk', 'pilates classes uk', 'boutique fitness london', 'barre classes london', 'red light therapy pilates', 'private pilates instructor london', 'pilates for women london', 'cadillac reformer pilates', 'wellness studio london', 'infrared pilates london', 'hot pilates uk', 'women only gym london',
    // Edgware & local
    'pilates edgware', 'reformer pilates edgware', 'pilates classes edgware', 'fitness classes edgware',
    // North London
    'pilates north london', 'reformer pilates north london', 'pilates studio north london',
    // Near me
    'pilates near me', 'pilates studio near me', 'reformer pilates near me',
    // NW London boroughs
    'pilates barnet', 'pilates mill hill', 'pilates finchley', 'pilates colindale', 'pilates stanmore', 'pilates harrow', 'pilates hendon', 'pilates kingsbury', 'pilates wembley', 'pilates canons park', 'pilates queensbury',
  ],
  authors: [{ name: 'Euforyc Studios', url: siteUrl }],
  creator: 'Euforyc Studios',
  publisher: 'Euforyc Studios',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Page-level metadata (lib/site.ts pageMetadata) sets canonical and og:url;
  // these are only fallbacks, so neither is set here.
  openGraph: {
    title: 'Euforyc Studios | Women-Only Pilates Studio in Edgware, North West London',
    description: 'Women-only boutique Pilates studio in Edgware, North West London. Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Barre, Belly Dance and 1:1 private Reformer and Cadillac Reformer sessions.',
    siteName: 'Euforyc Studios',
    locale: 'en_GB',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Euforyc Studios | Women-Only Pilates Studio in Edgware, North West London',
    description: 'Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Barre, Belly Dance and 1:1 private sessions in Edgware. First-time clients: 3 classes for £60.',
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fffcf2',
};

// Structured data for the studio, built from the shared facts in lib/site.ts
const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['HealthAndBeautyBusiness', 'LocalBusiness', 'SportsActivityLocation'],
  '@id': ORGANIZATION_ID,
  name: STUDIO.name,
  alternateName: 'Euforyc Pilates Studio',
  description: STUDIO.shortDescription,
  url: siteUrl,
  telephone: STUDIO.phoneE164,
  email: STUDIO.email,
  address: postalAddressSchema,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: STUDIO.geo.latitude,
    longitude: STUDIO.geo.longitude,
  },
  openingHoursSpecification: STUDIO.hours.map((period) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: period.days,
    opens: period.opens,
    closes: period.closes,
  })),
  priceRange: '££',
  image: [
    `${siteUrl}/og/euforyc-studios-shopfront-edgware.jpg`,
    DEFAULT_OG_IMAGE.url,
    `${siteUrl}/reformer-new.jpg`,
  ],
  logo: `${siteUrl}/logo.png`,
  sameAs: [STUDIO.social.instagram, STUDIO.social.tiktok],
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Apple Pay', 'Google Pay'],
  currenciesAccepted: 'GBP',
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Women Only Studio',
      value: true
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Reformer Equipment',
      value: true
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Hot Pilates Room',
      value: true
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Private Sessions',
      value: true
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pilates Classes and Services',
    itemListElement: ORDERED_CLASS_TYPES.map((classType) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: classType.name,
        description: classType.tagline,
        url: `${siteUrl}/classes/${classType.slug}`,
      },
    })),
  },
  areaServed: STUDIO.areas.map((name) => ({ '@type': 'Place', name })),
  knowsAbout: [
    'Pilates',
    'Reformer Pilates',
    'Hot Pilates',
    'Infrared Pilates',
    'Red Light Therapy',
    'Sculpt Mat Pilates',
    'Cadillac Reformer Pilates',
    'Barre',
    'Belly Dance',
    'Women\'s Health',
    'Core Strength',
    'Flexibility Training'
  ],
  hasMap: STUDIO.mapsUrl,
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'Euforyc Studios',
  url: siteUrl,
  publisher: {
    '@id': `${siteUrl}/#organization`
  },
  inLanguage: 'en-GB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fffcf2" />

        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="5z3pjrzzsqdozv85orz7txyolnps75" />

        {/* Meta Pixel Code - Euforyc Pilates */}
        <Script id="fb-pixel-euforyc" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            function euforycEventId(name) {
              return name.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
            }

            // Rebuild _fbc from fbclid URL param when cookie is missing (ITP/privacy browsers)
            try {
              var fbclid = new URLSearchParams(window.location.search).get('fbclid');
              if (fbclid && fbclid.length <= 256 && /^[A-Za-z0-9_\\-.]+$/.test(fbclid) && document.cookie.indexOf('_fbc=') === -1) {
                document.cookie = '_fbc=fb.1.' + Date.now() + '.' + fbclid + '; path=/; max-age=7776000; SameSite=Lax; Secure';
              }
            } catch (e) {}

            var euforycUserId = (function() {
              try {
                var id = localStorage.getItem('euforyc_uid');
                if (!id) {
                  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
                    id = window.crypto.randomUUID();
                  } else {
                    id = 'euf_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 15);
                  }
                  localStorage.setItem('euforyc_uid', id);
                }
                return id;
              } catch (e) { return null; }
            })();

            // Remember when a visit arrives from an AI assistant, so a booking made
            // later in the session is credited to it in Momence rather than to Meta
            var euforycAiSource = (function() {
              try {
                var stored = sessionStorage.getItem('euforyc_ai_source');
                if (stored) return stored;
                var assistants = ['chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'gemini.google.com', 'copilot.microsoft.com', 'claude.ai', 'meta.ai', 'chat.mistral.ai', 'duck.ai'];
                var candidates = [(new URLSearchParams(window.location.search).get('utm_source') || '').toLowerCase()];
                if (document.referrer) candidates.push(new URL(document.referrer).hostname.toLowerCase());
                for (var i = 0; i < candidates.length; i++) {
                  var host = candidates[i].indexOf('www.') === 0 ? candidates[i].slice(4) : candidates[i];
                  if (assistants.indexOf(host) !== -1) {
                    sessionStorage.setItem('euforyc_ai_source', host);
                    return host;
                  }
                }
              } catch (e) {}
              return null;
            })();

            function euforycReadCookie(name) {
              try {
                var match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
                return match ? decodeURIComponent(match[2]) : null;
              } catch (e) { return null; }
            }

            function euforycAdvancedMatching() {
              var data = { country: 'gb' };
              if (euforycUserId) data.external_id = euforycUserId;
              try {
                var emailEl = document.querySelector('input[type="email"], input[name*="email" i]');
                if (emailEl && emailEl.value) {
                  var em = emailEl.value.trim().toLowerCase();
                  if (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(em)) data.em = em;
                }
                var phoneEl = document.querySelector('input[type="tel"], input[name*="phone" i]');
                if (phoneEl && phoneEl.value) {
                  var ph = phoneEl.value.replace(/\\D/g, '');
                  if (ph && ph.length >= 10) {
                    if (ph.charAt(0) === '0') ph = '44' + ph.substring(1);
                    data.ph = ph;
                  }
                }
                var firstEl = document.querySelector('input[name*="first" i], input[id*="first" i]');
                if (firstEl && firstEl.value) data.fn = firstEl.value.trim().toLowerCase().substring(0, 100);
                var lastEl = document.querySelector('input[name*="last" i], input[id*="last" i]');
                if (lastEl && lastEl.value) data.ln = lastEl.value.trim().toLowerCase().substring(0, 100);
              } catch (e) {}
              return data;
            }

            fbq('init', '${EUFORYC_PIXEL_ID}', euforycAdvancedMatching());

            function euforycRefreshMatching() {
              try { fbq('init', '${EUFORYC_PIXEL_ID}', euforycAdvancedMatching()); } catch (e) {}
            }

            var initialPv = euforycEventId('PageView');
            fbq('track', 'PageView', {}, { eventID: initialPv });

            try {
              var metaEl = document.getElementById('page-content-meta');
              if (metaEl) {
                var vcId = euforycEventId('ViewContent');
                var vcPayload = {
                  content_name: (metaEl.getAttribute('data-content-name') || document.title || '').substring(0, 200),
                  content_type: metaEl.getAttribute('data-content-type') || 'page',
                  content_category: metaEl.getAttribute('data-content-category') || window.location.pathname
                };
                var vcValue = parseFloat(metaEl.getAttribute('data-value') || '');
                if (!isNaN(vcValue) && vcValue > 0) {
                  vcPayload.value = vcValue;
                  vcPayload.currency = metaEl.getAttribute('data-currency') || 'GBP';
                  var vcContentIds = metaEl.getAttribute('data-content-ids');
                  if (vcContentIds) vcPayload.content_ids = [vcContentIds];
                }
                fbq('track', 'ViewContent', vcPayload, { eventID: vcId });
              }
            } catch (e) {}

            var lastCheckoutTime = 0;
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a[href*="momence.com"], button[data-booking]');
              if (!target) return;
              var now = Date.now();
              if (now - lastCheckoutTime < 2000) return;
              lastCheckoutTime = now;

              euforycRefreshMatching();

              var value = parseFloat(target.getAttribute('data-value') || '0') || 0;
              var currency = target.getAttribute('data-currency') || 'GBP';
              var contentName = target.getAttribute('data-content-name')
                || ((target.innerText || target.textContent || '').trim()).substring(0, 200);
              var offerId = target.getAttribute('data-offer-id') || 'unknown';
              var contentCategory = target.getAttribute('data-content-category') || 'booking_click';
              var contentType = target.getAttribute('data-content-type') || 'intro_offer';

              var icId = euforycEventId('InitiateCheckout');
              var icPayload = {
                content_name: contentName,
                content_category: contentCategory,
                content_type: contentType,
                content_ids: [offerId],
                num_items: 1
              };
              if (value > 0) { icPayload.value = value; icPayload.currency = currency; }
              fbq('track', 'InitiateCheckout', icPayload, { eventID: icId });

              try {
                var href = target.getAttribute('href');
                if (href && href.indexOf('momence.com') !== -1) {
                  var url = new URL(href, window.location.origin);
                  if (euforycAiSource) {
                    if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source', euforycAiSource);
                    if (!url.searchParams.has('utm_medium')) url.searchParams.set('utm_medium', 'ai_assistant');
                  }
                  if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source', 'meta');
                  if (!url.searchParams.has('utm_medium')) url.searchParams.set('utm_medium', 'paid_social');
                  if (!url.searchParams.has('utm_campaign')) url.searchParams.set('utm_campaign', offerId);
                  if (euforycUserId && !url.searchParams.has('utm_content')) {
                    url.searchParams.set('utm_content', 'euf_' + euforycUserId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16));
                  }
                  var existingFbclid = new URLSearchParams(window.location.search).get('fbclid');
                  if (existingFbclid && !url.searchParams.has('fbclid')) {
                    url.searchParams.set('fbclid', existingFbclid);
                  }
                  if (!url.searchParams.has('event_id')) url.searchParams.set('event_id', icId);
                  target.setAttribute('href', url.toString());
                }
              } catch (err) {}
            });

            // Contact events (phone/WhatsApp clicks)
            var lastContactTime = 0;
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]');
              if (!target) return;
              var now = Date.now();
              if (now - lastContactTime < 2000) return;
              lastContactTime = now;

              euforycRefreshMatching();

              var href = target.getAttribute('href') || '';
              var contactType = href.indexOf('tel:') === 0 ? 'phone' : 'whatsapp';
              var contactId = euforycEventId('Contact');
              fbq('track', 'Contact', {
                content_name: contactType,
                content_category: 'contact_click'
              }, { eventID: contactId });
            });
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${EUFORYC_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FGLFB14Q0J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FGLFB14Q0J');
          `}
        </Script>

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://connect.facebook.net" />

        {/* Structured Data - Organization */}
        <JsonLd data={structuredData} />
        {/* Structured Data - WebSite */}
        <JsonLd data={websiteSchema} />
      </head>
      <body className="eu-site font-sans bg-[#fffcf2] text-[#1a260e] antialiased" suppressHydrationWarning>
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 bg-[#1a260e] text-[#fffcf2] px-4 py-2 rounded-full">
          Skip to content
        </a>

        <PixelTracker />
        <Navigation />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />

        {/* Copyright Protection */}
        <Script id="copyright-protection" strategy="afterInteractive">
          {`
            document.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              alert('Content is protected by copyright. Unauthorized use is prohibited.');
            });

            document.addEventListener('keydown', (e) => {
              if (
                (e.keyCode === 123) ||
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
                (e.ctrlKey && e.keyCode === 85)
              ) {
                e.preventDefault();
                return false;
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
