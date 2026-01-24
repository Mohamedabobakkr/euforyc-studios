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

// Skin Studio Facebook Pixel ID - SEPARATE from main Euforyc pixel
const SKIN_STUDIO_PIXEL_ID = '1210900647179360';

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
                {/* Meta Pixel Code - Skin Studio (Browser + Server CAPI) */}
                <Script id="fb-pixel-skin-studio" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');

                        // Generate unique event ID for browser/server deduplication
                        function generateEventId(eventName) {
                            return 'skin_' + eventName.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                        }

                        // Get Facebook cookies for CAPI matching
                        function getFBCookies() {
                            var getCookie = function(name) {
                                var value = '; ' + document.cookie;
                                var parts = value.split('; ' + name + '=');
                                if (parts.length === 2) return parts.pop().split(';').shift();
                                return '';
                            };
                            return { fbc: getCookie('_fbc'), fbp: getCookie('_fbp') };
                        }

                        // Send event to server CAPI for better matching quality
                        function sendToCAPI(eventName, eventId, customData) {
                            var cookies = getFBCookies();
                            fetch('/api/track-event', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    event_name: eventName,
                                    event_id: eventId,
                                    business_unit: 'skin',
                                    page_url: window.location.href,
                                    fbc: cookies.fbc,
                                    fbp: cookies.fbp,
                                    ...customData
                                })
                            }).catch(function(err) {
                                console.log('CAPI error:', err);
                            });
                        }

                        // Initialize pixel
                        fbq('init', '${SKIN_STUDIO_PIXEL_ID}', { country: 'gb' });

                        // Track PageView (browser + CAPI)
                        var pageViewId = generateEventId('PageView');
                        fbq('track', 'PageView', {}, { eventID: pageViewId });
                        sendToCAPI('PageView', pageViewId, { content_name: document.title });

                        // Track ViewContent (browser + CAPI)
                        var viewContentId = generateEventId('ViewContent');
                        fbq('track', 'ViewContent', {
                            content_name: document.title,
                            content_type: 'skin_studio_page',
                            value: 0,
                            currency: 'GBP'
                        }, { eventID: viewContentId });
                        sendToCAPI('ViewContent', viewContentId, {
                            content_name: document.title,
                            content_type: 'skin_studio_page',
                            value: 0,
                            currency: 'GBP'
                        });

                        // Track Lead events (booking clicks) - with deduplication
                        var lastLeadTime = 0;
                        document.addEventListener('click', function(e) {
                            var target = e.target.closest('a[href*="momence.com"], button[data-booking]');
                            if (target) {
                                var now = Date.now();
                                if (now - lastLeadTime < 2000) return;
                                lastLeadTime = now;

                                var buttonText = (target.innerText || target.textContent || '').trim();
                                var leadId = generateEventId('Lead');

                                fbq('track', 'Lead', {
                                    content_name: buttonText,
                                    content_category: 'consultation_click'
                                }, { eventID: leadId });

                                sendToCAPI('Lead', leadId, {
                                    content_name: buttonText,
                                    content_category: 'consultation_click'
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
                                var contactId = generateEventId('Contact');

                                fbq('track', 'Contact', {
                                    content_name: contactType
                                }, { eventID: contactId });

                                sendToCAPI('Contact', contactId, {
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
                        src={`https://www.facebook.com/tr?id=${SKIN_STUDIO_PIXEL_ID}&ev=PageView&noscript=1`}
                        alt=""
                    />
                </noscript>
            </head>
            <body className="font-skin-sans bg-skin-background antialiased" suppressHydrationWarning>
                <div className="min-h-screen flex flex-col">
                    {/* Elegant Top Navigation */}
                    <nav className="fixed top-0 left-0 right-0 z-50 bg-skin-background/95 backdrop-blur-sm border-b border-skin-muted/30">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
                                <p>&copy; 2025 Euforyc Skin Studio. All rights reserved.</p>
                                <p>Part of Euforyc Studios Wellness Collection</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
