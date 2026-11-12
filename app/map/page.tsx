import React from 'react';
import Link from 'next/link';
import { ZakhoInteractiveMap } from '@/components/ZakhoInteractiveMap';
import { DESTINATIONS } from '@/lib/zakho-data';
import { ArrowRight, Compass, ExternalLink } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="w-full min-h-screen bg-[#101716] text-[#FAFAF7] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
              Part IV · Section 10 · Interactive Explore Map
            </p>
            <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7]">
              Geographical Explorer of Zakho
            </h1>
            <p className="text-sm sm:text-base text-[#EAE2D3]/80 max-w-2xl leading-relaxed">
              Navigate verified GPS coordinates across <strong>Zakho City</strong> and the{' '}
              <strong>Wider Zakho District</strong>. Toggle between zoomed city landmarks and
              regional mountain excursions, visualize your active Trip Planner route, or launch
              Google Maps directions.
            </p>
          </div>
          <Link
            href="/plan-your-trip"
            className="px-5 py-3 rounded-xl bg-[#8BBDB5] text-[#101716] hover:bg-[#EAE2D3] text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2 whitespace-nowrap self-start lg:self-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Open Interactive Trip Planner</span>
          </Link>
        </div>

        {/* Full Interactive Map */}
        <ZakhoInteractiveMap initialView="district" />

        {/* Accessible Tabular Coordinate Reference Table */}
        <div className="pt-8 space-y-4">
          <h2 className="text-2xl font-serif-editorial text-[#FAFAF7]">
            Verified Geographic Coordinate Registry (Accessible Map Table)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#142B2B]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#8BBDB5]">
                  <th className="py-3.5 px-4">Destination</th>
                  <th className="py-3.5 px-4">Geographic Scope</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 font-mono-tabular">Coordinates (WGS84)</th>
                  <th className="py-3.5 px-4 font-mono-tabular">Elevation</th>
                  <th className="py-3.5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {DESTINATIONS.map((d) => (
                  <tr key={d.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#FAFAF7]">{d.name}</td>
                    <td className="py-3.5 px-4 text-xs text-[#EAE2D3]/85">
                      {d.geographicScope}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#EAE2D3]/80">{d.category}</td>
                    <td className="py-3.5 px-4 font-mono-tabular text-xs text-[#8BBDB5]">
                      {d.coordinates.lat.toFixed(4)}° N, {d.coordinates.lng.toFixed(4)}° E
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular text-xs">
                      {d.coordinates.elevationMeters}m
                    </td>
                    <td className="py-3.5 px-4 flex items-center gap-3 text-xs">
                      <Link
                        href={`/places/${d.slug}`}
                        className="text-[#8BBDB5] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${d.coordinates.lat},${d.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B87D57] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
