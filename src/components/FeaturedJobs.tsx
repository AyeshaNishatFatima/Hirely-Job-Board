import type { Job } from '@/types';
import JobCard from './JobCard';

interface FeaturedJobsProps {
  jobs: Job[];
  onOpen: (job: Job) => void;
}

export default function FeaturedJobs({ jobs, onOpen }: FeaturedJobsProps) {
  if (jobs.length === 0) return null;

  return (
    <section id="featured-jobs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-signal-600 dark:text-signal-300">
            Handpicked
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Featured jobs</h2>
        </div>
      </div>

      <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {jobs.map((job) => (
          <div key={job.id} className="w-[300px] shrink-0 snap-start sm:w-[320px]">
            <JobCard job={job} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}
