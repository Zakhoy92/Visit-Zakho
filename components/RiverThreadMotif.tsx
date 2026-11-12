'use client';

import React from 'react';

/**
 * Original graphic brand motif inspired by:
 * 1. The sinuous curve of the Little Khabur River as it bifurcates around Zakho Island
 * 2. The soaring pointed limestone arch of Pira Delal (Delal Bridge)
 * 3. The topographic ridge contours of Chia-yê Spî (White Mountains)
 */
export function ZakhoBrandEmblem({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Mountain contour arc */}
      <path
        d="M8 38C16 20 26 14 32 14C38 14 48 20 56 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      {/* Soaring pointed limestone arch of Delal Bridge */}
      <path
        d="M12 42C20 25 27 19 32 17C37 19 44 25 52 42"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      {/* Flanking relief arches */}
      <path
        d="M17 42C19 36 22 36 24 42"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M40 42C42 36 45 36 47 42"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Flowing Khabur River double thread */}
      <path
        d="M6 48C18 44 26 52 36 48C46 44 52 49 58 47"
        stroke="#8BBDB5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 54C22 50 30 58 42 53C49 50 54 53 58 52"
        stroke="#B87D57"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Signature Interaction One: "Follow the River"
 * A subtle, fluid SVG river divider and thread that connects sections across the page without interfering with readability.
 */
export function RiverSectionDivider({
  variant = 'light-to-dark',
  label,
}: {
  variant?: 'light-to-dark' | 'dark-to-light' | 'limestone-flow';
  label?: string;
}) {
  const strokeMain =
    variant === 'light-to-dark'
      ? '#245D4D'
      : variant === 'dark-to-light'
      ? '#8BBDB5'
      : '#B87D57';

  return (
    <div className="relative w-full py-6 overflow-hidden select-none" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
        <svg
          viewBox="0 0 1200 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8"
          preserveAspectRatio="none"
        >
          <path
            d="M0 22 C 220 4, 380 40, 600 22 C 820 4, 980 40, 1200 22"
            stroke={strokeMain}
            strokeWidth="1.75"
            strokeOpacity="0.55"
          />
          <path
            d="M0 28 C 240 12, 410 42, 600 26 C 790 10, 960 36, 1200 26"
            stroke="#B87D57"
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="6 6"
          />
        </svg>
        {label && (
          <span className="text-xs tracking-widest uppercase text-stone-500 whitespace-nowrap shrink-0 font-mono-tabular">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
