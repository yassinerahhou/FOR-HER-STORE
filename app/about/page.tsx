'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Award, ShieldCheck, Truck, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-5xl mx-auto space-y-16 bg-[#fffdf9] text-[#252525]">
      
      {/* Editorial Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-[#252525] border border-white/20 text-xs font-mono tracking-widest text-[#b87760] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#b87760]" />
          Maroc · Maison de Beauté
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#252525]">
          Gaouāher. — Jewels of Atlas.
        </h1>
        <p className="text-sm sm:text-base font-mono text-[#252525]/60">
          FOR HER · MAISON DE BEAUTÉ · BOTANICAL EXCELLENCE
        </p>
      </div>

      {/* Hero Still Life Image Banner */}
      <div className="aspect-[16/9] rounded-none overflow-hidden shadow-lg border border-[#252525]/15 relative">
        <img
          src="/images/hero_gaouaher_banner.png"
          alt="Gaouāher Heritage Laboratory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c]/80 via-transparent to-transparent flex items-end p-8 text-white">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#b87760]">Souss-Massa & Atlas Mountains</span>
            <p className="font-serif text-2xl font-normal">Harvested at dawn, formulated with clarity.</p>
          </div>
        </div>
      </div>

      {/* Two Column Brand Manifesto */}
      <div className="grid md:grid-cols-2 gap-12 text-sm sm:text-base text-[#252525]/85 leading-relaxed font-sans">
        <div className="space-y-4 bg-[#fffdf9] p-8 rounded-none border border-[#252525]/15 shadow-sm">
          <h3 className="font-serif text-2xl text-[#252525] font-normal">Moroccan Beauty Heritage</h3>
          <p>
            Gaouāher. (جواهر — meaning Jewels of Atlas) was born from a desire to celebrate authentic Moroccan botanical treasure without gimmicks or clichés. Morocco has been the world’s sanctuary of natural beauty rituals for over two millennia.
          </p>
          <p>
            We collaborate directly with rural female-led agricultural cooperatives in the Souss-Massa region, sourcing cold-pressed virgin Argan kernel oil, raw Atlas Ghassoul clay, and Damask rose petals.
          </p>
        </div>

        <div className="space-y-4 bg-[#fffdf9] p-8 rounded-none border border-[#252525]/15 shadow-sm">
          <h3 className="font-serif text-2xl text-[#252525] font-normal">Dermatological Bio-Actives</h3>
          <p>
            Every formulation undergoes rigorous testing in our modern beauty labs. We combine ancient natural lipids with clinical dermatological actives: Niacinamide, Hyaluronic Acid, ceramides, and Bakuchiol.
          </p>
          <p>
            100% Cruelty-Free, sustainably packaged in heavy recyclable glass, and crafted to deliver visible skin transformation.
          </p>
        </div>
      </div>

      {/* 4 Pillars Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#252525]/15 text-center text-xs font-mono">
        <div className="p-5 bg-[#f5f3ed] rounded-none border border-[#252525]/10 space-y-2">
          <Leaf className="w-6 h-6 text-[#b87760] mx-auto" />
          <span className="font-bold block text-[#252525]">100% Organic Sourcing</span>
          <span className="text-[#252525]/60 block text-[11px]">Direct from Moroccan cooperatives</span>
        </div>
        <div className="p-5 bg-[#f5f3ed] rounded-none border border-[#252525]/10 space-y-2">
          <Award className="w-6 h-6 text-[#b87760] mx-auto" />
          <span className="font-bold block text-[#252525]">Clinical Efficacy</span>
          <span className="text-[#252525]/60 block text-[11px]">Dermatologically tested formulas</span>
        </div>
        <div className="p-5 bg-[#f5f3ed] rounded-none border border-[#252525]/10 space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#b87760] mx-auto" />
          <span className="font-bold block text-[#252525]">Zero Harmful Additives</span>
          <span className="text-[#252525]/60 block text-[11px]">Paraben & sulfate free</span>
        </div>
        <div className="p-5 bg-[#f5f3ed] rounded-none border border-[#252525]/10 space-y-2">
          <Truck className="w-6 h-6 text-[#b87760] mx-auto" />
          <span className="font-bold block text-[#252525]">Morocco Express Shipping</span>
          <span className="text-[#252525]/60 block text-[11px]">Cash on delivery available</span>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-[#1c1c1c] text-white p-10 rounded-none text-center space-y-4 border border-white/20 shadow-xl">
        <h2 className="font-serif text-3xl font-normal text-white">Experience Gaouāher. Luxury Care</h2>
        <p className="text-xs font-mono text-white/80 max-w-md mx-auto">
          Explore our complete collection of botanical skin, hair, and body formulas.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#b87760] hover:bg-[#a36550] text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-all shadow-md"
        >
          Discover Catalog <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </div>

    </div>
  );
}

