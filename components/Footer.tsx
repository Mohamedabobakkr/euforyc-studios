import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { TikTokIcon } from './icons/TikTokIcon';

const Footer = () => {
  return (
    <footer className="bg-[#1a260e] text-[#fffcf2] border-t border-[#fffcf2]/10">
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-wider">EUFORYC STUDIOS</h3>
            <p className="font-sans text-xs tracking-[0.2em] opacity-80">
              PILATES • WELLNESS • STRENGTH
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase">
              STUDIO
            </h4>
            <div className="space-y-2">
              <Link 
                href="/about" 
                className="block font-sans text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                About
              </Link>
              <Link 
                href="/team" 
                className="block font-sans text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                Our Team
              </Link>
              <Link 
                href="/book" 
                className="block font-sans text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                Book a Class
              </Link>
              <Link 
                href="/contact" 
                className="block font-sans text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase">
              CONNECT
            </h4>
            <div className="space-y-2">
              <a 
                href="mailto:euforyc@gmail.com"
                className="block font-sans text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                euforyc@gmail.com
              </a>
              <p className="font-sans text-sm opacity-80">
                London, UK
              </p>
              <div className="space-y-2">
                <a 
                  href="https://instagram.com/euforyc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="font-sans text-sm">@euforyc</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@euforyc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <TikTokIcon className="h-4 w-4" />
                  <span className="font-sans text-sm">@euforyc</span>
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <Mail className="h-5 w-5 text-[#fffcf2] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-sans text-sm font-medium tracking-wider mb-1">EMAIL</h3>
              <a 
                href="mailto:euforyc@gmail.com"
                className="font-sans text-xs text-[#fffcf2]/80 hover:text-[#fffcf2] transition-colors"
              >
                euforyc@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#fffcf2]/20 mt-12 pt-8 text-center">
          <p className="font-sans text-xs opacity-60 tracking-wider">
            © 2024 EUFORYC STUDIOS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;