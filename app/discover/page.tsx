import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import {
  ZAKHO_PHOTO_CREDITS,
  FAQ_ITEMS,
} from '@/lib/zakho-data';
import { RiverSectionDivider, ZakhoBrandEmblem } from '@/components/RiverThreadMotif';

export default function DiscoverPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#142B2B] text-[#FAFAF7] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={ZAKHO_PHOTO_CREDITS.cityPanorama.src}
            alt={ZAKHO_PHOTO_CREDITS.cityPanorama.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142B2B] via-[#142B2B]/70 to-[#101716]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            <MapPin className="w-3.5 h-3.5 text-[#B87D57]" />
            <span>Part IV · Section 08 · The Complete City Guide</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif-editorial text-[#FAFAF7] max-w-4xl leading-[1.04]">
            Discover Zakho: Island of the Little Khabur
          </h1>
          <p className="text-lg sm:text-xl text-[#EAE2D3]/90 max-w-2xl leading-relaxed">
            An authoritative introduction to Zakho’s geography, ancient river-island urbanism,
            multi-faith history, and enduring culture of hospitality in the northern Kurdistan
            Region of Iraq.
          </p>
        </div>
      </section>

      {/* Geographic Introduction & City Overview */}
      <section className="py-20 bg-[#F7F5EF] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
              01. Geographic Introduction &amp; City Overview
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#101716]">
              The Northern Gateway of the Kurdistan Region
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              Zakho (Kurdish: <em>Zaxo</em> / زاخۆ) lies at approximately 37.14° N, 42.68° E in the
              northwestern corner of the Kurdistan Region of Iraq. Administered as the center of
              the <strong>Zakho Independent Administration</strong> within Duhok Governorate, the
              city rests at an elevation of roughly 440 meters on the fertile Sindî (Navroy) plain.
            </p>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              Framed to the south by the pale limestone anticline of <strong>Chia-yê Spî</strong>{' '}
              (the Bekhair or White Mountains) and to the north and east by the rugged alpine peaks
              of the Taurus-Zagros frontier, Zakho occupies a natural geographic funnel where river
              valleys, mountain passes, and international trade highways converge.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-[#EAE2D3] border border-[#101716]/10 space-y-4">
              <h3 className="text-lg font-serif-editorial font-semibold text-[#101716]">
                Geographic Orientation at a Glance
              </h3>
              <dl className="space-y-3 text-sm border-t border-[#101716]/10 pt-4 font-mono-tabular">
                <div className="flex justify-between">
                  <dt className="text-[#101716]/65">Administration:</dt>
                  <dd className="font-semibold">Zakho Independent Admin. (KRG)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#101716]/65">Distance to Duhok:</dt>
                  <dd className="font-semibold">55 km SE (via Zakho Tunnel)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#101716]/65">Distance to Erbil (EBL):</dt>
                  <dd className="font-semibold">215 km SE (~2.5–3 hrs)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#101716]/65">Distance to Border Gate:</dt>
                  <dd className="font-semibold">11.5 km NW (Ibrahim Khalil)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#101716]/65">Primary Watershed:</dt>
                  <dd className="font-semibold text-[#245D4D]">Little Khabur → Tigris</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <RiverSectionDivider variant="limestone-flow" label="Historical & Cultural Continuity" />

      {/* Historical Background & Cultural Identity */}
      <section className="py-20 bg-[#EAE2D3] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-[#101716]/15 bg-[#101716]">
              <img
                src={ZAKHO_PHOTO_CREDITS.historicalPainting1888.src}
                alt={ZAKHO_PHOTO_CREDITS.historicalPainting1888.alt}
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
            <p className="text-xs font-serif-editorial italic text-[#101716]/70">
              {ZAKHO_PHOTO_CREDITS.historicalPainting1888.caption}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs uppercase tracking-widest text-[#B87D57] font-semibold">
              02. Historical Background &amp; Cultural Identity
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#101716]">
              From Ancient River Crossing to Principality Stronghold
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              Historical geographers connect the river valley of Zakho with the ancient crossing of
              the <em>Kentrites</em> described by the Greek historian Xenophon in 401 BCE during
              the march of the Ten Thousand. Situated on a defensible natural island formed where
              the Little Khabur splits into two arms, old Zakho developed as a fortified river
              settlement.
            </p>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              During the medieval and early modern periods, Zakho was a prized commercial and
              strategic center of the Kurdish <strong>Emirate of Bahdinan</strong>, before serving
              as a key administrative district (qada) in the late Ottoman era. Throughout these
              centuries, its island neighborhoods fostered a remarkable pluralistic society where
              Kurdish Muslims, Chaldean, Syriac, and Armenian Christians, and an ancient
              Neo-Aramaic-speaking Jewish community lived and traded side by side.
            </p>
          </div>
        </div>
      </section>

      {/* The Khabur River, Natural Environment & Regional Trade */}
      <section className="py-20 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">03. The Khabur River</p>
            <h3 className="text-2xl font-serif-editorial">The Lifeblood of the City</h3>
            <p className="text-sm text-[#EAE2D3]/80 leading-relaxed">
              Rising in the northern mountains, the Little Khabur flows straight through the center
              of Zakho, passing beneath the ancient limestone vaults of Delal Bridge before joining
              the Tigris River at Feshkhabur. Its renovated Corniche is the social heart of modern
              Zakho.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
              04. Regional Trade &amp; Border Geography
            </p>
            <h3 className="text-2xl font-serif-editorial">Crossroads of Commerce</h3>
            <p className="text-sm text-[#EAE2D3]/80 leading-relaxed">
              Just 11.5 km northwest of the city lies the Ibrahim Khalil international border
              crossing with Turkey. This strategic position makes Zakho one of the most dynamic
              commercial gateways in the Middle East, blending traditional bazaar crafts with modern
              international logistics.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8BBDB5]">
              05. Community &amp; Hospitality
            </p>
            <h3 className="text-2xl font-serif-editorial">The Warmth of Bahdinan</h3>
            <p className="text-sm text-[#EAE2D3]/80 leading-relaxed">
              In Zakho, a visitor is welcomed with the phrase <em>&ldquo;Bi xêr hatî&rdquo;</em>{' '}
              and treated as an honored guest. Evening tea houses around Pira Delal and family
              promenades along the Khabur create a safe, convivial atmosphere.
            </p>
          </div>
        </div>
      </section>

      {/* Reasons to Visit & FAQ Preview */}
      <section className="py-20 bg-[#F7F5EF] text-[#101716]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <ZakhoBrandEmblem className="w-8 h-8 text-[#245D4D] mb-2" />
              <h2 className="text-3xl sm:text-4xl font-serif-editorial">
                Essential Visitor Questions Answered
              </h2>
            </div>
            <Link
              href="/travel-guide"
              className="text-xs font-semibold uppercase tracking-wider text-[#245D4D] hover:underline inline-flex items-center gap-1.5"
            >
              <span>View All 12 Searchable FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQ_ITEMS.slice(0, 6).map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-2xl bg-[#EAE2D3]/60 border border-[#101716]/10 space-y-2"
              >
                <h3 className="text-lg font-serif-editorial font-semibold text-[#101716]">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#101716]/80 leading-relaxed">{faq.shortAnswer}</p>
                <div className="pt-2">
                  <Link
                    href={faq.relatedLink.href}
                    className="text-xs font-semibold text-[#245D4D] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{faq.relatedLink.label}</span>
                    <Compass className="w-3.5 h-3.5" />
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
