import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import { cn } from '@/lib/utils';

interface ExpandableCardProps {
  title: string;
  subtitle: string;
  period?: string;
  description: string;
  details: string[];
  tags?: string[];
  link?: string;
  repoLink?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const ExpandableCard = ({
  title,
  subtitle,
  period,
  description,
  details,
  tags,
  link,
  repoLink,
  isOpen,
  onToggle
}: ExpandableCardProps) => (
  <motion.div
    layout
    className={cn(
      "group relative overflow-hidden rounded-2xl border transition-all duration-300",
      isOpen
        ? "bg-white dark:bg-gray-800 shadow-xl border-accent/20"
        : "bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-accent/40 hover:shadow-md"
    )}
  >
    <button
      onClick={onToggle}
      className="w-full text-left p-6 md:p-8 focus:outline-none"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h3 className="text-xl font-bold text-ink">{title}</h3>
            {period && (
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-muted-foreground">
                {period}
              </span>
            )}
          </div>
          <p className="text-muted-foreground font-medium">{subtitle}</p>
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-muted-foreground group-hover:text-primary transition-colors self-center md:self-auto mx-auto md:mx-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {tags && (
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>

    {(link || repoLink) && (
      <div className="flex items-center gap-4 px-6 md:px-8 pb-4">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View project <ExternalLink size={14} />
          </a>
        )}
        {repoLink && (
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            GitHub <GithubIcon size={14} />
          </a>
        )}
      </div>
    )}

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="px-6 md:px-8 pb-8 pt-0 border-t border-gray-100 dark:border-gray-700">
            <ul className="mt-6 space-y-3">
              {details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="text-muted-foreground mt-1.5">•</span>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
