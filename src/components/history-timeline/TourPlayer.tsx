import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { useTour } from '@/lib/history-timeline/useTour';

export const TourPlayer: React.FC = () => {
  const { activeTour, currentSlideIdx, exitTour, nextSlide, prevSlide, goToSlide } = useTour();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!activeTour) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') exitTour();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeTour, nextSlide, prevSlide, exitTour]);

  if (!activeTour) return null;

  const slide = activeTour.slides[currentSlideIdx];
  const total = activeTour.slides.length;
  const isFirst = currentSlideIdx === 0;
  const isLast = currentSlideIdx === total - 1;

  return (
    <AnimatePresence>
      <motion.div
        key="tour-player"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{
          background: 'rgba(10,12,20,0.94)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--ht-accent)',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4" style={{ color: 'var(--ht-accent)' }} />
            <span className="text-xs font-semibold tracking-wider" style={{ color: 'var(--ht-accent)' }}>
              GUIDED TOUR
            </span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {activeTour.title}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {activeTour.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === currentSlideIdx ? '18px' : '6px',
                    height: '6px',
                    background: i === currentSlideIdx ? 'var(--ht-accent)' : 'rgba(255,255,255,0.2)',
                  }}
                  title={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <span className="text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {currentSlideIdx + 1} / {total}
            </span>

            <button
              onClick={exitTour}
              className="p-1 rounded transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              title="Exit tour (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide content */}
        <div className="flex items-start gap-6 px-5 py-4">
          {/* Left nav */}
          <button
            onClick={prevSlide}
            disabled={isFirst}
            className="shrink-0 p-2 rounded-full transition-all mt-1"
            style={{
              color: isFirst ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)',
              border: '1px solid',
              borderColor: isFirst ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.2)',
              cursor: isFirst ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => { if (!isFirst) e.currentTarget.style.borderColor = 'var(--ht-accent)'; }}
            onMouseLeave={e => { if (!isFirst) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            title="Previous slide (←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 min-w-0"
            >
              <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                <h2 className="text-base font-bold leading-tight text-white">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <span className="text-xs font-normal" style={{ color: 'var(--ht-accent)' }}>
                    {slide.subtitle}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', maxHeight: '4.5em', overflow: 'hidden' }}>
                {slide.text}
              </p>
              <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Use ← → arrow keys to navigate
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Right nav */}
          <button
            onClick={isLast ? exitTour : nextSlide}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5"
            style={{
              background: 'var(--ht-accent)',
              color: isLast ? '#000' : '#fff',
              opacity: 0.95,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.95')}
            title={isLast ? 'Finish tour (→)' : 'Next slide (→)'}
          >
            {isLast ? 'Finish' : 'Next'}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
