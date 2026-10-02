'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CategorySection = () => {
  const styles = [
    {
      num: '01',
      name: 'SNEAKERS',
      slug: 'sneakers',
      image: '/images/styles/sneakers.png',
    },
    {
      num: '02',
      name: 'LIFESTYLE',
      slug: 'lifestyle',
      image: '/images/styles/lifestyle.png',
    },
    {
      num: '03',
      name: 'RUNNING',
      slug: 'running',
      image: '/images/styles/running.png',
    },
    {
      num: '04',
      name: 'BASKETBALL',
      slug: 'basketball',
      image: '/images/styles/basketball.png',
    },
    {
      num: '05',
      name: 'CLASSICS',
      slug: 'casual',
      image: '/images/styles/classics.png',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F1EDE5] border-b border-[#DCD4C5]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="block text-xs font-black uppercase tracking-[0.22em] text-[#FF4C00] mb-2">
              SHOP THRIFTED SNEAKERS
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#010101] tracking-[-0.04em] uppercase font-sans">
              BROWSE BY STYLE
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#010101] hover:text-[#FF4C00] transition group pb-1"
          >
            <span>SEE ALL PAIRS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-200" />
          </Link>
        </div>

        {/* 5 Column Style Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {styles.map((style) => (
            <Link
              key={style.num}
              href={`/shop?category=${style.slug}`}
              className="group relative flex flex-col justify-between bg-[#FAF8F5] border border-[#DCD4C5] p-4 sm:p-5 transition-all duration-300 hover:border-[#010101] hover:shadow-lg rounded-2xl"
            >
              {/* Number Index */}
              <span className="text-[11px] font-mono font-bold text-neutral-400 group-hover:text-[#FF4C00] transition">
                {style.num}
              </span>

              {/* Transparent Shoe Image */}
              <div className="relative w-full h-36 sm:h-44 my-3 bg-transparent flex items-center justify-center">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Bottom Style Name + Shop Link */}
              <div className="space-y-1.5 pt-3 border-t border-[#DCD4C5]">
                <h3 className="font-black text-sm sm:text-base text-[#010101] uppercase tracking-tight">
                  {style.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#010101] group-hover:text-[#FF4C00] transition pt-0.5">
                  <span>SHOP</span>
                  <span className="text-sm font-mono font-bold">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
