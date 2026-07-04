import { Briefcase, Github, Linkedin, Twitter } from 'lucide-react';

const COLUMNS = [
  {
    title: 'For candidates',
    links: ['Browse jobs', 'Saved jobs', 'Career advice', 'Salary guide'],
  },
  {
    title: 'For employers',
    links: ['Post a job', 'Pricing', 'Employer branding', 'Talent search'],
  },
  {
    title: 'Company',
    links: ['About Hirely', 'Blog', 'Contact', 'Privacy policy'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-white/60 dark:border-white/5 dark:bg-surface-dark/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal-500 text-white">
                <Briefcase size={18} />
              </span>
              Hirely
            </a>
            <p className="mt-3 max-w-[220px] text-sm text-ink/50 dark:text-white/50">
              The job board built for people who'd rather be applying than scrolling.
            </p>
            <div className="mt-4 flex gap-3">
              <SocialIcon Icon={Twitter} label="Twitter" />
              <SocialIcon Icon={Linkedin} label="LinkedIn" />
              <SocialIcon Icon={Github} label="GitHub" />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-ink/60 transition-colors hover:text-signal-600 dark:text-white/60 dark:hover:text-signal-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/5 pt-6 text-xs text-ink/40 dark:border-white/5 dark:text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Hirely. All rights reserved.</p>
          <p>Built with React, TypeScript, Vite &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon, label }: { Icon: typeof Twitter; label: string }) {
  return (
    <a
      href="#top"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-signal-400 hover:text-signal-600 dark:border-white/10 dark:text-white/50 dark:hover:text-signal-300"
    >
      <Icon size={14} />
    </a>
  );
}
