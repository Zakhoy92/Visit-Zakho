'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Navigation,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Plus,
  Check,
  ExternalLink,
  Compass,
  MapPin,
} from 'lucide-react';
import {
  DESTINATIONS,
  FOOD_VENUES,
  ACCOMMODATIONS,
} from '@/lib/zakho-data';
import { useZakho } from './ZakhoContext';

export type MapLayerCategory =
  | 'All'
  | 'Historical & Architectural'
  | 'Nature & River'
  | 'Restaurants & Cafes'
  | 'Accommodation'
  | 'Markets & Culture';

interface UnifiedMapMarker {
  id: string;
  title: string;
  subtitle: string;
  layer: Exclude<MapLayerCategory, 'All'>;
  scope: 'Zakho City' | 'Wider Zakho District';
  lat: number;
  lng: number;
  description: string;
  imageSrc: string;
  imageAlt: string;
  photographer: string;
  detailHref: string;
  destinationSlug?: string;
  verificationLabel: string;
}

/**
 * Geographic bounds covering Zakho City & Wider Zakho District:
 * Lat: 37.06° N (Bekhair South) to 37.28° N (Sharanish North)
 * Lng: 42.54° E (Ibrahim Khalil West) to 43.08° E (Keste East)
 */
const CITY_VIEW_BOUNDS = {
  minLat: 37.136,
  maxLat: 37.156,
  minLng: 42.662,
  maxLng: 42.705,
};

const DISTRICT_VIEW_BOUNDS = {
  minLat: 37.07,
  maxLat: 37.28,
  minLng: 42.54,
  maxLng: 43.08,
};

export function ZakhoInteractiveMap({
  initialView = 'district',
  compact = false,
}: {
  initialView?: 'city' | 'district';
  compact?: boolean;
}) {
  const { addDestinationToItinerary, isDestinationSaved, itineraryStops } = useZakho();
  const [activeLayer, setActiveLayer] = useState<MapLayerCategory>('All');
  const [viewScope, setViewScope] = useState<'city' | 'district'>(initialView);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showItineraryRoute, setShowItineraryRoute] = useState(true);

  const allMarkers: UnifiedMapMarker[] = useMemo(() => {
    const destMarkers: UnifiedMapMarker[] = DESTINATIONS.map((d) => ({
      id: d.id,
      title: d.name,
      subtitle: `${d.category} · ${d.geographicScope}`,
      layer:
        d.category === 'Historical Sites' || d.category === 'Architectural Heritage'
          ? 'Historical & Architectural'
          : d.category === 'Nature & Landscapes' || d.category === 'River & Outdoor Activities'
          ? 'Nature & River'
          : 'Markets & Culture',
      scope: d.geographicScope,
      lat: d.coordinates.lat,
      lng: d.coordinates.lng,
      description: d.shortSummary,
      imageSrc: d.heroPhoto.src,
      imageAlt: d.heroPhoto.alt,
      photographer: d.heroPhoto.photographer,
      detailHref: `/places/${d.slug}`,
      destinationSlug: d.slug,
      verificationLabel: d.verificationStatus,
    }));

    const foodMarkers: UnifiedMapMarker[] = FOOD_VENUES.map((f) => ({
      id: f.id,
      title: f.name,
      subtitle: `${f.category} · ${f.neighborhood}`,
      layer: 'Restaurants & Cafes',
      scope: f.geographicScope,
      lat: f.coordinates.lat,
      lng: f.coordinates.lng,
      description: f.description,
      imageSrc: f.photo.src,
      imageAlt: f.photo.alt,
      photographer: f.photo.photographer,
      detailHref: '/food',
      verificationLabel: f.editorialStatus,
    }));

    const stayMarkers: UnifiedMapMarker[] = ACCOMMODATIONS.map((a) => ({
      id: a.id,
      title: a.name,
      subtitle: `${a.category} · ${a.locationArea}`,
      layer: 'Accommodation',
      scope: a.geographicScope,
      lat: a.coordinates.lat,
      lng: a.coordinates.lng,
      description: a.description,
      imageSrc: a.photo.src,
      imageAlt: a.photo.alt,
      photographer: a.photo.photographer,
      detailHref: '/stay',
      verificationLabel: a.verificationStatus,
    }));

    return [...destMarkers, ...foodMarkers, ...stayMarkers];
  }, []);

  const filteredMarkers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allMarkers.filter((m) => {
      if (viewScope === 'city' && m.scope !== 'Zakho City') return false;
      if (activeLayer !== 'All' && m.layer !== activeLayer) return false;
      if (q && !`${m.title} ${m.subtitle} ${m.description}`.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [allMarkers, viewScope, activeLayer, searchTerm]);

  const [selectedMarkerId, setSelectedMarkerId] = useState<string>('dest-delal-bridge');

  const selectedMarker = useMemo(
    () =>
      filteredMarkers.find((m) => m.id === selectedMarkerId) ||
      filteredMarkers[0] ||
      allMarkers[0],
    [filteredMarkers, selectedMarkerId, allMarkers]
  );

  const bounds = viewScope === 'city' ? CITY_VIEW_BOUNDS : DISTRICT_VIEW_BOUNDS;

  const projectCoord = React.useCallback(
    (lat: number, lng: number) => {
      const xNorm = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng);
      const yNorm = 1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
      const x = Math.max(6, Math.min(94, xNorm * 84 + 8));
      const y = Math.max(8, Math.min(92, yNorm * 80 + 10));
      return { x, y };
    },
    [bounds.minLng, bounds.maxLng, bounds.minLat, bounds.maxLat]
  );

  const routePoints = useMemo(() => {
    if (!showItineraryRoute || itineraryStops.length < 2) return '';
    return itineraryStops
      .filter((s) => (viewScope === 'city' ? s.geographicScope === 'Zakho City' : true))
      .map((s) => {
        const pt = projectCoord(s.coordinates.lat, s.coordinates.lng);
        return `${pt.x * 10},${pt.y * 5.6}`;
      })
      .join(' ');
  }, [showItineraryRoute, itineraryStops, viewScope, projectCoord]);

  return (
    <div className="bg-[#142B2B] text-[#FAFAF7] rounded-2xl border border-[#8BBDB5]/25 overflow-hidden shadow-2xl">
      {/* Top Map Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#101716]/60">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setViewScope('city')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              viewScope === 'city'
                ? 'bg-[#8BBDB5] text-[#101716]'
                : 'bg-white/10 text-[#EAE2D3] hover:bg-white/15'
            }`}
          >
            Zakho City Core (Zoomed)
          </button>
          <button
            type="button"
            onClick={() => setViewScope('district')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              viewScope === 'district'
                ? 'bg-[#8BBDB5] text-[#101716]'
                : 'bg-white/10 text-[#EAE2D3] hover:bg-white/15'
            }`}
          >
            Wider Zakho District & Mountains
          </button>
          <button
            type="button"
            onClick={() => setShowItineraryRoute((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showItineraryRoute
                ? 'border-[#B87D57] bg-[#B87D57]/20 text-[#FAFAF7]'
                : 'border-white/15 text-[#EAE2D3]/70'
            }`}
          >
            {showItineraryRoute ? 'Showing Active Trip Route' : 'Show Trip Route'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter map markers..."
            aria-label="Filter map markers by location name"
            className="px-3 py-1.5 text-xs bg-white/10 border border-white/15 rounded-lg text-[#FAFAF7] placeholder-[#EAE2D3]/50 focus:outline-none focus:border-[#8BBDB5]"
          />
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.6, +(z + 0.2).toFixed(1)))}
              aria-label="Zoom in map"
              className="p-1.5 hover:bg-white/15 rounded text-[#EAE2D3]"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.8, +(z - 0.2).toFixed(1)))}
              aria-label="Zoom out map"
              className="p-1.5 hover:bg-white/15 rounded text-[#EAE2D3]"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setZoomLevel(1);
                setActiveLayer('All');
                setSearchTerm('');
              }}
              aria-label="Reset map view"
              className="p-1.5 hover:bg-white/15 rounded text-[#EAE2D3]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-4 sm:px-5 py-3 bg-[#142B2B] border-b border-white/10 flex items-center gap-2 overflow-x-auto">
        {(
          [
            'All',
            'Historical & Architectural',
            'Nature & River',
            'Restaurants & Cafes',
            'Accommodation',
            'Markets & Culture',
          ] as MapLayerCategory[]
        ).map((layer) => (
          <button
            key={layer}
            type="button"
            onClick={() => setActiveLayer(layer)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeLayer === layer
                ? 'bg-[#245D4D] text-[#FAFAF7] border border-[#8BBDB5]/50'
                : 'text-[#EAE2D3]/75 hover:text-white hover:bg-white/5'
            }`}
          >
            {layer}
          </button>
        ))}
      </div>

      {/* Main Split: Interactive Geographic Canvas + Glassmorphic Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left/Center Geographic Canvas */}
        <div
          className={`lg:col-span-8 relative overflow-hidden bg-[#0E1F1F] ${
            compact ? 'min-h-[420px]' : 'min-h-[540px]'
          }`}
        >
          <div
            className="w-full h-full transition-transform duration-300 origin-center relative"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Topographic Contours, Khabur River Course & Geographic Boundaries SVG */}
            <svg
              viewBox="0 0 1000 560"
              className="w-full h-full object-cover"
              aria-label="Geographic coordinate map of Zakho City and Wider Zakho District"
            >
              <defs>
                <radialGradient id="zakhoBasinGlow" cx="45%" cy="52%" r="55%">
                  <stop offset="0%" stopColor="#245D4D" stopOpacity="0.32" />
                  <stop offset="60%" stopColor="#142B2B" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0E1F1F" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="coordGrid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="#8BBDB5"
                    strokeWidth="0.5"
                    strokeOpacity="0.12"
                  />
                </pattern>
              </defs>

              <rect width="1000" height="560" fill="url(#coordGrid)" />
              <rect width="1000" height="560" fill="url(#zakhoBasinGlow)" />

              {/* Northern Frontier Mountain Contours */}
              <path
                d="M 40 120 Q 260 65, 520 95 T 960 70"
                fill="none"
                stroke="#EAE2D3"
                strokeWidth="1"
                strokeOpacity="0.18"
                strokeDasharray="4 6"
              />
              <text
                x="620"
                y="62"
                fill="#8BBDB5"
                fillOpacity="0.55"
                fontSize="11"
                letterSpacing="2"
              >
                NORTHERN HIGHLAND FRONTIER · SHARANISH &amp; DARKAR PEAKS
              </text>

              {/* Southern Chia-ye Spi (Bekhair / White Mountains) Ridge */}
              <path
                d="M 60 470 Q 340 430, 560 465 T 940 450"
                fill="none"
                stroke="#B87D57"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
              <text
                x="240"
                y="505"
                fill="#B87D57"
                fillOpacity="0.7"
                fontSize="11"
                letterSpacing="2"
              >
                ÇIYAYÊ SPÎ (BEKHAIR / WHITE MOUNTAINS ANTICLINE · 890m)
              </text>

              {/* Zakho City Municipal Boundary Ring */}
              {viewScope === 'district' && (
                <g>
                  <ellipse
                    cx="325"
                    cy="335"
                    rx="145"
                    ry="78"
                    fill="#245D4D"
                    fillOpacity="0.15"
                    stroke="#8BBDB5"
                    strokeWidth="1.2"
                    strokeDasharray="5 5"
                  />
                  <text
                    x="255"
                    y="248"
                    fill="#8BBDB5"
                    fontSize="10"
                    letterSpacing="1.5"
                  >
                    ZAKHO CITY MUNICIPAL BOUNDARY
                  </text>
                </g>
              )}

              {/* The Little Khabur River Path (With Historic Island Bifurcation) */}
              <path
                d="M 880 85 C 740 160, 620 240, 460 310 C 390 335, 310 340, 220 335 C 140 330, 80 330, 20 340"
                fill="none"
                stroke="#8BBDB5"
                strokeWidth="6"
                strokeOpacity="0.28"
                strokeLinecap="round"
              />
              <path
                d="M 880 85 C 740 160, 620 240, 460 310 C 390 335, 310 340, 220 335 C 140 330, 80 330, 20 340"
                fill="none"
                stroke="#8BBDB5"
                strokeWidth="2.2"
                strokeOpacity="0.85"
                strokeLinecap="round"
              />
              {/* Southern Island Branch of Khabur */}
              <path
                d="M 430 318 C 365 365, 295 365, 235 335"
                fill="none"
                stroke="#8BBDB5"
                strokeWidth="2"
                strokeOpacity="0.75"
              />
              <text
                x="490"
                y="292"
                fill="#8BBDB5"
                fontSize="11"
                fontStyle="italic"
              >
                Little Khabur River (Ava Xabîr)
              </text>

              {/* Active Trip Route Polyline */}
              {routePoints && (
                <polyline
                  points={routePoints}
                  fill="none"
                  stroke="#B87D57"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
              )}
            </svg>

            {/* Interactive HTML Markers Overlaid on Exact Projected Coordinates */}
            {filteredMarkers.map((marker) => {
              const pos = projectCoord(marker.lat, marker.lng);
              const isSelected = selectedMarker?.id === marker.id;
              const isSaved =
                marker.destinationSlug && isDestinationSaved(marker.destinationSlug);

              const badgeColor =
                marker.layer === 'Historical & Architectural'
                  ? 'bg-[#B87D57] text-[#101716]'
                  : marker.layer === 'Nature & River'
                  ? 'bg-[#245D4D] text-[#FAFAF7]'
                  : marker.layer === 'Restaurants & Cafes'
                  ? 'bg-[#EAE2D3] text-[#101716]'
                  : marker.layer === 'Accommodation'
                  ? 'bg-[#8BBDB5] text-[#101716]'
                  : 'bg-[#FAFAF7] text-[#101716]';

              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => setSelectedMarkerId(marker.id)}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  aria-label={`Select map location ${marker.title}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 focus:outline-none ${
                    isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-105'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border transition-all ${badgeColor} ${
                      isSelected
                        ? 'ring-4 ring-[#8BBDB5]/50 border-white font-bold'
                        : 'border-black/20 opacity-90 hover:opacity-100'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] whitespace-nowrap max-w-[130px] truncate">
                      {marker.title.split('(')[0].trim()}
                    </span>
                    {isSaved && (
                      <Check className="w-3 h-3 shrink-0" aria-label="In itinerary" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Coordinate & Boundary Legend Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl glass-river-dark text-[11px] text-[#EAE2D3]/85 pointer-events-none">
            <span>
              Viewing: <strong className="text-white">{viewScope === 'city' ? 'Zakho City Core' : 'Zakho City + Wider Zakho District'}</strong> ({filteredMarkers.length} verified markers)
            </span>
            <span className="font-mono-tabular">
              Selected GPS: {selectedMarker?.lat.toFixed(4)}° N, {selectedMarker?.lng.toFixed(4)}° E
            </span>
          </div>
        </div>

        {/* Right Column: Selected Marker Glassmorphic Information Panel */}
        <div className="lg:col-span-4 bg-[#142B2B] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-between">
          {selectedMarker ? (
            <div className="space-y-5">
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-[#101716] border border-white/10">
                <img
                  src={selectedMarker.imageSrc}
                  alt={selectedMarker.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101716] via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-[#EAE2D3]/90">
                  <span>{selectedMarker.scope}</span>
                  <span>Photo: {selectedMarker.photographer}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-[#8BBDB5]">
                  <span>{selectedMarker.layer}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedMarker.verificationLabel}</span>
                </div>
                <h3 className="text-2xl font-serif-editorial text-[#FAFAF7] mt-1">
                  {selectedMarker.title}
                </h3>
                <p className="text-xs font-mono-tabular text-[#EAE2D3]/70 mt-1">
                  Coordinates: {selectedMarker.lat.toFixed(4)}° N, {selectedMarker.lng.toFixed(4)}° E
                </p>
                <p className="text-sm text-[#EAE2D3]/85 mt-3 leading-relaxed">
                  {selectedMarker.description}
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={selectedMarker.detailHref}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#8BBDB5] text-[#101716] hover:bg-[#EAE2D3] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Compass className="w-4 h-4" />
                    Explore Page
                  </Link>

                  {selectedMarker.destinationSlug && (
                    <button
                      type="button"
                      onClick={() =>
                        addDestinationToItinerary(selectedMarker.destinationSlug!, 1)
                      }
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider border border-[#8BBDB5]/50 text-[#FAFAF7] hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
                    >
                      {isDestinationSaved(selectedMarker.destinationSlug) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#8BBDB5]" />
                          In Trip
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          Save Stop
                        </>
                      )}
                    </button>
                  )}
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#EAE2D3] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#8BBDB5]" />
                  Open Directions in Google Maps
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          ) : null}

          {/* Accessible Quick-Select Marker List */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-[#8BBDB5] mb-2.5">
              Quick-Select Verified Coordinates
            </p>
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
              {filteredMarkers.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMarkerId(m.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                    selectedMarker?.id === m.id
                      ? 'bg-[#245D4D] text-white font-semibold'
                      : 'text-[#EAE2D3]/80 hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">{m.title}</span>
                  <span className="text-[10px] font-mono-tabular opacity-75 shrink-0 ml-2">
                    {m.scope === 'Zakho City' ? 'City' : 'District'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
