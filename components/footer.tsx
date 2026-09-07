'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandMark } from './brand-mark';
import { Mail, Check, ArrowRight, Shield, Award, Heart, RefreshCw } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      const subject = encodeURIComponent('Gaouaher Circle newsletter signup');
      const body = encodeURIComponent(`Please add this email address to the Gaouaher Circle: ${email}`);
      window.location.href = `mailto:concierge@gaouaher.ma?subject=${subject}&body=${body}`;
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  return (
    <footer className="w-full bg-[#1c1c1c] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Top Newsletter & Brand Statement Bar */}
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <BrandMark variant="light" />
            <p className="text-sm font-sans text-white/80 leading-relaxed max-w-lg">
              Gaouāher blends centuries of Moroccan botanical heritage with high-performance modern skin science. 
              Formulated in Morocco with liquid gold Argan, Damask Rose hydrosols, and Atlas volcanic minerals.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#252525] p-6 lg:p-8 border border-white/10 space-y-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b87760]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#b87760]">The Gaouāher Circle</span>
            </div>
            <h3 className="font-serif text-xl lg:text-2xl text-white font-normal">
              Notes from the house, and first access to new editions.
            </h3>

            {subscribed ? (
              <div className="bg-[#fffdf9] text-[#252525] p-3.5 flex items-center gap-2 text-sm font-medium animate-in fade-in">
                <Check className="w-5 h-5 text-[#b87760] flex-shrink-0" />
                <span>Welcome to the circle! Use code <strong className="font-mono text-[#b87760]">GAOUAHER10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#b87760] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#1c1c1c] text-white placeholder-white/40 pl-10 pr-4 py-3 border border-white/20 text-sm focus:outline-none focus:border-[#b87760] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#b87760] hover:bg-[#a36550] text-white font-mono font-bold tracking-wider uppercase px-6 py-3 text-xs transition-all flex items-center gap-2 whitespace-nowrap shadow-md"
                >
                  Join <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-sm">
          {/* Col 1: Shop Catalog */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#b87760]">Shop Catalog</h4>
            <ul className="space-y-2.5 text-white/75 text-xs font-sans">
              <li><Link href="/shop?category=Skincare" className="hover:underline transition-colors">Skincare Elixirs</Link></li>
              <li><Link href="/shop?category=Face%20Care" className="hover:underline transition-colors">Face Care & Mists</Link></li>
              <li><Link href="/shop?category=Body%20Care" className="hover:underline transition-colors">Body Oils & Scrubs</Link></li>
              <li><Link href="/shop?category=Hair%20Care" className="hover:underline transition-colors">Hair Silk Care</Link></li>
              <li><Link href="/shop?category=Fragrance" className="hover:underline transition-colors">Eau de Parfum</Link></li>
              <li><Link href="/shop?category=Gift%20Sets" className="hover:underline transition-colors">Luxury Gift Boxes</Link></li>
            </ul>
          </div>

          {/* Col 2: Moroccan Rituals */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#b87760]">Moroccan Rituals</h4>
            <ul className="space-y-2.5 text-white/75 text-xs font-sans">
              <li><Link href="/shop?category=Moroccan%20Beauty" className="hover:underline transition-colors">The Argan Heritage</Link></li>
              <li><Link href="/shop?category=Moroccan%20Beauty" className="hover:underline transition-colors">Atlas Ghassoul Detox</Link></li>
              <li><Link href="/shop?category=Moroccan%20Beauty" className="hover:underline transition-colors">Kelaa Damask Rose</Link></li>
              <li><Link href="/shop?category=Moroccan%20Beauty" className="hover:underline transition-colors">Royal Blue Nila</Link></li>
              <li><Link href="/shop?category=Moroccan%20Beauty" className="hover:underline transition-colors">Home Hammam Care</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#b87760]">Customer Service</h4>
            <ul className="space-y-2.5 text-white/75 text-xs font-sans">
              <li><Link href="/policies#shipping" className="hover:underline transition-colors">Morocco Shipping & Delivery</Link></li>
              <li><Link href="/policies#payment" className="hover:underline transition-colors">Cash on Delivery Info</Link></li>
              <li><Link href="/policies#returns" className="hover:underline transition-colors">Returns & Guarantee</Link></li>
              <li><Link href="/help" className="hover:underline transition-colors">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Col 4: About & Philosophy */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#b87760]">The House</h4>
            <ul className="space-y-2.5 text-white/75 text-xs font-sans">
              <li><Link href="/about" className="hover:underline transition-colors">Brand Story & Philosophy</Link></li>
              <li><Link href="/policies#privacy" className="hover:underline transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies#terms" className="hover:underline transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-b border-white/10 text-center text-xs font-mono text-white/70">
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Shield className="w-5 h-5 text-[#b87760]" />
            <span>100% Organic Botanical Extracts</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Award className="w-5 h-5 text-[#b87760]" />
            <span>Formulated & Bottled in Morocco</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <RefreshCw className="w-5 h-5 text-[#b87760]" />
            <span>Cash on Delivery & Free Returns</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Heart className="w-5 h-5 text-[#b87760]" />
            <span>Cruelty-Free & Sustainable Glass</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div>
            © {new Date().getFullYear()} GAOUĀHER MAISON DE BEAUTÉ MAROC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#252525] text-[#b87760] px-2.5 py-1 text-[10px] border border-[#b87760]/30 font-bold">
              PAY ON DELIVERY
            </span>
            <span className="bg-[#252525] text-white px-2.5 py-1 text-[10px] border border-white/20">
              VISA
            </span>
            <span className="bg-[#252525] text-white px-2.5 py-1 text-[10px] border border-white/20">
              MASTERCARD
            </span>
            <span className="bg-[#252525] text-white px-2.5 py-1 text-[10px] border border-white/20">
              APPLE PAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
