import React, { useMemo } from 'react';
import { TimelineData } from '@/lib/history-timeline/types';
import { useTimeline } from '@/lib/history-timeline/useTimeline';

const PADDING_LEFT = 50;

interface YearAxisProps {
  timeline: TimelineData;
  yearToPixel: (year: number) => number;
  containerWidth: number;
}

const NICE_INTERVALS = [
  1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500,
  1000, 2000, 2500, 5000, 10000, 25000, 50000,
  100000, 250000, 500000, 1000000,
];

const MIN_PX_BETWEEN_TICKS = 90;

const formatYear = (year: number): string => {
  const abs = Math.abs(year);
  const suffix = year < 0 ? ' BCE' : year === 0 ? ' BCE' : ' CE';
  if (abs >= 1000000) return `${(abs / 1000000).toFixed(1)}M${suffix}`;
  if (abs >= 1000) return `${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}k${suffix}`;
  return `${abs}${suffix}`;
};

export const YearAxis: React.FC<YearAxisProps> = ({ timeline, yearToPixel, containerWidth }) => {
  const { zoom, navigateTo } = useTimeline();

  const tickInterval = useMemo(() => {
    const rawMin = MIN_PX_BETWEEN_TICKS / Math.max(zoom, 1e-10);
    return NICE_INTERVALS.find(n => n >= rawMin) ?? NICE_INTERVALS[NICE_INTERVALS.length - 1];
  }, [zoom]);

  const ticks = useMemo(() => {
    const t: number[] = [];
    const start = Math.ceil(timeline.startYear / tickInterval) * tickInterval;
    for (let y = start; y <= timeline.endYear; y += tickInterval) {
      t.push(y);
    }
    return t;
  }, [timeline.startYear, timeline.endYear, tickInterval]);

  // YearAxis lives inside the motion.div (which is already transformed by panX).
  // getBoundingClientRect().left therefore already accounts for the pan offset,
  // so: clickCanvasX = e.clientX - axisRect.left  (position within the canvas coordinate space)
  const handleClick = (e: React.MouseEvent) => {
    const axisLeft = e.currentTarget.getBoundingClientRect().left;
    const clickCanvasX = e.clientX - axisLeft;
    const year = timeline.startYear + (clickCanvasX - PADDING_LEFT) / zoom;

    const totalYears = timeline.endYear - timeline.startYear;
    const newZoom = zoom * 2;
    const canvasWidth = totalYears * newZoom + PADDING_LEFT * 2;
    const itemPixel = (year - timeline.startYear) * newZoom + PADDING_LEFT;
    const newPanX = Math.max(containerWidth - canvasWidth, Math.min(0, containerWidth / 2 - itemPixel));
    navigateTo(newPanX, newZoom);
  };

  return (
    <div
      className="relative h-[40px] select-none overflow-hidden shrink-0 cursor-zoom-in"
      style={{
        background: 'var(--ht-bg-alt)',
        borderBottom: '1px solid var(--ht-border)',
      }}
      onClick={handleClick}
      title="Click to zoom in here"
    >
      {ticks.map(year => (
        <div
          key={year}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: yearToPixel(year),
            borderLeft: '1px solid var(--ht-border-str)',
          }}
        >
          <span
            className="absolute top-1 left-1 text-[11px] font-mono whitespace-nowrap"
            style={{ color: 'var(--ht-text-muted)' }}
          >
            {formatYear(year)}
          </span>
        </div>
      ))}
    </div>
  );
};
