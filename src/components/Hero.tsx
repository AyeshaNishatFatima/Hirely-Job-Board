import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import { jobs } from '@/data/jobs';
import { getCompany } from '@/data/companies';
import type { JobFilters } from '@/types';

interface HeroProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export default function Hero({ filters, onChange }: HeroProps) {
  // Signature element: an auto-scrolling ticker of live openings, styled after
  // a stock ticker / departure board — evokes the constant motion of a job market.
  const tickerItems = [...jobs, ...jobs];

  return (
    <section id="top" className="relative overflow-hidden pt-14 sm:pt-20">
      {/* Ambient gradient accent, quiet and confined to the hero only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.signal.200)_0%,transparent_70%)] opacity-60 dark:bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.signal.900)_0%,transparent_70%)] dark:opacity-40"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/60 dark:border-white/10 dark:bg-surface-dark dark:text-white/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          2,400+ roles hiring right now
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Find work that fits <span className="text-signal-500">how you work.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base text-ink/60 dark:text-white/60"
        >
          Hirely curates real openings from fast-growing companies — remote, hybrid, and
          on-site — so you can stop scrolling and start applying.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8"
        >
          <SearchBar filters={filters} onChange={onChange} />
        </motion.div>
      </div>

      {/* Live openings ticker */}
      <div className="relative mt-12 border-y border-ink/5 bg-white/60 py-3 dark:border-white/5 dark:bg-surface-dark/60">
        <div className="no-scrollbar flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-8 pr-8">
            {tickerItems.map((job, i) => {
              const company = getCompany(job.companyId);
              return (
                <div key={`${job.id}-${i}`} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm">
                  <span className={`h-1.5 w-1.5 rounded-full ${company.logoColor}`} />
                  <span className="font-medium text-ink/80 dark:text-white/80">{job.title}</span>
                  <span className="text-ink/40 dark:text-white/40">@ {company.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Fade edges so the ticker reads as continuous, not clipped */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent dark:from-base-dark" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent dark:from-base-dark" />
      </div>
    </section>
  );
}
