import { getMergedTimelineData } from '@/lib/history-timeline/adminStore';
import { egyptData } from './egypt';
import { romeData } from './rome';
import { romansInBritainData } from './romans-in-britain';
import { britishMonarchyData } from './british-monarchy';
import { britainData } from './britain';

export * from '../types';

export const timelines = [
  egyptData,
  romeData,
  romansInBritainData,
  britishMonarchyData,
  britainData
];

export const getMergedTimelines = () => [
  getMergedTimelineData(egyptData),
  getMergedTimelineData(romeData),
  getMergedTimelineData(romansInBritainData),
  getMergedTimelineData(britishMonarchyData),
  getMergedTimelineData(britainData),
];

export const getMergedTimelineData_byId = (id: string) => {
  return getMergedTimelines().find(t => t.id === id);
};