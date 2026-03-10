'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const heroImages = [
  '/hero/IMG_4879.JPG',
  '/hero/IMG_5111.jpg',
  '/hero/IMG_8682.JPG',
  '/hero/IMG_8686.JPG',
  '/hero/IMG_8687.JPG',
  '/hero/IMG_8688.JPG',
  '/hero/IMG_8690.JPG',
  '/hero/IMG_8698.JPG',
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={src}
            alt="Euforyc Studios pilates studio London interior"
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
            sizes="100vw"
          />
        </div>
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
    </div>
  );
}
