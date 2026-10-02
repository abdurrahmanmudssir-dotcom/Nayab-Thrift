'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const heroNavLinks = [
  { name: 'Men', href: '/shop?gender=Men' },
  { name: 'Women', href: '/shop?gender=Women' },
  { name: 'New Arrivals', href: '/shop?filter=new' },
  { name: 'Collection', href: '/shop' },
  { name: 'Vault', href: '/shop?filter=featured' },
  { name: 'About', href: '/about' },
  { name: 'Support', href: '/contact' },
];

export const Hero = () => {
  return (
    <section className="relative w-full bg-[#080E14] text-white overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col border-b border-neutral-800">
      {/* Background Studio Sneaker Image with Cinematic Depth */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=2400&q=95"
          alt="Curated Studio Sneaker Grails"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-[78%_center] opacity-90 scale-100 lg:scale-105 transition-transform duration-1000"
        />
        {/* Dark subtle directional gradients for razor-sharp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080E14] via-[#080E14]/90 to-transparent sm:w-3/4 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080E14] via-transparent to-[#080E14]/50 lg:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,76,0,0.08),transparent_60%)]" />
        {/* Top gradient for nav link legibility */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#080E14]/70 to-transparent" />
      </div>

      {/* Navigation Links — Top of hero, simple text style like original navbar row */}
      <div className="relative z-10 w-full pt-3 pb-2 hidden lg:block">
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-center space-x-9">
          {heroNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-wider font-semibold text-white/75 hover:text-white transition py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-18 lg:py-22">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl space-y-5 sm:space-y-6">
          
          {/* Main Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.1]">
            Every Step Tells a Story.{' '}
            <span className="block text-white mt-1 sm:mt-2">
              Make Yours Unforgettable.
            </span>
          </h1>

          {/* Subtitle Body Description */}
          <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl">
            Every pair in the vault is one of one. Authenticated, cleaned, and gone the second someone else sees it first.
          </p>

          {/* Action CTAs: Solid White Button + Link with Arrow */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2">
            <Link
              href="/shop"
              className="px-8 py-3.5 sm:px-9 sm:py-4 rounded-md bg-white hover:bg-neutral-100 text-[#010101] font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl transform active:scale-95 inline-flex items-center justify-center"
            >
              Shop the Vault
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white/90 hover:text-white transition py-2"
            >
              <span>Learn more</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition duration-200" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
