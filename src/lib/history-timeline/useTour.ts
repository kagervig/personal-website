import { create } from 'zustand';
import { Tour } from '@/lib/history-timeline/tourTypes';

interface TourStore {
  activeTour: Tour | null;
  currentSlideIdx: number;
  startTour: (tour: Tour) => void;
  exitTour: () => void;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (idx: number) => void;
}

export const useTour = create<TourStore>((set, get) => ({
  activeTour: null,
  currentSlideIdx: 0,

  startTour: (tour: Tour) => set({ activeTour: tour, currentSlideIdx: 0 }),

  exitTour: () => set({ activeTour: null, currentSlideIdx: 0 }),

  nextSlide: () => {
    const { activeTour, currentSlideIdx } = get();
    if (!activeTour) return;
    const next = currentSlideIdx + 1;
    if (next < activeTour.slides.length) set({ currentSlideIdx: next });
  },

  prevSlide: () => {
    const { currentSlideIdx } = get();
    if (currentSlideIdx > 0) set({ currentSlideIdx: currentSlideIdx - 1 });
  },

  goToSlide: (idx: number) => set({ currentSlideIdx: idx }),
}));
