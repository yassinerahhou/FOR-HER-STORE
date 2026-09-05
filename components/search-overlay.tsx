'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { products, formatMad } from '@/lib/products';
import { Search, X, Sparkles, ArrowRight, Eye } from 'lucide-react';

export function SearchOverlay() {
  const router = useRouter();
  const { searchOpen, setSearchOpen, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');

  // 1. Hooks must ALWAYS run at the top level unconditionally (Fixes React Rules of Hooks crash)
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  }, [query]);

  // 2. Lock background body scroll when search is open & handle Escape key
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen, setSearchOpen]);

  // 3. Early return ONLY after hooks have been declared
  if (!searchOpen) return null;

  const popularSearches = [
    'Pure Argan',
    'Damask Rose',
    'Atlas Ghassoul',
    'Eau de Parfum',
    'Nila Brightening',
    'Royal Gift Sets',
  ];

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1c1c1c]/95 backdrop-blur-md p-4 sm:p-6 lg:p-12 animate-in fade-in duration-200 text-white">
      <div className="max-w-4xl mx-auto space-y-8 pt-4 sm:pt-8">
        
        {/* Top Header & Search Input */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-4 flex-1">
            <Search className="w-6 h-6 text-[#b87760] flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDownInput}
              placeholder="Search by ingredient, concern, product name, or ritual..."
              className="w-full bg-transparent text-white placeholder-white/40 font-serif text-xl sm:text-3xl focus:outline-none"
            />
          </div>

          <button
            onClick={() => setSearchOpen(false)}
            className="p-2.5 bg-white/10 hover:bg-[#b87760] text-white rounded-none transition-all border border-white/20 ml-4 flex-shrink-0"
            aria-label="Close search overlay"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Popular Search Suggestions */}
        {!query && (
          <div className="space-y-4 pt-4 text-white">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular Ritual Searches</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="bg-[#252525] hover:bg-[#b87760] text-white px-4 py-2.5 rounded-none text-xs font-mono transition-all border border-white/20 hover:border-[#b87760]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-[#b87760]">
              <span>Found {searchResults.length} formula matches</span>
              {searchResults.length > 0 && (
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
                  }}
                  className="hover:underline flex items-center gap-1 text-white"
                >
                  View all in catalog →
                </button>
              )}
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16 text-white/60 font-serif space-y-2">
                <p className="text-2xl">No formulas match &quot;{query}&quot;</p>
                <p className="text-xs font-mono text-[#b87760]">
                  Try searching for &quot;Argan&quot;, &quot;Rose&quot;, &quot;Serum&quot; or &quot;Oud&quot;
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#252525] hover:bg-[#333333] p-4 rounded-none border border-white/10 transition-all flex gap-4 items-center group relative"
                  >
                    <div
                      onClick={() => {
                        setQuickViewProduct(product);
                        setSearchOpen(false);
                      }}
                      className="w-16 h-20 bg-[#f5f3ed] p-1.5 border border-white/10 flex-shrink-0 flex items-center justify-center cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase text-[#b87760] font-bold block truncate">
                        {product.category}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="font-serif text-sm font-normal text-white group-hover:underline leading-snug line-clamp-1 block"
                      >
                        {product.name}
                      </Link>
                      <p className="font-serif text-xs font-bold text-[#b87760]">
                        {formatMad(product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setQuickViewProduct(product);
                        setSearchOpen(false);
                      }}
                      className="p-2 text-white/50 hover:text-white transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
