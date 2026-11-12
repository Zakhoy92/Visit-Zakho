'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  DESTINATIONS,
  CURATED_ITINERARIES,
  Destination,
} from '@/lib/zakho-data';
import {
  PlannedStop,
  moveItineraryStop,
  StakeholderSubmissionInput,
} from '@/lib/planner-engine';

export interface CustomStakeholderRecord extends StakeholderSubmissionInput {
  id: string;
  submittedAt: string;
  status: 'Published' | 'Pending Review' | 'Archived';
}

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

interface ZakhoContextValue {
  itineraryStops: PlannedStop[];
  addDestinationToItinerary: (slug: string, dayNumber?: number) => void;
  removeStopFromItinerary: (stopId: string) => void;
  reorderStop: (index: number, direction: 'up' | 'down') => void;
  updateStopDay: (stopId: string, dayNumber: number) => void;
  setFullItinerary: (stops: PlannedStop[], toastTitle?: string) => void;
  loadCuratedItinerary: (itinerarySlug: string) => void;
  clearItinerary: () => void;
  isDestinationSaved: (slug: string) => boolean;
  stakeholderRecords: CustomStakeholderRecord[];
  addStakeholderSubmission: (input: StakeholderSubmissionInput) => CustomStakeholderRecord;
  toggleRecordStatus: (id: string, nextStatus: 'Published' | 'Pending Review' | 'Archived') => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  notify: (title: string, description?: string) => void;
}

const ZakhoContext = createContext<ZakhoContextValue | undefined>(undefined);

const STORAGE_KEY_ITINERARY = 'visit_zakho_itinerary_v1';
const STORAGE_KEY_CMS = 'visit_zakho_cms_records_v1';

const INITIAL_CMS_RECORDS: CustomStakeholderRecord[] = [
  {
    id: 'cms-rec-1',
    entityName: 'Pira Delal Evening Heritage Illumination Walk',
    entityType: 'Destination',
    contactName: 'Zakho Directorate of Tourism',
    contactEmail: 'heritage@visitzakho.org',
    locationDescription: 'East Bank Promenade, Delal Bridge, Zakho City',
    verificationSource: 'Official Municipal Heritage Registry (Verified Nov 2026)',
    details: 'Evening architectural lighting along the 115-meter limestone arches of Pira Delal and the surrounding Khabur riverfront gardens.',
    submittedAt: '2026-11-01',
    status: 'Published',
  },
  {
    id: 'cms-rec-2',
    entityName: 'Sindî Artisanal Sesame Mill & Tahini Press',
    entityType: 'Restaurant / Cafe',
    contactName: 'Haji Karwan Sindî',
    contactEmail: 'karwan.tahini@visitzakho.org',
    locationDescription: 'Old Island Bazaar, Artisan Lane, Zakho City',
    verificationSource: 'Zakho Chamber of Commerce & Bazaar Guild',
    details: 'Traditional stone-milled Rashi (tahini) workshop offering morning tastings with local grape molasses and hot clay-oven bread.',
    submittedAt: '2026-11-05',
    status: 'Published',
  },
];

const DEFAULT_ITINERARY_STOPS: PlannedStop[] = [
  DESTINATIONS.find((d) => d.slug === 'delal-bridge')!,
  DESTINATIONS.find((d) => d.slug === 'zakho-old-bazaar')!,
  DESTINATIONS.find((d) => d.slug === 'khabur-river-corniche')!,
].map((d, i) => ({
  stopId: `init-${d.slug}-${i}`,
  dayNumber: 1,
  orderIndex: i,
  destinationSlug: d.slug,
  destinationName: d.name,
  category: d.category,
  geographicScope: d.geographicScope,
  recommendedDuration: d.recommendedDuration,
  customNote: d.visitorGuidance[0] || d.shortSummary,
  coordinates: { lat: d.coordinates.lat, lng: d.coordinates.lng },
}));

export function ZakhoProvider({ children }: { children: React.ReactNode }) {
  const [itineraryStops, setItineraryStops] = useState<PlannedStop[]>(DEFAULT_ITINERARY_STOPS);
  const [stakeholderRecords, setStakeholderRecords] =
    useState<CustomStakeholderRecord[]>(INITIAL_CMS_RECORDS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback((title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev.slice(-2), { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // Hydrate saved state after initial render and setup BroadcastChannel + Cmd+K listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    queueMicrotask(() => {
      try {
        const savedItin = localStorage.getItem(STORAGE_KEY_ITINERARY);
        if (savedItin) {
          const parsed = JSON.parse(savedItin);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItineraryStops(parsed);
          }
        }
        const savedCms = localStorage.getItem(STORAGE_KEY_CMS);
        if (savedCms) {
          const parsedCms = JSON.parse(savedCms);
          if (Array.isArray(parsedCms) && parsedCms.length > 0) {
            setStakeholderRecords(parsedCms);
          }
        }
      } catch {
        // ignore storage read errors
      }
    });

    let channel: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      channel = new BroadcastChannel('visit_zakho_sync_channel');
      channel.onmessage = (event) => {
        if (event.data?.type === 'SYNC_ITINERARY' && Array.isArray(event.data.payload)) {
          setItineraryStops(event.data.payload);
        }
        if (event.data?.type === 'SYNC_CMS' && Array.isArray(event.data.payload)) {
          setStakeholderRecords(event.data.payload);
        }
      };
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (channel) channel.close();
    };
  }, []);

  const syncItinerary = useCallback((nextStops: PlannedStop[]) => {
    setItineraryStops(nextStops);
    try {
      localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(nextStops));
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('visit_zakho_sync_channel');
        bc.postMessage({ type: 'SYNC_ITINERARY', payload: nextStops });
        bc.close();
      }
    } catch {
      // ignore
    }
  }, []);

  const addDestinationToItinerary = useCallback(
    (slug: string, dayNumber: number = 1) => {
      const dest: Destination | undefined = DESTINATIONS.find((d) => d.slug === slug);
      if (!dest) return;

      setItineraryStops((prev) => {
        const exists = prev.some((s) => s.destinationSlug === slug);
        if (exists) {
          notify('Already in Your Trip', `${dest.name} is already part of your Zakho itinerary.`);
          return prev;
        }
        const nextStop: PlannedStop = {
          stopId: `stop-${dest.slug}-${Date.now()}`,
          dayNumber,
          orderIndex: prev.length,
          destinationSlug: dest.slug,
          destinationName: dest.name,
          category: dest.category,
          geographicScope: dest.geographicScope,
          recommendedDuration: dest.recommendedDuration,
          customNote: dest.visitorGuidance[0] || dest.shortSummary,
          coordinates: { lat: dest.coordinates.lat, lng: dest.coordinates.lng },
        };
        const updated = [...prev, nextStop];
        try {
          localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        notify('Saved to Trip Planner', `Added ${dest.name} (Day ${dayNumber}) to your journey.`);
        return updated;
      });
    },
    [notify]
  );

  const removeStopFromItinerary = useCallback(
    (stopId: string) => {
      setItineraryStops((prev) => {
        const removed = prev.find((s) => s.stopId === stopId);
        const updated = prev
          .filter((s) => s.stopId !== stopId)
          .map((s, idx) => ({ ...s, orderIndex: idx }));
        try {
          localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        if (removed) {
          notify('Removed from Itinerary', `${removed.destinationName} was removed.`);
        }
        return updated;
      });
    },
    [notify]
  );

  const reorderStop = useCallback(
    (index: number, direction: 'up' | 'down') => {
      setItineraryStops((prev) => {
        const updated = moveItineraryStop(prev, index, direction);
        try {
          localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const updateStopDay = useCallback((stopId: string, dayNumber: number) => {
    setItineraryStops((prev) => {
      const updated = prev.map((s) =>
        s.stopId === stopId ? { ...s, dayNumber } : s
      );
      try {
        localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const setFullItinerary = useCallback(
    (stops: PlannedStop[], toastTitle?: string) => {
      syncItinerary(stops);
      if (toastTitle) {
        notify(toastTitle, `${stops.length} verified stops loaded into your interactive route.`);
      }
    },
    [syncItinerary, notify]
  );

  const loadCuratedItinerary = useCallback(
    (itinerarySlug: string) => {
      const found = CURATED_ITINERARIES.find((i) => i.slug === itinerarySlug);
      if (!found) return;
      const built: PlannedStop[] = [];
      found.days.forEach((day) => {
        day.stops.forEach((st) => {
          const dest = DESTINATIONS.find((d) => d.slug === st.destinationSlug);
          if (dest) {
            built.push({
              stopId: `curated-${dest.slug}-${built.length}-${Date.now()}`,
              dayNumber: day.dayNumber,
              orderIndex: built.length,
              destinationSlug: dest.slug,
              destinationName: dest.name,
              category: dest.category,
              geographicScope: dest.geographicScope,
              recommendedDuration: st.durationLabel,
              customNote: `${st.timeSlot} — ${st.activityNote}`,
              coordinates: { lat: dest.coordinates.lat, lng: dest.coordinates.lng },
            });
          }
        });
      });
      syncItinerary(built);
      notify('Curated Journey Loaded', `"${found.title}" is now active in your Trip Planner.`);
    },
    [syncItinerary, notify]
  );

  const clearItinerary = useCallback(() => {
    syncItinerary([]);
    notify('Itinerary Cleared', 'You can now build a fresh Zakho route from scratch.');
  }, [syncItinerary, notify]);

  const isDestinationSaved = useCallback(
    (slug: string) => itineraryStops.some((s) => s.destinationSlug === slug),
    [itineraryStops]
  );

  const addStakeholderSubmission = useCallback(
    (input: StakeholderSubmissionInput): CustomStakeholderRecord => {
      const newRecord: CustomStakeholderRecord = {
        ...input,
        id: `cms-${Date.now()}`,
        submittedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Review',
      };
      setStakeholderRecords((prev) => {
        const next = [newRecord, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY_CMS, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      notify(
        'Submission Recorded for Review',
        `"${input.entityName}" has been logged in the Editorial & Stakeholder Registry.`
      );
      return newRecord;
    },
    [notify]
  );

  const toggleRecordStatus = useCallback(
    (id: string, nextStatus: 'Published' | 'Pending Review' | 'Archived') => {
      setStakeholderRecords((prev) => {
        const next = prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r));
        try {
          localStorage.setItem(STORAGE_KEY_CMS, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      notify('Registry Status Updated', `Record status changed to ${nextStatus}.`);
    },
    [notify]
  );

  return (
    <ZakhoContext.Provider
      value={{
        itineraryStops,
        addDestinationToItinerary,
        removeStopFromItinerary,
        reorderStop,
        updateStopDay,
        setFullItinerary,
        loadCuratedItinerary,
        clearItinerary,
        isDestinationSaved,
        stakeholderRecords,
        addStakeholderSubmission,
        toggleRecordStatus,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        dismissToast,
        notify,
      }}
    >
      {children}

      {/* Floating luxury toast notifications */}
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        >
          {toasts.map((t) => (
            <div
              key={t.id}
              className="pointer-events-auto glass-river-dark text-[#FAFAF7] px-4 py-3.5 rounded-xl shadow-2xl flex items-start justify-between gap-3 transition-all duration-200"
            >
              <div>
                <p className="text-sm font-semibold tracking-wide text-[#FAFAF7]">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-[#EAE2D3]/85 mt-0.5 leading-relaxed">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="Dismiss notification"
                className="text-xs text-[#8BBDB5] hover:text-white px-1.5 py-0.5 shrink-0"
              >
                Close
              </button>
            </div>
          ))}
        </div>
      )}
    </ZakhoContext.Provider>
  );
}

export function useZakho() {
  const ctx = useContext(ZakhoContext);
  if (!ctx) {
    throw new Error('useZakho must be used inside ZakhoProvider');
  }
  return ctx;
}
