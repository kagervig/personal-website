import React from 'react';
import { Construction } from '@/lib/history-timeline/types';
import { useSearch } from '@/lib/history-timeline/useSearch';

interface ConstructionRowProps {
  constructions: Construction[];
  yearToPixel: (year: number) => number;
}

const formatYear = (year: number) => {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 0) return '1 BCE';
  return `${year} CE`;
};

const LABEL_W = 72;
const H_PAD   = 6;
const AMBER   = '#d97706';

const LANES = [
  { topPct: 15, labelAbove: false },
  { topPct: 38, labelAbove: true  },
  { topPct: 62, labelAbove: false },
  { topPct: 85, labelAbove: true  },
];

function placeItems(items: Construction[], getLeft: (c: Construction) => number) {
  const occupied: Array<Array<{ l: number; r: number }>> = LANES.map(() => []);

  const sorted = [...items]
    .map((item, origIdx) => ({ item, origIdx, left: getLeft(item) }))
    .sort((a, b) => a.left - b.left);

  const result: Array<{ item: Construction; left: number; laneIdx: number; origIdx: number }> = [];

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

export const ConstructionRow: React.FC<ConstructionRowProps> = ({ constructions, yearToPixel }) => {
  const { setSelectedItem } = useSearch();
  const placed = placeItems(constructions, c => yearToPixel(c.year));

  return (
    <div className="relative w-full h-full">
      {placed.map(({ item: construction, left, laneIdx }) => {
        const { topPct, labelAbove } = LANES[laneIdx];

        return (
          <div
            key={construction.id}
            className="absolute cursor-pointer"
            style={{ left, top: `${topPct}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => setSelectedItem(construction)}
            title={`${construction.name} · ${formatYear(construction.year)}`}
          >
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-white/80 mx-auto hover:scale-125 transition-transform relative z-10"
              style={{ backgroundColor: AMBER }}
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
                  color:         '#f59e0b',
                  background:    'var(--ht-label-bg)',
                  wordBreak:     'break-word',
                  overflowWrap:  'break-word',
                  whiteSpace:    'normal',
                }}
              >
                {construction.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
