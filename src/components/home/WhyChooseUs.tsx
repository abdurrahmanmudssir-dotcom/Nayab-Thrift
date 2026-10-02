'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Truck, RotateCcw, Wallet } from 'lucide-react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#FF4C00]" />,
      title: '100% Original Products',
      description: 'Every pair passes serial check, insole inspection, and sole stitching authentication.'
    },
    {
      icon: <Sparkles className="w-7 h-7 text-[#FF4C00]" />,
      title: 'Quality Checked & Sanitized',
      description: 'Ultrasonic washed and hospital-grade shoe foam disinfected before packing.'
    },
    {
      icon: <Truck className="w-7 h-7 text-[#FF4C00]" />,
      title: 'Fast Delivery PK',
      description: 'Dispatched via TCS / Leopards Courier in 2-4 working days with full live tracking.'
    },
    {
      icon: <RotateCcw className="w-7 h-7 text-[#FF4C00]" />,
      title: '3-Day Easy Exchange',
      description: 'Size doesn’t fit? Exchange effortlessly within 3 days without questions.'
    },
    {
      icon: <Wallet className="w-7 h-7 text-[#FF4C00]" />,
      title: 'Affordable Luxury',
      description: 'Rock original Rs. 50k+ kicks at 70-80% off retail pricing in Pakistani Rupees.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F1EDE5] border-b border-[#DCD4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-black uppercase tracking-widest text-[#FF4C00] mb-2">
            The Nayab Thrift Guarantee
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#010101] tracking-tight uppercase">
            Why Sneakerheads Choose Us
          </h2>
          <p className="text-sm text-[#666666] font-medium mt-3">
            We bridge the gap between expensive luxury streetwear and genuine sustainable thrift culture in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#F1EDE5] border border-[#DCD4C5] flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-base text-[#010101] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#666666] font-medium leading-relaxed mt-2.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
