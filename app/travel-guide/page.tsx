'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Navigation,
  ExternalLink,
  Sun,
  Calendar,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import {
  ARRIVAL_ROUTES,
  SEASONAL_GUIDE,
  PRACTICAL_GUIDE_SECTIONS,
  FAQ_ITEMS,
} from '@/lib/zakho-data';
import { filterFAQs } from '@/lib/planner-engine';

export default function TravelGuidePage() {
  const [selectedSeasonId, setSelectedSeasonId] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
  const [faqCategory, setFaqCategory] = useState('All');
  const [faqQuery, setFaqQuery] = useState('');

  const activeSeason =
    SEASONAL_GUIDE.find((s) => s.id === selectedSeasonId) || SEASONAL_GUIDE[0];

  const filteredFaqs = useMemo(
    () => filterFAQs(FAQ_ITEMS, faqCategory, faqQuery),
    [faqCategory, faqQuery]
  );

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-5">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part V · Sections 15–18 · Complete Visitor Essentials Guide
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-4xl">
            Practical Travel Information, Arrival Routes &amp; Seasonal Guide
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Everything international and domestic travelers need to prepare for Zakho: arrival
            corridors from Erbil, Duhok, and Turkey, official visa portals, four-season climate
            data, currency, etiquette, and emergency resources.
          </p>
        </div>
      </section>

      {/* Section 15: Getting to Zakho */}
      <section className="py-16 max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
              Section 15 · Arrival &amp; Entry Logistics
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial mt-1">
              Getting to Zakho
            </h2>
          </div>
          <a
            href="https://visit.gov.krd/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 self-start md:self-auto"
          >
            <span>Official KRG e-Visa &amp; Entry Portal (visit.gov.krd)</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8BBDB5]" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ARRIVAL_ROUTES.map((route) => (
            <div
              key={route.id}
              className="p-6 rounded-2xl bg-white border border-[#101716]/10 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tabular text-[#245D4D]">
                  <span>{route.distanceKm} km</span>
                  <span>{route.estimatedTime}</span>
                </div>
                <h3 className="text-2xl font-serif-editorial text-[#101716]">
                  From {route.origin}
                </h3>
                <p className="text-xs font-semibold text-[#B87D57]">
                  {route.transportMode}
                </p>
                <p className="text-sm text-[#101716]/80 leading-relaxed">
                  {route.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[#101716]/10 flex items-center justify-between text-xs">
                <span className="text-[#101716]/60">{route.verification}</span>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=37.1456,42.6953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#245D4D] hover:underline inline-flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Route on Map</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#EAE2D3] border border-[#101716]/10 flex items-start gap-3 text-xs text-[#101716]/85">
          <ShieldAlert className="w-5 h-5 text-[#B87D57] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important Legal &amp; Border Notice for International Travelers:</strong> Visa
            and entry permissions are determined exclusively by official government authorities of
            the Kurdistan Regional Government (KRG) and the Republic of Iraq. Always verify your
            passport’s current eligibility on{' '}
            <a
              href="https://visit.gov.krd/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-[#245D4D]"
            >
              visit.gov.krd
            </a>{' '}
            or with your nearest embassy before departure. Information on this website is for
            general travel planning and does not constitute legal advice.
          </p>
        </div>
      </section>

      {/* Section 16: Best Time to Visit (Interactive 4-Season Guide) */}
      <section className="py-16 bg-[#EAE2D3] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
                Section 16 · Climate &amp; Seasonal Selector
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif-editorial mt-1">
                Best Time to Visit Zakho
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 bg-[#F7F5EF] p-1.5 rounded-xl border border-[#101716]/10">
              {SEASONAL_GUIDE.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSeasonId(s.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    selectedSeasonId === s.id
                      ? 'bg-[#142B2B] text-[#FAFAF7]'
                      : 'text-[#101716] hover:bg-[#EAE2D3]'
                  }`}
                >
                  {s.name} ({s.months})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl bg-[#F7F5EF] border border-[#101716]/10 overflow-hidden">
            <div className="lg:col-span-5 relative min-h-[280px] bg-[#101716]">
              <img
                src={activeSeason.photo.src}
                alt={activeSeason.photo.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#245D4D]">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeSeason.months}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-[#B87D57]" />
                  {activeSeason.avgTempRangeC}
                </span>
                <span aria-hidden="true">·</span>
                <span>Daylight: {activeSeason.daylightHours}</span>
              </div>
              <h3 className="text-3xl font-serif-editorial">
                {activeSeason.name} ({activeSeason.kurdishName}) — {activeSeason.headline}
              </h3>
              <p className="text-sm sm:text-base text-[#101716]/80 leading-relaxed">
                {activeSeason.landscapeDescription}
              </p>
              <p className="text-xs font-semibold text-[#245D4D]">
                Outdoor Suitability: {activeSeason.outdoorSuitability}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 17: 10 Practical Visitor Resource Modules */}
      <section className="py-16 max-w-7xl mx-auto px-6 space-y-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
            Section 17 · Visitor Resource Centre
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-editorial mt-1">
            Ten Essential Practical Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRACTICAL_GUIDE_SECTIONS.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-6 rounded-2xl bg-white border border-[#101716]/10 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#245D4D]">
                <span>0{idx + 1}. PRACTICAL MODULE</span>
                <span>{sec.verificationBadge}</span>
              </div>
              <h3 className="text-2xl font-serif-editorial text-[#101716]">
                {sec.title}
              </h3>
              <p className="text-xs font-semibold text-[#B87D57]">{sec.summary}</p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#101716]/80 leading-relaxed pt-2 border-t border-[#101716]/10">
                {sec.details.map((line, i) => (
                  <li key={i}>• {line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 18: Searchable Frequently Asked Questions */}
      <section className="py-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                Section 18 · Fact-Checked Answers
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif-editorial mt-1">
                Frequently Asked Visitor Questions
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8BBDB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  placeholder="Search FAQ questions..."
                  aria-label="Search Frequently Asked Questions"
                  className="pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-[#FAFAF7] placeholder-[#EAE2D3]/60 focus:outline-none focus:border-[#8BBDB5]"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    'All',
                    'Geography & Arrival',
                    'Attractions & Planning',
                    'Practical & Currency',
                    'Entry & Safety',
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFaqCategory(cat)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      faqCategory === cat
                        ? 'bg-[#8BBDB5] text-[#101716] font-semibold'
                        : 'bg-white/10 text-[#EAE2D3] hover:bg-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono-tabular text-[#8BBDB5]">
                    {faq.category}
                  </span>
                  <h3 className="text-xl font-serif-editorial text-[#FAFAF7]">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[#EAE2D3] font-medium leading-relaxed">
                    {faq.shortAnswer}
                  </p>
                  <p className="text-xs text-[#EAE2D3]/75 leading-relaxed">
                    {faq.detailedAnswer}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <Link
                    href={faq.relatedLink.href}
                    className="text-xs font-semibold uppercase tracking-wider text-[#8BBDB5] hover:text-white inline-flex items-center gap-1.5"
                  >
                    <span>{faq.relatedLink.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
