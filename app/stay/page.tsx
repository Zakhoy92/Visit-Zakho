'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Accessibility,
} from 'lucide-react';
import { ACCOMMODATIONS } from '@/lib/zakho-data';
import { filterAccommodations } from '@/lib/planner-engine';

const STAY_CATEGORIES = [
  'All',
  'Boutique & Business Hotel',
  'Hotel',
  'Serviced Apartment',
  'District Mountain Retreat',
];

export default function StayPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScope, setSelectedScope] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStay = useMemo(
    () =>
      filterAccommodations(
        ACCOMMODATIONS,
        selectedCategory,
        selectedScope,
        searchQuery
      ),
    [selectedCategory, selectedScope, searchQuery]
  );

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part IV · Section 13 · Accommodation Guide
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-3xl">
            Where to Stay in Zakho City &amp; District
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Explore verified accommodation corridors in Zakho—from international highway business
            hotels and central Khabur Corniche properties to multi-bedroom family apartments.
          </p>

          <div className="p-4 rounded-xl bg-white/5 border border-[#8BBDB5]/30 flex items-center gap-3 text-xs text-[#EAE2D3]">
            <ShieldCheck className="w-4 h-4 text-[#8BBDB5] shrink-0" />
            <span>
              <strong>Factual Transparency Note:</strong> Room tariffs in Zakho fluctuate
              seasonally (especially around Newroz in March and summer weekends). We never invent
              fake nightly prices or availability—use the verified Google Maps hotel search links
              below to check live property desk contacts.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-[#8BBDB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by facility (Parking, Kitchenette, Wi-Fi)..."
                aria-label="Filter accommodation by facility or area"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-[#FAFAF7] placeholder-[#EAE2D3]/60 focus:outline-none focus:border-[#8BBDB5]"
              />
            </div>

            <div className="md:col-span-8 flex items-center gap-2 overflow-x-auto">
              {STAY_CATEGORIES.map((cat) => (
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

      <section className="py-16 max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-center gap-3">
          {(['All', 'Zakho City', 'Wider Zakho District'] as const).map((sc) => (
            <button
              key={sc}
              type="button"
              onClick={() => setSelectedScope(sc)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                selectedScope === sc
                  ? 'bg-[#142B2B] text-[#FAFAF7]'
                  : 'bg-[#EAE2D3] text-[#101716] hover:bg-[#142B2B]/10'
              }`}
            >
              {sc}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStay.map((stay) => (
            <article
              key={stay.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#101716]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 bg-[#101716]">
                  <img
                    src={stay.photo.src}
                    alt={stay.photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded bg-[#142B2B] text-[#FAFAF7] font-medium">
                      {stay.category}
                    </span>
                    <span className="px-3 py-1 rounded bg-[#101716]/85 text-[#8BBDB5] font-mono-tabular">
                      {stay.distanceFromDelalKm} km from Delal Bridge
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-[#245D4D] font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B87D57]" />
                      <span>
                        {stay.locationArea} ({stay.geographicScope})
                      </span>
                    </p>
                    <h2 className="text-2xl font-serif-editorial text-[#101716] mt-1">
                      {stay.name}
                    </h2>
                  </div>

                  <p className="text-sm text-[#101716]/80 leading-relaxed">
                    {stay.description}
                  </p>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#101716]/60 font-semibold mb-2">
                      Standard Facilities in Corridor:
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-[#101716]/85">
                      {stay.facilities.map((fac, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-[#EAE2D3]/70 border border-[#101716]/10"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 text-xs space-y-1.5">
                    <p className="flex items-start gap-2 text-[#101716]/80">
                      <Accessibility className="w-4 h-4 text-[#245D4D] shrink-0 mt-0.5" />
                      <span>
                        <strong>Accessibility:</strong> {stay.accessibilityInfo}
                      </span>
                    </p>
                    <p className="text-[#101716]/75">
                      <strong>Booking Guidance:</strong> {stay.bookingGuidance}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-[#101716]/10 flex flex-wrap items-center justify-between gap-3 bg-[#F7F5EF]/50">
                <a
                  href={stay.externalSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Check Live Map &amp; Property Contacts</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${stay.coordinates.lat},${stay.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl border border-[#142B2B]/25 text-[#142B2B] hover:bg-[#142B2B] hover:text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
