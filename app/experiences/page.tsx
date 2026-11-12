'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Sun, Plus, Check } from 'lucide-react';
import { EXPERIENCES, DESTINATIONS } from '@/lib/zakho-data';
import { useZakho } from '@/components/ZakhoContext';

export default function ExperiencesPage() {
  const { addDestinationToItinerary, isDestinationSaved } = useZakho();
  const [selectedPillar, setSelectedPillar] = useState<string>('ALL');

  const visibleExperiences =
    selectedPillar === 'ALL'
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.pillar === selectedPillar);

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part IV · Section 11 · Curated Destination Discovery
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-3xl">
            Experience Zakho Across Six Cultural &amp; Natural Pillars
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Whether your journey is driven by ancient stone architecture, alpine waterfall trails,
            traditional bazaar crafts, or Kurdish culinary hospitality, explore Zakho through
            curated thematic experiences.
          </p>

          <div className="flex items-center gap-2 overflow-x-auto pt-4">
            <button
              type="button"
              onClick={() => setSelectedPillar('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${
                selectedPillar === 'ALL'
                  ? 'bg-[#8BBDB5] text-[#101716]'
                  : 'bg-white/10 text-[#EAE2D3] hover:bg-white/20'
              }`}
            >
              All 6 Pillars
            </button>
            {EXPERIENCES.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedPillar(e.pillar)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${
                  selectedPillar === e.pillar
                    ? 'bg-[#8BBDB5] text-[#101716]'
                    : 'bg-white/10 text-[#EAE2D3] hover:bg-white/20'
                }`}
              >
                {e.pillar}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 space-y-16">
        {visibleExperiences.map((exp, idx) => {
          const relatedPlaces = DESTINATIONS.filter((d) =>
            exp.relatedDestinationSlugs.includes(d.slug)
          );
          const isEven = idx % 2 === 0;

          return (
            <article
              key={exp.id}
              className={`rounded-3xl p-6 sm:p-10 border border-[#101716]/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                isEven ? 'bg-[#EAE2D3]/70' : 'bg-white'
              }`}
            >
              <div className={`lg:col-span-5 ${!isEven ? 'lg:order-2' : ''}`}>
                <div className="rounded-2xl overflow-hidden bg-[#101716] border border-[#101716]/10">
                  <img
                    src={exp.photo.src}
                    alt={exp.photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-3.5 bg-[#142B2B] text-[#EAE2D3] text-xs font-mono-tabular flex items-center justify-between">
                    <span>Photo: {exp.photo.photographer}</span>
                    <span>{exp.photo.license}</span>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-7 space-y-5 ${!isEven ? 'lg:order-1' : ''}`}>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#245D4D] font-mono-tabular">
                  <span className="font-bold uppercase tracking-widest">
                    0{idx + 1}. {exp.pillar}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.suggestedDuration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-[#B87D57]" />
                    {exp.bestSeason}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#101716]">
                  {exp.title}
                </h2>

                <p className="text-base text-[#101716]/80 leading-relaxed">
                  {exp.editorialIntro}
                </p>

                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-widest text-[#101716]/60 font-semibold">
                    Signature Highlights
                  </h3>
                  <ul className="space-y-1.5 text-sm text-[#101716]/85">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 text-xs text-[#101716]/80">
                  <strong className="text-[#245D4D]">Curator Tip:</strong> {exp.practicalTip}
                </div>

                {/* Related Places for this Experience */}
                <div className="pt-2 space-y-2">
                  <p className="text-xs uppercase tracking-widest text-[#101716]/60 font-semibold">
                    Connected Zakho Places
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedPlaces.map((pl) => (
                      <div
                        key={pl.id}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#142B2B] text-[#FAFAF7] text-xs"
                      >
                        <Link href={`/places/${pl.slug}`} className="hover:underline font-medium">
                          {pl.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => addDestinationToItinerary(pl.slug, 1)}
                          aria-label={`Add ${pl.name} to itinerary`}
                          className="text-[#8BBDB5] hover:text-white pl-1 border-l border-white/20"
                        >
                          {isDestinationSaved(pl.slug) ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
