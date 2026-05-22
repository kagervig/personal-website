import React from 'react';
import { Event } from '@/lib/history-timeline/types';
import { useSearch } from '@/lib/history-timeline/useSearch';
import { useTimeline } from '@/lib/history-timeline/useTimeline';

interface EventRowProps {
  events: Event[];
  yearToPixel: (year: number) => number;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'war':         return '#dc2626';
    case 'politics':    return '#2563eb';
    case 'religion':    return '#7c3aed';
    case 'science':     return '#059669';
    case 'exploration': return '#d97706';
    case 'legislation': return '#0891b2';
    case 'disaster':    return '#4b5563';
    case 'culture':     return '#db2777';
    case 'trade':       return '#65a30d';
    case 'climate':     return '#0ea5e9';
    default:            return '#6b7280';
  }
};

const formatYear = (year: number) => {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 0) return '1 BCE';
  return `${year} CE`;
};

const LABEL_W = 72;
const H_PAD   = 6;

const LANES = [
  { topPct: 14, labelAbove: false },
  { topPct: 30, labelAbove: true  },
  { topPct: 48, labelAbove: false },
  { topPct: 65, labelAbove: true  },
  { topPct: 82, labelAbove: true  },
];

function placeItems(items: Event[], getLeft: (e: Event) => number) {
  const occupied: Array<Array<{ l: number; r: number }>> = LANES.map(() => []);

  const sorted = [...items]
    .map((item, origIdx) => ({ item, origIdx, left: getLeft(item) }))
    .sort((a, b) => a.left - b.left);

  const result: Array<{ item: Event; left: number; laneIdx: number; origIdx: number }> = [];

  for (const { item, left, origIdx } of sorted) {
    const lEdge = left - LABEL_W / 2 - H_PAD;
    const rEdge = left + LABEL_W / 2 + H_PAD;

    let chosen = 0;
    for (let i = 0; i < LANES.length; i++) {
      if (!occupied[i].some(r => lEdge < r.r && rEdge > r.l)) { chosen = i; break; }
      if (i === LANES.length - 1) {
        let minC = Infinity;
        for (let j = 0; j < LANES.length; j++) {
          const c = occupied[j].filter(r => lEdge < r.r && rEdge > r.l).length;
          if (c < minC) { minC = c; chosen = j; }
        }
      }
    }
    occupied[chosen].push({ l: lEdge, r: rEdge });
    result.push({ item, left, laneIdx: chosen, origIdx });
  }

  result.sort((a, b) => a.origIdx - b.origIdx);
  return result;
}

function placeItems(items: Event[], getLeft: (e: Event) => number, zoom: number) {
  const showImp2 = zoom > 0.5;
  const showImp1 = zoom > 2.0;

  // 1. First, identify which items WANT to show a label
  const candidates = items.map(item => {
    const importance = item.importance ?? 2;
    const wantsLabel = importance >= 3 || (importance === 2 && showImp2) || (importance === 1 && showImp1);
    return { item, left: getLeft(item), wantsLabel, importance };
  });

  // 2. Sort candidates by importance (highest first) so high-priority labels "claim" space first
  // Then by position so we are consistent
  const prioritySorted = [...candidates].sort((a, b) => {
    if (b.importance !== a.importance) return b.importance - a.importance;
    return a.left - b.left;
  });

  const occupied: Array<Array<{ l: number; r: number }>> = LANES.map(() => []);
  const results = new Map<string, { laneIdx: number; isLabelVisible: boolean }>();

  for (const { item, left, wantsLabel } of prioritySorted) {
    let chosenLane = -1;
    let finalVisibility = false;

    if (wantsLabel) {
      const lEdge = left - LABEL_W / 2 - H_PAD;
      const rEdge = left + LABEL_W / 2 + H_PAD;

      // Try to find a lane where this label fits
      for (let i = 0; i < LANES.length; i++) {
        if (!occupied[i].some(rect => lEdge < r.r && rEdge > rect.l)) {
          chosenLane = i;
          finalVisibility = true;
          occupied[i].push({ l: lEdge, r: rEdge });
          break;
        }
      }
    }

    // If we couldn't place the label (or didn't want to), just assign a default lane for the dot
    if (chosenLane === -1) {
      chosenLane = Math.floor((left % 1000) / (1000 / LANES.length)); // pseudo-random stable lane
      finalVisibility = false;
    }

    results.set(item.id, { laneIdx: chosenLane, isLabelVisible: finalVisibility });
  }

  return results;
}

export const EventRow: React.FC<EventRowProps> = ({ events, yearToPixel }) => {
  const { setSelectedItem } = useSearch();
  const { zoom } = useTimeline();
  
  // Memoize placement for performance and stability
  const placementMap = React.useMemo(() => 
    placeItems(events, e => yearToPixel(e.year), zoom),
    [events, zoom, yearToPixel]
  );

  return (
    <div className="relative w-full h-full">
      {events.map((event) => {
        const placement = placementMap.get(event.id);
        if (!placement) return null;

        const { laneIdx, isLabelVisible } = placement;
        const { topPct, labelAbove } = LANES[laneIdx];
        const color = getCategoryColor(event.category);
        const importance = event.importance ?? 2;
        const left = yearToPixel(event.year);

        return (
          <div
            key={event.id}
            className="absolute cursor-pointer group"
            style={{ left, top: `${topPct}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => setSelectedItem(event)}
            title={`${event.name} · ${formatYear(event.year)}`}
          >
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-white/80 mx-auto hover:scale-125 transition-all relative z-10"
              style={{ 
                backgroundColor: color,
                opacity: isLabelVisible ? 1 : 0.4
              }}
            />
            
            {isLabelVisible && (
              <div
                className="absolute pointer-events-none select-none animate-in fade-in duration-300"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: LABEL_W,
                  ...(labelAbove ? { bottom: 'calc(100% + 2px)' } : { top: 'calc(100% + 2px)' }),
                }}
              >
                <p
                  className="text-[10px] text-center leading-tight px-0.5 py-px rounded font-medium"
                  style={{
                    color,
                    background:    'var(--ht-label-bg)',
                    wordBreak:     'break-word',
                    overflowWrap:  'break-word',
                    whiteSpace:    'normal',
                    textShadow:    '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {event.name}
                </p>
              </div>
            )}
            
            {!isLabelVisible && (
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-50 pointer-events-none">
                 {event.name}
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
