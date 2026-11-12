export type VerificationBadgeType =
  | 'Verified Fact'
  | 'Editorial Recommendation'
  | 'Estimated Travel Metric'
  | 'Official Institutional Resource';

export type DestinationCategory =
  | 'Historical Sites'
  | 'Architectural Heritage'
  | 'Nature & Landscapes'
  | 'River & Outdoor Activities'
  | 'Culture & Traditions'
  | 'Markets & Shopping'
  | 'Family Experiences'
  | 'Nearby Excursions';

export type GeographicScope = 'Zakho City' | 'Wider Zakho District';

export interface PhotoCredit {
  src: string;
  alt: string;
  caption: string;
  photographer: string;
  license: string;
  source: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  kurdishName: string;
  category: DestinationCategory;
  secondaryCategories: DestinationCategory[];
  geographicScope: GeographicScope;
  shortSummary: string;
  overview: string;
  historicalSignificance: string;
  architectureAndSetting: string;
  coordinates: {
    lat: number;
    lng: number;
    elevationMeters: number;
  };
  distanceFromCenterKm: number;
  estimatedDriveMinutes: number;
  recommendedDuration: string;
  bestTimeOfDay: string;
  openingHoursNote: string;
  admissionNote: string;
  accessibilityNote: string;
  visitorGuidance: string[];
  heroPhoto: PhotoCredit;
  gallery: PhotoCredit[];
  relatedDestinationSlugs: string[];
  nearbyFoodIds: string[];
  nearbyStayIds: string[];
  verificationStatus: VerificationBadgeType;
  lastVerified: string;
  historicalSourceNote: string;
}

export interface ExperienceItem {
  id: string;
  slug: string;
  title: string;
  pillar:
    | 'HISTORY & ARCHITECTURE'
    | 'NATURE & OUTDOORS'
    | 'CULTURE & LOCAL LIFE'
    | 'FOOD & HOSPITALITY'
    | 'MARKETS & SHOPPING'
    | 'PHOTOGRAPHY & SIGHTSEEING';
  subtitle: string;
  editorialIntro: string;
  highlights: string[];
  suggestedDuration: string;
  bestSeason: string;
  intensity: 'Gentle' | 'Moderate' | 'Active';
  photo: PhotoCredit;
  relatedDestinationSlugs: string[];
  practicalTip: string;
}

export interface FoodVenue {
  id: string;
  name: string;
  category: 'Traditional Kurdish Restaurant' | 'Riverfront Cafe' | 'Traditional Bakery' | 'Market Street Food' | 'Family Dining';
  cuisineType: string;
  geographicScope: GeographicScope;
  neighborhood: string;
  coordinates: { lat: number; lng: number };
  description: string;
  signatureDishes: string[];
  openingHours: string;
  priceCategory: 'Local Standard (IQD Cash)' | 'Mid-Range Dining' | 'Price Unverified — Check On-Site';
  contactNote: string;
  visitorNotes: string;
  isSponsored: boolean;
  editorialStatus: VerificationBadgeType;
  photo: PhotoCredit;
  lastVerified: string;
}

export interface TraditionalDish {
  id: string;
  name: string;
  kurdishName: string;
  category: 'Morning Ritual' | 'Main Feast' | 'River Speciality' | 'Bread & Pastry' | 'Beverage';
  description: string;
  culturalContext: string;
  whereToTry: string;
}

export interface AccommodationItem {
  id: string;
  name: string;
  category: 'Hotel' | 'Boutique & Business Hotel' | 'Serviced Apartment' | 'District Mountain Retreat';
  locationArea: string;
  geographicScope: GeographicScope;
  coordinates: { lat: number; lng: number };
  distanceFromDelalKm: number;
  description: string;
  facilities: string[];
  accessibilityInfo: string;
  contactInfo: string;
  bookingGuidance: string;
  externalSearchUrl: string;
  priceGuidance: string;
  verificationStatus: VerificationBadgeType;
  photo: PhotoCredit;
  lastVerified: string;
}

export interface CuratedItinerary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  durationDays: number;
  pace: 'Relaxed' | 'Balanced' | 'Immersive';
  idealFor: ('Solo' | 'Couple' | 'Family' | 'Group')[];
  focusCategories: DestinationCategory[];
  editorialSummary: string;
  photo: PhotoCredit;
  days: {
    dayNumber: number;
    dayTitle: string;
    narrative: string;
    stops: {
      timeSlot: string;
      destinationSlug: string;
      customTitle?: string;
      activityNote: string;
      durationLabel: string;
    }[];
  }[];
  practicalNotes: string[];
}

export interface SeasonGuide {
  id: 'spring' | 'summer' | 'autumn' | 'winter';
  name: string;
  kurdishName: string;
  months: string;
  avgTempRangeC: string;
  rainfallProfile: string;
  daylightHours: string;
  headline: string;
  landscapeDescription: string;
  outdoorSuitability: string;
  clothingRecommendations: string[];
  photographyOpportunities: string[];
  signatureHighlight: string;
  photo: PhotoCredit;
}

export interface EditorialStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTimeMinutes: number;
  coverPhoto: PhotoCredit;
  secondaryPhoto: PhotoCredit;
  pullQuote: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  historicalCitation: string;
  relatedDestinationSlugs: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  category: 'Geography & Arrival' | 'Attractions & Planning' | 'Practical & Currency' | 'Entry & Safety';
  shortAnswer: string;
  detailedAnswer: string;
  relatedLink: { label: string; href: string };
}

export const ZAKHO_PHOTO_CREDITS: Record<string, PhotoCredit> = {
  delalHero: {
    src: '/images/zakho/delal-bridge-hero.jpg',
    alt: 'Delal Bridge (Pira Delal) spanning the Khabur River in Zakho',
    caption: 'Pira Delal rising above the Khabur River in central Zakho, built from hand-carved limestone blocks.',
    photographer: 'R3YBOl',
    license: 'CC BY 4.0',
    source: 'Wikimedia Commons',
  },
  delalFront: {
    src: '/images/zakho/delal-bridge-front.jpg',
    alt: 'Front elevation of Delal Bridge across the Khabur River in Zakho',
    caption: 'The central soaring arch and flanking relief arches of Delal Bridge viewed from the river terrace.',
    photographer: 'R3YBOl',
    license: 'CC BY 4.0',
    source: 'Wikimedia Commons',
  },
  piraDelalRiver: {
    src: '/images/zakho/pira-delal-river.jpg',
    alt: 'Wide riverfront view of Pira Delal Bridge in Zakho, Duhok Governorate',
    caption: 'The Khabur River curving beneath Pira Delal, with the Bekhair mountain ridge on the horizon.',
    photographer: 'Levi Clancy',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons',
  },
  piraDelalArch: {
    src: '/images/zakho/pira-delal-arch.jpg',
    alt: 'Close architectural study of the main limestone arch of Delal Bridge',
    caption: 'Ancient dressed stone masonry of the 16-meter-high central arch of Pira Delal.',
    photographer: 'Levi Clancy',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons',
  },
  khaburBanks: {
    src: '/images/zakho/khabur-river-banks.jpg',
    alt: 'Natural riverbanks of the Little Khabur River in Zakho',
    caption: 'The Little Khabur (Khabur River) flowing through Zakho from the high peaks of northern Mesopotamia.',
    photographer: 'Levi Clancy',
    license: 'CC0 1.0 Public Domain',
    source: 'Wikimedia Commons',
  },
  stoneMasonry: {
    src: '/images/zakho/zakho-stone-masonry.jpg',
    alt: 'Weathered limestone blocks and stone walkway on Delal Bridge in Zakho',
    caption: 'Stepped limestone footpath worn smooth by centuries of caravans, traders, and townspeople.',
    photographer: 'Levi Clancy',
    license: 'CC0 1.0 Public Domain',
    source: 'Wikimedia Commons',
  },
  khaburPromenade: {
    src: '/images/zakho/khabur-promenade.jpg',
    alt: 'Evening promenade along the Khabur River in Zakho',
    caption: 'Riverside walkways and gathering terraces overlooking the Khabur River in central Zakho.',
    photographer: 'Levi Clancy',
    license: 'CC0 1.0 Public Domain',
    source: 'Wikimedia Commons',
  },
  oldQuarter: {
    src: '/images/zakho/zakho-old-quarter.jpg',
    alt: 'Historic island center of Zakho along the Khabur River',
    caption: 'Zakho’s historic river-island core, where markets, mosques, and heritage neighborhoods meet the water.',
    photographer: 'Levi Clancy',
    license: 'CC0 1.0 Public Domain',
    source: 'Wikimedia Commons',
  },
  khaburRapids: {
    src: '/images/zakho/khabur-water-rapids.jpg',
    alt: 'Khabur River currents and stone weirs in Zakho',
    caption: 'Clear mountain meltwater surging over limestone ledges in the Khabur riverbed.',
    photographer: 'Levi Clancy',
    license: 'CC0 1.0 Public Domain',
    source: 'Wikimedia Commons',
  },
  cityPanorama: {
    src: '/images/zakho/zakho-city-panorama.jpg',
    alt: 'Panoramic view of Zakho city and surrounding mountains in Kurdistan Region',
    caption: 'Zakho sprawling across the fertile plain between the Khabur basin and the northern mountain frontier.',
    photographer: 'Moplayer',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons',
  },
  sharanishWaterfall: {
    src: '/images/zakho/sharanish-waterfall.jpg',
    alt: 'Sharanish Waterfall in the mountains northeast of Zakho',
    caption: 'The cascading mountain waters of Sharanish in the highlands of Zakho District.',
    photographer: 'Zaxo',
    license: 'Public Domain',
    source: 'Wikimedia Commons',
  },
  kesteValley: {
    src: '/images/zakho/keste-valley-nature.jpg',
    alt: 'Keste village and valley landscape in Zakho District',
    caption: 'Lush spring pastures and mountain slopes near Keste village in the wider Zakho District.',
    photographer: 'Hamza kurd',
    license: 'CC BY-SA 3.0',
    source: 'Wikimedia Commons',
  },
  borderMountains: {
    src: '/images/zakho/zakho-border-mountains.jpg',
    alt: 'High mountain ridges northeast of Zakho in the Kurdistan Region',
    caption: 'Dramatic limestone and alpine ridges 17 miles northeast of Zakho along the northern highland frontier.',
    photographer: 'cannPOLAT',
    license: 'CC BY 3.0',
    source: 'Wikimedia Commons',
  },
  springMeadows: {
    src: '/images/zakho/zakho-spring-meadows.jpg',
    alt: 'Emerald spring meadows 7 miles southeast of Zakho',
    caption: 'Emerald-green spring vegetation blankets the valleys southeast of Zakho during March and April.',
    photographer: 'Rondik sami',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons',
  },
  bekhairFoothills: {
    src: '/images/zakho/bekhair-foothills.jpg',
    alt: 'Rolling green hills of the Bekhair range near Zakho',
    caption: 'The rolling foothills of Chia-yê Spî (White Mountains / Bekhair range) framing the southern edge of the Zakho plain.',
    photographer: 'rafed omar',
    license: 'CC BY-SA 3.0',
    source: 'Wikimedia Commons',
  },
  winterPeaks: {
    src: '/images/zakho/zakho-winter-peaks.jpg',
    alt: 'Snow-capped mountain peaks 19 miles northeast of Zakho',
    caption: 'Winter snowpack crowns the high peaks northeast of Zakho, feeding the spring swell of the Khabur River.',
    photographer: 'cannPOLAT',
    license: 'CC BY 3.0',
    source: 'Wikimedia Commons',
  },
  historicalPainting1888: {
    src: '/images/zakho/historical-delal-painting-1888.jpg',
    alt: 'View of the Delal Bridge, Zakho (1305 AH / 1888 CE) by pioneer Iraqi painter Abdul Qadir al-Rassam',
    caption: 'Archival oil painting "View of the Delal Bridge, Zakho" dated 1305 AH (1887–1888 CE) by Abdul Qadir al-Rassam.',
    photographer: 'Abdul Qadir Al-Rassam (1888)',
    license: 'Public Domain',
    source: 'Wikimedia Commons',
  },
  delalTwilight: {
    src: '/images/zakho/delal-bridge-twilight.jpg',
    alt: 'Delal Bridge illuminated at dusk over the Khabur River',
    caption: 'Golden-hour and twilight illumination reflecting off the limestone arches of Delal Bridge.',
    photographer: 'Khoshhat',
    license: 'CC BY 4.0',
    source: 'Wikimedia Commons',
  },
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-delal-bridge',
    slug: 'delal-bridge',
    name: 'Delal Bridge (Pira Delal)',
    kurdishName: 'Pira Delal / پرا دەلال',
    category: 'Architectural Heritage',
    secondaryCategories: ['Historical Sites', 'Culture & Traditions', 'Family Experiences'],
    geographicScope: 'Zakho City',
    shortSummary:
      'An iconic 115-meter ancient stone bridge spanning the Khabur River—the architectural emblem of Zakho and one of Mesopotamia’s most celebrated historic crossings.',
    overview:
      'Rising 16 meters above the eastern channel of the Little Khabur River, Delal Bridge (known locally in Kurdish as Pira Delal, meaning "The Dear" or "Beloved Bridge", and historically as Pira Mezin, "The Great Bridge") is the spiritual and architectural heart of Zakho. Constructed entirely of warm, hand-dressed limestone blocks without modern mortar on its exterior facade, the bridge spans approximately 115 meters in length and 4.7 meters in width, anchored by a monumental central arch flanked by smaller flood-relief arches.',
    historicalSignificance:
      'Archaeological and architectural historians debate the exact foundation date of Pira Delal. Local Kurdish tradition and several regional scholars associate its earliest substructures with the Roman-Parthian frontier era (2nd–3rd century CE), while extant masonry shares strong structural parallels with the great Abbasid, Marwanid, and Bahdinan-era stone bridges of northern Mesopotamia (10th–16th centuries). For centuries it served as a vital artery linking Upper Mesopotamia with the Anatolian highlands.',
    architectureAndSetting:
      'Built from large honey-toned limestone ashlar blocks quarried from the nearby mountains, the bridge exhibits remarkable hydraulic engineering. Flanking relief arches allow seasonal spring snowmelt from the Khabur watershed to pass through without undermining the piers. Today, surrounded by landscaped riverfront parks and evening tea terraces, it is exclusively pedestrian.',
    coordinates: {
      lat: 37.1456,
      lng: 42.6953,
      elevationMeters: 440,
    },
    distanceFromCenterKm: 0.8,
    estimatedDriveMinutes: 4,
    recommendedDuration: '1.5 to 2.5 hours',
    bestTimeOfDay: 'Late afternoon through golden hour and early evening',
    openingHoursNote: 'Open 24 hours daily (pedestrian landmark and public riverfront park)',
    admissionNote: 'Free public access',
    accessibilityNote:
      'The surrounding Khabur riverfront promenade offers paved, step-free viewing terraces. Crossing the historic bridge itself involves steep, uneven ancient stone steps and is not wheelchair-accessible.',
    visitorGuidance: [
      'Wear footwear with good grip; centuries of foot traffic have polished the stepped limestone slabs to a smooth sheen.',
      'Visit around sunset when warm amber light illuminates the western face of the limestone arches and locals gather along the riverbanks for tea.',
      'Walk down to the lower pebble bank on the south side for the classic full-arch reflection frame across the Khabur.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.delalHero,
    gallery: [
      ZAKHO_PHOTO_CREDITS.delalHero,
      ZAKHO_PHOTO_CREDITS.delalFront,
      ZAKHO_PHOTO_CREDITS.piraDelalArch,
      ZAKHO_PHOTO_CREDITS.stoneMasonry,
      ZAKHO_PHOTO_CREDITS.historicalPainting1888,
      ZAKHO_PHOTO_CREDITS.delalTwilight,
    ],
    relatedDestinationSlugs: ['khabur-river-corniche', 'zakho-qishla-citadel', 'zakho-old-bazaar'],
    nearbyFoodIds: ['food-delal-river-terrace', 'food-zaxo-heritage-grill', 'food-pira-tea-house'],
    nearbyStayIds: ['stay-khabur-palace-hotel', 'stay-delal-boutique-suites'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Dimensions (~115m length, ~16m height, ~4.7m width) and architectural conservation records verified via Kurdistan Region Directorate of Antiquities (Duhok/Zakho) and UNESCO/regional architectural surveys.',
  },
  {
    id: 'dest-khabur-river',
    slug: 'khabur-river-corniche',
    name: 'Little Khabur River & Island Corniche',
    kurdishName: 'ava Xabîr / ڕووباری خابوور',
    category: 'River & Outdoor Activities',
    secondaryCategories: ['Nature & Landscapes', 'Family Experiences'],
    geographicScope: 'Zakho City',
    shortSummary:
      'The lifeblood of Zakho—an alpine-fed river originating in the northern mountains that bifurcates to cradle Zakho’s historic island center.',
    overview:
      'The Little Khabur (Nahr al-Khabur) rises in the high mountains of Hakkari north of the border and flows southward into the Kurdistan Region, carving a dramatic course through Zakho before joining the Tigris River near Feshkhabur. In the heart of Zakho, the river splits into two branches around a natural island that has anchored human settlement since antiquity.',
    historicalSignificance:
      'Mentioned by Xenophon in the Anabasis (401 BCE) as the Kentrites River and recorded by medieval Islamic geographers including Yaqut al-Hamawi and Ibn Battuta, the Khabur shaped Zakho as a fortified river-island entrepôt. Historically, rafts of inflated skins (kelleks) floated timber, gallnuts, wool, and dried fruits down the Khabur toward the Tigris.',
    architectureAndSetting:
      'Recent urban renewal along the Khabur Corniche in Zakho has created tiered stone embankments, illuminated pedestrian bridges, water weirs, and shaded family promenades stretching along both banks.',
    coordinates: {
      lat: 37.1439,
      lng: 42.6861,
      elevationMeters: 438,
    },
    distanceFromCenterKm: 0.2,
    estimatedDriveMinutes: 2,
    recommendedDuration: '1 to 3 hours',
    bestTimeOfDay: 'Early morning for quiet birdlife and water mist, or after 17:00 for local promenade culture',
    openingHoursNote: 'Open 24 hours daily',
    admissionNote: 'Free public access along the municipal river walk',
    accessibilityNote:
      'The renovated central Corniche walkways feature wide, flat paved paths, ramps, and benches suitable for strollers and wheelchairs.',
    visitorGuidance: [
      'Spring (March–May) brings peak snowmelt volume from the northern mountains, turning the river weirs into roaring cascades.',
      'Notice how the river bifurcates to form the historic island neighborhood of central Zakho.',
      'Swimming in strong seasonal currents is discouraged; enjoy the riverside cafes, pedestrian bridges, and viewing decks instead.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.piraDelalRiver,
    gallery: [
      ZAKHO_PHOTO_CREDITS.piraDelalRiver,
      ZAKHO_PHOTO_CREDITS.khaburBanks,
      ZAKHO_PHOTO_CREDITS.khaburPromenade,
      ZAKHO_PHOTO_CREDITS.khaburRapids,
    ],
    relatedDestinationSlugs: ['delal-bridge', 'zakho-old-bazaar', 'zakho-qishla-citadel'],
    nearbyFoodIds: ['food-delal-river-terrace', 'food-khabur-fish-house', 'food-pira-tea-house'],
    nearbyStayIds: ['stay-khabur-palace-hotel', 'stay-zakho-grand-residence'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Hydrological path from Uludere/Hakkari through Zakho to the Tigris confluence at Feshkhabur verified via geographic and historical gazetteers.',
  },
  {
    id: 'dest-zakho-old-bazaar',
    slug: 'zakho-old-bazaar',
    name: 'Zakho Historic Bazaar & Island Market',
    kurdishName: 'Bazara Kevin a Zaxo / بازاڕی کۆنی زاخۆ',
    category: 'Markets & Shopping',
    secondaryCategories: ['Culture & Traditions', 'Historical Sites'],
    geographicScope: 'Zakho City',
    shortSummary:
      'A vibrant labyrinth of spice merchants, copper artisans, Kurdish tailors, and walnut-sweet bakers in the historic island heart of Zakho.',
    overview:
      'Set on the central island embraced by the two arms of the Khabur River, the Zakho Bazaar has operated continuously for generations as a crossroads trading hub between the Mesopotamian plains and the Anatolian mountains. Walking its covered lanes and open market squares reveals the sensory richness of Bahdinan culture.',
    historicalSignificance:
      'Historically home to Muslim, Christian (Chaldean, Syriac, and Armenian), and Jewish merchants working side by side, the market quarters of Zakho were renowned for weaving, silverwork, saddlery, mountain honey, gallnuts, and agricultural produce from surrounding valleys.',
    architectureAndSetting:
      'A dense fabric of traditional shopfronts, shaded arcades, bakeries with wood-fired clay ovens, and specialized alleys dedicated to textiles (specifically traditional Kurdish Shal u Shapik woolens and embroidered fabrics), goldsmiths, and mountain herbs.',
    coordinates: {
      lat: 37.1433,
      lng: 42.6838,
      elevationMeters: 442,
    },
    distanceFromCenterKm: 0.1,
    estimatedDriveMinutes: 1,
    recommendedDuration: '1.5 to 2 hours',
    bestTimeOfDay: 'Morning (09:00–12:30) or late afternoon (16:00–19:30)',
    openingHoursNote: 'Most stalls operate Saturday–Thursday 08:30–20:00; quieter on Friday mornings.',
    admissionNote: 'Free entry',
    accessibilityNote:
      'Main market avenues are paved and level, though narrower side alleys can be crowded with display stalls and slight curb transitions.',
    visitorGuidance: [
      'Carry Iraqi Dinar (IQD) cash in small denominations (1,000, 5,000, 10,000 IQD notes) for spices, pastries, and tea.',
      'Look for seasonal mountain produce: wild spring herbs (kenger, tolik), sumac, dried figs, walnuts, and local tahini (rashi).',
      'Always ask permission with a warm smile ("Bê zehmet, wêne?") before photographing individual shopkeepers or elders.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.oldQuarter,
    gallery: [
      ZAKHO_PHOTO_CREDITS.oldQuarter,
      ZAKHO_PHOTO_CREDITS.cityPanorama,
      ZAKHO_PHOTO_CREDITS.khaburPromenade,
    ],
    relatedDestinationSlugs: ['zakho-qishla-citadel', 'qubad-pasha-heritage-quarter', 'khabur-river-corniche'],
    nearbyFoodIds: ['food-bazaar-nan-bakery', 'food-zaxo-heritage-grill', 'food-pira-tea-house'],
    nearbyStayIds: ['stay-khabur-palace-hotel', 'stay-delal-boutique-suites'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Location on the central island of Zakho verified via municipal mapping and historical urban surveys.',
  },
  {
    id: 'dest-zakho-qishla',
    slug: 'zakho-qishla-citadel',
    name: 'The Qishla of Zakho (Historic River Citadel)',
    kurdishName: 'Qişla Zaxo / قشڵەی زاخۆ',
    category: 'Historical Sites',
    secondaryCategories: ['Architectural Heritage', 'Culture & Traditions'],
    geographicScope: 'Zakho City',
    shortSummary:
      'Standing on the eastern bank of the Khabur River, this historic stone complex evolved from a Bahdinan principality stronghold into an Ottoman-era administrative garrison.',
    overview:
      'Overlooking the Khabur River in the historic core of Zakho, the Qishla (Qishla of Zakho) is one of the city’s defining historical monuments. Built upon the foundations of an older ruler’s fortress associated with the Emirate of Bahdinan, its surviving courtyard structure and watchtower reflect the layered military and civic history of the city.',
    historicalSignificance:
      'During the rule of the Bahdinan princes (particularly associated in historical chronicles with rulers such as Sultan Hussein Wali and Qubad Pasha) and later under late Ottoman provincial administration in the 19th century, the Qishla functioned as the seat of governance overlooking the strategic river crossing.',
    architectureAndSetting:
      'Constructed of local rubble stone, dressed limestone corners, and lime mortar, the compound features a prominent circular/polygonal bastion tower and two-story arched galleries facing the river.',
    coordinates: {
      lat: 37.1445,
      lng: 42.6852,
      elevationMeters: 445,
    },
    distanceFromCenterKm: 0.3,
    estimatedDriveMinutes: 2,
    recommendedDuration: '45 to 60 minutes',
    bestTimeOfDay: 'Morning light for photographing the eastern river facade',
    openingHoursNote: 'Exterior and riverfront plaza accessible daily; interior access depends on ongoing heritage conservation schedules.',
    admissionNote: 'Free exterior viewing',
    accessibilityNote: 'Level viewing from the adjacent Khabur riverfront sidewalk and plaza.',
    visitorGuidance: [
      'Combine your visit with a walk through the adjacent Zakho Old Bazaar and the central Khabur Corniche.',
      'Observe the masonry transition between older foundation courses and 19th-century administrative expansions.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.cityPanorama,
    gallery: [
      ZAKHO_PHOTO_CREDITS.cityPanorama,
      ZAKHO_PHOTO_CREDITS.oldQuarter,
      ZAKHO_PHOTO_CREDITS.historicalPainting1888,
    ],
    relatedDestinationSlugs: ['zakho-old-bazaar', 'qubad-pasha-heritage-quarter', 'delal-bridge'],
    nearbyFoodIds: ['food-zaxo-heritage-grill', 'food-bazaar-nan-bakery'],
    nearbyStayIds: ['stay-khabur-palace-hotel', 'stay-delal-boutique-suites'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Documented by the Directorate of Antiquities in Duhok/Zakho as a key heritage structure of the Bahdinan and Ottoman periods.',
  },
  {
    id: 'dest-qubad-pasha',
    slug: 'qubad-pasha-heritage-quarter',
    name: 'Qubad Pasha Mosque & Historic Religious Quarter',
    kurdishName: 'Mizgefta Qubad Paşa & Taxên Kevin',
    category: 'Culture & Traditions',
    secondaryCategories: ['Historical Sites', 'Architectural Heritage'],
    geographicScope: 'Zakho City',
    shortSummary:
      'Historic religious landmarks and old neighborhoods reflecting Zakho’s deep Bahdinan heritage and centuries of coexistence among Muslims, Christians, and Jews.',
    overview:
      'Within the historic fabric of Zakho stand longstanding houses of worship and old stone neighborhoods linked to the era of the Bahdinan Principality, alongside historic Chaldean and Syriac Christian churches and the memory of Zakho’s ancient Jewish quarter ("Little Jerusalem").',
    historicalSignificance:
      'Named in connection with Qubad Pasha of the Bahdinan dynasty (16th century), the historic religious foundations of Zakho anchor the city’s tradition of scholarship, craftsmanship, and multi-confessional community life along the Khabur.',
    architectureAndSetting:
      'Located within walking distance of the central island bazaar, surrounded by traditional courtyard homes and active neighborhood squares.',
    coordinates: {
      lat: 37.1428,
      lng: 42.6825,
      elevationMeters: 444,
    },
    distanceFromCenterKm: 0.4,
    estimatedDriveMinutes: 3,
    recommendedDuration: '1 hour',
    bestTimeOfDay: 'Mid-morning outside main congregational prayer times',
    openingHoursNote: 'Active places of worship; visitors are welcome outside prayer and liturgical hours with respectful attire.',
    admissionNote: 'Free; respectful dress required',
    accessibilityNote: 'Street-level entries in the central neighborhood; modest step thresholds at courtyard doors.',
    visitorGuidance: [
      'Dress modestly (shoulders and knees covered; headscarf recommended for women when entering mosque prayer halls).',
      'Remove shoes at the designated racks before stepping onto carpeted prayer areas.',
      'Avoid visiting during Friday midday congregational prayers (approx. 11:30–13:15).',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.oldQuarter,
    gallery: [
      ZAKHO_PHOTO_CREDITS.oldQuarter,
      ZAKHO_PHOTO_CREDITS.stoneMasonry,
    ],
    relatedDestinationSlugs: ['zakho-old-bazaar', 'zakho-qishla-citadel', 'delal-bridge'],
    nearbyFoodIds: ['food-bazaar-nan-bakery', 'food-zaxo-heritage-grill'],
    nearbyStayIds: ['stay-khabur-palace-hotel'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Historical attribution tied to the Bahdinan Principality heritage of Zakho and documented local religious landmarks.',
  },
  {
    id: 'dest-sharanish-waterfall',
    slug: 'sharanish-waterfall',
    name: 'Sharanish Waterfall & Alpine Village',
    kurdishName: 'Geliyê Şeranşê / شەرانش',
    category: 'Nature & Landscapes',
    secondaryCategories: ['Nearby Excursions', 'Family Experiences'],
    geographicScope: 'Wider Zakho District',
    shortSummary:
      'A spectacular mountain waterfall and historic Christian-Kurdish highland village nestled in a dramatic limestone canyon northeast of Zakho.',
    overview:
      'Located approximately 35 kilometers northeast of Zakho city in the Darkar sub-district near the northern mountain frontier, Sharanish (Şeranş) is famed for its cold, crystal-clear mountain waterfall tumbling down sheer rock faces into shaded walnut and plane-tree groves.',
    historicalSignificance:
      'The twin villages of Sharanish (historically home to an ancient Chaldean Catholic community alongside Kurdish neighbors) sit beneath towering alpine cliffs and retain historic stone churches and terraced orchards.',
    architectureAndSetting:
      'A high-elevation canyon environment where snowmelt feeds perennial springs, natural rock pools, and shaded picnic terraces popular with families escaping the summer heat of the plains.',
    coordinates: {
      lat: 37.2589,
      lng: 42.9042,
      elevationMeters: 1120,
    },
    distanceFromCenterKm: 35.0,
    estimatedDriveMinutes: 48,
    recommendedDuration: '3 to 5 hours (Half-day excursion)',
    bestTimeOfDay: 'Morning to mid-afternoon',
    openingHoursNote: 'Daylight hours recommended; mountain road travel is best completed before dusk.',
    admissionNote: 'Public nature site; small seasonal parking or gazebo rental fees may apply in summer.',
    accessibilityNote:
      'Mountain terrain with stone steps, steep paths, and wet rocks near the waterfall base; limited wheelchair accessibility.',
    visitorGuidance: [
      'Notice: This attraction is in the Wider Zakho District (approx. 35 km northeast of Zakho City), requiring a private car or hired taxi.',
      'Check current local travel advisories before venturing into high border-mountain valleys, and remain on established main roads and picnic areas.',
      'Bring a light jacket even in summer; mountain water spray and elevation keep the canyon significantly cooler than Zakho city.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.sharanishWaterfall,
    gallery: [
      ZAKHO_PHOTO_CREDITS.sharanishWaterfall,
      ZAKHO_PHOTO_CREDITS.borderMountains,
      ZAKHO_PHOTO_CREDITS.winterPeaks,
    ],
    relatedDestinationSlugs: ['keste-valley-springs', 'batifa-highland-corridor', 'bekhair-white-mountains'],
    nearbyFoodIds: ['food-sharanish-mountain-trout'],
    nearbyStayIds: ['stay-zakho-grand-residence', 'stay-batifa-mountain-lodges'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Geographic coordinates and distance (~35 km NE of Zakho in Zakho Independent Administration) verified via regional cartography.',
  },
  {
    id: 'dest-keste-valley',
    slug: 'keste-valley-springs',
    name: 'Keste Valley & Highland Pastures',
    kurdishName: 'Gundê Kestê / گوندی کەستە',
    category: 'Nearby Excursions',
    secondaryCategories: ['Nature & Landscapes', 'Culture & Traditions'],
    geographicScope: 'Wider Zakho District',
    shortSummary:
      'Verdant mountain pastures, spring wildflowers, and deep river gorges in the eastern highlands of Zakho District.',
    overview:
      'In the mountainous eastern reaches of the wider Zakho region, valleys such as Keste (Gundê Kestê) showcase the dramatic transition from the Sindî plain to the rugged Zagros-Taurus folds. During spring, the hillsides erupt in wild tulips, irises, oak woodland, and pastoral meadows.',
    historicalSignificance:
      'Traditional mountain villages in this belt preserve agro-pastoral Kurdish lifeways—beekeeping, vineyard cultivation, walnut harvesting, and seasonal transhumance.',
    architectureAndSetting:
      'Terraced mountain slopes overlooking deep tributary streams that feed the regional watershed.',
    coordinates: {
      lat: 37.224,
      lng: 43.051,
      elevationMeters: 980,
    },
    distanceFromCenterKm: 42.0,
    estimatedDriveMinutes: 55,
    recommendedDuration: 'Half-day scenic drive',
    bestTimeOfDay: 'Morning to early afternoon in Spring (March–May)',
    openingHoursNote: 'Daylight visitation only',
    admissionNote: 'Open rural landscape',
    accessibilityNote: 'Unpaved rural tracks and steep hillside gradients.',
    visitorGuidance: [
      'Situated in the wider mountain district outside Zakho city; travel with a local driver familiar with current rural road conditions.',
      'Ideal during Newroz and spring months (March–May) when the valleys are at their greenest.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.kesteValley,
    gallery: [
      ZAKHO_PHOTO_CREDITS.kesteValley,
      ZAKHO_PHOTO_CREDITS.springMeadows,
      ZAKHO_PHOTO_CREDITS.borderMountains,
    ],
    relatedDestinationSlugs: ['sharanish-waterfall', 'batifa-highland-corridor', 'bekhair-white-mountains'],
    nearbyFoodIds: ['food-sharanish-mountain-trout'],
    nearbyStayIds: ['stay-batifa-mountain-lodges'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Verified rural locality in the wider Zakho / Amedi highland transition zone.',
  },
  {
    id: 'dest-bekhair-mountain',
    slug: 'bekhair-white-mountains',
    name: 'Bekhair Mountain Range (Chia-yê Spî / White Mountains)',
    kurdishName: 'Çiyayê Spî / چیای سپی (بێخێر)',
    category: 'Nature & Landscapes',
    secondaryCategories: ['River & Outdoor Activities', 'Nearby Excursions'],
    geographicScope: 'Wider Zakho District',
    shortSummary:
      'The dramatic limestone anticline forming the southern horizon of Zakho—traversed by the Zakho Tunnel and crowned by panoramic viewpoints over the Sindî plain.',
    overview:
      'Known in Kurdish as Çiyayê Spî ("The White Mountain") or Mount Bekhair, this commanding limestone ridge rises immediately south of Zakho, separating the Zakho basin (Sindî plain) from the Duhok and Summel valleys to the south.',
    historicalSignificance:
      'For millennia, caravan routes wound over the Geliyê Zaxo (Zakho Pass) across Mount Bekhair. Today, twin modern highway tunnels pierce the mountain, while the old mountain pass road offers sweeping views back across the entirety of Zakho city and the Khabur basin.',
    architectureAndSetting:
      'Exposed pale Cretaceous/Tertiary limestone strata, seasonal almond and oak scrubland, and high panoramic lookouts.',
    coordinates: {
      lat: 37.0912,
      lng: 42.6785,
      elevationMeters: 890,
    },
    distanceFromCenterKm: 8.5,
    estimatedDriveMinutes: 14,
    recommendedDuration: '1.5 to 2 hours',
    bestTimeOfDay: 'Sunrise or golden hour before sunset for panoramic city photography',
    openingHoursNote: 'Accessible year-round via paved mountain road',
    admissionNote: 'Free public access at roadside scenic overlooks',
    accessibilityNote: 'Scenic viewpoints along the old Zakho Pass road can be reached directly by car.',
    visitorGuidance: [
      'Take the old mountain pass road above the Zakho Tunnel for panoramic photography overlooking the entire city.',
      'In March and April, the southern and northern foothills around Zakho turn vibrant emerald green (`Green hills SE of Zakho`).',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.bekhairFoothills,
    gallery: [
      ZAKHO_PHOTO_CREDITS.bekhairFoothills,
      ZAKHO_PHOTO_CREDITS.springMeadows,
      ZAKHO_PHOTO_CREDITS.cityPanorama,
    ],
    relatedDestinationSlugs: ['delal-bridge', 'khabur-river-corniche', 'sharanish-waterfall'],
    nearbyFoodIds: ['food-zaxo-heritage-grill', 'food-delal-river-terrace'],
    nearbyStayIds: ['stay-zakho-grand-residence', 'stay-khabur-palace-hotel'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Geological and geographic boundary between the Zakho plain and Duhok basin verified via regional maps.',
  },
  {
    id: 'dest-batifa-highlands',
    slug: 'batifa-highland-corridor',
    name: 'Batifa & Xabûr Highland Corridor',
    kurdishName: 'Batîfa / باتیفا',
    category: 'Nearby Excursions',
    secondaryCategories: ['Nature & Landscapes', 'Family Experiences'],
    geographicScope: 'Wider Zakho District',
    shortSummary:
      'A scenic sub-district east of Zakho known for orchard valleys, cool summer breezes, and access to the upper reaches of the regional river system.',
    overview:
      'Situated approximately 27 kilometers east of Zakho city within the Zakho Independent Administration, the Batifa sub-district serves as the gateway to the eastern mountain valleys, orchards, and seasonal recreation spots.',
    historicalSignificance:
      'A longstanding agricultural and trading sub-center connecting Zakho with the eastern valleys of Bahdinan.',
    architectureAndSetting:
      'Foothill valleys framed by snow-dusted northern ridges in winter and orchard-lined streams in summer.',
    coordinates: {
      lat: 37.1815,
      lng: 42.9522,
      elevationMeters: 760,
    },
    distanceFromCenterKm: 27.0,
    estimatedDriveMinutes: 34,
    recommendedDuration: '2 to 4 hours',
    bestTimeOfDay: 'Morning through afternoon',
    openingHoursNote: 'Open daily via the main Zakho–Batifa highway',
    admissionNote: 'Free public access',
    accessibilityNote: 'Main town center and roadside valley stops are paved and car-accessible.',
    visitorGuidance: [
      'Located in the Wider Zakho District east of the city; combine with a morning drive toward Sharanish.',
      'Stop at local roadside fruit stands in late summer and autumn for figs, pomegranates, and mountain apples.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.borderMountains,
    gallery: [
      ZAKHO_PHOTO_CREDITS.borderMountains,
      ZAKHO_PHOTO_CREDITS.winterPeaks,
      ZAKHO_PHOTO_CREDITS.kesteValley,
    ],
    relatedDestinationSlugs: ['sharanish-waterfall', 'keste-valley-springs', 'bekhair-white-mountains'],
    nearbyFoodIds: ['food-sharanish-mountain-trout'],
    nearbyStayIds: ['stay-batifa-mountain-lodges'],
    verificationStatus: 'Verified Fact',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Official sub-district of the Zakho Independent Administration.',
  },
  {
    id: 'dest-ibrahim-khalil-gateway',
    slug: 'ibrahim-khalil-gateway',
    name: 'Ibrahim Khalil International Gateway & Trade Corridor',
    kurdishName: 'Deriyê Îbrahîm Xelîl / دەروازەی ئیبراهیم خەلیل',
    category: 'Culture & Traditions',
    secondaryCategories: ['Nearby Excursions'],
    geographicScope: 'Wider Zakho District',
    shortSummary:
      'The primary overland bridge between the Kurdistan Region of Iraq and Turkey (Habur)—understanding Zakho’s role as an international commercial crossroads.',
    overview:
      'Located approximately 10 kilometers northwest of Zakho city center where the Khabur River meets the Turkish frontier near Silopi, the Ibrahim Khalil border crossing is one of the busiest and most strategically vital overland gateways in the Middle East. Note: This is an active international customs and border facility rather than a recreational sight, included here because overland travelers arriving from Europe and Turkey enter Zakho directly through this corridor.',
    historicalSignificance:
      'Named in regional tradition after Prophet Ibrahim (Abraham), whose legendary journey through Upper Mesopotamia passes through this river corridor, the crossing has linked Anatolia and Mesopotamia from antiquity to the modern era.',
    architectureAndSetting:
      'Modern international customs plaza and bridge crossing over the Khabur/Hezil confluence northwest of Zakho.',
    coordinates: {
      lat: 37.1435,
      lng: 42.5675,
      elevationMeters: 410,
    },
    distanceFromCenterKm: 11.5,
    estimatedDriveMinutes: 16,
    recommendedDuration: 'Transit gateway (30–90 minutes depending on border formalities)',
    bestTimeOfDay: '24-hour international crossing',
    openingHoursNote: 'Operates 24/7 for authorized international passenger and commercial transit.',
    admissionNote: 'Valid passport and official Kurdistan Region / Republic of Iraq visa or e-Visa required.',
    accessibilityNote: 'Full vehicular transit lanes and modern passenger terminal halls.',
    visitorGuidance: [
      'Strict Photography Rule: Photography and video recording are strictly prohibited inside and around all border, customs, and security installations.',
      'International visitors should verify current Kurdistan Region e-Visa (visit.gov.krd) requirements prior to arrival.',
    ],
    heroPhoto: ZAKHO_PHOTO_CREDITS.khaburBanks,
    gallery: [ZAKHO_PHOTO_CREDITS.khaburBanks, ZAKHO_PHOTO_CREDITS.cityPanorama],
    relatedDestinationSlugs: ['khabur-river-corniche', 'delal-bridge'],
    nearbyFoodIds: ['food-zaxo-heritage-grill'],
    nearbyStayIds: ['stay-zakho-grand-residence', 'stay-khabur-palace-hotel'],
    verificationStatus: 'Official Institutional Resource',
    lastVerified: '2026-11-01',
    historicalSourceNote:
      'Official international border crossing of the Kurdistan Region of Iraq.',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-history-architecture',
    slug: 'history-and-architecture',
    title: 'Stone Across Centuries: The Architectural Heritage of Zakho',
    pillar: 'HISTORY & ARCHITECTURE',
    subtitle: 'Trace the dressed limestone arches of Pira Delal, the river bastion of the Qishla, and the island urbanism of old Bahdinan.',
    editorialIntro:
      'Zakho’s architectural story is written in river-carved limestone. Unlike cities built on arid plains, Zakho evolved on a natural island encircled by the Little Khabur. Its historic monuments—most famously Delal Bridge—demonstrate how builders engineered soaring stone arches to withstand fierce spring mountain floods while connecting empires.',
    highlights: [
      'Walk the 115-meter stepped limestone span of Delal Bridge at golden hour.',
      'Study the fortification masonry and river watchtower of the Qishla of Zakho.',
      'Compare today’s riverfront with Abdul Qadir al-Rassam’s 1888 oil painting of Zakho.',
    ],
    suggestedDuration: '3 to 4 hours',
    bestSeason: 'Year-round (Spring & Autumn ideal)',
    intensity: 'Gentle',
    photo: ZAKHO_PHOTO_CREDITS.piraDelalArch,
    relatedDestinationSlugs: ['delal-bridge', 'zakho-qishla-citadel', 'qubad-pasha-heritage-quarter'],
    practicalTip:
      'Begin at the eastern bank of Delal Bridge two hours before sunset, then follow the Khabur River west into the historic island core.',
  },
  {
    id: 'exp-nature-outdoors',
    slug: 'nature-and-outdoors',
    title: 'From the Khabur Currents to the Waterfalls of Sharanish',
    pillar: 'NATURE & OUTDOORS',
    subtitle: 'Follow the watershed upstream from Zakho’s emerald riverbanks into alpine canyons, walnut groves, and the White Mountains.',
    editorialIntro:
      'Within forty minutes of Zakho’s urban boulevards, the landscape rises steeply into dramatic limestone gorges and alpine meadows. Fed by winter snowpack along the northern frontier peaks, cold mountain streams tumble through Sharanish and Keste before converging in the Khabur basin.',
    highlights: [
      'Hike to the base of Sharanish Waterfall in the cool mountain air of northeast Zakho District.',
      'Drive the scenic ridge of Chia-yê Spî (Bekhair / White Mountains) for sweeping views over the Sindî plain.',
      'Witness the emerald wildflower meadows southeast of Zakho during March and April.',
    ],
    suggestedDuration: 'Half-day to Full-day',
    intensity: 'Moderate',
    bestSeason: 'Spring (March–May) & Summer (June–September)',
    photo: ZAKHO_PHOTO_CREDITS.sharanishWaterfall,
    relatedDestinationSlugs: ['sharanish-waterfall', 'keste-valley-springs', 'bekhair-white-mountains', 'khabur-river-corniche'],
    practicalTip:
      'Hire a local driver in Zakho for mountain excursions so you can stop effortlessly at viewpoints and orchard villages.',
  },
  {
    id: 'exp-culture-local-life',
    slug: 'culture-and-local-life',
    title: 'Evening on the Khabur: Hospitality, Music & Living Tradition',
    pillar: 'CULTURE & LOCAL LIFE',
    subtitle: 'Experience the warmth of Bahdinani Kurdish culture, multi-faith heritage, and the nightly gathering ritual along the river.',
    editorialIntro:
      'In Zakho, culture is not confined to vitrines—it lives in the cadence of Kurmanji conversation over glass cups of cardamom tea, in the acoustic folk heritage of Heyran and Lawik ballads, and in the legendary generosity shown to travelers arriving at the city gates.',
    highlights: [
      'Join families and elders along the illuminated Khabur Corniche after dusk.',
      'Explore the multi-layered heritage of a city shaped by Muslim, Christian, and Jewish neighbors.',
      'Visit during March to witness Newroz bonfires lighting the hillsides around the Zakho plain.',
    ],
    suggestedDuration: '2 to 3 hours',
    intensity: 'Gentle',
    bestSeason: 'Year-round',
    photo: ZAKHO_PHOTO_CREDITS.khaburPromenade,
    relatedDestinationSlugs: ['khabur-river-corniche', 'qubad-pasha-heritage-quarter', 'zakho-old-bazaar'],
    practicalTip:
      'When offered tea ("Çay") by a shopkeeper or host, accepting it is a cherished gesture of mutual respect in Kurdish hospitality.',
  },
  {
    id: 'exp-food-hospitality',
    slug: 'food-and-hospitality',
    title: 'A Table by the River: The Culinary Heritage of Zakho',
    pillar: 'FOOD & HOSPITALITY',
    subtitle: 'From wood-fired Khabur river fish (Masgouf-style) and stuffed vine leaves to morning Kahi with clotted cream and mountain honey.',
    editorialIntro:
      'Zakho’s table brings together the pastoral abundance of the Kurdish highlands and the spice routes of Upper Mesopotamia. Meals are communal, unhurried, and anchored by fresh herbs, sumac, wood-baked flatbreads, slow-simmered lamb, and local tahini pressed from regional sesame.',
    highlights: [
      'Start the morning in the Old Bazaar with flaky Kahi pastry, Geymar (buffalo cream), and wild mountain honey.',
      'Savor charcoal-grilled Khabur fish or tender Kurdish lamb kebabs overlooking the river weirs.',
      'Taste seasonal Kurdish Dolma, Dokliw (yogurt-herb grain soup), and local sesame tahini.',
    ],
    suggestedDuration: '2 to 4 hours across morning and evening',
    intensity: 'Gentle',
    bestSeason: 'Year-round',
    photo: ZAKHO_PHOTO_CREDITS.piraDelalRiver,
    relatedDestinationSlugs: ['zakho-old-bazaar', 'khabur-river-corniche', 'delal-bridge'],
    practicalTip:
      'Most traditional bakeries and breakfast houses serve their freshest Kahi and Naan between 06:30 and 10:00 AM.',
  },
  {
    id: 'exp-markets-shopping',
    slug: 'markets-and-shopping',
    title: 'Caravan Threads: Exploring the Zakho Bazaar & Artisan Alleys',
    pillar: 'MARKETS & SHOPPING',
    subtitle: 'Navigate covered spice lanes, traditional Kurdish textile workshops, and dried mountain fruit merchants.',
    editorialIntro:
      'Positioned on the historic island core, the Zakho Bazaar remains an authentic working market primarily serving local residents rather than souvenir stalls. Here you find genuine Kurdish textiles, hand-woven woolens, copperware, and culinary ingredients harvested from surrounding villages.',
    highlights: [
      'Browse hand-tailored Shal u Shapik textiles and traditional woven sashes.',
      'Sample stone-milled tahini (Rashi), wild sumac, roasted chickpeas (Nok), and walnut sujuk.',
      'Observe traditional bread bakers slapping dough onto blazing clay tannour walls.',
    ],
    suggestedDuration: '1.5 to 2.5 hours',
    intensity: 'Gentle',
    bestSeason: 'Year-round',
    photo: ZAKHO_PHOTO_CREDITS.oldQuarter,
    relatedDestinationSlugs: ['zakho-old-bazaar', 'zakho-qishla-citadel'],
    practicalTip:
      'Bring Iraqi Dinar (IQD) cash; small artisan workshops and spice vendors operate exclusively in cash.',
  },
  {
    id: 'exp-photography-sightseeing',
    slug: 'photography-and-sightseeing',
    title: 'Light on Limestone: A Photographer’s Journey Through Zakho',
    pillar: 'PHOTOGRAPHY & SIGHTSEEING',
    subtitle: 'Discover verified vantage points for architectural studies, river reflections, and high-altitude mountain panoramas.',
    editorialIntro:
      'With its warm honey-colored stone, turquoise-green mountain river, and dramatic amphitheater of surrounding peaks, Zakho offers extraordinary compositional range—from intimate street documentary in the bazaar to sweeping landscape frames from the Bekhair ridge.',
    highlights: [
      'Low-angle river reflection of Delal Bridge from the southern shingle bank at sunrise.',
      'Telephoto compression of Delal Bridge framed against the northern border peaks.',
      'Golden-hour city panorama from the old Zakho Pass road on Chia-yê Spî.',
    ],
    suggestedDuration: 'Full day (Sunrise + Golden Hour)',
    intensity: 'Moderate',
    bestSeason: 'Spring (green valleys) & Autumn (crisp golden light)',
    photo: ZAKHO_PHOTO_CREDITS.delalTwilight,
    relatedDestinationSlugs: ['delal-bridge', 'bekhair-white-mountains', 'sharanish-waterfall', 'khabur-river-corniche'],
    practicalTip:
      'Never photograph military checkpoints, police posts, or the Ibrahim Khalil border zone. In the city and bazaar, people are exceptionally welcoming when asked first.',
  },
];

export const FOOD_VENUES: FoodVenue[] = [
  {
    id: 'food-delal-river-terrace',
    name: 'Pira Delal Riverfront Tea & Grill Terraces',
    category: 'Riverfront Cafe',
    cuisineType: 'Kurdish Tea House & Charcoal Grill',
    geographicScope: 'Zakho City',
    neighborhood: 'Delal Bridge Park (East & South Bank)',
    coordinates: { lat: 37.1452, lng: 42.6948 },
    description:
      'Open-air municipal and family-run riverfront terraces positioned directly opposite Delal Bridge, where visitors and locals gather for black tea brewed over charcoal samovars, grilled meats, and evening river views.',
    signatureDishes: ['Samovar Cardamom Tea (Çay)', 'Charcoal Lamb Tikka', 'Kurdish Naan with Sumac & Grilled Tomatoes'],
    openingHours: 'Daily 09:00 – 23:30 (Open later on warm summer evenings)',
    priceCategory: 'Local Standard (IQD Cash)',
    contactNote: 'Walk-in seating along the Pira Delal pedestrian promenade',
    visitorNotes:
      'Verified public dining/tea promenade zone immediately overlooking Delal Bridge. No advance reservation required.',
    isSponsored: false,
    editorialStatus: 'Editorial Recommendation',
    photo: ZAKHO_PHOTO_CREDITS.delalTwilight,
    lastVerified: '2026-11-01',
  },
  {
    id: 'food-zaxo-heritage-grill',
    name: 'Central Island Traditional Kurdish Kabab & Quzi Houses',
    category: 'Traditional Kurdish Restaurant',
    cuisineType: 'Traditional Bahdinani Kurdish Cuisine',
    geographicScope: 'Zakho City',
    neighborhood: 'Zakho Central Island / Old Bazaar Approach',
    coordinates: { lat: 37.1436, lng: 42.6845 },
    description:
      'Long-established traditional Kurdish dining rooms near the historic bazaar serving midday feasts of slow-braised lamb shank (Quzi), vine-leaf Dolma, white bean stew, and hand-minced Adana/Kurdish skewers.',
    signatureDishes: ['Kurdish Lamb Quzi on Briyani Rice', 'Bahdinani Dolma', 'Minced Lamb Kabab with Tannour Bread', 'Mastaw (Salted Yogurt Drink)'],
    openingHours: 'Daily 11:00 – 22:00 (Peak lunch service 12:00 – 15:00)',
    priceCategory: 'Local Standard (IQD Cash)',
    contactNote: 'Located along the main bazaar boulevard in central Zakho',
    visitorNotes:
      'Meals almost always begin with complimentary bowls of lentil or tomato soup, crisp pickled vegetables, and hot flatbread.',
    isSponsored: false,
    editorialStatus: 'Editorial Recommendation',
    photo: ZAKHO_PHOTO_CREDITS.oldQuarter,
    lastVerified: '2026-11-01',
  },
  {
    id: 'food-khabur-fish-house',
    name: 'Khabur Corniche Roasted Fish Restaurants',
    category: 'Family Dining',
    cuisineType: 'Mesopotamian River Fish & Charcoal Specialties',
    geographicScope: 'Zakho City',
    neighborhood: 'Khabur Corniche Boulevard',
    coordinates: { lat: 37.1442, lng: 42.6879 },
    description:
      'Family-oriented dining spots along the Khabur River Corniche specializing in whole carp and river fish butterflied and slow-roasted beside glowing fruitwood embers (Masgouf method), finished with tangy pomegranate molasses and tamarind.',
    signatureDishes: ['Wood-Fired Butterfly Carp (Masgouf Style)', 'Tamarind & Tomato Brusket Sauce', 'Spiced Red Rice', 'Pickled Turnips (Tirşî)'],
    openingHours: 'Daily 12:00 – 23:00',
    priceCategory: 'Mid-Range Dining',
    contactNote: 'Khabur Corniche waterfront strip, Zakho',
    visitorNotes:
      'Whole wood-roasted fish takes approximately 35–45 minutes to cook fresh to order; enjoy salads and tea by the river while waiting.',
    isSponsored: false,
    editorialStatus: 'Editorial Recommendation',
    photo: ZAKHO_PHOTO_CREDITS.khaburPromenade,
    lastVerified: '2026-11-01',
  },
  {
    id: 'food-bazaar-nan-bakery',
    name: 'Old Bazaar Tannour Bakeries & Kahi Breakfast Stalls',
    category: 'Traditional Bakery',
    cuisineType: 'Kurdish Artisanal Bakery & Morning Dairy',
    geographicScope: 'Zakho City',
    neighborhood: 'Inside Zakho Old Bazaar',
    coordinates: { lat: 37.1431, lng: 42.6832 },
    description:
      'Traditional morning bakeries and tahini presses tucked inside the Zakho Bazaar, turning out blistering-hot clay-oven flatbreads (Nanê Tenûrê), layered flaky Kahi pastries, local buffalo cream (Geymar), and sesame tahini mingled with date or grape syrup.',
    signatureDishes: ['Fresh Kahi & Geymar with Mountain Honey', 'Rashi &Dims (Local Sesame Tahini with Grape/Date Molasses)', 'Hot Clay-Oven Tannour Bread'],
    openingHours: 'Daily 06:00 – 14:00 (Best visited before 10:00 AM)',
    priceCategory: 'Local Standard (IQD Cash)',
    contactNote: 'Central lanes of Zakho Historic Bazaar',
    visitorNotes:
      'Ask for a plate of Rashi u Dims (tahini swirled with dark syrup) alongside hot tannour bread—a signature Zakho winter and spring breakfast.',
    isSponsored: false,
    editorialStatus: 'Verified Fact',
    photo: ZAKHO_PHOTO_CREDITS.stoneMasonry,
    lastVerified: '2026-11-01',
  },
  {
    id: 'food-pira-tea-house',
    name: 'Khabur Island Heritage Chai Khana',
    category: 'Riverfront Cafe',
    cuisineType: 'Traditional Kurdish Tea House',
    geographicScope: 'Zakho City',
    neighborhood: 'Old Bridge Approach / Island Quarter',
    coordinates: { lat: 37.1449, lng: 42.6912 },
    description:
      'A classic neighborhood Chai Khana (tea house) where elders, traders, and visitors sit on woven benches sipping strong cardamom-scented black tea or sweet milk tea while discussing local history.',
    signatureDishes: ['Glass-Cup Kurdish Black Tea', 'Spiced Milk Tea', 'Local Walnut & Fig Pastries'],
    openingHours: 'Daily 07:00 – 22:30',
    priceCategory: 'Local Standard (IQD Cash)',
    contactNote: 'East island approach toward Pira Delal',
    visitorNotes:
      'An authentic window into daily Zakho social life.',
    isSponsored: false,
    editorialStatus: 'Editorial Recommendation',
    photo: ZAKHO_PHOTO_CREDITS.khaburBanks,
    lastVerified: '2026-11-01',
  },
  {
    id: 'food-sharanish-mountain-trout',
    name: 'Sharanish Canyon Seasonal Picnic & Grill Gazebos',
    category: 'Family Dining',
    cuisineType: 'Seasonal Mountain Grill & Picnic Tea',
    geographicScope: 'Wider Zakho District',
    neighborhood: 'Sharanish Waterfall Valley (35 km NE of Zakho)',
    coordinates: { lat: 37.2582, lng: 42.9035 },
    description:
      'Seasonal outdoor shaded platforms beside the cold mountain stream of Sharanish, operating primarily from late spring through early autumn for families grilling fresh meats and brewing tea beside the waterfall.',
    signatureDishes: ['Charcoal-Grilled Chicken & Lamb Skewers', 'Mountain Stream-Chilled Watermelon & Fruit', 'Samovar Tea'],
    openingHours: 'Seasonal (May – October), Daylight hours 09:00 – 18:30',
    priceCategory: 'Price Unverified — Check On-Site',
    contactNote: 'Sharanish Valley, Darkar Sub-District, Zakho',
    visitorNotes:
      'Seasonal operation only; outside summer peak months, bring your own picnic provisions and water from Zakho city.',
    isSponsored: false,
    editorialStatus: 'Verified Fact',
    photo: ZAKHO_PHOTO_CREDITS.sharanishWaterfall,
    lastVerified: '2026-11-01',
  },
];

export const TRADITIONAL_DISHES: TraditionalDish[] = [
  {
    id: 'dish-rashi-dims',
    name: 'Rashi & Dims (Sesame Tahini & Grape/Date Molasses)',
    kurdishName: 'Reşî û Dims',
    category: 'Morning Ritual',
    description:
      'The Zakho region is famous across Kurdistan and Iraq for its stone-ground sesame tahini (Rashi), milled using traditional water- and stone-press methods. Swirled with rich dark grape or date molasses (Dims) and scooped with warm clay-oven bread, it is the quintessential Zakho breakfast.',
    culturalContext: 'Prized for centuries as high-energy sustenance for mountain travelers and winter mornings.',
    whereToTry: 'Zakho Old Bazaar bakeries and traditional breakfast houses.',
  },
  {
    id: 'dish-dolma',
    name: 'Bahdinani Kurdish Dolma (Yaprax)',
    kurdishName: 'Dolme / Yaprax',
    category: 'Main Feast',
    description:
      'Delicate vine leaves, hollowed onions, courgettes, and Swiss chard parcels filled with short-grain rice, hand-minced lamb, fresh dill, sumac, and pomegranate tang, slow-simmered in a large communal pot.',
    culturalContext: 'The centerpiece of Friday family gatherings and guest hospitality across Zakho.',
    whereToTry: 'Traditional Kurdish restaurants on Zakho Central Island.',
  },
  {
    id: 'dish-khabur-masgouf',
    name: 'Wood-Fired River Fish',
    kurdishName: 'Masiyê Brî / Masgouf',
    category: 'River Speciality',
    description:
      'Fresh river carp split lengthwise, seasoned with rock salt, turmeric, and tamarind, and roasted vertically around an open pit of glowing oak or fruitwood logs before being finished on the coals with tomato and onion.',
    culturalContext: 'Connects Zakho’s Khabur river culture with the wider Mesopotamian river culinary tradition.',
    whereToTry: 'Khabur Corniche waterfront fish restaurants.',
  },
  {
    id: 'dish-dokliw',
    name: 'Dokliw / Spiced Yogurt & Mountain Herb Stew',
    kurdishName: 'Dokliw / Avmast',
    category: 'Main Feast',
    description:
      'A comforting Bahdinan specialty cooked with churned yogurt, cracked wheat or rice, wild mountain herbs gathered in spring, and tender lamb.',
    culturalContext: 'Reflects the pastoral highland heritage of the valleys surrounding Zakho.',
    whereToTry: 'Traditional home-style kitchens and seasonal spring dining spots.',
  },
];

export const ACCOMMODATIONS: AccommodationItem[] = [
  {
    id: 'stay-zakho-grand-residence',
    name: 'International Highway & New City Business Hotels',
    category: 'Boutique & Business Hotel',
    locationArea: 'Ibrahim Khalil International Highway / New Zakho Boulevard',
    geographicScope: 'Zakho City',
    coordinates: { lat: 37.1495, lng: 42.6685 },
    distanceFromDelalKm: 2.6,
    description:
      'Modern multi-story business and transit hotels situated along Zakho’s western commercial boulevard between the city center and the international highway. Equipped for international travelers, diplomats, and cross-border business visitors.',
    facilities: ['24-Hour Reception', 'Air Conditioning & Heating', 'On-Site Restaurant', 'Private Secure Parking', 'Wi-Fi Connectivity', 'Airport/Border Transfer Arrangement'],
    accessibilityInfo: 'Elevator access to upper floors, step-free lobby entrance, and paved vehicle drop-off.',
    contactInfo: 'Verify current direct desk telephone via official hotel reception or major regional booking portals.',
    bookingGuidance:
      'International visitors can book via major global hotel aggregators or arrange reservations directly via WhatsApp/telephone prior to arrival.',
    externalSearchUrl: 'https://www.google.com/maps/search/Hotels+in+Zakho+Kurdistan+Region+Iraq/@37.145,42.685,14z',
    priceGuidance: 'Rates vary seasonally; contact property directly for current USD / IQD room tariffs.',
    verificationStatus: 'Verified Fact',
    photo: ZAKHO_PHOTO_CREDITS.cityPanorama,
    lastVerified: '2026-11-01',
  },
  {
    id: 'stay-khabur-palace-hotel',
    name: 'Central Zakho & Khabur Corniche Hotels',
    category: 'Hotel',
    locationArea: 'Central Zakho / Khabur River Corridor',
    geographicScope: 'Zakho City',
    coordinates: { lat: 37.1448, lng: 42.6872 },
    distanceFromDelalKm: 0.9,
    description:
      'Centrally positioned city hotels within walking or short taxi distance of the Khabur Corniche, Zakho Old Bazaar, and Delal Bridge. Ideal for cultural visitors prioritizing walkable access to the historic island core.',
    facilities: ['Central Location', 'Air Conditioning', 'Breakfast Service', 'Wi-Fi', 'Taxi Assistance'],
    accessibilityInfo: 'Most central mid-rise hotels provide elevator service; confirm step-free bathroom access when booking.',
    contactInfo: 'Central Zakho commercial district along the Khabur River.',
    bookingGuidance:
      'Walk-in availability is generally good outside major holidays (Newroz in late March and Eid holidays, when advance booking is essential).',
    externalSearchUrl: 'https://www.google.com/maps/search/Central+Hotels+near+Delal+Bridge+Zakho/@37.1456,42.6953,15z',
    priceGuidance: 'Price information sourced directly at property reception (IQD / USD accepted).',
    verificationStatus: 'Verified Fact',
    photo: ZAKHO_PHOTO_CREDITS.khaburPromenade,
    lastVerified: '2026-11-01',
  },
  {
    id: 'stay-delal-boutique-suites',
    name: 'Zakho Family Serviced Apartments & Aparthotels',
    category: 'Serviced Apartment',
    locationArea: 'Newroz & Bedar Residential Districts, Zakho',
    geographicScope: 'Zakho City',
    coordinates: { lat: 37.1525, lng: 42.6915 },
    distanceFromDelalKm: 1.4,
    description:
      'Multi-bedroom furnished apartments and aparthotels popular with visiting families and longer-stay travelers seeking living rooms, kitchenettes, and neighborhood quiet near Delal Bridge.',
    facilities: ['Multi-Bedroom Layouts', 'Kitchenette', 'Family Living Area', 'On-Site Parking', '24/7 Backup Power Generator'],
    accessibilityInfo: 'Modern residential towers include elevators and ground-level parking.',
    contactInfo: 'Northern and eastern residential boulevards of Zakho City.',
    bookingGuidance: 'Recommended for families or groups staying 2+ nights in Zakho.',
    externalSearchUrl: 'https://www.google.com/maps/search/Apartments+and+Suites+Zakho+Iraq/@37.150,42.690,14z',
    priceGuidance: 'Nightly and weekly family rates negotiated on-site or via phone.',
    verificationStatus: 'Verified Fact',
    photo: ZAKHO_PHOTO_CREDITS.delalHero,
    lastVerified: '2026-11-01',
  },
  {
    id: 'stay-batifa-mountain-lodges',
    name: 'Highland Eco-Cabins & Seasonal Resort Villas (Wider District)',
    category: 'District Mountain Retreat',
    locationArea: 'Batifa & Duhok–Zakho Highland Belt',
    geographicScope: 'Wider Zakho District',
    coordinates: { lat: 37.1785, lng: 42.941 },
    distanceFromDelalKm: 25.5,
    description:
      'Seasonal mountain chalets and garden villas located in the cooler foothill valleys outside Zakho city, favored by domestic travelers during summer weekends.',
    facilities: ['Mountain Views', 'Outdoor Garden & Grill Area', 'Private Parking', 'Family Chalet Format'],
    accessibilityInfo: 'Hillside garden plots often include stepped terraces; verify ground-floor access in advance.',
    contactInfo: 'Batifa & surrounding highland corridor (Wider Zakho District).',
    bookingGuidance: 'High demand on Thursday and Friday nights from May through September.',
    externalSearchUrl: 'https://www.google.com/maps/search/Resorts+and+Chalets+near+Zakho+Batifa/@37.178,42.940,12z',
    priceGuidance: 'Seasonal villa rental rates vary by weekday vs weekend.',
    verificationStatus: 'Estimated Travel Metric',
    photo: ZAKHO_PHOTO_CREDITS.bekhairFoothills,
    lastVerified: '2026-11-01',
  },
];

export const CURATED_ITINERARIES: CuratedItinerary[] = [
  {
    id: 'itin-one-day',
    slug: 'one-day-in-zakho',
    title: 'One Day in Zakho: The Essential River & Heritage Loop',
    subtitle: 'Experience the best of Zakho City in a single unforgettable day—from morning tahini in the Old Bazaar to sunset at Delal Bridge.',
    durationDays: 1,
    pace: 'Balanced',
    idealFor: ['Solo', 'Couple', 'Family', 'Group'],
    focusCategories: ['Architectural Heritage', 'Historical Sites', 'Markets & Shopping', 'River & Outdoor Activities'],
    editorialSummary:
      'Designed for travelers with 24 hours in Zakho, this walkable and short-hop itinerary follows the thread of the Khabur River through the historic island core, the Qishla, and the monumental limestone arches of Pira Delal.',
    photo: ZAKHO_PHOTO_CREDITS.delalHero,
    days: [
      {
        dayNumber: 1,
        dayTitle: 'The Island Bazaar, The Citadel & The Beloved Bridge',
        narrative:
          'Begin where Zakho wakes up—inside the historic island bazaar—before tracing the Khabur River eastward to Pira Delal for golden hour.',
        stops: [
          {
            timeSlot: '08:30 AM',
            destinationSlug: 'zakho-old-bazaar',
            activityNote: 'Breakfast of hot tannour bread, Kahi, or local Rashi u Dims (tahini and molasses), followed by spice and textile browsing.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '10:45 AM',
            destinationSlug: 'qubad-pasha-heritage-quarter',
            activityNote: 'Walk the historic religious and residential lanes of old Zakho, observing the city’s Bahdinan architectural roots.',
            durationLabel: '1 hour',
          },
          {
            timeSlot: '12:00 PM',
            destinationSlug: 'zakho-qishla-citadel',
            activityNote: 'View the historic Qishla river bastion overlooking the eastern channel of the Khabur, followed by a traditional Kurdish lunch.',
            durationLabel: '2 hours (incl. lunch)',
          },
          {
            timeSlot: '15:30 PM',
            destinationSlug: 'delal-bridge',
            activityNote: 'Cross the ancient limestone steps of Delal Bridge (Pira Delal), photograph the 16-meter central arch from the pebble bank, and stay for sunset tea.',
            durationLabel: '2.5 hours',
          },
          {
            timeSlot: '18:30 PM',
            destinationSlug: 'khabur-river-corniche',
            activityNote: 'Evening stroll along the illuminated Khabur River Corniche and dinner of wood-fired river fish.',
            durationLabel: '2 hours',
          },
        ],
      },
    ],
    practicalNotes: [
      'Total walking distance within the city core is approximately 3.5 km.',
      'All stops on this 1-day itinerary are within Zakho City limits.',
    ],
  },
  {
    id: 'itin-weekend',
    slug: 'weekend-in-zakho',
    title: 'A Weekend in Zakho: City Heritage & Sharanish Waterfall',
    subtitle: 'Pair a full day on the Khabur River in Zakho City with a refreshing mountain excursion to Sharanish and the White Mountains.',
    durationDays: 2,
    pace: 'Balanced',
    idealFor: ['Couple', 'Family', 'Group'],
    focusCategories: ['Architectural Heritage', 'Nature & Landscapes', 'Nearby Excursions', 'Markets & Shopping'],
    editorialSummary:
      'Two days allow you to experience both dimensions of Zakho: the historic stone city on the Khabur island and the cool alpine waterfalls and ridges of the wider Zakho District.',
    photo: ZAKHO_PHOTO_CREDITS.piraDelalRiver,
    days: [
      {
        dayNumber: 1,
        dayTitle: 'Day 1 — Historic Zakho & The Khabur Thread',
        narrative: 'Immerse yourself in the historic island center, the Qishla, and Pira Delal.',
        stops: [
          {
            timeSlot: '09:00 AM',
            destinationSlug: 'zakho-old-bazaar',
            activityNote: 'Morning exploration of Zakho Old Bazaar, spice alleys, and traditional Kurdish tailors.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '11:30 AM',
            destinationSlug: 'zakho-qishla-citadel',
            activityNote: 'Inspect the Qishla of Zakho and walk the historic island embankments.',
            durationLabel: '1.5 hours',
          },
          {
            timeSlot: '16:00 PM',
            destinationSlug: 'delal-bridge',
            activityNote: 'Golden hour at Pira Delal and evening samovar tea on the river terraces.',
            durationLabel: '2.5 hours',
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: 'Day 2 — Sharanish Canyon & The White Mountains Ridge',
        narrative: 'Journey northeast into the limestone mountains before returning via the panoramic Bekhair overlook.',
        stops: [
          {
            timeSlot: '09:00 AM',
            destinationSlug: 'sharanish-waterfall',
            activityNote: 'Drive 48 minutes northeast to Sharanish Waterfall; explore the canyon and mountain village.',
            durationLabel: '3.5 hours',
          },
          {
            timeSlot: '13:30 PM',
            destinationSlug: 'batifa-highland-corridor',
            activityNote: 'Scenic detour through the Batifa foothill valley and seasonal fruit orchards.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '16:30 PM',
            destinationSlug: 'bekhair-white-mountains',
            activityNote: 'Sunset panorama over the entire Sindî plain and Zakho skyline from Chia-yê Spî (White Mountains).',
            durationLabel: '1.5 hours',
          },
        ],
      },
    ],
    practicalNotes: [
      'Day 1 is walkable/short-taxi inside Zakho City; Day 2 requires a private vehicle or hired local taxi for the 35 km mountain drive.',
    ],
  },
  {
    id: 'itin-three-days',
    slug: 'three-days-exploring-zakho',
    title: 'Three Days Exploring Zakho: Complete City & Highland Immersion',
    subtitle: 'The definitive 72-hour journey covering ancient architecture, river life, culinary rituals, and high mountain valleys.',
    durationDays: 3,
    pace: 'Immersive',
    idealFor: ['Solo', 'Couple', 'Group'],
    focusCategories: ['Architectural Heritage', 'Nature & Landscapes', 'Culture & Traditions', 'Nearby Excursions'],
    editorialSummary:
      'For international travelers who want to understand Zakho deeply—combining architectural photography, slow mornings in the bazaar, cultural encounters, and full highland exploration.',
    photo: ZAKHO_PHOTO_CREDITS.cityPanorama,
    days: [
      {
        dayNumber: 1,
        dayTitle: 'Day 1 — Arrival on the Khabur & Pira Delal',
        narrative: 'Orient yourself along the river that shaped Zakho.',
        stops: [
          {
            timeSlot: '14:00 PM',
            destinationSlug: 'khabur-river-corniche',
            activityNote: 'Walk the Khabur Corniche to see how the river bifurcates around central Zakho.',
            durationLabel: '1.5 hours',
          },
          {
            timeSlot: '16:00 PM',
            destinationSlug: 'delal-bridge',
            activityNote: 'Architectural exploration of Delal Bridge at golden hour and dusk.',
            durationLabel: '2.5 hours',
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: 'Day 2 — The Island Core, Bazaar Crafts & Panoramic Ridges',
        narrative: 'Dive into the living heritage of old Zakho before ascending the White Mountains at sunset.',
        stops: [
          {
            timeSlot: '08:30 AM',
            destinationSlug: 'zakho-old-bazaar',
            activityNote: 'Morning bakery breakfast and artisan walk through the island market.',
            durationLabel: '2.5 hours',
          },
          {
            timeSlot: '11:30 AM',
            destinationSlug: 'qubad-pasha-heritage-quarter',
            activityNote: 'Explore the historic religious quarter and learn about Zakho’s multi-faith history.',
            durationLabel: '1.5 hours',
          },
          {
            timeSlot: '14:00 PM',
            destinationSlug: 'zakho-qishla-citadel',
            activityNote: 'Visit the Qishla river citadel and old stone embankments.',
            durationLabel: '1 hour',
          },
          {
            timeSlot: '16:30 PM',
            destinationSlug: 'bekhair-white-mountains',
            activityNote: 'Drive the old Zakho Pass on Mount Bekhair for twilight views over the city.',
            durationLabel: '2 hours',
          },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: 'Day 3 — Waterfalls & Valleys of the Northern Frontier',
        narrative: 'Spend your final day in the cool highland valleys of Sharanish, Batifa, and Keste.',
        stops: [
          {
            timeSlot: '08:30 AM',
            destinationSlug: 'sharanish-waterfall',
            activityNote: 'Morning arrival at Sharanish Waterfall for peaceful photography and mountain air.',
            durationLabel: '3 hours',
          },
          {
            timeSlot: '12:30 PM',
            destinationSlug: 'batifa-highland-corridor',
            activityNote: 'Midday drive and lunch along the Batifa highland corridor.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '15:00 PM',
            destinationSlug: 'keste-valley-springs',
            activityNote: 'Afternoon scenic drive through the Keste valley pastures before returning to Zakho.',
            durationLabel: '2 hours',
          },
        ],
      },
    ],
    practicalNotes: [
      'Check seasonal weather before Day 3; spring and early summer offer the most dramatic waterfall flow and green pastures.',
    ],
  },
  {
    id: 'itin-history-heritage',
    slug: 'history-and-heritage-journey',
    title: 'History & Heritage Journey: Footsteps of Caravans & Princes',
    subtitle: 'A curated architectural and historical study of Zakho’s bridges, fortifications, and centuries-old trade routes.',
    durationDays: 1,
    pace: 'Relaxed',
    idealFor: ['Solo', 'Couple', 'Group'],
    focusCategories: ['Historical Sites', 'Architectural Heritage', 'Culture & Traditions'],
    editorialSummary:
      'Focuses strictly on verified historical and architectural monuments within Zakho City, tracing its evolution from an ancient river crossing to a Bahdinan stronghold.',
    photo: ZAKHO_PHOTO_CREDITS.historicalPainting1888,
    days: [
      {
        dayNumber: 1,
        dayTitle: 'Monuments of the Khabur Island',
        narrative: 'Examine the stone engineering and urban morphology of historic Zakho.',
        stops: [
          {
            timeSlot: '09:00 AM',
            destinationSlug: 'delal-bridge',
            activityNote: 'Detailed morning masonry study of Pira Delal’s central and relief arches in crisp morning light.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '11:30 AM',
            destinationSlug: 'zakho-qishla-citadel',
            activityNote: 'Examine the Qishla watchtower and riverfront garrison architecture.',
            durationLabel: '1.5 hours',
          },
          {
            timeSlot: '14:30 PM',
            destinationSlug: 'qubad-pasha-heritage-quarter',
            activityNote: 'Walk the historic quarters associated with the Bahdinan principality and multi-faith communities.',
            durationLabel: '1.5 hours',
          },
          {
            timeSlot: '16:30 PM',
            destinationSlug: 'zakho-old-bazaar',
            activityNote: 'Late afternoon exploration of historic caravan trade lanes and traditional crafts.',
            durationLabel: '2 hours',
          },
        ],
      },
    ],
    practicalNotes: [
      'Ideal for historians, architects, and cultural travelers.',
    ],
  },
  {
    id: 'itin-nature-photography',
    slug: 'nature-and-photography-journey',
    title: 'Nature & Photography Journey: River Light & Alpine Ridges',
    subtitle: 'Timed to golden hour, blue hour, and midday canyon light across Zakho’s finest natural and architectural frames.',
    durationDays: 2,
    pace: 'Immersive',
    idealFor: ['Solo', 'Couple'],
    focusCategories: ['Nature & Landscapes', 'River & Outdoor Activities', 'Architectural Heritage'],
    editorialSummary:
      'Built specifically around sun angles, water reflections, and high-elevation viewpoints in Zakho and its surrounding mountains.',
    photo: ZAKHO_PHOTO_CREDITS.delalTwilight,
    days: [
      {
        dayNumber: 1,
        dayTitle: 'Day 1 — River Reflections & Mountain Horizon',
        narrative: 'Capture Pira Delal at dawn and the entire Sindî plain from Mount Bekhair at sunset.',
        stops: [
          {
            timeSlot: '06:30 AM',
            destinationSlug: 'delal-bridge',
            activityNote: 'Sunrise mirror reflections from the southern pebble bank of the Khabur.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '10:00 AM',
            destinationSlug: 'khabur-river-corniche',
            activityNote: 'Photograph river rapids, stone weirs, and bridges along the Little Khabur.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '16:30 PM',
            destinationSlug: 'bekhair-white-mountains',
            activityNote: 'Wide-angle sunset and blue-hour city lights from Chia-yê Spî.',
            durationLabel: '2 hours',
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: 'Day 2 — Waterfalls & Emerald Valleys',
        narrative: 'Long-exposure waterfall photography in Sharanish and spring pastures in Keste.',
        stops: [
          {
            timeSlot: '08:30 AM',
            destinationSlug: 'sharanish-waterfall',
            activityNote: 'Long-exposure water cascades in open canyon shade before harsh midday sun.',
            durationLabel: '3 hours',
          },
          {
            timeSlot: '14:00 PM',
            destinationSlug: 'keste-valley-springs',
            activityNote: 'Landscape photography across the eastern mountain valleys and frontier peaks.',
            durationLabel: '2.5 hours',
          },
        ],
      },
    ],
    practicalNotes: [
      'Pack a tripod and neutral-density (ND) filter for Delal Bridge twilight and Sharanish Waterfall.',
    ],
  },
  {
    id: 'itin-food-culture',
    slug: 'food-and-culture-journey',
    title: 'Food & Culture Journey: Flavors of the Khabur & Bazaar',
    subtitle: 'Taste Zakho from dawn clay ovens and stone-milled sesame tahini to evening samovar tea beside Delal Bridge.',
    durationDays: 1,
    pace: 'Relaxed',
    idealFor: ['Solo', 'Couple', 'Family', 'Group'],
    focusCategories: ['Culture & Traditions', 'Markets & Shopping', 'Family Experiences'],
    editorialSummary:
      'A sensory culinary walk through Zakho’s gastronomic traditions, markets, and riverfront hospitality.',
    photo: ZAKHO_PHOTO_CREDITS.khaburPromenade,
    days: [
      {
        dayNumber: 1,
        dayTitle: 'From Clay Oven to River Ember',
        narrative: 'Follow the daily rhythm of Zakho’s food culture across three signature meals.',
        stops: [
          {
            timeSlot: '08:00 AM',
            destinationSlug: 'zakho-old-bazaar',
            activityNote: 'Morning tasting of Kahi with Geymar, Rashi u Dims, and hot tannour bread, plus spice and walnut shopping.',
            durationLabel: '2.5 hours',
          },
          {
            timeSlot: '13:00 PM',
            destinationSlug: 'qubad-pasha-heritage-quarter',
            activityNote: 'Midday feast of Bahdinani Dolma and lamb Quzi in the central island dining quarter.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '17:00 PM',
            destinationSlug: 'delal-bridge',
            activityNote: 'Charcoal-brewed samovar tea and local pastries overlooking Pira Delal at sunset.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '19:30 PM',
            destinationSlug: 'khabur-river-corniche',
            activityNote: 'Dinner of wood-roasted Khabur fish along the illuminated Corniche.',
            durationLabel: '2 hours',
          },
        ],
      },
    ],
    practicalNotes: [
      'Vegetarian travelers will find abundant fresh flatbreads, Rashi u Dims, grilled vegetables, lentil soups, hummus, and mountain herbs.',
    ],
  },
  {
    id: 'itin-family-discovery',
    slug: 'family-friendly-discovery',
    title: 'Family-Friendly Discovery: River Parks, Legends & Mountain Picnics',
    subtitle: 'A gentle, engaging itinerary crafted for families traveling with children—combining safe promenades, bridge legends, and nature.',
    durationDays: 2,
    pace: 'Relaxed',
    idealFor: ['Family'],
    focusCategories: ['Family Experiences', 'River & Outdoor Activities', 'Nature & Landscapes'],
    editorialSummary:
      'Focuses on stroller-friendly riverfront parks, accessible viewpoints, and relaxed family picnic spots.',
    photo: ZAKHO_PHOTO_CREDITS.springMeadows,
    days: [
      {
        dayNumber: 1,
        dayTitle: 'Day 1 — Pira Delal Gardens & Khabur River Walk',
        narrative: 'Easy, open-air exploration along Zakho’s landscaped riverfront.',
        stops: [
          {
            timeSlot: '10:00 AM',
            destinationSlug: 'zakho-old-bazaar',
            activityNote: 'Sample sweet walnut sujuk, dried figs, and fresh bakery pastries in the bazaar.',
            durationLabel: '1.5 hours',
          },
          {
            timeSlot: '15:30 PM',
            destinationSlug: 'delal-bridge',
            activityNote: 'Explore the gardens around Delal Bridge and share the folk legend of the master builder.',
            durationLabel: '2 hours',
          },
          {
            timeSlot: '18:00 PM',
            destinationSlug: 'khabur-river-corniche',
            activityNote: 'Family walk along the wide, paved Khabur Corniche with ice cream and riverside dining.',
            durationLabel: '2 hours',
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: 'Day 2 — Mountain Views & Sharanish Picnic',
        narrative: 'A gentle scenic drive into the green valleys around Zakho.',
        stops: [
          {
            timeSlot: '10:00 AM',
            destinationSlug: 'sharanish-waterfall',
            activityNote: 'Family picnic in the shaded walnut groves near Sharanish stream.',
            durationLabel: '3 hours',
          },
          {
            timeSlot: '15:30 PM',
            destinationSlug: 'bekhair-white-mountains',
            activityNote: 'Easy car-accessible viewpoint stop overlooking the Zakho plain.',
            durationLabel: '1 hour',
          },
        ],
      },
    ],
    practicalNotes: [
      'Hold children’s hands closely if walking onto the historic stone deck of Delal Bridge, as the ancient parapets are low.',
    ],
  },
];

export const SEASONAL_GUIDE: SeasonGuide[] = [
  {
    id: 'spring',
    name: 'Spring',
    kurdishName: 'Bihar / بەهار',
    months: 'March – May',
    avgTempRangeC: '12°C – 26°C (Long-term climate average)',
    rainfallProfile: 'Moderate spring showers in March/April; lush snowmelt river volume',
    daylightHours: '12 to 14 hours',
    headline: 'The Emerald Awakening & Newroz Season',
    landscapeDescription:
      'Spring is widely considered the crown jewel of the Zakho calendar. Winter snows melting off the northern frontier peaks swell the Khabur River into a powerful turquoise torrent beneath Delal Bridge, while the hills of Bekhair, Keste, and Sharanish turn a vivid emerald green carpeted with wildflowers.',
    outdoorSuitability: 'Exceptional — Peak season for all city walks, mountain hikes, waterfalls, and photography.',
    clothingRecommendations: [
      'Layered breathable clothing (cotton shirts with a light windproof jacket or fleece for cool evenings).',
      'Sturdy walking shoes for damp limestone steps and green valley trails.',
    ],
    photographyOpportunities: [
      'Peak whitewater flow surging through the relief arches of Delal Bridge.',
      'Newroz (Kurdish New Year on March 21) cultural celebrations and traditional attire across the hills.',
      'Emerald pastures 7 miles southeast of Zakho under dramatic spring clouds.',
    ],
    signatureHighlight: 'Newroz celebrations (March 21) & peak Khabur snowmelt cascades.',
    photo: ZAKHO_PHOTO_CREDITS.springMeadows,
  },
  {
    id: 'summer',
    name: 'Summer',
    kurdishName: 'Havîn / هاوین',
    months: 'June – August',
    avgTempRangeC: '24°C – 41°C in city / 18°C – 31°C in Sharanish highlands',
    rainfallProfile: 'Virtually rainless; clear skies and low humidity',
    daylightHours: '14 to 14.5 hours',
    headline: 'Highland Escapes & Nocturnal River Promenades',
    landscapeDescription:
      'Midday temperatures on the Zakho plain are hot and dry under cloudless skies, shifting the rhythm of life into two distinct worlds: daytime retreats into the cool, shaded mountain canyon of Sharanish Waterfall (at 1,100+ meters elevation), followed by vibrant late-night gatherings along the Khabur River Corniche and Delal Bridge until midnight.',
    outdoorSuitability: 'Best early morning (06:00–10:00), evening (after 18:00), or daytime in high mountain valleys.',
    clothingRecommendations: [
      'Lightweight, loose-fitting linen or cotton garments in light colors.',
      'Sun hat, UV sunglasses, high-SPF sunscreen, and refillable water bottle.',
      'A light shawl or overshirt for air-conditioned interiors and cool mountain shade.',
    ],
    photographyOpportunities: [
      'Golden-hour and blue-hour reflections on the calm summer waters of the Khabur.',
      'Dappled sunlight through walnut trees at Sharanish Waterfall.',
    ],
    signatureHighlight: 'Lively evening tea culture around Pira Delal and cool canyon escapes in Sharanish.',
    photo: ZAKHO_PHOTO_CREDITS.sharanishWaterfall,
  },
  {
    id: 'autumn',
    name: 'Autumn',
    kurdishName: 'Payîz / پاییز',
    months: 'September – November',
    avgTempRangeC: '14°C – 29°C (Long-term climate average)',
    rainfallProfile: 'Crisp dry September/October; first autumn rains arrive in November',
    daylightHours: '10.5 to 12.5 hours',
    headline: 'Golden Limestone, Pomegranate Harvests & Gentle Warmth',
    landscapeDescription:
      'Autumn brings crystalline visibility and mild, golden afternoons that echo the honey-colored stone of Delal Bridge. In the surrounding valleys and the Old Bazaar, orchards yield pomegranates, late figs, walnuts, and fresh-pressed sesame for Rashi.',
    outdoorSuitability: 'Excellent — Ideal walking temperatures throughout the day in both Zakho City and the district.',
    clothingRecommendations: [
      'Comfortable daywear (shirts, light trousers) with a sweater or medium jacket for crisp November evenings.',
    ],
    photographyOpportunities: [
      'Low-angle autumn sunlight casting warm copper tones across Delal Bridge and the Qishla.',
      'Autumn foliage in the orchard valleys of Batifa and Sharanish.',
    ],
    signatureHighlight: 'Autumn harvest abundance in Zakho Old Bazaar and mild all-day sightseeing weather.',
    photo: ZAKHO_PHOTO_CREDITS.delalHero,
  },
  {
    id: 'winter',
    name: 'Winter',
    kurdishName: 'Zivistan / زستان',
    months: 'December – February',
    avgTempRangeC: '3°C – 13°C in city / Sub-zero in northern border peaks',
    rainfallProfile: 'Winter rains in the city; heavy snowpack on the mountains 15–20 miles northeast',
    daylightHours: '9.5 to 10.5 hours',
    headline: 'Snow-Crowned Horizons & Warm Bazaar Hearths',
    landscapeDescription:
      'While Zakho city itself experiences cool, rainy Mediterranean-continental winters with occasional light snow, the towering mountain ridges 16 to 19 miles northeast turn into a dramatic wall of white snowpack. Inside the city, steaming clay bakeries, Rashi u Dims breakfasts, and charcoal tea houses offer cozy refuge.',
    outdoorSuitability: 'Good for city heritage, bazaar exploration, and dramatic snow-mountain vista photography.',
    clothingRecommendations: [
      'Warm winter coat, waterproof footwear, scarf, and thermal layers.',
    ],
    photographyOpportunities: [
      'Telephoto frames of Delal Bridge backed by snow-covered northern frontier peaks.',
      'Atmospheric mist rising off the Khabur River on crisp winter mornings.',
    ],
    signatureHighlight: 'Snow-draped mountain backdrops and hot Rashi u Dims breakfasts in the Old Bazaar.',
    photo: ZAKHO_PHOTO_CREDITS.winterPeaks,
  },
];

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: 'story-delal-bridge',
    slug: 'the-story-of-delal-bridge',
    title: 'Stone, River, and Legend: The Enduring Mystery of Pira Delal',
    subtitle: 'How a 115-meter limestone span over the Little Khabur became the architectural soul of Zakho and an enduring symbol of Kurdish heritage.',
    category: 'Architecture & Heritage',
    author: 'Visit Zakho Editorial Curators',
    authorRole: 'Architectural & Historical Research Desk',
    publishedDate: 'November 2026',
    readTimeMinutes: 6,
    coverPhoto: ZAKHO_PHOTO_CREDITS.piraDelalArch,
    secondaryPhoto: ZAKHO_PHOTO_CREDITS.historicalPainting1888,
    pullQuote:
      'To stand on the crown of Pira Delal is to stand at the exact point where mountain snowmelt, ancient engineering, and oral poetry converge.',
    sections: [
      {
        heading: '01. An Engineering Marvel on the Khabur',
        paragraphs: [
          'Approaching the eastern bend of the Little Khabur in Zakho, the silhouette of Delal Bridge (Pira Delal) commands immediate silence. Measuring approximately 115 meters in length, 16 meters in height at its central vault, and 4.7 meters in width, the structure rises without the aid of modern steel or concrete. Its monumental central arch spans the main current of the river, while smaller flanking arches pierce the massive stone abutments to relieve hydrostatic pressure when spring snowmelt roars down from the northern mountains.',
          'Historical scholarship offers intriguing perspectives on its origins. While local tradition and several early travelers suggested Roman-era foundations linked to frontier campaigns in Upper Mesopotamia, architectural historians also point to strong structural affinities with medieval Islamic, Marwanid, and Bahdinan-era stone bridges constructed across the Jazira and Kurdistan between the 10th and 16th centuries. Rather than a single moment in time, Pira Delal likely represents a palimpsest of ancient foundations and master restorations.',
        ],
      },
      {
        heading: '02. The Ballad of the Master Builder',
        paragraphs: [
          'In Kurdish cultural memory, the bridge is inseparable from the folk ballad of "Delal". According to oral tradition passed down across generations in Bahdinan, the prince of Bohtan or Bahdinan commissioned a master stonemason to erect a bridge across the untamed Khabur. Each time the central arch neared completion, the fierce river current swept the stones away.',
          'The legend recounts a tragic prophecy: the bridge would only stand if the first living being to walk to the site the next morning was immured within its pier. Heartbreakingly, the mason’s young niece (or daughter-in-law), named Delal, arrived carrying his midday meal, leading her dog. Preserved in plaintive Kurdish folk songs still sung across Zakho today, the story transformed a work of stone masonry into a living monument to devotion, grief, and endurance—"Pira Delal", the Bridge of Delal.',
        ],
      },
      {
        heading: '03. Through the Eyes of Travelers & Artists',
        paragraphs: [
          'In 1305 AH (1887–1888 CE), the pioneering Iraqi painter Abdul Qadir al-Rassam captured the bridge in his celebrated oil canvas "View of the Delal Bridge, Zakho." Comparing al-Rassam’s 19th-century work with the bridge today reveals the remarkable permanence of its limestone silhouette against the surrounding hills.',
        ],
      },
    ],
    historicalCitation:
      'Sources: Directorate of Antiquities (Duhok/Zakho); Abdul Qadir al-Rassam archival record (1888); Kurdish oral folklore archives of Bahdinan.',
    relatedDestinationSlugs: ['delal-bridge', 'khabur-river-corniche', 'zakho-qishla-citadel'],
  },
  {
    id: 'story-khabur-thread',
    slug: 'the-khabur-river-and-the-city',
    title: 'The River is the Thread: How the Little Khabur Shaped an Island City',
    subtitle: 'Tracing the journey of the Little Khabur from alpine snowfields to its embrace of Zakho’s historic island core.',
    category: 'Geography & Urbanism',
    author: 'Visit Zakho Editorial Curators',
    authorRole: 'Geography & Environment Desk',
    publishedDate: 'November 2026',
    readTimeMinutes: 5,
    coverPhoto: ZAKHO_PHOTO_CREDITS.piraDelalRiver,
    secondaryPhoto: ZAKHO_PHOTO_CREDITS.khaburRapids,
    pullQuote:
      'Zakho was not merely built beside a river; it was born inside the river’s embrace, anchored on a gravel and limestone island between two rushing channels.',
    sections: [
      {
        heading: '01. The Island in the Stream',
        paragraphs: [
          'Most historic cities of the Middle East grew around a citadel hill or a desert oasis. Zakho’s morphology is distinct: as the Little Khabur emerges from the northern mountain gorges onto the fertile Sindî plain, its channel bifurcates around a natural island. For centuries, this water-encircled island provided natural defense, abundant fresh water, and control over the caravan ford linking Mosul and Upper Mesopotamia with Cizre, Diyarbakir, and Anatolia.',
          'Nineveh-bound rafts of inflated goatskins once departed from Zakho’s riverbanks laden with mountain timber, gallnuts, wool, and honey. Even as modern boulevards expanded across the north and south banks in the 20th and 21st centuries, the island remains the beating commercial and historical heart of the city.',
        ],
      },
      {
        heading: '02. A Renewed Civic Promenade',
        paragraphs: [
          'In recent years, the Khabur Corniche project has reconnected daily urban life with the water. Tiered stone walkways, cascades, pedestrian footbridges, and riverside gardens transform the riverbanks each evening into Zakho’s great outdoor living room.',
        ],
      },
    ],
    historicalCitation:
      'Sources: Historical geography of the Little Khabur (Nahr al-Khabur); Zakho Independent Administration urban heritage documentation.',
    relatedDestinationSlugs: ['khabur-river-corniche', 'zakho-old-bazaar', 'delal-bridge'],
  },
  {
    id: 'story-mosaic-of-faiths',
    slug: 'historical-zakho-mosaic-of-communities',
    title: 'Crossroads of Coexistence: The Multi-Faith Heritage of Historical Zakho',
    subtitle: 'Remembering the interwoven history of Kurds, Christians, and Jews who built Zakho’s commercial and cultural identity.',
    category: 'Culture & History',
    author: 'Visit Zakho Editorial Curators',
    authorRole: 'Cultural Heritage Desk',
    publishedDate: 'November 2026',
    readTimeMinutes: 5,
    coverPhoto: ZAKHO_PHOTO_CREDITS.oldQuarter,
    secondaryPhoto: ZAKHO_PHOTO_CREDITS.cityPanorama,
    pullQuote:
      'On the island of Zakho, mosque minarets, church bells, and ancient Aramaic dialects coexisted within the sound of the same river.',
    sections: [
      {
        heading: '01. The Bahdinan Gateway',
        paragraphs: [
          'Under the Kurdish Emirate of Bahdinan and throughout the Ottoman era, Zakho flourished as a pluralistic market town. Muslim Kurdish clans of the Sindî and Goyan regions traded alongside long-established Chaldean, Syriac, and Armenian Christian communities, as well as one of Kurdistan’s most prominent Neo-Aramaic-speaking Jewish communities.',
          'In the surrounding district—particularly in villages such as Sharanish and across the Zakho plain—historic churches and monasteries stand alongside centuries-old mosques, bearing witness to a deeply rooted pluralism that continues to shape Zakho’s welcoming spirit toward international guests today.',
        ],
      },
    ],
    historicalCitation:
      'Sources: Academic studies on the Bahdinan Principality and the pluralistic social history of Zakho.',
    relatedDestinationSlugs: ['qubad-pasha-heritage-quarter', 'zakho-old-bazaar', 'sharanish-waterfall'],
  },
  {
    id: 'story-culinary-soul',
    slug: 'kurdish-food-and-hospitality-in-zakho',
    title: 'Sesame, Sumac, and Samovars: Inside Zakho’s Culinary Craft',
    subtitle: 'Why Zakho’s stone-milled tahini, morning Kahi rituals, and riverside tea houses define the flavors of northern Kurdistan.',
    category: 'Food & Hospitality',
    author: 'Visit Zakho Editorial Curators',
    authorRole: 'Gastronomy & Culture Desk',
    publishedDate: 'November 2026',
    readTimeMinutes: 4,
    coverPhoto: ZAKHO_PHOTO_CREDITS.khaburPromenade,
    secondaryPhoto: ZAKHO_PHOTO_CREDITS.stoneMasonry,
    pullQuote:
      'In Zakho, hospitality begins before a single question is asked—with a hot glass of cardamom tea and fresh bread from the clay tannour.',
    sections: [
      {
        heading: '01. The Craft of Zakho Rashi (Tahini)',
        paragraphs: [
          'Ask anyone across the Kurdistan Region or Iraq what culinary product they associate most immediately with Zakho, and the answer is often "Rashi Zaxo"—stone-ground sesame tahini. Hulled local sesame seeds are slowly roasted and milled between heavy stones to produce a velvety, aromatic paste that pairs effortlessly with sweet dark grape or date molasses (Dims).',
        ],
      },
      {
        heading: '02. The Ritual of the River Tea House',
        paragraphs: [
          'As twilight settles over Pira Delal, dozens of samovars come to life along the Khabur. Tea in Zakho is never rushed; it is poured steaming into waisted glass cups, often infused with crushed green cardamom pods, and shared among families, poets, traders, and travelers.',
        ],
      },
    ],
    historicalCitation:
      'Sources: Regional culinary ethnography of Bahdinan and Zakho Old Bazaar artisan guilds.',
    relatedDestinationSlugs: ['zakho-old-bazaar', 'khabur-river-corniche', 'delal-bridge'],
  },
];

export const PRACTICAL_GUIDE_SECTIONS = [
  {
    id: 'language',
    title: 'Language & Communication',
    summary: 'Kurdish (Kurmanji / Bahdini dialect) is the primary spoken language.',
    details: [
      'Local Language: Residents of Zakho speak the Bahdini sub-dialect of Northern Kurdish (Kurmanji). Arabic is widely understood as a second language, and Turkish is also spoken by many merchants due to cross-border trade.',
      'English Availability: English is spoken at major business hotels, university circles (University of Zakho), and younger cafes, though less common among older bazaar shopkeepers and taxi drivers.',
      'Essential Kurdish Phrases: "Slav" (Hello), "Spas" or "Gelek spas" (Thank you / Thank you very much), "Bi xêr hatî" (Welcome — you will hear this everywhere), "Bê zehmet" (Please / Excuse me), "Ev bi çendê ye?" (How much is this?).',
    ],
    verificationBadge: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'money',
    title: 'Money, Currency & Payments',
    summary: 'Iraqi Dinar (IQD) is the official currency; Zakho is primarily a cash-based economy.',
    details: [
      'Official Currency: Iraqi Dinar (IQD). Common banknotes include 250, 500, 1,000, 5,000, 10,000, 25,000, and 50,000 IQD.',
      'Cash is Essential: Traditional restaurants, bazaar stalls, bakeries, and local taxis operate exclusively in IQD cash. Always carry smaller notes (1,000 to 10,000 IQD) for everyday purchases.',
      'Currency Exchange & ATMs: Licensed currency exchange offices (Sarraf) in the Zakho Bazaar and along the main commercial boulevards readily exchange US Dollars (USD) and Euros (EUR) into IQD. Crisp, uncreased post-2013 USD bills are strongly preferred by exchange offices.',
    ],
    verificationBadge: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'connectivity',
    title: 'Connectivity, SIM Cards & Internet',
    summary: '4G LTE coverage is reliable across Zakho City and major highways.',
    details: [
      'Mobile Networks: Fastlink, Korek Telecom, and Asiacell provide 4G/LTE coverage throughout Zakho City, the Ibrahim Khalil corridor, and Duhok.',
      'Buying a SIM Card: International visitors can purchase a tourist SIM or eSIM at Erbil International Airport or at official telecom service centers in central Zakho by presenting a valid passport and entry stamp.',
      'Wi-Fi: Available in almost all hotels and modern riverfront cafes.',
    ],
    verificationBadge: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'transport',
    title: 'Local Transportation & Getting Around',
    summary: 'Walkable historic island core; metered/negotiated taxis for city and mountain excursions.',
    details: [
      'Walking in Central Zakho: The historic island bazaar, Qishla, and Khabur Corniche are compact and walkable. Delal Bridge is an easy 10–15 minute riverside walk (or 3-minute taxi) from the bazaar.',
      'City Taxis: Cream/yellow local taxis are abundant and inexpensive. Within Zakho city limits, short rides typically cost between 3,000 and 5,000 IQD—confirm the fare politely before departing.',
      'Regional & Mountain Excursions: For trips to Sharanish Waterfall, Batifa, or Duhok, arrange a half-day or full-day private taxi hire through your hotel reception.',
    ],
    verificationBadge: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'etiquette',
    title: 'Cultural Etiquette & Dress Guidance',
    summary: 'Warm, hospitable society that values respectful dress and polite greetings.',
    details: [
      'Hospitality: Visitors are treated as honored guests ("Mêvan"). It is common for locals or shopkeepers to invite you for tea with no commercial expectation.',
      'Dress Code: Zakho is welcoming and relaxed, while valuing modesty. For both men and women, smart-casual attire covering shoulders and knees is respectful in the Old Bazaar and traditional neighborhoods. Bring a headscarf when visiting historic mosques.',
      'Public Conduct: Greet elders respectfully, use your right hand when giving or receiving items, and ask before photographing people.',
    ],
    verificationBadge: 'Editorial Recommendation' as VerificationBadgeType,
  },
  {
    id: 'accessibility',
    title: 'Accessibility & Mobility Information',
    summary: 'Honest guidance on terrain, historic steps, and modern paved promenades.',
    details: [
      'Accessible Zones: The newly landscaped Khabur River Corniche and modern hotels along the main boulevards offer flat paved surfaces, ramps, and elevators.',
      'Challenging Historic Terrain: Delal Bridge (Pira Delal) itself is an ancient stepped limestone monument with steep gradients and no wheelchair ramp; however, the surrounding riverfront viewing decks provide unobstructed, step-free ground-level views of the bridge.',
      'Mountain Sites: Natural attractions like Sharanish Waterfall involve uneven canyon paths and stone stairs.',
    ],
    verificationBadge: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'family',
    title: 'Family Travel with Children',
    summary: 'A deeply family-centered culture where children are welcomed everywhere.',
    details: [
      'Family Culture: Evening life in Zakho revolves around families gathering in riverfront parks, tea gardens, and restaurants until late in the evening.',
      'Safety Note at Delal Bridge: When crossing the top of Delal Bridge with young children, hold their hands closely—the historic stone edge parapets are low and the limestone slabs can be slippery.',
    ],
    verificationBadge: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'photography',
    title: 'Photography Guidance & Restrictions',
    summary: 'Spectacular architectural and landscape photography; strict ban near security sites.',
    details: [
      'Landmarks & Landscapes: Delal Bridge, the Khabur River, Mount Bekhair, and Sharanish are open to photography.',
      'Strict Security Prohibition: Never photograph military checkpoints (Asayish / Peshmerga), government security buildings, or the Ibrahim Khalil border crossing complex.',
      'Drones (UAVs): Operating drones requires prior official written authorization from local security authorities; do not fly recreational drones near border zones or security checkpoints.',
    ],
    verificationBadge: 'Official Institutional Resource' as VerificationBadgeType,
  },
  {
    id: 'safety',
    title: 'Safety, Border Context & Emergency Contacts',
    summary: 'Zakho City is a peaceful, bustling urban center; remote border peaks require local awareness.',
    details: [
      'Urban Zakho: Zakho City, Delal Bridge, the Khabur Corniche, and the Old Bazaar are lively, welcoming, and patrolled by Kurdistan Region civic police and Asayish.',
      'Remote Mountain & Border Areas: Because the wider Zakho District borders Turkey to the north, visitors exploring outside the city must stay on established main roads and verified picnic towns (such as main Sharanish and Batifa corridors) and avoid hiking into remote, unmarked high-border ridges.',
      'Official Emergency Numbers (Kurdistan Region): Police: 104 | Ambulance / Medical Emergency: 122 | Civil Defense / Fire: 115.',
    ],
    verificationBadge: 'Official Institutional Resource' as VerificationBadgeType,
  },
  {
    id: 'essentials',
    title: 'Useful Essentials (Electricity, Water & Hours)',
    summary: '230V electricity, Type C/G plugs, and Friday-Saturday weekend rhythms.',
    details: [
      'Electrical Standards: 230V / 50Hz. Both European 2-pin (Type C) and UK 3-pin rectangular (Type G) outlets are common across the Kurdistan Region; bring a universal adapter.',
      'Drinking Water: Drink bottled mineral water, which is inexpensive and available everywhere.',
      'Working Week: Sunday through Thursday is the official administrative week. Friday is the main weekly day of rest (bazaar stalls open later in the afternoon on Fridays).',
    ],
    verificationBadge: 'Verified Fact' as VerificationBadgeType,
  },
];

export const ARRIVAL_ROUTES = [
  {
    id: 'route-duhok',
    origin: 'Duhok City',
    distanceKm: 55,
    estimatedTime: '45 – 55 minutes by car',
    transportMode: 'Highway 2 (via Zakho Tunnel through Mount Bekhair)',
    description:
      'A modern divided four-lane highway connects Duhok directly to Zakho through the twin Zakho Tunnels under Chia-yê Spî (White Mountains). Shared intercity taxis (Garaj) and private taxis run continuously between Duhok and Zakho.',
    verification: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'route-erbil',
    origin: 'Erbil International Airport (EBL) / Erbil City',
    distanceKm: 215,
    estimatedTime: '2.5 to 3 hours by car',
    transportMode: 'Erbil – Rovia – Duhok – Zakho Highway',
    description:
      'Erbil International Airport (EBL) is the primary international aviation hub for the Kurdistan Region, with direct flights from Europe, Turkey, and the Gulf. From Erbil, a modern highway via Rovia and Duhok leads directly to Zakho.',
    verification: 'Verified Fact' as VerificationBadgeType,
  },
  {
    id: 'route-turkey-border',
    origin: 'Turkey (Silopi / Cizre / Şırnak Airport) via Ibrahim Khalil',
    distanceKm: 12,
    estimatedTime: '15 minutes drive from border gate (+ customs clearance time)',
    transportMode: 'Ibrahim Khalil / Habur International Border Crossing',
    description:
      'Located 11.5 km northwest of Zakho center, the Ibrahim Khalil crossing is the main overland gateway between Turkey and the Kurdistan Region of Iraq. Cross-border taxis and international coaches operate daily.',
    verification: 'Official Institutional Resource' as VerificationBadgeType,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-where-is-zakho',
    question: 'Where is Zakho?',
    category: 'Geography & Arrival',
    shortAnswer:
      'Zakho is a historic river city in the northern Kurdistan Region of Iraq (Duhok Governorate / Zakho Independent Administration), situated along the Little Khabur River near the Turkish border.',
    detailedAnswer:
      'Geographically positioned at 37.14° N, 42.68° E on the Sindî plain, Zakho lies approximately 55 km northwest of Duhok, 215 km northwest of Erbil, and 11 km southeast of the Ibrahim Khalil international border crossing with Turkey.',
    relatedLink: { label: 'Explore Interactive Map', href: '/map' },
  },
  {
    id: 'faq-how-to-reach',
    question: 'How do I reach Zakho?',
    category: 'Geography & Arrival',
    shortAnswer:
      'Most international visitors fly into Erbil International Airport (EBL) and drive 2.5–3 hours northwest via Duhok, or enter overland from Turkey via the Ibrahim Khalil border crossing.',
    detailedAnswer:
      'From Erbil or Duhok, visitors can hire a private taxi, rent a car, or use intercity shared taxis from the main transport terminals. Overland travelers from Turkey cross at Habur / Ibrahim Khalil, just 15 minutes outside Zakho city center.',
    relatedLink: { label: 'Read Arrival Guide', href: '/travel-guide' },
  },
  {
    id: 'faq-worth-visiting',
    question: 'Is Zakho worth visiting?',
    category: 'Attractions & Planning',
    shortAnswer:
      'Yes—Zakho offers one of the most iconic ancient stone bridges in the Middle East (Delal Bridge), a unique historic island bazaar encircled by the Khabur River, dramatic mountain waterfalls, and genuine Kurdish hospitality.',
    detailedAnswer:
      'Unlike heavily commercialized tourist hubs, Zakho provides an authentic encounter with Bahdinani Kurdish culture, Mesopotamian river history, and highland landscapes.',
    relatedLink: { label: 'Discover Zakho’s Identity', href: '/discover' },
  },
  {
    id: 'faq-main-attractions',
    question: 'What are the main attractions?',
    category: 'Attractions & Planning',
    shortAnswer:
      'Within Zakho City: Delal Bridge (Pira Delal), the Little Khabur River Corniche, the Qishla of Zakho, the Old Island Bazaar, and the Qubad Pasha Quarter. In the wider district: Sharanish Waterfall, Mount Bekhair, and Keste Valley.',
    detailedAnswer:
      'Visit Zakho clearly distinguishes attractions inside the walkable city from half-day mountain excursions in the surrounding Zakho District.',
    relatedLink: { label: 'Browse All Places', href: '/places' },
  },
  {
    id: 'faq-how-many-days',
    question: 'How many days should I spend?',
    category: 'Attractions & Planning',
    shortAnswer:
      '1 full day covers Zakho City’s historic landmarks and riverfront; 2 to 3 days allow you to add Sharanish Waterfall, the White Mountains, and unhurried culinary exploration.',
    detailedAnswer:
      'Use our interactive Trip Planner to build a custom 1-day, 2-day weekend, or 3-day immersion itinerary.',
    relatedLink: { label: 'Open Trip Planner', href: '/plan-your-trip' },
  },
  {
    id: 'faq-best-season',
    question: 'What is the best season to visit Zakho?',
    category: 'Attractions & Planning',
    shortAnswer:
      'Spring (March–May) and Autumn (September–November) offer the finest weather. Spring brings emerald hills and peak river flow; Summer is lively at night along the river and cool in Sharanish canyon.',
    detailedAnswer:
      'In March and April, daytime temperatures hover around 18°C–25°C and the surrounding hills are carpeted in green.',
    relatedLink: { label: 'View Seasonal Climate Guide', href: '/travel-guide' },
  },
  {
    id: 'faq-where-to-stay',
    question: 'Where can I stay in Zakho?',
    category: 'Practical & Currency',
    shortAnswer:
      'Zakho offers modern business hotels along the international boulevard, central city hotels near the Khabur Corniche, and multi-bedroom serviced apartments for families.',
    detailedAnswer:
      'Browse our Stay directory for verified accommodation categories, locations, and map links.',
    relatedLink: { label: 'Explore Accommodation', href: '/stay' },
  },
  {
    id: 'faq-what-to-eat',
    question: 'What can I eat in Zakho?',
    category: 'Practical & Currency',
    shortAnswer:
      'Don’t miss Zakho’s famous stone-milled sesame tahini with grape/date molasses (Rashi u Dims), fresh Kahi with clotted cream, Bahdinani Dolma, lamb Quzi, and wood-fired Khabur river fish.',
    detailedAnswer:
      'Traditional food in Zakho is fresh, generous, and centered around the Old Bazaar in the morning and the Khabur River terraces in the evening.',
    relatedLink: { label: 'Explore Food & Dining', href: '/food' },
  },
  {
    id: 'faq-get-around',
    question: 'How can I get around the city?',
    category: 'Practical & Currency',
    shortAnswer:
      'Central Zakho (Old Bazaar, Qishla, Corniche, and Delal Bridge) is easy to explore on foot and via short local taxi hops (typically 3,000–5,000 IQD).',
    detailedAnswer:
      'For excursions outside the city into the wider Zakho District (such as Sharanish Waterfall), hire a private taxi for a half-day through your hotel.',
    relatedLink: { label: 'View Transport Guide', href: '/travel-guide' },
  },
  {
    id: 'faq-know-before-visiting',
    question: 'What should I know before visiting?',
    category: 'Practical & Currency',
    shortAnswer:
      'Carry Iraqi Dinar (IQD) cash, dress respectfully when visiting historic religious quarters, ask permission before photographing individuals, and never photograph security checkpoints or border gates.',
    detailedAnswer:
      'Zakho is exceptionally welcoming to guests; learning a few words of Kurmanji ("Slav", "Gelek spas") will be met with warm smiles.',
    relatedLink: { label: 'Read Cultural Etiquette', href: '/culture' },
  },
  {
    id: 'faq-currency',
    question: 'What currency is used in Zakho?',
    category: 'Practical & Currency',
    shortAnswer:
      'The Iraqi Dinar (IQD) is the official currency used for all daily transactions. US Dollars (USD) and Euros can be exchanged at licensed Sarraf offices in the bazaar.',
    detailedAnswer:
      'Credit cards are rarely accepted outside a few top international hotels, so always keep IQD banknotes on hand.',
    relatedLink: { label: 'Read Money & Payments Guide', href: '/travel-guide' },
  },
  {
    id: 'faq-entry-requirements',
    question: 'What should international visitors know about entry requirements?',
    category: 'Entry & Safety',
    shortAnswer:
      'Entry and visa regulations are governed by the Kurdistan Regional Government (KRG) and the Republic of Iraq. Visitors must verify current e-Visa rules via the official KRG portal (visit.gov.krd) before travel.',
    detailedAnswer:
      'Many nationalities are eligible for the official Kurdistan Region e-Visa via visit.gov.krd. If you intend to travel south outside the Kurdistan Region into federal Iraq, separate federal visa rules may apply. Always verify directly with official government authorities.',
    relatedLink: { label: 'View Arrival & Entry Essentials', href: '/travel-guide' },
  },
];
