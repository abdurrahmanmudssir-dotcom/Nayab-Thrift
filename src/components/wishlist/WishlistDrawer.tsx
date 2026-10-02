'use client';

import React from 'react';
import Image from 'next/image';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export const WishlistDrawer = () => {
  const { wishlist, removeFromWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
    showToast(`Moved "${product.name}" to cart!`, 'success');
  };

  const formatPKR = (amount: number) => 'Rs. ' + amount.toLocaleString('en-PK');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F1EDE5] shadow-2xl flex flex-col border-l border-[#DCD4C5]">
          
          <div className="p-5 border-b border-[#DCD4C5] flex items-center justify-between bg-[#EBE6DC]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF4C00] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#010101] uppercase tracking-wide">
                  Saved Thrift Pairs
                </h2>
                <span className="text-xs text-[#666666] font-medium">
                  {wishlist.length} {wishlist.length === 1 ? 'saved item' : 'saved items'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-neutral-600 hover:bg-[#DCD4C5] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#EBE6DC] flex items-center justify-center text-neutral-400">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#010101]">No saved pairs yet</h3>
                  <p className="text-xs text-neutral-600 mt-1 max-w-xs">
                    Hit the heart icon on any thrift pair you love to save it here for later.
                  </p>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-3 rounded-xl bg-[#010101] hover:bg-[#FF4C00] text-white font-bold text-xs tracking-wider uppercase transition"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow relative"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#EBE6DC] shrink-0 border border-[#DCD4C5]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF4C00]">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-neutral-400 hover:text-red-600 transition p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#010101] line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="text-[11px] text-[#666666] mt-0.5">
                        Size EU {product.sizeEU} • {product.condition.score}/10
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E2D6]">
                      <span className="font-extrabold text-sm text-[#010101]">
                        {formatPKR(product.thriftPrice)}
                      </span>
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="px-3 py-1.5 rounded-lg bg-[#010101] hover:bg-[#FF4C00] text-white text-[11px] font-bold flex items-center gap-1.5 transition"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
