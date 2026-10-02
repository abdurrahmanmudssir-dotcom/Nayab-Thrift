'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Mail, MapPin, ShieldCheck, RefreshCw, Truck, Camera, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#010101] text-[#F1EDE5] pt-12 pb-24 lg:pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-6">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <span className="font-extrabold tracking-wider text-xl sm:text-2xl text-white uppercase font-sans">
                NAYAB <span className="text-[#FF4C00]">THRIFT</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Rare is the standard here, not the name. Pakistan's 1-of-1 thrift shoe vault original, authenticated vintage grails and performance sneakers at 70–80% off retail. Good for your wallet. Better for the planet.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1A1A] hover:bg-[#FF4C00] text-neutral-300 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1A1A] hover:bg-[#FF4C00] text-neutral-300 hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
              Thrift Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/shop?category=sneakers" className="hover:text-[#FF4C00] transition">Sneakers & Dunks</Link></li>
              <li><Link href="/shop?category=running-shoes" className="hover:text-[#FF4C00] transition">Running & Ultraboost</Link></li>
              <li><Link href="/shop?category=casual-shoes" className="hover:text-[#FF4C00] transition">Casual & Sambas</Link></li>
              <li><Link href="/shop?category=boots" className="hover:text-[#FF4C00] transition">Waterproof Boots</Link></li>
              <li><Link href="/shop?category=branded-collection" className="hover:text-[#FF4C00] transition">Archive Grails</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
              Customer Support
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/about" className="hover:text-[#FF4C00] transition">Our Sourcing Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF4C00] transition">Contact & Helpline</Link></li>
              <li><Link href="/contact#faq" className="hover:text-[#FF4C00] transition">Thrift Condition Guide</Link></li>
              <li><Link href="/contact#faq" className="hover:text-[#FF4C00] transition">Cash on Delivery Policy</Link></li>
              <li><Link href="/contact#faq" className="hover:text-[#FF4C00] transition">Size Exchange FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
              Pakistan Hub
            </h5>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF4C00] shrink-0 mt-0.5" />
                <span>Gulberg III, Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#FF4C00] shrink-0" />
                <a href="https://wa.me/923197197454" target="_blank" rel="noreferrer" className="hover:text-[#FF4C00] transition">
                  +92 319 7197454 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF4C00] shrink-0" />
                <span>care@nayabthrift.pk</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Nayab Thrift. Hand-curated thrift shoe brand for Pakistan.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-[#1A1A1A] text-neutral-300 text-[10px] font-bold">CASH ON DELIVERY</span>
            <span className="px-2 py-1 rounded bg-[#1A1A1A] text-neutral-300 text-[10px] font-bold">JAZZCASH</span>
            <span className="px-2 py-1 rounded bg-[#1A1A1A] text-neutral-300 text-[10px] font-bold">SADAPAY</span>
            <span className="px-2 py-1 rounded bg-[#1A1A1A] text-neutral-300 text-[10px] font-bold">NAYAPAY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
