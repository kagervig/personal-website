import { create } from 'zustand';

interface TimelineStore {
  zoom: number;
  panX: number;
  setZoom: (zoom: number) => void;
  setPanX: (pan: number) => void;
  zoomToPoint: (newZoom: number, mouseX: number) => void;
  navigateTo: (targetPanX: number, targetZoom: number, duration?: number) => void;
}

export const useTimeline = create<TimelineStore>((set, get) => ({
  zoom: 1,
  panX: 0,

  setZoom: (zoom: number) => set({ zoom }),

  setPanX: (panX: number) => set({ panX }),

  zoomToPoint: (newZoom: number, mouseX: number) => {
    const { zoom, panX } = get();
    const fixedYearDist = mouseX - panX;
    const yearScale = fixedYearDist / zoom;
    const newPanX = mouseX - yearScale * newZoom;
    set({ zoom: newZoom, panX: newPanX });
  },

  navigateTo: (targetPanX: number, targetZoom: number, duration = 750) => {
    const startTime = performance.now();
    const { panX: startPanX, zoom: startZoom } = get();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);

      set({
        panX: startPanX + (targetPanX - startPanX) * eased,
        zoom: startZoom + (targetZoom - startZoom) * eased,
      });

      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  },
}));
