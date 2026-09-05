'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatMad } from '@/lib/products';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Lock background body scroll when cart drawer is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-[#252525]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#fffdf9] text-[#252525] shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
          
          {/* 1. Drawer Header (Fixed top) */}
          <div className="p-6 border-b border-[#252525]/15 flex items-center justify-between bg-[#fffdf9] flex-shrink-0">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#b87760]" />
              <h2 className="font-serif text-xl font-normal text-[#252525]">Your Shopping Bag</h2>
              <span className="font-mono text-xs text-white bg-[#252525] px-2.5 py-0.5 font-bold">
                {cart.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            {/* Clean Luxury Close Button */}
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 text-[#252525] hover:text-[#b87760] transition-colors"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Progress Meter (Fixed top sub-bar) */}
          <div className="bg-[#252525] text-white p-4 text-xs font-mono border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#b87760]" />
                <span className="text-[11px]">
                  {amountNeeded > 0
                    ? `Add ${formatMad(amountNeeded)} more for FREE Morocco Delivery`
                    : '🎉 Unlocked FREE Morocco Express Shipping'}
                </span>
              </div>
              <span className="text-[#b87760] font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#1c1c1c] h-1.5 overflow-hidden border border-white/15">
              <div
                className="bg-[#b87760] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 3. Scrollable Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#252525]/5 flex items-center justify-center mx-auto text-[#b87760]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-[#252525]">Your bag is currently empty</h3>
                <p className="text-xs font-mono text-[#252525]/60 max-w-xs mx-auto">
                  Explore our luxury botanical formulas and add iconic products to your daily ritual.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-[#252525] text-white hover:bg-[#1c1c1c] px-6 py-3 text-xs font-mono tracking-wider uppercase transition-colors font-bold"
                >
                  Discover Products →
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 pb-6 border-b border-[#252525]/15 items-start"
                >
                  {/* Bottle Image Contain Container */}
                  <div className="w-20 h-24 bg-[#f5f3ed] p-2 border border-[#252525]/15 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#b87760] font-bold truncate">
                        {product.category}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#252525]/40 hover:text-red-700 p-0.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif text-sm font-normal text-[#252525] leading-snug truncate">
                      {product.name}
                    </h4>

                    <p className="text-xs font-mono text-[#252525]/60">{product.size}</p>

                    <div className="font-serif text-sm font-bold text-[#252525] pt-0.5">
                      {formatMad(product.price * quantity)}
                    </div>

                    {/* Compact Tight Quantity Stepper */}
                    <div className="pt-2 flex items-center">
                      <div className="inline-flex items-center border border-[#252525]/20 bg-white">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2.5 py-1 hover:bg-[#252525]/5 text-[#252525] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2.5 py-1 hover:bg-[#252525]/5 text-[#252525] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Drawer Footer / Summary (Pinned at bottom) */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#252525]/15 bg-[#fffdf9] space-y-4 flex-shrink-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#252525]/70 font-mono text-xs">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#252525] font-serif text-sm">{formatMad(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#252525]/70 font-mono text-xs">
                  <span>Morocco Express Delivery</span>
                  <span className="font-bold text-[#252525]">
                    {amountNeeded === 0 ? 'COMPLIMENTARY' : 'Calculated at checkout'}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="w-full bg-[#252525] hover:bg-[#1c1c1c] text-white py-4 font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Checkout ({formatMad(cartTotal)}) <ArrowRight className="w-4 h-4 text-[#b87760]" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#252525]/60 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b87760]" />
                <span>Paiement à la Livraison (Cash on Delivery) Available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
