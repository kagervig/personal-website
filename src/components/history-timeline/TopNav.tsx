import React from 'react';
import { TimelineId } from '@/lib/history-timeline/types';

interface TopNavProps {
  activeTimeline: TimelineId;
  onSelect: (id: TimelineId) => void;
}

const timelines: { id: TimelineId; label: string }[] = [
  { id: 'egypt',             label: 'EGYPT' },
  { id: 'rome',              label: 'ROME' },
  { id: 'romans-in-britain', label: 'ROMANS IN BRITAIN' },
  { id: 'british-monarchy',  label: 'BRITISH MONARCHY' },
  { id: 'britain',           label: 'BRITAIN' },
];

export const TopNav: React.FC<TopNavProps> = ({ activeTimeline, onSelect }) => {
  return (
    <div className="flex space-x-1">
      {timelines.map((t) => {
        const isActive = activeTimeline === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="px-3 py-2 text-xs font-semibold tracking-wider transition-colors border-b-2"
            style={{
              color: isActive ? 'var(--ht-text)' : 'var(--ht-text-muted)',
              borderBottomColor: isActive ? 'var(--ht-accent)' : 'transparent',
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};
