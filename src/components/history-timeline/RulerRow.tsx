import React from 'react';
import { Ruler } from '@/lib/history-timeline/types';
import { useSearch } from '@/lib/history-timeline/useSearch';

interface RulerRowProps {
  rulers: Ruler[];
  yearToPixel: (year: number) => number;
}

const formatYear = (year: number) =>
  year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;

export const RulerRow: React.FC<RulerRowProps> = ({ rulers, yearToPixel }) => {
  const { setSelectedItem } = useSearch();

  return (
    <div className="relative w-full h-full">
      {rulers.map((ruler, index) => {
        const left  = yearToPixel(ruler.startYear);
        const right = yearToPixel(ruler.endYear);
        const width = Math.max(right - left, 3);
        const isUnknown = ruler.unknown;
        const displayName = isUnknown ? 'Unknown' : ruler.name;

        const showInsideLabel = width >= 72;
        const showAboveLabel  = !showInsideLabel && width >= 16;
        const laneTop = index % 2 === 0 ? '30%' : '60%';

        return (
          <div
            key={ruler.id}
            className="absolute cursor-pointer group"
            style={{ left, top: laneTop, transform: 'translateY(-50%)' }}
            onClick={() => setSelectedItem(ruler)}
            title={`${displayName} · ${formatYear(ruler.startYear)} – ${formatYear(ruler.endYear)}`}
          >
            {/* Above-bar label (narrow bars) */}
            {showAboveLabel && (
              <div
                className="absolute bottom-full mb-1 left-0 pointer-events-none"
                style={{ maxWidth: Math.max(width, 60) }}
              >
                <span
                  className="text-[10px] truncate block leading-none px-0.5 rounded"
                  style={{
                    color:      'var(--ht-ruler-lbl)',
                    background: 'var(--ht-label-bg)',
                  }}
                >
                  {displayName}
                </span>
              </div>
            )}

            {/* Bar */}
            <div
              className="h-[22px] rounded flex items-center justify-center overflow-hidden transition-all"
              style={{
                width,
                background:  isUnknown ? 'var(--ht-unknown-bar)' : 'var(--ht-ruler-bar)',
                border:      `1px solid ${isUnknown ? 'var(--ht-unknown-bdr)' : 'var(--ht-ruler-bdr)'}`,
              }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              {showInsideLabel && (
                <span
                  className="text-[11px] font-medium truncate px-2 select-none leading-none"
                  style={{ color: 'var(--ht-text)' }}
                >
                  {displayName}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
