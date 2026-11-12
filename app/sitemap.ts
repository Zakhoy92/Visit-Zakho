import type { MetadataRoute } from 'next';
import { DESTINATIONS } from '@/lib/zakho-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://visitzakho.org';
  const staticRoutes = [
    '',
    '/discover',
    '/places',
    '/experiences',
    '/culture',
    '/food',
    '/stay',
    '/itineraries',
    '/plan-your-trip',
    '/map',
    '/travel-guide',
    '/stories',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-11-12'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.85,
  }));

  const placeRoutes = DESTINATIONS.map((dest) => ({
    url: `${baseUrl}/places/${dest.slug}`,
    lastModified: new Date('2026-11-12'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...placeRoutes];
}
