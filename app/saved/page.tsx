'use client';

import React from 'react';
import Link from 'next/link';
import { products, formatMad } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useCart();
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto space-y-8 bg-[#fffdf9] text-[#252525]">
      
      <div className="space-y-2 border-b border-[#252525]/10 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] block">
          Saved Pieces
        </span>
        <h1 className="font-serif text-4xl font-normal text-[#252525]">Your Wishlist ({savedProducts.length})</h1>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 space-y-4 bg-[#fffdf9] rounded-none p-8 border border-[#252525]/15 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-[#b87760]/40 mx-auto" />
          <h2 className="font-serif text-2xl text-[#252525]">Your wishlist is currently empty</h2>
          <p className="text-xs font-mono text-[#252525]/60 max-w-xs mx-auto">
            Explore our luxury collections and tap the heart icon on any product to save it for later.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#252525] text-white px-6 py-3 rounded-none text-xs font-mono uppercase tracking-widest font-bold"
          >
            Explore Catalog →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#fffdf9] rounded-none p-5 border border-[#252525]/15 flex flex-col justify-between space-y-4 relative group hover:shadow-md transition-all"
            >
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-2 rounded-none bg-[#b87760] text-white shadow-sm"
                title="Remove from Wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>

              <Link
                href={`/product/${product.id}`}
                className="aspect-square rounded-none bg-[#f5f3ed] p-4 flex items-center justify-center cursor-pointer overflow-hidden block border border-[#252525]/10"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b87760] block">
                  {product.category}
                </span>
                <Link
                  href={`/product/${product.id}`}
                  className="font-serif text-base font-normal text-[#252525] group-hover:underline block line-clamp-1"
                >
                  {product.name}
                </Link>
                <span className="font-serif text-base font-bold text-[#252525] block">{formatMad(product.price)}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-2.5 bg-[#252525] hover:bg-[#1c1c1c] text-white rounded-none text-xs font-mono uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#b87760]" /> Move to Bag
                </button>
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="px-3 py-2.5 border border-[#252525]/20 hover:bg-[#252525]/5 rounded-none text-[#252525] transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

