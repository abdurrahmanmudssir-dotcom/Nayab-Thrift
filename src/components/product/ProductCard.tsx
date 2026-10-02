'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    showToast(`Added "${product.name}" to cart!`, 'success');
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(isLiked ? 'Removed from wishlist' : 'Saved to wishlist!', 'info');
  };

  const formatPKR = (amount: number) => {
    return 'PKR ' + amount.toLocaleString('en-PK');
  };

  const currentImage = isHovered && product.images && product.images[1] 
    ? product.images[1] 
    : (product.images && product.images[0] ? product.images[0] : 'https://fanom.pk/images/products/adidas-court-black/01.webp?v=4');

  return (
    <div
      className="group relative flex flex-col justify-between bg-[#FAF8F5] border border-[#DCD4C5] transition-all duration-300 hover:border-[#010101] hover:shadow-lg rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Wishlist Heart */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-20 p-2 bg-[#FAF8F5]/90 backdrop-blur-xs rounded-full text-neutral-500 hover:text-[#010101] border border-[#DCD4C5] shadow-xs transition"
        title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF4C00] text-[#FF4C00]' : 'text-neutral-600 hover:text-black'}`} />
      </button>

      {/* Full Bleed Shoe Image Canvas */}
      <Link 
        href={`/product/${product.id}`} 
        className="block relative w-full aspect-[4/5] bg-[#EBE6DC] overflow-hidden"
      >
        <Image
          src={currentImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 space-y-2 border-t border-[#DCD4C5] bg-[#FAF8F5]">
        
        {/* 1. Main Heading (Product Name) */}
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-black text-sm sm:text-base text-[#010101] uppercase tracking-tight line-clamp-1 group-hover:text-[#FF4C00] transition">
            {product.name}
          </h3>
        </Link>

        {/* 2. Size (EU & UK) */}
        <div className="text-xs sm:text-[13px] font-mono font-bold text-neutral-500 tracking-wider">
          EU {product.sizeEU} &nbsp;•&nbsp; UK {product.sizeUK}
        </div>

        {/* 3. Price (PKR) + Increased Size ADD Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-black text-sm sm:text-base text-[#010101] font-mono tracking-tight">
            {formatPKR(product.thriftPrice)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-5 py-1.5 border-2 border-[#010101] text-xs font-black uppercase tracking-wider transition ${
              isAdded
                ? 'bg-[#010101] text-white'
                : 'bg-transparent text-[#010101] hover:bg-[#010101] hover:text-white active:scale-95'
            }`}
          >
            {isAdded ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> ADDED
              </span>
            ) : (
              'ADD'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
