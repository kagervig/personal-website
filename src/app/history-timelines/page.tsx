'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sun, Moon, Share2, Check } from 'lucide-react';
import { TopNav } from '@/components/history-timeline/TopNav';
import { Sidebar } from '@/components/history-timeline/Sidebar';
import { ZoomControls } from '@/components/history-timeline/ZoomControls';
import { RowLabels } from '@/components/history-timeline/RowLabels';
import { TimelineCanvas } from '@/components/history-timeline/TimelineCanvas';
import { DetailPanel } from '@/components/history-timeline/DetailPanel';
import { TourPlayer } from '@/components/history-timeline/TourPlayer';
import { getMergedTimelineData_byId } from '@/lib/history-timeline/data';
import { useTimeline } from '@/lib/history-timeline/useTimeline';
import { useSearch } from '@/lib/history-timeline/useSearch';
import { useTour } from '@/lib/history-timeline/useTour';
import { TimelineId } from '@/lib/history-timeline/types';
import { ThemeProvider, useTheme } from '@/lib/history-timeline/theme';
import { Toaster } from '@/components/history-timeline/ui/toaster';
import { TooltipProvider } from '@/components/history-timeline/ui/tooltip';


const PADDING_LEFT = 50;
const VALID_IDS: TimelineId[] = ['egypt', 'rome', 'romans-in-britain', 'british-monarchy', 'britain'];

function readUrlParams() {
  if (typeof window === 'undefined') return { t: null, y: null, zf: null };
  const p = new URLSearchParams(window.location.search);
  const t = p.get('t') as TimelineId | null;
  const y = p.get('y');
  const zf = p.get('zf');
  return {
    t: t && VALID_IDS.includes(t) ? t : null,
    y: y !== null && !isNaN(Number(y)) ? Number(y) : null,
    zf: zf !== null && !isNaN(Number(zf)) ? Number(zf) : null,
  };
}

function TimelineContent() {
  const [activeId, setActiveId] = useState<TimelineId>(() => {
    const { t } = readUrlParams();
    return t ?? 'egypt';
  });

  const timeline = getMergedTimelineData_byId(activeId)!;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);

  const { setZoom, setPanX, navigateTo, zoom, panX } = useTimeline();
  const { setSearchQuery, setCategories, setSelectedItem } = useSearch();
  const { isDark, toggleTheme } = useTheme();
  const { activeTour, currentSlideIdx } = useTour();

  const [shareCopied, setShareCopied] = useState(false);

  const pendingView = useRef<{ y: number | null; zf: number | null } | null>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      const { y, zf } = readUrlParams();
      if (y !== null || zf !== null) pendingView.current = { y, zf };
    }
  }, []);

  useEffect(() => {
    const handleUpdate = () => window.location.reload();
    window.addEventListener('ht_data_updated', handleUpdate);
    return () => window.removeEventListener('ht_data_updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    const observer = new ResizeObserver(entries => {
      if (entries[0]) setContainerWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setSearchQuery('');
    setCategories([]);
    setSelectedItem(null);

    const totalYears = timeline.endYear - timeline.startYear;
    const millenniaZoom = containerWidth / totalYears;
    const centuriesZoom = millenniaZoom * 10;
    const decadesZoom = millenniaZoom * 100;

    let defaultZoom = millenniaZoom;
    if (timeline.defaultZoomPreset === 'centuries') defaultZoom = centuriesZoom;
    if (timeline.defaultZoomPreset === 'decades')   defaultZoom = decadesZoom;

    if (isFirstLoad.current && pendingView.current) {
      const { y, zf } = pendingView.current;
      pendingView.current = null;
      isFirstLoad.current = false;

      const targetZoom = zf !== null ? millenniaZoom * Math.pow(10, zf) : defaultZoom;
      setZoom(targetZoom);

      const centreYear = y !== null ? y : (timeline.defaultCentreYear ?? timeline.startYear);
      const canvasWidth = totalYears * targetZoom + PADDING_LEFT * 2;
      const itemPixel = (centreYear - timeline.startYear) * targetZoom + PADDING_LEFT;
      setPanX(Math.max(containerWidth - canvasWidth, Math.min(0, containerWidth / 2 - itemPixel)));
      return;
    }
    isFirstLoad.current = false;

    setZoom(defaultZoom);

    if (timeline.defaultCentreYear !== undefined) {
      const canvasWidth = totalYears * defaultZoom + PADDING_LEFT * 2;
      const itemPixel = (timeline.defaultCentreYear - timeline.startYear) * defaultZoom + PADDING_LEFT;
      const targetPanX = containerWidth / 2 - itemPixel;
      setPanX(Math.max(containerWidth - canvasWidth, Math.min(0, targetPanX)));
    } else {
      setPanX(0);
    }
  }, [timeline.id, containerWidth]);

  const handleNavigate = useCallback(
    (year: number, zoomPreset: 'millennia' | 'centuries' | 'decades') => {
      const totalYears = timeline.endYear - timeline.startYear;
      const millenniaZoom = containerWidth / totalYears;
      const centuriesZoom = millenniaZoom * 10;
      const decadesZoom = millenniaZoom * 100;

      let targetZoom = millenniaZoom;
      if (zoomPreset === 'centuries') targetZoom = centuriesZoom;
      if (zoomPreset === 'decades')   targetZoom = decadesZoom;

      const itemPixel = (year - timeline.startYear) * targetZoom + PADDING_LEFT;
      navigateTo(containerWidth / 2 - itemPixel, targetZoom);
    },
    [timeline, containerWidth, navigateTo]
  );

  useEffect(() => {
    if (!activeTour) return;
    const slide = activeTour.slides[currentSlideIdx];
    if (!slide) return;
    handleNavigate(slide.year, slide.zoomPreset);
  }, [activeTour, currentSlideIdx]);

  const handleShare = useCallback(() => {
    const totalYears = timeline.endYear - timeline.startYear;
    const millenniaZoom = containerWidth / totalYears;
    const centreYear = Math.round(
      timeline.startYear + (containerWidth / 2 - panX - PADDING_LEFT) / zoom
    );
    const zf = Math.log10(Math.max(zoom / millenniaZoom, 1));

    const params = new URLSearchParams({
      t: activeId,
      y: centreYear.toString(),
      zf: zf.toFixed(3),
    });

    const base = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(`${base}?${params.toString()}`).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }, [activeId, timeline, containerWidth, zoom, panX]);

  const themeClass = `theme-${activeId}`;

  return (
    <div
      className={`flex h-screen font-sans overflow-hidden history-timeline-root ${themeClass}`}
      style={{ background: 'var(--ht-bg)', color: 'var(--ht-text)' }}
    >
      <Sidebar timeline={timeline} onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col h-full overflow-hidden" ref={containerRef}>
        <div
          className="h-[64px] shrink-0 flex items-center justify-between px-6 z-20"
          style={{ background: 'var(--ht-bg)', borderBottom: '1px solid var(--ht-border)' }}
        >
          <div>
            <h1 className="text-xl font-bold tracking-wide leading-tight" style={{ color: 'var(--ht-text)', fontFamily: 'var(--app-font-display)' }}>
              {timeline.title}
            </h1>
            <p className="text-xs" style={{ color: 'var(--ht-text-muted)' }}>
              {timeline.subtitle}
            </p>
          </div>
          <TopNav activeTimeline={activeId} onSelect={setActiveId} />
        </div>

        <div
          className="h-[44px] shrink-0 flex items-center justify-between px-4 z-10"
          style={{ background: 'var(--ht-bg-alt)', borderBottom: '1px solid var(--ht-border)' }}
        >
          <div />
          <div className="flex items-center gap-2">
            <ZoomControls timeline={timeline} containerWidth={containerWidth} />

            <div className="w-px h-5 mx-1" style={{ background: 'var(--ht-border-str)' }} />

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{
                color: shareCopied ? 'var(--ht-accent)' : 'var(--ht-text-muted)',
                border: '1px solid var(--ht-border-str)',
                background: shareCopied ? 'var(--ht-accent-dim)' : 'var(--ht-surface)',
              }}
              title="Copy a link to this exact view"
            >
              {shareCopied
                ? <><Check className="w-3.5 h-3.5" /> Copied!</>
                : <><Share2 className="w-3.5 h-3.5" /> Share</>
              }
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md transition-colors"
              style={{
                color: 'var(--ht-text-muted)',
                border: '1px solid var(--ht-border-str)',
                background: 'var(--ht-surface)',
              }}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative" style={{ background: 'var(--ht-canvas)' }}>
          <RowLabels />
          <TimelineCanvas timeline={timeline} containerWidth={containerWidth} />
          <DetailPanel />
          <TourPlayer />
        </div>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <TimelineContent />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
