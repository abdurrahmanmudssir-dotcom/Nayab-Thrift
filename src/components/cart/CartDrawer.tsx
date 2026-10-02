'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Plus, 
  Minus,
  Sparkles,
  Check
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingProgress,
    remainingForFreeShipping,
    couponCode,
    applyCoupon,
    removeCoupon,
    appliedCouponDiscount,
  } = useCart();

  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Close cart drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setIsApplying(true);
    const res = applyCoupon(promoInput);
    setIsApplying(false);
    if (res.success) {
      showToast(res.message, 'success');
      setPromoInput('');
    } else {
      showToast(res.message, 'warning');
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    showToast(`Removed "${productName}" from cart`, 'info');
  };

  const formatPKR = (val: number) => 'Rs. ' + val.toLocaleString('en-PK');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Cart Slider Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#DCD4C5]">
          
          {/* Header Row */}
          <div className="p-4 sm:p-5 border-b border-[#DCD4C5] flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-none bg-[#010101] flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#010101] uppercase tracking-tight font-sans">
                  YOUR BAG <span className="text-[#FF4C00]">({itemCount})</span>
                </h2>
                <p className="text-[11px] text-neutral-500 font-medium">
                  {itemCount === 0 ? 'Empty bag' : `${cart.length} unique ${cart.length === 1 ? 'item' : 'items'} in bag`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-500 hover:text-[#010101] hover:bg-neutral-100 transition rounded-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-4 sm:px-5 py-3 bg-[#F4F0E8] border-b border-[#E2DDD0]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="flex items-center gap-1.5 text-neutral-800">
                <Truck className="w-4 h-4 text-[#FF4C00] shrink-0" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-black flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> FREE NATIONWIDE DELIVERY UNLOCKED!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#FF4C00] font-black">{formatPKR(remainingForFreeShipping)}</strong> more for FREE Delivery
                  </span>
                )}
              </span>
              <span className="text-xs font-mono font-black text-neutral-600">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E0D8C8] overflow-hidden">
              <div
                className="h-full bg-[#FF4C00] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              /* Empty State */
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 space-y-5">
                <div className="w-20 h-20 bg-[#EDE8DF] border border-[#DCD4C5] flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-9 h-9" />
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <h3 className="font-black text-lg text-[#010101] uppercase tracking-tight">
                    YOUR CART IS EMPTY
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Explore our latest 1-of-1 thrift sneaker drops from Japan, UK, and Europe before they sell out!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-8 py-3.5 bg-[#010101] hover:bg-[#FF4C00] text-white font-black text-xs tracking-wider uppercase transition shadow-lg inline-flex items-center gap-2 rounded-none"
                >
                  <span>START SHOPPING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Cart Item Cards */
              cart.map((item) => {
                const product = item.product;
                const productImage = product.images && product.images.length > 0
                  ? product.images[0]
                  : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=90';

                return (
                  <div
                    key={`${product.id}-${item.selectedSize}`}
                    className="flex gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white border border-[#E2DDD0] transition-all duration-200 hover:border-neutral-400"
                  >
                    {/* Clean Sneaker Thumbnail */}
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#FAF8F5] border border-[#EBE6DC] shrink-0 flex items-center justify-center p-2 group"
                    >
                      <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        sizes="120px"
                        className="object-contain p-1.5 drop-shadow-[0_6px_10px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Item Info & Controls */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Brand & Remove Button */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#FF4C00]">
                            {product.brand}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(product.id, product.name)}
                            className="text-neutral-400 hover:text-red-600 transition p-1"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Title */}
                        <Link
                          href={`/product/${product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="block"
                        >
                          <h4 className="font-black text-xs sm:text-sm text-[#010101] uppercase tracking-tight line-clamp-1 hover:text-[#FF4C00] transition">
                            {product.name}
                          </h4>
                        </Link>

                        {/* Size & Condition Tags */}
                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-neutral-600 font-medium">
                          <span className="bg-[#FAF8F5] border border-[#DCD4C5] px-2 py-0.5 font-mono font-bold text-neutral-800 text-[10px]">
                            EU {item.selectedSize || product.sizeEU} / UK {product.sizeUK}
                          </span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-[10px] font-bold text-neutral-500">
                            Cond: {product.condition.score}/10
                          </span>
                        </div>
                      </div>

                      {/* Quantity Selector & Price Line */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-100">
                        {/* Working Quantity Controls */}
                        <div className="flex items-center border border-neutral-300 bg-[#FAF8F5]">
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-black transition"
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono font-black text-[#010101]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-black transition"
                            title="Increase quantity"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price Total for this item */}
                        <div className="text-right">
                          <span className="font-black font-mono text-sm sm:text-base text-[#010101]">
                            {formatPKR(product.thriftPrice * item.quantity)}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Summary Panel */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#DCD4C5] bg-white space-y-4 shadow-lg sticky bottom-0">
              
              {/* Promo Voucher Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder='Coupon code (THRIFT10, NAYAB15)'
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase font-mono tracking-wider bg-[#FAF8F5] border border-neutral-300 text-[#010101] placeholder:text-neutral-400 placeholder:normal-case focus:outline-none focus:border-[#010101] rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isApplying}
                  className="px-4 py-2 bg-[#010101] hover:bg-[#FF4C00] text-white text-xs font-black uppercase tracking-wider transition rounded-none disabled:opacity-50"
                >
                  Apply
                </button>
              </form>

              {/* Applied Coupon Tag */}
              {appliedCouponDiscount > 0 && (
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Coupon <strong className="font-mono">{couponCode}</strong> applied (-{appliedCouponDiscount * 100}%)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-500 hover:text-red-600 text-xs font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Order Calculations Breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
                <div className="flex justify-between font-medium">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-bold font-mono text-[#010101]">{formatPKR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Voucher</span>
                    <span className="font-mono">-{formatPKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between font-medium">
                  <span>TCS Nationwide Delivery</span>
                  <span className="font-bold font-mono text-[#010101]">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-black">FREE</span>
                    ) : (
                      formatPKR(shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-black text-[#010101] pt-2.5 border-t border-neutral-200">
                  <span className="uppercase tracking-tight">Estimated Total</span>
                  <span className="text-[#FF4C00] font-mono">{formatPKR(total)}</span>
                </div>
              </div>

              {/* Checkout CTA Buttons */}
              <div className="space-y-2.5 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 bg-[#FF4C00] hover:bg-[#E04300] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition transform active:scale-98 rounded-none"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF4C00]" />
                    Cash on Delivery Available
                  </span>
                  <span>•</span>
                  <span>100% Authentic Guaranteed</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
