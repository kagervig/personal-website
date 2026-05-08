import React, { useMemo, useRef, useEffect } from 'react';
import { TimelineData } from '@/lib/history-timeline/types';
import { useSearch } from '@/lib/history-timeline/useSearch';
import { useTour } from '@/lib/history-timeline/useTour';
import { Search, Info, SlidersHorizontal, Eye, EyeOff, PlayCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getToursForTimeline } from '@/lib/history-timeline/tourStore';

interface SidebarProps {
  timeline: TimelineData;
  onNavigate: (year: number, zoomPreset: 'millennia' | 'centuries' | 'decades') => void;
}

const EVENT_CATEGORIES = [
  { id: 'war',         label: 'War',         color: 'bg-red-600'    },
  { id: 'politics',   label: 'Politics',    color: 'bg-blue-600'   },
  { id: 'religion',   label: 'Religion',    color: 'bg-purple-600' },
  { id: 'science',    label: 'Science',     color: 'bg-green-600'  },
  { id: 'exploration',label: 'Exploration', color: 'bg-amber-600'  },
  { id: 'legislation',label: 'Legislation', color: 'bg-cyan-600'   },
  { id: 'disaster',   label: 'Disaster',    color: 'bg-gray-500'   },
  { id: 'culture',    label: 'Culture',     color: 'bg-pink-600'   },
  { id: 'trade',      label: 'Trade',       color: 'bg-lime-600'   },
  { id: 'climate',    label: 'Climate',     color: 'bg-sky-500'    },
];

type SearchResult = {
  id: string;
  name: string;
  type: 'era' | 'ruler' | 'event' | 'construction';
  year: number;
};

function buildSearchResults(timeline: TimelineData, query: string): SearchResult[] {
  if (query.trim().length < 2) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const era of timeline.eras) {
    if (era.name.toLowerCase().includes(q) || era.description?.toLowerCase().includes(q)) {
      results.push({ id: era.id, name: era.name, type: 'era', year: era.startYear });
    }
  }
  for (const ruler of timeline.rulers) {
    if (ruler.name.toLowerCase().includes(q) || ruler.description?.toLowerCase().includes(q)) {
      results.push({ id: ruler.id, name: ruler.name, type: 'ruler', year: ruler.startYear });
    }
  }
  for (const construction of timeline.constructions) {
    if (construction.name.toLowerCase().includes(q) || construction.description?.toLowerCase().includes(q)) {
      results.push({ id: construction.id, name: construction.name, type: 'construction', year: construction.year });
    }
  }
  for (const event of timeline.events) {
    if (event.name.toLowerCase().includes(q) || event.description?.toLowerCase().includes(q)) {
      results.push({ id: event.id, name: event.name, type: 'event', year: event.year });
    }
  }

  results.sort((a, b) => a.year - b.year);
  return results.slice(0, 9);
}

function formatYear(year: number) {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

function typeLabel(type: SearchResult['type']) {
  return { era: 'Era', ruler: 'Ruler', event: 'Event', construction: 'Monument' }[type];
}

export const Sidebar: React.FC<SidebarProps> = ({ timeline, onNavigate }) => {
  const {
    searchQuery, setSearchQuery,
    activeCategories, toggleCategory,
    showEras, showRulers, showConstructions, showEvents, showPopulation, toggleRow,
    setSelectedItem,
  } = useSearch();

  const { startTour } = useTour();

  const inputRef = useRef<HTMLInputElement>(null);
  const [showResults, setShowResults] = React.useState(false);

  const searchResults = useMemo(
    () => buildSearchResults(timeline, searchQuery),
    [timeline, searchQuery]
  );

  const tours = useMemo(
    () => getToursForTimeline(timeline.id),
    [timeline.id]
  );

  useEffect(() => {
    if (searchQuery.length >= 2) setShowResults(true);
    else setShowResults(false);
  }, [searchQuery]);

  const usedCategories = new Set(timeline.events.map(e => e.category));
  const availableCategories = EVENT_CATEGORIES.filter(c => usedCategories.has(c.id as any));
  const totalEntries = timeline.eras.length + timeline.rulers.length + timeline.events.length + timeline.constructions.length;

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setSearchQuery('');

    // find the actual item to open detail panel
    let found: any = null;
    if (result.type === 'era') found = timeline.eras.find(e => e.id === result.id);
    if (result.type === 'ruler') found = timeline.rulers.find(r => r.id === result.id);
    if (result.type === 'event') found = timeline.events.find(e => e.id === result.id);
    if (result.type === 'construction') found = timeline.constructions.find(c => c.id === result.id);
    if (found) setSelectedItem({ ...found, itemType: result.type });

    onNavigate(result.year, 'centuries');
  };

  return (
    <div
      className="w-[240px] h-screen flex flex-col shrink-0"
      style={{
        background: 'var(--ht-bg-alt)',
        borderRight: '1px solid var(--ht-border)',
        color: 'var(--ht-text-2)',
      }}
    >
      {/* Accent strip at top */}
      <div className="h-1 shrink-0" style={{ background: 'var(--ht-accent)' }} />

      {/* Search */}
      <div className="p-4 relative" style={{ borderBottom: '1px solid var(--ht-border)' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--ht-text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search timeline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => { if (searchQuery.length >= 2) setShowResults(true); }}
            onBlur={() => setTimeout(() => setShowResults(false), 150)}
            className="w-full rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 transition-colors"
            style={{
              background: 'var(--ht-surface)',
              border: '1px solid var(--ht-border-str)',
              color: 'var(--ht-text)',
              '--tw-ring-color': 'var(--ht-accent)',
            } as React.CSSProperties}
          />
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div
            className="absolute left-4 right-4 z-50 rounded-md shadow-xl mt-1 overflow-hidden"
            style={{
              top: '100%',
              background: 'var(--ht-surface)',
              border: '1px solid var(--ht-border-str)',
            }}
          >
            {searchResults.map(result => (
              <button
                key={`${result.type}-${result.id}`}
                onMouseDown={() => handleResultClick(result)}
                className="w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 transition-colors"
                style={{ borderBottom: '1px solid var(--ht-border)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--ht-surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: 'var(--ht-text)' }}>
                    {result.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--ht-text-muted)' }}>
                    {typeLabel(result.type)} · {formatYear(result.year)}
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 shrink-0" style={{ color: 'var(--ht-accent)' }} />
              </button>
            ))}
          </div>
        )}

        {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
          <div
            className="absolute left-4 right-4 z-50 rounded-md shadow-xl mt-1 px-3 py-3 text-xs"
            style={{
              top: '100%',
              background: 'var(--ht-surface)',
              border: '1px solid var(--ht-border-str)',
              color: 'var(--ht-text-muted)',
            }}
          >
            No results found
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Guided Tours */}
        {tours.length > 0 && (
          <section>
            <h3
              className="text-xs font-semibold tracking-wider mb-3 flex items-center gap-1.5"
              style={{ color: 'var(--ht-text-muted)' }}
            >
              <PlayCircle className="w-3 h-3" />
              GUIDED TOURS
            </h3>
            <div className="space-y-2">
              {tours.map(tour => (
                <div
                  key={tour.id}
                  className="rounded-md p-3"
                  style={{
                    background: 'var(--ht-surface)',
                    border: '1px solid var(--ht-border-str)',
                  }}
                >
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--ht-text)' }}>
                    {tour.title}
                  </div>
                  {tour.description && (
                    <div className="text-xs mb-2" style={{ color: 'var(--ht-text-muted)' }}>
                      {tour.slides.length} slides
                    </div>
                  )}
                  <button
                    onClick={() => startTour(tour)}
                    className="w-full text-xs font-semibold py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors"
                    style={{
                      background: 'var(--ht-accent)',
                      color: '#fff',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <PlayCircle className="w-3 h-3" />
                    Play Tour
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category filters */}
        <section>
          <h3
            className="text-xs font-semibold tracking-wider mb-3 flex items-center gap-1.5"
            style={{ color: 'var(--ht-text-muted)' }}
          >
            <SlidersHorizontal className="w-3 h-3" />
            FILTER CATEGORIES
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map(cat => {
              const isActive = activeCategories.length === 0 || activeCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className="text-xs px-2 py-1 rounded-full border transition-colors flex items-center gap-1.5"
                  style={{
                    background: isActive ? 'var(--ht-surface-2)' : 'transparent',
                    borderColor: isActive ? 'var(--ht-border-str)' : 'transparent',
                    color: isActive ? 'var(--ht-text)' : 'var(--ht-text-muted)',
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Row toggles */}
        <section>
          <h3
            className="text-xs font-semibold tracking-wider mb-3"
            style={{ color: 'var(--ht-text-muted)' }}
          >
            TIMELINE ROWS
          </h3>
          <div className="space-y-1">
            <RowToggle label="Eras"          isActive={showEras}          onClick={() => toggleRow('showEras')} />
            <RowToggle label="Rulers"        isActive={showRulers}        onClick={() => toggleRow('showRulers')} />
            <RowToggle label="Constructions" isActive={showConstructions} onClick={() => toggleRow('showConstructions')} />
            <RowToggle label="Events"        isActive={showEvents}        onClick={() => toggleRow('showEvents')} />
            {timeline.population && (
              <RowToggle label="Population" isActive={showPopulation} onClick={() => toggleRow('showPopulation')} />
            )}
          </div>
        </section>

        {/* About */}
        <section>
          <h3
            className="text-xs font-semibold tracking-wider mb-3 flex items-center gap-1.5"
            style={{ color: 'var(--ht-text-muted)' }}
          >
            <Info className="w-3 h-3" />
            ABOUT
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ht-text-muted)' }}>
            {totalEntries} curated entries. Drag horizontally, use the wheel to zoom, click any item to read more.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div
        className="p-4 text-xs space-y-2 shrink-0"
        style={{
          borderTop: '1px solid var(--ht-border)',
          background: 'var(--ht-bg-alt)',
          color: 'var(--ht-text-muted)',
        }}
      >
        <p>Wheel zooms · Drag pans · ESC closes panel</p>
        <Link
          href="/history-timelines/admin"
          className="inline-block transition-colors hover:underline"
          style={{ color: 'var(--ht-text-muted)' }}
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
};

const RowToggle: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full text-sm py-1.5 px-2 rounded transition-colors"
    style={{
      color: isActive ? 'var(--ht-text)' : 'var(--ht-text-muted)',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = 'var(--ht-surface-2)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  >
    <span>{label}</span>
    {isActive
      ? <Eye className="w-4 h-4" style={{ color: 'var(--ht-text-muted)' }} />
      : <EyeOff className="w-4 h-4" style={{ color: 'var(--ht-border-str)' }} />
    }
  </button>
);
