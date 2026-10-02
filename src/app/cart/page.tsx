'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Plus, 
  Minus,
  Sparkles,
  Check,
  ChevronLeft
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
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
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12 border-b border-[#E5E0D5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E5E0D5] mb-8">
          <div>
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-[#010101] mb-2 transition">
              <ChevronLeft className="w-4 h-4" />
              <span>CONTINUE SHOPPING</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#010101] uppercase tracking-tight font-sans">
              SHOPPING BAG <span className="text-[#FF4C00]">({itemCount})</span>
            </h1>
          </div>

          <span className="hidden sm:block text-xs font-mono font-bold text-neutral-500">
            NAYAB THRIFT VAULT PK
          </span>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white border border-[#E5E0D5] p-12 sm:p-20 text-center flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto shadow-sm">
            <div className="w-24 h-24 bg-[#FAF7F2] border border-[#E5E0D5] flex items-center justify-center text-neutral-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#010101] uppercase tracking-tight">
                YOUR SHOPPING BAG IS EMPTY
              </h2>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Looks like you haven't added any thrifted grails to your bag yet. Explore our curated pairs from Japan and UK!
              </p>
            </div>
            <Link
              href="/shop"
              className="px-8 py-4 bg-[#010101] hover:bg-[#FF4C00] text-white font-black text-xs uppercase tracking-wider transition shadow-lg inline-flex items-center gap-2"
            >
              <span>EXPLORE ALL SNEAKERS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Main Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Cart Items (7 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert Box */}
              <div className="p-4 bg-[#F4F0E8] border border-[#E2DDD0]">
                <div className="flex items-center justify-between text-xs mb-2 font-bold">
                  <span className="flex items-center gap-2 text-neutral-800">
                    <Truck className="w-4 h-4 text-[#FF4C00] shrink-0" />
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-emerald-700 font-black flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> FREE TCS DELIVERY UNLOCKED!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#FF4C00] font-black">{formatPKR(remainingForFreeShipping)}</strong> more for Free Delivery
                      </span>
                    )}
                  </span>
                  <span className="font-mono font-black text-neutral-700">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-[#E0D8C8] overflow-hidden">
                  <div
                    className="h-full bg-[#FF4C00] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white border border-[#E5E0D5] divide-y divide-neutral-200">
                {cart.map((item) => {
                  const product = item.product;
                  const productImage = product.images && product.images.length > 0
                    ? product.images[0]
                    : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=90';

                  return (
                    <div key={`${product.id}-${item.selectedSize}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                      
                      {/* Left: Image & Title */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <Link
                          href={`/product/${product.id}`}
                          className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#FAF8F5] border border-[#EBE6DC] shrink-0 flex items-center justify-center p-2 group"
                        >
                          <Image
                            src={productImage}
                            alt={product.name}
                            fill
                            sizes="120px"
                            className="object-contain p-1.5 drop-shadow-[0_8px_12px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#FF4C00]">
                            {product.brand}
                          </span>
                          <Link href={`/product/${product.id}`} className="block">
                            <h3 className="font-black text-sm sm:text-base text-[#010101] uppercase tracking-tight hover:text-[#FF4C00] transition line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
                            <span className="bg-[#FAF8F5] border border-[#DCD4C5] px-2 py-0.5 font-mono font-bold text-neutral-800 text-[10px]">
                              EU {item.selectedSize || product.sizeEU} / UK {product.sizeUK}
                            </span>
                            <span>•</span>
                            <span className="text-neutral-500 font-bold text-[10px]">
                              Condition: {product.condition.score}/10
                            </span>
                          </div>
                          <p className="text-xs font-mono font-bold text-neutral-500 pt-1">
                            Unit: {formatPKR(product.thriftPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Right: Quantity + Line Total + Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        
                        {/* Working Quantity Controls */}
                        <div className="flex items-center border border-neutral-300 bg-[#FAF8F5]">
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-black transition"
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center text-xs font-mono font-black text-[#010101]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-black transition"
                            title="Increase quantity"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price Total */}
                        <div className="text-right min-w-[110px]">
                          <span className="font-black font-mono text-base sm:text-lg text-[#010101] block">
                            {formatPKR(product.thriftPrice * item.quantity)}
                          </span>
                        </div>

                        {/* Trash */}
                        <button
                          onClick={() => handleRemoveItem(product.id, product.name)}
                          className="text-neutral-400 hover:text-red-600 transition p-2"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white border border-[#E5E0D5] p-6 space-y-5 shadow-sm sticky top-24">
                <h2 className="text-lg font-black text-[#010101] uppercase tracking-tight font-sans pb-3 border-b border-neutral-200">
                  ORDER SUMMARY
                </h2>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder='COUPON (THRIFT10, NAYAB15)'
                      className="w-full pl-9 pr-3 py-2.5 text-xs uppercase font-mono tracking-wider bg-[#FAF8F5] border border-neutral-300 text-[#010101] placeholder:text-neutral-400 focus:outline-none focus:border-[#010101]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="px-4 py-2.5 bg-[#010101] hover:bg-[#FF4C00] text-white text-xs font-black uppercase tracking-wider transition disabled:opacity-50"
                  >
                    Apply
                  </button>
                </form>

                {appliedCouponDiscount > 0 && (
                  <div className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
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

                {/* Calculations Breakdown */}
                <div className="space-y-2.5 text-xs text-neutral-600 pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-bold font-mono text-[#010101]">{formatPKR(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Voucher Discount</span>
                      <span className="font-mono">-{formatPKR(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-medium">
                    <span>TCS Nationwide Delivery</span>
                    <span className="font-bold font-mono text-[#010101]">
                      {shipping === 0 ? <span className="text-emerald-700 font-black">FREE</span> : formatPKR(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-black text-[#010101] pt-3 border-t border-neutral-200">
                    <span className="uppercase tracking-tight">Total Amount</span>
                    <span className="text-[#FF4C00] font-mono">{formatPKR(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="pt-3 space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full py-4 bg-[#FF4C00] hover:bg-[#E04300] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition transform active:scale-98"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="space-y-2 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#FF4C00] shrink-0" />
                      <span>Cash on Delivery across all cities in Pakistan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Original Japanese & European Thrift Inspection</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
