# Hirely — Modern Job Board

A production-ready, fully responsive job board built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Search and filter realistic job listings, save favorites, and apply — all wrapped in a polished, animated UI with full dark mode support.

![Tech](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Tech](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tech](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tech](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- 🔍 **Search** by job title or company, with debounced live filtering
- 📍 **Location filter** (city, state, or "Remote")
- 🗂️ **Category filter** — dropdown in the search bar and quick-select chips
- ⭐ **Featured jobs** carousel
- 🆕 **Latest jobs** grid, always sorted by most recently posted
- 🏢 **Company logos** strip and per-card branded logo marks (no external images required)
- 💾 **Save / favorite jobs**, persisted to `localStorage`, viewable in a slide-over drawer
- 📄 **Job detail modal** with responsibilities, requirements, and a demo "Apply" flow
- 📊 **Animated statistics** section (count-up on scroll)
- 🌓 **Dark mode**, toggled or based on system preference, persisted across visits
- 📱 **Mobile-first, fully responsive** layout with a slide-down mobile nav
- 🎬 Smooth **Framer Motion** animations (page-load, scroll reveals, hover states)
- ♿ Accessible: visible focus rings, `aria-` labels, `prefers-reduced-motion` support

## Tech stack

| Layer      | Choice                                   |
| ---------- | ----------------------------------------- |
| Framework  | React 18 + TypeScript                     |
| Build tool | Vite 5                                    |
| Styling    | Tailwind CSS 3 (custom design tokens)      |
| Animation  | Framer Motion                             |
| Icons      | lucide-react                              |
| State      | React Context + hooks (no external store) |
| Persistence| `localStorage` (theme + saved jobs)       |

No backend is required — all job data lives in `src/data/` as realistic dummy data, making this ideal for a take-home assessment or portfolio piece.

## Project structure

```
job-board/
├── .github/workflows/deploy.yml   # CI/CD pipeline (lint, type-check, build, deploy)
├── public/                        # Static assets
├── src/
│   ├── components/                # UI building blocks (Navbar, Hero, JobCard, ...)
│   ├── context/                   # ThemeContext, FavoritesContext
│   ├── data/                      # Dummy jobs, companies, categories, stats
│   ├── hooks/                     # useDebounce
│   ├── types/                     # Shared TypeScript interfaces
│   ├── utils/                     # formatSalary, formatRelativeDate, cx
│   ├── App.tsx                    # Root component & filtering logic
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Tailwind entry + base styles
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── vercel.json
├── DOCUMENTATION.md               # In-depth architecture & design documentation
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
git clone https://github.com/<your-username>/hirely-job-board.git
cd hirely-job-board
npm install
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available scripts

| Script            | Description                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload       |
| `npm run build`   | Type-check and build for production to `dist/` |
| `npm run preview` | Preview the production build locally           |
| `npm run lint`    | Run ESLint across the project                  |
| `npm run format`  | Format source files with Prettier              |

## Deployment

### Deploy to Vercel (recommended)

1. Push this repository to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects the Vite framework preset; the included `vercel.json` sets the build command (`npm run build`), output directory (`dist`), and an SPA rewrite so client-side routing works on refresh.
4. Click **Deploy**. Every subsequent push to `main` triggers a new production deployment automatically.

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Hirely job board"
git branch -M main
git remote add origin https://github.com/<your-username>/hirely-job-board.git
git push -u origin main
```

### Enable the GitHub Actions → Vercel pipeline

The workflow at `.github/workflows/deploy.yml` lints, type-checks, and builds on every push and pull request. To let it also deploy to Vercel automatically, add these repository secrets under **Settings → Secrets and variables → Actions**:

| Secret              | Where to get it                                                                 |
| -------------------- | -------------------------------------------------------------------------------- |
| `VERCEL_TOKEN`       | [vercel.com/account/tokens](https://vercel.com/account/tokens)                   |
| `VERCEL_ORG_ID`      | Run `vercel link` locally, then read `.vercel/project.json`                      |
| `VERCEL_PROJECT_ID`  | Same file as above, `.vercel/project.json`                                       |

Until those secrets are added, the CI job (lint/type-check/build) still runs and passes — only the deploy step is skipped, so the pipeline never fails because of missing credentials.

## Design notes

See [DOCUMENTATION.md](./DOCUMENTATION.md) for the full architecture write-up, design token rationale, and data model reference.

## License

MIT — see [LICENSE](./LICENSE).
