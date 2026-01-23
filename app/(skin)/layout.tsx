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
                {/*
                    SKIN STUDIO TRACKING - Server-Side CAPI Only
                    NO GTM or browser pixel to avoid duplicate events
                    All events go through /api/track-event for accurate Facebook tracking
                */}
                <Script id="skin-studio-capi" strategy="afterInteractive">
                    {`
                        (function() {
                            // Prevent duplicate initialization
                            if (window.__skinStudioTracked) return;
                            window.__skinStudioTracked = true;

                            // Generate unique event ID for deduplication
                            function generateEventId(eventName) {
                                return 'skin_' + eventName.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                            }

                            // Get Facebook cookies for better matching
                            function getFBCookies() {
                                var getCookie = function(name) {
                                    var value = '; ' + document.cookie;
                                    var parts = value.split('; ' + name + '=');
                                    if (parts.length === 2) return parts.pop().split(';').shift();
                                    return '';
                                };
                                return { fbc: getCookie('_fbc'), fbp: getCookie('_fbp') };
                            }

                            // Send event to server CAPI ONLY (no browser pixel)
                            function sendEvent(eventName, customData) {
                                var eventId = generateEventId(eventName);
                                var cookies = getFBCookies();

                                fetch('/api/track-event', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        event_name: eventName,
                                        event_id: eventId,
                                        business_unit: 'skin',
                                        page_url: window.location.href,
                                        page_path: window.location.pathname,
                                        fbc: cookies.fbc,
                                        fbp: cookies.fbp,
                                        ...customData
                                    })
                                }).catch(function(err) {
                                    console.log('Skin Studio CAPI error:', err);
                                });
                            }

                            // Track PageView (once per page load)
                            sendEvent('PageView', {
                                content_name: document.title
                            });

                            // Track ViewContent ONLY on service/content pages (not homepage)
                            // This prevents duplicate events when PageView is sufficient
                            var servicePaths = ['/skin-studio/services', '/skin-studio/treatments', '/skin-studio/pricing'];
                            var isServicePage = servicePaths.some(function(path) {
                                return window.location.pathname.includes(path);
                            });

                            // Only fire ViewContent if on a specific service page
                            if (isServicePage || window.location.pathname === '/skin-studio') {
                                sendEvent('ViewContent', {
                                    content_type: 'skin_studio_page',
                                    content_name: document.title
                                });
                            }

                            // Track Lead events (booking clicks) - with deduplication
                            var lastLeadTime = 0;
                            document.addEventListener('click', function(e) {
                                var target = e.target.closest('a[href*="momence.com"], button[data-booking]');
                                if (target) {
                                    // Prevent duplicate Lead events within 2 seconds
                                    var now = Date.now();
                                    if (now - lastLeadTime < 2000) return;
                                    lastLeadTime = now;

                                    var buttonText = (target.innerText || target.textContent || '').trim();
                                    sendEvent('Lead', {
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
                                    // Prevent duplicate Contact events within 2 seconds
                                    var now = Date.now();
                                    if (now - lastContactTime < 2000) return;
                                    lastContactTime = now;

                                    var href = target.getAttribute('href') || '';
                                    var contactType = href.includes('tel:') ? 'phone' : 'whatsapp';
                                    sendEvent('Contact', {
                                        content_name: contactType
                                    });
                                }
                            });
                        })();
                    `}
                </Script>
            </head>
            <body className="font-skin-sans bg-skin-background antialiased" suppressHydrationWarning>
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
