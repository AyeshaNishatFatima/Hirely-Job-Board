import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useFavorites } from '@/context/FavoritesContext';

const NAV_LINKS = [
  { label: 'Find jobs', href: '#latest-jobs' },
  { label: 'Companies', href: '#companies' },
  { label: 'Featured', href: '#featured-jobs' },
];

interface NavbarProps {
  onShowSaved: () => void;
}

export default function Navbar({ onShowSaved }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { favoriteIds } = useFavorites();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/80 backdrop-blur-md dark:border-white/5 dark:bg-base-dark/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-700 tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal-500 text-white">
            <Briefcase size={18} />
          </span>
          Hirely
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-signal-600 dark:text-white/70 dark:hover:text-signal-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onShowSaved}
            className="relative text-sm font-medium text-ink/70 transition-colors hover:text-signal-600 dark:text-white/70 dark:hover:text-signal-300"
          >
            Saved jobs
            {favoriteIds.size > 0 && (
              <span className="ml-1.5 rounded-full bg-highlight px-1.5 py-0.5 text-xs font-semibold text-white">
                {favoriteIds.size}
              </span>
            )}
          </button>
          <ThemeToggle />
          <a
            href="#latest-jobs"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] dark:bg-signal-500"
          >
            Post a job
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 dark:border-white/10"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-ink/5 md:hidden dark:border-white/5"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-ink/5 dark:text-white/80 dark:hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  onShowSaved();
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-ink/80 hover:bg-ink/5 dark:text-white/80 dark:hover:bg-white/5"
              >
                Saved jobs {favoriteIds.size > 0 ? `(${favoriteIds.size})` : ''}
              </button>
              <a
                href="#latest-jobs"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-ink px-3 py-2 text-center text-sm font-semibold text-white dark:bg-signal-500"
              >
                Post a job
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
