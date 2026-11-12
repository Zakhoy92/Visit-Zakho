'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  FOOD_VENUES,
  TRADITIONAL_DISHES,
} from '@/lib/zakho-data';
import { filterFoodVenues } from '@/lib/planner-engine';

const FOOD_CATEGORIES = [
  'All',
  'Traditional Kurdish Restaurant',
  'Riverfront Cafe',
  'Traditional Bakery',
  'Family Dining',
];

export default function FoodPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = useMemo(
    () => filterFoodVenues(FOOD_VENUES, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part IV · Section 12 · Food &amp; Dining Guide
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-3xl">
            Kurdish Gastronomy, Bazaar Bakeries &amp; River Terraces
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Discover Zakho’s culinary heritage—from morning stone-milled sesame tahini (Rashi u
            Dims) and wood-fired clay ovens in the Old Bazaar to evening samovar tea and roasted
            Khabur fish.
          </p>

          {/* Editorial Independence & Sponsorship Transparency Notice */}
          <div className="p-4 rounded-xl bg-white/5 border border-[#8BBDB5]/30 flex items-center gap-3 text-xs text-[#EAE2D3]">
            <ShieldCheck className="w-4 h-4 text-[#8BBDB5] shrink-0" />
            <span>
              <strong>Editorial Integrity Disclosure:</strong> All dining listings below are
              independent editorial recommendations or verified geographic dining zones. Zero fake
              ratings or fabricated menus are displayed.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#8BBDB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (Rashi, Dolma, Fish, Tea) or areas..."
                aria-label="Search food and dining venues"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-[#FAFAF7] placeholder-[#EAE2D3]/60 focus:outline-none focus:border-[#8BBDB5]"
              />
            </div>

            <div className="md:col-span-7 flex items-center gap-2 overflow-x-auto">
              {FOOD_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#8BBDB5] text-[#101716]'
                      : 'bg-white/10 text-[#EAE2D3] hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Venues Directory */}
      <section className="py-16 max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.map((venue) => (
            <article
              key={venue.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#101716]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 bg-[#101716]">
                  <img
                    src={venue.photo.src}
                    alt={venue.photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px]">
                    <span className="px-2.5 py-1 rounded bg-[#142B2B] text-[#FAFAF7] font-medium">
                      {venue.category}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#EAE2D3] text-[#101716] font-semibold">
                      {venue.isSponsored ? 'Sponsored' : 'Independent Editorial'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-xs text-[#245D4D] font-medium">
                    {venue.cuisineType} · {venue.geographicScope}
                  </p>
                  <h2 className="text-2xl font-serif-editorial text-[#101716]">
                    {venue.name}
                  </h2>
                  <p className="text-xs text-[#101716]/70 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B87D57] shrink-0" />
                    <span>{venue.neighborhood}</span>
                  </p>
                  <p className="text-sm text-[#101716]/80 leading-relaxed">
                    {venue.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#101716]/60 mb-1.5">
                      Signature Specialties:
                    </p>
                    <ul className="space-y-1 text-xs text-[#101716]/85">
                      {venue.signatureDishes.map((dish, i) => (
                        <li key={i}>• {dish}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-[#101716]/10 space-y-3 bg-[#F7F5EF]/60">
                <div className="text-xs text-[#101716]/75 space-y-1 font-mono-tabular">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#245D4D]" />
                    <span>{venue.openingHours}</span>
                  </p>
                  <p>Payment: {venue.priceCategory}</p>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#8BBDB5]" />
                  <span>Directions on Map</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Essential Dishes Feature */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#EAE2D3] border border-[#101716]/10 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#B87D57] font-semibold">
              Editorial Feature · Essential Flavors
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#101716] mt-1">
              Four Traditional Dishes to Taste in Zakho
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRADITIONAL_DISHES.map((dish) => (
              <div
                key={dish.id}
                className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#101716]/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#245D4D]">
                    {dish.category}
                  </span>
                  <span className="text-sm font-serif-editorial italic text-[#B87D57]">
                    {dish.kurdishName}
                  </span>
                </div>
                <h3 className="text-xl font-serif-editorial font-semibold text-[#101716]">
                  {dish.name}
                </h3>
                <p className="text-sm text-[#101716]/80 leading-relaxed">
                  {dish.description}
                </p>
                <p className="text-xs text-[#101716]/65 pt-2 border-t border-[#101716]/10">
                  <strong>Where to try:</strong> {dish.whereToTry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
