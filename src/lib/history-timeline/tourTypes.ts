export interface TourSlide {
  id: string;
  title: string;
  subtitle?: string;
  text: string;
  year: number;                      // centre the view on this year
  zoomPreset: 'millennia' | 'centuries' | 'decades';
  highlightType?: 'era' | 'ruler' | 'event' | 'construction';
  highlightId?: string;              // opens the detail panel for this item
}

export interface Tour {
  id: string;
  title: string;
  description?: string;
  timelineId: string;
  slides: TourSlide[];
  isStatic?: boolean;                // true = shipped with the app, not editable
}
