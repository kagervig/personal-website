'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  src: string;
  caption: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

export const PhotoCarousel = ({ photos }: PhotoCarouselProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % photos.length);
  }, [photos.length]);

  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);

  // Auto-advance every 10 seconds; resets when user navigates manually
  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next, current]);

  return (
    <div className="relative aspect-video rounded-[2rem] overflow-hidden max-w-4xl mx-auto w-full group">
      {/* Slides */}
      {photos.map((photo, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: idx === current ? 1 : 0, pointerEvents: idx === current ? 'auto' : 'none' }}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}

      {/* Bottom gradient for caption legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Caption */}
      <div className="absolute bottom-10 left-0 right-0 px-6 pointer-events-none">
        <p className="text-white text-sm font-medium text-center drop-shadow">
          {photos[current].caption}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
        {photos.map((_, idx) => (
          <div
            key={idx}
            className="h-1.5 rounded-full bg-white transition-all duration-300"
            style={{ width: idx === current ? '1.5rem' : '0.375rem', opacity: idx === current ? 1 : 0.5 }}
          />
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous photo"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next photo"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
