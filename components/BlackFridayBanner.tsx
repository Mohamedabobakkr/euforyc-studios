'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const BlackFridayBanner = () => {
  const [mounted, setMounted] = useState(false);

  const messages = [
    'Up to 50% off Black Friday Sale - Click here',
    'Limited Time Offer - Save Big Today!',
    'Exclusive Black Friday Deals - Get Your Pilates Package'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#F5F0E8] via-[#FAF8F3] to-[#F5F0E8] border-b border-[#2a3a21]/10 shadow-sm overflow-hidden">
      <div className="container-width px-4 py-2">
        <div className="flex items-center justify-center gap-2 h-5">
          <Link
            href="/black-friday"
            className="group flex items-center justify-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#2a3a21] flex-shrink-0 animate-pulse" />
            <div className="relative h-5 overflow-hidden">
              {!mounted ? (
                <span className="text-xs font-medium text-[#1A1A1A] group-hover:text-[#2a3a21] transition-colors text-center h-5 flex items-center whitespace-nowrap">
                  {messages[0]}
                </span>
              ) : (
                <motion.div
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -20, -40, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex flex-col"
                >
                  {messages.map((message, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium text-[#1A1A1A] group-hover:text-[#2a3a21] transition-colors text-center h-5 flex items-center whitespace-nowrap"
                    >
                      {message}
                    </span>
                  ))}
                  <span className="text-xs font-medium text-[#1A1A1A] group-hover:text-[#2a3a21] transition-colors text-center h-5 flex items-center whitespace-nowrap">
                    {messages[0]}
                  </span>
                </motion.div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayBanner;
