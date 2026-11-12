import React from 'react';
import Link from 'next/link';
import { ZakhoBrandEmblem } from './RiverThreadMotif';

export function Footer() {
  return (
    <footer className="bg-[#101716] text-[#EAE2D3] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ZakhoBrandEmblem className="w-9 h-9 text-[#8BBDB5]" />
              <span className="text-xl font-serif-editorial tracking-widest uppercase text-[#FAFAF7]">
                VISIT ZAKHO
              </span>
            </div>
            <p className="text-sm text-[#EAE2D3]/80 max-w-md leading-relaxed">
              The international destination and travel platform for Zakho, Kurdistan Region, Iraq.
              Follow the thread of the Little Khabur River across centuries of limestone architecture,
              mountain waterfalls, and living Kurdish hospitality.
            </p>
            <p className="text-xs text-[#8BBDB5] font-mono-tabular">
              Zakho · Kurdistan Region · Iraq · 37.1456° N, 42.6953° E
            </p>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8BBDB5]">
              Discover & Places
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/discover" className="hover:text-white transition-colors">
                  Discover Zakho
                </Link>
              </li>
              <li>
                <Link href="/places" className="hover:text-white transition-colors">
                  Explore All Places
                </Link>
              </li>
              <li>
                <Link href="/places/delal-bridge" className="hover:text-white transition-colors">
                  Delal Bridge (Pira Delal)
                </Link>
              </li>
              <li>
                <Link href="/places/khabur-river-corniche" className="hover:text-white transition-colors">
                  Khabur River Corniche
                </Link>
              </li>
              <li>
                <Link href="/places/sharanish-waterfall" className="hover:text-white transition-colors">
                  Sharanish Waterfall
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Interactive Destination Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Experience & Plan */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8BBDB5]">
              Experience & Plan
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/experiences" className="hover:text-white transition-colors">
                  Curated Experiences
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-white transition-colors">
                  Culture & Heritage
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-white transition-colors">
                  Food & Dining Guide
                </Link>
              </li>
              <li>
                <Link href="/stay" className="hover:text-white transition-colors">
                  Accommodation Guide
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="hover:text-white transition-colors">
                  Curated Itineraries
                </Link>
              </li>
              <li>
                <Link href="/plan-your-trip" className="hover:text-white transition-colors">
                  Interactive Trip Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Visitor Essentials & Trust */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8BBDB5]">
              Visitor Guide & Trust
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/travel-guide" className="hover:text-white transition-colors">
                  Practical Travel Guide & FAQ
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white transition-colors">
                  The Beauty of Zakho Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About & Verification Registry
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Stakeholder Portal
                </Link>
              </li>
              <li>
                <a
                  href="https://visit.gov.krd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#B87D57]"
                >
                  Official KRG Visitor Portal ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#EAE2D3]/60">
          <p>
            © {new Date().getFullYear()} Visit Zakho Digital Destination Platform. All documentary
            photographs attributed via Wikimedia Commons under CC0 / CC BY / CC BY-SA licenses.
          </p>
          <p>
            Emergency (Kurdistan Region): Police 104 · Ambulance 122 · Civil Defense 115
          </p>
        </div>
      </div>
    </footer>
  );
}
