'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, ExternalLink, User, Package } from 'lucide-react';
import MomenceSchedule from '@/components/MomenceSchedule';

export default function Book() {
  // Add state to track if the schedule is loaded
  const [scheduleLoaded, setScheduleLoaded] = useState(false);

  // Use effect to check if the schedule is loaded after a delay
  useEffect(() => {
    // Set a timeout to check if the schedule is loaded
    const timer = setTimeout(() => {
      setScheduleLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="section-padding py-24 bg-[#fffcf2]">
        <div className="container-width text-center">
          <h1 className="heading-primary mb-8">Book Your Session</h1>
          <p className="body-text text-xl max-w-3xl mx-auto">
            Choose your preferred booking option below. Whether you're looking for a single class, 
            a private session, or a package deal, we have the perfect option for you.
          </p>
        </div>
      </section>

      {/* Booking Options */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Drop-In Single Classes */}
            <div className="bg-white border border-[#1a260e]/10 rounded-lg p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="bg-[#1a260e]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-[#1a260e]" />
              </div>
              <h3 className="font-playfair text-2xl font-light">Drop-In Classes</h3>
              <p className="body-text text-[#1a260e]/70">
                Perfect for trying out our classes or fitting a session into your busy schedule.
              </p>
              <ul className="space-y-2 text-sm text-[#1a260e]/60">
                <li>• Reformer Pilates - £25</li>
                <li>• Hot Pilates - £30</li>
                <li>• No commitment required</li>
              </ul>
              <a
                href="https://momence.com/u/euforyc-6ClBZX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a260e] text-[#fffcf2] px-6 py-3 font-serif hover:bg-[#1a260e]/90 transition-colors duration-200"
              >
                BOOK DROP-IN
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* 1-1 Private Sessions */}
            <div className="bg-white border border-[#1a260e]/10 rounded-lg p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="bg-[#1a260e]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <User className="h-8 w-8 text-[#1a260e]" />
              </div>
              <h3 className="font-playfair text-2xl font-light">1-1 Private Sessions</h3>
              <p className="body-text text-[#1a260e]/70">
                Personalized attention and customized workouts tailored to your specific needs.
              </p>
              <ul className="space-y-2 text-sm text-[#1a260e]/60">
                <li>• Single session - £65</li>
                <li>• 60-minute sessions</li>
                <li>• Fully personalized</li>
              </ul>
              <a
                href="https://momence.com/u/euforyc-6ClBZX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a260e] text-[#fffcf2] px-6 py-3 font-serif hover:bg-[#1a260e]/90 transition-colors duration-200"
              >
                BOOK PRIVATE
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Packages */}
            <div className="bg-[#1a260e] text-[#fffcf2] rounded-lg p-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#fffcf2] text-[#1a260e] px-4 py-1 text-xs font-medium">
                BEST VALUE
              </div>
              <div className="bg-[#fffcf2]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-[#fffcf2]" />
              </div>
              <h3 className="font-playfair text-2xl font-light">Class Packages</h3>
              <p className="body-text text-[#fffcf2]/80">
                Save more with our class packages. Perfect for committed practitioners.
              </p>
              <ul className="space-y-2 text-sm text-[#fffcf2]/70">
                <li>• 4 to Unlimited classes</li>
                <li>• Valid for 30 days</li>
                <li>• Save up to £160</li>
              </ul>
              <a
                href="/packages"
                className="inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-6 py-3 font-serif hover:bg-[#fffcf2]/90 transition-colors duration-200"
              >
                VIEW PACKAGES
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Class Schedule Section - Enhanced for visibility */}
      <section id="class-schedule" className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Class Schedule</h2>
            <p className="body-text max-w-2xl mx-auto">
              Browse our upcoming classes and book directly from the calendar below.
            </p>
          </div>
          
          {/* Add a specific height constraint and styles to ensure the Momence widget renders properly */}
          <div className="border border-[#1a260e]/10 rounded-lg p-4 md:p-8 bg-[#fffcf2] min-h-[600px] relative">
            <MomenceSchedule />
          </div>
        </div>
      </section>

      {/* Our Classes Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Class Types */}
            <div className="space-y-8">
              <h2 className="heading-secondary">Our Classes</h2>
              
              <div className="space-y-6">
                {/* Reformer Pilates */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">Reformer Pilates (Group)</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>45 minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Max 6 people</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Equipment-based classes focusing on strength, flexibility, and control. 
                    Perfect for all levels with personalized modifications.
                  </p>
                </div>

                {/* Hot Pilates */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">Hot Pilates (Small Group)</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>45 minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Max 4 people</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Dynamic mat-based Pilates in our heated studio. High energy, 
                    low impact workout for enhanced flexibility and detoxification.
                  </p>
                </div>

                {/* 1:1 Sessions */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">1-1 Private Sessions</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>60 minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Private</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Personalized sessions tailored to your specific goals and needs. 
                    Ideal for beginners, rehabilitation, or advanced practitioners.
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Info & Contact */}
            <div className="space-y-8">
              <h2 className="heading-secondary">Studio Information</h2>
              
              {/* Location */}
              <div className="bg-[#1a260e]/5 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-5 w-5 text-[#1a260e]" />
                  <h3 className="font-playfair text-xl font-light">Studio Location</h3>
                </div>
                <p className="body-text mb-2">
                  7 Holmstall Ave<br />
                  Edgware HA8 5HX<br />
                  United Kingdom
                </p>
                <p className="font-inter text-sm text-[#1a260e]/80">
                  Free parking available
                </p>
              </div>

              {/* Contact for Assistance */}
              <div className="bg-white border border-[#1a260e]/10 p-6 rounded-lg">
                <h3 className="font-playfair text-xl font-light mb-4">
                  Need Help Booking?
                </h3>
                <p className="body-text text-[#1a260e]/80 mb-4">
                  Our team is happy to assist you with booking or answer any questions.
                </p>
                <div className="space-y-2">
                  <p className="font-inter text-sm">
                    <strong>Phone:</strong> +44 7375 710370
                  </p>
                  <p className="font-inter text-sm">
                    <strong>Email:</strong> euforyc@gmail.com
                  </p>
                  <p className="font-inter text-sm">
                    <strong>Instagram:</strong> @euforyc
                  </p>
                </div>
              </div>

              {/* Momence App */}
              <div className="bg-[#fffcf2] border border-[#1a260e]/10 p-6 rounded-lg">
                <h3 className="font-playfair text-xl font-light mb-2">
                  Book on the Go
                </h3>
                <p className="body-text text-sm text-[#1a260e]/70 mb-4">
                  Download the Momence app to book classes, manage your schedule, and track your progress.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://apps.apple.com/app/momence/id1556964324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a260e] hover:text-[#1a260e]/80 text-sm font-medium"
                  >
                    App Store →
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.momence.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a260e] hover:text-[#1a260e]/80 text-sm font-medium"
                  >
                    Google Play →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="heading-secondary text-[#fffcf2] mb-4">Booking Policies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h3 className="font-playfair text-lg font-light">Cancellation</h3>
              <p className="body-text text-sm text-[#fffcf2]/80">
                Cancel up to 24 hours before class to avoid losing your session
              </p>
            </div>

            <div className="text-center space-y-3">
              <h3 className="font-playfair text-lg font-light">Late Arrival</h3>
              <p className="body-text text-sm text-[#fffcf2]/80">
                Please arrive 5-10 minutes early. Late arrivals may not be admitted
              </p>
            </div>

            <div className="text-center space-y-3">
              <h3 className="font-playfair text-lg font-light">Package Validity</h3>
              <p className="body-text text-sm text-[#fffcf2]/80">
                All class packages are valid for 30 days from purchase date
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Time Visitor */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">First Time at Euforyc?</h2>
            <p className="body-text max-w-2xl mx-auto">
              We're excited to welcome you to our studio! Here's what to expect 
              for your first session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-[#1a260e]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <span className="font-playfair text-xl font-light">1</span>
              </div>
              <h3 className="font-playfair text-lg font-light">Arrive Early</h3>
              <p className="body-text text-sm">
                Come 15 minutes before your first class to complete our health 
                questionnaire and get oriented with the studio.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-[#1a260e]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <span className="font-playfair text-xl font-light">2</span>
              </div>
              <h3 className="font-playfair text-lg font-light">What to Bring</h3>
              <p className="body-text text-sm">
                Just bring yourself! We provide all equipment, mats, and towels. 
                Wear comfortable workout clothes and grip socks if you have them.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-[#1a260e]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <span className="font-playfair text-xl font-light">3</span>
              </div>
              <h3 className="font-playfair text-lg font-light">Meet Your Instructor</h3>
              <p className="body-text text-sm">
                Let your instructor know it's your first time. They'll provide 
                modifications and ensure you feel comfortable throughout the class.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}