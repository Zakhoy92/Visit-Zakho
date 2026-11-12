import { NextResponse } from 'next/server';
import { DESTINATIONS, FOOD_VENUES, ACCOMMODATIONS, CURATED_ITINERARIES } from '@/lib/zakho-data';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    platform: 'Visit Zakho Digital Destination Platform',
    timestamp: new Date().toISOString(),
    verifiedCounts: {
      destinations: DESTINATIONS.length,
      foodVenues: FOOD_VENUES.length,
      accommodations: ACCOMMODATIONS.length,
      curatedItineraries: CURATED_ITINERARIES.length,
    },
  });
}
