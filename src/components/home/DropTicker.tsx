'use client';

import React from 'react';

export const DropTicker = () => {
  const tickerText = 'Free TCS Delivery Over Rs. 4,999 • 100% Authenticity Guaranteed • Hospital-Grade Cleaned & Sanitized';

  return (
    <div className="relative bg-[#010101] py-3.5 sm:py-4 overflow-hidden border-y border-neutral-800 text-neutral-300 font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.22em] select-none">
      {/* Subtle edge fade overlays */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-[#010101] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-[#010101] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-12 sm:gap-16 whitespace-nowrap">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="flex items-center gap-12 sm:gap-16 shrink-0">
            <span className="text-neutral-100 hover:text-[#FF4C00] transition duration-300 cursor-default font-extrabold">
              {tickerText}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF4C00]" />
          </div>
        ))}
      </div>
    </div>
  );
};
