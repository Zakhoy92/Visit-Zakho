'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Camera,
} from 'lucide-react';
import {
  EDITORIAL_STORIES,
  ZAKHO_PHOTO_CREDITS,
} from '@/lib/zakho-data';

export default function StoriesPage() {
  const [activeStoryId, setActiveStoryId] = useState(EDITORIAL_STORIES[0].id);
  const activeStory =
    EDITORIAL_STORIES.find((s) => s.id === activeStoryId) || EDITORIAL_STORIES[0];

  const allPlates = Object.values(ZAKHO_PHOTO_CREDITS);

  return (
    <div className="w-full min-h-screen bg-[#101716] text-[#FAFAF7]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#142B2B] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 space-y-5">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Part VI · Sections 19 &amp; 20 · Editorial Destination Magazine
          </p>
          <h1 className="text-4xl sm:text-7xl font-serif-editorial text-[#FAFAF7] tracking-tight">
            THE BEAUTY OF ZAKHO &amp; CITY STORIES
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Long-form essays and authentic documentary photography exploring the architecture of
            Pira Delal, the hydrology of the Little Khabur, and the cultural mosaic of Zakho.
          </p>

          {/* Story Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4">
            {EDITORIAL_STORIES.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                onClick={() => setActiveStoryId(story.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeStoryId === story.id
                    ? 'bg-[#8BBDB5] text-[#101716]'
                    : 'bg-white/10 text-[#EAE2D3] hover:bg-white/20'
                }`}
              >
                0{idx + 1}. {story.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Long-Form Essay Reader (Warm Paper Editorial Surface) */}
      <section className="py-20 bg-[#F7F5EF] text-[#101716]">
        <article className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="space-y-4 border-b border-[#101716]/15 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-[#245D4D] font-mono-tabular">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {activeStory.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeStory.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeStory.readTimeMinutes} min read
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-editorial text-[#101716] leading-[1.06]">
              {activeStory.title}
            </h2>

            <p className="text-lg sm:text-xl font-serif-editorial italic text-[#101716]/80">
              {activeStory.subtitle}
            </p>

            <p className="text-xs text-[#101716]/65 font-mono-tabular">
              By {activeStory.author} · {activeStory.authorRole}
            </p>
          </div>

          {/* Cover Plate */}
          <figure className="space-y-2">
            <div className="rounded-2xl overflow-hidden bg-[#101716] border border-[#101716]/10 h-80 sm:h-[460px]">
              <img
                src={activeStory.coverPhoto.src}
                alt={activeStory.coverPhoto.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-xs font-serif-editorial italic text-[#101716]/70 flex items-center justify-between">
              <span>{activeStory.coverPhoto.caption}</span>
              <span className="not-italic font-mono-tabular">
                Photo: {activeStory.coverPhoto.photographer} ({activeStory.coverPhoto.license})
              </span>
            </figcaption>
          </figure>

          {/* Pull Quote */}
          <blockquote className="py-8 border-y border-[#101716]/15 text-2xl sm:text-3xl font-serif-editorial italic text-[#142B2B] text-center max-w-3xl mx-auto leading-snug">
            &ldquo;{activeStory.pullQuote}&rdquo;
          </blockquote>

          {/* Essay Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {activeStory.sections.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-2xl font-serif-editorial font-semibold text-[#142B2B]">
                    {sec.heading}
                  </h3>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className={`text-base text-[#101716]/85 leading-relaxed ${
                        idx === 0 && pIdx === 0
                          ? 'first-letter:text-5xl first-letter:font-serif-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#245D4D]'
                          : ''
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              <div className="p-5 rounded-xl bg-[#EAE2D3] border border-[#101716]/10 text-xs font-mono-tabular text-[#101716]/75">
                {activeStory.historicalCitation}
              </div>
            </div>

            {/* Right Margin Rail: Secondary Plate & Related Places */}
            <aside className="lg:col-span-4 space-y-6">
              <figure className="rounded-2xl overflow-hidden bg-[#EAE2D3] border border-[#101716]/10">
                <img
                  src={activeStory.secondaryPhoto.src}
                  alt={activeStory.secondaryPhoto.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover"
                />
                <figcaption className="p-3.5 text-xs font-serif-editorial italic text-[#101716]/75">
                  {activeStory.secondaryPhoto.caption}
                </figcaption>
              </figure>

              <div className="p-5 rounded-2xl bg-[#142B2B] text-[#FAFAF7] space-y-3">
                <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
                  Related Destinations
                </p>
                <div className="space-y-2">
                  {activeStory.relatedDestinationSlugs.map((slug) => (
                    <Link
                      key={slug}
                      href={`/places/${slug}`}
                      className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center justify-between"
                    >
                      <span className="capitalize">{slug.replace(/-/g, ' ')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8BBDB5]" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>
      </section>

      {/* Complete 18-Plate Documentary Archive */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-10">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#B87D57]" />
            <span>Authenticated Documentary Visual Archive ({allPlates.length} Plates)</span>
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif-editorial text-[#FAFAF7]">
            Complete Zakho Photographic Monograph
          </h2>
          <p className="text-sm text-[#EAE2D3]/75 max-w-2xl">
            Every photograph in this archive is a genuine, licensed image of Zakho City or Zakho
            District sourced via Wikimedia Commons with verified photographer attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPlates.map((plate, i) => (
            <figure
              key={i}
              className="rounded-2xl overflow-hidden bg-[#142B2B] border border-white/10 flex flex-col justify-between"
            >
              <div className="h-64 bg-[#101716]">
                <img
                  src={plate.src}
                  alt={plate.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-4 space-y-1.5 text-xs">
                <p className="font-serif-editorial italic text-[#FAFAF7]">{plate.caption}</p>
                <p className="font-mono-tabular text-[11px] text-[#8BBDB5]">
                  Plate {String(i + 1).padStart(2, '0')} · {plate.photographer} · {plate.license}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
