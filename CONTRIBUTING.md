# Contributing to Entelechae Visuals

Thank you for your interest in contributing to **Entelechae Visuals**! We are committed to building an open, accessible, and world-class motion design and web template discovery platform for frontend developers, designers, and creative engineers.

Please take a moment to review this document before submitting contributions.

---

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Development Environment](#development-environment)
3. [Architecture Overview](#architecture-overview)
4. [Contribution Workflow](#contribution-workflow)
5. [Coding Standards](#coding-standards)
6. [Component Guidelines](#component-guidelines)
7. [Submitting Pull Requests](#submitting-pull-requests)

---

## Code of Conduct

This project adheres to the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to `engineering@entelechae.com`.

---

## Development Environment

### Prerequisites
- **Node.js**: `>=18.0.0` (LTS recommended)
- **Package Manager**: `npm` (v9+) or `pnpm`
- **Git**: `>=2.30.0`

### Setup
```bash
# 1. Clone the repository
git clone https://github.com/Entelechae-eng/Entele-visuals.git
cd Entele-visuals

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Useful Scripts
```bash
npm run dev       # Start Vite development server with HMR
npm run build     # Typecheck with tsc and compile production bundle
npm run preview   # Locally preview production dist build
```

---

## Architecture Overview

```text
entele-visuals/
├── api/                   # Vercel serverless edge functions
│   └── templens.js        # Upstream proxy & query caching handler
├── public/                # Static public assets (Favicon, Robots, Sitemaps)
│   ├── .well-known/       # Agentic discovery (ai-catalog.json)
│   ├── 404.html           # Dedicated static HTTP 404 handler
│   ├── llms.txt           # Machine-readable overview for LLMs
│   ├── llms-full.txt      # Full 29,627 resource specification
│   ├── robots.txt         # RFC 9309 crawler directives
│   └── sitemap.xml        # High-priority XML search sitemap
├── src/
│   ├── components/        # Modular UI components
│   │   ├── ComponentCard.tsx       # Motion component item card
│   │   ├── ComponentModal.tsx      # Code preview & export modal
│   │   ├── ImmersiveCard.tsx       # Hover-video preview prompt card
│   │   ├── ImmersiveHero.tsx       # Prompts header & category pills
│   │   ├── ImmersiveModal.tsx      # Multi-viewport 3D prompt modal
│   │   ├── Sidebar.tsx             # Taxonomic navigation & mode switcher
│   │   ├── TemplateCard.tsx        # Framer/Webflow/Shopify template card
│   │   └── TemplatePreviewModal.tsx# Sandboxed live iframe emulator
│   ├── data/              # Normalized JSON & metadata catalogs
│   │   ├── categories.ts           # 20 motion component categories
│   │   ├── components.json         # 897 motion components catalog
│   │   ├── immersiveCategories.ts  # 5 prompt category definitions
│   │   ├── immersiveData.json      # 683 immersive prompts & 3D scenes (lazy)
│   │   └── templatesData.json      # Curated offline templates fallback
│   ├── utils/             # Helper utilities & API connectors
│   │   ├── security.ts             # URL sanitization & XSS defenses
│   │   └── templensApi.ts          # Paginated search & filter service
│   ├── App.tsx            # Main application orchestrator & routing
│   ├── index.css          # Tailwind CSS layer rules & animations
│   ├── main.tsx           # React 19 entrypoint & error boundary
│   └── types/             # Shared TypeScript interfaces
├── vercel.json            # Vercel deployment routing, rewrites & headers
├── package.json           # Project manifest
└── vite.config.ts         # Vite bundler configuration & code-splitting
```

---

## Contribution Workflow

1. **Fork & Branch**: Create a descriptive topic branch from `main`:
   ```bash
   git checkout -b feat/shimmer-tabs-component
   ```
2. **Make Changes**: Follow the coding standards and add appropriate TypeScript typings.
3. **Verify Locally**:
   ```bash
   npm run build
   ```
   Ensure `tsc` produces **0 errors** and Vite compiles the production bundle cleanly.
4. **Commit**: Use semantic commit conventions:
   - `feat(...)`: A new component, template, prompt, or UI feature
   - `fix(...)`: A bug fix or layout correction
   - `perf(...)`: A code change that improves performance
   - `docs(...)`: Documentation changes
   - `style(...)`: Formatting or CSS alignment
5. **Open Pull Request**: Push your branch and open a PR using our template.

---

## Coding Standards

- **TypeScript**: Strict mode enabled. Avoid `any` types; prefer strict interfaces and union types.
- **Tailwind CSS**: Use utility classes directly. Avoid custom arbitrary CSS whenever standard classes suffice.
- **Framer Motion**: Prefer springs (`type: 'spring', damping: 20, stiffness: 300`) over linear transitions for natural tactile physics.
- **Performance**:
  - Keep components lazy-loadable where appropriate.
  - Large data files must be imported dynamically (`import(...)`) so Vite splits them into on-demand chunks.
  - Never introduce blocking network waterfalls on initial render.
- **Accessibility**: Ensure buttons have accessible labels, modals trap focus properly, and dark-theme contrast exceeds WCAG AA standards.

---

## License

By contributing to Entelechae Visuals, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).

