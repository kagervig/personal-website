import { Tour, TourSlide } from '@/lib/history-timeline/tourTypes';
import { STATIC_TOURS } from '@/lib/history-timeline/data/tours';

const STORAGE_KEY = 'ht_tours';

function loadAdminTours(): Tour[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAdminTours(tours: Tour[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tours));
}

export function getToursForTimeline(timelineId: string): Tour[] {
  const staticTours = STATIC_TOURS.filter(t => t.timelineId === timelineId);
  const adminTours = loadAdminTours().filter(t => t.timelineId === timelineId);
  return [...staticTours, ...adminTours];
}

export function getAllAdminTours(): Tour[] {
  return loadAdminTours();
}

export function saveTour(tour: Tour): void {
  const tours = loadAdminTours();
  const idx = tours.findIndex(t => t.id === tour.id);
  if (idx >= 0) {
    tours[idx] = tour;
  } else {
    tours.push(tour);
  }
  saveAdminTours(tours);
}

export function deleteTour(id: string): void {
  const tours = loadAdminTours().filter(t => t.id !== id);
  saveAdminTours(tours);
}

export function createTour(timelineId: string, title: string, description?: string): Tour {
  return {
    id: 'tour-' + Date.now(),
    title,
    description,
    timelineId,
    slides: [],
    isStatic: false,
  };
}

export function createSlide(partial?: Partial<TourSlide>): TourSlide {
  return {
    id: 'slide-' + Date.now(),
    title: '',
    subtitle: '',
    text: '',
    year: 0,
    zoomPreset: 'centuries',
    ...partial,
  };
}
