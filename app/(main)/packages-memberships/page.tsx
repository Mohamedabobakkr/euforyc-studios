import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Calendar, Crown, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Packages & Memberships - Euforyc Studios',
  description: 'Choose between flexible class packages or ongoing membership contracts for your Pilates journey.',
};

export default function PackagesMemberships() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="section-padding py-24 bg-[#fffcf2]">
        <div className="container-width text-center">
          <h1 className="heading-secondary mb-6">Packages & Memberships</h1>
          <p className="body-text text-xl max-w-4xl mx-auto mb-8">
            Choose the perfect option for your fitness journey. Select from flexible class packages 
            or ongoing membership contracts designed to support your long-term wellness goals.
          </p>
        </div>
      </section>

      {/* Selection Options */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Class Packages */}
              <Link 
                href="/packages"
                className="group relative bg-[#fffcf2] border-2 border-[#1a260e]/10 rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#1a260e]/20"
              >
                <div className="absolute top-6 right-6">
                  <div className="bg-[#1a260e]/5 p-3 rounded-full group-hover:bg-[#1a260e]/10 transition-colors">
                    <Package className="h-8 w-8 text-[#1a260e]" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl font-light text-[#1a260e] mb-3">
                      Class Packages
                    </h2>
                    <p className="text-[#1a260e]/70 text-lg leading-relaxed">
                      Flexible pay-as-you-go packages perfect for those who want to try different classes 
                      or have varying schedules.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#1a260e] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#1a260e]/80">30-day validity from first class</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#1a260e] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#1a260e]/80">No long-term commitment</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#1a260e] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#1a260e]/80">Perfect for beginners or occasional visitors</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#1a260e] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#1a260e]/80">Mix and match class types</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex items-center text-[#1a260e] opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className="font-sans text-sm font-medium mr-2">View Packages</span>
                      <div className="transform group-hover:translate-x-1 transition-transform">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Memberships */}
              <Link 
                href="/memberships"
                className="group relative bg-[#1a260e] text-[#fffcf2] rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-6 right-6">
                  <div className="bg-[#fffcf2]/10 p-3 rounded-full group-hover:bg-[#fffcf2]/20 transition-colors">
                    <Crown className="h-8 w-8 text-[#fffcf2]" />
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-full">
                  <Sparkles className="h-4 w-4 text-[#fffcf2]" />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="inline-block bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      NEW
                    </div>
                    <h2 className="font-serif text-3xl font-light text-[#fffcf2] mb-3">
                      Contract Memberships
                    </h2>
                    <p className="text-[#fffcf2]/70 text-lg leading-relaxed">
                      Ongoing memberships with better value and priority booking for committed practitioners 
                      ready to make Pilates a lifestyle.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#fffcf2] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#fffcf2]/80">Better value per class</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#fffcf2] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#fffcf2]/80">Priority booking access</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#fffcf2] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#fffcf2]/80">Ongoing monthly commitment</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#fffcf2] w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#fffcf2]/80">Perfect for regular practitioners</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex items-center text-[#fffcf2] opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className="font-sans text-sm font-medium mr-2">View Memberships</span>
                      <div className="transform group-hover:translate-x-1 transition-transform">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-4">Which Option Is Right For You?</h2>
              <p className="body-text text-lg text-[#1a260e]/70">
                Compare our options to find the perfect fit for your fitness journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#fffcf2] rounded-lg p-8 border border-[#1a260e]/10">
                <div className="flex items-center mb-6">
                  <Package className="h-6 w-6 text-[#1a260e] mr-3" />
                  <h3 className="font-serif text-xl text-[#1a260e]">Choose Packages If:</h3>
                </div>
                <ul className="space-y-3 text-[#1a260e]/80">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    You're new to Pilates
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    You have an irregular schedule
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    You prefer no long-term commitment
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    You want to try different class types
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a260e] text-[#fffcf2] rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <Crown className="h-6 w-6 text-[#fffcf2] mr-3" />
                  <h3 className="font-serif text-xl text-[#fffcf2]">Choose Memberships If:</h3>
                </div>
                <ul className="space-y-3 text-[#fffcf2]/80">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1">✓</span>
                    You attend classes regularly (2+ times/week)
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1">✓</span>
                    You want the best value per class
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1">✓</span>
                    You prefer priority booking
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1">✓</span>
                    You're committed to your fitness journey
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-secondary mb-6">Still Not Sure?</h2>
            <p className="body-text text-lg text-[#1a260e]/70 mb-8">
              Our team is here to help you choose the perfect option for your fitness goals and schedule.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="inline-block bg-[#1a260e] text-[#fffcf2] px-8 py-3 font-serif hover:bg-[#1a260e]/90 transition-colors duration-200"
              >
                GET PERSONALIZED ADVICE
              </Link>
              <Link
                href="/book"
                className="inline-block border-2 border-[#1a260e] text-[#1a260e] px-8 py-3 font-serif hover:bg-[#1a260e] hover:text-[#fffcf2] transition-colors duration-200"
              >
                BOOK A TRIAL CLASS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}