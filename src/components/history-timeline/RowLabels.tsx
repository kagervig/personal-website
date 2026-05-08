import React from 'react';
import { useSearch } from '@/lib/history-timeline/useSearch';
import { TimelineData } from '@/lib/history-timeline/types';

interface RowLabelsProps {
  timeline: TimelineData;
}

export const RowLabels: React.FC<RowLabelsProps> = ({ timeline }) => {
  const { showEras, showRulers, showConstructions, showEvents, showPopulation } = useSearch();

  return (
    <div
      className="w-[120px] shrink-0 flex flex-col z-20 sticky left-0 pointer-events-none"
      style={{
        background: 'var(--ht-surface)',
        borderRight: '1px solid var(--ht-border)',
        boxShadow: '4px 0 12px rgba(0,0,0,0.1)',
      }}
    >
      <div className="h-[40px] shrink-0" style={{ borderBottom: '1px solid var(--ht-border)' }} />

      {showEras && (
        <div className="shrink-0 flex items-center px-4" style={{ height: 60, borderBottom: '1px solid var(--ht-border)' }}>
          <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Eras</span>
        </div>
      )}
      {showRulers && (
        <div className="shrink-0 flex items-center px-4" style={{ height: 80, borderBottom: '1px solid var(--ht-border)' }}>
          <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Rulers</span>
        </div>
      )}
      {showConstructions && (
        <div className="shrink-0 flex items-center px-4" style={{ height: 120, borderBottom: '1px solid var(--ht-border)' }}>
          <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Monuments</span>
        </div>
      )}
      {showEvents && (
        <div className="shrink-0 flex items-center px-4" style={{ height: 180 }}>
          <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Events</span>
        </div>
      )}
      {timeline.population && showPopulation && (
        <div className="shrink-0 flex items-center px-4" style={{ height: 60, borderTop: '1px solid var(--ht-border)' }}>
          <span className="text-[9px] font-bold tracking-widest text-sky-600/80 uppercase">Population</span>
        </div>
      )}
    </div>
  );
};


