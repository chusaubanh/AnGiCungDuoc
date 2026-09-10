import React from 'react';

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`brand-container ${className}`}>
      <div className="brand-symbol-wrap">
        <svg
          className="brand-symbol"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="brandGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="bowlGrad" x1="12" y1="22" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fffbf5" />
            </linearGradient>
            <filter id="brandShadow" x="0" y="2" width="48" height="48" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#dc2626" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Rounded base badge */}
          <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#brandGrad)" filter="url(#brandShadow)" />

          {/* Subtle inner highlight border */}
          <rect x="5" y="5" width="38" height="38" rx="11" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />

          {/* Steam curls */}
          <path
            d="M18 16C17.5 14 19 12.5 19 11M24 16C23.5 13.5 25 12 25 10M30 16C29.5 14 31 12.5 31 11"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Steaming Bowl */}
          <path
            d="M13 22C13 22 13.5 34 24 34C34.5 34 35 22 35 22H13Z"
            fill="url(#bowlGrad)"
          />

          {/* Bowl foot */}
          <path
            d="M19 34H29V36C29 36.5 28.5 37 28 37H20C19.5 37 19 36.5 19 36V34Z"
            fill="#e2e8f0"
          />

          {/* Chopsticks cross */}
          <path
            d="M10 16L38 21M38 18L12 21"
            stroke="#331400"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Sparkle star in the corner */}
          <path
            d="M36 7L37 10L40 11L37 12L36 15L35 12L32 11L35 10L36 7Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="brand-text-wrap">
        <div className="brand-title">
          <span className="brand-title-main">ĂN GÌ</span>
          <span className="brand-title-accent"> CŨNG ĐƯỢC?</span>
        </div>
        <span className="brand-subtitle">CỨ QUAY LÀ CÓ MÓN</span>
      </div>
    </div>
  );
}
