/**
 * @copyright Euforyc Skin Studio 2025
 * @license Proprietary and confidential
 */
import '../globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const nunito = Nunito_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '600', '700', '800', '900'],
    variable: '--font-nunito',
    display: 'swap',
});

const skinSiteUrl = 'https://euforyc.co.uk';

export const metadata: Metadata = {
    metadataBase: new URL(skinSiteUrl),
    title: {
        default: 'Euforyc Skin Studio | Aesthetic Clinic & Skin Treatments London',
        template: '%s | Euforyc Skin Studio',
    },
    description: 'Women-only aesthetic clinic in Edgware, London. Expert dermal fillers, anti-wrinkle treatments, IV drips, skin boosters, Profhilo, body contouring, laser hair removal & Dermalux phototherapy. Book your consultation today.',
    keywords: ['aesthetic clinic london', 'dermal fillers london', 'lip fillers edgware', 'anti wrinkle treatment london', 'iv drip london', 'skin boosters london', 'profhilo london', 'body contouring london', 'laser hair removal edgware', 'aesthetic treatments near me', 'women only clinic london', 'skin clinic edgware', 'fillers near me', 'iv therapy london', 'polynucleotides london', 'skin rejuvenation london', 'aesthetic clinic north london', 'best fillers london', 'jaw slimming london', 'ems sculpt london', 'dermalux phototherapy london', 'skin clinic north london', 'euforyc skin studio'],
    openGraph: {
        title: 'Euforyc Skin Studio | Aesthetic Clinic London',
        description: 'Women-only aesthetic clinic in Edgware. Expert dermal fillers, anti-wrinkle treatments, IV drips, Profhilo, body contouring & laser hair removal. Book your consultation.',
        url: `${skinSiteUrl}/skin-studio`,
        siteName: 'Euforyc Skin Studio',
        locale: 'en_GB',
        type: 'website',
        images: [{ url: `${skinSiteUrl}/skin-studio-logo.png`, width: 600, height: 200, alt: 'Euforyc Skin Studio - Aesthetic Clinic in Edgware, London' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Euforyc Skin Studio | Aesthetic Clinic London',
        description: 'Women-only aesthetic clinic in Edgware. Fillers, anti-wrinkle, IV drips, skin boosters, body contouring & laser treatments.',
        site: '@euforycstudios',
        images: [`${skinSiteUrl}/skin-studio-logo.png`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: `${skinSiteUrl}/skin-studio`,
    },
};

const skinStudioSchema = {
    '@context': 'https://schema.org',
    '@type': ['HealthAndBeautyBusiness', 'MedicalBusiness'],
    '@id': `${skinSiteUrl}/skin-studio/#business`,
    name: 'Euforyc Skin Studio',
    alternateName: 'Euforyc Aesthetic Clinic',
    description: 'Women-only aesthetic clinic in Edgware, North London. Expert practitioners offering dermal fillers, anti-wrinkle treatments, IV drips, skin boosters, body contouring, and laser treatments in a premium boutique environment.',
    url: `${skinSiteUrl}/skin-studio`,
    telephone: '+447375710370',
    email: 'euforyc@gmail.com',
    address: { '@type': 'PostalAddress', streetAddress: '7 Holmstall Ave', addressLocality: 'Edgware', addressRegion: 'London', postalCode: 'HA8 5HX', addressCountry: 'GB' },
    geo: { '@type': 'GeoCoordinates', latitude: 51.6142, longitude: -0.2756 },
    openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:45', closes: '20:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '08:45', closes: '18:00' },
    ],
    priceRange: '££',
    image: `${skinSiteUrl}/skin-studio-logo.png`,
    sameAs: ['https://www.instagram.com/euforycstudios', 'https://www.tiktok.com/@euforyc'],
    parentOrganization: { '@id': `${skinSiteUrl}/#organization` },
    areaServed: { '@type': 'City', name: 'London' },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Aesthetic Treatments',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dermal Fillers', description: 'Expert facial profile balancing including lip fillers, cheek fillers, jaw fillers, chin enhancement, nose reshape, tear troughs. From £130.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Anti-Wrinkle Treatments', description: 'Precision anti-wrinkle injections for forehead, crow\'s feet, brow lift, lip flip, jaw slimming. From £25.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IV Drips', description: 'Customised vitamin IV therapy for energy, immunity, skin glow, and overall wellness. From £100.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skin Boosters', description: 'Profhilo, Neofound, Lumi Eye, and Polynucleotides for deep skin hydration and rejuvenation. From £120.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Body Contouring', description: 'Non-surgical body sculpting including cavitation, RF skin tightening, EMS sculpt, and cellulite treatment. From £75.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laser Hair Removal', description: 'Full body and face laser hair removal with professional-grade equipment. From £25.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dermalux Phototherapy', description: 'LED light therapy for skin rejuvenation, acne treatment, and anti-ageing.' } },
        ],
    },
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Apple Pay', 'Google Pay'],
    currenciesAccepted: 'GBP',
    hasMap: 'https://maps.app.goo.gl/zZfyhD3X2BuS6SnL6',
};

export default function SkinStudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${nunito.variable}`} suppressHydrationWarning>
            <head />
            <body className="font-skin-sans bg-skin-background antialiased" suppressHydrationWarning>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(skinStudioSchema) }}
                />
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
