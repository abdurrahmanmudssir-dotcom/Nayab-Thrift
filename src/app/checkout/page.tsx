'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import confetti from 'canvas-confetti';
import {
  Truck,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Banknote
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, discount, shipping, total, couponCode, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    paymentMethod: 'cod'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const formatPKR = (amount: number) => 'Rs. ' + amount.toLocaleString('en-PK');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.fullName,
          customer_phone: formData.phone,
          customer_email: formData.email,
          city: formData.city,
          shipping_address: formData.address,
          payment_method: formData.paymentMethod,
          subtotal,
          discount,
          delivery_fee: shipping,
          total_amount: total,
          coupon_code: couponCode,
          items: cart,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showToast(result.error || 'Failed to place order. Please try again.', 'warning');
        setIsSubmitting(false);
        return;
      }

      setOrderId(result.order_number);
      setIsSubmitted(true);
      clearCart();

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    } catch (error: any) {
      console.error('Order Submission Error:', error);
      showToast('Network error while placing order. Please try again.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#F1EDE5] min-h-screen py-16 sm:py-24 border-b border-[#DCD4C5]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#010101] text-[#FF4C00] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF4C00]">
              🎉 Order Successfully Placed!
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#010101] uppercase">
              Shukriya, {formData.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] font-medium max-w-md mx-auto">
              Your 1-of-1 thrift order has been confirmed. Our warehouse team in Lahore is packing your pairs with TCS express courier.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6] text-xs font-bold">
              <span className="text-neutral-500">Order Reference</span>
              <span className="text-[#010101] font-mono text-sm">{orderId}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-neutral-700">
              <span>Destination City</span>
              <span className="font-bold">{formData.city}, Pakistan</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-neutral-700">
              <span>Payment Mode</span>
              <span className="font-bold uppercase text-[#FF4C00]">
                {formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Bank / SadaPay'}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D6] font-black text-sm">
              <span>Total Payable Amount</span>
              <span className="text-[#010101] text-base">{formatPKR(total)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-2xl bg-[#010101] hover:bg-[#FF4C00] text-white font-black text-xs uppercase tracking-wider transition shadow-lg"
            >
              Back to Store
            </Link>
            <a
              href={`https://wa.me/923197197454?text=${encodeURIComponent(`Assalam o Alaikum! I placed order ${orderId}. Please confirm status.`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-2xl bg-[#25D366] text-white font-black text-xs uppercase tracking-wider transition shadow-lg"
            >
              Track on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#F1EDE5] min-h-screen py-20 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <ShoppingBag className="w-16 h-16 text-neutral-400 mx-auto" />
          <h2 className="text-2xl font-black text-[#010101] uppercase">Your cart is empty</h2>
          <p className="text-xs text-[#666666]">Add some thrifted shoes to proceed with checkout.</p>
          <Link href="/shop" className="inline-block px-6 py-3 rounded-xl bg-[#010101] text-white font-bold text-xs uppercase">
            Browse Vault
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1EDE5] min-h-screen py-8 sm:py-12 border-b border-[#DCD4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#FF4C00] mb-1">
            Fast 2-Step Checkout
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#010101] uppercase tracking-tight">
            Complete Your Order
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-5">
              <h3 className="font-black text-base text-[#010101] uppercase tracking-wide flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF4C00]" /> 1. Shipping & Contact Details (Pakistan)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Hamza Ali"
                    className="w-full p-3 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-semibold focus:outline-none focus:border-[#010101]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0300 1234567"
                    className="w-full p-3 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-semibold focus:outline-none focus:border-[#010101]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@gmail.com"
                    className="w-full p-3 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-semibold focus:outline-none focus:border-[#010101]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-semibold focus:outline-none focus:border-[#010101]"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                  Full Street Address (House/Apartment, Block, Area) *
                </label>
                <textarea
                  name="address"
                  rows={2}
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House 12B, Sector Y, DHA Phase 3..."
                  className="w-full p-3 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-semibold focus:outline-none focus:border-[#010101]"
                />
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-4">
              <h3 className="font-black text-base text-[#010101] uppercase tracking-wide flex items-center gap-2">
                <Banknote className="w-4 h-4 text-[#FF4C00]" /> 2. Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#FF4C00] bg-[#FFF1EB]'
                      : 'border-[#DCD4C5] bg-[#EBE6DC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-xs text-[#010101] uppercase">Cash on Delivery (COD)</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="accent-[#FF4C00]"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-600">Pay in cash when TCS courier delivers to your door.</p>
                </label>

                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition ${
                    formData.paymentMethod === 'bank'
                      ? 'border-[#FF4C00] bg-[#FFF1EB]'
                      : 'border-[#DCD4C5] bg-[#EBE6DC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-xs text-[#010101] uppercase">SadaPay / Nayapay / Bank</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                      className="accent-[#FF4C00]"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-600">Transfer screenshot verified on WhatsApp for express dispatch.</p>
                </label>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-5">
              <h3 className="font-black text-base text-[#010101] uppercase tracking-wide">
                Order Summary ({cart.length} Pairs)
              </h3>

              <div className="divide-y divide-[#E8E2D6] max-h-64 overflow-y-auto space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#EBE6DC] shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#010101] line-clamp-1">{item.product.name}</h4>
                        <span className="text-[10px] text-neutral-500">EU {item.selectedSize} • Cond {item.product.condition.score}/10</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-[#010101]">{formatPKR(item.product.thriftPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E8E2D6] space-y-2 text-xs text-[#666666]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#010101]">{formatPKR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({couponCode})</span>
                    <span>-{formatPKR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>TCS Courier Delivery</span>
                  <span className="font-bold text-[#010101]">
                    {shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPKR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#010101] pt-3 border-t border-[#DCD4C5]">
                  <span>Total Amount</span>
                  <span className="text-[#FF4C00]">{formatPKR(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#010101] hover:bg-[#FF4C00] disabled:bg-neutral-600 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition transform active:scale-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Place Order ({formatPKR(total)})</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-neutral-500 text-center font-medium space-y-1">
                <p>🔒 100% Secure Checkout with Cash on Delivery</p>
                <p>3-Day Size Replacement Guarantee</p>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
