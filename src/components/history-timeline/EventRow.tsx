import React from 'react';
import { Event } from '@/lib/history-timeline/types';
import { useSearch } from '@/lib/history-timeline/useSearch';

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

export const EventRow: React.FC<EventRowProps> = ({ events, yearToPixel }) => {
  const { setSelectedItem } = useSearch();
  const placed = placeItems(events, e => yearToPixel(e.year));

  return (
    <div className="relative w-full h-full">
      {placed.map(({ item: event, left, laneIdx }) => {
        const { topPct, labelAbove } = LANES[laneIdx];
        const color = getCategoryColor(event.category);

        return (
          <div
            key={event.id}
            className="absolute cursor-pointer"
            style={{ left, top: `${topPct}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => setSelectedItem(event)}
            title={`${event.name} · ${formatYear(event.year)}`}
          >
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-white/80 mx-auto hover:scale-125 transition-transform relative z-10"
              style={{ backgroundColor: color }}
            />
            <div
              className="absolute pointer-events-none select-none"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: LABEL_W,
                ...(labelAbove ? { bottom: 'calc(100% + 2px)' } : { top: 'calc(100% + 2px)' }),
              }}
            >
              <p
                className="text-[10px] text-center leading-tight px-0.5 py-px rounded"
                style={{
                  color,
                  background:    'var(--ht-label-bg)',
                  wordBreak:     'break-word',
                  overflowWrap:  'break-word',
                  whiteSpace:    'normal',
                }}
              >
                {event.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
