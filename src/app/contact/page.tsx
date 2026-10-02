'use client';

import React, { useState } from 'react';
import { PhoneCall, MapPin, MessageCircle, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message sent! Our customer care team will WhatsApp you within 2 hours.', 'success');
  };

  const faqs = [
    {
      q: 'Are all thrift shoes on Nayab Thrift 100% original?',
      a: 'Yes, 100%. We rigorously check factory labels, serial numbers, sole stitching, and insole foam. We never sell replicas, copies, or master quality fakes.'
    },
    {
      q: 'How does Cash on Delivery (COD) work across Pakistan?',
      a: 'Place your order online with your address and phone number. Our team dispatches via TCS or Leopards courier within 24 hours. You pay cash to the courier rider upon delivery at your doorstep.'
    },
    {
      q: 'What if the shoe size does not fit me?',
      a: 'We offer a 3-Day Size Exchange Guarantee. Contact us on WhatsApp (+92 319 7197454) within 3 days of receiving your package, and we will arrange an exchange or store credit.'
    },
    {
      q: 'How do you clean and sanitize thrift shoes?',
      a: 'Every pair goes through a 5-step restoration: Ultrasonic bath cleaning, hospital-grade anti-bacterial foam sterilization, premium leather balm conditioning, insole deodorization, and sole grip check.'
    }
  ];

  return (
    <div className="bg-[#F1EDE5] min-h-screen py-12 sm:py-20 border-b border-[#DCD4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-black uppercase tracking-widest text-[#FF4C00] mb-2">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#010101] tracking-tight uppercase">
            Contact & Support
          </h1>
          <p className="text-sm text-[#666666] font-medium mt-3">
            Questions about shoe sizing, order tracking, or authentic drops? We're available 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-6">
              <h3 className="font-black text-base text-[#010101] uppercase tracking-wide">
                Direct Help Channels
              </h3>

              <div className="space-y-4 text-xs">
                <a
                  href="https://wa.me/923197197454"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#EBE6DC] hover:bg-[#25D366] hover:text-white transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold block text-sm">WhatsApp Helpline</span>
                    <span className="text-neutral-600 group-hover:text-white">+92 319 7197454 (Instant Reply)</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#EBE6DC]">
                  <div className="w-10 h-10 rounded-xl bg-[#010101] text-[#FF4C00] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold block text-sm">Phone Support</span>
                    <span className="text-neutral-600">Mon - Sat: 11:00 AM - 9:00 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#EBE6DC]">
                  <div className="w-10 h-10 rounded-xl bg-[#010101] text-[#FF4C00] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold block text-sm">Lahore Central Hub</span>
                    <span className="text-neutral-600">Main Boulevard, Gulberg III, Lahore, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow">
              <h3 className="font-black text-lg text-[#010101] uppercase mb-6">
                Send Us A Message
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-black text-lg text-emerald-900">Thank you!</h4>
                  <p className="text-xs text-emerald-700">
                    We received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full p-3.5 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-medium focus:outline-none focus:border-[#010101]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full p-3.5 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-medium focus:outline-none focus:border-[#010101]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-800 uppercase block mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Inquire about shoe size, thrift restock dates, or custom orders..."
                      className="w-full p-3.5 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-medium focus:outline-none focus:border-[#010101]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#010101] hover:bg-[#FF4C00] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        <div id="faq" className="pt-12 border-t border-[#DCD4C5]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#010101] uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow transition cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between font-extrabold text-sm text-[#010101]">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-xs text-neutral-600 font-medium leading-relaxed border-t border-[#E8E2D6] pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
