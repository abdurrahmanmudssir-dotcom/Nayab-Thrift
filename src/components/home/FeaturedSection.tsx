'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export const FeaturedSection = () => {
  const featuredProducts = products.filter((p) => p.isFeatured || p.isNewArrival).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 bg-[#F1EDE5] border-b border-[#DCD4C5]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="block text-xs font-black uppercase tracking-[0.22em] text-[#FF4C00] mb-2">
              LATEST CURATED DROPS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#010101] tracking-[-0.04em] uppercase font-sans">
              FEATURED 1-OF-1 PAIRS
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#010101] hover:text-[#FF4C00] transition group pb-1"
          >
            <span>VIEW ALL PAIRS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#010101] hover:bg-[#FF4C00] text-white font-black text-xs uppercase tracking-wider transition shadow-md group"
          >
            <span>VIEW ALL THRIFTED PAIRS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition duration-200" />
          </Link>
        </div>

      </div>
    </section>
  );
};
