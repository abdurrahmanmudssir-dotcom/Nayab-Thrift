'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { OrderRecord } from '@/types/database';

export default function OrderTrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const formatPKR = (amount: number) => 'Rs. ' + amount.toLocaleString('en-PK');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setErrorMessage('');
    setOrders(null);

    try {
      const res = await fetch(`/api/track?query=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'No matching order found.');
        return;
      }

      setOrders(data.orders);
    } catch (err: any) {
      setErrorMessage('Network error while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 1;
      case 'confirmed':
      case 'sanitizing':
        return 2;
      case 'packed':
        return 3;
      case 'dispatched':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 1;
    }
  };

  return (
    <div className="bg-[#F1EDE5] min-h-screen py-10 sm:py-16 border-b border-[#DCD4C5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF4C00]">
            <Truck className="w-4 h-4" />
            <span>LIVE COURIER TRACKING PK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#010101] uppercase tracking-tight">
            TRACK YOUR VAULT ORDER
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            Enter your 6-digit Order Reference (e.g. <strong>NT-982145</strong>) or registered WhatsApp phone number.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order Reference (NT-...) or Phone (0300...)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs sm:text-sm font-bold text-[#010101] placeholder-neutral-500 focus:outline-none focus:border-[#010101] transition"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 rounded-2xl bg-[#010101] hover:bg-[#FF4C00] disabled:bg-neutral-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shrink-0 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>TRACK ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              ⚠️ {errorMessage}
            </div>
          )}
        </div>

        {/* Search Results */}
        {orders && orders.length > 0 && (
          <div className="space-y-8">
            {orders.map((order) => {
              const currentStep = getStatusStep(order.order_status);

              return (
                <div
                  key={order.order_number}
                  className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-6 animate-fade-in"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D6]">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4C00]">
                        Verified Order
                      </span>
                      <h2 className="text-2xl font-black text-[#010101] font-mono">
                        {order.order_number}
                      </h2>
                      <span className="text-xs text-neutral-500">
                        Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString('en-PK', { dateStyle: 'medium' }) : 'Today'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-4 py-1.5 rounded-full bg-[#010101] text-white text-xs font-black uppercase tracking-wider">
                        Status: {order.order_status.toUpperCase()}
                      </span>
                      <span className="px-4 py-1.5 rounded-full bg-[#EBE6DC] text-neutral-800 text-xs font-bold uppercase border border-[#DCD4C5]">
                        {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Paid'}
                      </span>
                    </div>
                  </div>

                  {/* Visual Delivery Stepper */}
                  <div className="py-4">
                    <div className="grid grid-cols-5 gap-2 text-center relative">
                      {/* Step 1 */}
                      <div className="space-y-2">
                        <div className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition ${
                          currentStep >= 1 ? 'bg-[#010101] text-white shadow-md' : 'bg-[#EBE6DC] text-neutral-400'
                        }`}>
                          1
                        </div>
                        <span className="text-[11px] font-extrabold uppercase text-[#010101] block">Order Placed</span>
                      </div>

                      {/* Step 2 */}
                      <div className="space-y-2">
                        <div className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition ${
                          currentStep >= 2 ? 'bg-[#010101] text-white shadow-md' : 'bg-[#EBE6DC] text-neutral-400'
                        }`}>
                          2
                        </div>
                        <span className="text-[11px] font-extrabold uppercase text-[#010101] block">Sanitized & Checked</span>
                      </div>

                      {/* Step 3 */}
                      <div className="space-y-2">
                        <div className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition ${
                          currentStep >= 3 ? 'bg-[#010101] text-white shadow-md' : 'bg-[#EBE6DC] text-neutral-400'
                        }`}>
                          3
                        </div>
                        <span className="text-[11px] font-extrabold uppercase text-[#010101] block">Packed</span>
                      </div>

                      {/* Step 4 */}
                      <div className="space-y-2">
                        <div className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition ${
                          currentStep >= 4 ? 'bg-[#FF4C00] text-white shadow-md' : 'bg-[#EBE6DC] text-neutral-400'
                        }`}>
                          4
                        </div>
                        <span className="text-[11px] font-extrabold uppercase text-[#010101] block">Dispatched (TCS)</span>
                      </div>

                      {/* Step 5 */}
                      <div className="space-y-2">
                        <div className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition ${
                          currentStep >= 5 ? 'bg-emerald-600 text-white shadow-md' : 'bg-[#EBE6DC] text-neutral-400'
                        }`}>
                          5
                        </div>
                        <span className="text-[11px] font-extrabold uppercase text-[#010101] block">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery & Courier Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#EBE6DC] border border-[#DCD4C5]">
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-neutral-500 uppercase text-[10px]">Courier Partner</span>
                      <p className="font-extrabold text-[#010101] flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#FF4C00]" /> {order.courier_name || 'TCS Express'}
                      </p>
                      {order.tracking_number ? (
                        <p className="font-mono font-bold text-[#010101] pt-1">
                          Tracking #: <span className="text-[#FF4C00]">{order.tracking_number}</span>
                        </p>
                      ) : (
                        <p className="text-neutral-500 italic">Tracking number being generated by Lahore vault dispatch hub.</p>
                      )}
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-neutral-500 uppercase text-[10px]">Delivery Address</span>
                      <p className="font-extrabold text-[#010101] flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#010101]" /> {order.customer_name} ({order.city})
                      </p>
                      <p className="text-neutral-600 font-medium line-clamp-2">{order.shipping_address}</p>
                    </div>
                  </div>

                  {/* Ordered Items List */}
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="font-black text-xs text-[#010101] uppercase tracking-wider">
                        Ordered Pairs ({order.items.length})
                      </h4>
                      <div className="divide-y divide-[#E8E2D6]">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                                {item.image_url ? (
                                  <Image src={item.image_url} alt={item.product_name} fill className="object-cover" />
                                ) : (
                                  <Package className="w-6 h-6 m-auto text-neutral-500" />
                                )}
                              </div>
                              <div>
                                <h5 className="font-extrabold text-xs text-[#010101]">{item.product_name}</h5>
                                <span className="text-[10px] text-neutral-500">EU Size {item.size_eu} • {item.brand || 'Original'}</span>
                              </div>
                            </div>
                            <span className="font-extrabold text-xs text-[#010101]">{formatPKR(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary & WhatsApp Contact */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8E2D6]">
                    <div className="text-sm font-black text-[#010101]">
                      <span>Total Payable: </span>
                      <span className="text-[#FF4C00]">{formatPKR(order.total_amount)}</span>
                    </div>

                    <a
                      href={`https://wa.me/923197197454?text=${encodeURIComponent(`Assalam o Alaikum! I am tracking order ${order.order_number}. Please provide latest delivery update.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp Support</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
