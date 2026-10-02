'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Camera } from 'lucide-react';
import { instagramPosts } from '@/data/instagram';
import Link from 'next/link';

export const SocialGallery = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#EBE6DC] border-b border-[#DCD4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF4C00] mb-1">
              <Camera className="w-4 h-4" /> #NayabThrift On Instagram
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#010101] tracking-tight uppercase">
              Streetwear Lookbook
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-extrabold text-[#010101] hover:text-[#FF4C00] uppercase tracking-wider flex items-center gap-1.5 mt-3 sm:mt-0 transition"
          >
            <span>Follow @nayabthrift.pk</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-300 border border-[#DCD4C5] shadow-md"
            >
              <Image
                src={post.image}
                alt="Instagram Streetwear"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 text-white">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#FF4C00] text-[#FF4C00]" />
                    {post.likes}
                  </span>
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold line-clamp-2 leading-tight">
                    {post.shoeName}
                  </p>
                  <Link
                    href={`/product/${post.shoeId}`}
                    className="mt-2 w-full py-1.5 rounded-lg bg-[#FF4C00] text-white text-[10px] font-extrabold uppercase flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Shop Look</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
