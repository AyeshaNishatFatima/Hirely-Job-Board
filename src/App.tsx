import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CompanyLogos from '@/components/CompanyLogos';
import Stats from '@/components/Stats';
import FeaturedJobs from '@/components/FeaturedJobs';
import LatestJobs from '@/components/LatestJobs';
import Footer from '@/components/Footer';
import JobModal from '@/components/JobModal';
import SavedJobsDrawer from '@/components/SavedJobsDrawer';
import { jobs } from '@/data/jobs';
import { getCompany } from '@/data/companies';
import { useDebounce } from '@/hooks/useDebounce';
import { useFavorites } from '@/context/FavoritesContext';
import type { Job, JobFilters } from '@/types';

const INITIAL_FILTERS: JobFilters = { query: '', location: '', category: 'All' };

export default function App() {
  const [filters, setFilters] = useState<JobFilters>(INITIAL_FILTERS);
  const debouncedQuery = useDebounce(filters.query);
  const debouncedLocation = useDebounce(filters.location);

  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [savedOpen, setSavedOpen] = useState(false);

  const { favoriteIds } = useFavorites();

  const featuredJobs = useMemo(() => jobs.filter((j) => j.featured), []);

  const filteredJobs = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    const location = debouncedLocation.trim().toLowerCase();

    return jobs
      .filter((job) => {
        if (filters.category !== 'All' && job.category !== filters.category) return false;

        if (query) {
          const company = getCompany(job.companyId);
          const haystack = `${job.title} ${company.name}`.toLowerCase();
          if (!haystack.includes(query)) return false;
        }

        if (location) {
          const isRemoteMatch = job.remote && 'remote'.includes(location);
          const isLocationMatch = job.location.toLowerCase().includes(location);
          if (!isRemoteMatch && !isLocationMatch) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }, [debouncedQuery, debouncedLocation, filters.category]);

  const savedJobs = useMemo(() => jobs.filter((j) => favoriteIds.has(j.id)), [favoriteIds]);

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-base-dark dark:text-white">
      <Navbar onShowSaved={() => setSavedOpen(true)} />

      <main>
        <Hero filters={filters} onChange={setFilters} />
        <Stats />
        <FeaturedJobs jobs={featuredJobs} onOpen={setActiveJob} />
        <CompanyLogos />
        <LatestJobs
          jobs={filteredJobs}
          activeCategory={filters.category}
          onSelectCategory={(category) => setFilters((f) => ({ ...f, category }))}
          onOpen={setActiveJob}
        />
      </main>

      <Footer />

      <JobModal job={activeJob} onClose={() => setActiveJob(null)} />
      <SavedJobsDrawer
        open={savedOpen}
        onClose={() => setSavedOpen(false)}
        jobs={savedJobs}
        onOpenJob={(job) => {
          setSavedOpen(false);
          setActiveJob(job);
        }}
      />
    </div>
  );
}
