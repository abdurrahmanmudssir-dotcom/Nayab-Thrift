'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface BrandItem {
  id: string;
  name: string;
  icon: string;
}

const brandRow1: BrandItem[] = [
  { id: 'nike', name: 'Nike', icon: 'nike' },
  { id: 'adidas', name: 'Adidas', icon: 'adidas' },
  { id: 'jordan', name: 'Air Jordan', icon: 'jordan' },
  { id: 'newbalance', name: 'New Balance', icon: 'newbalance' },
  { id: 'converse', name: 'Converse', icon: 'converse' },
];

const brandRow2: BrandItem[] = [
  { id: 'puma', name: 'Puma', icon: 'puma' },
  { id: 'vans', name: 'Vans', icon: 'vans' },
  { id: 'asics', name: 'Asics', icon: 'asics' },
  { id: 'reebok', name: 'Reebok', icon: 'reebok' },
  { id: 'hoka', name: 'Hoka', icon: 'hoka' },
];

export const BrandSection = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#F1EDE5] text-[#010101] border-b border-[#DCD4C5] overflow-hidden relative">
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#FF4C00]/5 via-amber-500/5 to-[#FF4C00]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        {/* Section Header */}
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF4C00] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUTHENTIC SOURCED LABELS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#010101] tracking-[-0.04em] uppercase font-sans">
            FAMOUS BRANDS
          </h2>
        </div>
      </div>

      {/* Infinite Scrolling Ticker Rails (Crystal Display Badges) */}
      <div className="relative w-full space-y-3.5 sm:space-y-4 overflow-hidden select-none py-2">
        
        {/* Left & Right Smooth Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-[#F1EDE5] via-[#F1EDE5]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-[#F1EDE5] via-[#F1EDE5]/90 to-transparent z-20" />

        {/* Row 1: Marquee Left */}
        <div className="animate-marquee flex items-center gap-3.5 sm:gap-4">
          {[...brandRow1, ...brandRow1, ...brandRow1, ...brandRow1].map((brand, idx) => (
            <div
              key={`row1-${brand.id}-${idx}`}
              className="group relative flex-shrink-0 flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-[#DCD4C5]/70 min-w-[190px] sm:min-w-[220px] transition-all duration-300 overflow-hidden hover:shadow-md"
            >
              {/* Crystal Glass Specular Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent pointer-events-none" />

              {/* Official Brand Logo Box (Crystal Frosted Glass) */}
              <div className="relative z-10 w-11 h-11 rounded-xl bg-white border border-[#E2DDD0] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.03)] flex items-center justify-center p-2.5 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/brand-logos/${brand.icon}.svg`}
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Brand Name Only */}
              <span className="relative z-10 font-black text-sm sm:text-base text-[#010101] uppercase tracking-wider">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Marquee Right (Reverse) */}
        <div className="animate-marquee-reverse flex items-center gap-3.5 sm:gap-4">
          {[...brandRow2, ...brandRow2, ...brandRow2, ...brandRow2].map((brand, idx) => (
            <div
              key={`row2-${brand.id}-${idx}`}
              className="group relative flex-shrink-0 flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-[#DCD4C5]/70 min-w-[190px] sm:min-w-[220px] transition-all duration-300 overflow-hidden hover:shadow-md"
            >
              {/* Crystal Glass Specular Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent pointer-events-none" />

              {/* Official Brand Logo Box (Crystal Frosted Glass) */}
              <div className="relative z-10 w-11 h-11 rounded-xl bg-white border border-[#E2DDD0] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.03)] flex items-center justify-center p-2.5 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/brand-logos/${brand.icon}.svg`}
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Brand Name Only */}
              <span className="relative z-10 font-black text-sm sm:text-base text-[#010101] uppercase tracking-wider">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
