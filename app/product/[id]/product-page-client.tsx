"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { products, formatMad } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Check,
  Truck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight,
  Droplets,
  Leaf,
  ThumbsUp,
  RefreshCw,
  Eye,
  CheckCircle2,
} from "lucide-react";

export default function ProductPage({ id }: { id: string }) {
  const resolvedParams = { id };
  const product = products.find((p) => p.id === resolvedParams.id);

  // Instant scroll to top when product opens so title is immediately visible
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [resolvedParams.id]);

  if (!product) {
    return (
      <div className="py-24 px-6 text-center space-y-4 max-w-md mx-auto bg-[#fffdf9] text-[#252525]">
        <h1 className="font-serif text-3xl font-normal text-[#252525]">
          Formula Not Found
        </h1>
        <p className="text-xs font-mono text-[#252525]/60">
          The requested botanical formula could not be located in our archives.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#252525] text-white px-6 py-3 rounded-none text-xs font-mono uppercase tracking-widest"
        >
          Explore Catalog →
        </Link>
      </div>
    );
  }

  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } =
    useCart();
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<
    "ingredients" | "howTo" | "shipping" | null
  >("ingredients");

  const isSaved = wishlist.includes(product.id);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  // Routine pairings: same category + cross-category complementary products
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.isFeatured),
    )
    .slice(0, 4);

  // Sample verified reviews tailored for this product
  const reviews = [
    {
      id: "rev-1",
      author: "Fatima-Zohra M.",
      location: "Casablanca",
      rating: 5,
      date: "2 weeks ago",
      title: "Transformed my skin barrier completely",
      comment: `I have been using ${product.name} daily for three weeks. The texture is absolute perfection—absorbs so quickly and leaves the skin feeling velvety soft all day without oily sheen. Exceptional luxury quality!`,
      verified: true,
      helpfulCount: 34,
    },
    {
      id: "rev-2",
      author: "Soraya K.",
      location: "Marrakech",
      rating: 5,
      date: "1 month ago",
      title: "Authentic Moroccan botanical perfection",
      comment: `The fragrance and formula are divine. You can tell it uses genuine high-potency ingredients. Order arrived in 24 hours in Rabat with Cash on Delivery. Will reorder again!`,
      verified: true,
      helpfulCount: 28,
    },
    {
      id: "rev-3",
      author: "Kenza B.",
      location: "Rabat",
      rating: 5,
      date: "1 month ago",
      title: "Worth every single DIRHAM",
      comment: `As someone with sensitive skin, finding a formula this soothing is rare. My skin has a subtle glow that I haven't seen in years. Truly a staple in my morning ritual.`,
      verified: true,
      helpfulCount: 19,
    },
  ];

  return (
    <div className="py-4 sm:py-8 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto space-y-16 pb-28 lg:pb-16 bg-[#fffdf9] text-[#252525]">
      {/* 1. Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#b87760] uppercase tracking-wider">
        <Link href="/" className="hover:text-[#252525] transition-colors">
          Maison
        </Link>
        <ChevronRight className="w-3 h-3 text-[#252525]/40" />
        <Link href="/shop" className="hover:text-[#252525] transition-colors">
          Catalog
        </Link>
        <ChevronRight className="w-3 h-3 text-[#252525]/40" />
        <Link
          href={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#252525] transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-[#252525]/40" />
        <span className="text-[#252525] font-bold truncate max-w-[180px] sm:max-w-none">
          {product.name}
        </span>
      </div>

      {/* 2. Main Product Grid - Showcase & Immediate Buy Card */}
      <div className="grid lg:grid-cols-12 gap-10 items-start border-b border-[#252525]/10 pb-16">
        {/* Left Column: Gallery Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative bg-[#f5f3ed] p-8 sm:p-12 rounded-none border border-[#252525]/15 flex items-center justify-center min-h-[340px] sm:min-h-[440px]">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#252525] text-white text-[9.5px] font-mono tracking-widest uppercase px-3 py-1 rounded-none border border-white/20 z-10 font-bold">
                {product.badge}
              </span>
            )}

            <span className="absolute top-4 right-4 bg-[#fffdf9]/90 backdrop-blur text-[#252525] text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 border border-[#252525]/10 z-10">
              {product.size}
            </span>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[340px] sm:max-h-[400px] w-auto object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Sourcing & Quality Guarantee Bar under Image */}
          <div className="grid grid-cols-3 gap-3 text-center text-[10px] font-mono text-[#252525]/75">
            <div className="p-2.5 bg-[#f5f3ed] border border-[#252525]/10 flex items-center justify-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-[#b87760]" />
              <span>Cold-Pressed Extraction</span>
            </div>
            <div className="p-2.5 bg-[#f5f3ed] border border-[#252525]/10 flex items-center justify-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#b87760]" />
              <span>100% Vegan & Bio</span>
            </div>
            <div className="p-2.5 bg-[#f5f3ed] border border-[#252525]/10 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b87760]" />
              <span>Dermatologist Tested</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Meta & High-Converting Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-[#b87760]">
              <span className="uppercase tracking-widest font-bold">
                {product.category}
              </span>
              <span className="text-[#252525]/60 font-medium">
                {product.collection}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#252525] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs font-mono text-[#b87760] font-bold tracking-wide uppercase">
              {product.subtitle}
            </p>
          </div>

          {/* Rating Summary & Pricing Header */}
          <div className="flex items-center justify-between py-3 border-y border-[#252525]/15">
            <div className="flex items-center gap-2 text-xs font-mono">
              <div className="flex text-[#252525]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current text-[#252525]"
                  />
                ))}
              </div>
              <span className="font-bold text-[#252525] text-sm">
                {product.rating}
              </span>
              <span className="text-[#252525]/60 text-[11px]">
                ({product.reviewCount} verified reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              {product.originalPrice && (
                <span className="text-xs font-mono text-[#252525]/40 line-through">
                  {formatMad(product.originalPrice)}
                </span>
              )}
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#252525]">
                {formatMad(product.price)}
              </span>
            </div>
          </div>

          {/* Key Formula Benefits Grid */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#252525]/60 font-bold block">
              Proven Clinical Benefits
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-sans text-[#252525]">
              {product.benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[#f5f3ed] p-2.5 border border-[#252525]/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#b87760] flex-shrink-0" />
                  <span className="truncate text-xs text-[#252525]/90 font-medium">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DUAL ACTION BUY BUTTONS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 px-6 rounded-none font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                  added
                    ? "bg-[#b87760] text-white"
                    : "bg-[#252525] hover:bg-[#1c1c1c] text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" /> Added to cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#b87760]" /> Add to
                    cart — {formatMad(product.price)}
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-none border border-[#252525]/20 transition-colors ${
                  isSaved
                    ? "bg-[#b87760]/20 text-[#b87760] border-[#b87760]"
                    : "hover:bg-[#252525]/5 text-[#252525]"
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Direct Instant Checkout Action */}
            <Link
              href="/checkout"
              onClick={() => addToCart(product)}
              className="w-full py-3.5 bg-[#b87760] hover:bg-[#a36550] text-white rounded-none font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Instant Checkout with Cash on Delivery{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#252525]/75 pt-1">
            <div className="p-2 bg-[#f5f3ed] border border-[#252525]/10 flex items-center justify-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#b87760]" />
              <span>24-48h Morocco Express</span>
            </div>
            <div className="p-2 bg-[#f5f3ed] border border-[#252525]/10 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b87760]" />
              <span>Paiement à la livraison</span>
            </div>
            <div className="p-2 bg-[#f5f3ed] border border-[#252525]/10 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#b87760]" />
              <span>100% Organic Origin</span>
            </div>
          </div>

          {/* Mobile-First Luxury Expandable Accordions */}
          <div className="pt-4 space-y-2 border-t border-[#252525]/15">
            {/* 1. Key Active Ingredients Panel */}
            <div className="border border-[#252525]/15 bg-[#fffdf9]">
              <button
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === "ingredients" ? null : "ingredients",
                  )
                }
                className="w-full p-3.5 flex items-center justify-between text-left text-xs font-mono text-[#252525] font-bold hover:bg-[#f5f3ed] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#b87760]" />
                  <span>Key Active Ingredients & Formula</span>
                </div>
                {openAccordion === "ingredients" ? (
                  <ChevronUp className="w-4 h-4 text-[#252525]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#252525]/60" />
                )}
              </button>
              {openAccordion === "ingredients" && (
                <div className="p-4 bg-[#f5f3ed] border-t border-[#252525]/10 space-y-2 text-xs font-sans text-[#252525]/85">
                  <p className="italic text-[#252525]/70 text-xs">
                    Sensory Texture: {product.texture}
                  </p>
                  <p className="font-mono text-[11px] text-[#252525] leading-relaxed font-medium">
                    Full INCI Breakdown: {product.ingredients.join(" · ")}
                  </p>
                </div>
              )}
            </div>

            {/* 2. Ritual Application Guide Panel */}
            <div className="border border-[#252525]/15 bg-[#fffdf9]">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === "howTo" ? null : "howTo")
                }
                className="w-full p-3.5 flex items-center justify-between text-left text-xs font-mono text-[#252525] font-bold hover:bg-[#f5f3ed] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#b87760]" />
                  <span>Ritual Application Guide</span>
                </div>
                {openAccordion === "howTo" ? (
                  <ChevronUp className="w-4 h-4 text-[#252525]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#252525]/60" />
                )}
              </button>
              {openAccordion === "howTo" && (
                <div className="p-4 bg-[#f5f3ed] border-t border-[#252525]/10 text-xs font-sans text-[#252525]/85 leading-relaxed">
                  <p>{product.howTo}</p>
                </div>
              )}
            </div>

            {/* 3. Delivery & Guarantee Panel */}
            <div className="border border-[#252525]/15 bg-[#fffdf9]">
              <button
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === "shipping" ? null : "shipping",
                  )
                }
                className="w-full p-3.5 flex items-center justify-between text-left text-xs font-mono text-[#252525] font-bold hover:bg-[#f5f3ed] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#b87760]" />
                  <span>Delivery & Guarantee (Cash on Delivery)</span>
                </div>
                {openAccordion === "shipping" ? (
                  <ChevronUp className="w-4 h-4 text-[#252525]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#252525]/60" />
                )}
              </button>
              {openAccordion === "shipping" && (
                <div className="p-4 bg-[#f5f3ed] border-t border-[#252525]/10 space-y-1.5 text-xs font-mono text-[#252525]">
                  <p>
                    🚚 Morocco Express Shipping: Delivered within 24 to 48 hours
                    in all major cities.
                  </p>
                  <p>
                    💵 Paiement à la livraison (Cash on Delivery) available
                    nationwide.
                  </p>
                  <p>✨ Complimentary delivery on all orders over 500 MAD.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Dedicated Editorial Section: Formulation Story & Botanical Philosophy */}
      <div className="space-y-8 max-w-4xl mx-auto py-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold">
            The Science of Moroccan Botanicals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#252525] font-normal">
            Formulation & Craftsmanship
          </h2>
          <p className="text-base text-[#252525]/80 font-sans leading-relaxed max-w-2xl mx-auto">
            {product.description}
          </p>
        </div>

        {/* 3 Key Botanical Ingredient Feature Cards */}
        <div className="grid sm:grid-cols-3 gap-6 pt-4">
          {product.ingredients.slice(0, 3).map((ing, i) => (
            <div
              key={i}
              className="bg-[#f5f3ed] p-5 border border-[#252525]/15 space-y-2 text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#252525] text-[#b87760] flex items-center justify-center mx-auto text-xs font-mono font-bold">
                0{i + 1}
              </div>
              <h3 className="font-serif text-sm font-bold text-[#252525]">
                {ing}
              </h3>
              <p className="text-[11px] font-sans text-[#252525]/70">
                Ethically harvested at peak potency to lock in active
                antioxidants and essential lipids.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Dedicated 1-2-3 Ritual Application Steps */}
      <div className="bg-[#252525] text-white p-8 sm:p-12 space-y-8 shadow-xl">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold">
            Daily Recommended Ritual
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            How to Apply for Maximum Potency
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-xs font-sans">
          <div className="bg-[#1c1c1c] p-6 border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#b87760] font-bold block">
              STEP 01 / PREPARE
            </span>
            <h4 className="font-serif text-base font-normal text-white">
              Cleanse & Tone
            </h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Start with thoroughly cleansed skin. Mist with Damask Rose Cloud
              Essence to prepare skin porosity.
            </p>
          </div>

          <div className="bg-[#1c1c1c] p-6 border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#b87760] font-bold block">
              STEP 02 / DISPENSE
            </span>
            <h4 className="font-serif text-base font-normal text-white">
              Warm & Activate
            </h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              {product.howTo}
            </p>
          </div>

          <div className="bg-[#1c1c1c] p-6 border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#b87760] font-bold block">
              STEP 03 / SEAL
            </span>
            <h4 className="font-serif text-base font-normal text-white">
              Lock Hydration
            </h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Follow with your favorite cream or moisturizer. Breathe in the
              subtle natural botanical notes.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Complete Your Ritual (Routine Pairing Suggestions) */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#252525]/10 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] block font-bold">
                Synergistic Pairing
              </span>
              <h2 className="font-serif text-3xl font-normal text-[#252525]">
                Complete Your Daily Ritual
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono uppercase tracking-widest text-[#252525] hover:text-[#b87760] font-bold"
            >
              Explore Full Catalog →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-[#fffdf9] rounded-none p-5 border border-[#252525]/15 hover:border-[#252525]/50 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:shadow-md"
              >
                <div
                  onClick={() => setQuickViewProduct(item)}
                  className="aspect-square rounded-none bg-[#f5f3ed] p-4 flex items-center justify-center cursor-pointer overflow-hidden border border-[#252525]/10 relative"
                >
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-[#252525] text-white text-[8.5px] font-mono tracking-wider uppercase px-2 py-0.5 z-10">
                      {item.badge}
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#b87760] block font-bold">
                    {item.category}
                  </span>
                  <Link
                    href={`/product/${item.id}`}
                    className="font-serif text-base font-normal text-[#252525] group-hover:underline transition-colors block line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <span className="font-serif text-sm font-bold text-[#252525] block">
                    {formatMad(item.price)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full py-2.5 bg-[#252525] text-white rounded-none text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 hover:bg-[#1c1c1c] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#b87760]" /> Quick
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Verified Customer Reviews Breakdown */}
      <div className="pt-8 border-t border-[#252525]/10 space-y-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Rating Summary Box */}
          <div className="lg:col-span-4 bg-[#f5f3ed] p-6 border border-[#252525]/15 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b87760] font-bold block">
              Verified Experience
            </span>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl font-normal text-[#252525]">
                {product.rating}
              </span>
              <div className="space-y-0.5">
                <div className="flex text-[#252525]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-[#252525]"
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#252525]/60">
                  based on {product.reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2 pt-2 text-xs font-mono text-[#252525]/75">
              <div className="flex items-center gap-2">
                <span>5 ★</span>
                <div className="flex-1 bg-[#252525]/10 h-2">
                  <div className="bg-[#252525] h-2 w-[94%]" />
                </div>
                <span>94%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4 ★</span>
                <div className="flex-1 bg-[#252525]/10 h-2">
                  <div className="bg-[#252525] h-2 w-[6%]" />
                </div>
                <span>6%</span>
              </div>
              <div className="flex items-center gap-2 text-[#252525]/30">
                <span>3 ★</span>
                <div className="flex-1 bg-[#252525]/10 h-2">
                  <div className="bg-[#252525] h-2 w-[0%]" />
                </div>
                <span>0%</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-serif text-2xl font-normal text-[#252525]">
              Customer Testimonials
            </h3>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#fffdf9] p-5 border border-[#252525]/15 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-normal text-[#252525]">
                          {rev.author}
                        </span>
                        <span className="text-[10px] font-mono bg-[#252525] text-white px-2 py-0.5 uppercase tracking-wider font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#252525]/50">
                        {rev.location} · {rev.date}
                      </span>
                    </div>

                    <div className="flex text-[#252525]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-current text-[#252525]"
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-[#252525]">
                    {rev.title}
                  </h4>
                  <p className="text-xs font-sans text-[#252525]/85 leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-[#252525]/60">
                    <button className="flex items-center gap-1 hover:text-[#252525] transition-colors">
                      <ThumbsUp className="w-3 h-3 text-[#b87760]" /> Helpful (
                      {rev.helpfulCount})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#252525] text-white p-3 px-4 shadow-2xl border-t border-white/20 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-normal text-white truncate">
            {product.name}
          </h4>
          <span className="font-serif text-xs font-bold text-[#b87760]">
            {formatMad(product.price)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`py-2.5 px-5 rounded-none font-mono text-xs tracking-wider uppercase font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
            added ? "bg-[#b87760] text-white" : "bg-white text-[#252525]"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> Added!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-[#b87760]" /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
