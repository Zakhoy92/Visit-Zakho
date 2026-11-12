'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Database,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import {
  DESTINATIONS,
  FOOD_VENUES,
  ACCOMMODATIONS,
  CURATED_ITINERARIES,
  EDITORIAL_STORIES,
} from '@/lib/zakho-data';
import { useZakho } from '@/components/ZakhoContext';

export default function AboutPage() {
  const { stakeholderRecords, toggleRecordStatus } = useZakho();

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-5">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part IX · Sections 23 &amp; 24 · Content Management &amp; Factual Integrity
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-4xl">
            About Visit Zakho &amp; The Factual Verification Registry
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Built as the authoritative international digital identity for Zakho, Kurdistan Region,
            Iraq—governed by strict factual verification, documentary photography attribution, and
            structured content management.
          </p>
        </div>
      </section>

      {/* Structured Content Model Overview */}
      <section className="py-16 max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono-tabular">
          <div className="p-5 rounded-2xl bg-white border border-[#101716]/10">
            <p className="text-xs uppercase text-[#245D4D]">Verified Places</p>
            <p className="text-3xl font-bold mt-1">{DESTINATIONS.length}</p>
            <p className="text-[11px] text-[#101716]/60 mt-1">City &amp; District GPS</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#101716]/10">
            <p className="text-xs uppercase text-[#245D4D]">Food &amp; Dining</p>
            <p className="text-3xl font-bold mt-1">{FOOD_VENUES.length}</p>
            <p className="text-[11px] text-[#101716]/60 mt-1">Independent Listings</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#101716]/10">
            <p className="text-xs uppercase text-[#245D4D]">Stay Corridors</p>
            <p className="text-3xl font-bold mt-1">{ACCOMMODATIONS.length}</p>
            <p className="text-[11px] text-[#101716]/60 mt-1">Verified Zones</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#101716]/10">
            <p className="text-xs uppercase text-[#245D4D]">Curated Journeys</p>
            <p className="text-3xl font-bold mt-1">{CURATED_ITINERARIES.length}</p>
            <p className="text-[11px] text-[#101716]/60 mt-1">Day-by-Day Routes</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#101716]/10">
            <p className="text-xs uppercase text-[#245D4D]">Editorial Essays</p>
            <p className="text-3xl font-bold mt-1">{EDITORIAL_STORIES.length}</p>
            <p className="text-[11px] text-[#101716]/60 mt-1">+ 18 Licensed Plates</p>
          </div>
        </div>

        {/* Factual Distinction Charter */}
        <div className="p-8 rounded-3xl bg-[#EAE2D3] border border-[#101716]/10 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#245D4D]" />
            <h2 className="text-3xl font-serif-editorial">
              Our Four-Tier Verification Standard
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 space-y-1.5">
              <p className="font-bold text-[#245D4D] uppercase">1. Verified Fact</p>
              <p className="text-[#101716]/80 leading-relaxed">
                Geographic coordinates, physical dimensions (e.g., Delal Bridge ~115m span),
                official currencies, and documented historical monuments.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 space-y-1.5">
              <p className="font-bold text-[#B87D57] uppercase">2. Editorial Recommendation</p>
              <p className="text-[#101716]/80 leading-relaxed">
                Curated dining promenades, best times of day for photography, and cultural
                etiquette advice.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 space-y-1.5">
              <p className="font-bold text-[#142B2B] uppercase">3. Estimated Travel Metric</p>
              <p className="text-[#101716]/80 leading-relaxed">
                Approximate driving times and road distances computed from Haversine and regional
                road factors.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#101716]/10 space-y-1.5">
              <p className="font-bold text-[#245D4D] uppercase">4. Official Institutional</p>
              <p className="text-[#101716]/80 leading-relaxed">
                Emergency telephone numbers (104 / 122 / 115), international border rules, and the
                KRG e-Visa portal (visit.gov.krd).
              </p>
            </div>
          </div>
        </div>

        {/* Content Management & Stakeholder Review Console */}
        <div className="p-8 rounded-3xl bg-white border border-[#101716]/10 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#101716]/10 pb-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold flex items-center gap-1.5">
                <Database className="w-4 h-4" />
                <span>Section 23 · Content Management &amp; Stakeholder Review Console</span>
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial">
                Community &amp; Business Submissions Registry
              </h2>
            </div>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 self-start sm:self-auto"
            >
              <span>Submit New Listing or Update</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {stakeholderRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#101716]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
                    <span
                      className={`px-2.5 py-0.5 rounded font-semibold ${
                        rec.status === 'Published'
                          ? 'bg-[#245D4D] text-[#FAFAF7]'
                          : rec.status === 'Pending Review'
                          ? 'bg-[#B87D57] text-[#101716]'
                          : 'bg-stone-300 text-stone-700'
                      }`}
                    >
                      {rec.status}
                    </span>
                    <span className="text-[#101716]/70">{rec.entityType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#101716]/60">Submitted {rec.submittedAt}</span>
                  </div>
                  <h3 className="text-xl font-serif-editorial font-semibold text-[#101716]">
                    {rec.entityName}
                  </h3>
                  <p className="text-xs text-[#245D4D]">
                    Location: {rec.locationDescription} · Source: {rec.verificationSource || 'Stakeholder Direct'}
                  </p>
                  <p className="text-sm text-[#101716]/80 leading-relaxed">{rec.details}</p>
                </div>

                {/* Admin Publish / Unpublish / Archive Controls */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleRecordStatus(rec.id, 'Published')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 ${
                      rec.status === 'Published'
                        ? 'bg-[#245D4D] text-white'
                        : 'border border-[#101716]/20 hover:bg-[#245D4D] hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Publish</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRecordStatus(rec.id, 'Pending Review')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 ${
                      rec.status === 'Pending Review'
                        ? 'bg-[#B87D57] text-[#101716]'
                        : 'border border-[#101716]/20 hover:bg-[#EAE2D3]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Hold for Review</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRecordStatus(rec.id, 'Archived')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      rec.status === 'Archived'
                        ? 'bg-stone-700 text-white'
                        : 'border border-[#101716]/20 hover:bg-stone-200'
                    }`}
                  >
                    Unpublish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
