'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const fadeOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="home" className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Kristian Allin"
          className="w-full h-full object-cover"
        />
        {/* bottom gradient to blend into the page */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent"></div>
      </div>

      {/* scroll-driven fade to page background */}
      <motion.div
        className="absolute inset-0 z-10 bg-bg pointer-events-none"
        style={{ opacity: fadeOpacity }}
      />

      {/* Desktop: centred vertically. Mobile: pinned just below the nav bar */}
      <div className="relative z-20 w-full px-6 md:px-16 md:max-w-2xl mt-28 md:mt-0 self-start md:self-auto text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hidden on mobile — the nav already shows the name */}
          <h1 className="hidden md:block text-6xl md:text-8xl font-bold tracking-tighter text-ink mb-6">
            Kristian Allin
          </h1>
          <p className="text-lg md:text-2xl text-black leading-relaxed mb-6 md:mb-10">
            Full-stack developer with experience building and deploying production web applications.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
            <a
              href="#projects"
              className="px-6 md:px-8 py-3 md:py-4 bg-ink text-white dark:text-black rounded-xl font-bold hover:bg-accent transition-all hover:scale-105 active:scale-95 shadow-lg shadow-ink/10 text-sm md:text-base"
            >
              View Projects
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="p-3 md:p-4 bg-ink text-white dark:text-black hover:bg-accent rounded-2xl transition-all hover:scale-105 active:scale-95"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="p-3 md:p-4 bg-ink text-white dark:text-black hover:bg-accent rounded-2xl transition-all hover:scale-105 active:scale-95"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-muted"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};
