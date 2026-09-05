'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/products';
import { Sparkles, ArrowRight, Sun, Droplets, Mountain, Flower2 } from 'lucide-react';

interface RitualsSectionProps {
  onDiscoverCategory: (cat: Category) => void;
}

export function RitualsSection({ onDiscoverCategory }: RitualsSectionProps) {
  const rituals = [
    {
      icon: Sun,
      title: 'Liquid Gold Argan',
      region: 'Souss Valley · Agadir',
      subtitle: 'Nourishing Lipid Renewal',
      description: 'Extracted from wild UNESCO-protected Argania trees. Rich in natural Vitamin E and Omega-6 to shield skin barrier resilience.',
      cta: 'Explore Argan Formula →',
      tag: 'Lipid Cushion',
      image: '/images/argan_elixir.png',
      productId: 'argan-gold-elixir',
    },
    {
      icon: Flower2,
      title: 'Kelaat Damask Rose',
      region: 'Valley of Roses · Atlas',
      subtitle: 'Pure Hydro-Distillate Light',
      description: 'Hand-harvested at dawn during annual blooming season. Steam-distilled in copper alembics for pure soothing luminosity.',
      cta: 'Explore Rose Essence →',
      tag: 'Petal Infused',
      image: '/images/rose-cloud-essence-photo.png',
      productId: 'rose-cloud-essence',
    },
    {
      icon: Mountain,
      title: 'Atlas Ghassoul Clay',
      region: 'Middle Atlas Subterranean Beds',
      subtitle: 'Volcanic Mineral Purification',
      description: 'Ancient lava beds rich in magnesium and silica. Gently absorbs excess sebum and detoxifies without stripping moisture.',
      cta: 'Explore Ghassoul Mask →',
      tag: 'Subterranean Minerals',
      image: '/images/ghassoul_mask.png',
      productId: 'atlas-ghassoul-mask',
    },
    {
      icon: Droplets,
      title: 'Royal Blue Nila',
      region: 'Sahara Desert Heritage',
      subtitle: 'Complexion Brightening Mineral',
      description: 'A centuries-old Moroccan bridal beauty secret stone powder. Targets stubborn dark spots, unifies skin tone, and illuminates.',
      cta: 'Explore Nila Brightening →',
      tag: 'Sahara Secret',
      image: '/images/hero_gaouaher_banner.png',
      productId: 'nila-brightening-elixir',
    },
  ];

  return (
    <section className="w-full bg-[#fffdf9] text-[#252525] py-24 px-6 lg:px-12 border-t border-b border-[#252525]/15">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Editorial Heading Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#252525]/60 block font-normal">
            FOR HER · MAISON DE BEAUTÉ · BOTANICAL EXCELLENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#252525] font-normal tracking-tight leading-tight">
            Centuries of Botanical Wisdom, <br />
            <span className="italic text-[#b87760]">Elevated into Science.</span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#252525]/80 leading-relaxed max-w-xl mx-auto">
            Gaouāher honors the rich beauty heritage of Morocco. We harvest rare botanicals at their peak potency and fuse them with clinical bio-actives. Tap any formula below to discover its dedicated ritual.
          </p>
        </div>

        {/* 4 Cards Grid - Clickable Direct Links to Product Pages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rituals.map((r, i) => {
            const Icon = r.icon;
            return (
              <Link
                key={i}
                href={`/product/${r.productId}`}
                className="bg-[#fffdf9] p-6 border border-[#252525]/20 hover:border-[#252525] transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-sm hover:shadow-md block"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 bg-[#f5f3ed] border border-[#252525]/20 flex items-center justify-center text-[#252525] group-hover:bg-[#252525] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-[#252525] text-white px-2.5 py-1">
                      {r.tag}
                    </span>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden bg-[#f5f3ed] border border-[#252525]/15">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#b87760] block font-normal">{r.region}</span>
                    <h3 className="font-serif text-xl font-normal text-[#252525] group-hover:underline mt-0.5">
                      {r.title}
                    </h3>
                    <p className="text-xs font-mono text-[#252525]/60 mt-1">{r.subtitle}</p>
                    <p className="text-xs font-sans text-[#252525]/80 leading-relaxed mt-3">
                      {r.description}
                    </p>
                  </div>
                </div>

                <div className="w-full py-3 px-4 bg-[#252525] group-hover:bg-[#1c1c1c] text-xs font-mono tracking-widest uppercase text-white transition-all flex items-center justify-center gap-2 font-normal">
                  {r.cta} <ArrowRight className="w-3.5 h-3.5 text-[#b87760]" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

