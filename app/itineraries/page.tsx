'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowRight,
  Compass,
  MapPin,
} from 'lucide-react';
import { CURATED_ITINERARIES } from '@/lib/zakho-data';
import { useZakho } from '@/components/ZakhoContext';

export default function ItinerariesPage() {
  const router = useRouter();
  const { loadCuratedItinerary } = useZakho();

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part IV · Section 14 · Curated Travel Journeys
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-3xl">
            Seven Curated Itineraries for Discovering Zakho
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Explore ready-to-follow day-by-day sequences built around verified Zakho landmarks.
            Load any journey directly into the interactive Trip Planner to customize stops, share
            links, or open turn-by-turn map directions.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 space-y-14">
        {CURATED_ITINERARIES.map((itin, index) => (
          <article
            key={itin.id}
            className="rounded-3xl bg-white border border-[#101716]/10 overflow-hidden shadow-sm"
          >
            {/* Top Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative min-h-[260px] bg-[#101716]">
                <img
                  src={itin.photo.src}
                  alt={itin.photo.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101716]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-[#EAE2D3] font-mono-tabular">
                  <p className="font-bold text-[#8BBDB5]">JOURNEY 0{index + 1}</p>
                  <p className="mt-0.5">
                    {itin.durationDays} {itin.durationDays === 1 ? 'Day' : 'Days'} · {itin.pace} Pace
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 p-6 sm:p-10 space-y-5 flex flex-col justify-between bg-[#EAE2D3]/45">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#245D4D] font-semibold">
                    <span>Ideal for: {itin.idealFor.join(', ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{itin.focusCategories.join(' / ')}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#101716]">
                    {itin.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#101716]/80 leading-relaxed">
                    {itin.editorialSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#101716]/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#101716]/70">
                    {itin.practicalNotes.map((note, idx) => (
                      <p key={idx}>• {note}</p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      loadCuratedItinerary(itin.slug);
                      router.push('/plan-your-trip');
                    }}
                    className="px-6 py-3 rounded-xl bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2 transition-colors shrink-0"
                  >
                    <Compass className="w-4 h-4 text-[#8BBDB5]" />
                    <span>Load &amp; Customize in Trip Planner</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Day-by-Day Stop Structure */}
            <div className="p-6 sm:p-10 space-y-8 border-t border-[#101716]/10">
              {itin.days.map((day) => (
                <div key={day.dayNumber} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#101716]/10">
                    <h3 className="text-xl font-serif-editorial font-semibold text-[#142B2B] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#245D4D]" />
                      <span>{day.dayTitle}</span>
                    </h3>
                    <span className="text-xs text-[#101716]/65 italic">{day.narrative}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {day.stops.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#245D4D]">
                            <span className="font-bold">{st.timeSlot}</span>
                            <span className="inline-flex items-center gap-1 text-[#101716]/60">
                              <Clock className="w-3 h-3" />
                              {st.durationLabel}
                            </span>
                          </div>
                          <Link
                            href={`/places/${st.destinationSlug}`}
                            className="text-base font-serif-editorial font-semibold text-[#101716] hover:text-[#245D4D] inline-flex items-center gap-1"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#B87D57] shrink-0" />
                            <span className="capitalize">
                              {st.destinationSlug.replace(/-/g, ' ')}
                            </span>
                          </Link>
                          <p className="text-xs text-[#101716]/75 leading-relaxed">
                            {st.activityNote}
                          </p>
                        </div>

                        <Link
                          href={`/places/${st.destinationSlug}`}
                          className="text-[11px] font-semibold uppercase tracking-wider text-[#245D4D] hover:underline self-start"
                        >
                          Inspect Place Guide →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
