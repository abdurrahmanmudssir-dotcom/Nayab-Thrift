'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check, ShoppingBag, ShieldCheck, Sparkles, MessageCircle, Truck } from 'lucide-react';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export const QuickViewModal = () => {
  const { activeProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!activeProduct) return null;

  const handleAddToCart = () => {
    addToCart(activeProduct);
    setIsAdded(true);
    showToast(`Added "${activeProduct.name}" to cart!`, 'success');
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 1200);
  };

  const formatPKR = (amount: number) => {
    return 'Rs. ' + amount.toLocaleString('en-PK');
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum Nayab Thrift! I am interested in ordering this thrift pair:\n\n*Product:* ${activeProduct.name}\n*SKU:* ${activeProduct.sku}\n*Size:* EU ${activeProduct.sizeEU} / UK ${activeProduct.sizeUK}\n*Condition:* ${activeProduct.condition.score}/10 (${activeProduct.condition.label})\n*Price:* ${formatPKR(activeProduct.thriftPrice)}\n\nIs this pair still available for Cash on Delivery?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
      />

      <div className="relative w-full max-w-4xl bg-[#F1EDE5] rounded-3xl shadow-2xl border border-[#DCD4C5] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-neutral-700 hover:bg-[#010101] hover:text-white transition shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 bg-[#EBE6DC] flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-200 shadow-inner">
              <Image
                src={activeProduct.images[activeImageIdx] || activeProduct.images[0]}
                alt={activeProduct.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#010101] text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase">
                {activeProduct.discountPercent}% OFF RETAIL
              </div>
            </div>

            {activeProduct.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                {activeProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIdx === idx
                        ? 'border-[#FF4C00] shadow-md scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-[#FF4C00] uppercase tracking-wider">
                  {activeProduct.brand} • {activeProduct.origin}
                </span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  1-of-1 Sourced Pair
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#010101] leading-tight">
                {activeProduct.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#010101]">
                  {formatPKR(activeProduct.thriftPrice)}
                </span>
                <span className="text-sm text-[#8E8E8E] line-through font-medium">
                  {formatPKR(activeProduct.originalPrice)}
                </span>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-[#EBE6DC] border border-[#DCD4C5]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4C00]" />
                    Thrift Condition Score
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#010101] text-white text-xs font-black">
                    {activeProduct.condition.score}/10
                  </span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                  {activeProduct.condition.details}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-neutral-600 font-medium">
                  <div className="bg-[#F1EDE5] p-2 rounded-lg">
                    <strong>Upper:</strong> {activeProduct.condition.upperCondition}
                  </div>
                  <div className="bg-[#F1EDE5] p-2 rounded-lg">
                    <strong>Sole:</strong> {activeProduct.condition.soleWear}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide block mb-2">
                  Fixed Thrift Size (1 Pair Available):
                </label>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#010101] text-white text-sm font-bold shadow-md">
                  <span>EU {activeProduct.sizeEU}</span>
                  <span className="text-neutral-400">|</span>
                  <span>UK {activeProduct.sizeUK}</span>
                  <span className="text-neutral-400">|</span>
                  <span>US {activeProduct.sizeUS}</span>
                  <span className="text-neutral-400">|</span>
                  <span>{activeProduct.sizeCM} cm</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#DCD4C5] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#010101] hover:bg-[#1C1C1C] text-white'
                  }`}
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>

                <a
                  href={`https://wa.me/923197197454?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5A] text-white shadow-lg transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#FF4C00]" />
                  2-4 Days TCS Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF4C00]" />
                  100% Sourced Original
                </span>
                <Link
                  href={`/product/${activeProduct.id}`}
                  onClick={closeQuickView}
                  className="text-[#FF4C00] underline font-bold"
                >
                  Full Details →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
