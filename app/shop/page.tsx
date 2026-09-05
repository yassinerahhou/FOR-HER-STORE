'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { products, Category, categories, formatMad } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Star, Heart, ShoppingBag, Eye, SlidersHorizontal, Sparkles } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;

  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    categoryParam || 'All'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useCart();

  // Sync category state with searchParams instantly when header or category links are clicked
  React.useEffect(() => {
    setSelectedCategory(categoryParam || 'All');
  }, [categoryParam]);

  const handleCategorySelect = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    if (typeof window !== 'undefined') {
      const url = cat === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`;
      window.history.pushState(null, '', url);
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [selectedCategory, sortBy]);

  return (
    <div className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto space-y-8 bg-[#fffdf9] text-[#252525]">
      
      {/* Header Banner */}
      <div className="space-y-3 border-b border-[#252525]/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#b87760] uppercase tracking-wider">
          <span>The House Catalog</span>
          <span>/</span>
          <span>{selectedCategory}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#252525]">
          Care with <span className="italic text-[#b87760]">Clarity.</span>
        </h1>
        <p className="text-sm font-sans text-[#252525]/70 max-w-xl">
          Explore our complete range of high-performance Moroccan botanicals for skin, face, hair, body, and sensory fragrance.
        </p>
      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#252525]/10 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-4 py-2 rounded-none text-xs font-mono transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#252525] text-white'
                : 'bg-[#fffdf9] border border-[#252525]/15 text-[#252525] hover:border-[#b87760]'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-none text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#252525] text-white'
                  : 'bg-[#fffdf9] border border-[#252525]/15 text-[#252525] hover:border-[#b87760]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <SlidersHorizontal className="w-4 h-4 text-[#b87760]" />
          <span className="text-[#252525]/60">Sort:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-[#fffdf9] border border-[#252525]/15 px-3 py-1.5 rounded-none text-xs font-mono text-[#252525] focus:outline-none focus:border-[#b87760]"
          >
            <option value="featured">Featured First</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#fffdf9] rounded-none p-5 border border-[#252525]/15 hover:border-[#252525]/50 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:shadow-md relative"
          >
            {/* Wishlist Toggle Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 z-10 p-2 rounded-none border transition-colors ${
                wishlist.includes(product.id)
                  ? 'bg-[#b87760] text-white border-[#b87760]'
                  : 'bg-white/80 text-[#252525] border-[#252525]/15 hover:bg-white'
              }`}
              aria-label="Save product"
            >
              <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
            </button>

            {/* Product Thumbnail Image */}
            <Link
              href={`/product/${product.id}`}
              className="aspect-square rounded-none bg-[#f5f3ed] p-4 flex items-center justify-center cursor-pointer overflow-hidden relative block border border-[#252525]/10"
            >
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#252525] text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-none z-10">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Product Meta */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-[#b87760] uppercase">
                <span>{product.category}</span>
                <span>{product.size}</span>
              </div>

              <Link
                href={`/product/${product.id}`}
                className="font-serif text-base font-normal text-[#252525] group-hover:underline transition-colors cursor-pointer leading-snug line-clamp-1 block"
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

              <div className="font-serif text-base font-normal text-[#252525] pt-1">
                {formatMad(product.price)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-2.5 bg-[#252525] hover:bg-[#1c1c1c] text-white rounded-none font-mono text-xs tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#b87760]" /> Add to cart
              </button>
              <button
                onClick={() => setQuickViewProduct(product)}
                className="px-3 py-2.5 border border-[#252525]/20 hover:bg-[#252525]/5 rounded-none text-[#252525] transition-colors"
                title="Quick View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function ShopPage() {
  return (
    <React.Suspense fallback={<div className="py-24 text-center font-mono text-xs text-[#252525]/60">Loading catalog...</div>}>
      <ShopContent />
    </React.Suspense>
  );
}

