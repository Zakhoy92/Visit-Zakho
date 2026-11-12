'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Share2,
  Printer,
  Download,
  Navigation,
  ExternalLink,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  DESTINATIONS,
  CURATED_ITINERARIES,
  DestinationCategory,
} from '@/lib/zakho-data';
import {
  generateItineraryFromPreferences,
  estimateRouteMetrics,
  encodeItineraryShareToken,
  decodeItineraryShareToken,
  PlannerPreferences,
} from '@/lib/planner-engine';
import { useZakho } from '@/components/ZakhoContext';

const ALL_CATEGORIES: DestinationCategory[] = [
  'Architectural Heritage',
  'Historical Sites',
  'Nature & Landscapes',
  'River & Outdoor Activities',
  'Culture & Traditions',
  'Markets & Shopping',
  'Family Experiences',
  'Nearby Excursions',
];

export default function PlanYourTripPage() {
  const {
    itineraryStops,
    addDestinationToItinerary,
    removeStopFromItinerary,
    reorderStop,
    updateStopDay,
    setFullItinerary,
    loadCuratedItinerary,
    clearItinerary,
    notify,
  } = useZakho();

  const [durationDays, setDurationDays] = useState<1 | 2 | 3>(2);
  const [pace, setPace] = useState<'Relaxed' | 'Balanced' | 'Immersive'>('Balanced');
  const [groupType, setGroupType] = useState<'Solo' | 'Couple' | 'Family' | 'Group'>('Couple');
  const [selectedCategories, setSelectedCategories] = useState<DestinationCategory[]>([
    'Architectural Heritage',
    'Nature & Landscapes',
    'Markets & Shopping',
  ]);
  const [includeDistrictExcursions, setIncludeDistrictExcursions] = useState(true);
  const [selectedAddSlug, setSelectedAddSlug] = useState(DESTINATIONS[0].slug);
  const [selectedAddDay, setSelectedAddDay] = useState<number>(1);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // Hydrate shared itinerary from URL ?trip= parameter if present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const sharedToken = params.get('trip');
    if (sharedToken) {
      const decoded = decodeItineraryShareToken(sharedToken, DESTINATIONS);
      if (decoded.length > 0) {
        setFullItinerary(decoded, 'Shared Zakho Itinerary Loaded');
      }
    }
  }, [setFullItinerary]);

  const toggleCategory = (cat: DestinationCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleGenerateSuggested = () => {
    const prefs: PlannerPreferences = {
      durationDays,
      pace,
      groupType,
      selectedCategories:
        selectedCategories.length > 0
          ? selectedCategories
          : ['Architectural Heritage', 'Nature & Landscapes'],
      includeDistrictExcursions,
    };
    const generated = generateItineraryFromPreferences(prefs, DESTINATIONS);
    setFullItinerary(
      generated,
      `Generated ${durationDays}-Day ${pace} Zakho Itinerary`
    );
  };

  const metrics = useMemo(
    () => estimateRouteMetrics(itineraryStops),
    [itineraryStops]
  );

  const handleCopyShareLink = () => {
    const token = encodeItineraryShareToken(itineraryStops);
    const shareUrl = `${window.location.origin}/plan-your-trip?trip=${encodeURIComponent(token)}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl);
    }
    setCopiedShareLink(true);
    notify('Shareable Itinerary Link Copied', shareUrl);
    setTimeout(() => setCopiedShareLink(false), 3000);
  };

  const handleExportJson = () => {
    const payload = {
      platform: 'Visit Zakho Official Travel Planner',
      exportedAt: new Date().toISOString(),
      metrics,
      stops: itineraryStops,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visit-zakho-itinerary-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Itinerary Exported', 'Downloaded clean JSON travel route.');
  };

  const googleMapsMultiStopUrl = useMemo(() => {
    if (itineraryStops.length === 0) return 'https://www.google.com/maps/place/Zakho';
    const origin = itineraryStops[0].coordinates;
    const dest = itineraryStops[itineraryStops.length - 1].coordinates;
    const waypoints = itineraryStops
      .slice(1, -1)
      .map((s) => `${s.coordinates.lat},${s.coordinates.lng}`)
      .join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${dest.lat},${dest.lng}${
      waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''
    }`;
  }, [itineraryStops]);

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part IV · Section 14 · Signature Interaction Three: Build Your Journey
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-3xl">
            The Zakho Interactive Travel Planner
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Configure your trip duration, travel pace, and interests to generate a tailored route
            using verified Zakho coordinates—or add, reorder, share, and export stops manually
            without needing an account.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 5 Columns: Trip Configuration Generator */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#EAE2D3] border border-[#101716]/10 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
                Step 1 · Configure Preferences
              </p>
              <h2 className="text-2xl font-serif-editorial text-[#101716] mt-1">
                Generate a Tailored Route
              </h2>
            </div>

            {/* Trip Duration */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75">
                Trip Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([1, 2, 3] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDurationDays(d)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors ${
                      durationDays === d
                        ? 'bg-[#142B2B] text-[#FAFAF7]'
                        : 'bg-[#F7F5EF] text-[#101716] hover:bg-white'
                    }`}
                  >
                    {d === 1 ? '1 Day (City)' : d === 2 ? '2 Days (Weekend)' : '3 Days (Full)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Pace */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75">
                Preferred Travel Pace
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Relaxed', 'Balanced', 'Immersive'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPace(p)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors ${
                      pace === p
                        ? 'bg-[#245D4D] text-[#FAFAF7]'
                        : 'bg-[#F7F5EF] text-[#101716] hover:bg-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Group Type */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75">
                Travel Party
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Solo', 'Couple', 'Family', 'Group'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroupType(g)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
                      groupType === g
                        ? 'bg-[#142B2B] text-[#FAFAF7]'
                        : 'bg-[#F7F5EF] text-[#101716] hover:bg-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Multi-Select */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75">
                Preferred Destination Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        active
                          ? 'bg-[#245D4D] text-[#FAFAF7]'
                          : 'bg-[#F7F5EF] text-[#101716]/75 hover:bg-white'
                      }`}
                    >
                      {active ? `✓ ${cat}` : cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Include District Excursions Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F5EF] border border-[#101716]/10">
              <div>
                <p className="text-xs font-semibold text-[#101716]">
                  Include Wider Zakho District Excursions
                </p>
                <p className="text-[11px] text-[#101716]/65">
                  Adds Sharanish Waterfall, Mount Bekhair, or Keste Valley
                </p>
              </div>
              <input
                type="checkbox"
                checked={includeDistrictExcursions}
                onChange={(e) => setIncludeDistrictExcursions(e.target.checked)}
                aria-label="Include Wider Zakho District Excursions"
                className="w-4 h-4 accent-[#245D4D]"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerateSuggested}
              className="w-full py-4 px-6 rounded-xl bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] text-xs font-semibold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#8BBDB5]" />
              <span>Generate Suggested Itinerary</span>
            </button>
          </div>

          {/* Preset Templates Selector */}
          <div className="p-6 rounded-3xl bg-white border border-[#101716]/10 space-y-4">
            <h3 className="text-lg font-serif-editorial font-semibold">
              Or Load a Curated Zakho Template
            </h3>
            <div className="space-y-2">
              {CURATED_ITINERARIES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => loadCuratedItinerary(preset.slug)}
                  className="w-full text-left p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#EAE2D3] transition-colors flex items-center justify-between gap-2"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#101716]">{preset.title}</p>
                    <p className="text-[11px] text-[#101716]/65">
                      {preset.durationDays} {preset.durationDays === 1 ? 'Day' : 'Days'} ·{' '}
                      {preset.pace}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#245D4D] shrink-0">Load →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Active Itinerary Workspace & Route Metrics */}
        <div className="lg:col-span-7 space-y-8">
          {/* Route Telemetry & Action Bar */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#142B2B] text-[#FAFAF7] space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                  Active Zakho Route Workspace
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif-editorial mt-1">
                  Your Custom Travel Sequence ({metrics.totalStops} Stops)
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="px-3.5 py-2 rounded-lg bg-[#8BBDB5] text-[#101716] hover:bg-[#EAE2D3] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedShareLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAFAF7] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAFAF7] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Verified Route Metrics */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tabular">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <dt className="text-[11px] uppercase text-[#8BBDB5]">Zakho City Stops</dt>
                <dd className="text-xl font-bold mt-1">{metrics.cityStopsCount}</dd>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <dt className="text-[11px] uppercase text-[#B87D57]">District Excursions</dt>
                <dd className="text-xl font-bold mt-1">{metrics.districtStopsCount}</dd>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <dt className="text-[11px] uppercase text-[#8BBDB5]">Est. Road Distance</dt>
                <dd className="text-xl font-bold mt-1">{metrics.estimatedRoadDistanceKm} km</dd>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <dt className="text-[11px] uppercase text-[#8BBDB5]">Est. Transit Time</dt>
                <dd className="text-xl font-bold mt-1">~{metrics.estimatedTotalDriveMinutes} min</dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <a
                href={googleMapsMultiStopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-[#8BBDB5] hover:text-white inline-flex items-center gap-1.5"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Complete Multi-Stop Route in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/map"
                className="text-xs font-semibold uppercase tracking-wider text-[#EAE2D3] hover:text-white inline-flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-[#B87D57]" />
                <span>Visualize Route on Zakho Map</span>
              </Link>
            </div>
          </div>

          {/* Add Individual Destination Control */}
          <div className="p-5 rounded-2xl bg-white border border-[#101716]/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={selectedAddSlug}
              onChange={(e) => setSelectedAddSlug(e.target.value)}
              aria-label="Select a destination to add to itinerary"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-xs font-semibold text-[#101716]"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.slug}>
                  {d.name} ({d.geographicScope} · {d.recommendedDuration})
                </option>
              ))}
            </select>

            <select
              value={selectedAddDay}
              onChange={(e) => setSelectedAddDay(Number(e.target.value))}
              aria-label="Select day number"
              className="px-3.5 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-xs font-semibold text-[#101716]"
            >
              <option value={1}>Day 1</option>
              <option value={2}>Day 2</option>
              <option value={3}>Day 3</option>
            </select>

            <button
              type="button"
              onClick={() => addDestinationToItinerary(selectedAddSlug, selectedAddDay)}
              className="px-5 py-2.5 rounded-xl bg-[#245D4D] text-[#FAFAF7] hover:bg-[#142B2B] text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stop</span>
            </button>
          </div>

          {/* Interactive Stop List */}
          {itineraryStops.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#EAE2D3]/60 border border-[#101716]/10 text-center space-y-4">
              <h3 className="text-2xl font-serif-editorial">Your Zakho Itinerary is Empty</h3>
              <p className="text-sm text-[#101716]/75 max-w-md mx-auto">
                Click &ldquo;Generate Suggested Itinerary&rdquo; on the left or add individual
                landmarks above to begin crafting your route.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {itineraryStops.map((stop, idx) => (
                <div
                  key={stop.stopId}
                  className="p-5 rounded-2xl bg-white border border-[#101716]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
                      <span className="px-2 py-0.5 rounded bg-[#142B2B] text-[#FAFAF7] font-bold">
                        Stop {String(idx + 1).padStart(2, '0')}
                      </span>
                      <select
                        value={stop.dayNumber}
                        onChange={(e) =>
                          updateStopDay(stop.stopId, Number(e.target.value))
                        }
                        aria-label={`Change day for ${stop.destinationName}`}
                        className="px-2 py-0.5 rounded bg-[#EAE2D3] text-[#101716] font-semibold"
                      >
                        <option value={1}>Day 1</option>
                        <option value={2}>Day 2</option>
                        <option value={3}>Day 3</option>
                      </select>
                      <span className="text-[#245D4D] font-semibold">
                        {stop.geographicScope}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#101716]/65">{stop.recommendedDuration}</span>
                    </div>

                    <Link
                      href={`/places/${stop.destinationSlug}`}
                      className="text-xl font-serif-editorial font-semibold text-[#101716] hover:text-[#245D4D] block"
                    >
                      {stop.destinationName}
                    </Link>

                    <p className="text-xs text-[#101716]/75 leading-relaxed">
                      {stop.customNote}
                    </p>
                  </div>

                  {/* Reorder & Remove Controls */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => reorderStop(idx, 'up')}
                      aria-label={`Move ${stop.destinationName} up`}
                      className="p-2 rounded-lg border border-[#101716]/15 hover:bg-[#EAE2D3] disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === itineraryStops.length - 1}
                      onClick={() => reorderStop(idx, 'down')}
                      aria-label={`Move ${stop.destinationName} down`}
                      className="p-2 rounded-lg border border-[#101716]/15 hover:bg-[#EAE2D3] disabled:opacity-30"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStopFromItinerary(stop.stopId)}
                      aria-label={`Remove ${stop.destinationName} from itinerary`}
                      className="p-2 rounded-lg border border-red-800/20 text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-[#101716]/60 italic">
                  Note: Travel durations are estimates based on standard road conditions. Always
                  verify local opening hours on arrival.
                </p>
                <button
                  type="button"
                  onClick={clearItinerary}
                  className="text-xs font-semibold text-red-800 hover:underline"
                >
                  Clear All Stops
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
