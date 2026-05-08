import React from 'react';
import { motion } from 'motion/react';
import { TimelineData } from '@/lib/history-timeline/types';
import { useTimeline } from '@/lib/history-timeline/useTimeline';
import { useSearch } from '@/lib/history-timeline/useSearch';
import { EraRow } from './EraRow';
import { RulerRow } from './RulerRow';
import { EventRow } from './EventRow';
import { ConstructionRow } from './ConstructionRow';
import { YearAxis } from './YearAxis';

const PADDING_LEFT = 50;

interface TimelineCanvasProps {
  timeline: TimelineData;
  containerWidth: number;
}

export const TimelineCanvas: React.FC<TimelineCanvasProps> = ({ timeline, containerWidth }) => {
  const { zoom, panX, setPanX, navigateTo } = useTimeline();
  const { showEras, showRulers, showConstructions, showEvents, activeCategories, searchQuery } = useSearch();

  const yearToPixel = (year: number) => (year - timeline.startYear) * zoom + PADDING_LEFT;

  const q = searchQuery.toLowerCase();
  const matchesSearch = (item: { name: string; description: string }) =>
    !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);

  const filteredEvents        = timeline.events.filter(e => matchesSearch(e) && (activeCategories.length === 0 || activeCategories.includes(e.category)));
  const filteredConstructions = timeline.constructions.filter(c => matchesSearch(c));
  const filteredRulers        = timeline.rulers.filter(r => matchesSearch(r));
  const filteredEras          = timeline.eras.filter(e => matchesSearch(e));

  const totalYears  = timeline.endYear - timeline.startYear;
  const canvasWidth = Math.max(containerWidth, totalYears * zoom + PADDING_LEFT * 2);

  const clampPan = (px: number, z = zoom) => {
    const cw = Math.max(containerWidth, totalYears * z + PADDING_LEFT * 2);
    return Math.max(containerWidth - cw, Math.min(0, px));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.shiftKey) return;
    setPanX(clampPan(panX - e.deltaX - e.deltaY));
  };

  const [isDragging, setIsDragging]   = React.useState(false);
  const [startX,     setStartX]       = React.useState(0);
  const dragDistRef                    = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - panX);
    dragDistRef.current = 0;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    dragDistRef.current += Math.abs(e.movementX) + Math.abs(e.movementY);
    setPanX(clampPan(e.clientX - startX));
  };
  const handleMouseUp = () => setIsDragging(false);

  // Double-click → zoom in 2× centred on the clicked year
  const handleDoubleClick = (e: React.MouseEvent) => {
    // Ignore if it was actually a drag
    if (dragDistRef.current > 6) return;

    const outerLeft = e.currentTarget.getBoundingClientRect().left;
    const clickCanvasX = e.clientX - outerLeft - panX;
    const year = timeline.startYear + (clickCanvasX - PADDING_LEFT) / zoom;

    const newZoom    = zoom * 2;
    const itemPixel  = (year - timeline.startYear) * newZoom + PADDING_LEFT;
    const newPanX    = clampPan(containerWidth / 2 - itemPixel, newZoom);
    navigateTo(newPanX, newZoom);
  };

  const rowBorder = '1px solid var(--ht-border)';

  return (
    <div
      className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ background: 'var(--ht-canvas)', height: 480 }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      <motion.div
        className="absolute top-0 bottom-0 flex flex-col"
        style={{ width: canvasWidth, x: panX }}
        transition={{ type: 'tween', duration: 0 }}
      >
        <YearAxis timeline={timeline} yearToPixel={yearToPixel} containerWidth={containerWidth} />

        <div className="relative shrink-0" style={{ height: 60, borderBottom: rowBorder }}>
          {showEras && <EraRow eras={filteredEras} yearToPixel={yearToPixel} />}
        </div>

        <div className="relative shrink-0" style={{ height: 80, borderBottom: rowBorder }}>
          {showRulers && <RulerRow rulers={filteredRulers} yearToPixel={yearToPixel} />}
        </div>

        <div className="relative shrink-0" style={{ height: 120, borderBottom: rowBorder }}>
          {showConstructions && <ConstructionRow constructions={filteredConstructions} yearToPixel={yearToPixel} />}
        </div>

        <div className="relative shrink-0" style={{ height: 180 }}>
          {showEvents && <EventRow events={filteredEvents} yearToPixel={yearToPixel} />}
        </div>
      </motion.div>
    </div>
  );
};
