'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/app/data';

interface NavProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Nav = ({ activeSection, isMenuOpen, setIsMenuOpen }: NavProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
          <a href="#home" className="text-xl font-bold tracking-tighter text-ink flex items-center gap-2">
            <span className="w-8 h-8 bg-ink text-bg rounded-lg flex items-center justify-center text-sm">KA</span>
            Kristian Allin
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  activeSection === link.id ? "text-accent" : "text-muted"
                )}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-muted hover:text-accent transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent/90 transition-all"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent/90 transition-all"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              className="p-2 text-ink"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-700 last:border-none",
                    activeSection === link.id ? "text-accent" : "text-muted"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-2 text-lg font-medium text-muted py-2"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
