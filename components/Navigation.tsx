'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const leftNavItems = [
    { href: '/about', label: 'ABOUT' },
    { href: '/team', label: 'TEAM' },
  ];

  const rightNavItems = [
    { href: '/pricing', label: 'PRICE LIST' },
    { href: '/book', label: 'BOOK' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a260e]/95 backdrop-blur-sm">
      <div className="container-width px-8 py-5">
          {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Navigation */}
          <div className="flex items-center space-x-8 flex-1">
            {leftNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans text-xs tracking-[0.2em] transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-[#fffcf2] font-medium'
                    : 'text-[#fffcf2] hover:opacity-70'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center Logo - Reduced size */}
          <Link 
            href="/" 
            className="flex items-center justify-center group transition-all duration-300 hover:scale-105"
          >
            <div className="relative w-[450px] h-[120px]">
              <Image
                src="/logo.png"
                alt="Euforyc Studios"
                fill
                className="object-contain"
                priority
                sizes="450px"
              />
            </div>
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center justify-end space-x-8 flex-1">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans text-xs tracking-[0.2em] transition-all duration-300 ${
                  pathname === item.href
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
        <div className="md:hidden flex flex-col relative">
          {/* Hamburger button positioned absolutely */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
              className="p-2"
          >
            {isOpen ? (
                <X className="h-5 w-5 text-[#fffcf2]" />
            ) : (
                <Menu className="h-5 w-5 text-[#fffcf2]" />
            )}
          </button>
        </div>

          {/* Centered logo */}
          <div className="flex justify-center w-full">
            <Link href="/" className="flex items-center">
              <div className="relative w-[200px] h-[60px]">
                <Image
                  src="/logo.png"
                  alt="Euforyc Studios"
                  fill
                  className="object-contain"
                  priority
                  sizes="200px"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-4 space-y-4">
            {[...leftNavItems, ...rightNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                className={`block font-sans text-sm tracking-[0.15em] transition-colors duration-300 ${
                    pathname === item.href
                    ? 'text-[#fffcf2] font-medium'
                    : 'text-[#fffcf2] hover:opacity-70'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;