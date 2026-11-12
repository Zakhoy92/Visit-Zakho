'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  MapPin,
  Plus,
  Check,
  Calendar,
  Sun,
  Navigation,
  BookOpen,
} from 'lucide-react';
import {
  DESTINATIONS,
  EXPERIENCES,
  FOOD_VENUES,
  TRADITIONAL_DISHES,
  ACCOMMODATIONS,
  CURATED_ITINERARIES,
  SEASONAL_GUIDE,
  EDITORIAL_STORIES,
  ZAKHO_PHOTO_CREDITS,
} from '@/lib/zakho-data';
import { useZakho } from '@/components/ZakhoContext';
import { ZakhoInteractiveMap } from '@/components/ZakhoInteractiveMap';
import { RiverSectionDivider, ZakhoBrandEmblem } from '@/components/RiverThreadMotif';

const HERO_SCENES = [
  {
    id: 'scene-delal',
    label: '01. Pira Delal (Delal Bridge)',
    photo: ZAKHO_PHOTO_CREDITS.delalHero,
    coordinates: '37.1456° N, 42.6953° E · Elevation 440m',
  },
  {
    id: 'scene-khabur',
    label: '02. The Little Khabur River',
    photo: ZAKHO_PHOTO_CREDITS.piraDelalRiver,
    coordinates: '37.1439° N, 42.6861° E · Historic Island Core',
  },
  {
    id: 'scene-sharanish',
    label: '03. Sharanish Highland Waterfall',
    photo: ZAKHO_PHOTO_CREDITS.sharanishWaterfall,
    coordinates: '37.2589° N, 42.9042° E · 35 km NE of Zakho',
  },
  {
    id: 'scene-spring',
    label: '04. Emerald Valleys of Zakho',
    photo: ZAKHO_PHOTO_CREDITS.springMeadows,
    coordinates: '37.0912° N, 42.6785° E · Sindî Plain & Foothills',
  },
];

export default function HomePage() {
  const {
    addDestinationToItinerary,
    isDestinationSaved,
    loadCuratedItinerary,
  } = useZakho();

  const [activeHeroSceneIndex, setActiveHeroSceneIndex] = useState(0);
  const [selectedSeasonId, setSelectedSeasonId] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');

  const currentHero = HERO_SCENES[activeHeroSceneIndex];
  const activeSeason =
    SEASONAL_GUIDE.find((s) => s.id === selectedSeasonId) || SEASONAL_GUIDE[0];

  return (
    <div className="w-full">
      {/* =====================================================================
          1. CINEMATIC INTRODUCTION HERO
      ===================================================================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#101716] text-[#FAFAF7] pt-28 pb-12">
        {/* Background Documentary Photograph with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentHero.photo.src}
            alt={currentHero.photo.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101716] via-[#142B2B]/65 to-[#101716]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101716]/85 via-[#101716]/35 to-transparent" />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full my-auto py-12">
          <div className="max-w-3xl space-y-6">
            {/* Location Indicator */}
            <div className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-[#8BBDB5] font-mono-tabular">
              <MapPin className="w-3.5 h-3.5 text-[#B87D57]" />
              <span>Zakho | Kurdistan Region | Iraq</span>
            </div>

            {/* Oversized Cinematic Headline */}
            <h1 className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-[#FAFAF7] leading-[0.98] [text-wrap:balance]">
              DISCOVER ZAKHO.
            </h1>

            {/* Supporting Headline */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif-editorial italic text-[#EAE2D3] leading-snug [text-wrap:balance]">
              A city of living history, extraordinary landscapes, and unforgettable stories.
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#EAE2D3]/90 max-w-2xl leading-relaxed">
              Follow the river. Explore centuries of heritage. Experience the warmth of
              Kurdistan. Discover Zakho.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/places"
                className="px-7 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-[#8BBDB5] text-[#101716] hover:bg-[#EAE2D3] rounded-xl transition-all inline-flex items-center gap-3 shadow-xl whitespace-nowrap"
              >
                <span>EXPLORE THE CITY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/plan-your-trip"
                className="px-7 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase glass-river-dark text-[#FAFAF7] hover:bg-white/15 rounded-xl transition-all inline-flex items-center gap-3 whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#8BBDB5]" />
                <span>PLAN YOUR VISIT</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Hero Bar: Scene Switcher + Documentary Attribution */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-8 border-t border-white/15 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {HERO_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setActiveHeroSceneIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  activeHeroSceneIndex === idx
                    ? 'bg-[#8BBDB5] text-[#101716] font-semibold'
                    : 'bg-white/10 text-[#EAE2D3] hover:bg-white/20'
                }`}
              >
                {scene.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#EAE2D3]/75 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono-tabular">
            <span>{currentHero.coordinates}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>
              Documentary Photo: {currentHero.photo.photographer} ({currentHero.photo.license})
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. EDITORIAL INTRODUCTION TO ZAKHO (Warm Paper #F7F5EF)
      ===================================================================== */}
      <section className="py-24 lg:py-32 bg-[#F7F5EF] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Editorial Essay */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
                <ZakhoBrandEmblem className="w-6 h-6 text-[#245D4D]" />
                <span>01. The Central Creative Thread</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-editorial text-[#101716] leading-[1.08] [text-wrap:balance]">
                Where the Little Khabur Embraces an Island of Stone
              </h2>

              <p className="text-base sm:text-lg text-[#101716]/85 leading-relaxed max-w-2xl first-letter:text-5xl first-letter:font-serif-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#245D4D]">
                Emerging from the high alpine gorges of the northern frontier, the Little Khabur
                River slows as it reaches the fertile Sindî plain and splits into two shimmering
                channels. On the natural island cradled between those waters stands historic
                Zakho—for centuries the northern gateway of Kurdistan and Upper Mesopotamia.
              </p>

              <p className="text-base text-[#101716]/80 leading-relaxed max-w-2xl">
                Here, caravans crossing between Anatolia and the Tigris walked over the soaring,
                hand-dressed limestone arches of <strong>Pira Delal (Delal Bridge)</strong>. Today,
                Zakho invites international travelers to experience a city that balances monumental
                antiquity with vibrant riverfront evenings, bustling island bazaars, and nearby
                mountain waterfalls.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6">
                <Link
                  href="/discover"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#245D4D] hover:text-[#142B2B] border-b-2 border-[#245D4D] pb-1"
                >
                  <span>Read the Complete City Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/culture"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#B87D57] hover:text-[#101716] border-b-2 border-[#B87D57] pb-1"
                >
                  <span>Explore Culture & Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Asymmetric Visual Composition + Geographic Fact Sheet */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[#101716]/10 bg-[#EAE2D3] shadow-lg">
                <img
                  src={ZAKHO_PHOTO_CREDITS.delalFront.src}
                  alt={ZAKHO_PHOTO_CREDITS.delalFront.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-72 object-cover"
                />
                <div className="p-5 bg-[#EAE2D3]">
                  <p className="text-xs font-serif-editorial italic text-[#101716]/75">
                    Fig. 1 — {ZAKHO_PHOTO_CREDITS.delalFront.caption} (Photo:{' '}
                    {ZAKHO_PHOTO_CREDITS.delalFront.photographer})
                  </p>
                </div>
              </div>

              {/* Verified Geographic Fact Grid */}
              <dl className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-[#EAE2D3]/70 border border-[#101716]/10 font-mono-tabular">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#101716]/60">
                    Region
                  </dt>
                  <dd className="text-sm font-semibold text-[#101716] mt-1">
                    Kurdistan Region, Iraq
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#101716]/60">
                    Coordinates
                  </dt>
                  <dd className="text-sm font-semibold text-[#101716] mt-1">
                    37.1456° N, 42.6953° E
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#101716]/60">
                    Primary River
                  </dt>
                  <dd className="text-sm font-semibold text-[#245D4D] mt-1">
                    Little Khabur (Ava Xabîr)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#101716]/60">
                    Spoken Language
                  </dt>
                  <dd className="text-sm font-semibold text-[#101716] mt-1">
                    Kurdish (Bahdini / Kurmanji)
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <RiverSectionDivider variant="light-to-dark" label="Khabur River Milestone · 37.14° N" />

      {/* =====================================================================
          3. THE ICONIC LANDMARKS (Limestone #EAE2D3 Editorial Surface)
      ===================================================================== */}
      <section className="py-24 bg-[#EAE2D3] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
                02. Verified Destination Directory
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif-editorial text-[#101716] mt-2 [text-wrap:balance]">
                Iconic Landmarks of Zakho City &amp; District
              </h2>
            </div>
            <Link
              href="/places"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-widest bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
            >
              <span>View All 10 Verified Places</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Asymmetric Bento Landmark Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lead Feature Card: Delal Bridge (Col-span 7) */}
            {DESTINATIONS.slice(0, 1).map((lead) => (
              <div
                key={lead.id}
                className="lg:col-span-7 group bg-[#F7F5EF] rounded-2xl overflow-hidden border border-[#101716]/10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-80 sm:h-96 overflow-hidden bg-[#101716]">
                  <img
                    src={lead.heroPhoto.src}
                    alt={lead.heroPhoto.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101716]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-[#FAFAF7]">
                    <span>
                      {lead.geographicScope} · {lead.category}
                    </span>
                    <span className="font-mono-tabular">
                      {lead.coordinates.lat.toFixed(4)}° N, {lead.coordinates.lng.toFixed(4)}° E
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#245D4D]">
                    <span>{lead.kurdishName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lead.verificationStatus}</span>
                  </div>
                  <h3 className="text-3xl font-serif-editorial text-[#101716]">
                    {lead.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#101716]/80 leading-relaxed">
                    {lead.shortSummary}
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#101716]/10">
                    <Link
                      href={`/places/${lead.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#142B2B] hover:text-[#245D4D]"
                    >
                      <span>Explore Destination Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => addDestinationToItinerary(lead.slug, 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#245D4D] text-[#FAFAF7] hover:bg-[#142B2B] transition-colors"
                    >
                      {isDestinationSaved(lead.slug) ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved in Trip</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Save to Itinerary</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Right Stack: Khabur Corniche & Old Bazaar (Col-span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {DESTINATIONS.slice(1, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F7F5EF] rounded-2xl overflow-hidden border border-[#101716]/10 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all flex-1"
                >
                  <div className="relative h-48 overflow-hidden bg-[#101716]">
                    <img
                      src={item.heroPhoto.src}
                      alt={item.heroPhoto.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101716]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 text-xs text-[#FAFAF7]">
                      {item.geographicScope} · {item.recommendedDuration}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-serif-editorial text-[#101716]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#101716]/75 line-clamp-2">
                      {item.shortSummary}
                    </p>
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <Link
                        href={`/places/${item.slug}`}
                        className="text-xs font-semibold uppercase tracking-wider text-[#245D4D] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Discover Place</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => addDestinationToItinerary(item.slug, 1)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#142B2B]/20 hover:bg-[#142B2B] hover:text-white transition-colors"
                      >
                        {isDestinationSaved(item.slug) ? 'In Trip ✓' : '+ Add Stop'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Row: Qishla, Sharanish Waterfall, and Bekhair White Mountains */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[DESTINATIONS[3], DESTINATIONS[5], DESTINATIONS[7]].map((dest) => (
              <div
                key={dest.id}
                className="bg-[#F7F5EF] rounded-2xl overflow-hidden border border-[#101716]/10 flex flex-col justify-between"
              >
                <div className="relative h-52 bg-[#101716]">
                  <img
                    src={dest.heroPhoto.src}
                    alt={dest.heroPhoto.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#101716]/80 text-[#FAFAF7] text-[11px]">
                    {dest.geographicScope}
                  </div>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#B87D57] font-medium">{dest.category}</p>
                    <h3 className="text-xl font-serif-editorial text-[#101716] mt-1">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#101716]/75 mt-2 leading-relaxed">
                      {dest.shortSummary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#101716]/10 flex items-center justify-between">
                    <Link
                      href={`/places/${dest.slug}`}
                      className="text-xs font-semibold text-[#142B2B] hover:text-[#245D4D] inline-flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => addDestinationToItinerary(dest.slug, 2)}
                      className="text-xs font-medium text-[#245D4D] hover:underline"
                    >
                      {isDestinationSaved(dest.slug) ? 'Saved ✓' : '+ Save'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. INTERACTIVE DESTINATION MAP (River Ink #142B2B Dark Section)
      ===================================================================== */}
      <section className="py-24 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                03. The Geographical Heart of Visit Zakho
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif-editorial text-[#FAFAF7] mt-2 [text-wrap:balance]">
                Interactive Destination &amp; Watershed Map
              </h2>
              <p className="text-sm sm:text-base text-[#EAE2D3]/80 max-w-2xl mt-2">
                Explore verified coordinates across Zakho City and the wider mountain district.
                Filter by historical monuments, nature, dining, and accommodation, or open direct
                turn-by-turn routing.
              </p>
            </div>
            <Link
              href="/map"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-widest bg-[#8BBDB5] text-[#101716] hover:bg-[#EAE2D3] rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap self-start lg:self-auto"
            >
              <Navigation className="w-4 h-4" />
              <span>Open Full-Screen Map Explorer</span>
            </Link>
          </div>

          <ZakhoInteractiveMap initialView="district" compact />
        </div>
      </section>

      {/* =====================================================================
          5. NATURE & OUTDOOR EXPERIENCES + 6. CULTURE & HERITAGE
      ===================================================================== */}
      <section className="py-24 bg-[#F7F5EF] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
                04. Curated Destination Pillars
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif-editorial text-[#101716] mt-2">
                Six Ways to Experience Zakho
              </h2>
            </div>
            <Link
              href="/experiences"
              className="text-xs font-semibold uppercase tracking-widest text-[#245D4D] hover:text-[#142B2B] inline-flex items-center gap-2 border-b-2 border-[#245D4D] pb-1"
            >
              <span>Explore All 6 Experience Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.id}
                className="group rounded-2xl bg-[#EAE2D3]/60 border border-[#101716]/10 overflow-hidden flex flex-col justify-between hover:border-[#245D4D] transition-all"
              >
                <div className="relative h-56 overflow-hidden bg-[#101716]">
                  <img
                    src={exp.photo.src}
                    alt={exp.photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101716]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#8BBDB5] font-mono-tabular">
                    <span>0{idx + 1}. {exp.pillar}</span>
                    <span>{exp.suggestedDuration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif-editorial text-[#101716]">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-[#101716]/75 leading-relaxed">
                      {exp.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#101716]/10 flex items-center justify-between">
                    <span className="text-xs text-[#101716]/60">
                      Best: {exp.bestSeason.split('(')[0]}
                    </span>
                    <Link
                      href="/experiences"
                      className="text-xs font-semibold uppercase tracking-wider text-[#245D4D] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Pillar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. FOOD & LOCAL DINING + 8. ACCOMMODATION DISCOVERY
      ===================================================================== */}
      <section className="py-24 bg-[#EAE2D3] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {/* Culinary Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs uppercase tracking-widest text-[#B87D57] font-semibold">
                05. Gastronomy &amp; Hospitality
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif-editorial text-[#101716] leading-tight">
                A Table Set Beside the Khabur
              </h2>
              <p className="text-base text-[#101716]/80 leading-relaxed">
                From dawn clay ovens baking flaky Kahi and stone-milled Zakho tahini (Rashi u Dims)
                to evening charcoal samovars and wood-roasted river fish along the Corniche,
                dining in Zakho is an expression of generous Kurdish hospitality.
              </p>
              <div className="space-y-3 pt-2">
                {TRADITIONAL_DISHES.slice(0, 3).map((dish) => (
                  <div
                    key={dish.id}
                    className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-[#101716]">
                        {dish.name}
                      </h3>
                      <span className="text-xs text-[#B87D57] font-serif-editorial italic">
                        {dish.kurdishName}
                      </span>
                    </div>
                    <p className="text-xs text-[#101716]/75 mt-1 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  href="/food"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Food &amp; Dining Directory ({FOOD_VENUES.length} Venues)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Dining & Stay Split Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FOOD_VENUES.slice(0, 2).map((venue) => (
                <div
                  key={venue.id}
                  className="bg-[#F7F5EF] rounded-2xl overflow-hidden border border-[#101716]/10 flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-[#101716]">
                    <img
                      src={venue.photo.src}
                      alt={venue.photo.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#245D4D] font-medium">
                        {venue.category} · {venue.editorialStatus}
                      </p>
                      <h3 className="text-xl font-serif-editorial text-[#101716] mt-1">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-[#101716]/75 mt-1.5 leading-relaxed">
                        {venue.description}
                      </p>
                    </div>
                    <p className="text-[11px] font-mono-tabular text-[#101716]/60 pt-2 border-t border-[#101716]/10">
                      Hours: {venue.openingHours}
                    </p>
                  </div>
                </div>
              ))}

              {/* Accommodation Highlight Card spanning 2 cols */}
              <div className="sm:col-span-2 bg-[#142B2B] text-[#FAFAF7] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-lg">
                  <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                    Where to Stay in Zakho
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif-editorial">
                    Hotels, Serviced Suites &amp; Highland Retreats
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EAE2D3]/80 leading-relaxed">
                    Discover verified accommodation options across central Zakho, the international
                    boulevard, and surrounding foothill retreats—with honest facility notes and
                    direct map links.
                  </p>
                </div>
                <Link
                  href="/stay"
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-widest bg-[#8BBDB5] text-[#101716] hover:bg-[#EAE2D3] rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  Browse Stay Guide ({ACCOMMODATIONS.length})
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. CURATED TRAVEL ITINERARIES & TRIP PLANNER PREVIEW
      ===================================================================== */}
      <section className="py-24 bg-[#F7F5EF] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
                06. Build Your Journey
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif-editorial text-[#101716] mt-2">
                Curated Zakho Itineraries
              </h2>
              <p className="text-sm sm:text-base text-[#101716]/75 max-w-2xl mt-2">
                Select a ready-made route crafted from verified landmarks, or launch the
                interactive Zakho Travel Planner to customize every stop.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/itineraries"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider border border-[#142B2B] text-[#142B2B] hover:bg-[#142B2B] hover:text-white rounded-xl transition-colors"
              >
                All 7 Curated Journeys
              </Link>
              <Link
                href="/plan-your-trip"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider bg-[#245D4D] text-[#FAFAF7] hover:bg-[#142B2B] rounded-xl transition-colors"
              >
                Open Interactive Planner
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CURATED_ITINERARIES.slice(0, 3).map((itin) => (
              <div
                key={itin.id}
                className="rounded-2xl bg-[#EAE2D3]/75 border border-[#101716]/10 overflow-hidden flex flex-col justify-between shadow-sm"
              >
                <div className="relative h-52 bg-[#101716]">
                  <img
                    src={itin.photo.src}
                    alt={itin.photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101716]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FAFAF7] font-mono-tabular">
                    <span>
                      {itin.durationDays} {itin.durationDays === 1 ? 'Day' : 'Days'} · {itin.pace} Pace
                    </span>
                    <span>{itin.days.reduce((acc, d) => acc + d.stops.length, 0)} Verified Stops</span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif-editorial text-[#101716]">
                      {itin.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#101716]/75 leading-relaxed">
                      {itin.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#101716]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => loadCuratedItinerary(itin.slug)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] rounded-lg transition-colors"
                    >
                      Load into Planner
                    </button>
                    <Link
                      href="/plan-your-trip"
                      onClick={() => loadCuratedItinerary(itin.slug)}
                      className="text-xs font-semibold text-[#245D4D] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Customize Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. PRACTICAL VISITOR GUIDE & INTERACTIVE SEASONAL SELECTOR
      ===================================================================== */}
      <section className="py-24 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                07. Best Time to Visit &amp; Climate Rhythm
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif-editorial text-[#FAFAF7] mt-2">
                Four Seasons Along the Khabur
              </h2>
              <p className="text-sm text-[#EAE2D3]/80 max-w-xl mt-2">
                Long-term climate averages across Zakho City (440m) and the surrounding highland
                valleys (1,100m+). Select a season to inspect weather, attire, and photography
                conditions.
              </p>
            </div>

            {/* Interactive Seasonal Selector */}
            <div className="flex flex-wrap gap-2 bg-[#101716]/70 p-1.5 rounded-xl border border-white/10">
              {SEASONAL_GUIDE.map((season) => (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setSelectedSeasonId(season.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedSeasonId === season.id
                      ? 'bg-[#8BBDB5] text-[#101716] shadow'
                      : 'text-[#EAE2D3] hover:bg-white/10'
                  }`}
                >
                  {season.name} ({season.months})
                </button>
              ))}
            </div>
          </div>

          {/* Active Season Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl bg-[#101716]/60 border border-white/10 overflow-hidden">
            <div className="lg:col-span-5 relative min-h-[320px] bg-[#101716]">
              <img
                src={activeSeason.photo.src}
                alt={activeSeason.photo.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101716] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-[#EAE2D3]/90">
                <p className="font-semibold text-white">{activeSeason.signatureHighlight}</p>
                <p className="text-[11px] opacity-75 mt-0.5">
                  Photo: {activeSeason.photo.photographer} ({activeSeason.photo.license})
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#8BBDB5]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeSeason.months}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#B87D57]" />
                  Avg Temp: {activeSeason.avgTempRangeC}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-serif-editorial text-[#FAFAF7]">
                  {activeSeason.name} in Zakho — {activeSeason.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#EAE2D3]/85 mt-3 leading-relaxed">
                  {activeSeason.landscapeDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#8BBDB5] mb-2">
                    What to Pack
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#EAE2D3]/85">
                    {activeSeason.clothingRecommendations.map((rec, i) => (
                      <li key={i}>• {rec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#B87D57] mb-2">
                    Photography Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#EAE2D3]/85">
                    {activeSeason.photographyOpportunities.map((opp, i) => (
                      <li key={i}>• {opp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#EAE2D3]/60 italic">
                  Note: Figures represent long-term regional climate averages, not live telemetry.
                </span>
                <Link
                  href="/travel-guide"
                  className="text-xs font-semibold uppercase tracking-wider text-[#8BBDB5] hover:text-white inline-flex items-center gap-1.5"
                >
                  <span>Complete Visitor Essentials &amp; Visa Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. CINEMATIC PHOTOGRAPHY JOURNAL: "THE BEAUTY OF ZAKHO"
      ===================================================================== */}
      <section className="py-24 bg-[#101716] text-[#FAFAF7] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B87D57]">
                08. Documentary Visual Archive
              </p>
              <h2 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] mt-2 tracking-tight">
                THE BEAUTY OF ZAKHO.
              </h2>
              <p className="text-sm sm:text-base text-[#EAE2D3]/80 max-w-2xl mt-3">
                Authentic documentary photographs of Zakho’s limestone masonry, river currents,
                historic painting archives, and frontier mountain valleys.
              </p>
            </div>
            <Link
              href="/stories"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-widest border border-[#8BBDB5]/50 text-[#FAFAF7] hover:bg-[#8BBDB5] hover:text-[#101716] rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Editorial Stories &amp; Essays</span>
            </Link>
          </div>

          {/* Asymmetric Documentary Photography Monograph Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <figure className="md:col-span-8 space-y-2">
              <div className="h-80 sm:h-[440px] rounded-2xl overflow-hidden bg-[#142B2B] border border-white/10">
                <img
                  src={ZAKHO_PHOTO_CREDITS.piraDelalRiver.src}
                  alt={ZAKHO_PHOTO_CREDITS.piraDelalRiver.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs font-serif-editorial italic text-[#EAE2D3]/70 flex items-center justify-between">
                <span>Plate I — {ZAKHO_PHOTO_CREDITS.piraDelalRiver.caption}</span>
                <span className="not-italic font-mono-tabular text-[11px]">
                  {ZAKHO_PHOTO_CREDITS.piraDelalRiver.photographer} · {ZAKHO_PHOTO_CREDITS.piraDelalRiver.license}
                </span>
              </figcaption>
            </figure>

            <figure className="md:col-span-4 space-y-2">
              <div className="h-80 sm:h-[440px] rounded-2xl overflow-hidden bg-[#142B2B] border border-white/10">
                <img
                  src={ZAKHO_PHOTO_CREDITS.historicalPainting1888.src}
                  alt={ZAKHO_PHOTO_CREDITS.historicalPainting1888.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs font-serif-editorial italic text-[#EAE2D3]/70">
                Plate II — {ZAKHO_PHOTO_CREDITS.historicalPainting1888.caption}
              </figcaption>
            </figure>

            <figure className="md:col-span-4 space-y-2">
              <div className="h-72 rounded-2xl overflow-hidden bg-[#142B2B] border border-white/10">
                <img
                  src={ZAKHO_PHOTO_CREDITS.stoneMasonry.src}
                  alt={ZAKHO_PHOTO_CREDITS.stoneMasonry.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs font-serif-editorial italic text-[#EAE2D3]/70">
                Plate III — {ZAKHO_PHOTO_CREDITS.stoneMasonry.caption}
              </figcaption>
            </figure>

            <figure className="md:col-span-4 space-y-2">
              <div className="h-72 rounded-2xl overflow-hidden bg-[#142B2B] border border-white/10">
                <img
                  src={ZAKHO_PHOTO_CREDITS.winterPeaks.src}
                  alt={ZAKHO_PHOTO_CREDITS.winterPeaks.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs font-serif-editorial italic text-[#EAE2D3]/70">
                Plate IV — {ZAKHO_PHOTO_CREDITS.winterPeaks.caption}
              </figcaption>
            </figure>

            <figure className="md:col-span-4 space-y-2">
              <div className="h-72 rounded-2xl overflow-hidden bg-[#142B2B] border border-white/10">
                <img
                  src={ZAKHO_PHOTO_CREDITS.delalTwilight.src}
                  alt={ZAKHO_PHOTO_CREDITS.delalTwilight.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs font-serif-editorial italic text-[#EAE2D3]/70">
                Plate V — {ZAKHO_PHOTO_CREDITS.delalTwilight.caption}
              </figcaption>
            </figure>
          </div>

          {/* Editorial City Stories Preview Row */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EDITORIAL_STORIES.map((story) => (
              <Link
                key={story.id}
                href="/stories"
                className="p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex flex-col justify-between gap-4"
              >
                <div>
                  <p className="text-xs text-[#8BBDB5]">{story.category} · {story.readTimeMinutes} min read</p>
                  <h3 className="text-lg font-serif-editorial text-[#FAFAF7] mt-1.5 leading-snug">
                    {story.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#B87D57] inline-flex items-center gap-1">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. FINAL INVITATION TO VISIT ZAKHO
      ===================================================================== */}
      <section className="relative py-28 bg-[#245D4D] text-[#FAFAF7] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <ZakhoBrandEmblem className="w-12 h-12 text-[#8BBDB5] mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#EAE2D3] font-mono-tabular">
            The River is the Thread · The City is the Story · The Visitor is the Explorer
          </p>
          <h2 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] leading-tight [text-wrap:balance]">
            Begin Your Journey to Zakho
          </h2>
          <p className="text-base sm:text-lg text-[#EAE2D3]/90 max-w-2xl mx-auto leading-relaxed">
            Whether you are crossing the ancient stones of Pira Delal at sunset, tracing the
            mountain waters of Sharanish, or sharing cardamom tea in the historic island bazaar,
            Zakho welcomes you as an honored guest.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/plan-your-trip"
              className="px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-[#FAFAF7] text-[#101716] hover:bg-[#EAE2D3] rounded-xl transition-colors shadow-xl"
            >
              Launch Interactive Trip Planner
            </Link>
            <Link
              href="/travel-guide"
              className="px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-[#142B2B] text-[#FAFAF7] hover:bg-[#101716] rounded-xl transition-colors border border-white/20"
            >
              Read Practical Arrival Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
