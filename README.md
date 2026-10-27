<<<<<<< HEAD
# Raksham — Web Frontend

Raksham is an AI-guided legal assistance web application for Indian citizens. This repository holds its customer-facing web frontend.

**Current phase:** public homepage UI implemented from the supplied design references (hero, emergency helplines, Why Raksham, category selection, How it works, Human help). It is static: there is no routing, backend integration, questionnaire, or advocate data yet.

## Technology stack

- React 19 (JavaScript / JSX, no TypeScript)
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`; no PostCSS or `tailwind.config.js` needed). Page styling lives in plain CSS files under `src/styles/`, driven by design tokens in `tokens.css`
- Lucide React (icons) and Inter (self-hosted via `@fontsource-variable/inter`)
- ESLint 10 (flat config)

## Prerequisites

- Node.js 20.19+ (developed on Node 24)
- npm

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173 by default. The frontend runs fully on its own — no backend is required.

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the development server     |
| `npm run build`   | Create a production build (`dist/`) |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint                       |

## Environment variables

Copy `.env.example` to `.env` for local settings. `.env` files are git-ignored; `.env.example` is tracked.

| Variable            | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| `VITE_API_BASE_URL` | Future backend base URL (unused in this phase)    |

## Folder structure

```
public/                  Static files served as-is (favicon.png, assets/)
src/
├── app/                 Application root component (App.jsx)
├── assets/images/       Logo and other imported images
├── components/
│   ├── common/          Reusable page components (helplines, cards, illustrations)
│   ├── layout/          Layout components (Navbar)
│   └── ui/              UI primitives (Button)
├── data/                Static content (helplines, categories, steps, nav links)
├── features/            One folder per product feature (reserved)
├── hooks/               Shared React hooks (reserved)
├── lib/                 Third-party wrappers and helpers (reserved)
├── sections/            Homepage sections, in page order
├── services/            Future backend communication (reserved)
├── styles/              Design tokens and per-section CSS (index.css is the entry)
├── utils/               Pure utility functions (reserved)
├── App.jsx              Re-exports app/App.jsx
└── main.jsx             Entry point
```

Empty directories hold a `.gitkeep` placeholder until they are used.

## Known placeholders

- "Get Started", "Answer a few questions" and category links scroll to the categories section; the guided questionnaire and category guidance pages are not built.
- "Resources" and "About" in the navbar point at the helplines and Why Raksham sections until dedicated pages exist.
- "Learn more" in the Human help preview is an in-page anchor; advocate discovery is not implemented.
- Helpline numbers and descriptions are reference content in `src/data/helplines.js` and should be verified against official sources before launch.
=======
# raksham_web_frn
Raksham provides clear, step-by-step guidance for common legal issues in India.
>>>>>>> 18d4db650f080874ab5976363d492c9c71343f51
