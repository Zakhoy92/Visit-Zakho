import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDistanceKm,
  estimateRouteMetrics,
  filterDestinations,
  generateItineraryFromPreferences,
  moveItineraryStop,
  encodeItineraryShareToken,
  decodeItineraryShareToken,
  validateSubmissionInput,
} from './planner-engine';
import { DESTINATIONS } from './zakho-data';

test('calculateDistanceKm computes accurate Haversine distance between Delal Bridge and Sharanish', () => {
  const delal = { lat: 37.1456, lng: 42.6953 };
  const sharanish = { lat: 37.2589, lng: 42.9042 };
  const dist = calculateDistanceKm(delal, sharanish);
  assert.ok(dist > 20 && dist < 26, `Expected ~22.3km linear distance, got ${dist}`);
});

test('filterDestinations distinguishes Zakho City from Wider Zakho District and searches by keyword', () => {
  const cityOnly = filterDestinations(DESTINATIONS, { scope: 'Zakho City' });
  assert.ok(cityOnly.length >= 4);
  assert.ok(cityOnly.every((d) => d.geographicScope === 'Zakho City'));

  const districtOnly = filterDestinations(DESTINATIONS, { scope: 'Wider Zakho District' });
  assert.ok(districtOnly.length >= 4);
  assert.ok(districtOnly.every((d) => d.geographicScope === 'Wider Zakho District'));

  const bridgeSearch = filterDestinations(DESTINATIONS, { query: 'Pira Delal' });
  assert.equal(bridgeSearch.length, 1);
  assert.equal(bridgeSearch[0].slug, 'delal-bridge');
});

test('generateItineraryFromPreferences builds balanced itinerary and respects district toggle', () => {
  const cityItinerary = generateItineraryFromPreferences({
    durationDays: 1,
    pace: 'Balanced',
    groupType: 'Couple',
    selectedCategories: ['Architectural Heritage', 'Historical Sites'],
    includeDistrictExcursions: false,
  });

  assert.equal(cityItinerary.length, 3);
  assert.ok(cityItinerary.every((s) => s.geographicScope === 'Zakho City'));
  assert.equal(cityItinerary[0].dayNumber, 1);

  const metrics = estimateRouteMetrics(cityItinerary);
  assert.equal(metrics.totalStops, 3);
  assert.equal(metrics.cityStopsCount, 3);
  assert.equal(metrics.districtStopsCount, 0);
  assert.ok(metrics.estimatedRoadDistanceKm > 0);
});

test('moveItineraryStop and share token encoding/decoding round-trip cleanly', () => {
  const stops = generateItineraryFromPreferences({
    durationDays: 2,
    pace: 'Relaxed',
    groupType: 'Family',
    selectedCategories: ['Nature & Landscapes'],
    includeDistrictExcursions: true,
  });

  const firstSlug = stops[0].destinationSlug;
  const secondSlug = stops[1].destinationSlug;
  const reordered = moveItineraryStop(stops, 0, 'down');
  assert.equal(reordered[0].destinationSlug, secondSlug);
  assert.equal(reordered[1].destinationSlug, firstSlug);

  const token = encodeItineraryShareToken(reordered);
  const decoded = decodeItineraryShareToken(token);
  assert.equal(decoded.length, reordered.length);
  assert.equal(decoded[0].destinationSlug, secondSlug);
});

test('validateSubmissionInput rejects empty fields and accepts valid submissions', () => {
  const invalid = validateSubmissionInput({
    entityName: 'A',
    entityType: 'Destination',
    contactName: '',
    contactEmail: 'not-an-email',
    locationDescription: '',
    verificationSource: '',
    details: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.entityName);
  assert.ok(invalid.errors.contactEmail);

  const valid = validateSubmissionInput({
    entityName: 'Khabur Heritage Tea House',
    entityType: 'Restaurant / Cafe',
    contactName: 'Diyar Sindî',
    contactEmail: 'diyar@visitzakho.org',
    locationDescription: 'East Bank near Delal Bridge, Zakho City',
    verificationSource: 'Municipal Trade Registry',
    details: 'Traditional family-run samovar tea house overlooking the eastern arch of Pira Delal.',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
