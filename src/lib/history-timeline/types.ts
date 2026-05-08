export type TimelineId = 'egypt' | 'rome' | 'romans-in-britain' | 'british-monarchy' | 'britain';

export interface Era {
  id: string;
  name: string;
  shortName?: string;
  startYear: number; // negative = BCE
  endYear: number;
  colour: string; // hex colour
  description: string; // 1-2 paragraphs, British English, school-appropriate
  wikipediaUrl: string;
  imageUrl?: string;
}

export interface Ruler {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  eraId: string;
  description: string;
  wikipediaUrl: string;
  imageUrl?: string;
  unknown?: boolean; // if true, show name as "Unknown" but still show bar
}

export interface Event {
  id: string;
  name: string;
  year: number;
  category: 'war' | 'politics' | 'religion' | 'science' | 'exploration' | 'legislation' | 'disaster' | 'culture' | 'trade' | 'climate';
  description: string;
  wikipediaUrl: string;
  imageUrl?: string;
}

export interface Construction {
  id: string;
  name: string;
  year: number; // year started or completed (approximate)
  category: 'monument' | 'temple' | 'palace' | 'fort' | 'road' | 'bridge' | 'church' | 'castle' | 'landmark';
  description: string;
  wikipediaUrl: string;
  imageUrl?: string;
}

export interface TimelineData {
  id: TimelineId;
  title: string;
  subtitle: string;
  startYear: number;
  endYear: number;
  defaultZoomPreset: 'millennia' | 'centuries' | 'decades';
  defaultCentreYear?: number; // if set, pan to this year on load
  eras: Era[];
  rulers: Ruler[];
  events: Event[];
  constructions: Construction[];
}