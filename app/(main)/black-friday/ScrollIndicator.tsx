'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ScrollIndicator() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Check if user is near bottom (within 300px)
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-6 rounded-full border border-[#2a3a21]/20 shadow-lg transition-all duration-300">
        {isAtBottom ? (
          <>
            <ChevronUp className="h-5 w-5 text-[#2a3a21] animate-bounce" />
            <div className="writing-mode-vertical text-xs uppercase tracking-wider text-[#2a3a21] font-medium" style={{ writingMode: 'vertical-rl' }}>
              Offers above
            </div>
          </>
        ) : (
          <>
            <div className="writing-mode-vertical text-xs uppercase tracking-wider text-[#2a3a21] font-medium" style={{ writingMode: 'vertical-rl' }}>
              More offers below
            </div>
            <ChevronDown className="h-5 w-5 text-[#2a3a21] animate-bounce" />
          </>
        )}
      </div>
    </div>
  );
}
