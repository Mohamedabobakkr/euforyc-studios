'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Service data
// Service data with detailed items
const services = [
    {
        title: 'Fillers',
        description: 'Restore volume and enhance your natural features with premium dermal fillers for lips, cheeks, and facial contouring.',
        items: [
            { name: 'Lip Augmentation', price: '£250', duration: '45 mins' },
            { name: 'Cheek Contour', price: '£300', duration: '45 mins' },
            { name: 'Jawline Definition', price: '£350', duration: '45 mins' },
            { name: 'Chin Enhancement', price: '£250', duration: '30 mins' },
            { name: 'Nasolabial Folds', price: '£250', duration: '30 mins' },
            { name: 'Tear Trough', price: '£350', duration: '45 mins' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
            </svg>
        ),
    },
    {
        title: 'Anti-wrinkle',
        description: 'Smooth fine lines and prevent new wrinkles with expertly administered anti-wrinkle treatments for a refreshed appearance.',
        items: [
            { name: '1 Area', price: '£180', duration: '30 mins' },
            { name: '2 Areas', price: '£220', duration: '30 mins' },
            { name: '3 Areas', price: '£260', duration: '30 mins' },
            { name: 'Brow Lift', price: '£180', duration: '30 mins' },
            { name: 'Masseter (Jaw Slimming)', price: '£280', duration: '30 mins' },
            { name: 'Hyperhidrosis (Sweating)', price: '£350', duration: '45 mins' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
    },
    {
        title: 'IV Drips',
        description: 'Revitalize from within with customized IV vitamin therapy designed to boost energy, hydration, and overall wellness.',
        items: [
            { name: 'Energy Boost', price: '£150', duration: '45 mins' },
            { name: 'Immunity Support', price: '£150', duration: '45 mins' },
            { name: 'Skin Glow', price: '£175', duration: '45 mins' },
            { name: 'Detox', price: '£150', duration: '45 mins' },
            { name: 'Performance', price: '£175', duration: '45 mins' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4h-4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <path d="M10 2h4" />
                <path d="M12 11v6" />
                <path d="M9 14h6" />
            </svg>
        ),
    },
    {
        title: 'Skin Boosters',
        description: 'Achieve a natural glow with advanced skin boosters that deeply hydrate and improve skin texture from within.',
        items: [
            { name: 'Profhilo (Face)', price: '£300', duration: '45 mins' },
            { name: 'Profhilo (Neck)', price: '£300', duration: '45 mins' },
            { name: 'Seventy Hyal', price: '£150', duration: '30 mins' },
            { name: 'Lumi Eyes', price: '£150', duration: '30 mins' },
            { name: 'Microneedling (with Meso)', price: '£150', duration: '60 mins' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
        ),
    },
    {
        title: 'Body Contouring',
        description: 'Sculpt and define your silhouette with non-invasive body contouring treatments for natural-looking results.',
        items: [
            { name: 'Fat Freezing', price: '£150', duration: '60 mins' },
            { name: 'Cavitation & RF (1 Area)', price: '£80', duration: '45 mins' },
            { name: 'Cavitation & RF (Course of 6)', price: '£400', duration: '45 mins/session' },
            { name: 'Muscle Stimulation', price: '£60', duration: '30 mins' },
            { name: 'Cellulite Treatment', price: '£100', duration: '60 mins' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" y1="8" x2="2" y2="22" />
                <line x1="17.5" y1="15" x2="9" y2="15" />
            </svg>
        ),
    },
    {
        title: 'Lasers & Light',
        description: 'Advanced laser hair removal and light therapy treatments for smooth, rejuvenated skin.',
        items: [
            { name: 'Full Body Laser Hair Removal', price: '£180', duration: '1 hr 30 mins' },
            { name: 'Bikini Laser', price: '£40', duration: '15 mins' },
            { name: 'Dermalux Phototherapy', price: '£40', duration: '40 mins' },
            { name: 'Laser Consultation', price: 'Free', duration: '10 mins' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        ),
    },
];



// Value propositions
const values = [
    {
        title: 'Tailored treatments',
        description: 'Personalized approach for each client',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        title: 'Qualified practitioners',
        description: 'Experienced certified professionals',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
    },
    {
        title: 'Premium products',
        description: 'State-of-the-art technology & equipment',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
];

export default function SkinStudioPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="bg-skin-background">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20"
            >
                {/* Subtle decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-skin-cream/50 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-skin-muted/30 rounded-full blur-3xl opacity-40"></div>
                </div>

                <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Main Logo */}
                    <div className="mb-16">
                        <Image
                            src="/skin-studio-logo.png"
                            alt="Euforyc Skin Studio"
                            width={400}
                            height={150}
                            className="mx-auto object-contain"
                            priority
                        />
                    </div>

                    {/* Tagline with elegant typography */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <p className="font-skin-sans text-skin-text/80 tracking-[0.3em] text-sm uppercase mb-4">
                            Aesthetic Clinic
                        </p>
                        <h1 className="font-skin-serif text-skin-text text-3xl md:text-4xl lg:text-5xl italic leading-relaxed mb-6">
                            The feeling of being happy<br />in your skin
                        </h1>
                    </div>

                    {/* Elegant divider */}
                    <div className={`flex items-center justify-center gap-4 mb-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-16 h-px bg-skin-accent/30"></div>
                        <div className="w-2 h-2 rounded-full bg-skin-accent/40"></div>
                        <div className="w-16 h-px bg-skin-accent/30"></div>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <a
                            href="https://momence.com/euforyc/appointment-reservation/75303?boardId=108632"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-skin-text text-skin-background px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-skin-accent transition-all duration-300 hover:scale-[1.02] inline-block"
                        >
                            Book Consultation
                        </a>
                        <a
                            href="#services"
                            className="border border-skin-text text-skin-text px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-skin-text hover:text-skin-background transition-all duration-300 inline-block"
                        >
                            Our Services
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-skin-text/40">
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                </div>
            </section>

            {/* Aesthetic Banner Section */}
            <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/skin-studio-ethereal.png"
                        alt="Ethereal Skin Studio Aesthetic"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 text-center text-skin-cream px-6">
                    {/* Top Tagline */}
                    <div className="mb-12">
                        <p className="font-skin-sans text-xs md:text-sm tracking-[0.3em] uppercase opacity-80 mb-2">
                            Euforyc Skin Studio
                        </p>
                        <p className="font-skin-serif text-[10px] tracking-widest opacity-60">
                            EST. 2025
                        </p>
                    </div>

                    {/* Main Title */}
                    <h2 className="font-skin-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-12 mix-blend-overlay opacity-90">
                        restore<br />
                        natural<br />
                        radiance
                    </h2>

                    {/* Bottom Tagline */}
                    <div>
                        <p className="font-skin-sans text-lg font-light tracking-widest opacity-90">
                            LONDON
                        </p>
                        <p className="text-[10px] tracking-[0.2em] opacity-60 mt-2 uppercase">
                            Holmstall Ave • Edgware
                        </p>
                    </div>
                </div>
            </section>


            {/* Services Section */}
            <section id="services" className="py-24 md:py-32 bg-skin-text text-skin-background relative">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-skin-sans text-skin-background/60 text-sm tracking-[0.2em] uppercase mb-4">
                            Our Treatments
                        </p>
                        <h2 className="font-skin-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                            Explore our full-range of<br />treatment options
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                onClick={() => setSelectedService(service)}
                                className="group p-8 border border-skin-background/10 hover:border-skin-background/30 hover:bg-skin-background/5 transition-all duration-500 cursor-pointer relative"
                            >
                                <div className="text-skin-background/50 mb-6 group-hover:text-skin-background transition-colors duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="font-skin-serif text-xl mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-skin-background/60 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-skin-cream mt-auto pt-4">
                                    <span>View Treatments</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a
                            href="https://momence.com/euforyc/appointment-reservation/75303?boardId=108632"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-skin-background text-skin-background px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-skin-background hover:text-skin-text transition-all duration-300"
                        >
                            Book a Consultation
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonial/Quote Section */}
            <section className="py-24 md:py-32 bg-skin-cream/30">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-skin-accent/40 mx-auto">
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" />
                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                        </svg>
                    </div>
                    <blockquote className="font-skin-serif text-skin-text text-2xl md:text-3xl italic leading-relaxed mb-8">
                        &ldquo;Your skin is the first thing people see. We're here to help you feel confident and radiant, enhancing your natural beauty with precision and care.&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-px bg-skin-accent/30"></div>
                        <p className="text-skin-text/60 text-sm tracking-[0.1em] uppercase">
                            Euforyc Skin Studio Team
                        </p>
                        <div className="w-12 h-px bg-skin-accent/30"></div>
                    </div>
                </div>
            </section>





            {/* About Section */}
            <section id="about" className="py-24 md:py-32 bg-skin-cream/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="font-skin-sans text-skin-accent text-sm tracking-[0.2em] uppercase mb-4">
                                About Us
                            </p>
                            <h2 className="font-skin-serif text-skin-text text-3xl md:text-4xl leading-tight mb-6">
                                Where expertise meets elegance
                            </h2>
                            <p className="text-skin-text/70 leading-relaxed mb-6">
                                At Euforyc Skin Studio, we believe everyone deserves to feel confident and radiant in their own skin. Our aesthetic clinic combines advanced treatments with a personalized approach, ensuring each client receives care tailored to their unique needs.
                            </p>
                            <p className="text-skin-text/70 leading-relaxed">
                                Part of the Euforyc Studios wellness vision, we're dedicated to providing premium aesthetic treatments in a serene, luxurious environment. Our qualified practitioners use only the finest products and cutting-edge techniques to help you achieve your aesthetic goals.
                            </p>
                        </div>

                        {/* Decorative Image Placeholder */}
                        <div className="relative">
                            <div className="aspect-[4/5] bg-gradient-to-br from-skin-muted/40 to-skin-cream rounded-sm overflow-hidden">
                                <div className="absolute inset-0">
                                    <Image
                                        src="/skin-studio-about.jpg"
                                        alt="Euforyc Skin Studio Treatment"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                            {/* Decorative frame */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full border border-skin-accent/20 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="book-consultation" className="py-24 md:py-32 bg-skin-background">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="font-skin-sans text-skin-accent text-sm tracking-[0.2em] uppercase mb-4">
                        Begin Your Journey
                    </p>
                    <h2 className="font-skin-serif text-skin-text text-3xl md:text-4xl lg:text-5xl italic leading-tight mb-6">
                        Discover your path<br />to your best self
                    </h2>
                    <p className="text-skin-text/70 max-w-2xl mx-auto mb-10">
                        Ready to take the first step towards feeling confident and radiant? Book your consultation today and let our expert practitioners create a personalized treatment plan just for you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <a
                            href="tel:+447375710370"
                            className="bg-skin-text text-skin-background px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-skin-accent transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-3"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            Call Now
                        </a>
                        <a
                            href="https://wa.me/447375710370"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-skin-text text-skin-text px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-skin-text hover:text-skin-background transition-all duration-300 inline-flex items-center justify-center gap-3"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp Us
                        </a>
                    </div>

                    <p className="text-skin-text/50 text-sm">
                        We'll get back to you within 24 hours
                    </p>
                </div>
            </section>

            {/* Instagram/Social Section */}
            <section className="py-16 bg-skin-muted/20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-skin-text/60 text-sm tracking-[0.15em] uppercase mb-4">
                        Follow Our Journey
                    </p>
                    <a
                        href="https://www.instagram.com/euforycskinstudio?igsh=MW1yNGllZXR1M2ltcA%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-skin-text hover:text-skin-accent transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span className="font-skin-serif text-lg">@euforycskinstudio</span>
                    </a>
                </div>
            </section>
            {/* Service Detail Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-skin-text/80 backdrop-blur-sm"
                        onClick={() => setSelectedService(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-skin-background w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="sticky top-0 right-0 p-4 flex justify-end bg-skin-background z-10 border-b border-skin-muted/20">
                            <button
                                onClick={() => setSelectedService(null)}
                                className="p-2 hover:bg-skin-muted/20 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 pt-2">
                            <div className="text-skin-accent mb-4 flex justify-center">
                                {selectedService.icon}
                            </div>
                            <h3 className="font-skin-serif text-3xl text-skin-text text-center mb-2">
                                {selectedService.title}
                            </h3>
                            <p className="text-skin-text/60 text-center text-sm mb-8 leading-relaxed px-4">
                                {selectedService.description}
                            </p>

                            <div className="space-y-4">
                                {selectedService.items && selectedService.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-skin-muted/20 pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-skin-serif text-lg text-skin-text">{item.name}</p>
                                            <p className="text-xs text-skin-text/50 uppercase tracking-wider">{item.duration}</p>
                                        </div>
                                        <p className="font-skin-sans text-skin-accent font-medium">{item.price}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 text-center">
                                <a
                                    href="https://momence.com/euforyc/appointment-reservation/75303?boardId=108632"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setSelectedService(null)}
                                    className="inline-block bg-skin-text text-skin-background px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-skin-accent transition-all duration-300"
                                >
                                    Book This Treatment
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
