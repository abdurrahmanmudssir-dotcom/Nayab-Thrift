import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, RefreshCw, Leaf, Globe2 } from 'lucide-react';

export const metadata = {
  title: 'About Nayab Thrift | Sustainable Branded Shoes Pakistan',
  description: 'Learn the story behind Nayab Thrift, our authentic sourcing from Japan and Europe, and how we bring 1-of-1 branded sneakers to Pakistani youth.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#F1EDE5] min-h-screen py-12 sm:py-20 border-b border-[#DCD4C5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-black uppercase text-[#FF4C00]">
            <Sparkles className="w-3.5 h-3.5" /> Our Mission & Sourcing
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#010101] tracking-tight uppercase leading-tight">
            Rewriting Sneaker Culture in Pakistan
          </h1>
          <p className="text-base sm:text-lg text-[#666666] font-medium leading-relaxed">
            We created <strong className="text-[#010101]">Nayab Thrift</strong> out of frustration with insane retail sneaker markups in Pakistan. Original Jordans, Sambas, and Ultraboosts shouldn't cost two months of salary.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#E2DDD0] border border-[#DCD4C5] luxury-shadow">
          <Image
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=80"
            alt="Nayab Thrift Sneaker Vault"
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE6DC] flex items-center justify-center text-[#FF4C00]">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-black text-xl text-[#010101] uppercase">Global Sourcing</h3>
            <p className="text-xs text-[#666666] leading-relaxed font-medium">
              We travel and partner with verified vintage suppliers in Tokyo, London, Berlin, and Seoul to handpick 1-of-1 collector grails and authentic condition pairs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE6DC] flex items-center justify-center text-[#FF4C00]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-black text-xl text-[#010101] uppercase">Hospital Clean</h3>
            <p className="text-xs text-[#666666] leading-relaxed font-medium">
              Every single pair undergoes ultrasonic wash cycles, German foam sterilization, insole decontamination, and leather revitalization before listing.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE6DC] flex items-center justify-center text-[#FF4C00]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-black text-xl text-[#010101] uppercase">Zero Footwear Waste</h3>
            <p className="text-xs text-[#666666] leading-relaxed font-medium">
              Thrifting high quality leather and rubber footwear keeps thousands of kilos of microplastics out of landfills and gives vintage classics a second life.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#010101] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase">Ready to find your 1-of-1 pair?</h2>
            <p className="text-xs text-neutral-400 mt-1">Explore our Sunday drop with Cash on Delivery all across Pakistan.</p>
          </div>
          <Link
            href="/shop"
            className="px-8 py-4 rounded-2xl bg-[#FF4C00] hover:bg-[#E04300] text-white font-black text-xs uppercase tracking-wider transition shadow-xl shrink-0"
          >
            Browse Thrift Vault
          </Link>
        </div>

      </div>
    </div>
  );
}
