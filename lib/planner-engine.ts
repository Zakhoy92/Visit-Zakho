import {
  DESTINATIONS,
  FOOD_VENUES,
  ACCOMMODATIONS,
  FAQ_ITEMS,
  Destination,
  DestinationCategory,
  GeographicScope,
  FoodVenue,
  AccommodationItem,
  FAQItem,
} from './zakho-data';

export interface PlannerPreferences {
  durationDays: 1 | 2 | 3;
  pace: 'Relaxed' | 'Balanced' | 'Immersive';
  groupType: 'Solo' | 'Couple' | 'Family' | 'Group';
  selectedCategories: DestinationCategory[];
  includeDistrictExcursions: boolean;
}

export interface PlannedStop {
  stopId: string;
  dayNumber: number;
  orderIndex: number;
  destinationSlug: string;
  destinationName: string;
  category: DestinationCategory;
  geographicScope: GeographicScope;
  recommendedDuration: string;
  customNote: string;
  coordinates: { lat: number; lng: number };
}

export interface RouteMetrics {
  totalStops: number;
  cityStopsCount: number;
  districtStopsCount: number;
  totalLinearDistanceKm: number;
  estimatedRoadDistanceKm: number;
  estimatedTotalDriveMinutes: number;
}

/**
 * Calculates great-circle distance in kilometers between two geographic coordinates using the Haversine formula.
 */
export function calculateDistanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h =
    sinDLat * sinDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
  return Math.round(R * c * 100) / 100;
}

/**
 * Computes verified route metrics across an ordered sequence of stops.
 */
export function estimateRouteMetrics(stops: PlannedStop[]): RouteMetrics {
  if (stops.length === 0) {
    return {
      totalStops: 0,
      cityStopsCount: 0,
      districtStopsCount: 0,
      totalLinearDistanceKm: 0,
      estimatedRoadDistanceKm: 0,
      estimatedTotalDriveMinutes: 0,
    };
  }

  let linearKm = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    linearKm += calculateDistanceKm(stops[i].coordinates, stops[i + 1].coordinates);
  }

  // Mountain & urban winding road factor (~1.32x linear distance)
  const roadKm = Math.round(linearKm * 1.32 * 10) / 10;
  // Average 38 km/h across urban Zakho + highland roads, minimum 4 min per hop
  const driveMinutes =
    stops.length <= 1
      ? 0
      : Math.max((stops.length - 1) * 4, Math.round((roadKm / 38) * 60));

  const cityStopsCount = stops.filter((s) => s.geographicScope === 'Zakho City').length;
  const districtStopsCount = stops.filter(
    (s) => s.geographicScope === 'Wider Zakho District'
  ).length;

  return {
    totalStops: stops.length,
    cityStopsCount,
    districtStopsCount,
    totalLinearDistanceKm: Math.round(linearKm * 10) / 10,
    estimatedRoadDistanceKm: roadKm,
    estimatedTotalDriveMinutes: driveMinutes,
  };
}

/**
 * Filters and sorts destinations by search query, category, geographic scope, and sort mode.
 */
export function filterDestinations(
  destinations: Destination[],
  options: {
    query?: string;
    category?: DestinationCategory | 'All';
    scope?: GeographicScope | 'All';
    sortBy?: 'featured' | 'distance' | 'name';
  }
): Destination[] {
  const q = (options.query || '').trim().toLowerCase();
  const cat = options.category || 'All';
  const scope = options.scope || 'All';
  const sortBy = options.sortBy || 'featured';

  const filtered = destinations.filter((d) => {
    if (cat !== 'All' && d.category !== cat && !d.secondaryCategories.includes(cat)) {
      return false;
    }
    if (scope !== 'All' && d.geographicScope !== scope) {
      return false;
    }
    if (q.length > 0) {
      const haystack = [
        d.name,
        d.kurdishName,
        d.category,
        d.shortSummary,
        d.overview,
        d.geographicScope,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) {
        return false;
      }
    }
    return true;
  });

  if (sortBy === 'distance') {
    return [...filtered].sort((a, b) => a.distanceFromCenterKm - b.distanceFromCenterKm);
  }
  if (sortBy === 'name') {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }
  return filtered;
}

/**
 * Generates a structured day-by-day itinerary from visitor preferences using verified Zakho destinations.
 */
export function generateItineraryFromPreferences(
  prefs: PlannerPreferences,
  allDestinations: Destination[] = DESTINATIONS
): PlannedStop[] {
  const stopsPerDay =
    prefs.pace === 'Relaxed' ? 2 : prefs.pace === 'Balanced' ? 3 : 4;
  const maxStops = prefs.durationDays * stopsPerDay;

  const eligible = allDestinations.filter((d) => {
    if (!prefs.includeDistrictExcursions && d.geographicScope === 'Wider Zakho District') {
      return false;
    }
    // Exclude transit border gateway unless explicitly solo/group looking at trade/culture and 3 days
    if (d.slug === 'ibrahim-khalil-gateway' && prefs.durationDays < 3) {
      return false;
    }
    return true;
  });

  // Score each destination by relevance to user preferences
  const scored = eligible.map((dest) => {
    let score = 0;
    // Always prioritize Delal Bridge and Khabur River as foundational anchors
    if (dest.slug === 'delal-bridge') score += 50;
    if (dest.slug === 'khabur-river-corniche') score += 35;
    if (dest.slug === 'zakho-old-bazaar') score += 30;

    if (prefs.selectedCategories.includes(dest.category)) {
      score += 40;
    }
    for (const sec of dest.secondaryCategories) {
      if (prefs.selectedCategories.includes(sec)) {
        score += 20;
      }
    }

    if (prefs.groupType === 'Family' && dest.secondaryCategories.includes('Family Experiences')) {
      score += 25;
    }

    return { dest, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const chosen = scored.slice(0, maxStops).map((s) => s.dest);

  // Organize city stops on Day 1 and district excursions on Day 2/3 for logical geographic routing
  const ordered = [...chosen].sort((a, b) => {
    if (a.geographicScope !== b.geographicScope) {
      return a.geographicScope === 'Zakho City' ? -1 : 1;
    }
    return a.distanceFromCenterKm - b.distanceFromCenterKm;
  });

  return ordered.map((dest, idx) => {
    const dayNumber = Math.min(
      prefs.durationDays,
      Math.floor(idx / stopsPerDay) + 1
    );
    return {
      stopId: `stop-${dest.slug}-${idx}`,
      dayNumber,
      orderIndex: idx,
      destinationSlug: dest.slug,
      destinationName: dest.name,
      category: dest.category,
      geographicScope: dest.geographicScope,
      recommendedDuration: dest.recommendedDuration,
      customNote: dest.visitorGuidance[0] || dest.shortSummary,
      coordinates: {
        lat: dest.coordinates.lat,
        lng: dest.coordinates.lng,
      },
    };
  });
}

/**
 * Reorders a stop in the itinerary up or down and recalculates order indices.
 */
export function moveItineraryStop(
  stops: PlannedStop[],
  index: number,
  direction: 'up' | 'down'
): PlannedStop[] {
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || index >= stops.length || targetIndex < 0 || targetIndex >= stops.length) {
    return stops;
  }
  const clone = [...stops];
  const temp = clone[index];
  clone[index] = clone[targetIndex];
  clone[targetIndex] = temp;

  return clone.map((s, idx) => ({
    ...s,
    orderIndex: idx,
  }));
}

/**
 * Encodes an array of destination slugs and day assignments into a URL-safe share query parameter.
 */
export function encodeItineraryShareToken(stops: PlannedStop[]): string {
  return stops
    .map((s) => `${s.dayNumber}:${s.destinationSlug}`)
    .join(',');
}

/**
 * Decodes a URL share parameter back into PlannedStop objects using verified destination records.
 */
export function decodeItineraryShareToken(
  token: string,
  allDestinations: Destination[] = DESTINATIONS
): PlannedStop[] {
  if (!token || !token.trim()) return [];
  const parts = token.split(',').map((p) => p.trim()).filter(Boolean);
  const result: PlannedStop[] = [];

  parts.forEach((part, idx) => {
    const [dayStr, slug] = part.includes(':') ? part.split(':') : ['1', part];
    const dayNum = Math.max(1, Math.min(7, parseInt(dayStr, 10) || 1));
    const found = allDestinations.find((d) => d.slug === slug);
    if (found) {
      result.push({
        stopId: `shared-${found.slug}-${idx}`,
        dayNumber: dayNum,
        orderIndex: result.length,
        destinationSlug: found.slug,
        destinationName: found.name,
        category: found.category,
        geographicScope: found.geographicScope,
        recommendedDuration: found.recommendedDuration,
        customNote: found.visitorGuidance[0] || found.shortSummary,
        coordinates: {
          lat: found.coordinates.lat,
          lng: found.coordinates.lng,
        },
      });
    }
  });

  return result;
}

/**
 * Filters food venues by category and search query.
 */
export function filterFoodVenues(
  venues: FoodVenue[],
  category: string,
  query: string
): FoodVenue[] {
  const q = query.trim().toLowerCase();
  return venues.filter((v) => {
    if (category !== 'All' && v.category !== category) return false;
    if (q) {
      const hay = `${v.name} ${v.cuisineType} ${v.description} ${v.signatureDishes.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/**
 * Filters accommodations by category and search query.
 */
export function filterAccommodations(
  items: AccommodationItem[],
  category: string,
  scope: string,
  query: string
): AccommodationItem[] {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (category !== 'All' && item.category !== category) return false;
    if (scope !== 'All' && item.geographicScope !== scope) return false;
    if (q) {
      const hay = `${item.name} ${item.locationArea} ${item.description} ${item.facilities.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/**
 * Searches FAQs by keyword and category.
 */
export function filterFAQs(
  faqs: FAQItem[],
  category: string,
  query: string
): FAQItem[] {
  const q = query.trim().toLowerCase();
  return faqs.filter((f) => {
    if (category !== 'All' && f.category !== category) return false;
    if (q) {
      const hay = `${f.question} ${f.shortAnswer} ${f.detailedAnswer}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export interface StakeholderSubmissionInput {
  entityName: string;
  entityType: 'Destination' | 'Restaurant / Cafe' | 'Accommodation' | 'Tourism Enquiry';
  contactName: string;
  contactEmail: string;
  locationDescription: string;
  verificationSource: string;
  details: string;
}

export function validateSubmissionInput(
  input: StakeholderSubmissionInput
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.entityName || input.entityName.trim().length < 3) {
    errors.entityName = 'Please enter a verified name (at least 3 characters).';
  }
  if (!input.contactName || input.contactName.trim().length < 2) {
    errors.contactName = 'Please provide your full name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.contactEmail || !emailRegex.test(input.contactEmail.trim())) {
    errors.contactEmail = 'Please enter a valid email address.';
  }
  if (!input.locationDescription || input.locationDescription.trim().length < 4) {
    errors.locationDescription = 'Please specify the neighborhood or geographic location in Zakho.';
  }
  if (!input.details || input.details.trim().length < 15) {
    errors.details = 'Please provide at least 15 characters of factual detail or inquiry context.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
