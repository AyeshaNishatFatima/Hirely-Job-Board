import { SearchX } from 'lucide-react';
import type { Job, Category } from '@/types';
import JobCard from './JobCard';
import Filters from './Filters';

interface LatestJobsProps {
  jobs: Job[];
  activeCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  onOpen: (job: Job) => void;
}

export default function LatestJobs({ jobs, activeCategory, onSelectCategory, onOpen }: LatestJobsProps) {
  return (
    <section id="latest-jobs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-signal-600 dark:text-signal-300">
          {jobs.length} open role{jobs.length === 1 ? '' : 's'}
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Latest jobs</h2>
      </div>

      <div className="mb-8">
        <Filters active={activeCategory} onSelect={onSelectCategory} />
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 py-16 text-center dark:border-white/15">
          <SearchX size={28} className="text-ink/30 dark:text-white/30" />
          <p className="font-display text-lg font-semibold">No roles match those filters</p>
          <p className="max-w-sm text-sm text-ink/50 dark:text-white/50">
            Try a broader location, a different category, or clear your search to see everything we have open.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
