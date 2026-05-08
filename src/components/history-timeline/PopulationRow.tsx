import React from 'react';
import { Population } from '@/lib/history-timeline/types';
import { useSearch } from '@/lib/history-timeline/useSearch';
import { Users } from 'lucide-react';

interface PopulationRowProps {
  data: Population[];
  yearToPixel: (year: number) => number;
}

const LABEL_W = 100;
const H_PAD   = 10;

export const PopulationRow: React.FC<PopulationRowProps> = ({ data, yearToPixel }) => {
  const { setSelectedItem } = useSearch();

  return (
    <div className="relative w-full h-full flex items-center">
      {/* Visual background line */}
      <div className="absolute left-0 right-0 h-px bg-white/5 top-1/2" />
      
      {placedItems(data, yearToPixel).map(({ item, left }) => (
        <div
          key={item.id}
          className="absolute cursor-pointer group"
          style={{ left, top: '50%', transform: 'translate(-50%, -50%)' }}
          onClick={() => setSelectedItem({
            ...item,
            name: `Rome Population: ${item.count}`,
            category: 'culture', // mock for detail panel compatibility
            wikipediaUrl: 'https://en.wikipedia.org/wiki/Demography_of_Rome'
          } as any)}
        >
          {/* Point */}
          <div className="w-2.5 h-2.5 rounded-full border border-white/40 bg-sky-500 group-hover:scale-125 transition-transform relative z-10 shadow-[0_0_8px_rgba(14,165,233,0.4)]" />
          
          {/* Label */}
          <div
            className="absolute pointer-events-none select-none top-full mt-2"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              width: LABEL_W,
            }}
          >
            <div className="text-center">
              <p className="text-[11px] font-bold text-sky-400 leading-tight">
                {item.count}
              </p>
              <p className="text-[9px] text-white/40 uppercase tracking-tighter">
                {item.century}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function placedItems(items: Population[], yearToPixel: (year: number) => number) {
  return items.map(item => ({
    item,
    left: yearToPixel(item.year)
  }));
}
