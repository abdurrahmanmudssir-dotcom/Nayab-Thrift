'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const EditorialSplitSection = () => {
  return (
    <section className="w-full bg-[#F1EDE5] border-b border-[#DCD4C5] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">
        
        {/* Left Half: Clean Canvas with Transparent Shoe (Zero Box) */}
        <div className="relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] border-b lg:border-b-0 lg:border-r border-[#DCD4C5] overflow-hidden group bg-[#F1EDE5] flex items-center justify-center p-8 sm:p-12">
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px]">
            <Image
              src="/images/converse-editorial.png"
              alt="Converse Chuck 70 Preloved"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Half: Editorial Text Content */}
        <div className="bg-[#F1EDE5] flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-12 sm:py-16">
          <div className="max-w-xl space-y-6">
            
            {/* Orange/Red Kicker */}
            <span className="inline-block text-xs font-black uppercase tracking-[0.22em] text-[#FF4C00]">
              WHY NAYAB PAKISTAN
            </span>

            {/* Massive Bold Headline (Perfect Flush Alignment) */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#010101] tracking-tight uppercase leading-[0.98] font-sans">
              <span className="block">THIS ISN'T THRIFT.</span>
              <span className="block">THIS IS THE VAULT.</span>
            </h2>

            {/* Editorial Paragraph */}
            <p className="text-xs sm:text-sm lg:text-base text-neutral-700 font-medium leading-relaxed max-w-lg">
              Sourced across Pakistan and global vaults. Checked stitch by stitch. Deep-cleaned and shot exactly as it ships no filters, no surprises. Preloved without the new-box price, and one less pair in a landfill.
            </p>

            {/* Black Rectangular Action Button */}
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#010101] hover:bg-[#FF4C00] text-white font-black text-xs uppercase tracking-wider transition shadow-md group"
              >
                <span>SHOP PRELOVED</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition duration-200" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
