'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatMad } from '@/lib/products';
import { Check, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ToastNotification() {
  const { toast, dismissToast, setCartOpen, cartOpen } = useCart();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, dismissToast]);

  if (!toast || cartOpen) return null;

  const { product, message } = toast;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-[#252525] text-white rounded-none shadow-2xl border border-white/20 p-4 animate-in slide-in-from-bottom-6 duration-300">
      <div className="flex items-center gap-4">
        
        {/* Product Thumbnail */}
        <div className="w-16 h-16 rounded-none bg-[#f5f3ed] p-1 flex items-center justify-center flex-shrink-0 border border-white/20">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#b87760] font-medium">
            <Check className="w-3.5 h-3.5 text-[#b87760]" />
            <span>{message}</span>
          </div>

          <h4 className="font-serif text-sm font-normal text-white truncate leading-tight">
            {product.name}
          </h4>

          <p className="text-xs font-mono text-white/70">
            {formatMad(product.price)} · {product.size}
          </p>
        </div>

        {/* Close (X) Button */}
        <button
          onClick={dismissToast}
          className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors self-start"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Action Strip */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <button
          onClick={() => {
            dismissToast();
            setCartOpen(true);
          }}
          className="text-xs font-mono text-[#b87760] hover:underline font-bold flex items-center gap-1.5 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> View Bag & Progress Meter →
        </button>

        <Link
          href="/checkout"
          onClick={dismissToast}
          className="bg-[#b87760] hover:bg-[#a36550] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

