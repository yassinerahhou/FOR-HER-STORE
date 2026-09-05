import React from 'react';

interface BrandMarkProps {
  variant?: 'full' | 'compact' | 'light' | 'icon-only' | 'stacked';
  className?: string;
}

export function BrandMark({ variant = 'full', className = '' }: BrandMarkProps) {
  const isLight = variant === 'light';

  return (
    <div className={`brand-mark-container inline-flex items-center justify-center cursor-pointer select-none group ${className}`}>
      {/* Aesop-Inspired Clean Luxury Typographic Wordmark */}
      <div className="flex items-baseline gap-[1px]">
        <span
          className={`font-serif tracking-[0.06em] font-normal leading-none ${
            variant === 'compact' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl md:text-[42px]'
          } ${isLight ? 'text-white' : 'text-[#252525]'} transition-colors group-hover:opacity-80`}
        >
          Gaouāher
        </span>
      </div>
    </div>
  );
}

