/**
 * Teachers Page
 * Meet our expert instructors - Euforyc Studios
 */

import React from 'react';
import { Metadata } from 'next';
import { Users, Award, Heart, Sparkles } from 'lucide-react';
import TeacherCard from '@/components/momence/TeacherCard';
import { FullPageLoading } from '@/components/momence/LoadingState';
import ErrorState, { EmptyState } from '@/components/momence/ErrorState';
import { momenceClient } from '@/lib/momence-client';

export const metadata: Metadata = {
  title: 'Meet Our Instructors | Expert Pilates & Barre Teachers',
  description:
    'Meet our certified reformer pilates, hot pilates, barre, and dance instructors at Euforyc Studios Edgware. Experienced, passionate women\'s fitness experts dedicated to your wellness journey in North London.',
  keywords: [
    'pilates instructors edgware',
    'pilates teachers london',
    'certified pilates trainers north london',
    'reformer pilates experts',
    'barre instructors london',
    'fitness coaches edgware',
    'women pilates instructors',
  ],
  openGraph: {
    title: 'Meet Our Expert Instructors | Euforyc Studios',
    description:
      'Our certified pilates, barre and dance instructors at Euforyc Studios Edgware. Experience, expertise, and passion for women\'s wellness.',
    type: 'website',
  },
};

export default async function TeachersPage() {
  let teachers: any[] = [];
  let error = null;

  try {
    // Fetch events to extract instructor data (since Teachers API doesn't return details)
    const events = await momenceClient.getEvents({
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
    });

    // Extract unique instructors from events, excluding dance teachers
    const instructorsMap = new Map<string, any>();

    events.forEach((event) => {
      if (!event.instructor) return;

      // Skip dance classes
      const title = event.title.toLowerCase();
      if (
        title.includes('dance') ||
        title.includes('afro') ||
        title.includes('dabke') ||
        title.includes('belly')
      ) {
        return;
      }

      // Check if instructor already exists
      const existing = instructorsMap.get(event.instructor.id);
      if (!existing) {
        // Remove profile image for Jade Williams
        const profileImage = event.instructor.name.toLowerCase().includes('jade')
          ? null
          : event.instructor.profileImageUrl;

        instructorsMap.set(event.instructor.id, {
          id: event.instructor.id,
          name: event.instructor.name,
          bio: event.instructor.bio || 'Certified Pilates instructor dedicated to helping you achieve your wellness goals through mindful movement and strength building.',
          shortBio: '', // Can be filled from Momence later
          profileImageUrl: profileImage,
          certifications: [],
          specialties: [event.title.split('(')[0].trim()],
          classesTeaching: [event.title.split('(')[0].trim()],
          isActive: true,
          displayOrder: 0,
        });
      } else {
        // Add unique class types this instructor teaches
        const classType = event.title.split('(')[0].trim();
        if (!existing.specialties.includes(classType)) {
          existing.specialties.push(classType);
        }
        if (!existing.classesTeaching.includes(classType)) {
          existing.classesTeaching.push(classType);
        }
      }
    });

    teachers = Array.from(instructorsMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } catch (err) {
    console.error('Failed to fetch teachers:', err);
    error = err instanceof Error ? err.message : 'Failed to load instructors';
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen pt-32">
        <ErrorState
          title="Unable to Load Instructors"
          message={error}
          showContactSupport={true}
        />
      </main>
    );
  }

  // Empty state
  if (!teachers || teachers.length === 0) {
    return (
      <main className="min-h-screen pt-32">
        <EmptyState
          icon={Users}
          title="No Instructors Found"
          message="We're currently updating our instructor profiles. Please check back soon."
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-[#1a260e] text-white pt-36 pb-14 md:pt-40 md:pb-16 overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="container-width relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Heading */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-[0.95] tracking-tight">
              Meet Our Instructors
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mx-auto font-light">
              Our certified instructors bring expertise and dedication to every class.
            </p>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a260e] mb-5 tracking-tight">
                Our Teaching Team
              </h2>
              <p className="text-lg text-[#1a260e]/60 max-w-2xl mx-auto font-light leading-relaxed">
                Get to know the faces behind the classes. Each instructor brings unique expertise
                and style to create an inclusive, supportive environment.
              </p>
            </div>

            {/* Teachers Count */}
            <div className="text-center mb-12">
              <p className="text-sm text-[#1a260e]/50 font-light">
                <span className="font-semibold text-[#1a260e] text-lg">{teachers.length}</span>{' '}
                {teachers.length === 1 ? 'instructor' : 'instructors'} ready to guide your journey
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative section-padding bg-[#1a260e] text-white overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="container-width relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight leading-[1.1]">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light">
              Book a class with one of our expert instructors and experience the Euforyc difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/schedule"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#1a260e] rounded-2xl
                  hover:bg-[#fffcf2] hover:scale-105 hover:shadow-[0_12px_30px_rgba(255,255,255,0.2)]
                  transition-all duration-500 font-semibold tracking-wide"
              >
                <Users className="w-5 h-5" />
                View Class Schedule
              </a>
              <a
                href="/packages-memberships"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl backdrop-blur-sm
                  hover:bg-white/15 hover:scale-105 hover:shadow-lg
                  transition-all duration-500 font-semibold tracking-wide"
              >
                Explore Packages
              </a>
            </div>

            {/* Contact */}
            <div className="mt-14 pt-10 border-t border-white/10">
              <p className="text-sm text-white/50 font-light">
                Questions about our instructors or want to request a specific teacher?{' '}
                <a
                  href="mailto:info@euforyc.co.uk"
                  className="text-white hover:text-white/80 underline underline-offset-4 transition-colors duration-200 font-medium"
                >
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
