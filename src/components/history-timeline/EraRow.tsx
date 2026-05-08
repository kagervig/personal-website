import React from 'react';
import { Era } from '@/lib/history-timeline/types';
import { useSearch } from '@/lib/history-timeline/useSearch';

interface EraRowProps {
  eras: Era[];
  yearToPixel: (year: number) => number;
}

export const EraRow: React.FC<EraRowProps> = ({ eras, yearToPixel }) => {
  const { setSelectedItem } = useSearch();

  return (
    <div className="relative w-full h-full">
      {eras.map(era => {
        const left = yearToPixel(era.startYear);
        const right = yearToPixel(era.endYear);
        const width = Math.max(right - left, 2);

        return (
          <div
            key={era.id}
            className="absolute top-1 bottom-1 rounded cursor-pointer group flex items-center justify-center overflow-hidden transition-transform"
            style={{ 
              left, 
              width, 
              backgroundColor: era.colour,
              opacity: 0.8
            }}
            onClick={() => setSelectedItem(era)}
            title={`${era.name} (${Math.abs(era.startYear)} - ${Math.abs(era.endYear)})`}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
            {width > 100 && (
              <span className="text-white text-xs font-bold truncate px-2 select-none" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}>
                {era.name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
