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
    { '@type': 'City', name: 'London' },
    { '@type': 'City', name: 'Edgware' },
    { '@type': 'City', name: 'Barnet' },
    { '@type': 'City', name: 'Mill Hill' },
    { '@type': 'City', name: 'Finchley' }
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

            // Initialize pixel with country for better matching
            fbq('init', '${EUFORYC_PIXEL_ID}', { country: 'gb' });

            // Track PageView
            fbq('track', 'PageView');

            // Track ViewContent on service pages
            var servicePaths = ['/schedule', '/packages', '/memberships', '/pricing', '/offers'];
            if (servicePaths.some(function(path) { return window.location.pathname.includes(path); })) {
              fbq('track', 'ViewContent', {
                content_name: document.title,
                content_type: 'service_page',
                value: 0,
                currency: 'GBP'
              });
            }

            // Track Lead events (booking clicks) - with deduplication
            var lastLeadTime = 0;
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a[href*="momence.com"], button[data-booking]');
              if (target) {
                var now = Date.now();
                if (now - lastLeadTime < 2000) return;
                lastLeadTime = now;

                var buttonText = (target.innerText || target.textContent || '').trim();
                fbq('track', 'Lead', {
                  content_name: buttonText,
                  content_category: 'booking_click'
                });
              }
            });

            // Track Contact events (phone/WhatsApp clicks) - with deduplication
            var lastContactTime = 0;
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]');
              if (target) {
                var now = Date.now();
                if (now - lastContactTime < 2000) return;
                lastContactTime = now;

                var href = target.getAttribute('href') || '';
                var contactType = href.includes('tel:') ? 'phone' : 'whatsapp';
                fbq('track', 'Contact', {
                  content_name: contactType
                });
              }
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

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans bg-[#fffcf2] text-[#1a260e] antialiased">
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
