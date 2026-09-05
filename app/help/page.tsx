'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw, HelpCircle, PhoneCall, Mail } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-4xl mx-auto space-y-12 bg-[#fffdf9] text-[#252525]">
      
      <div className="space-y-2 border-b border-[#252525]/10 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] block">
          Customer Care & Service
        </span>
        <h1 className="font-serif text-4xl font-normal text-[#252525]">Shipping & Guarantees</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-sm">
        <div className="bg-[#fffdf9] p-6 rounded-none border border-[#252525]/15 space-y-3 shadow-sm">
          <Truck className="w-6 h-6 text-[#b87760]" />
          <h3 className="font-serif text-xl font-normal text-[#252525]">Morocco Express Delivery</h3>
          <p className="text-[#252525]/75 leading-relaxed">
            Orders in Casablanca and Rabat are delivered within 24 hours. All other regions in Morocco receive express delivery within 48 hours. Orders over 500 MAD qualify for complimentary shipping.
          </p>
        </div>

        <div className="bg-[#fffdf9] p-6 rounded-none border border-[#252525]/15 space-y-3 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-[#b87760]" />
          <h3 className="font-serif text-xl font-normal text-[#252525]">Cash on Delivery (COD)</h3>
          <p className="text-[#252525]/75 leading-relaxed">
            We offer cash on delivery (Paiement à la livraison) nationwide across Morocco. Inspect your Gaouāher botanical package upon arrival before completing payment to the courier.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-4 pt-6">
        <h2 className="font-serif text-2xl font-normal text-[#252525]">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          <details className="bg-[#fffdf9] p-5 rounded-none border border-[#252525]/15 cursor-pointer">
            <summary className="font-serif text-base font-normal text-[#252525]">Are Gaouāher. products 100% natural and organic?</summary>
            <p className="text-xs font-sans text-[#252525]/75 pt-3 leading-relaxed">
              Yes. All our botanical extracts (Argan, Rosewater hydrosols, Ghassoul clay, Nila mineral) are 100% organic and harvested sustainably in Morocco.
            </p>
          </details>

          <details className="bg-[#fffdf9] p-5 rounded-none border border-[#252525]/15 cursor-pointer">
            <summary className="font-serif text-base font-normal text-[#252525]">How can I track my order in Morocco?</summary>
            <p className="text-xs font-sans text-[#252525]/75 pt-3 leading-relaxed">
              Once your order is processed, our concierge team will send you an SMS confirmation and WhatsApp tracking link with your courier driver details.
            </p>
          </details>

          <details className="bg-[#fffdf9] p-5 rounded-none border border-[#252525]/15 cursor-pointer">
            <summary className="font-serif text-base font-normal text-[#252525]">What is your return & exchange guarantee?</summary>
            <p className="text-xs font-sans text-[#252525]/75 pt-3 leading-relaxed">
              We offer a 14-day hassle-free return or exchange guarantee for any unopened items. Contact concierge@gaouaher.ma for immediate assistance.
            </p>
          </details>
        </div>
      </div>

    </div>
  );
}

