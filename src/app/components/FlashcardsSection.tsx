'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { FLASHCARDS } from '@/app/data';
import { SectionHeader } from './SectionHeader';

export const FlashcardsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const currentCard = FLASHCARDS[currentIndex];

  return (
    <section id="flashcards" className="py-24 px-6">
      <SectionHeader
        title="Interview Flashcards"
        icon={BookOpen}
      />

      <div className="max-w-2xl mx-auto mt-12">
        <div className="relative h-[400px] w-full perspective-1000">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <div
                className="relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full backface-hidden glass rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm border border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    {currentCard.category}
                  </span>
                  <h3 className="text-3xl font-bold text-ink mb-2">{currentCard.question}</h3>
                  <p className="text-muted text-sm mt-8 flex items-center gap-2">
                    <RotateCcw size={14} /> Click to flip
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden glass rounded-3xl p-8 flex flex-col shadow-xl border border-accent/20 overflow-y-auto"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    {currentCard.category} — Answer
                  </span>
                  <p className="text-lg font-medium text-ink mb-6">{currentCard.answer}</p>
                  <ul className="space-y-3">
                    {currentCard.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-muted text-sm leading-relaxed">
                        <span className="text-accent mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-8 px-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-ink hover:border-accent hover:text-accent transition-all"
            aria-label="Previous card"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-sm font-medium text-muted">
            {currentIndex + 1} / {FLASHCARDS.length}
          </div>
          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-ink hover:border-accent hover:text-accent transition-all"
            aria-label="Next card"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};
