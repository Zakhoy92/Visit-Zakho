'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Plus,
  Check,
  ArrowRight,
  Compass,
} from 'lucide-react';
import {
  DESTINATIONS,
  DestinationCategory,
  GeographicScope,
} from '@/lib/zakho-data';
import { filterDestinations } from '@/lib/planner-engine';
import { useZakho } from '@/components/ZakhoContext';

const CATEGORIES: (DestinationCategory | 'All')[] = [
  'All',
  'Historical Sites',
  'Architectural Heritage',
  'Nature & Landscapes',
  'River & Outdoor Activities',
  'Culture & Traditions',
  'Markets & Shopping',
  'Family Experiences',
  'Nearby Excursions',
];

export default function PlacesDirectoryPage() {
  const { addDestinationToItinerary, isDestinationSaved } = useZakho();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | 'All'>('All');
  const [selectedScope, setSelectedScope] = useState<GeographicScope | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'distance' | 'name'>('featured');

  const filtered = useMemo(
    () =>
      filterDestinations(DESTINATIONS, {
        query: searchQuery,
        category: selectedCategory,
        scope: selectedScope,
        sortBy,
      }),
    [searchQuery, selectedCategory, selectedScope, sortBy]
  );

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part IV · Section 09 · Verified Destination Directory
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-3xl">
            Explore Places in Zakho City &amp; Wider District
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Discover verified historical monuments, riverfront parks, island bazaars, and highland
            waterfalls. Every place clearly distinguishes locations inside walkable{' '}
            <strong>Zakho City</strong> from excursions in the <strong>Wider Zakho District</strong>.
          </p>

          {/* Search & Scope Filter Bar */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#8BBDB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, Kurdish title, or landmark..."
                aria-label="Search destinations"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-[#FAFAF7] placeholder-[#EAE2D3]/60 focus:outline-none focus:border-[#8BBDB5]"
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/15">
              {(['All', 'Zakho City', 'Wider Zakho District'] as const).map((scope) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setSelectedScope(scope)}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    selectedScope === scope
                      ? 'bg-[#8BBDB5] text-[#101716]'
                      : 'text-[#EAE2D3] hover:bg-white/10'
                  }`}
                >
                  {scope === 'All' ? 'All Areas' : scope === 'Zakho City' ? 'Zakho City' : 'Wider District'}
                </button>
              ))}
            </div>

            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'featured' | 'distance' | 'name')
                }
                aria-label="Sort destinations"
                className="w-full py-3 px-4 rounded-xl bg-[#101716] border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#EAE2D3] focus:outline-none focus:border-[#8BBDB5]"
              >
                <option value="featured">Sort: Curated Significance</option>
                <option value="distance">Sort: Distance from Center</option>
                <option value="name">Sort: Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

          {/* 8 Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#245D4D] text-[#FAFAF7] border border-[#8BBDB5]'
                    : 'bg-white/5 text-[#EAE2D3]/80 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Results Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#101716]/10 pb-4">
          <p className="text-sm text-[#101716]/75">
            Showing <strong className="text-[#101716]">{filtered.length}</strong> verified
            destinations
            {selectedScope !== 'All' ? ` in ${selectedScope}` : ''}
            {selectedCategory !== 'All' ? ` · ${selectedCategory}` : ''}
          </p>

          <Link
            href="/map"
            className="text-xs font-semibold uppercase tracking-wider text-[#245D4D] hover:underline inline-flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>View All on Interactive Map</span>
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#EAE2D3]/60 border border-[#101716]/10 text-center space-y-4">
            <h2 className="text-2xl font-serif-editorial">No matching places found</h2>
            <p className="text-sm text-[#101716]/70 max-w-md mx-auto">
              Try resetting your category filter or search term to explore all 10 verified
              destinations across Zakho City and the wider district.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedScope('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#142B2B] text-[#FAFAF7] text-xs font-semibold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest) => {
              const saved = isDestinationSaved(dest.slug);
              return (
                <article
                  key={dest.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#101716]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 bg-[#101716]">
                      <img
                        src={dest.heroPhoto.src}
                        alt={dest.heroPhoto.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101716]/85 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px]">
                        <span
                          className={`px-2.5 py-1 rounded font-semibold ${
                            dest.geographicScope === 'Zakho City'
                              ? 'bg-[#245D4D] text-[#FAFAF7]'
                              : 'bg-[#B87D57] text-[#101716]'
                          }`}
                        >
                          {dest.geographicScope}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#101716]/80 text-[#EAE2D3] font-mono-tabular">
                          {dest.distanceFromCenterKm} km from center
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-xs text-[#EAE2D3]/90 flex items-center justify-between font-mono-tabular">
                        <span>{dest.category}</span>
                        <span>
                          {dest.coordinates.lat.toFixed(4)}° N, {dest.coordinates.lng.toFixed(4)}° E
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <p className="text-xs text-[#245D4D] font-medium">
                        {dest.kurdishName} · {dest.recommendedDuration}
                      </p>
                      <h2 className="text-2xl font-serif-editorial text-[#101716]">
                        {dest.name}
                      </h2>
                      <p className="text-sm text-[#101716]/75 leading-relaxed">
                        {dest.shortSummary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#101716]/10 flex items-center justify-between gap-3">
                    <Link
                      href={`/places/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#142B2B] hover:text-[#245D4D]"
                    >
                      <span>Destination Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        addDestinationToItinerary(
                          dest.slug,
                          dest.geographicScope === 'Zakho City' ? 1 : 2
                        )
                      }
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        saved
                          ? 'bg-[#EAE2D3] text-[#101716]'
                          : 'bg-[#245D4D] text-[#FAFAF7] hover:bg-[#142B2B]'
                      }`}
                    >
                      {saved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Trip</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
