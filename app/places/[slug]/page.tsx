'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin,
  Clock,
  Navigation,
  Plus,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Accessibility,
  ExternalLink,
} from 'lucide-react';
import {
  DESTINATIONS,
  FOOD_VENUES,
  ACCOMMODATIONS,
} from '@/lib/zakho-data';
import { useZakho } from '@/components/ZakhoContext';

export default function PlaceDetailPage() {
  const params = useParams<{ slug?: string }>();
  const slug = typeof params?.slug === 'string' ? params.slug : DESTINATIONS[0].slug;
  const { addDestinationToItinerary, isDestinationSaved } = useZakho();

  const destination =
    DESTINATIONS.find((d) => d.slug === slug) || DESTINATIONS[0];

  const relatedPlaces = DESTINATIONS.filter((d) =>
    destination.relatedDestinationSlugs.includes(d.slug)
  );
  const nearbyFood = FOOD_VENUES.filter((f) =>
    destination.nearbyFoodIds.includes(f.id)
  );
  const nearbyStay = ACCOMMODATIONS.filter((a) =>
    destination.nearbyStayIds.includes(a.id)
  );

  const saved = isDestinationSaved(destination.slug);

  return (
    <div className="w-full bg-[#F7F5EF] text-[#101716]">
      {/* Large Hero Photograph */}
      <section className="relative min-h-[70vh] flex flex-col justify-end bg-[#101716] text-[#FAFAF7] pt-32 pb-14">
        <div className="absolute inset-0">
          <img
            src={destination.heroPhoto.src}
            alt={destination.heroPhoto.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101716] via-[#101716]/60 to-[#101716]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full space-y-5">
          <Link
            href="/places"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8BBDB5] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Zakho Places</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#EAE2D3]">
            <span className="font-semibold text-[#8BBDB5]">
              {destination.geographicScope}
            </span>
            <span aria-hidden="true">·</span>
            <span>{destination.category}</span>
            <span aria-hidden="true">·</span>
            <span>{destination.kurdishName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">
              {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-editorial text-[#FAFAF7] max-w-4xl leading-[1.03]">
            {destination.name}
          </h1>

          <p className="text-base sm:text-lg text-[#EAE2D3]/90 max-w-3xl leading-relaxed">
            {destination.shortSummary}
          </p>

          {/* Action Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  addDestinationToItinerary(
                    destination.slug,
                    destination.geographicScope === 'Zakho City' ? 1 : 2
                  )
                }
                className="px-6 py-3.5 rounded-xl bg-[#8BBDB5] text-[#101716] hover:bg-[#EAE2D3] text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2 transition-colors"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved in Trip Planner</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Save to Itinerary</span>
                  </>
                )}
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${destination.coordinates.lat},${destination.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl glass-river-dark text-[#FAFAF7] hover:bg-white/15 text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#8BBDB5]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </a>

              <Link
                href="/map"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAFAF7] text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                Inspect on Interactive Map
              </Link>
            </div>

            <p className="text-xs text-[#EAE2D3]/70 font-mono-tabular">
              Hero Photo: {destination.heroPhoto.photographer} ({destination.heroPhoto.license})
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split: Editorial History & Visitor Guidance */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left 7 Columns: Deep Narrative */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif-editorial text-[#101716]">
              Overview &amp; Sense of Place
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              {destination.overview}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#101716]/10">
            <h2 className="text-3xl font-serif-editorial text-[#101716]">
              Historical &amp; Cultural Significance
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              {destination.historicalSignificance}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#101716]/10">
            <h2 className="text-3xl font-serif-editorial text-[#101716]">
              Architecture &amp; Environmental Setting
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              {destination.architectureAndSetting}
            </p>
          </div>

          {/* Visitor Guidance List */}
          <div className="p-7 rounded-2xl bg-[#EAE2D3] border border-[#101716]/10 space-y-4">
            <h3 className="text-2xl font-serif-editorial text-[#101716]">
              Practical Visitor Guidance
            </h3>
            <ul className="space-y-3 text-sm text-[#101716]/85">
              {destination.visitorGuidance.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono-tabular text-xs font-bold text-[#245D4D] mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentary Photo Gallery */}
          <div className="space-y-4 pt-6">
            <h3 className="text-2xl font-serif-editorial text-[#101716]">
              Documentary Photography Gallery ({destination.gallery.length} Plates)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {destination.gallery.map((img, i) => (
                <figure
                  key={i}
                  className="rounded-xl overflow-hidden bg-[#EAE2D3] border border-[#101716]/10 flex flex-col justify-between"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-52 object-cover"
                  />
                  <figcaption className="p-3.5 text-xs text-[#101716]/75 space-y-1">
                    <p className="font-serif-editorial italic">{img.caption}</p>
                    <p className="font-mono-tabular text-[11px] text-[#245D4D]">
                      Photo: {img.photographer} · {img.license} ({img.source})
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Fact Sheet, Coordinates, Accessibility & Nearby */}
        <aside className="lg:col-span-5 space-y-8">
          <div className="p-7 rounded-2xl bg-[#142B2B] text-[#FAFAF7] space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                  Verified Visitor Dossier
                </p>
                <h3 className="text-xl font-serif-editorial mt-0.5">
                  Location &amp; Logistics
                </h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#8BBDB5]" />
            </div>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8BBDB5]">
                  Geographic Scope
                </dt>
                <dd className="font-semibold mt-0.5">{destination.geographicScope}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8BBDB5]">
                  Verified Coordinates &amp; Elevation
                </dt>
                <dd className="font-mono-tabular mt-0.5">
                  {destination.coordinates.lat.toFixed(4)}° N,{' '}
                  {destination.coordinates.lng.toFixed(4)}° E ·{' '}
                  {destination.coordinates.elevationMeters}m ASL
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8BBDB5]">
                  Distance &amp; Estimated Travel Time from Zakho Center
                </dt>
                <dd className="font-mono-tabular mt-0.5">
                  {destination.distanceFromCenterKm} km (~{destination.estimatedDriveMinutes} mins
                  by vehicle)
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8BBDB5]">
                  Recommended Visit Duration
                </dt>
                <dd className="mt-0.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B87D57]" />
                  <span>{destination.recommendedDuration}</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8BBDB5]">
                  Best Time of Day
                </dt>
                <dd className="mt-0.5">{destination.bestTimeOfDay}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8BBDB5]">
                  Opening Hours &amp; Admission
                </dt>
                <dd className="mt-0.5 text-xs text-[#EAE2D3]/85 leading-relaxed">
                  {destination.openingHoursNote} · {destination.admissionNote}
                </dd>
              </div>
              <div className="pt-3 border-t border-white/10">
                <dt className="text-xs uppercase tracking-wider text-[#8BBDB5] flex items-center gap-1.5">
                  <Accessibility className="w-4 h-4" />
                  <span>Accessibility Assessment</span>
                </dt>
                <dd className="mt-1 text-xs text-[#EAE2D3]/85 leading-relaxed">
                  {destination.accessibilityNote}
                </dd>
              </div>
              <div className="pt-3 border-t border-white/10 text-[11px] text-[#EAE2D3]/65 font-mono-tabular">
                <p>Status: {destination.verificationStatus}</p>
                <p className="mt-0.5">Last Verified: {destination.lastVerified}</p>
                <p className="mt-1">{destination.historicalSourceNote}</p>
              </div>
            </dl>
          </div>

          {/* Nearby Food & Dining */}
          {nearbyFood.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#EAE2D3]/70 border border-[#101716]/10 space-y-4">
              <h3 className="text-xl font-serif-editorial text-[#101716]">
                Nearby Food &amp; Tea Terraces
              </h3>
              <div className="space-y-3">
                {nearbyFood.map((f) => (
                  <div
                    key={f.id}
                    className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 space-y-1"
                  >
                    <p className="text-sm font-semibold text-[#101716]">{f.name}</p>
                    <p className="text-xs text-[#245D4D]">{f.cuisineType}</p>
                    <p className="text-xs text-[#101716]/70">{f.neighborhood}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/food"
                className="text-xs font-semibold uppercase tracking-wider text-[#245D4D] hover:underline inline-flex items-center gap-1"
              >
                <span>Open Full Food &amp; Dining Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Nearby Accommodation */}
          {nearbyStay.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#EAE2D3]/70 border border-[#101716]/10 space-y-4">
              <h3 className="text-xl font-serif-editorial text-[#101716]">
                Nearby Accommodation Options
              </h3>
              <div className="space-y-3">
                {nearbyStay.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 space-y-1"
                  >
                    <p className="text-sm font-semibold text-[#101716]">{s.name}</p>
                    <p className="text-xs text-[#B87D57]">{s.category}</p>
                    <p className="text-xs text-[#101716]/70">
                      {s.distanceFromDelalKm} km from Delal Bridge
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/stay"
                className="text-xs font-semibold uppercase tracking-wider text-[#245D4D] hover:underline inline-flex items-center gap-1"
              >
                <span>Open Accommodation Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Related Places */}
          {relatedPlaces.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#EAE2D3]/70 border border-[#101716]/10 space-y-4">
              <h3 className="text-xl font-serif-editorial text-[#101716]">
                Related Attractions to Pair With This Stop
              </h3>
              <div className="space-y-3">
                {relatedPlaces.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/places/${rel.slug}`}
                    className="block p-4 rounded-xl bg-[#F7F5EF] hover:bg-white border border-[#101716]/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#101716]">{rel.name}</p>
                      <ArrowRight className="w-4 h-4 text-[#245D4D]" />
                    </div>
                    <p className="text-xs text-[#101716]/65 mt-1">
                      {rel.geographicScope} · {rel.recommendedDuration}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
