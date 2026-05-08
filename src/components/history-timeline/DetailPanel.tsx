import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { useSearch } from '@/lib/history-timeline/useSearch';

const formatYear = (year: number) => {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 0) return '1 BCE';
  return `${year} CE`;
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'war':         return 'bg-red-600';
    case 'politics':    return 'bg-blue-600';
    case 'religion':    return 'bg-purple-600';
    case 'science':     return 'bg-green-600';
    case 'exploration': return 'bg-amber-600';
    case 'legislation': return 'bg-cyan-600';
    case 'disaster':    return 'bg-gray-500';
    case 'culture':     return 'bg-pink-600';
    case 'trade':       return 'bg-lime-600';
    case 'climate':     return 'bg-sky-500';
    case 'monument': case 'temple': case 'palace': case 'fort':
    case 'road': case 'bridge': case 'church': case 'castle': case 'landmark':
      return 'bg-amber-600';
    default: return 'bg-gray-500';
  }
};

export const DetailPanel: React.FC = () => {
  const { selectedItem, setSelectedItem } = useSearch();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedItem(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setSelectedItem]);

  if (!selectedItem) return null;

  const isEventOrConstruction = 'year' in selectedItem;
  const dateString = isEventOrConstruction
    ? (selectedItem.approximate ? 'c. ' : '') + formatYear(selectedItem.year)
    : `${formatYear(selectedItem.startYear)} – ${formatYear(selectedItem.endYear)}`;

  const paragraphs = selectedItem.description.split('\n\n').filter(Boolean);

  return (
    <AnimatePresence>
      {selectedItem && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 sm:hidden"
            onClick={() => setSelectedItem(null)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] md:w-[460px] z-50 flex flex-col shadow-2xl"
            style={{
              background:  'var(--ht-surface)',
              borderLeft:  '1px solid var(--ht-border-str)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 shrink-0"
              style={{ borderBottom: '1px solid var(--ht-border-str)' }}
            >
              {/* Accent stripe on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'var(--ht-accent)' }} />

              <div className="flex items-center gap-3 pl-3">
                {selectedItem.category && (
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white uppercase tracking-wider ${getCategoryColor(selectedItem.category)}`}>
                    {selectedItem.category}
                  </span>
                )}
                {selectedItem.eraId && (
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--ht-text-muted)' }}>
                    {selectedItem.eraName || 'Era'}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full transition-colors"
                style={{ color: 'var(--ht-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--ht-surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <h2
                  className="text-2xl font-serif font-bold mb-1 leading-tight"
                  style={{ color: 'var(--ht-text)' }}
                >
                  {selectedItem.name}
                </h2>
                <p className="text-base font-semibold" style={{ color: 'var(--ht-accent)' }}>
                  {dateString}
                </p>
              </div>

              {selectedItem.imageUrl && (
                <div
                  className="w-full rounded-lg overflow-hidden"
                  style={{ border: '1px solid var(--ht-border-str)' }}
                >
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="w-full h-auto max-h-[220px] object-cover object-center"
                  />
                </div>
              )}

              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ht-text-2)' }}>
                {paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>

            {/* Footer */}
            <div
              className="p-5 shrink-0"
              style={{
                borderTop:  '1px solid var(--ht-border-str)',
                background: 'var(--ht-bg-alt)',
              }}
            >
              <a
                href={selectedItem.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg transition-colors font-medium text-sm"
                style={{
                  background: 'var(--ht-surface-2)',
                  color:      'var(--ht-text)',
                  border:     '1px solid var(--ht-border-str)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--ht-border-str)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--ht-surface-2)')}
              >
                Read more on Wikipedia
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
