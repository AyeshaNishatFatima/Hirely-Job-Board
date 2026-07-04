import { motion, AnimatePresence } from 'framer-motion';
import { X, HeartOff } from 'lucide-react';
import type { Job } from '@/types';
import { getCompany } from '@/data/companies';
import { formatSalary, cx } from '@/utils/format';
import { useFavorites } from '@/context/FavoritesContext';

interface SavedJobsDrawerProps {
  open: boolean;
  onClose: () => void;
  jobs: Job[];
  onOpenJob: (job: Job) => void;
}

export default function SavedJobsDrawer({ open, onClose, jobs, onOpenJob }: SavedJobsDrawerProps) {
  const { toggleFavorite } = useFavorites();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-xl dark:bg-surface-dark"
            aria-label="Saved jobs"
          >
            <div className="flex items-center justify-between border-b border-ink/5 px-5 py-4 dark:border-white/5">
              <h2 className="font-display text-lg font-semibold">Saved jobs ({jobs.length})</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close saved jobs"
                className="rounded-full p-1.5 text-ink/50 hover:bg-ink/5 dark:text-white/50 dark:hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {jobs.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <HeartOff size={26} className="text-ink/25 dark:text-white/25" />
                  <p className="font-medium text-ink/60 dark:text-white/60">No saved jobs yet</p>
                  <p className="max-w-[220px] text-sm text-ink/40 dark:text-white/40">
                    Tap the heart on any job card to save it here for later.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {jobs.map((job) => {
                    const company = getCompany(job.companyId);
                    return (
                      <li
                        key={job.id}
                        className="flex items-start gap-3 rounded-xl border border-ink/5 p-3 dark:border-white/5"
                      >
                        <div
                          className={cx(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white',
                            company.logoColor,
                          )}
                        >
                          {company.logoInitials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => onOpenJob(job)}
                            className="truncate text-left text-sm font-semibold hover:text-signal-600 dark:hover:text-signal-300"
                          >
                            {job.title}
                          </button>
                          <p className="truncate text-xs text-ink/50 dark:text-white/50">{company.name}</p>
                          <p className="mt-1 font-mono text-xs text-ink/60 dark:text-white/60">
                            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(job.id)}
                          aria-label="Remove from saved jobs"
                          className="shrink-0 rounded-full p-1.5 text-ink/30 hover:bg-rose-50 hover:text-rose-500 dark:text-white/30 dark:hover:bg-rose-500/10"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
