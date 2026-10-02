'use client';

import React, { useState } from 'react';
import { Bell, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return;
    setSubscribed(true);
    showToast('🎉 You are on the VIP Thrift Drop list! Early drop link sent.', 'success');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#010101] text-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF4C00]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-neutral-800 text-xs font-bold text-[#FF4C00] mb-6">
          <Bell className="w-3.5 h-3.5" />
          <span>SUNDAY 8:00 PM DROP ALERTS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
          Never Miss A 1-of-1 Grail Drop
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 font-medium max-w-xl mx-auto mt-4 leading-relaxed">
          Because thrifted pairs are strictly 1-of-1, they sell out in minutes. Join our VIP WhatsApp / Email alert list to get secret early access 15 minutes before everyone else.
        </p>

        {subscribed ? (
          <div className="mt-8 p-6 rounded-2xl bg-[#1A1A1A] border border-neutral-800 inline-flex items-center gap-3 text-emerald-400 font-bold">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <span>You're locked in! Check your inbox/WhatsApp on Sunday 7:45 PM.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or phone..."
              required
              className="flex-1 px-4 py-3.5 rounded-2xl bg-[#1A1A1A] border border-neutral-800 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#FF4C00]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-[#FF4C00] hover:bg-[#E04300] text-white font-extrabold text-sm uppercase tracking-wider transition shadow-xl"
            >
              Get Alerts
            </button>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4C00]" />
            Zero spam. Only weekly drop alerts.
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            WhatsApp VIP alerts available
          </span>
        </div>

      </div>
    </section>
  );
};
