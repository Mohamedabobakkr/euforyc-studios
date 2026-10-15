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
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-[28px] border border-[#1a260e]/15 bg-eu-beige md:rounded-eu-lg"
    >
      {/* Fallback when the map doesn't load */}
      {!mapLoaded && mapFailed && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
          <div className="space-y-5 text-center">
            <MapPin className="mx-auto h-12 w-12 text-eu-green" strokeWidth={1.25} aria-hidden="true" />
            <p className="font-sans text-[15px] leading-relaxed text-eu-green">
              7-8 Holmstall Parade,<br />
              Edgware, HA8 5HX
            </p>
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center rounded-full border border-[#1a260e]/35 px-6 font-sans text-[12px] uppercase tracking-[0.18em] text-eu-ink transition-colors hover:border-eu-ink hover:bg-eu-ink hover:text-eu-cream"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      )}

      {/* Loading state */}
      {!mapLoaded && !mapFailed && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="space-y-6 text-center">
            <div className="relative">
              <MapPin className="mx-auto h-12 w-12 text-eu-green" strokeWidth={1.25} aria-hidden="true" />
              <div className="absolute inset-0 motion-safe:animate-ping">
                <MapPin className="mx-auto h-12 w-12 text-[#1a260e]/20" strokeWidth={1.25} aria-hidden="true" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-serif text-2xl font-normal tracking-[0.06em] text-eu-green">LOADING MAP</p>
              <div className="mx-auto h-[1px] w-32 bg-[#1a260e]/25 motion-safe:animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Map container */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full overflow-hidden">
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
        </div>
      </div>

      {/* Studio card - sits bottom-left, clear of the zoom controls on the right */}
      <div
        className={`pointer-events-none absolute bottom-3 left-3 right-14 z-20 transition-[opacity,transform] duration-700 md:bottom-6 md:left-6 md:right-auto md:w-[360px] ${showOverlay ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        <div className="pointer-events-auto rounded-[22px] border border-[#1a260e]/15 bg-eu-cream p-5 shadow-[0_24px_50px_-28px_rgba(26,38,14,0.55)] md:p-7">
          <div className="space-y-3 md:space-y-4">
            <div>
              <h3 className="mb-1.5 font-serif text-[19px] font-normal leading-tight tracking-[0.05em] text-eu-ink md:text-2xl md:tracking-[0.06em]">
                EUFORYC STUDIOS
              </h3>
              <p className="font-sans text-[11.5px] uppercase tracking-[0.2em] text-eu-green">
                Pilates • Wellness • Strength
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-sans text-[15px] leading-relaxed text-eu-green">
                7-8 Holmstall Parade,<br />
                Edgware, HA8 5HX
              </p>
            </div>

            <div className="border-t border-[#1a260e]/15 pt-2 md:pt-3">
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-3"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-eu-ink text-eu-cream transition-colors group-hover:bg-eu-green">
                  <Navigation className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-eu-ink underline decoration-[#1a260e]/30 underline-offset-[6px] group-hover:decoration-eu-ink">
                  Get Directions
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
