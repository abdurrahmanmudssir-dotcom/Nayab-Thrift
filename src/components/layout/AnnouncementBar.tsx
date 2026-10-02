'use client';

import React, { useState } from 'react';
import { Truck, ChevronDown, X } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#010101] text-white text-xs font-semibold py-2 px-4 sm:px-8 border-b border-neutral-800 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left helpline / empty spacer for balance */}
        <div className="hidden md:flex items-center gap-2 text-neutral-400 text-[11px]">
          <span>Helpline: <strong className="text-white font-bold">+92 319 7197454</strong></span>
        </div>

        {/* Center Free Shipping Message */}
        <div className="flex-1 flex items-center justify-center text-center">
          <span className="tracking-wider uppercase text-[11px] sm:text-xs text-neutral-100 font-bold flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#FF4C00] hidden sm:inline" />
            FREE SHIPPING ON ORDERS OVER RS. 4,999
          </span>
        </div>

        {/* Right Country Selector */}
        <div className="flex items-center gap-4 text-[11px] text-neutral-300">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition">
            <span className="text-sm leading-none">🇵🇰</span>
            <span className="font-bold">Pakistan, PKR</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-neutral-400 hover:text-white p-0.5 transition hidden sm:block"
            aria-label="Close Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
