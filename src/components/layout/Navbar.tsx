'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?filter=new' },
    { name: 'Men', href: '/shop?gender=Men' },
    { name: 'Women', href: '/shop?gender=Women' },
    { name: 'Track Order', href: '/track' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 transition-all duration-300 bg-[#FAF8F5] border-b border-[#DCD4C5]">
      {/* Top Header Row */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 border-b border-[#E8E2D6]">
        
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg text-[#010101] hover:bg-[#F1EDE5] transition"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Name - Premium Editorial Typography */}
        <Link href="/" className="flex items-baseline group">
          <span className="text-[28px] sm:text-[32px] tracking-[-0.06em] text-[#010101] uppercase leading-none">
            <span className="font-light italic">N</span>
            <span className="font-black">AYAB</span>
            <span className="text-[#FF4C00] font-black ml-1 relative">
              THRIFT
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#FF4C00] group-hover:w-full transition-all duration-500" />
            </span>
          </span>
        </Link>

        {/* Centered Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2.5 px-4 py-2 rounded-md bg-[#F1EDE5] hover:bg-[#EBE6DC] text-xs text-neutral-700 border border-[#DCD4C5] transition text-left shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500">Search shoes, brands, sizes...</span>
          </button>
        </div>

        {/* Right Utility Icons (Wishlist, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4 text-[#010101]">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg hover:bg-[#F1EDE5] text-[#010101] transition md:hidden"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 rounded-lg hover:bg-[#F1EDE5] transition text-[#010101]"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF4C00] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg hover:bg-[#F1EDE5] transition text-[#010101]"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF4C00] text-white text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

      </div>



      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F1EDE5] shadow-2xl p-6 flex flex-col justify-between z-10 border-r border-[#DCD4C5]">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#DCD4C5]">
                <span className="text-lg text-[#010101] tracking-[-0.04em] uppercase">
                  <span className="font-light italic">N</span><span className="font-black">AYAB</span> <span className="text-[#FF4C00] font-black">THRIFT</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#E2DDD0] text-neutral-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-neutral-800 hover:bg-[#E2DDD0] hover:text-[#FF4C00] transition"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#DCD4C5] space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#EBE6DC] text-xs text-neutral-700">
                  <ShieldCheck className="w-4 h-4 text-[#FF4C00] shrink-0" />
                  <span>100% Original Japanese & European Thrift</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#EBE6DC] text-xs text-neutral-700">
                  <Sparkles className="w-4 h-4 text-[#FF4C00]" />
                  <span>Cash on Delivery across Pakistan</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCD4C5] text-xs text-neutral-500 text-center">
              © {new Date().getFullYear()} Nayab Thrift PK. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
