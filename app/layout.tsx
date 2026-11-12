import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ZakhoProvider } from '@/components/ZakhoContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Visit Zakho — Official Destination & Travel Guide',
  description:
    'Discover Zakho, Kurdistan Region, Iraq. Explore the ancient Delal Bridge, the Khabur River, cultural heritage, curated itineraries, interactive maps, and practical visitor essentials.',
  keywords: [
    'Visit Zakho',
    'Zakho tourism',
    'Things to do in Zakho',
    'Zakho travel guide',
    'Places to visit in Zakho',
    'Delal Bridge',
    'Pira Delal',
    'Khabur River',
    'Zakho Kurdistan',
    'Sharanish Waterfall',
  ],
  openGraph: {
    title: 'Visit Zakho — Official Destination & Travel Guide',
    description:
      'Follow the river. Explore centuries of heritage. Experience the warmth of Kurdistan. Discover Zakho.',
    type: 'website',
    siteName: 'Visit Zakho',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Zakho — Official Destination & Travel Guide',
    description:
      'Discover Zakho, Kurdistan Region, Iraq. Explore Delal Bridge, the Khabur River, and plan your visit.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristDestination',
  name: 'Zakho',
  alternateName: 'Zaxo',
  description:
    'A historic river city in the Kurdistan Region of Iraq, renowned for the ancient limestone Delal Bridge (Pira Delal), the Little Khabur River, the Old Island Bazaar, and surrounding mountain canyons.',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.1456,
    longitude: 42.6953,
  },
  touristType: [
    'Cultural Tourism',
    'Architectural Heritage',
    'Nature & Mountain Tourism',
    'Culinary Tourism',
  ],
  includesAttraction: [
    {
      '@type': 'TouristAttraction',
      name: 'Delal Bridge (Pira Delal)',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.1456,
        longitude: 42.6953,
      },
    },
    {
      '@type': 'TouristAttraction',
      name: 'Little Khabur River & Corniche',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.1439,
        longitude: 42.6861,
      },
    },
    {
      '@type': 'TouristAttraction',
      name: 'Sharanish Waterfall',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.2589,
        longitude: 42.9042,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans-ui bg-[#F7F5EF] text-[#101716] antialiased min-h-screen flex flex-col"
      >
        <ZakhoProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ZakhoProvider>
      </body>
    </html>
  );
}
