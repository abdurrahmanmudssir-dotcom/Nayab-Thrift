'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const MobileNav = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-lg border-t border-[#DCD4C5] px-6 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between max-w-md mx-auto">
        
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            pathname === '/' ? 'text-[#FF4C00]' : 'text-neutral-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            pathname === '/shop' ? 'text-[#FF4C00]' : 'text-neutral-600'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Shop</span>
        </Link>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[11px] font-bold text-neutral-600"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#FF4C00] text-white text-[9px] font-bold flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span>Saved</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[11px] font-bold text-neutral-600"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#010101] text-white text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span>Cart</span>
        </button>

      </div>
    </div>
  );
};
