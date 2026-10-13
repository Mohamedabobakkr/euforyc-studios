'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const leftNavItems: NavItem[] = [
    { href: '/skin-studio', label: 'SKIN STUDIO' },
    { href: '/about', label: 'ABOUT' },
    { href: '/team', label: 'TEAM' },
    { href: '/gift-cards', label: 'GIFTING' },
    { href: '/packages-memberships', label: 'PACKAGES & MEMBERSHIPS' },
  ];

  const rightNavItems: NavItem[] = [
    { href: '/book', label: 'BOOK' },
    { href: '/studio-hire', label: 'STUDIO HIRE' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shop', label: 'MERCHANDISE' },
    { href: '/pricing', label: 'PRICE LIST' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a260e]/95 backdrop-blur-sm">
        <div className="w-full px-4 md:px-6 lg:px-8 py-5">
          {/* Desktop Navigation */}
          <div className="hidden xl:grid grid-cols-[1fr_auto_1fr] items-center gap-3 xl:gap-6 2xl:gap-8">
            {/* Left Navigation */}
            <div className="flex items-center justify-end space-x-2 lg:space-x-3 xl:space-x-4">
              {leftNavItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[9px] lg:text-[10px] xl:text-xs tracking-[0.1em] transition-all duration-300 text-[#fffcf2] hover:opacity-70 whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ) : item.href === '/skin-studio' ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-sans text-[9px] lg:text-[10px] xl:text-xs tracking-[0.1em] transition-all duration-300 whitespace-nowrap text-[#e7e3dd] hover:text-[#fffcf2] relative group"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-[#e7e3dd] rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></span>
                    </span>
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-sans text-[9px] lg:text-[10px] xl:text-xs tracking-[0.1em] transition-all duration-300 ${item.href === '/packages-memberships' ? 'text-center leading-tight' : 'whitespace-nowrap'
                      } ${pathname === item.href
                        ? 'text-[#fffcf2] font-medium'
                        : 'text-[#fffcf2] hover:opacity-70'
                      }`}
                  >
                    {item.href === '/packages-memberships' ? (
                      <>
                        PACKAGES &<br />MEMBERSHIPS
                      </>
                    ) : (
                      item.label
                    )}
                  </Link>
                )
              ))}
            </div>

            {/* Center Logo - Absolutely centered */}
            <Link
              href="/"
              className="flex items-center justify-center group transition-all duration-300 hover:scale-105 px-2"
            >
              <div className="relative w-[320px] lg:w-[380px] xl:w-[450px] h-[90px] lg:h-[110px] xl:h-[120px]">
                <Image
                  src="/logo.png"
                  alt="Euforyc Studios - Premier Pilates Studio London Edgware"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 320px, (max-width: 1280px) 380px, 450px"
                />
              </div>
            </Link>

            {/* Right Navigation */}
            <div className="flex items-center justify-start space-x-2 lg:space-x-3 xl:space-x-4">
              {rightNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans text-[9px] lg:text-[10px] xl:text-xs tracking-[0.1em] transition-all duration-300 whitespace-nowrap ${pathname === item.href
                    ? 'text-[#fffcf2] font-medium'
                    : 'text-[#fffcf2] hover:opacity-70'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation - Modified for centered logo */}
          <div className="xl:hidden flex flex-col relative">
            {/* Hamburger button positioned absolutely */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="p-2 hover:bg-[#fffcf2]/10 rounded-lg transition-all duration-300 active:scale-95"
              >
                <div className="relative w-5 h-5">
                  <Menu className={`absolute inset-0 h-5 w-5 text-[#fffcf2] transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                  <X className={`absolute inset-0 h-5 w-5 text-[#fffcf2] transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                </div>
              </button>
            </div>

            {/* Centered logo */}
            <div className="flex justify-center w-full">
              <Link href="/" className="flex items-center">
                <div className="relative w-[200px] h-[60px]">
                  <Image
                    src="/logo.png"
                    alt="Euforyc Studios - Premier Pilates Studio London Edgware"
                    fill
                    className="object-contain"
                    priority
                    sizes="200px"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu - Smooth Dropdown Animation */}
          <div
            className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="mt-6 pb-6 space-y-1 border-t border-[#fffcf2]/10">
              {[...leftNavItems, ...rightNavItems].map((item, index) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block font-sans text-sm tracking-[0.15em] transition-all duration-300 text-[#fffcf2] hover:opacity-70 hover:translate-x-2 py-3 px-4 rounded-lg hover:bg-[#fffcf2]/5 ${isOpen ? 'animate-slideIn' : ''
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block font-sans text-sm tracking-[0.15em] transition-all duration-300 py-3 px-4 rounded-lg hover:translate-x-2 ${pathname === item.href
                      ? 'text-[#fffcf2] font-medium bg-[#fffcf2]/10'
                      : 'text-[#fffcf2] hover:opacity-70 hover:bg-[#fffcf2]/5'
                      } ${isOpen ? 'animate-slideIn' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.href === '/packages-memberships' ? 'PACKAGES & MEMBERSHIPS' : item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;