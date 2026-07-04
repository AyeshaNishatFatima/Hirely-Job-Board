import { Search, MapPin, LayoutGrid } from 'lucide-react';
import { categories } from '@/data/categories';
import type { Category, JobFilters } from '@/types';

interface SearchBarProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export default function SearchBar({ filters, onChange }: SearchBarProps) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-2 shadow-card dark:border-white/10 dark:bg-surface-dark sm:flex-row sm:items-center">
      {/* Title / company query */}
      <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5">
        <Search size={18} className="shrink-0 text-ink/40 dark:text-white/40" />
        <input
          type="text"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Job title or company"
          aria-label="Search by job title or company"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none dark:text-white dark:placeholder:text-white/40"
        />
      </div>

      <div className="hidden h-8 w-px bg-ink/10 dark:bg-white/10 sm:block" />

      {/* Location */}
      <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5">
        <MapPin size={18} className="shrink-0 text-ink/40 dark:text-white/40" />
        <input
          type="text"
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          placeholder="City, state, or Remote"
          aria-label="Filter by location"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none dark:text-white dark:placeholder:text-white/40"
        />
      </div>

      <div className="hidden h-8 w-px bg-ink/10 dark:bg-white/10 sm:block" />

      {/* Category */}
      <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5">
        <LayoutGrid size={18} className="shrink-0 text-ink/40 dark:text-white/40" />
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as Category | 'All' })}
          aria-label="Filter by category"
          className="w-full cursor-pointer bg-transparent text-sm text-ink focus:outline-none dark:text-white dark:[color-scheme:dark]"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById('latest-jobs')?.scrollIntoView({ behavior: 'smooth' })}
        className="rounded-xl bg-signal-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-signal-600 active:scale-[0.98]"
      >
        Search jobs
      </button>
    </div>
  );
}
