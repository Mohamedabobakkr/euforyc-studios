import type { Metadata } from 'next';
import { ExternalLink, Crown, Calendar, Star, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contract Memberships - Euforyc Studios',
  description: 'Monthly pilates memberships at Euforyc Studios London. Best value reformer pilates, hot pilates contracts in Edgware with priority booking.',
};

// Membership types
interface Membership {
  name: string;
  monthlyPrice: string;
  description: string;
  features: string[];
  momenceUrl: string;
  popular?: boolean;
  savings?: string;
}

// Membership data with Momence links (these would be the actual membership URLs)
const memberships = {
  reformer: {
    title: 'Reformer Pilates Memberships',
    subtitle: 'Equipment-based group classes with ongoing commitment',
    memberships: [
      {
        name: '4 Classes/Month',
        monthlyPrice: '£70',
        description: 'Perfect for occasional practitioners',
        savings: 'Save £20/month vs packages',
        features: [
          '4 Reformer classes per month',
          'Priority booking access',
          '1 free grip sock',
          '1 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/497869' // Replace with actual membership URL
      },
      {
        name: '8 Classes/Month',
        monthlyPrice: '£140',
        description: 'Great for regular practitioners',
        savings: 'Save £30/month vs packages',
        popular: true,
        features: [
          '8 Reformer classes per month',
          'Priority booking access',
          '2 free grip socks',
          '2 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498245' // Replace with actual membership URL
      },
      {
        name: '12 Classes/Month',
        monthlyPrice: '£205',
        description: 'Perfect for committed practitioners',
        savings: 'Save £35/month vs packages',
        features: [
          '12 Reformer classes per month',
          'Priority booking access',
          '3 free grip socks',
          '3 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498246' // Replace with actual membership URL
      },
      {
        name: 'Unlimited Classes',
        monthlyPrice: '£260',
        description: 'For the dedicated practitioner',
        savings: 'Save £40/month vs packages',
        features: [
          'Unlimited Reformer classes per month',
          'Priority booking access',
          '4 free grip socks',
          '4 free matcha',
          '1 free Guest Pass'
        ],
        momenceUrl: 'https://momence.com/m/498247' // Replace with actual membership URL
      }
    ]
  },
  hotPilates: {
    title: 'Hot Pilates Memberships',
    subtitle: 'Dynamic heated mat classes with monthly commitment',
    memberships: [
      {
        name: '4 Classes/Month',
        monthlyPrice: '£60',
        description: 'Perfect for heat newcomers',
        savings: 'Save £8/month vs packages',
        features: [
          '4 Hot Pilates classes per month',
          'Priority booking access',
          '1 free grip sock',
          '1 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498688' // Replace with actual membership URL
      },
      {
        name: '8 Classes/Month',
        monthlyPrice: '£120',
        description: 'Great for heat lovers',
        savings: 'Save £8/month vs packages',
        popular: true,
        features: [
          '8 Hot Pilates classes per month',
          'Priority booking access',
          '2 free grip socks',
          '2 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498691' // Replace with actual membership URL
      },
      {
        name: '12 Classes/Month',
        monthlyPrice: '£170',
        description: 'Perfect for heat lovers',
        savings: 'Save £10/month vs packages',
        features: [
          '12 Hot Pilates classes per month',
          'Priority booking access',
          '3 free grip socks',
          '3 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498695' // Replace with actual membership URL
      },
      {
        name: 'Unlimited Classes',
        monthlyPrice: '£250',
        description: 'For the heat enthusiast',
        savings: 'Save £30/month vs packages',
        features: [
          'Unlimited Hot Pilates classes per month',
          'Priority booking access',
          '4 free grip socks',
          '4 free matcha',
          '1 free Guest Pass'
        ],
        momenceUrl: 'https://momence.com/m/498697' // Replace with actual membership URL
      }
    ]
  },
  hybrid: {
    title: 'Hybrid Memberships',
    subtitle: 'Mix and match Reformer and Hot Pilates classes',
    memberships: [
      {
        name: '4 Mixed Classes/Month',
        monthlyPrice: '£74',
        description: 'Perfect for variety seekers',
        savings: 'Save £23/month vs packages',
        features: [
          '4 classes per month (any combination)',
          'Priority booking access',
          '1 free grip sock',
          '1 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498707' // Replace with actual membership URL
      },
      {
        name: '8 Mixed Classes/Month',
        monthlyPrice: '£148',
        description: 'Great for regular variety',
        savings: 'Save £33/month vs packages',
        popular: true,
        features: [
          '8 classes per month (any combination)',
          'Priority booking access',
          '2 free grip socks',
          '2 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498711' // Replace with actual membership URL
      },
      {
        name: '12 Mixed Classes/Month',
        monthlyPrice: '£212',
        description: 'Perfect balance of variety',
        savings: 'Save £34/month vs packages',
        features: [
          '12 classes per month (any combination)',
          'Priority booking access',
          '3 free grip socks',
          '3 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498713' // Replace with actual membership URL
      },
      {
        name: 'Unlimited Mixed',
        monthlyPrice: '£265',
        description: 'Ultimate variety and value',
        savings: 'Save £50/month vs packages',
        features: [
          'Unlimited classes per month (all types)',
          'Priority booking access',
          '4 free grip socks',
          '4 free matcha',
          '1 free Guest Pass'
        ],
        momenceUrl: 'https://momence.com/m/498719' // Replace with actual membership URL
      }
    ]
  },
  bellyDancing: {
    title: 'Dance Membership',
    subtitle: 'Flexible membership for Belly Dance, Afro Dance, Dabke Dance & more',
    memberships: [
      {
        name: '4 Classes/Month',
        monthlyPrice: '£45',
        description: 'Monthly dance commitment',
        savings: 'Save £15/month vs drop-in',
        features: [
          '4 Dance classes per month',
          'Valid for all dance styles',
          'Priority booking access',
          'Ongoing monthly commitment'
        ],
        momenceUrl: 'https://momence.com/m/597181'
      },
      {
        name: '8 Classes/Month',
        monthlyPrice: '£85',
        description: 'More dance, more flexibility',
        savings: 'Save £40/month vs drop-in',
        features: [
          '8 Dance classes per month',
          'Valid for all dance styles',
          'Priority booking access',
          'Ongoing monthly commitment'
        ],
        momenceUrl: 'https://momence.com/m/609596'
      }
    ]
  }
};

export default function Memberships() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="section-padding py-24 bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width text-center">
          <div className="inline-flex items-center bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            NEW CONTRACT MEMBERSHIPS
          </div>
          <h1 className="heading-secondary mb-6 text-[#fffcf2]">Contract Memberships</h1>
          <p className="body-text text-xl max-w-4xl mx-auto text-[#fffcf2]/80">
            Committed to your wellness journey? Our contract memberships offer exceptional value, 
            priority booking, and exclusive perks for dedicated practitioners ready to make Pilates a lifestyle.
          </p>
        </div>
      </section>

      {/* Reformer Memberships */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-2">{memberships.reformer.title}</h2>
              <p className="tagline text-[#1a260e]/60">{memberships.reformer.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memberships.reformer.memberships.map((membership, index) => (
                <a
                  key={index}
                  href={membership.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    membership.popular 
                      ? 'bg-[#1a260e] text-[#fffcf2] border-2 border-[#1a260e]' 
                      : 'bg-white border-2 border-[#1a260e]/10 text-[#1a260e] hover:border-[#1a260e]/20'
                  }`}
                >
                  {membership.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Crown className="w-4 h-4 mr-2" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-light">{membership.name}</h3>
                      <p className={`text-sm ${membership.popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'}`}>
                        {membership.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-serif text-4xl font-light">{membership.monthlyPrice}</p>
                      <p className={`text-sm ${membership.popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'}`}>
                        per month
                      </p>
                      {membership.savings && (
                        <p className={`font-sans text-sm font-medium ${
                          membership.popular ? 'text-green-400' : 'text-green-700'
                        }`}>
                          {membership.savings}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 text-left">
                      {membership.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                            membership.popular ? 'text-green-400' : 'text-green-600'
                          }`} />
                          <span className={`text-sm ${
                            membership.popular ? 'text-[#fffcf2]/80' : 'text-[#1a260e]/80'
                          }`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={`flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pt-4 ${
                      membership.popular ? 'text-[#fffcf2]' : 'text-[#1a260e]'
                    }`}>
                      <span className="font-sans text-sm font-medium mr-2">Start Membership</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hot Pilates Memberships */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-2">{memberships.hotPilates.title}</h2>
              <p className="tagline text-[#1a260e]/60">{memberships.hotPilates.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memberships.hotPilates.memberships.map((membership, index) => (
                <a
                  key={index}
                  href={membership.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    membership.popular 
                      ? 'bg-[#1a260e] text-[#fffcf2] border-2 border-[#1a260e]' 
                      : 'bg-white border-2 border-[#1a260e]/10 text-[#1a260e] hover:border-[#1a260e]/20'
                  }`}
                >
                  {membership.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Crown className="w-4 h-4 mr-2" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-light">{membership.name}</h3>
                      <p className={`text-sm ${membership.popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'}`}>
                        {membership.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-serif text-4xl font-light">{membership.monthlyPrice}</p>
                      <p className={`text-sm ${membership.popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'}`}>
                        per month
                      </p>
                      {membership.savings && (
                        <p className={`font-sans text-sm font-medium ${
                          membership.popular ? 'text-green-400' : 'text-green-700'
                        }`}>
                          {membership.savings}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 text-left">
                      {membership.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                            membership.popular ? 'text-green-400' : 'text-green-600'
                          }`} />
                          <span className={`text-sm ${
                            membership.popular ? 'text-[#fffcf2]/80' : 'text-[#1a260e]/80'
                          }`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={`flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pt-4 ${
                      membership.popular ? 'text-[#fffcf2]' : 'text-[#1a260e]'
                    }`}>
                      <span className="font-sans text-sm font-medium mr-2">Start Membership</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid Memberships */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-2">{memberships.hybrid.title}</h2>
              <p className="tagline text-[#1a260e]/60">{memberships.hybrid.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memberships.hybrid.memberships.map((membership, index) => (
                <a
                  key={index}
                  href={membership.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    membership.popular 
                      ? 'bg-[#1a260e] text-[#fffcf2] border-2 border-[#1a260e]' 
                      : 'bg-white border-2 border-[#1a260e]/10 text-[#1a260e] hover:border-[#1a260e]/20'
                  }`}
                >
                  {membership.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Crown className="w-4 h-4 mr-2" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-light">{membership.name}</h3>
                      <p className={`text-sm ${membership.popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'}`}>
                        {membership.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-serif text-4xl font-light">{membership.monthlyPrice}</p>
                      <p className={`text-sm ${membership.popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'}`}>
                        per month
                      </p>
                      {membership.savings && (
                        <p className={`font-sans text-sm font-medium ${
                          membership.popular ? 'text-green-400' : 'text-green-700'
                        }`}>
                          {membership.savings}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 text-left">
                      {membership.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                            membership.popular ? 'text-green-400' : 'text-green-600'
                          }`} />
                          <span className={`text-sm ${
                            membership.popular ? 'text-[#fffcf2]/80' : 'text-[#1a260e]/80'
                          }`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={`flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pt-4 ${
                      membership.popular ? 'text-[#fffcf2]' : 'text-[#1a260e]'
                    }`}>
                      <span className="font-sans text-sm font-medium mr-2">Start Membership</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dance Membership */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-2">{memberships.bellyDancing.title}</h2>
              <p className="tagline text-[#1a260e]/60">{memberships.bellyDancing.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memberships.bellyDancing.memberships.map((membership, index) => (
                <a
                  key={index}
                  href={membership.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 border-[#1a260e]/10 text-[#1a260e] hover:border-[#1a260e]/20"
                >
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-light">{membership.name}</h3>
                      <p className="text-sm text-[#1a260e]/60">
                        {membership.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-serif text-4xl font-light">{membership.monthlyPrice}</p>
                      <p className="text-sm text-[#1a260e]/60">per month</p>
                      {membership.savings && (
                        <p className="font-sans text-sm font-medium text-green-700">
                          {membership.savings}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 text-left">
                      {membership.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" />
                          <span className="text-sm text-[#1a260e]/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pt-4 text-[#1a260e]">
                      <span className="font-sans text-sm font-medium mr-2">Start Membership</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="heading-secondary text-[#fffcf2] mb-8">Membership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="bg-[#fffcf2]/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-[#fffcf2]" />
                </div>
                <h3 className="font-serif text-xl font-light">Priority Booking</h3>
                <p className="text-sm text-[#fffcf2]/80">
                  Book your favorite classes before non-members with exclusive early access
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-[#fffcf2]/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Star className="h-8 w-8 text-[#fffcf2]" />
                </div>
                <h3 className="font-serif text-xl font-light">Better Value</h3>
                <p className="text-sm text-[#fffcf2]/80">
                  Significant savings compared to individual packages, plus exclusive member discounts
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-[#fffcf2]/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Crown className="h-8 w-8 text-[#fffcf2]" />
                </div>
                <h3 className="font-serif text-xl font-light">VIP Perks</h3>
                <p className="text-sm text-[#fffcf2]/80">
                  Matcha passes, grip socks, assessments, and other exclusive member-only benefits
                </p>
              </div>
            </div>
            
            <div className="bg-[#fffcf2]/5 rounded-lg p-8 mt-12">
              <h3 className="font-serif text-xl font-light mb-4 text-[#fffcf2]">Membership Terms</h3>
              <div className="text-sm text-[#fffcf2]/70 space-y-2">
                <p>• 6-month minimum commitment via rolling monthly contract</p>
                <p>• Monthly billing on the same date each month via card or Direct Debit</p>
                <p>• Two full billing cycles notice required for cancellation after minimum term</p>
                <p>• Freeze options available up to 4 weeks per year (7-day minimum blocks)</p>
              </div>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-[#fffcf2]/70 mb-4">
                Ready to commit to your wellness journey?
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#fffcf2] text-[#1a260e] px-8 py-3 font-serif hover:bg-[#fffcf2]/90 transition-colors duration-200"
              >
                SPEAK TO OUR TEAM
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}