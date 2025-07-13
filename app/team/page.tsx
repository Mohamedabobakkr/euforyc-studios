import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Team - Euforyc Studios',
  description: 'Meet our experienced and certified Pilates instructors dedicated to your wellness journey.',
};

export default function Team() {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="section-padding py-24">
        <div className="container-width text-center">
          <h1 className="heading-primary mb-8">Meet Our Team</h1>
          <p className="body-text text-xl max-w-3xl mx-auto">
            Our passionate instructors are dedicated to guiding you on your wellness journey with 
            expertise, energy, and unwavering attention to your personal growth.
          </p>
        </div>
      </section>

      {/* Lead Instructor Profile */}
      <section className="section-padding">
        <div className="container-width max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image - Updated with correct file */}
            <div className="aspect-[3/4] relative overflow-hidden bg-[#1a260e]/5">
              <Image
                src="/Leadtrainer.JPG"
                alt="Lead Instructor"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="font-playfair text-3xl font-light text-[#1a260e] mb-2">
                  Lead Instructor
                </h2>
                <p className="font-inter text-sm text-[#1a260e]/70 font-medium tracking-wide uppercase">
                  Co-Founder & Master Pilates Instructor
                </p>
              </div>
              
              <blockquote className="font-playfair text-xl italic text-[#1a260e]/80 border-l-4 border-[#1a260e]/20 pl-6">
                "Every movement matters, every detail counts, and every client deserves personalized excellence."
              </blockquote>
              
              <div className="space-y-4">
                <p className="body-text">
                  With an unwavering commitment to precision and a genuine passion for helping others, 
                  our lead instructor brings exceptional energy and expertise to every session. Known for 
                  their meticulous attention to detail, they ensure each client receives personalized 
                  guidance tailored to their unique needs and goals.
                </p>
                
                <p className="body-text">
                  Their approach combines technical excellence with infectious enthusiasm, creating an 
                  environment where clients feel supported, motivated, and empowered. Whether you're a 
                  beginner or advanced practitioner, you'll benefit from their helpful nature and ability 
                  to break down complex movements into achievable steps.
                </p>
              </div>
              
              {/* Key Qualities */}
              <div className="pt-6 space-y-3">
                <h3 className="font-inter text-sm font-medium text-[#1a260e] uppercase tracking-wide">
                  Core Qualities
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-[#1a260e]/10 text-[#1a260e] text-sm font-inter">
                    High Attention to Detail
                  </span>
                  <span className="px-4 py-2 bg-[#1a260e]/10 text-[#1a260e] text-sm font-inter">
                    Exceptionally Helpful
                  </span>
                  <span className="px-4 py-2 bg-[#1a260e]/10 text-[#1a260e] text-sm font-inter">
                    Energetic & Motivating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="container-width">
        <div className="w-full h-px bg-[#1a260e]/10 my-12"></div>
      </div>
      
      {/* Co-founder Profile */}
      <section className="section-padding pt-0">
        <div className="container-width max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* For desktop: Content first, then image */}
            <div className="space-y-6 order-2 md:order-1">
              <div>
                <h2 className="font-playfair text-3xl font-light text-[#1a260e] mb-2">
                  Co-Founder
                </h2>
                <p className="font-inter text-sm text-[#1a260e]/70 font-medium tracking-wide uppercase">
                  Business Director & Wellness Advocate
                </p>
              </div>
              
              <blockquote className="font-playfair text-xl italic text-[#1a260e]/80 border-l-4 border-[#1a260e]/20 pl-6">
                "True wellness comes from balance - honoring both body and mind in equal measure."
              </blockquote>
              
              <div className="space-y-4">
                <p className="body-text">
                  As the co-founder and business director, she brings vision and structure to our studio's 
                  growth. With a background in business and a deep passion for wellness, she ensures that 
                  Euforyc Studios maintains its commitment to excellence while fostering an inclusive 
                  community.
                </p>
                
                <p className="body-text">
                  Her dedication to creating a supportive environment extends beyond the administrative 
                  aspects of the studio. She works tirelessly to ensure that each client's experience 
                  is seamless from booking to practice, and that our space remains a sanctuary for 
                  transformation and growth.
                </p>
              </div>
              
              {/* Key Qualities */}
              <div className="pt-6 space-y-3">
                <h3 className="font-inter text-sm font-medium text-[#1a260e] uppercase tracking-wide">
                  Core Qualities
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-[#1a260e]/10 text-[#1a260e] text-sm font-inter">
                    Strategic Vision
                  </span>
                  <span className="px-4 py-2 bg-[#1a260e]/10 text-[#1a260e] text-sm font-inter">
                    Community Builder
                  </span>
                  <span className="px-4 py-2 bg-[#1a260e]/10 text-[#1a260e] text-sm font-inter">
                    Wellness Advocate
                  </span>
                </div>
              </div>
            </div>
            
            {/* Image - on the right side for desktop */}
            <div className="aspect-[3/4] relative overflow-hidden bg-[#1a260e]/5 order-1 md:order-2">
              <Image
                src="/Cofounder.JPG"
                alt="Co-Founder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Difference */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="heading-secondary text-[#fffcf2]">Experience the Difference</h2>
            <p className="body-text text-[#fffcf2]/80 text-lg">
              Book a session today and discover how our team's personalized attention, expert guidance, 
              and positive energy can transform your Pilates practice.
            </p>
            <a 
              href="/book" 
              className="inline-block bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-serif text-lg hover:bg-[#fffcf2]/90 transition-colors duration-200"
            >
              BOOK YOUR SESSION
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}