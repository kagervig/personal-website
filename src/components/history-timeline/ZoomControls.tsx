import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, CornerDownRight } from 'lucide-react';
import { TimelineData } from '@/lib/history-timeline/types';
import { useTimeline } from '@/lib/history-timeline/useTimeline';

const PADDING_LEFT = 50;

interface ZoomControlsProps {
  timeline: TimelineData;
  containerWidth: number;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({ timeline, containerWidth }) => {
  const { zoom, panX, setZoom, navigateTo } = useTimeline();
  const [yearInput, setYearInput] = useState('');
  const [jumpError, setJumpError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalYears = timeline.endYear - timeline.startYear;
  const millenniaZoom = containerWidth / totalYears;
  const centuriesZoom = millenniaZoom * 10;
  const decadesZoom = millenniaZoom * 100;

  const clampPanX = (px: number, z: number) => {
    const canvasWidth = totalYears * z + PADDING_LEFT * 2;
    return Math.max(containerWidth - canvasWidth, Math.min(0, px));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setZoom(millenniaZoom * Math.pow(10, val));
  };

  // Zoom to the new level while keeping the current centre year in the middle of the viewport
  const handlePreset = (preset: 'millennia' | 'centuries' | 'decades') => {
    let newZoom = millenniaZoom;
    if (preset === 'centuries') newZoom = centuriesZoom;
    if (preset === 'decades')   newZoom = decadesZoom;

    const centreYear = timeline.startYear + (containerWidth / 2 - panX - PADDING_LEFT) / zoom;
    const newItemPixel = (centreYear - timeline.startYear) * newZoom + PADDING_LEFT;
    const newPanX = clampPanX(containerWidth / 2 - newItemPixel, newZoom);

    navigateTo(newPanX, newZoom);
  };

  // Jump to a typed year at the current zoom (or centuries if currently zoomed out)
  const handleJump = () => {
    const raw = yearInput.trim().replace(/[^\d\-]/g, '');
    const year = parseInt(raw, 10);

    if (isNaN(year) || year < timeline.startYear || year > timeline.endYear) {
      setJumpError(true);
      setTimeout(() => setJumpError(false), 1000);
      return;
    }

    // Use centuries zoom minimum — if already more zoomed in, keep current zoom
    const targetZoom = Math.max(zoom, centuriesZoom);
    const itemPixel = (year - timeline.startYear) * targetZoom + PADDING_LEFT;
    const newPanX = clampPanX(containerWidth / 2 - itemPixel, targetZoom);

    navigateTo(newPanX, targetZoom);
    setYearInput('');
    inputRef.current?.blur();
  };

  const currentSliderVal = Math.log10(Math.max(zoom / millenniaZoom, 1));

  return (
    <div className="flex items-center gap-2">
      {/* Jump-to-year */}
      <div
        className="flex items-center rounded-lg overflow-hidden"
        style={{
          background: 'var(--ht-surface)',
          border: `1px solid ${jumpError ? '#ef4444' : 'var(--ht-border-str)'}`,
          transition: 'border-color 0.2s',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={yearInput}
          onChange={e => { setYearInput(e.target.value); setJumpError(false); }}
          onKeyDown={e => { if (e.key === 'Enter') handleJump(); }}
          placeholder="Jump to year…"
          className="text-xs py-1.5 pl-2.5 pr-1 bg-transparent outline-none w-[108px]"
          style={{ color: 'var(--ht-text)', '::placeholder': { color: 'var(--ht-text-muted)' } } as React.CSSProperties}
          title="Type a year (negative = BCE) and press Enter"
        />
        <button
          onClick={handleJump}
          className="px-2 py-1.5 transition-colors flex items-center"
          style={{ color: 'var(--ht-accent)', borderLeft: '1px solid var(--ht-border-str)' }}
          title="Go"
        >
          <CornerDownRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Zoom presets + slider */}
      <div
        className="flex items-center space-x-3 px-3 py-1.5 rounded-lg"
        style={{
          background: 'var(--ht-surface)',
          border: '1px solid var(--ht-border-str)',
        }}
      >
        <div className="flex space-x-0.5">
          <PresetButton label="MILLENNIA" onClick={() => handlePreset('millennia')} active={Math.abs(zoom - millenniaZoom) < millenniaZoom * 0.5} />
          <PresetButton label="CENTURIES" onClick={() => handlePreset('centuries')} active={Math.abs(zoom - centuriesZoom) < centuriesZoom * 0.5} />
          <PresetButton label="DECADES"   onClick={() => handlePreset('decades')}   active={Math.abs(zoom - decadesZoom)   < decadesZoom   * 0.5} />
        </div>

        <div className="w-px h-5" style={{ background: 'var(--ht-border-str)' }} />

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setZoom(zoom * 0.8)}
            className="p-1 rounded transition-colors"
            style={{ color: 'var(--ht-text-muted)' }}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <input
            type="range"
            min="0"
            max="3"
            step="0.01"
            value={currentSliderVal}
            onChange={handleSliderChange}
            className="w-20"
            style={{ accentColor: 'var(--ht-accent)' }}
          />

          <button
            onClick={() => setZoom(zoom * 1.2)}
            className="p-1 rounded transition-colors"
            style={{ color: 'var(--ht-text-muted)' }}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PresetButton: React.FC<{ label: string; onClick: () => void; active: boolean }> = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className="px-2 py-1 text-[10px] font-semibold tracking-wider rounded transition-colors"
    style={{
      background:  active ? 'var(--ht-accent-dim)' : 'transparent',
      color:       active ? 'var(--ht-accent)'     : 'var(--ht-text-muted)',
    }}
  >
    {label}
  </button>
);
