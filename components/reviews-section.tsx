'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      name: 'Salma El-Mansouri',
      location: 'Casablanca, Morocco',
      rating: 5,
      product: 'Pure Argan Youth Elixir',
      comment: 'I have tried facial oils from Paris and London, but Gaouāher Argan Elixir is in a league of its own. My skin wakes up visibly plumper and glowing. Unbelievable quality!',
      verified: true,
    },
    {
      name: 'Dr. Kenza Benjelloun',
      location: 'Rabat, Morocco',
      rating: 5,
      product: 'Atlas Ghassoul Clay Mask',
      comment: 'As a dermatologist, I appreciate formulations that honor the skin barrier. The Ghassoul mask purifies without stripping. It is now a staple in my weekly skincare routine.',
      verified: true,
    },
    {
      name: 'Amine & Yasmina',
      location: 'Marrakech, Morocco',
      rating: 5,
      product: 'Medina Night EDP & Royal Box',
      comment: 'We purchased the Royal Hammam Box as a gift. The unboxing experience felt like opening a piece of high luxury. Medina Night fragrance is intoxicating!',
      verified: true,
    }
  ];

  const press = [
    { outlet: 'VOGUE BEAUTY', quote: '"Gaouāher redefines Moroccan luxury skincare with unprecedented purity."' },
    { outlet: 'ELLE INTERNATIONAL', quote: '"The Argan Youth Elixir is the botanical beauty secret every editor is talking about."' },
    { outlet: 'HARPER\'S BAZAAR', quote: '"Moroccan heritage botanicals meet high-performance clinical results."' },
  ];

  return (
    <section className="w-full bg-[#fffdf9] text-[#252525] py-24 px-6 lg:px-12 border-b border-[#252525]/15">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#252525]/60 block font-normal">
            Verified Customer Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#252525] font-normal">
            Loved by Connoisseurs Worldwide.
          </h2>
          <div className="flex items-center justify-center gap-2 pt-2 text-sm font-mono">
            <div className="flex text-[#252525]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold">4.96 / 5.0 Rating</span>
            <span className="text-[#252525]/60">· Over 2,400+ Verified 5-Star Reviews</span>
          </div>
        </div>

        {/* Clinical Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#252525] text-white p-8 border border-white/10 text-center">
          <div className="space-y-1">
            <span className="font-serif text-3xl md:text-4xl font-normal text-[#b87760]">98%</span>
            <p className="text-xs font-mono text-white/80">Reported smoother, softer skin texture after 7 days</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-3xl md:text-4xl font-normal text-[#b87760]">100%</span>
            <p className="text-xs font-mono text-white/80">Organic Moroccan cold-pressed botanical extracts</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-3xl md:text-4xl font-normal text-[#b87760]">95%</span>
            <p className="text-xs font-mono text-white/80">Noticed enhanced skin hydration & plump barrier</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-3xl md:text-4xl font-normal text-[#b87760]">24h</span>
            <p className="text-xs font-mono text-white/80">Express delivery across Casablanca, Rabat & Morocco</p>
          </div>
        </div>

        {/* Testimonials Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-[#fffdf9] p-8 border border-[#252525]/15 flex flex-col justify-between space-y-6 relative hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-[#252525]/15 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex text-[#252525]">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-sans text-sm text-[#252525]/85 leading-relaxed italic">
                  &quot;{r.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#252525]/15 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-normal text-[#252525]">{r.name}</h4>
                  <span className="text-[11px] font-mono text-[#252525]/60 block">{r.location}</span>
                  <span className="text-[10px] font-mono text-[#b87760] font-bold">{r.product}</span>
                </div>
                {r.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#252525] bg-[#f5f3ed] px-2 py-1 border border-[#252525]/20 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#b87760]" /> Verified
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Press Feature Strip */}
        <div className="pt-8 border-t border-[#252525]/15">
          <div className="text-center text-xs font-mono uppercase tracking-widest text-[#252525]/60 mb-6">
            Featured In International Press
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {press.map((p, i) => (
              <div key={i} className="p-4 space-y-2 border-r border-[#252525]/10 last:border-r-0">
                <span className="font-mono text-xs tracking-widest font-bold text-[#252525]">{p.outlet}</span>
                <p className="font-serif text-sm italic text-[#252525]/80">{p.quote}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

