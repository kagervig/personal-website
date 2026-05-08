import { TimelineData, Era, Ruler, Event, Construction, TimelineId } from '@/lib/history-timeline/types';

export type ItemType = 'eras' | 'rulers' | 'events' | 'constructions';

interface AdminOverrides {
  added: {
    eras: Era[];
    rulers: Ruler[];
    events: Event[];
    constructions: Construction[];
  };
  edited: {
    eras: Partial<Era>[];
    rulers: Partial<Ruler>[];
    events: Partial<Event>[];
    constructions: Partial<Construction>[];
  };
  deleted: string[];
}

interface AdminData {
  [timelineId: string]: AdminOverrides;
}

const STORAGE_KEY = 'ht_admin_data';
const EVENT_NAME = 'ht_data_updated';

const getDefaultOverrides = (): AdminOverrides => ({
  added: { eras: [], rulers: [], events: [], constructions: [] },
  edited: { eras: [], rulers: [], events: [], constructions: [] },
  deleted: []
});

export const getAdminData = (): AdminData => {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse admin data', e);
  }
  return {};
};

const saveAdminData = (data: AdminData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const getMergedTimelineData = (staticData: TimelineData): TimelineData => {
  const allOverrides = getAdminData();
  const overrides = allOverrides[staticData.id] || getDefaultOverrides();

  const mergeItems = <T extends { id: string }>(
    staticItems: T[],
    added: T[],
    edited: Partial<T>[],
    deleted: string[]
  ): T[] => {
    // 1. Filter deleted
    let items = staticItems.filter(item => !deleted.includes(item.id));
    
    // 2. Apply edits
    items = items.map(item => {
      const edit = edited.find(e => e.id === item.id);
      if (edit) return { ...item, ...edit };
      return item;
    });

    // 3. Append added
    return [...items, ...added];
  };

  return {
    ...staticData,
    eras: mergeItems(staticData.eras, overrides.added.eras, overrides.edited.eras, overrides.deleted),
    rulers: mergeItems(staticData.rulers, overrides.added.rulers, overrides.edited.rulers, overrides.deleted),
    events: mergeItems(staticData.events, overrides.added.events, overrides.edited.events, overrides.deleted),
    constructions: mergeItems(staticData.constructions, overrides.added.constructions, overrides.edited.constructions, overrides.deleted)
  };
};

export const isAdded = (timelineId: string, type: ItemType, id: string): boolean => {
  const data = getAdminData();
  const overrides = data[timelineId];
  if (!overrides) return false;
  return overrides.added[type].some((i: any) => i.id === id);
};

export const addItem = (timelineId: string, type: ItemType, item: any) => {
  const data = getAdminData();
  if (!data[timelineId]) data[timelineId] = getDefaultOverrides();
  
  data[timelineId].added[type].push(item);
  saveAdminData(data);
};

export const editItem = (timelineId: string, type: ItemType, item: any) => {
  const data = getAdminData();
  if (!data[timelineId]) data[timelineId] = getDefaultOverrides();
  
  const overrides = data[timelineId];
  
  // If it's an added item, update it in added
  const addedIndex = overrides.added[type].findIndex((i: any) => i.id === item.id);
  if (addedIndex >= 0) {
    overrides.added[type][addedIndex] = { ...overrides.added[type][addedIndex], ...item };
  } else {
    // It's a static item, add/update in edited
    const editedIndex = overrides.edited[type].findIndex((i: any) => i.id === item.id);
    if (editedIndex >= 0) {
      overrides.edited[type][editedIndex] = { ...overrides.edited[type][editedIndex], ...item };
    } else {
      overrides.edited[type].push(item);
    }
  }
  
  saveAdminData(data);
};

export const deleteItem = (timelineId: string, type: ItemType, id: string) => {
  const data = getAdminData();
  if (!data[timelineId]) data[timelineId] = getDefaultOverrides();
  
  const overrides = data[timelineId];
  
  const addedIndex = overrides.added[type].findIndex((i: any) => i.id === id);
  if (addedIndex >= 0) {
    // Delete from added
    overrides.added[type].splice(addedIndex, 1);
  } else {
    // Remove from edited if exists
    overrides.edited[type] = overrides.edited[type].filter((i: any) => i.id !== id) as any;
    // Add to deleted
    if (!overrides.deleted.includes(id)) {
      overrides.deleted.push(id);
    }
  }
  
  saveAdminData(data);
};

export const restoreItem = (timelineId: string, id: string) => {
  const data = getAdminData();
  if (!data[timelineId]) return;
  data[timelineId].deleted = data[timelineId].deleted.filter(dId => dId !== id);
  saveAdminData(data);
};
