'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck } from 'lucide-react';
import { reviews } from '@/data/reviews';

export const ReviewsSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F1EDE5] border-b border-[#DCD4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-black uppercase tracking-widest text-[#FF4C00] mb-2">
            Pakistani Sneakerheads Speak
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#010101] tracking-tight uppercase">
            Customer Reviews
          </h2>
          <p className="text-sm text-[#666666] font-medium mt-3">
            Real feedback from verified buyers across Karachi, Lahore, and Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow flex flex-col justify-between relative group hover:-translate-y-1 transition duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed font-medium mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6] flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                  <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-xs text-[#010101]">{rev.author}</h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[10px] text-[#666666] block font-medium">
                    {rev.location}
                  </span>
                  <span className="text-[10px] font-bold text-[#FF4C00] block mt-0.5">
                    Bought: {rev.shoeName}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
