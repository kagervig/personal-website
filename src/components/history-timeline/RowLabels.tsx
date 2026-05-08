import React from 'react';

const rows: { label: string; height: number }[] = [
  { label: 'ERAS',          height: 60  },
  { label: 'RULERS',        height: 80  },
  { label: 'CONSTRUCTIONS', height: 120 },
  { label: 'EVENTS',        height: 180 },
];

export const RowLabels: React.FC = () => {
  return (
    <div
      className="w-[140px] shrink-0 flex flex-col z-10 sticky left-0 h-[480px]"
      style={{
        background: 'var(--ht-surface)',
        borderRight: '1px solid var(--ht-border)',
        boxShadow: '2px 0 10px rgba(0,0,0,0.15)',
      }}
    >
      {/* Year axis spacer */}
      <div className="h-[40px] shrink-0" style={{ borderBottom: '1px solid var(--ht-border)' }} />

      {rows.map(({ label, height }, i) => (
        <div
          key={label}
          className="shrink-0 flex items-center px-4"
          style={{
            height,
            borderBottom: i < rows.length - 1 ? '1px solid var(--ht-border)' : undefined,
          }}
        >
          <span
            className="text-[10px] font-bold tracking-widest select-none writing-mode-vertical-lr"
            style={{ color: 'var(--ht-text-muted)' }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};
