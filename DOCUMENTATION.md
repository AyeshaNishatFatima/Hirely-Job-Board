# Hirely — Project Documentation

This document covers the architecture, design system, data model, and operational details of the Hirely job board in more depth than the README.

## 1. Architecture overview

Hirely is a client-only single-page application. There is no backend: job, company, and category data is bundled at build time from `src/data/`. This keeps the assessment self-contained while mirroring the shape a real API response would take, so swapping in a real backend later only means replacing the data layer.

```
User interaction
      │
      ▼
App.tsx (owns filter + modal + drawer state)
      │
      ├── Hero            → search input, updates JobFilters
      ├── FeaturedJobs     → reads pre-filtered "featured" jobs
      ├── LatestJobs       → reads filtered + sorted job list
      ├── CompanyLogos     → static company directory
      ├── JobModal         → job detail + demo apply flow
      └── SavedJobsDrawer  → reads FavoritesContext
```

State is intentionally kept shallow:

- **Filter state** (`JobFilters`: query, location, category) lives in `App.tsx` and is threaded down as props. It's small enough that Context would be overkill.
- **Theme** and **Favorites** are the two pieces of state that need to be read from many, unrelated places (Navbar, JobCard, JobModal, SavedJobsDrawer) and persisted — so they're each a small React Context with a paired provider, following the standard "context + hook" pattern (`useTheme`, `useFavorites`).

## 2. Design system

The visual direction avoids the generic "AI-app" defaults (warm cream + serif, or black + neon) in favor of a **cool, data-forward palette** appropriate to a job marketplace: a paper-white/ink-navy base, a "signal blue" primary accent, and an amber highlight reserved for "Featured" marks — like a highlighter on a job posting.

### Color tokens (`tailwind.config.js`)

| Token             | Value      | Usage                              |
| ----------------- | ---------- | ----------------------------------- |
| `paper`           | `#F6F7FB`  | Light-mode background               |
| `base.dark`       | `#0E1116`  | Dark-mode background                |
| `ink`             | `#12141C`  | Primary text (light mode)           |
| `signal.500`      | `#5B6EF5`  | Primary brand accent (buttons, links)|
| `highlight`       | `#F59E0B`  | "Featured" badge only               |
| `success`         | `#16A34A`  | Live-status dot, applied state      |

### Typography

- **Space Grotesk** (display) — headings, brand mark. A geometric, slightly technical face that reads as modern without being a default serif/sans pairing.
- **Inter** (body) — all paragraph and UI copy, chosen for legibility at small sizes.
- **IBM Plex Mono** (utility) — salary figures and data-like values, to visually distinguish "facts" (numbers) from prose.

### Signature element

The hero includes an auto-scrolling **live openings ticker** — a horizontal marquee of job title / company pairs, styled after a stock ticker or airport departure board. It reinforces the idea of a constantly-moving job market and gives the hero a distinctive, memorable moment beyond a static headline and search bar.

### Motion

Framer Motion drives three kinds of movement, deliberately kept restrained:

1. **Page-load sequence** in the hero (staggered fade/slide-up of eyebrow → headline → subhead → search bar).
2. **Scroll reveals** on job cards (`whileInView`, once-only) so the grid doesn't feel static.
3. **Micro-interactions**: card hover lift, button scale-on-press, modal/drawer enter-exit transitions.

`prefers-reduced-motion` is respected globally via a CSS media query in `index.css`.

## 3. Data model

Defined in `src/types/index.ts`:

- **`Company`** — id, display name, initials + Tailwind color (used to render a logo mark with zero image requests), location, industry.
- **`Job`** — id, title, `companyId` (foreign key into `companies.ts`), category, employment type, location/remote flag, salary range + currency, ISO `postedAt` date, `featured` flag, tags, description, responsibilities, requirements.
- **`JobFilters`** — the three active search inputs: free-text `query`, `location`, and `category`.
- **`Stat`** — id, label, numeric value, optional suffix (e.g. `+`), used by the animated statistics section.

Dummy data (`src/data/jobs.ts`) contains 24 realistic listings spanning 9 categories, 12 companies, and 5 employment types, with `postedAt` computed relative to "today" so the "Latest jobs" section always looks current regardless of when the app is opened.

## 4. Filtering logic

`App.tsx` derives `filteredJobs` with `useMemo`, recomputing only when its dependencies change:

1. **Category** — exact match against `JobFilters.category`, unless `'All'`.
2. **Query** — case-insensitive substring match against `"${job.title} ${company.name}"`.
3. **Location** — case-insensitive substring match against `job.location`, with a special case so typing "remote" also matches jobs flagged `remote: true` regardless of their base city.

Both `query` and `location` are passed through `useDebounce` (250ms) so filtering doesn't run on every keystroke.

## 5. Accessibility

- All interactive controls (search inputs, selects, buttons, chips) have explicit `aria-label`s where their purpose isn't conveyed by visible text.
- The job detail modal is a proper `role="dialog"` with `aria-modal`, closes on `Escape`, and locks body scroll while open.
- Focus is visually indicated everywhere via a shared `:focus-visible` ring (see `index.css`), not just on `:hover`.
- Color is never the only signal: the "Featured" badge pairs a star icon with text; the saved/favorite heart fills solid in addition to changing color.

## 6. CI/CD pipeline

`.github/workflows/deploy.yml` defines two jobs:

1. **`build-and-test`** (always runs): installs dependencies with `npm ci`, runs ESLint, then runs `tsc -b && vite build`. This is a hard gate — if linting or the type-checked build fails, the workflow fails.
2. **`deploy`** (runs only on pushes to `main`, and only after `build-and-test` succeeds): uses the Vercel CLI to pull the project's environment, build, and deploy. It checks for the presence of `VERCEL_TOKEN` first and skips gracefully with a clear log message if secrets haven't been configured yet, rather than failing the pipeline.

This split means the repository has working CI from the first commit, even before anyone connects a Vercel project.

## 7. Extending the project

Some natural next steps if this were to grow beyond an assessment:

- Replace `src/data/*.ts` with fetch calls to a real API, keeping the same TypeScript interfaces so components don't need to change.
- Add pagination or infinite scroll to `LatestJobs` once the data set is large.
- Add a real authentication layer so "Saved jobs" sync across devices instead of living in `localStorage`.
- Add end-to-end tests (Playwright) covering search, filter, save, and apply flows.
