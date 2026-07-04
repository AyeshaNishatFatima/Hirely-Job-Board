import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Heart, CheckCircle2 } from 'lucide-react';
import type { Job } from '@/types';
import { getCompany } from '@/data/companies';
import { formatSalary, formatRelativeDate, cx } from '@/utils/format';
import { useFavorites } from '@/context/FavoritesContext';

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
}

export default function JobModal({ job, onClose }: JobModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [applied, setApplied] = useState(false);

  // Reset the local "applied" confirmation whenever a different job opens
  useEffect(() => {
    setApplied(false);
  }, [job?.id]);

  // Allow closing with the Escape key
  useEffect(() => {
    if (!job) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [job, onClose]);

  if (!job) return null;
  const company = getCompany(job.companyId);
  const saved = isFavorite(job.id);

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${job.title} at ${company.name}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-xl dark:bg-surface-dark sm:rounded-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/5 bg-white/95 px-6 py-4 backdrop-blur dark:border-white/5 dark:bg-surface-dark/95">
              <span className="text-sm font-medium text-ink/50 dark:text-white/50">Job details</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-ink/50 hover:bg-ink/5 dark:text-white/50 dark:hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="flex items-start gap-4">
                <div
                  className={cx(
                    'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-white',
                    company.logoColor,
                  )}
                >
                  {company.logoInitials}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold sm:text-2xl">{job.title}</h2>
                  <p className="text-sm text-ink/60 dark:text-white/60">
                    {company.name} · {company.industry}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(job.id)}
                  aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
                  className="rounded-full p-2 text-ink/30 hover:bg-rose-50 hover:text-rose-500 dark:text-white/30 dark:hover:bg-rose-500/10"
                >
                  <Heart size={20} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-rose-500' : ''} />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill><MapPin size={13} /> {job.remote ? 'Remote' : job.location}</Pill>
                <Pill><Clock size={13} /> {job.type}</Pill>
                <Pill mono>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</Pill>
                <Pill>{formatRelativeDate(job.postedAt)}</Pill>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ink/80 dark:text-white/80">{job.description}</p>

              <Section title="Responsibilities" items={job.responsibilities} />
              <Section title="Requirements" items={job.requirements} />

              <div className="mt-6 flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-signal-50 px-2 py-1 text-xs font-medium text-signal-700 dark:bg-signal-500/10 dark:text-signal-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                disabled={applied}
                onClick={() => setApplied(true)}
                className={cx(
                  'mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors',
                  applied ? 'bg-success' : 'bg-signal-500 hover:bg-signal-600',
                )}
              >
                {applied ? (
                  <>
                    <CheckCircle2 size={16} /> Application submitted
                  </>
                ) : (
                  'Apply now'
                )}
              </button>
              <p className="mt-2 text-center text-xs text-ink/40 dark:text-white/40">
                This is a demo application — no data is sent anywhere.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Pill({ children, mono }: { children: ReactNode; mono?: boolean }) {
  return (
    <span
      className={cx(
        'flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/70 dark:bg-white/10 dark:text-white/70',
        mono && 'font-mono',
      )}
    >
      {children}
    </span>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50 dark:text-white/50">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink/80 dark:text-white/80">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
