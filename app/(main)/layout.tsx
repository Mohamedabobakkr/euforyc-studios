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
import Script from 'next/script';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://euforyc.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EUFORYC STUDIOS • Pilates • Wellness • Strength',
    template: '%s | EUFORYC STUDIOS'
  },
  description: 'Premier pilates studio in London offering reformer pilates, hot pilates & private sessions in Edgware. Book pilates classes near you. Women-only boutique studio with expert instructors.',
  keywords: ['pilates london', 'reformer pilates london', 'pilates studio london', 'pilates edgware', 'pilates classes london', 'hot pilates london', 'pilates near me', 'pilates studio near me', 'reformer pilates edgware', 'pilates classes edgware', 'women only pilates london', 'boutique pilates studio', 'private pilates london', 'pilates booking london', 'pilates reserve london', 'pilates studio uk', 'best pilates london', 'pilates classes uk'],
  authors: [{ name: 'Euforyc Studios', url: siteUrl }],
  creator: 'Euforyc Studios',
  publisher: 'Euforyc Studios',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'EUFORYC STUDIOS • Pilates • Wellness • Strength',
    description: 'Premier pilates studio in London offering reformer pilates, hot pilates & private sessions in Edgware. Book pilates classes near you.',
    url: siteUrl,
    siteName: 'Euforyc Studios',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 600,
        height: 600,
        alt: 'Euforyc Studios - Pilates Studio in London',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EUFORYC STUDIOS • Pilates • Wellness • Strength',
    description: 'Premier pilates studio in London - reformer pilates, hot pilates & private sessions in Edgware',
    images: ['/logo.png'],
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
  verification: {
    // Remove or add actual verification code after registering with Google Search Console
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fffcf2',
};

// Enhanced Structured Data for Local Business
const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['HealthAndBeautyBusiness', 'LocalBusiness', 'SportsActivityLocation'],
  '@id': siteUrl,
  name: 'Euforyc Studios',
  alternateName: 'Euforyc Pilates Studio',
  description: 'Premier pilates studio in London offering reformer pilates, hot pilates and private sessions in Edgware. Women-only boutique studio with expert instructors.',
  url: siteUrl,
  telephone: '+447375710370',
  email: 'euforyc@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7 Holmstall Ave',
    addressLocality: 'Edgware',
    addressRegion: 'London',
    postalCode: 'HA8 5HX',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.6142,
    longitude: -0.2756
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:45',
      closes: '20:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '08:45',
      closes: '18:00'
    }
  ],
  priceRange: '££',
  image: `${siteUrl}/logo.png`,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    'https://www.instagram.com/euforycstudios',
    'https://www.tiktok.com/@euforyc'
  ],
  servedCuisine: null,
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
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reformer Pilates Classes',
          description: 'Equipment-based group pilates classes'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hot Pilates Classes',
          description: 'Dynamic heated mat pilates classes'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Private Pilates Sessions',
          description: 'One-on-one personalized pilates training'
        }
      }
    ]
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'London'
    },
    {
      '@type': 'City',
      name: 'Edgware'
    },
    {
      '@type': 'City',
      name: 'Barnet'
    },
    {
      '@type': 'City',
      name: 'Mill Hill'
    },
    {
      '@type': 'City',
      name: 'Finchley'
    }
  ],
  knowsAbout: [
    'Pilates',
    'Reformer Pilates',
    'Hot Pilates',
    'Fitness',
    'Wellness',
    'Women\'s Health'
  ]
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

        {/* Google Tag Manager - Euforyc Studios (GTM-P82PDHZ3) */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P82PDHZ3');
          `}
        </Script>

        {/* DataLayer Initialization with UTM & Page Data */}
        <Script id="datalayer-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            // Parse UTM parameters from URL
            function getUTMParams() {
              var params = new URLSearchParams(window.location.search);
              return {
                utm_source: params.get('utm_source') || '',
                utm_medium: params.get('utm_medium') || '',
                utm_campaign: params.get('utm_campaign') || '',
                utm_content: params.get('utm_content') || '',
                utm_term: params.get('utm_term') || '',
                fbclid: params.get('fbclid') || '',
                gclid: params.get('gclid') || ''
              };
            }

            // Store UTM params in session storage for persistence across pages
            var utmParams = getUTMParams();
            if (utmParams.utm_source || utmParams.fbclid || utmParams.gclid) {
              sessionStorage.setItem('euforyc_utm_params', JSON.stringify(utmParams));
            } else {
              var stored = sessionStorage.getItem('euforyc_utm_params');
              if (stored) utmParams = JSON.parse(stored);
            }

            // CRITICAL: Set business_unit for server-side routing
            var BUSINESS_UNIT = 'pilates';

            // Push initial page data with business_unit
            window.dataLayer.push({
              'event': 'page_data',
              'business_unit': BUSINESS_UNIT,
              'page_type': 'euforyc_studios',
              'page_path': window.location.pathname,
              'page_title': document.title,
              'page_url': window.location.href,
              'user_country': 'gb',
              ...utmParams
            });

            // Helper function to track events with business_unit (available globally)
            window.trackEvent = function(eventName, eventParams) {
              window.dataLayer.push({
                'event': eventName,
                'business_unit': BUSINESS_UNIT,
                ...eventParams
              });
            };

            // Track scroll depth
            var scrollThresholds = [25, 50, 75, 90];
            var scrollTracked = {};
            window.addEventListener('scroll', function() {
              var scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
              scrollThresholds.forEach(function(threshold) {
                if (scrollPercent >= threshold && !scrollTracked[threshold]) {
                  scrollTracked[threshold] = true;
                  window.dataLayer.push({
                    'event': 'scroll_depth',
                    'business_unit': BUSINESS_UNIT,
                    'scroll_percentage': threshold
                  });
                }
              });
            });

            // Track Lead events (Book Now / checkout initiation clicks)
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a[href*="momence.com"], button[data-booking]');
              if (target) {
                var href = target.getAttribute('href') || '';
                var buttonText = target.innerText || target.textContent || '';

                window.dataLayer.push({
                  'event': 'generate_lead',
                  'business_unit': BUSINESS_UNIT,
                  'lead_type': 'booking_click',
                  'button_text': buttonText.trim(),
                  'destination_url': href,
                  'page_path': window.location.pathname,
                  'page_title': document.title
                });
              }
            });

            // Track phone/WhatsApp clicks
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]');
              if (target) {
                var href = target.getAttribute('href') || '';
                var contactType = href.includes('tel:') ? 'phone' : 'whatsapp';

                window.dataLayer.push({
                  'event': 'contact_click',
                  'business_unit': BUSINESS_UNIT,
                  'contact_type': contactType,
                  'contact_value': href,
                  'page_path': window.location.pathname
                });
              }
            });

            // Track View Content for service pages
            var servicePaths = ['/schedule', '/packages', '/memberships', '/pricing', '/offers'];
            if (servicePaths.some(function(path) { return window.location.pathname.includes(path); })) {
              window.dataLayer.push({
                'event': 'view_content',
                'business_unit': BUSINESS_UNIT,
                'content_type': 'service_page',
                'content_name': document.title,
                'page_path': window.location.pathname
              });
            }
          `}
        </Script>

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans bg-[#fffcf2] text-[#1a260e] antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P82PDHZ3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Skip to content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1a260e] text-[#fffcf2] px-4 py-2 rounded">
          Skip to content
        </a>

        <Navigation />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        {/* Copyright Protection */}
        <Script id="copyright-protection" strategy="afterInteractive">
          {`
            // Disable right-click
            document.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              alert('Content is protected by copyright. Unauthorized use is prohibited.');
            });
            
            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            document.addEventListener('keydown', (e) => {
              if (
                (e.keyCode === 123) || // F12
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
                (e.ctrlKey && e.keyCode === 85) // Ctrl+U
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