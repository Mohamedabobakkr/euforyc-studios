'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function Map() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Direct link to Google Maps
  const googleMapsLink = "https://maps.app.goo.gl/zZfyhD3X2BuS6SnL6";

  useEffect(() => {
    if (mapLoaded) {
      setTimeout(() => setShowOverlay(true), 300);
    }
  }, [mapLoaded]);

  // Fallback: the iframe is lazy-loaded, so start counting once the map scrolls
  // into view. If it still hasn't loaded ~8s later, swap the spinner for a link.
  useEffect(() => {
    if (mapLoaded) return;
    const el = containerRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) {
        timer = setTimeout(() => setMapFailed(true), 8000);
      }
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [mapLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gradient-to-b from-[#fffcf2] to-[#faf8f3]">
      {/* Fallback when the map doesn't load */}
      {!mapLoaded && mapFailed && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center space-y-6">
            <MapPin className="h-16 w-16 text-[#1a260e]/20 mx-auto" />
            <p className="font-sans text-sm text-[#1a260e]/80 leading-relaxed">
              7 Holmstall Ave<br />
              Edgware HA8 5HX
            </p>
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-[#1a260e] hover:text-[#1a260e]/70 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      )}

      {/* Loading state */}
      {!mapLoaded && !mapFailed && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center space-y-6">
            <div className="relative">
              <MapPin className="h-16 w-16 text-[#1a260e]/20 mx-auto" />
              <div className="absolute inset-0 animate-ping">
                <MapPin className="h-16 w-16 text-[#1a260e]/10 mx-auto" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-serif text-2xl font-light text-[#1a260e]/80 tracking-wider">LOADING MAP</p>
              <div className="w-32 h-[1px] bg-[#1a260e]/20 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Map container with elegant styling */}
      <div className="absolute inset-0 p-4 md:p-8">
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
          {/* Google Maps Embed - ensure it's on top */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.4157378250075!2d-0.2664560234753355!3d51.59727067183389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876110031244e23%3A0xe75152bcc7056e64!2sEuforyc%20studios!5e0!3m2!1sen!2seg!4v1752248697606!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              filter: 'brightness(0.98) contrast(1.05)',
              position: 'relative',
              zIndex: 1
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
            className={`transition-all duration-1000 ${mapLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            title="Euforyc Studios Location"
          />
          
          {/* Elegant border frame - moved outside to not interfere */}
          <div className="absolute inset-4 md:inset-6 border border-[#1a260e]/10 rounded-lg pointer-events-none z-10"></div>
        </div>
      </div>
      
      {/* Elegant overlay with studio info - positioned to not block controls */}
      <div className={`absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-sm transition-all duration-700 transform pointer-events-none ${showOverlay ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="bg-[#fffcf2]/90 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-xl border border-[#1a260e]/10 pointer-events-auto">
          {/* Decorative element */}
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#1a260e]/30 to-transparent"></div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-light text-[#1a260e] tracking-wider mb-1">
                EUFORYC STUDIOS
              </h3>
              <p className="font-sans text-xs tracking-[0.2em] text-[#1a260e]/60 uppercase">
                Pilates • Wellness • Strength
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-sans text-sm text-[#1a260e]/80 leading-relaxed">
                7 Holmstall Ave<br />
                Edgware HA8 5HX<br />
                United Kingdom
              </p>
            </div>
            
            <div className="pt-4 border-t border-[#1a260e]/10">
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 group"
              >
                <div className="p-2 bg-[#1a260e]/5 rounded-full group-hover:bg-[#1a260e]/10 transition-colors">
                  <Navigation className="w-4 h-4 text-[#1a260e]" />
                </div>
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#1a260e] group-hover:text-[#1a260e]/70 transition-colors">
                  Get Directions
                </span>
              </a>
            </div>
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#1a260e]/10"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#1a260e]/10"></div>
        </div>
      </div>
      
      {/* Decorative elements - ensure they don't block controls */}
      <div className="absolute top-8 right-8 w-24 h-24 border border-[#1a260e]/5 rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border border-[#1a260e]/5 rounded-full animate-pulse animation-delay-1000 pointer-events-none"></div>
    </div>
  );
} 