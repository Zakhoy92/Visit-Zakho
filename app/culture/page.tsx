import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ZAKHO_PHOTO_CREDITS, EDITORIAL_STORIES } from '@/lib/zakho-data';
import { RiverSectionDivider } from '@/components/RiverThreadMotif';

export default function CulturePage() {
  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      <section className="pt-32 pb-20 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Heritage · Traditions · Living Community
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-4xl">
            The Cultural Soul of Zakho &amp; Bahdinan
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Explore the oral ballads, multi-faith heritage, riverfront social rituals, and
            traditional crafts that give Zakho its unmistakable identity within the Kurdistan
            Region.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
              01. Oral Poetry, Lawik &amp; Heyran
            </p>
            <h2 className="text-3xl font-serif-editorial">
              A City Celebrated in Kurdish Song
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              Across Kurdistan, Zakho is celebrated as a cradle of traditional Kurmanji (Bahdini)
              music and oral poetry. Generations of <em>Dengbêj</em> (traditional storytellers and
              bards) and folk musicians from Zakho have immortalized the Khabur River, the arches of
              Pira Delal, and the surrounding mountains in lyrical ballads known as{' '}
              <strong>Lawik</strong> and <strong>Heyran</strong>.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#101716]/10">
            <p className="text-xs uppercase tracking-widest text-[#B87D57] font-semibold">
              02. Multi-Faith Coexistence
            </p>
            <h2 className="text-3xl font-serif-editorial">
              Muslims, Christians &amp; the Memory of &ldquo;Little Jerusalem&rdquo;
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              For centuries, Zakho’s island neighborhoods and surrounding villages modeled peaceful
              coexistence. Alongside historic Sunni Muslim mosques such as the Qubad Pasha foundation,
              Zakho and its highland villages (including Sharanish and Levo) are home to vibrant
              Chaldean Catholic, Syriac, and Armenian Christian communities, as well as the
              historical memory of one of Kurdistan’s oldest Aramaic-speaking Jewish communities.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#101716]/10">
            <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
              03. Traditional Attire &amp; Newroz
            </p>
            <h2 className="text-3xl font-serif-editorial">
              Shal u Shapik &amp; The Fires of March
            </h2>
            <p className="text-base text-[#101716]/85 leading-relaxed">
              During festivals—especially <strong>Newroz</strong> (the Kurdish New Year on March 21)
              and weddings—residents wear traditional Kurdish attire: men in hand-woven{' '}
              <em>Shal u Shapik</em> (tailored trousers and jacket bound with a wide patterned waist
              sash), and women in luminous, embroidered gowns (<em>Kiras û Xeftan</em>).
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <figure className="rounded-2xl overflow-hidden bg-[#EAE2D3] border border-[#101716]/10">
            <img
              src={ZAKHO_PHOTO_CREDITS.oldQuarter.src}
              alt={ZAKHO_PHOTO_CREDITS.oldQuarter.alt}
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover"
            />
            <figcaption className="p-4 text-xs font-serif-editorial italic text-[#101716]/75">
              {ZAKHO_PHOTO_CREDITS.oldQuarter.caption} (Photo:{' '}
              {ZAKHO_PHOTO_CREDITS.oldQuarter.photographer})
            </figcaption>
          </figure>

          <div className="p-6 rounded-2xl bg-[#142B2B] text-[#FAFAF7] space-y-4">
            <h3 className="text-xl font-serif-editorial">
              Respectful Visitor Etiquette in Zakho
            </h3>
            <ul className="space-y-2.5 text-xs text-[#EAE2D3]/85 leading-relaxed">
              <li>
                • <strong>Greetings:</strong> A warm <em>&ldquo;Slav&rdquo;</em> (Hello) with your
                right hand placed briefly over your heart is a deeply respected Kurdish gesture.
              </li>
              <li>
                • <strong>Sacred Spaces:</strong> Remove shoes before entering mosque prayer halls
                and dress modestly when visiting historic religious quarters.
              </li>
              <li>
                • <strong>Tea Hospitality:</strong> Accepting a small glass of cardamom tea in the
                bazaar is a sign of friendship, not a sales obligation.
              </li>
            </ul>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8BBDB5] hover:text-white pt-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Long-Form Cultural Essays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <RiverSectionDivider variant="limestone-flow" label="Editorial Magazine Archive" />

      <section className="pb-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDITORIAL_STORIES.slice(0, 2).map((st) => (
            <Link
              key={st.id}
              href="/stories"
              className="p-6 rounded-2xl bg-[#EAE2D3] border border-[#101716]/10 hover:border-[#245D4D] transition-colors space-y-2"
            >
              <p className="text-xs text-[#245D4D] font-semibold">{st.category}</p>
              <h3 className="text-2xl font-serif-editorial">{st.title}</h3>
              <p className="text-sm text-[#101716]/75">{st.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
