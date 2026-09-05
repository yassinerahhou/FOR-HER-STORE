'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatMad } from '@/lib/products';
import { X, Star, Heart, ShoppingBag, Sparkles, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();

  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'howTo' | 'shipping'>('ingredients');

  // Lock background body scroll when quick view modal is active
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSaved = wishlist.includes(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop with Click-to-Dismiss */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-[#252525]/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#fffdf9] text-[#252525] shadow-2xl overflow-y-auto z-10 border border-[#252525]/30 animate-in zoom-in-95 duration-300 my-auto">
        
        {/* ABSOLUTELY POSITIONED HIGH-CONTRAST CLOSE BUTTON (Top Right of entire modal) */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-50 p-2.5 bg-[#252525] hover:bg-[#1c1c1c] text-white transition-all shadow-md border border-white/20 flex items-center justify-center group"
          aria-label="Close product view"
        >
          <X className="w-5 h-5 text-[#b87760] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* 2-Column Grid Layout */}
        <div className="grid md:grid-cols-2 min-h-0">
          
          {/* Left Column: Product Image & Badge */}
          <div className="relative bg-[#f5f3ed] p-6 sm:p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#252525]/15 min-h-[300px] sm:min-h-[420px]">
            {quickViewProduct.badge && (
              <span className="absolute top-4 left-4 bg-[#252525] text-white text-[9px] font-mono tracking-widest uppercase px-3 py-1 font-bold z-10">
                {quickViewProduct.badge}
              </span>
            )}

            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="max-h-[260px] sm:max-h-[360px] w-auto object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Column: Product Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4 pr-10">
              {/* Category & Collection */}
              <div className="flex items-center justify-between text-xs font-mono text-[#b87760]">
                <span className="uppercase tracking-widest font-bold">{quickViewProduct.category}</span>
                <span className="text-[#252525]/50">{quickViewProduct.collection}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#252525] leading-tight">
                  {quickViewProduct.name}
                </h2>
                <p className="text-xs font-mono text-[#252525]/60 mt-1">{quickViewProduct.subtitle}</p>
              </div>

              {/* Rating & Price Row */}
              <div className="space-y-2 pt-2 border-b border-[#252525]/15 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <div className="flex text-[#252525]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#252525]">{quickViewProduct.rating}</span>
                  <span className="text-[#252525]/50">({quickViewProduct.reviewCount} verified reviews)</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl font-bold text-[#252525]">
                    {formatMad(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs font-mono text-[#252525]/40 line-through">
                      {formatMad(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-mono text-[#252525]/60">· {quickViewProduct.size}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm font-sans text-[#252525]/85 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Key Benefits */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-mono text-[#b87760] uppercase tracking-wider block font-bold">Key Benefits</span>
                {quickViewProduct.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#252525]">
                    <Sparkles className="w-3.5 h-3.5 text-[#b87760] flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Specification Tabs */}
              <div className="pt-4 space-y-2">
                <div className="flex border-b border-[#252525]/15 text-xs font-mono overflow-x-auto pb-1 gap-4">
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === 'ingredients' ? 'border-[#b87760] text-[#252525] font-bold' : 'border-transparent text-[#252525]/50'
                    }`}
                  >
                    Key Active Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('howTo')}
                    className={`pb-2 whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === 'howTo' ? 'border-[#b87760] text-[#252525] font-bold' : 'border-transparent text-[#252525]/50'
                    }`}
                  >
                    Ritual Application
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === 'shipping' ? 'border-[#b87760] text-[#252525] font-bold' : 'border-transparent text-[#252525]/50'
                    }`}
                  >
                    Delivery & Guarantee
                  </button>
                </div>

                <div className="text-xs font-sans text-[#252525]/85 pt-2 min-h-[60px]">
                  {activeTab === 'ingredients' && (
                    <div>
                      <p className="italic text-[#252525]/60 mb-1">{quickViewProduct.texture}</p>
                      <p className="font-mono text-[11px] leading-relaxed text-[#252525]/90">
                        {quickViewProduct.ingredients.join(' · ')}
                      </p>
                    </div>
                  )}

                  {activeTab === 'howTo' && (
                    <p className="leading-relaxed">{quickViewProduct.howTo}</p>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-1 text-[11px] font-mono">
                      <p className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#b87760]" /> Morocco Express Delivery: 24–48 hours nationwide.
                      </p>
                      <p className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#b87760]" /> Paiement à la Livraison (Cash on Delivery) available.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#252525]/15">
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 px-4 sm:px-6 font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-[#b87760] text-white'
                    : 'bg-[#252525] hover:bg-[#1c1c1c] text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" /> Added to cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#b87760]" /> Add to cart — {formatMad(quickViewProduct.price)}
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-4 border border-[#252525]/20 transition-colors ${
                  isSaved ? 'bg-[#b87760] text-white border-[#b87760]' : 'hover:bg-[#252525]/5 text-[#252525]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="p-4 border border-[#252525]/30 hover:bg-[#252525]/5 text-[#252525] transition-colors font-mono text-xs flex items-center justify-center"
                title="View Full Product Page"
              >
                <ArrowRight className="w-5 h-5 text-[#b87760]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
