import React from 'react';

interface BrandMarkProps {
  variant?: 'full' | 'compact' | 'light' | 'icon-only' | 'stacked';
  className?: string;
}

export function BrandMark({ variant = 'full', className = '' }: BrandMarkProps) {
  const isLight = variant === 'light';

  return (
    <div className={`brand-mark-container inline-flex items-center justify-center cursor-pointer select-none group ${className}`}>
      {/* Refined Serif Wordmark Matching User's Logo */}
      <div className="flex items-baseline gap-[1px]">
        <span
            className={`tracking-normal font-normal leading-none ${
            variant === 'compact' ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl'
          } ${isLight ? 'text-white' : 'text-[#252525]'} transition-colors group-hover:opacity-80`}
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
        >
          Gaouāher
        </span>
      </div>
    </div>
  );
}
