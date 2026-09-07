'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandMark } from './brand-mark';
import { categories } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Search, Menu, X, Globe } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist, setCartOpen, setSearchOpen, currency, setCurrency } = useCart();
  const [, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-[#fffdf9] border-b border-[#252525]/15">
      
      {/* 1. Top Announcement Bar (Aesop Dark Charcoal Bar) */}
      <div className="bg-[#1a1917] text-white text-[11px] font-mono py-2.5 px-4 text-center tracking-[0.08em] uppercase">
        <span>Complimentary delivery in Morocco · Rose hydrosol sample with orders over 500 MAD</span>
      </div>

      {/* 2. Top Tier Header (Aesop Layout: Stores / Customer Service | Logo | Email / Account / Cart) */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Mobile Menu & Search Controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#252525] hover:opacity-70 transition-opacity"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#252525] hover:opacity-70 transition-opacity"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5 text-[#252525]" />
          </button>
        </div>

        {/* Left Utility Links (Stores / Customer service) */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-sans font-medium text-[#252525]">
          <Link href="/about" className="hover:underline transition-all">
            The House
          </Link>
          <Link href="/help" className="hover:underline transition-all">
            Customer service
          </Link>
          <span className="text-[#252525]/70 pl-3 border-l border-[#252525]/20 font-mono">{currency}</span>
          <div className="hidden">
            <Globe className="w-3.5 h-3.5" />
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as 'MAD' | 'EUR' | 'USD')}
              className="bg-transparent text-[#252525] font-mono text-xs focus:outline-none cursor-pointer"
            >
              <option value="MAD">MAD (MAD)</option>
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>

        {/* Center Aesop-Style Wordmark Logo */}
        <Link href="/" className="transition-transform duration-300 hover:opacity-90">
          <BrandMark variant="full" />
        </Link>

        {/* Right Action Links (Email sign up / Account / My cart) */}
        <div className="flex items-center gap-6 text-xs font-sans text-[#252525]">
          <Link href="/about" className="hidden sm:inline font-medium hover:underline text-[#252525]">
            Our story
          </Link>

          <Link href="/saved" className="hidden sm:flex items-center gap-1 font-medium hover:underline text-[#252525]">
            <span>Account</span>
            {wishlist.length > 0 && (
              <span className="font-mono text-[10px] bg-[#252525] text-white px-1.5 py-0.2 rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag Link */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1.5 font-medium hover:underline text-[#252525]"
          >
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* 3. Bottom Category Navigation Tier (Aesop Sub-nav Row) */}
      <div className="hidden lg:block border-t border-[#252525]/10 bg-[#fffdf9] py-3">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <nav className="flex items-center gap-7 text-xs font-sans font-medium tracking-tight text-[#252525]">
            <Link
              href="/shop"
              prefetch={true}
              className={`hover:underline transition-all ${
                pathname === '/shop' ? 'font-bold underline' : ''
              }`}
            >
              Shop all
            </Link>

            <Link
              href="/shop?collection=Best%20Sellers"
              prefetch={true}
              className="hover:underline transition-all"
            >
              New & Notable
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                prefetch={true}
                className={`hover:underline transition-all ${
                  pathname.includes(encodeURIComponent(cat)) ? 'font-bold underline' : ''
                }`}
              >
                {cat}
              </Link>
            ))}

            <Link
              href="/about"
              prefetch={true}
              className="hover:underline transition-all"
            >
              Library
            </Link>

            <Link
              href="/about"
              prefetch={true}
              className="hover:underline transition-all"
            >
              Experience
            </Link>
          </nav>

          {/* Right Search Input Trigger with Vertical Divider */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-xs font-sans font-medium text-[#252525] hover:opacity-70 pl-6 border-l border-[#252525]/20"
          >
            <Search className="w-3.5 h-3.5 text-[#252525]" />
            <span>Search...</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-[#fffdf9] text-[#252525] z-50 p-6 flex flex-col justify-between overflow-y-auto border-t border-[#252525]/15 animate-in slide-in-from-left duration-300">
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#252525]/15">
              <span className="text-xs font-mono uppercase tracking-widest text-[#252525]/60">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#252525]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-3">
              <Link
                href="/shop"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-[#252525] font-medium"
              >
                Shop all catalog →
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base text-[#252525]/85 hover:text-[#252525] py-1 border-b border-[#252525]/10"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="space-y-2 border-t border-[#252525]/15 pt-4">
              <Link
                href="/about"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#252525] font-medium"
              >
                The House & Story
              </Link>
              <Link
                href="/help"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#252525]/80"
              >
                Morocco Delivery & Care
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-[#252525]/15 text-center flex justify-center">
            <BrandMark variant="compact" />
          </div>
        </div>
      )}
    </header>
  );
}
