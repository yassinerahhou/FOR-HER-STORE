'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatMad } from '@/lib/products';
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Casablanca',
    address: '',
    paymentMethod: 'cod',
  });

  const discount = promoCode.trim().toUpperCase() === 'GAOUAHER10' ? Math.round(cartTotal * 0.1) : 0;
  const delivery = cartTotal >= 500 ? 0 : 40;
  const total = Math.max(0, cartTotal - discount + delivery);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const ref = `GAO-${Math.floor(100000 + Math.random() * 900000)}`;
    const items = cart.map(({ product, quantity }) => `- ${product.name} × ${quantity}: ${formatMad(product.price * quantity)}`).join('\n');
    const body = [`Order reference: ${ref}`, '', `Customer: ${formData.fullName}`, `Email: ${formData.email}`, `Phone: ${formData.phone}`, `City: ${formData.city}`, `Address: ${formData.address}`, '', 'Items:', items, '', `Subtotal: ${formatMad(cartTotal)}`, `Discount: ${formatMad(discount)}`, `Delivery: ${delivery === 0 ? 'Complimentary' : formatMad(delivery)}`, `Total: ${formatMad(total)}`, 'Payment: Cash on Delivery'].join('\n');
    window.location.href = `mailto:concierge@gaouaher.ma?subject=${encodeURIComponent(`New Gaouaher COD order ${ref}`)}&body=${encodeURIComponent(body)}`;
    setOrderRef(ref);
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="py-20 px-6 max-w-xl mx-auto text-center space-y-6 bg-[#fffdf9] text-[#252525]">
        <div className="bg-[#fffdf9] p-8 sm:p-12 rounded-none border border-[#252525]/20 shadow-lg space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 bg-[#f5f3ed] rounded-full flex items-center justify-center mx-auto text-[#b87760]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] block font-bold">
            Order request #{orderRef}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#252525] font-normal leading-tight">
            Your order request is ready to send.
          </h1>

          <p className="text-sm font-sans text-[#252525]/80 leading-relaxed">
            We have received your order details for <strong>{formData.fullName}</strong>. Our logistics laboratory in Casablanca is hand-packaging your products with signature GAOUĀHER botanical tissue paper.
          </p>

          <div className="p-4 bg-[#f5f3ed] rounded-none border border-[#252525]/15 text-xs font-mono text-[#252525] space-y-1 text-left">
            <p>📍 Delivery City: <strong>{formData.city}</strong></p>
            <p>💵 Payment: <strong>{formData.paymentMethod === 'cod' ? 'Cash on Delivery (Paiement à la Livraison)' : 'Credit Card'}</strong></p>
            <p>🚚 Expected Delivery: <strong>Within 24–48 Hours</strong></p>
          </div>

          <Link
            href="/"
            className="inline-block bg-[#252525] text-white px-8 py-4 rounded-none text-xs font-mono uppercase tracking-widest font-bold shadow-md"
          >
            Return to Home →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 lg:px-12 max-w-5xl mx-auto space-y-8 bg-[#fffdf9] text-[#252525]">
      
      <div className="space-y-1 border-b border-[#252525]/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#b87760] uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
              <span>Morocco Cash on Delivery checkout</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">Secure Checkout</h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-[#fffdf9] rounded-none p-8 border border-[#252525]/15 space-y-4 max-w-md mx-auto">
          <h2 className="font-serif text-2xl text-[#252525]">Your bag is currently empty</h2>
          <p className="text-xs font-mono text-[#252525]/60">
            Please add products to your bag before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#252525] text-white px-6 py-3 rounded-none text-xs font-mono uppercase tracking-widest"
          >
            Discover Products →
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-[#fffdf9] p-8 rounded-none border border-[#252525]/15 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-normal text-[#252525]">Delivery Information</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="fullNameInput" className="text-xs font-mono text-[#252525]/70 uppercase block">Full Name *</label>
                <input
                  id="fullNameInput"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Laila Benali"
                  className="w-full p-3 rounded-none border border-[#252525]/20 text-sm focus:outline-none focus:border-[#b87760] bg-[#fffdf9]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="emailInput" className="text-xs font-mono text-[#252525]/70 uppercase block">Email Address *</label>
                  <input
                    id="emailInput"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="laila@example.com"
                    className="w-full p-3 rounded-none border border-[#252525]/20 text-sm focus:outline-none focus:border-[#b87760] bg-[#fffdf9]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phoneInput" className="text-xs font-mono text-[#252525]/70 uppercase block">Phone Number *</label>
                  <input
                    id="phoneInput"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 600 000 000"
                    className="w-full p-3 rounded-none border border-[#252525]/20 text-sm focus:outline-none focus:border-[#b87760] bg-[#fffdf9]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="citySelect" className="text-xs font-mono text-[#252525]/70 uppercase block">City in Morocco *</label>
                  <select
                    id="citySelect"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 rounded-none border border-[#252525]/20 text-sm focus:outline-none focus:border-[#b87760] bg-[#fffdf9]"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Fez">Fez</option>
                    <option value="Meknes">Meknes</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Tetouan">Tetouan</option>
                    <option value="Other">Other City in Morocco</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="addressInput" className="text-xs font-mono text-[#252525]/70 uppercase block">Delivery Address *</label>
                  <input
                    id="addressInput"
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Boulevard d'Anfa, N° 12"
                    className="w-full p-3 rounded-none border border-[#252525]/20 text-sm focus:outline-none focus:border-[#b87760] bg-[#fffdf9]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-4 border-t border-[#252525]/10">
                <span className="text-xs font-mono text-[#252525]/70 uppercase block font-bold">Payment Method</span>
                
                <label className="p-4 rounded-none border border-[#b87760] bg-[#f5f3ed] flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="pm"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    />
                    <div>
                      <span className="font-bold text-sm text-[#252525]">Cash on Delivery (Paiement à la Livraison)</span>
                      <span className="text-xs text-[#252525]/60 block">Pay cash to courier upon receiving your package</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#b87760] font-bold">POPULAR</span>
                </label>

                <p className="text-xs text-[#252525]/60">Card payments are not collected on this website.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#252525] hover:bg-[#1c1c1c] text-white py-4 rounded-none font-mono text-xs tracking-widest uppercase font-bold transition-all shadow-md mt-6"
              >
                Complete Order — {formatMad(cartTotal)}
              </button>
            </form>
          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f5f3ed] p-6 rounded-none border border-[#252525]/15 space-y-4 shadow-sm">
              <h3 className="font-serif text-xl font-normal text-[#252525]">Order Summary</h3>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#252525] block">{product.name}</span>
                      <span className="text-[#252525]/60 font-mono">Qty: {quantity} × {formatMad(product.price)}</span>
                    </div>
                    <span className="font-mono font-bold">{formatMad(product.price * quantity)}</span>
                  </div>
                ))}
              </div>

              <hr className="border-[#252525]/10" />

              <div className="space-y-2">
                <label htmlFor="promoCode" className="text-xs font-mono uppercase text-[#252525]/70">Promo code</label>
                <input id="promoCode" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="GAOUAHER10" className="w-full border border-[#252525]/20 bg-white px-3 py-2 text-sm uppercase focus:outline-none focus:border-[#b87760]" />
                {promoCode && discount === 0 && <p className="text-xs text-[#b87760]">This code is not recognised.</p>}
                {discount > 0 && <p className="text-xs text-[#b87760]">GAOUAHER10 applied: 10% off.</p>}
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatMad(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery in Morocco</span>
                  <span className="text-[#b87760] font-bold">{delivery === 0 ? 'Complimentary' : formatMad(delivery)}</span>
                </div>
                {discount > 0 && <div className="flex justify-between"><span>Gaouaher Circle discount</span><span className="text-[#b87760] font-bold">−{formatMad(discount)}</span></div>}
                <div className="flex justify-between text-base font-serif font-bold text-[#252525] pt-2 border-t border-[#252525]/10">
                  <span>Total</span>
                  <span>{formatMad(total)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
