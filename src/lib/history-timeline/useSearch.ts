import { create } from 'zustand';

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // which categories are currently active
  activeCategories: string[];
  toggleCategory: (cat: string) => void;
  setCategories: (cats: string[]) => void;
  
  // visible rows
  showEras: boolean;
  showRulers: boolean;
  showConstructions: boolean;
  showEvents: boolean;
  showPopulation: boolean;
  
  toggleRow: (row: 'showEras' | 'showRulers' | 'showConstructions' | 'showEvents' | 'showPopulation') => void;
  
  selectedItem: any | null; // generic item for detail panel
  setSelectedItem: (item: any | null) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  activeCategories: [],
  toggleCategory: (cat) => set((state) => ({
    activeCategories: state.activeCategories.includes(cat) 
      ? state.activeCategories.filter(c => c !== cat)
      : [...state.activeCategories, cat]
  })),
  setCategories: (activeCategories) => set({ activeCategories }),
  
  showEras: true,
  showRulers: true,
  showConstructions: true,
  showEvents: true,
  showPopulation: true,
  
  toggleRow: (row) => set((state) => ({ [row]: !state[row] })),
  
  selectedItem: null,
  setSelectedItem: (selectedItem) => set({ selectedItem })
}));