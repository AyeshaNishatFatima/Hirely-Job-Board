import { companies } from '@/data/companies';
import { cx } from '@/utils/format';

export default function CompanyLogos() {
  return (
    <section id="companies" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink/40 dark:text-white/40">
        Trusted by hiring teams at
      </p>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-ink/5 bg-white/60 px-3 py-4 transition-colors hover:border-signal-200 dark:border-white/5 dark:bg-surface-dark/60 dark:hover:border-signal-800"
          >
            <div
              className={cx(
                'flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white',
                company.logoColor,
              )}
            >
              {company.logoInitials}
            </div>
            <span className="text-center text-xs font-medium text-ink/70 dark:text-white/70">{company.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
