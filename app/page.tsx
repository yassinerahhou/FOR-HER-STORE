'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RitualsSection } from '@/components/rituals-section';
import { ReviewsSection } from '@/components/reviews-section';
import { products, formatMad, Category } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import {
  Sparkles,
  ArrowRight,
  Star,
  Heart,
  ShoppingBag,
  Eye,
  CheckCircle2,
  Award,
  Truck,
  ShieldCheck,
  Flame,
  Droplet,
  Globe,
  Feather,
  PackageCheck,
  Gem
} from 'lucide-react';

export default function Home() {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useCart();
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');

  // Featured Products
  const heroProduct = products[0]; // Pure Argan Youth Elixir
  const fragranceProducts = products.filter((p) => p.category === 'Fragrance').slice(0, 3);
  const giftSets = products.filter((p) => p.category === 'Gift Sets').slice(0, 3);

  // Filter products for homepage signature catalog grid
  const filteredProducts = products.filter((p) => {
    if (activeCategoryTab === 'All') return p.isBestSeller || p.isFeatured;
    if (activeCategoryTab === 'Oils') return p.category === 'Moroccan Beauty' || p.category === 'Skincare';
    if (activeCategoryTab === 'Face') return p.category === 'Face Care';
    if (activeCategoryTab === 'Fragrance') return p.category === 'Fragrance';
    if (activeCategoryTab === 'Gifts') return p.category === 'Gift Sets';
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-0 bg-[#fffdf9] text-[#252525]">
      
      {/* 1. EDITORIAL HERO CAMPAIGN (French/Moroccan Luxury Maison Layout) */}
      <section className="relative min-h-[85vh] flex items-center bg-[#fffdf9] text-[#252525] overflow-hidden border-b border-[#252525]/15">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#b87760] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#b87760] animate-pulse" />
              EST. MARRAKECH · MAISON DE BEAUTÉ MAROC
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05] text-[#252525]">
              Centuries of Atlas wisdom. <br />
              <span className="italic text-[#b87760]">Composed for now.</span>
            </h1>

            <p className="text-base sm:text-lg font-sans text-[#252525]/85 max-w-lg leading-relaxed">
              Intelligent botanical extractions, considered lipid concentrations, and a finish that feels like your own skin—only more at ease.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/shop"
                className="bg-[#252525] hover:bg-[#1c1c1c] text-white font-mono text-xs tracking-widest uppercase font-bold py-4 px-8 rounded-none transition-all flex items-center gap-3 shadow-md hover:shadow-lg"
              >
                Enter the collection <ArrowRight className="w-4 h-4 text-[#b87760]" />
              </Link>

              <Link
                href="/shop?category=Moroccan%20Beauty"
                className="border border-[#252525]/30 hover:border-[#252525] text-[#252525] font-mono text-xs tracking-widest uppercase py-4 px-8 rounded-none transition-all hover:bg-[#252525]/5 font-bold"
              >
                Discover the rituals
              </Link>
            </div>

            {/* Sourcing Provenance Strip */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs font-mono text-[#252525]/80 border-t border-[#252525]/15">
              <span className="flex items-center gap-1.5">
                <span className="text-[#b87760]">✦</span> Wild UNESCO Argan
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#b87760]">✦</span> Kelaat M&apos;Gouna Rose
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#b87760]">✦</span> Subterranean Ghassoul
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#b87760]">✦</span> Saharan Nila Indigo
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="aspect-[4/5] max-h-[520px] w-full rounded-none overflow-hidden bg-[#f5f3ed] border border-[#252525]/15 shadow-xl relative group">
              <img
                src="/images/hero_gaouaher_banner.png"
                alt="Gaouāher Maison Campaign"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#fffdf9]/95 backdrop-blur p-4 border border-[#252525]/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#b87760] font-bold block">
                    Iconic Maison Hero Formula
                  </span>
                  <span className="font-serif text-sm font-normal text-[#252525]">Pure Argan Youth Elixir</span>
                  <span className="text-xs font-mono text-[#252525]/60 block">{formatMad(490)}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(heroProduct)}
                    className="bg-[#252525] text-white px-3.5 py-2 text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-[#b87760] transition-colors flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#b87760]" /> Add
                  </button>
                  <Link
                    href="/product/argan-gold-elixir"
                    className="border border-[#252525]/30 text-[#252525] px-3.5 py-2 text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-[#252525]/5 transition-colors"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. BRAND MANIFESTO & PHILOSOPHY (Material Intelligence) */}
      <section className="py-24 px-6 lg:px-12 bg-[#fffdf9] border-b border-[#252525]/15">
        <div className="max-w-[1400px] mx-auto space-y-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold block">
                The Material Intelligence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#252525] leading-tight">
                Water, mineral, lipid. <br />
                <span className="italic text-[#b87760]">Nothing extraneous.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#252525]/85 leading-relaxed font-sans border-l-2 border-[#252525]/20 pl-8">
              <p>
                <strong>Gaouāher</strong> (جواهر — meaning <em>Jewels of the Atlas</em>) was founded to strip away ornamental fluff and honor authentic Moroccan botanical science.
              </p>
              <p>
                Every drop of wild Argan kernel oil is hand-harvested by female-led Berber cooperatives in Southwestern Morocco. Our Damask rose hydrosols are steam-distilled at first light in the Valley of Roses. Zero synthetic dyes. Zero harsh alcohols. Just pure, considered care.
              </p>
            </div>
          </div>

          {/* 4 Imperial Botanical Pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-[#252525]/15">
            <div className="bg-[#f5f3ed] p-8 border border-[#252525]/15 space-y-3 hover:border-[#252525]/40 transition-colors">
              <span className="font-mono text-xs text-[#b87760] font-bold block">PILLAR 01 / WILD HARVEST</span>
              <h3 className="font-serif text-xl font-normal text-[#252525]">UNESCO-Protected Argania</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                First cold pressing preserves ultra-dense lipid nutrients, Vitamin E, and essential omega fatty acids.
              </p>
            </div>

            <div className="bg-[#f5f3ed] p-8 border border-[#252525]/15 space-y-3 hover:border-[#252525]/40 transition-colors">
              <span className="font-mono text-xs text-[#b87760] font-bold block">PILLAR 02 / DAWN DISTILLATION</span>
              <h3 className="font-serif text-xl font-normal text-[#252525]">Kelaat M&apos;Gouna Rose</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                Petals gathered at dawn when volatile aromatic terpenes peak. Distilled in traditional copper alembics.
              </p>
            </div>

            <div className="bg-[#f5f3ed] p-8 border border-[#252525]/15 space-y-3 hover:border-[#252525]/40 transition-colors">
              <span className="font-mono text-xs text-[#b87760] font-bold block">PILLAR 03 / VOLCANIC MINERALS</span>
              <h3 className="font-serif text-xl font-normal text-[#252525]">Atlas Ghassoul & Nila</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                Subterranean lava clay and Saharan indigo stone minerals to refine pores and clarify skin tone.
              </p>
            </div>

            <div className="bg-[#f5f3ed] p-8 border border-[#252525]/15 space-y-3 hover:border-[#252525]/40 transition-colors">
              <span className="font-mono text-xs text-[#b87760] font-bold block">PILLAR 04 / OLFACTORY ARTISTRY</span>
              <h3 className="font-serif text-xl font-normal text-[#252525]">Royal Oud & Amber Extrait</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                High-ticket 30% concentration extrait de parfum hand-poured into heavy crystal apothecary flasks.
              </p>
            </div>
          </div>

          {/* Key Artisan Metrics Strip */}
          <div className="bg-[#252525] text-white p-8 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
            <div className="space-y-1">
              <span className="font-serif text-2xl md:text-3xl text-[#b87760] font-normal">21°C</span>
              <p className="text-[11px] text-white/70">Cold Pressing Temperature</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl md:text-3xl text-[#b87760] font-normal">200,000</span>
              <p className="text-[11px] text-white/70">Rose Petals per Hydro-Liter</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl md:text-3xl text-[#b87760] font-normal">UV Shield</span>
              <p className="text-[11px] text-white/70">Miron Violet Glass Protection</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl md:text-3xl text-[#b87760] font-normal">0%</span>
              <p className="text-[11px] text-white/70">Water Dilution or Parabens</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. HERO PRODUCT SPOTLIGHT CARD */}
      <section className="py-20 px-6 lg:px-12 bg-[#f5f3ed] border-b border-[#252525]/15">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="bg-[#fffdf9] p-8 sm:p-12 w-full max-h-[500px] flex items-center justify-center border border-[#252525]/15 shadow-md relative">
              <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-[#252525]/50 font-bold border border-[#252525]/15 px-2.5 py-1">
                LIMITED BOTANICAL PRESSING · BATCH #047
              </span>
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="max-h-[390px] w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#252525] text-white text-[10px] font-mono tracking-widest uppercase font-bold">
              <Award className="w-3.5 h-3.5 text-[#b87760]" />
              Iconic Maison Hero Formula
            </div>

            <h2 className="font-cosmetic text-4xl sm:text-5xl lg:text-6xl font-normal text-[#252525] leading-[0.95]">
              Hold light. <br />
              <span className="italic text-[#b87760]">Let skin keep it.</span>
            </h2>

            <p className="text-xs font-mono text-[#b87760] uppercase tracking-wider font-bold">
              {heroProduct.name} — {heroProduct.subtitle}
            </p>

            <p className="text-sm sm:text-base font-sans text-[#252525]/85 leading-relaxed">
              {heroProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#252525]">
              {heroProduct.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#fffdf9] p-2.5 border border-[#252525]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#b87760] flex-shrink-0" />
                  <span className="truncate font-medium">{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <span className="font-serif text-3xl font-normal text-[#252525]">
                {formatMad(heroProduct.price)}
              </span>
              <button
                onClick={() => addToCart(heroProduct)}
                className="bg-[#252525] hover:bg-[#1c1c1c] text-white px-8 py-4 font-mono text-xs tracking-widest uppercase font-bold transition-all shadow-md flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#b87760]" /> Add to cart — {formatMad(heroProduct.price)}
              </button>
              <button
                onClick={() => setQuickViewProduct(heroProduct)}
                className="p-4 border border-[#252525]/30 hover:bg-[#252525]/5 text-[#252525] transition-colors"
                title="Quick View Details"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MOROCCAN BOTANICAL RITUALS SECTION */}
      <RitualsSection onDiscoverCategory={() => {}} />

      {/* 5. HIGH-TICKET EXTRAIT DE PARFUM GALLERY */}
      {fragranceProducts.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-[#1c1c1c] text-white border-b border-white/10">
          <div className="max-w-[1400px] mx-auto space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/15 pb-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold block">
                  Olfactory Artistry · High-Ticket Collection
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
                  Extrait de Parfum Gallery
                </h2>
              </div>
              <Link
                href="/shop?category=Fragrance"
                className="text-xs font-mono uppercase tracking-widest text-[#b87760] hover:underline font-bold"
              >
                Explore All Fragrances →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {fragranceProducts.map((frag) => {
                // Olfactory Pyramid Notes for high-ticket experience
                const olfactoryNotes: Record<string, string> = {
                  'medina-night-parfum': 'Top: Moroccan Neroli · Heart: Golden Amber & Iris · Base: Atlas Cedarwood & Smoked Oud',
                  'majorelle-parfum': 'Top: Sunlit Bergamot · Heart: Orange Blossom · Base: White Musk & Cedar',
                  'rose-kelaa-parfum': 'Top: Pink Pepper & Petals · Heart: Damask Rose Absolute · Base: Bourbon Vanilla & Sandalwood'
                };

                return (
                  <div
                    key={frag.id}
                    className="bg-[#252525] p-6 border border-white/10 space-y-4 hover:border-white/30 transition-all group flex flex-col justify-between"
                  >
                    <Link
                      href={`/product/${frag.id}`}
                      className="aspect-square bg-[#1c1c1c] p-6 flex items-center justify-center border border-white/10 overflow-hidden relative block"
                    >
                      <span className="absolute top-3 left-3 bg-[#b87760] text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 z-10 font-bold">
                        30% Extrait Concentration
                      </span>
                      <img
                        src={frag.image}
                        alt={frag.name}
                        className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[#b87760] uppercase tracking-wider block font-bold">
                        {frag.collection} — {frag.size}
                      </span>
                      <Link
                        href={`/product/${frag.id}`}
                        className="font-serif text-xl font-normal text-white group-hover:underline block"
                      >
                        {frag.name}
                      </Link>
                      
                      {/* Olfactory Notes Breakdown */}
                      <p className="text-[11px] font-mono text-white/60 bg-[#1c1c1c] p-2.5 border border-white/10">
                        {olfactoryNotes[frag.id] || frag.subtitle}
                      </p>

                      <span className="font-serif text-xl font-bold text-[#b87760] block pt-1">
                        {formatMad(frag.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(frag)}
                      className="w-full py-3.5 bg-white text-[#252525] hover:bg-[#fffdf9] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#b87760]" /> Add Extrait Scent
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. ROYAL GIFT BOXES & DELUXE PRESENTATION */}
      {giftSets.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-[#f5f3ed] border-b border-[#252525]/15">
          <div className="max-w-[1400px] mx-auto space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#252525]/20 pb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold block">
                  Deluxe Presentation · High-Ticket Gifting
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#252525] font-normal">
                  The Royal Gift Box Selection
                </h2>
              </div>
              <Link
                href="/shop?category=Gift%20Sets"
                className="text-xs font-mono uppercase tracking-widest text-[#252525] hover:underline font-bold"
              >
                View All Gift Sets →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {giftSets.map((box) => (
                <div
                  key={box.id}
                  className="bg-[#fffdf9] p-6 border border-[#252525]/15 space-y-4 hover:border-[#252525]/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <Link
                    href={`/product/${box.id}`}
                    className="aspect-square bg-[#f5f3ed] p-6 flex items-center justify-center border border-[#252525]/10 overflow-hidden relative block"
                  >
                    {box.badge && (
                      <span className="absolute top-3 left-3 bg-[#252525] text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 font-bold z-10">
                        {box.badge}
                      </span>
                    )}
                    <img
                      src={box.image}
                      alt={box.name}
                      className="max-h-52 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#b87760] uppercase tracking-wider block font-bold">
                      {box.size}
                    </span>
                    <Link
                      href={`/product/${box.id}`}
                      className="font-serif text-xl font-normal text-[#252525] group-hover:underline block"
                    >
                      {box.name}
                    </Link>
                    <p className="text-xs font-sans text-[#252525]/75 line-clamp-2">
                      {box.description}
                    </p>
                    
                    <div className="flex items-baseline gap-2 pt-1">
                      {box.originalPrice && (
                        <span className="text-xs font-mono text-[#252525]/40 line-through">
                          {formatMad(box.originalPrice)}
                        </span>
                      )}
                      <span className="font-serif text-xl font-bold text-[#252525]">
                        {formatMad(box.price)}
                      </span>
                      {box.originalPrice && (
                        <span className="text-[10px] font-mono bg-[#b87760]/10 text-[#b87760] px-2 py-0.5 font-bold ml-auto">
                          SAVE {box.originalPrice - box.price} MAD
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(box)}
                    className="w-full py-3.5 bg-[#252525] hover:bg-[#1c1c1c] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#b87760]" /> Add Gift Box to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. SIGNATURE CATALOG GRID WITH INTERACTIVE CATEGORY TABS */}
      <section className="py-24 px-6 lg:px-12 bg-[#fffdf9] border-b border-[#252525]/15">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold block">
              Curated Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252525] font-normal">
              The Gaouāher Signature Catalog
            </h2>
            <p className="text-xs font-mono text-[#252525]/60">
              Essential formulas for a ritual that is entirely your own.
            </p>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: 'All', label: 'All Signature' },
                { id: 'Oils', label: 'Pure Oils & Serums' },
                { id: 'Face', label: 'Face Care' },
                { id: 'Fragrance', label: 'Extrait Scent' },
                { id: 'Gifts', label: 'Royal Gift Sets' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryTab(tab.id)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all border ${
                    activeCategoryTab === tab.id
                      ? 'bg-[#252525] text-white border-[#252525] font-bold'
                      : 'bg-transparent text-[#252525]/70 border-[#252525]/20 hover:border-[#252525]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#fffdf9] rounded-none p-5 border border-[#252525]/15 hover:border-[#252525]/50 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:shadow-md relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 z-10 p-2 border transition-colors ${
                    wishlist.includes(product.id)
                      ? 'bg-[#b87760] text-white border-[#b87760]'
                      : 'bg-white/80 text-[#252525] border-[#252525]/15 hover:bg-white'
                  }`}
                  aria-label="Save product"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Image */}
                <Link
                  href={`/product/${product.id}`}
                  className="aspect-square bg-[#f5f3ed] p-4 flex items-center justify-center cursor-pointer overflow-hidden relative block border border-[#252525]/10"
                >
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#252525] text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 z-10 font-bold">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#b87760] uppercase font-bold">
                    <span>{product.category}</span>
                    <span className="text-[#252525]/50">{product.size}</span>
                  </div>

                  <Link
                    href={`/product/${product.id}`}
                    className="font-serif text-lg font-normal text-[#252525] group-hover:underline cursor-pointer leading-snug line-clamp-1 block"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-center gap-1 text-xs font-mono text-[#252525]/70 pt-1">
                    <div className="flex text-[#252525]">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="font-bold text-[#252525]">{product.rating}</span>
                    <span className="text-[#252525]/40">({product.reviewCount})</span>
                  </div>

                  <div className="font-serif text-base font-bold text-[#252525] pt-1">
                    {formatMad(product.price)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 py-2.5 bg-[#252525] hover:bg-[#1c1c1c] text-white font-mono text-xs tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#b87760]" /> Add to cart
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="px-3 py-2.5 border border-[#252525]/20 hover:bg-[#252525]/5 text-[#252525] transition-colors"
                    title="Quick View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GAOUĀHER CRAFTSMANSHIP & PROVENANCE MAP (WHY GAOUĀHER IS HIGH-TICKET) */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5f3ed] border-b border-[#252525]/15">
        <div className="max-w-[1400px] mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold block">
              Authentic Moroccan Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#252525] font-normal">
              Why Gaouāher is Built for Connoisseurs.
            </h2>
            <p className="text-xs font-mono text-[#252525]/70">
              We decline synthetic shortcuts, mass plastic bottling, and cheap filler oils.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#fffdf9] p-8 border border-[#252525]/15 space-y-3">
              <Gem className="w-6 h-6 text-[#b87760]" />
              <h3 className="font-serif text-lg font-normal text-[#252525]">Female Berber Cooperatives</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                Empowering women harvesters in the Souss Valley through direct ethical fair-trade sourcing partnerships.
              </p>
            </div>

            <div className="bg-[#fffdf9] p-8 border border-[#252525]/15 space-y-3">
              <Flame className="w-6 h-6 text-[#b87760]" />
              <h3 className="font-serif text-lg font-normal text-[#252525]">Copper Alembic Distillation</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                Traditional micro-batch steam extraction preserves volatile terpenes and delicate botanical active molecules.
              </p>
            </div>

            <div className="bg-[#fffdf9] p-8 border border-[#252525]/15 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#b87760]" />
              <h3 className="font-serif text-lg font-normal text-[#252525]">Miron Violet Glass Safeguard</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                Bottled in light-blocking dark glass to shield pure botanical oils from UV degradation and rancidity.
              </p>
            </div>

            <div className="bg-[#fffdf9] p-8 border border-[#252525]/15 space-y-3">
              <Truck className="w-6 h-6 text-[#b87760]" />
              <h3 className="font-serif text-lg font-normal text-[#252525]">White-Glove Morocco Delivery</h3>
              <p className="text-xs font-sans text-[#252525]/75 leading-relaxed">
                Rapid 24-48h nationwide delivery across Casablanca, Rabat, Marrakech, Tangier & all Moroccan cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. VERIFIED CUSTOMER REVIEWS & PRESS CITATIONS */}
      <ReviewsSection />

      {/* 10. PRIVATE RITUAL CONSULTATION */}
      <section className="bg-[#1a1917] text-white px-6 lg:px-12 py-20 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#c39b77]">The ritual desk</span>
            <h2 className="font-cosmetic text-4xl sm:text-5xl lg:text-6xl leading-[0.96] max-w-2xl">
              A considered routine begins with a conversation.
            </h2>
          </div>
          <div className="lg:col-span-5 border-l border-white/15 lg:pl-10 space-y-6">
            <p className="text-sm leading-7 text-white/70 max-w-md">
              Tell us how your skin, hair, or senses are feeling. We will point you toward a ritual that fits—without a shelf full of unnecessary steps.
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-3 border border-[#c39b77] px-6 py-3.5 text-[11px] font-mono font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#c39b77] hover:text-[#1a1917]"
            >
              Begin a private consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. LUXURY SERVICE GUARANTEE STRIP */}
      <section className="py-16 px-6 lg:px-12 bg-[#fffdf9] border-b border-[#252525]/15">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-mono">
          <div className="p-6 bg-[#f5f3ed] border border-[#252525]/10 space-y-2">
            <Truck className="w-6 h-6 text-[#b87760] mx-auto" />
            <h4 className="font-bold text-[#252525] text-sm">24-48h Morocco Express</h4>
            <p className="text-[#252525]/70 text-[11px]">Rapid nationwide door delivery to all cities.</p>
          </div>

          <div className="p-6 bg-[#f5f3ed] border border-[#252525]/10 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#b87760] mx-auto" />
            <h4 className="font-bold text-[#252525] text-sm">Paiement à la Livraison</h4>
            <p className="text-[#252525]/70 text-[11px]">Pay securely with Cash on Delivery at your doorstep.</p>
          </div>

          <div className="p-6 bg-[#f5f3ed] border border-[#252525]/10 space-y-2">
            <Award className="w-6 h-6 text-[#b87760] mx-auto" />
            <h4 className="font-bold text-[#252525] text-sm">100% Organic Sourcing</h4>
            <p className="text-[#252525]/70 text-[11px]">Pure wild harvest botanicals bio-certified.</p>
          </div>

          <div className="p-6 bg-[#f5f3ed] border border-[#252525]/10 space-y-2">
            <Sparkles className="w-6 h-6 text-[#b87760] mx-auto" />
            <h4 className="font-bold text-[#252525] text-sm">Luxury Sample Gift</h4>
            <p className="text-[#252525]/70 text-[11px]">Complimentary rose mist sample with orders over 500 MAD.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
