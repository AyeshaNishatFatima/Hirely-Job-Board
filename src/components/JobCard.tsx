import { motion } from 'framer-motion';
import { Heart, MapPin, Clock, Star } from 'lucide-react';
import type { Job } from '@/types';
import { getCompany } from '@/data/companies';
import { formatSalary, formatRelativeDate, cx } from '@/utils/format';
import { useFavorites } from '@/context/FavoritesContext';

interface JobCardProps {
  job: Job;
  onOpen: (job: Job) => void;
}

export default function JobCard({ job, onOpen }: JobCardProps) {
  const company = getCompany(job.companyId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(job.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-cardHover dark:border-white/10 dark:bg-surface-dark"
    >
      {job.featured && (
        <span className="absolute -top-2.5 left-5 flex items-center gap-1 rounded-full bg-highlight px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
          <Star size={11} fill="currentColor" /> Featured
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cx(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white',
              company.logoColor,
            )}
            aria-hidden
          >
            {company.logoInitials}
          </div>
          <div>
            <h3 className="font-display text-base font-semibold leading-tight">{job.title}</h3>
            <p className="text-sm text-ink/60 dark:text-white/60">{company.name}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(job.id)}
          aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
          aria-pressed={saved}
          className="shrink-0 rounded-full p-2 text-ink/30 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:text-white/30 dark:hover:bg-rose-500/10"
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-rose-500' : ''} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-signal-50 px-2 py-1 text-xs font-medium text-signal-700 dark:bg-signal-500/10 dark:text-signal-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink/50 dark:text-white/50">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {job.remote ? 'Remote' : job.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} /> {job.type}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4 dark:border-white/5">
        <span className="font-mono text-sm font-medium text-ink dark:text-white">
          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
        </span>
        <span className="text-xs text-ink/40 dark:text-white/40">{formatRelativeDate(job.postedAt)}</span>
      </div>

      <button
        type="button"
        onClick={() => onOpen(job)}
        className="mt-4 w-full rounded-xl bg-ink py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600 dark:bg-white/10 dark:hover:bg-signal-500"
      >
        View & Apply
      </button>
    </motion.article>
  );
}
