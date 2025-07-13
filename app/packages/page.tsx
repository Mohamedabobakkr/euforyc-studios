import type { Metadata } from 'next';
import { ExternalLink, Package, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Class Packages - Euforyc Studios',
  description: 'Choose from our range of class packages for Reformer Pilates, Hot Pilates, and Private Sessions.',
};

// Package types
interface ClassPackage {
  name: string;
  price: string;
  savings?: string;
  momenceUrl: string;
}

// Package data with specific Momence links
const packages = {
  reformer: {
    title: 'Reformer Pilates (Group)',
    subtitle: 'Equipment-based group classes',
    packages: [
      {
        name: '4 Classes',
        price: '£90',
        savings: 'save £10',
        momenceUrl: 'https://momence.com/m/473322' // 4-Class Pack (Group Reformer)
      },
      {
        name: '8 Classes',
        price: '£170',
        savings: 'save £30',
        momenceUrl: 'https://momence.com/m/473323' // 8-Class Pack (Group Reformer)
      },
      {
        name: '12 Classes',
        price: '£240',
        savings: 'save £60',
        momenceUrl: 'https://momence.com/m/473324' // 12-Class Pack (Group Reformer)
      },
      {
        name: 'Unlimited',
        price: '£300',
        savings: 'save £100+',
        momenceUrl: 'https://momence.com/m/473325' // Unlimited Class Pack (Group Reformer)
      }
    ]
  },
  hotPilates: {
    title: 'Hot Pilates (Small Group)',
    subtitle: 'Dynamic heated mat classes',
    packages: [
      {
        name: '4 Classes',
        price: '£110',
        savings: 'save £10',
        momenceUrl: 'https://momence.com/m/473314' // 4 Hot Pilates Classes Per Month
      },
      {
        name: '8 Classes',
        price: '£205',
        savings: 'save £35',
        momenceUrl: 'https://momence.com/m/473315' // 8 Hot Pilates Classes Per Month
      },
      {
        name: '12 Classes',
        price: '£290',
        savings: 'save £70',
        momenceUrl: 'https://momence.com/m/473316' // 12 Hot Pilates Classes Per Month
      },
      {
        name: 'Unlimited',
        price: '£350',
        savings: 'save £130+',
        momenceUrl: 'https://momence.com/m/473319' // Unlimited Hot Pilates Classes Per Month
      }
    ]
  },
  private: {
    title: '1-1 Private Sessions',
    subtitle: 'Personalized individual training',
    packages: [
      {
        name: '4 Sessions',
        price: '£235',
        savings: 'save £25',
        momenceUrl: 'https://momence.com/m/473317' // 4-Session Pack Private Reformer
      },
      {
        name: '8 Sessions',
        price: '£440',
        savings: 'save £80',
        momenceUrl: 'https://momence.com/m/473318' // 8-Session Pack Private Reformer
      },
      {
        name: '12 Sessions',
        price: '£620',
        savings: 'save £160',
        momenceUrl: 'https://momence.com/m/473321' // 12-Session Pack Private Reformer
      }
    ]
  }
};

export default function Packages() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="section-padding py-24 bg-[#fffcf2]">
        <div className="container-width text-center">
          <h1 className="heading-primary mb-6">Choose Your Package</h1>
          <p className="body-text text-xl max-w-3xl mx-auto">
            Select the perfect package for your fitness journey. All packages are valid for 30 days from purchase.
          </p>
        </div>
      </section>

      {/* Reformer Pilates Packages */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-2">{packages.reformer.title}</h2>
              <p className="tagline text-[#1a260e]/60">{packages.reformer.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.reformer.packages.map((pkg, index) => (
                <a
                  key={index}
                  href={pkg.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-[#1a260e]/10 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {pkg.name === 'Unlimited' && (
                    <div className="absolute -top-3 -right-3 bg-[#1a260e] text-[#fffcf2] p-2 rounded-full">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div className="text-center space-y-4">
                    <Package className="h-10 w-10 text-[#1a260e]/60 mx-auto" />
                    <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                    <div>
                      <p className="font-serif text-3xl font-light text-[#1a260e]">{pkg.price}</p>
                      {pkg.savings && (
                        <p className="font-sans text-sm text-green-700 font-medium mt-1">{pkg.savings}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-center text-[#1a260e] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-sans text-sm mr-2">Book Now</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hot Pilates Packages */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-2">{packages.hotPilates.title}</h2>
              <p className="tagline text-[#1a260e]/60">{packages.hotPilates.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.hotPilates.packages.map((pkg, index) => (
                <a
                  key={index}
                  href={pkg.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#fffcf2] border border-[#1a260e]/10 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {pkg.name === 'Unlimited' && (
                    <div className="absolute -top-3 -right-3 bg-[#1a260e] text-[#fffcf2] p-2 rounded-full">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div className="text-center space-y-4">
                    <Package className="h-10 w-10 text-[#1a260e]/60 mx-auto" />
                    <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                    <div>
                      <p className="font-serif text-3xl font-light text-[#1a260e]">{pkg.price}</p>
                      {pkg.savings && (
                        <p className="font-sans text-sm text-green-700 font-medium mt-1">{pkg.savings}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-center text-[#1a260e] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-sans text-sm mr-2">Book Now</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Private Sessions Packages */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-2">{packages.private.title}</h2>
              <p className="tagline text-[#1a260e]/60">{packages.private.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.private.packages.map((pkg, index) => (
                <a
                  key={index}
                  href={pkg.momenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center space-y-4">
                    <Package className="h-10 w-10 text-[#fffcf2]/60 mx-auto" />
                    <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                    <div>
                      <p className="font-serif text-3xl font-light">{pkg.price}</p>
                      {pkg.savings && (
                        <p className="font-sans text-sm text-green-400 font-medium mt-1">{pkg.savings}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-sans text-sm mr-2">Book Now</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="heading-secondary text-[#fffcf2]">Package Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-light">Flexibility</h3>
                <p className="text-sm text-[#fffcf2]/80">
                  Use your classes for any session type within the same category
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-light">30-Day Validity</h3>
                <p className="text-sm text-[#fffcf2]/80">
                  All packages are valid for 30 days from your first class
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-light">Best Value</h3>
                <p className="text-sm text-[#fffcf2]/80">
                  Save more with larger packages - up to £160 savings
                </p>
              </div>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-[#fffcf2]/70 mb-4">
                Need help choosing the right package?
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#fffcf2] text-[#1a260e] px-6 py-3 font-serif hover:bg-[#fffcf2]/90 transition-colors duration-200"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 