/**
 * @copyright Euforyc Skin Studio 2025
 * @license Proprietary and confidential
 */
import '../globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

const nunito = Nunito_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '600', '700', '800', '900'],
    variable: '--font-nunito',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Euforyc Skin Studio | Aesthetic Clinic',
    description: 'THE FEELING OF BEING HAPPY IN YOUR SKIN. Premium aesthetic treatments including Fillers, Anti-wrinkle, IV Drips, Skin Boosters, and Body Contouring.',
    keywords: ['aesthetic clinic', 'fillers', 'anti-wrinkle', 'iv drips', 'skin boosters', 'body contouring', 'euforyc skin studio'],
};

export default function SkinStudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${nunito.variable}`} suppressHydrationWarning>
            <head>
                {/* Google Tag Manager - Main Container (routes to correct pixel via Server-Side GTM) */}
                <Script id="gtm-head" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-P82PDHZ3');
                    `}
                </Script>

                {/* DataLayer Initialization with business_unit for routing */}
                <Script id="datalayer-init-skin" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];

                        // CRITICAL: Set business_unit for server-side routing
                        var BUSINESS_UNIT = 'skin';

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

                        // Push initial page data with business_unit
                        window.dataLayer.push({
                            'event': 'page_data',
                            'business_unit': BUSINESS_UNIT,
                            'page_type': 'skin_studio',
                            'page_path': window.location.pathname,
                            'page_title': document.title,
                            'page_url': window.location.href,
                            'user_country': 'gb',
                            ...utmParams
                        });

                        // Helper function to track events with business_unit
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

                        // Track Lead events (Book Now / consultation clicks)
                        document.addEventListener('click', function(e) {
                            var target = e.target.closest('a[href*="momence.com"], button[data-booking]');
                            if (target) {
                                var href = target.getAttribute('href') || '';
                                var buttonText = target.innerText || target.textContent || '';

                                window.dataLayer.push({
                                    'event': 'generate_lead',
                                    'business_unit': BUSINESS_UNIT,
                                    'lead_type': 'consultation_click',
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

                        // Track View Content for Skin Studio
                        window.dataLayer.push({
                            'event': 'view_content',
                            'business_unit': BUSINESS_UNIT,
                            'content_type': 'skin_studio_page',
                            'content_name': document.title,
                            'page_path': window.location.pathname
                        });
                    `}
                </Script>

                {/* Preconnect */}
                <link rel="preconnect" href="https://www.googletagmanager.com" />
            </head>
            <body className="font-skin-sans bg-skin-background antialiased" suppressHydrationWarning>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-P82PDHZ3"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <div className="min-h-screen flex flex-col">
                    {/* Elegant Top Navigation */}
                    <nav className="fixed top-0 left-0 right-0 z-50 bg-skin-background/95 backdrop-blur-sm border-b border-skin-muted/30">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                            {/* Back to main site */}
                            {/* Back to main site */}
                            <Link
                                href="/"
                                className="text-skin-text/70 text-sm tracking-[0.15em] uppercase hover:text-skin-text transition-colors duration-300 flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                <span className="hidden sm:inline">Back to Euforyc Studios</span>
                            </Link>

                            {/* Center Logo */}
                            <Link href="/skin-studio" className="absolute left-1/2 -translate-x-1/2">
                                <Image
                                    src="/skin-studio-logo.png"
                                    alt="Euforyc Skin Studio"
                                    width={120}
                                    height={40}
                                    className="object-contain w-32 md:w-44"
                                    priority
                                />
                            </Link>

                            {/* CTA Button */}
                            <a
                                href="https://momence.com/euforyc/appointment-reservation/75303?boardId=108632"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-skin-text text-skin-background px-4 py-2 md:px-6 md:py-2 text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-skin-accent transition-all duration-300 whitespace-nowrap"
                            >
                                Book Now
                            </a>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="flex-grow">
                        {children}
                    </main>

                    {/* Elegant Footer */}
                    <footer className="bg-skin-text text-skin-background py-16">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="grid md:grid-cols-3 gap-12 mb-12">
                                {/* Brand */}
                                <div>
                                    <Image
                                        src="/skin-studio-logo.png"
                                        alt="Euforyc Skin Studio"
                                        width={150}
                                        height={50}
                                        className="object-contain brightness-0 invert mb-8"
                                    />
                                    <p className="text-skin-background/70 text-sm leading-relaxed">
                                        The feeling of being happy in your skin.
                                    </p>
                                </div>

                                {/* Quick Links */}
                                <div>
                                    <h4 className="font-skin-serif text-lg mb-4 tracking-wide">Quick Links</h4>
                                    <ul className="space-y-2 text-sm text-skin-background/70">
                                        <li><a href="#services" className="hover:text-skin-background transition-colors">Our Services</a></li>
                                        <li><a href="#about" className="hover:text-skin-background transition-colors">About Us</a></li>
                                        <li><a href="https://momence.com/euforyc/appointment-reservation/75303?boardId=108632" target="_blank" rel="noopener noreferrer" className="hover:text-skin-background transition-colors">Book Consultation</a></li>
                                        <li><Link href="/" className="hover:text-skin-background transition-colors">Euforyc Studios</Link></li>
                                    </ul>
                                </div>

                                {/* Contact */}
                                <div>
                                    <h4 className="font-skin-serif text-lg mb-4 tracking-wide">Contact</h4>
                                    <ul className="space-y-2 text-sm text-skin-background/70">
                                        <li>7 Holmstall Ave, Edgware</li>
                                        <li>London HA8 5HX</li>
                                        <li className="pt-2">
                                            <a href="mailto:euforyc@gmail.com" className="hover:text-skin-background transition-colors">
                                                euforyc@gmail.com
                                            </a>
                                        </li>
                                        <li>
                                            <a href="tel:+447375710370" className="hover:text-skin-background transition-colors">
                                                +44 7375 710370
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-skin-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-skin-background/50">
                                <p>© 2025 Euforyc Skin Studio. All rights reserved.</p>
                                <p>Part of Euforyc Studios Wellness Collection</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
