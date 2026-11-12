'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Compass, ArrowRight } from 'lucide-react';
import { useZakho } from './ZakhoContext';
import {
  DESTINATIONS,
  EXPERIENCES,
  FOOD_VENUES,
  ACCOMMODATIONS,
  EDITORIAL_STORIES,
} from '@/lib/zakho-data';

const PRIMARY_NAV_LINKS = [
  { label: 'Discover', href: '/discover' },
  { label: 'Places', href: '/places' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Culture', href: '/culture' },
  { label: 'Food & Dining', href: '/food' },
];

const ALL_ROUTES_MENU = [
  { label: 'Discover Zakho', href: '/discover', note: 'Identity, geography & history' },
  { label: 'Explore Places', href: '/places', note: '10 verified landmarks & valleys' },
  { label: 'Interactive Map', href: '/map', note: 'Geographic explorer & routes' },
  { label: 'Experiences', href: '/experiences', note: '6 curated discovery pillars' },
  { label: 'Culture & Heritage', href: '/culture', note: 'Traditions & coexistence' },
  { label: 'Food & Dining', href: '/food', note: 'Kurdish cuisine & river cafes' },
  { label: 'Stay Directory', href: '/stay', note: 'Hotels & family apartments' },
  { label: 'Curated Itineraries', href: '/itineraries', note: '7 ready-to-use journeys' },
  { label: 'Trip Planner', href: '/plan-your-trip', note: 'Interactive route builder' },
  { label: 'Travel Guide & FAQ', href: '/travel-guide', note: 'Arrival, seasons & essentials' },
  { label: 'City Stories', href: '/stories', note: 'The Beauty of Zakho journal' },
  { label: 'About & Registry', href: '/about', note: 'Factual verification & CMS' },
  { label: 'Contact & Submit', href: '/contact', note: 'Official enquiries & listings' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itineraryStops, isSearchOpen, setIsSearchOpen } = useZakho();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHeroDarkPage =
    pathname === '/' ||
    pathname === '/discover' ||
    pathname === '/stories' ||
    pathname.startsWith('/places/');

  const headerClasses = scrolled
    ? 'glass-river-dark text-[#FAFAF7] shadow-lg py-3.5'
    : isHeroDarkPage
    ? 'bg-gradient-to-b from-[#101716]/80 to-transparent text-[#FAFAF7] py-5'
    : 'bg-[#142B2B] text-[#FAFAF7] py-4 shadow-md';

  const q = searchQuery.trim().toLowerCase();
  const matchedDestinations = q
    ? DESTINATIONS.filter((d) =>
        `${d.name} ${d.kurdishName} ${d.category} ${d.shortSummary}`
          .toLowerCase()
          .includes(q)
      ).slice(0, 5)
    : DESTINATIONS.slice(0, 4);

  const matchedStories = q
    ? EDITORIAL_STORIES.filter((s) =>
        `${s.title} ${s.subtitle} ${s.category}`.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedFood = q
    ? FOOD_VENUES.filter((f) =>
        `${f.name} ${f.cuisineType} ${f.signatureDishes.join(' ')}`
          .toLowerCase()
          .includes(q)
      ).slice(0, 3)
    : [];

  const matchedStay = q
    ? ACCOMMODATIONS.filter((a) =>
        `${a.name} ${a.locationArea}`.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const matchedExperiences = q
    ? EXPERIENCES.filter((e) =>
        `${e.title} ${e.pillar}`.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  return (
    <>
      {/* Strict 3-Zone Top Bar Contract */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${headerClasses}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <Link
            href="/"
            className="text-base sm:text-lg font-bold tracking-widest uppercase text-[#FAFAF7] whitespace-nowrap shrink-0 font-serif-editorial"
          >
            VISIT ZAKHO
          </Link>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#EAE2D3]"
          >
            {PRIMARY_NAV_LINKS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                    active
                      ? 'text-[#FAFAF7] border-[#8BBDB5]'
                      : 'border-transparent hover:text-[#FAFAF7] hover:border-[#8BBDB5]/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA (+ compact search & mobile drawer button on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href="/plan-your-trip"
              className="px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#101716] bg-[#8BBDB5] hover:bg-[#EAE2D3] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              PLAN YOUR TRIP ({itineraryStops.length})
            </Link>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search destinations and guides"
              className="p-2 text-[#EAE2D3] hover:text-[#FAFAF7] rounded-lg hover:bg-white/10 transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open all pages menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-[#EAE2D3] hover:text-[#FAFAF7] rounded-lg hover:bg-white/10 transition-colors shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full Multi-Page Directory Drawer (Accessible on Desktop & Mobile for all 15 routes) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Complete Visit Zakho Directory"
          className="fixed inset-0 z-50 bg-[#101716]/95 backdrop-blur-xl text-[#FAFAF7] overflow-y-auto pt-24 pb-16 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/15 pb-6 mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                  Complete Destination Platform
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif-editorial mt-1">
                  Explore Every Dimension of Zakho
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-white/20 rounded-lg hover:bg-white/10"
              >
                Close Menu
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_ROUTES_MENU.map((route, idx) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-5 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                    pathname === route.href
                      ? 'bg-[#245D4D]/40 border-[#8BBDB5]'
                      : 'bg-white/5 border-white/10 hover:border-[#8BBDB5]/60 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono-tabular text-[#8BBDB5]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-serif-editorial text-[#FAFAF7] mt-1">
                      {route.label}
                    </h3>
                    <p className="text-xs text-[#EAE2D3]/75 mt-1">{route.note}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8BBDB5] shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Search & Command Palette (Cmd+K) */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search Visit Zakho"
          className="fixed inset-0 z-50 bg-[#101716]/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#142B2B] border border-[#8BBDB5]/30 rounded-2xl shadow-2xl overflow-hidden text-[#FAFAF7]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-[#8BBDB5] shrink-0" />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Zakho landmarks, Delal Bridge, waterfalls, food, hotels, or guides..."
                aria-label="Search Zakho destinations and guides"
                className="w-full bg-transparent text-sm text-[#FAFAF7] placeholder-[#EAE2D3]/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-[#EAE2D3]/70 hover:text-white px-2 py-1 rounded border border-white/15 shrink-0"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8BBDB5] mb-3">
                  {q ? 'Matching Places & Landmarks' : 'Featured Zakho Destinations'}
                </p>
                {matchedDestinations.length === 0 ? (
                  <p className="text-xs text-[#EAE2D3]/70">
                    No places matched &ldquo;{searchQuery}&rdquo;.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {matchedDestinations.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          router.push(`/places/${dest.slug}`);
                        }}
                        className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between gap-4 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#FAFAF7]">
                            {dest.name}
                          </p>
                          <p className="text-xs text-[#EAE2D3]/75 mt-0.5">
                            {dest.category} · {dest.geographicScope}
                          </p>
                        </div>
                        <Compass className="w-4 h-4 text-[#8BBDB5] shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {(matchedFood.length > 0 || matchedStay.length > 0 || matchedExperiences.length > 0 || matchedStories.length > 0) && (
                <div className="space-y-4 pt-3 border-t border-white/10">
                  {matchedFood.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push('/food');
                      }}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#FAFAF7]">{f.name}</p>
                        <p className="text-xs text-[#EAE2D3]/70">Food & Dining · {f.cuisineType}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8BBDB5]" />
                    </button>
                  ))}
                  {matchedStay.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push('/stay');
                      }}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#FAFAF7]">{s.name}</p>
                        <p className="text-xs text-[#EAE2D3]/70">Stay · {s.locationArea}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8BBDB5]" />
                    </button>
                  ))}
                  {matchedStories.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push('/stories');
                      }}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#FAFAF7]">{st.title}</p>
                        <p className="text-xs text-[#EAE2D3]/70">Editorial Story · {st.readTimeMinutes} min read</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8BBDB5]" />
                    </button>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#EAE2D3]/70">
                <span>Quick Navigation:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Interactive Map', href: '/map' },
                    { label: 'Trip Planner', href: '/plan-your-trip' },
                    { label: 'Itineraries', href: '/itineraries' },
                    { label: 'Travel Guide', href: '/travel-guide' },
                    { label: 'Stay', href: '/stay' },
                  ].map((qLink) => (
                    <Link
                      key={qLink.href}
                      href={qLink.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-[#8BBDB5] hover:text-[#101716] transition-colors"
                    >
                      {qLink.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
