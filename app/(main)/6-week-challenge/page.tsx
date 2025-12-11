import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Target, Users, Flame, Dumbbell, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: '6-Week Body Transformation Challenge - Euforyc Studios',
    description: 'Transform your body in 6 weeks with unlimited Pilates classes. Join our New Year challenge - only 15 spots available. Reformer, Hot Pilates, Hybrid & 1-1 options.',
};

// Challenge packages data
const challengePackages = [
    {
        id: 'reformer',
        name: 'Reformer Unlimited',
        description: '6 weeks of unlimited reformer pilates group classes',
        features: ['Unlimited group reformer classes', 'Max 6 per class', '45-min sessions', 'Equipment-based strength'],
        momenceUrl: 'https://momence.com/m/595505',
        icon: Dumbbell,
        highlight: false,
    },
    {
        id: 'hot-pilates',
        name: 'Hot Pilates Unlimited',
        description: '6 weeks of unlimited infrared-heated mat pilates',
        features: ['Unlimited hot pilates classes', 'Infrared-heated studio', 'Enhanced flexibility', 'Maximum calorie burn'],
        momenceUrl: 'https://momence.com/m/595506',
        icon: Flame,
        highlight: true,
    },
    {
        id: 'hybrid',
        name: 'Hybrid Challenge',
        description: '6 weeks unlimited access to both reformer & hot pilates',
        features: ['Unlimited reformer + hot pilates', 'Best of both worlds', 'Maximum variety', 'Complete transformation'],
        momenceUrl: 'https://momence.com/m/595508',
        icon: Sparkles,
        highlight: true,
    },
    {
        id: '1-1',
        name: '1-1 Private',
        description: '6 weeks of personalized private training sessions',
        features: ['Private sessions', 'Fully customized program', 'Focused attention', 'Accelerated results'],
        momenceUrl: 'https://momence.com/m/595512',
        icon: Target,
        highlight: false,
    },
];

const benefits = [
    {
        title: 'Build Real Strength',
        description: 'Develop lean muscle and core strength that transforms how you move every day.',
    },
    {
        title: 'Improve Flexibility',
        description: 'Increase your range of motion and feel more fluid in your body.',
    },
    {
        title: 'Boost Confidence',
        description: 'Watch your body transform and feel empowered in every session.',
    },
    {
        title: 'Create a Habit',
        description: '6 weeks is the perfect time to establish a lasting fitness routine.',
    },
];

export default function SixWeekChallenge() {
    return (
        <>
            <div className="pt-24 pb-24 md:pb-0">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
                    {/* Background with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1a260e] to-[#2a3a1e]">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                    </div>

                    <div className="relative z-10 container-width text-center px-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#fffcf2]/10 backdrop-blur-sm border border-[#fffcf2]/20 rounded-full px-3 py-1.5 md:px-5 md:py-2 mb-6 md:mb-8">
                            <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#fffcf2]" />
                            <span className="text-xs md:text-sm text-[#fffcf2] tracking-wider">JANUARY 2026 • LIMITED SPOTS</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="font-serif text-[2.5rem] leading-[1.1] md:text-5xl lg:text-7xl text-[#fffcf2] tracking-wide mb-5 md:mb-6">
                            6-Week Body<br />
                            <span className="italic">Transformation</span><br />
                            Challenge
                        </h1>

                        <p className="text-[#fffcf2]/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-8 font-light">
                            Transform your body and mind with unlimited Pilates classes.
                            Only <strong className="text-[#fffcf2]">15 spots</strong> available for women ready to commit to real change.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="#packages"
                                className="group inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                            >
                                SECURE YOUR SPOT
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#benefits"
                                className="hidden md:inline text-[#fffcf2]/80 text-sm tracking-wider hover:text-[#fffcf2] transition-colors"
                            >
                                Learn More ↓
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[#fffcf2]/10">
                            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[#fffcf2]/60 text-xs md:text-sm">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    <span>Only 15 Spots</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    <span>6 Weeks</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <Target className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    <span>Unlimited Classes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Packages Section */}
                <section id="packages" className="section-padding bg-[#fffcf2]">
                    <div className="container-width">
                        <div className="text-center mb-10 md:mb-16">
                            <p className="tagline text-[#1a260e]/60 mb-4">CHOOSE YOUR PATH</p>
                            <h2 className="heading-secondary">
                                Select Your Challenge
                            </h2>
                            <p className="body-text max-w-2xl mx-auto mt-4">
                                Pick the program that fits your goals. Each option gives you unlimited access for the full 6 weeks.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                            {challengePackages.map((pkg) => {
                                const Icon = pkg.icon;
                                return (
                                    <a
                                        key={pkg.id}
                                        href={pkg.momenceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${pkg.highlight
                                            ? 'bg-gradient-to-br from-[#1a260e] to-[#2a3a1e] text-[#fffcf2]'
                                            : 'bg-white border border-[#1a260e]/10 text-[#1a260e]'
                                            }`}
                                    >
                                        {pkg.highlight && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-4 py-1 rounded-full">
                                                POPULAR
                                            </div>
                                        )}

                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${pkg.highlight ? 'bg-[#fffcf2]/10' : 'bg-[#1a260e]/5'
                                                }`}>
                                                <Icon className={`h-6 w-6 md:h-7 md:w-7 ${pkg.highlight ? 'text-[#fffcf2]' : 'text-[#1a260e]'}`} />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <h3 className="font-serif text-xl md:text-2xl font-light">{pkg.name}</h3>
                                                <p className={`text-sm ${pkg.highlight ? 'text-[#fffcf2]/80' : 'text-[#1a260e]/70'}`}>
                                                    {pkg.description}
                                                </p>
                                                <ul className="space-y-2 pt-2">
                                                    {pkg.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                                            <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${pkg.highlight ? 'text-green-400' : 'text-green-600'
                                                                }`} />
                                                            <span className={pkg.highlight ? 'text-[#fffcf2]/90' : 'text-[#1a260e]/80'}>
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-current/10">
                                            <span className={`inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3 ${pkg.highlight ? 'text-[#fffcf2]' : 'text-[#1a260e]'
                                                }`}>
                                                Secure Your Spot
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="section-padding bg-[#fffcf2]">
                    <div className="container-width">
                        <div className="text-center mb-10 md:mb-16">
                            <p className="tagline text-[#1a260e]/60 mb-4">WHY JOIN THE CHALLENGE?</p>
                            <h2 className="heading-secondary">
                                What 6 Weeks of Commitment<br />
                                <span className="italic">Can Do for You</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="text-center space-y-3 md:space-y-4 p-4 md:p-0 bg-white md:bg-transparent rounded-xl md:rounded-none">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a260e] rounded-full flex items-center justify-center mx-auto">
                                        <span className="font-serif text-lg md:text-xl text-[#fffcf2]">{index + 1}</span>
                                    </div>
                                    <h3 className="font-serif text-sm md:text-xl font-light text-[#1a260e]">{benefit.title}</h3>
                                    <p className="text-xs md:text-sm text-[#1a260e]/70">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Urgency Section */}
                <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
                    <div className="container-width">
                        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
                            <div className="inline-flex items-center gap-2 bg-[#fffcf2]/10 rounded-full px-4 py-2">
                                <Users className="h-4 w-4" />
                                <span className="text-xs md:text-sm tracking-wider">LIMITED TO 15 WOMEN</span>
                            </div>

                            <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light leading-tight">
                                This Is Your Year<br />
                                <span className="italic">to Transform</span>
                            </h2>

                            <p className="text-[#fffcf2]/80 text-sm md:text-lg max-w-xl mx-auto">
                                Don't let another January pass without taking action.
                                Join 15 women from North West London who are ready to commit to real, lasting change.
                            </p>

                            <a
                                href="#packages"
                                className="inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                            >
                                CLAIM YOUR SPOT NOW
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="section-padding bg-[#fffcf2]">
                    <div className="container-width">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-8 md:mb-12">
                                <h2 className="heading-secondary">Common Questions</h2>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                                    <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">When does the challenge start?</h3>
                                    <p className="text-xs md:text-sm text-[#1a260e]/70">The 6-week challenge kicks off in January 2026. You can secure your spot now before we fill up.</p>
                                </div>

                                <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                                    <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">What does "unlimited" mean?</h3>
                                    <p className="text-xs md:text-sm text-[#1a260e]/70">With the unlimited packages, you can attend as many classes as you want within your chosen category for the full 6 weeks.</p>
                                </div>

                                <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                                    <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">Do I need Pilates experience?</h3>
                                    <p className="text-xs md:text-sm text-[#1a260e]/70">Our classes accommodate all levels. Our instructors will provide modifications and guide you through every movement.</p>
                                </div>

                                <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                                    <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">What's the difference between the packages?</h3>
                                    <p className="text-xs md:text-sm text-[#1a260e]/70">Reformer focuses on equipment-based classes. Hot Pilates is mat-based in our infrared-heated studio. Hybrid gives you access to both. 1-1 Private is personalized training.</p>
                                </div>
                            </div>

                            <div className="text-center mt-8 md:mt-12">
                                <p className="text-sm text-[#1a260e]/60 mb-4">Have more questions?</p>
                                <Link href="/contact" className="btn-minimal">
                                    CONTACT US
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 md:py-20 bg-[#fffcf2]">
                    <div className="container-width">
                        <div className="text-center space-y-6">
                            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#1a260e] font-light">
                                Ready to Start Your Transformation?
                            </h2>
                            <a
                                href="#packages"
                                className="inline-flex items-center gap-2 bg-[#1a260e] text-[#fffcf2] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#1a260e]/90 hover:scale-[1.02]"
                            >
                                VIEW CHALLENGE OPTIONS
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sticky CTA - Mobile only */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fffcf2] border-t border-[#1a260e]/10 md:hidden z-50">
                <a
                    href="#packages"
                    className="flex items-center justify-center gap-2 bg-[#1a260e] text-[#fffcf2] w-full py-4 text-sm tracking-[0.1em] uppercase rounded-lg active:scale-[0.98] transition-transform font-medium"
                >
                    SECURE YOUR SPOT NOW
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </>
    );
}
